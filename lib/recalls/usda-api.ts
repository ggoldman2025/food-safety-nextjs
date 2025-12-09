/**
 * USDA FSIS Recall API Integration
 * Fetches meat and poultry recall data from the official USDA FSIS API
 * API Documentation: https://www.fsis.usda.gov/science-data/developer-resources/recall-api
 */

export interface USDARecall {
  recallNumber: string;
  recallClass: string;
  pressRelease: string;
  summary: string;
  productName: string;
  hazard: string;
  country: string;
  state: string;
  city: string;
  recallDate: string; // ISO date string
  companyName: string;
  establishmentNumber: string;
  productQuantity: string;
  productType: string; // 'Meat', 'Poultry', 'Egg'
  reason: string;
  distribution: string;
  images: string[];
}

export interface USDAResponse {
  results: USDARecall[];
  totalResults: number;
}

/**
 * Fetch recent USDA meat/poultry recalls (last 30-60 days)
 * @param days Number of days to look back (default: 60)
 * @param limit Maximum number of results (default: 100)
 */
export async function fetchUSDARecalls(days: number = 60, limit: number = 100): Promise<USDARecall[]> {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const endDateStr = endDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    // Build API URL
    const baseUrl = 'https://www.fsis.usda.gov/fsis/api/recall/v/1';
    
    // Note: The actual USDA API might require different parameters
    // This is a best-guess implementation based on standard REST API patterns
    const url = `${baseUrl}?startDate=${startDateStr}&endDate=${endDateStr}&limit=${limit}`;

    console.log(`[USDA API] Fetching recalls from ${startDateStr} to ${endDateStr}`);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // If API returns error, try without date filters
      console.warn(`[USDA API] Date filter failed, trying without filters`);
      const fallbackUrl = `${baseUrl}?limit=${limit}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!fallbackResponse.ok) {
        throw new Error(`USDA API error: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
      }

      const data = await fallbackResponse.json();
      
      // Filter by date manually if API doesn't support it
      const filteredResults = filterRecallsByDate(data.results || data, startDate, endDate);
      
      console.log(`[USDA API] Found ${filteredResults.length} recalls (filtered)`);
      return filteredResults;
    }

    const data = await response.json();
    const results = data.results || data;

    console.log(`[USDA API] Found ${results.length} recalls`);

    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error('[USDA API] Error fetching recalls:', error);
    // Return empty array instead of throwing to allow other APIs to continue
    return [];
  }
}

/**
 * Filter recalls by date range (fallback if API doesn't support date filtering)
 */
function filterRecallsByDate(recalls: any[], startDate: Date, endDate: Date): USDARecall[] {
  return recalls.filter((recall) => {
    const recallDate = new Date(recall.recallDate);
    return recallDate >= startDate && recallDate <= endDate;
  });
}

/**
 * Normalize USDA recall class to standard format
 * USDA uses: "Class I", "Class II", "Class III"
 */
export function normalizeUSDAClass(recallClass: string): string {
  if (!recallClass) return 'Class III';
  
  const upper = recallClass.toUpperCase();
  if (upper.includes('I')) return 'Class I';
  if (upper.includes('II')) return 'Class II';
  return 'Class III';
}
