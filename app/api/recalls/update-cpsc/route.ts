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
      await prisma.recall.upsert({
        where: { recallNumber: recall.recallNumber },
        update: recall,
        create: recall,
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
