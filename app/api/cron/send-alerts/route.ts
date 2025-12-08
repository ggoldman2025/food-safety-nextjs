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
    
    const response = await fetch(
      `https://api.fda.gov/food/enforcement.json?search=report_date:[${formattedDate}+TO+${new Date().toISOString().split('T')[0].replace(/-/g, '')}]&limit=100`
    );
    
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

// Send email to all subscribers
async function sendEmailToSubscribers(recalls: any[]) {
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
    
    // Prepare email content
    const recallList = recalls.slice(0, 10).map((recall, index) => 
      `${index + 1}. ${recall.product_description || 'Unknown Product'}
   Reason: ${recall.reason_for_recall || 'Not specified'}
   Company: ${recall.recalling_firm || 'Unknown'}
   Date: ${recall.report_date || 'Unknown'}
   
`
    ).join('\n');
    
    const emailContent = `
Dear Subscriber,

This is your bi-weekly Food Safety Alert from Food Safety Plus.

We found ${recalls.length} new FDA food recalls in the past 5 business days.

TOP 10 RECENT RECALLS:

${recallList}

${recalls.length > 10 ? `... and ${recalls.length - 10} more recalls.` : ''}

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
          subject: `🚨 ${recalls.length} New FDA Food Recalls - Food Safety Alert`,
          text: emailContent
        });
        sent++;
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
        failed++;
      }
    }
    
    return { sent, failed, totalRecalls: recalls.length };
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
    
    console.log('Starting FDA recall alert job...');
    
    // Fetch FDA recalls
    const recalls = await fetchFDARecalls();
    console.log(`Found ${recalls.length} FDA recalls`);
    
    if (recalls.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new recalls found',
        recalls: 0,
        emailsSent: 0
      });
    }
    
    // Send emails to subscribers
    const result = await sendEmailToSubscribers(recalls);
    
    return NextResponse.json({
      success: true,
      message: 'Alert emails sent successfully',
      recalls: result.totalRecalls,
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
