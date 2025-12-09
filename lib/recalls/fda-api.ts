/**
 * FDA openFDA API Integration
 * Fetches food recall data from the official FDA openFDA API
 * API Documentation: https://open.fda.gov/apis/food/enforcement/
 */

export interface FDARecall {
  recall_number: string;
  product_description: string;
  reason_for_recall: string;
  company_name: string;
  classification: string; // 'Class I', 'Class II', 'Class III'
  distribution_pattern: string;
  state: string;
  recall_initiation_date: string; // YYYYMMDD format
  report_date: string; // YYYYMMDD format
  product_type: string;
  status: string;
}

export interface FDAResponse {
  results: FDARecall[];
  meta: {
    results: {
      total: number;
    };
  };
}

/**
 * Fetch recent FDA food recalls (last 30-60 days)
 * @param days Number of days to look back (default: 60)
 * @param limit Maximum number of results (default: 100, max: 1000)
 */
export async function fetchFDARecalls(days: number = 60, limit: number = 100): Promise<FDARecall[]> {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const endDateStr = formatDateForFDA(endDate);
    const startDateStr = formatDateForFDA(startDate);

    // Build API URL with date range filter
    const baseUrl = 'https://api.fda.gov/food/enforcement.json';
    const searchQuery = `recall_initiation_date:[${startDateStr}+TO+${endDateStr}]`;
    const url = `${baseUrl}?search=${searchQuery}&limit=${limit}`;

    console.log(`[FDA API] Fetching recalls from ${startDateStr} to ${endDateStr}`);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`FDA API error: ${response.status} ${response.statusText}`);
    }

    const data: FDAResponse = await response.json();

    console.log(`[FDA API] Found ${data.results?.length || 0} recalls`);

    return data.results || [];
  } catch (error) {
    console.error('[FDA API] Error fetching recalls:', error);
    throw error;
  }
}

/**
 * Format Date object to YYYYMMDD format for FDA API
 */
function formatDateForFDA(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Parse FDA date string (YYYYMMDD) to Date object
 */
export function parseFDADate(dateStr: string): Date {
  if (!dateStr || dateStr.length !== 8) {
    return new Date();
  }
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
}

/**
 * Extract state code from distribution pattern
 * Example: "Nationwide" or "CA, NY, TX" or "California"
 */
export function extractStateFromDistribution(distribution: string): string | null {
  if (!distribution) return null;

  // Check for nationwide
  if (distribution.toLowerCase().includes('nationwide')) {
    return 'US';
  }

  // Extract first state code (2 letters)
  const stateMatch = distribution.match(/\b([A-Z]{2})\b/);
  if (stateMatch) {
    return stateMatch[1];
  }

  return null;
}
