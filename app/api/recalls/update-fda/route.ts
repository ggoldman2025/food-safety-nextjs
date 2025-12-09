import { NextResponse } from 'next/server';
import { fetchFDARecalls } from '@/lib/recalls/fda-api';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Fetching FDA recalls...');
    
    const fdaRecalls = await fetchFDARecalls();
    console.log(`Fetched ${fdaRecalls.length} FDA recalls`);

    // Save to database
    let saved = 0;
    for (const recall of fdaRecalls) {
      // Transform FDA data to match our schema
      const recallData = {
        recallNumber: recall.recall_number,
        source: 'FDA',
        title: recall.product_description.substring(0, 255), // Truncate for title
        productDescription: recall.product_description,
        reasonForRecall: recall.reason_for_recall,
        companyName: recall.company_name || 'Unknown Company',
        recallInitiationDate: parseFDADate(recall.recall_initiation_date),
        reportDate: recall.report_date ? parseFDADate(recall.report_date) : null,
        classification: recall.classification,
        distributionPattern: recall.distribution_pattern,
        state: recall.state || null,
        productType: 'Food Product',
        hazard: recall.reason_for_recall,
        status: recall.status || 'Active',
        imageUrl: null,
        sourceUrl: `https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts`,
      };
      
      await prisma.recall.upsert({
        where: { recallNumber: recallData.recallNumber },
        update: recallData,
        create: recallData,
      });
      saved++;
    }

    console.log(`Saved ${saved} FDA recalls to database`);

    return NextResponse.json({
      success: true,
      source: 'FDA',
      count: saved,
      message: `Successfully fetched ${saved} FDA recalls`,
    });
  } catch (error) {
    console.error('Error fetching FDA recalls:', error);
    return NextResponse.json(
      {
        success: false,
        source: 'FDA',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Parse FDA date format (YYYYMMDD) to Date object
function parseFDADate(dateStr: string): Date {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1; // Month is 0-indexed
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
}
