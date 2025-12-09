import { NextResponse } from 'next/server';
import { fetchFDARecalls } from '@/lib/recalls/fda-api';
import { fetchUSDARecalls } from '@/lib/recalls/usda-api';
import { fetchCPSCRecalls } from '@/lib/recalls/cpsc-api';
import { prisma } from '@/lib/prisma';
import { cache, CacheKeys } from '@/lib/cache';

/**
 * Vercel Cron Job: Update all recalls daily
 * Runs at 6:00 AM UTC every day
 * Schedule: 0 6 * * *
 */
export async function GET(request: Request) {
  try {
    // Verify this is a cron request from Vercel
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('[CRON] Starting automated recall update...');
    const startTime = Date.now();
    
    const results = {
      fda: { count: 0, success: false, error: null as string | null },
      usda: { count: 0, success: false, error: null as string | null },
      cpsc: { count: 0, success: false, error: null as string | null },
    };

    // Update FDA recalls
    try {
      console.log('[CRON] Fetching FDA recalls...');
      const fdaRecalls = await fetchFDARecalls();
      
      for (const recall of fdaRecalls) {
        const recallData = {
          recallNumber: recall.recall_number,
          source: 'FDA' as const,
          title: recall.product_description?.substring(0, 255) || 'Unknown Product',
          productDescription: recall.product_description,
          reasonForRecall: recall.reason_for_recall,
          companyName: recall.company_name || recall.distribution_pattern || 'Unknown Company',
          recallInitiationDate: new Date(recall.recall_initiation_date),
          reportDate: recall.report_date ? new Date(recall.report_date) : null,
          classification: recall.classification,
          distributionPattern: recall.distribution_pattern,
          state: recall.state || null,
          productType: recall.product_type || 'Food',
          status: recall.status || 'Ongoing',
          imageUrl: null,
          sourceUrl: `https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts`,
        };
        
        await prisma.recall.upsert({
          where: { recallNumber: recallData.recallNumber },
          update: recallData,
          create: recallData,
        });
        results.fda.count++;
      }
      
      results.fda.success = true;
      console.log(`[CRON] FDA: ${results.fda.count} recalls updated`);
    } catch (error) {
      results.fda.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('[CRON] FDA error:', results.fda.error);
    }

    // Update USDA recalls
    try {
      console.log('[CRON] Fetching USDA recalls...');
      const usdaRecalls = await fetchUSDARecalls();
      
      for (const recall of usdaRecalls) {
        const recallData = {
          recallNumber: recall.recallNumber,
          source: 'USDA' as const,
          title: recall.productName || recall.summary.substring(0, 255),
          productDescription: recall.summary || recall.pressRelease,
          reasonForRecall: recall.reason || recall.hazard,
          companyName: recall.companyName,
          recallInitiationDate: new Date(recall.recallDate),
          reportDate: null,
          classification: mapUSDAClassification(recall.recallClass),
          distributionPattern: recall.distribution,
          state: recall.state || null,
          productType: recall.productType || 'Meat/Poultry',
          hazard: recall.hazard,
          status: 'Active',
          imageUrl: recall.images?.[0] || null,
          sourceUrl: `https://www.fsis.usda.gov/recalls`,
        };
        
        await prisma.recall.upsert({
          where: { recallNumber: recallData.recallNumber },
          update: recallData,
          create: recallData,
        });
        results.usda.count++;
      }
      
      results.usda.success = true;
      console.log(`[CRON] USDA: ${results.usda.count} recalls updated`);
    } catch (error) {
      results.usda.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('[CRON] USDA error:', results.usda.error);
    }

    // Update CPSC recalls
    try {
      console.log('[CRON] Fetching CPSC recalls...');
      const cpscRecalls = await fetchCPSCRecalls();
      
      for (const recall of cpscRecalls) {
        const recallData = {
          recallNumber: recall.RecallNumber || `CPSC-${recall.RecallID}`,
          source: 'CPSC' as const,
          title: recall.Title?.substring(0, 255) || 'Unknown Product',
          productDescription: recall.Description || recall.Products?.[0]?.Description,
          reasonForRecall: recall.Hazards?.[0]?.Name || 'Safety hazard',
          companyName: recall.Manufacturers?.[0]?.Name || 'Unknown',
          recallInitiationDate: new Date(recall.RecallDate),
          reportDate: null,
          classification: 'Class II',
          distributionPattern: recall.Retailers?.[0]?.Name || 'Various retailers',
          state: null,
          productType: recall.Products?.[0]?.Type || 'Consumer Product',
          status: 'Active',
          imageUrl: recall.Images?.[0]?.URL || null,
          sourceUrl: recall.URL || `https://www.cpsc.gov/Recalls`,
        };
        
        await prisma.recall.upsert({
          where: { recallNumber: recallData.recallNumber },
          update: recallData,
          create: recallData,
        });
        results.cpsc.count++;
      }
      
      results.cpsc.success = true;
      console.log(`[CRON] CPSC: ${results.cpsc.count} recalls updated`);
    } catch (error) {
      results.cpsc.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('[CRON] CPSC error:', results.cpsc.error);
    }

    // Clear cache to force fresh data on next request
    cache.clear();
    console.log('[CRON] Cache cleared');

    const duration = Date.now() - startTime;
    const totalRecalls = results.fda.count + results.usda.count + results.cpsc.count;

    console.log(`[CRON] Update complete: ${totalRecalls} recalls in ${duration}ms`);

    return NextResponse.json({
      success: true,
      duration,
      totalRecalls,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[CRON] Fatal error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Map USDA recall class to FDA-style classification
function mapUSDAClassification(recallClass: string): string | null {
  if (!recallClass) return null;
  
  const classUpper = recallClass.toUpperCase();
  
  if (classUpper.includes('I') || classUpper.includes('1')) {
    return 'Class I';
  } else if (classUpper.includes('II') || classUpper.includes('2')) {
    return 'Class II';
  } else if (classUpper.includes('III') || classUpper.includes('3')) {
    return 'Class III';
  }
  
  return null;
}
