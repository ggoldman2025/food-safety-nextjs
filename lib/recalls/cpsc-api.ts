/**
 * CPSC (Consumer Product Safety Commission) API Integration
 * Fetches consumer product recall data from the official CPSC API
 * API Documentation: https://www.cpsc.gov/Recalls/CPSC-Recalls-Application-Program-Interface-API-Information
 */

export interface CPSCRecall {
  RecallID: string;
  RecallNumber: string;
  RecallDate: string; // ISO date string
  Description: string;
  URL: string;
  Title: string;
  ConsumerContact: string;
  LastPublishDate: string;
  Products: CPSCProduct[];
  Hazards: CPSCHazard[];
  Remedies: CPSCRemedy[];
  Manufacturers: CPSCManufacturer[];
  ProductUPCs: string[];
  Images: CPSCImage[];
  Injuries: CPSCInjury[];
  Retailers: CPSCRetailer[];
}

export interface CPSCProduct {
  Name: string;
  Description: string;
  Model: string;
  Type: string;
}

export interface CPSCHazard {
  Name: string;
  Type: string;
}

export interface CPSCRemedy {
  Name: string;
}

export interface CPSCManufacturer {
  Name: string;
  Country: string;
}

export interface CPSCImage {
  URL: string;
}

export interface CPSCInjury {
  Name: string;
}

export interface CPSCRetailer {
  Name: string;
  Country: string;
}

/**
 * Fetch recent CPSC consumer product recalls (last 30-60 days)
 * @param days Number of days to look back (default: 60)
 * @param limit Maximum number of results (default: 100)
 */
export async function fetchCPSCRecalls(days: number = 60, limit: number = 100): Promise<CPSCRecall[]> {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const endDateStr = endDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    // Build API URL
    const baseUrl = 'https://www.saferproducts.gov/RestWebServices/Recall';
    const url = `${baseUrl}?RecallDateStart=${startDateStr}&RecallDateEnd=${endDateStr}&format=json`;

    console.log(`[CPSC API] Fetching recalls from ${startDateStr} to ${endDateStr}`);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`CPSC API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // CPSC API returns array directly or wrapped in object
    const results = Array.isArray(data) ? data : (data.recalls || data.results || []);

    // Limit results
    const limitedResults = results.slice(0, limit);

    console.log(`[CPSC API] Found ${limitedResults.length} recalls`);

    return limitedResults;
  } catch (error) {
    console.error('[CPSC API] Error fetching recalls:', error);
    // Return empty array instead of throwing to allow other APIs to continue
    return [];
  }
}

/**
 * Determine recall classification based on hazard severity
 * CPSC doesn't use Class I/II/III, so we infer based on injuries and hazards
 */
export function inferCPSCClassification(recall: CPSCRecall): string {
  // Check for injuries
  if (recall.Injuries && recall.Injuries.length > 0) {
    const injuryText = recall.Injuries.map(i => i.Name).join(' ').toLowerCase();
    
    // Serious injuries = Class I
    if (injuryText.includes('death') || injuryText.includes('serious') || injuryText.includes('severe')) {
      return 'Class I';
    }
    
    // Any injuries = Class II
    return 'Class II';
  }

  // Check hazard severity
  if (recall.Hazards && recall.Hazards.length > 0) {
    const hazardText = recall.Hazards.map(h => h.Name).join(' ').toLowerCase();
    
    // Life-threatening hazards = Class I
    if (hazardText.includes('fire') || hazardText.includes('choking') || 
        hazardText.includes('poison') || hazardText.includes('laceration')) {
      return 'Class I';
    }
    
    // Other hazards = Class II
    return 'Class II';
  }

  // No injuries or hazards = Class III
  return 'Class III';
}

/**
 * Extract product type from CPSC product data
 */
export function extractCPSCProductType(recall: CPSCRecall): string {
  if (!recall.Products || recall.Products.length === 0) {
    return 'Consumer Product';
  }

  const productType = recall.Products[0].Type || recall.Products[0].Name;
  
  // Check if it's food-related
  const foodKeywords = ['food', 'beverage', 'drink', 'snack', 'meal', 'dietary'];
  const lowerType = productType.toLowerCase();
  
  if (foodKeywords.some(keyword => lowerType.includes(keyword))) {
    return 'Food Product';
  }

  return 'Consumer Product';
}
