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
        productDescription: recall.Description || recall.Title,
        company: recall.Manufacturers?.[0]?.Name || 'Unknown',
        recallDate: recall.RecallDate,
        classification: null, // CPSC doesn't use FDA classifications
        reason: recall.Hazards?.[0]?.Name || null,
        distribution: 'Nationwide', // CPSC recalls are typically nationwide
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
