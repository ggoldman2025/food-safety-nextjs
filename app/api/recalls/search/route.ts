import { NextResponse } from 'next/server';
import { searchRecalls, type RecallFilters } from '@/lib/recalls/recall-service';
import { cache, CacheKeys, CacheTTL } from '@/lib/cache';

/**
 * API Route: Search and filter recalls
 * GET /api/recalls/search?source=FDA&state=CA&classification=Class+I&query=salmonella&limit=50&page=1
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: RecallFilters = {
      source: searchParams.get('source') as any,
      state: searchParams.get('state') || undefined,
      classification: searchParams.get('classification') as any,
      productType: searchParams.get('productType') || undefined,
      searchQuery: searchParams.get('query') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: (parseInt(searchParams.get('page') || '1') - 1) * parseInt(searchParams.get('limit') || '50'),
    };

    // Parse date filters
    if (searchParams.get('startDate')) {
      filters.startDate = new Date(searchParams.get('startDate')!);
    }
    if (searchParams.get('endDate')) {
      filters.endDate = new Date(searchParams.get('endDate')!);
    }

    // Generate cache key based on filters
    const cacheKey = `${CacheKeys.ALL_RECALLS}:${JSON.stringify(filters)}`;
    
    // Try to get from cache first
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      console.log('[API] Returning cached recall search results');
      return NextResponse.json({
        success: true,
        cached: true,
        ...cachedResults,
      });
    }

    // If not in cache, fetch from database
    const results = await searchRecalls(filters);
    
    // Cache the results for 1 hour
    cache.set(cacheKey, results, CacheTTL.MEDIUM);

    return NextResponse.json({
      success: true,
      cached: false,
      ...results,
    });
  } catch (error) {
    console.error('[API] Recall search failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
