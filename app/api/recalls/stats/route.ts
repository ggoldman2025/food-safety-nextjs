import { NextResponse } from 'next/server';
import { getRecallStats } from '@/lib/recalls/recall-service';

/**
 * API Route: Get recall statistics
 * GET /api/recalls/stats
 */
export async function GET() {
  try {
    const stats = await getRecallStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('[API] Recall stats failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
