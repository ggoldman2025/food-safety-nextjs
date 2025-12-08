import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// Calculate date for 5 business days ago (excluding weekends)
function getBusinessDaysAgo(days: number): Date {
  const date = new Date();
  let count = 0;
  
  while (count < days) {
    date.setDate(date.getDate() - 1);
    const dayOfWeek = date.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
  }
  
  return date;
}

// Fetch FDA recalls from the last 5 business days
async function fetchFDARecalls() {
  try {
    const startDate = getBusinessDaysAgo(5);
    const formattedDate = startDate.toISOString().split('T')[0].replace(/-/g, '');
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(
      `https://api.fda.gov/food/enforcement.json?search=report_date:[${formattedDate}+TO+${new Date().toISOString().split('T')[0].replace(/-/g, '')}]&limit=100`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`FDA API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching FDA recalls:', error);
    return [];
  }
}

// Fetch USDA recalls from the last 5 business days
async function fetchUSDARecalls() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout for USDA (it's slow)
    
    const response = await fetch(
      'https://www.fsis.usda.gov/fsis/api/recall/v/1',
      { signal: controller.signal }
    );
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`USDA API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter USDA recalls from the last 5 business days
    const startDate = getBusinessDaysAgo(5);
    const filtered = data.filter((recall: any) => {
      if (!recall.field_recall_date) return false;
      const recallDate = new Date(recall.field_recall_date);
      return recallDate >= startDate;
    });
    
    return filtered || [];
  } catch (error) {
    console.error('Error fetching USDA recalls:', error);
    // Don't fail the entire job if USDA times out
    return [];
  }
}

// Send email to all subscribers
async function sendEmailToSubscribers(fdaRecalls: any[], usdaRecalls: any[]) {
  try {
    // Get all users with email notifications enabled
    const users = await prisma.user.findMany({
      where: {
        email: {
          not: null
        }
      },
      select: {
        email: true,
        name: true
      }
    });
    
    if (users.length === 0) {
      console.log('No subscribers found');
      return { sent: 0, failed: 0 };
    }
    
    let sent = 0;
    let failed = 0;
    
    // Prepare email content - combine FDA and USDA recalls
    const allRecalls = [
      ...fdaRecalls.map((r: any) => ({
        source: 'FDA',
        product: r.product_description || 'Unknown Product',
        reason: r.reason_for_recall || 'Not specified',
        company: r.recalling_firm || 'Unknown',
        date: r.report_date || 'Unknown'
      })),
      ...usdaRecalls.map((r: any) => ({
        source: 'USDA',
        product: r.field_title || 'Unknown Product',
        reason: r.field_recall_reason || 'Not specified',
        company: r.field_establishment || 'Unknown',
        date: r.field_recall_date || 'Unknown'
      }))
    ];
    
    const recallList = allRecalls.slice(0, 10).map((recall, index) => 
      `${index + 1}. [${recall.source}] ${recall.product}
   Reason: ${recall.reason}
   Company: ${recall.company}
   Date: ${recall.date}
   
`
    ).join('\n');
    
    const emailContent = `
Dear Subscriber,

This is your bi-weekly Food Safety Alert from Food Safety Plus.

We found ${fdaRecalls.length} FDA and ${usdaRecalls.length} USDA food recalls in the past 5 business days (${allRecalls.length} total).

TOP 10 RECENT RECALLS:

${recallList}

${allRecalls.length > 10 ? `... and ${allRecalls.length - 10} more recalls.` : ''}

Visit https://food-safety-nextjs.vercel.app/dashboard to view all recalls and manage your alert preferences.

Stay safe!
Food Safety Plus Team
    `.trim();
    
    // Send emails to all subscribers
    for (const user of users) {
      try {
        await resend.emails.send({
          from: 'Food Safety Plus <onboarding@resend.dev>',
          to: user.email!,
          subject: `🚨 ${allRecalls.length} New Food Recalls (FDA + USDA) - Food Safety Alert`,
          text: emailContent
        });
        sent++;
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
        failed++;
      }
    }
    
    return { sent, failed, totalRecalls: allRecalls.length, fdaCount: fdaRecalls.length, usdaCount: usdaRecalls.length };
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    // Verify cron secret (optional but recommended)
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log('Starting FDA + USDA recall alert job...');
    
    // Fetch FDA and USDA recalls in parallel
    const [fdaRecalls, usdaRecalls] = await Promise.all([
      fetchFDARecalls(),
      fetchUSDARecalls()
    ]);
    
    console.log(`Found ${fdaRecalls.length} FDA recalls and ${usdaRecalls.length} USDA recalls`);
    
    const totalRecalls = fdaRecalls.length + usdaRecalls.length;
    
    if (totalRecalls === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new recalls found',
        fdaRecalls: 0,
        usdaRecalls: 0,
        emailsSent: 0
      });
    }
    
    // Send emails to subscribers
    const result = await sendEmailToSubscribers(fdaRecalls, usdaRecalls);
    
    return NextResponse.json({
      success: true,
      message: 'Alert emails sent successfully',
      totalRecalls: result.totalRecalls,
      fdaRecalls: result.fdaCount,
      usdaRecalls: result.usdaCount,
      emailsSent: result.sent,
      emailsFailed: result.failed,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
