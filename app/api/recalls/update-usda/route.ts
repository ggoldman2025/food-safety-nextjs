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
      // Transform USDA data to match our schema
      const recallData = {
        recallNumber: recall.recallNumber,
        source: 'USDA',
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
