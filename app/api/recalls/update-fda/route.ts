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
      await prisma.recall.upsert({
        where: { recallNumber: recall.recallNumber },
        update: recall,
        create: recall,
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
