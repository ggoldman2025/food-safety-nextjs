import { NextResponse } from 'next/server';
import { updateAllRecalls } from '@/lib/recalls/recall-service';

/**
 * API Route: Update recalls from all government APIs
 * GET /api/recalls/update?days=60
 * 
 * This should be called by a cron job daily to keep recalls up-to-date
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '60');

    console.log(`[API] Starting recall update for last ${days} days`);

    const results = await updateAllRecalls(days);

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${results.total} recalls`,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Recall update failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
