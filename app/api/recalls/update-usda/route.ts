import { NextResponse } from 'next/server';
import { fetchUSDARecalls } from '@/lib/recalls/usda-api';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('Fetching USDA recalls...');
    
    const usdaRecalls = await fetchUSDARecalls();
    console.log(`Fetched ${usdaRecalls.length} USDA recalls`);

    // Save to database
    let saved = 0;
    for (const recall of usdaRecalls) {
      await prisma.recall.upsert({
        where: { recallNumber: recall.recallNumber },
        update: recall,
        create: recall,
      });
      saved++;
    }

    console.log(`Saved ${saved} USDA recalls to database`);

    return NextResponse.json({
      success: true,
      source: 'USDA',
      count: saved,
      message: `Successfully fetched ${saved} USDA recalls`,
    });
  } catch (error) {
    console.error('Error fetching USDA recalls:', error);
    return NextResponse.json(
      {
        success: false,
        source: 'USDA',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
