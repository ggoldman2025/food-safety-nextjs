import { NextResponse } from 'next/server';
import { fetchCPSCRecalls } from '@/lib/recalls/cpsc-api';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Fetching CPSC recalls...');
    
    const cpscRecalls = await fetchCPSCRecalls();
    console.log(`Fetched ${cpscRecalls.length} CPSC recalls`);

    // Save to database
    let saved = 0;
    for (const recall of cpscRecalls) {
      // Transform CPSC data to match our schema
      const recallData = {
        recallNumber: recall.RecallNumber,
        source: 'CPSC',
        title: recall.Title || 'Consumer Product Recall',
        productDescription: recall.Description || recall.Title,
        reasonForRecall: recall.Hazards?.[0]?.Name || 'Safety hazard',
        companyName: recall.Manufacturers?.[0]?.Name || 'Unknown',
        recallInitiationDate: new Date(recall.RecallDate),
        classification: null, // CPSC doesn't use FDA classifications
        distributionPattern: 'Nationwide', // CPSC recalls are typically nationwide
        state: null,
        productType: 'Consumer Product',
        hazard: recall.Hazards?.map(h => h.Name).join(', ') || null,
        status: 'Active',
        imageUrl: recall.Images?.[0]?.URL || null,
        sourceUrl: recall.URL || null,
      };
      
      await prisma.recall.upsert({
        where: { recallNumber: recallData.recallNumber },
        update: recallData,
        create: recallData,
      });
      saved++;
    }

    console.log(`Saved ${saved} CPSC recalls to database`);

    return NextResponse.json({
      success: true,
      source: 'CPSC',
      count: saved,
      message: `Successfully fetched ${saved} CPSC recalls`,
    });
  } catch (error) {
    console.error('Error fetching CPSC recalls:', error);
    return NextResponse.json(
      {
        success: false,
        source: 'CPSC',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
