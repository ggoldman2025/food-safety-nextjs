/**
 * Unified Recall Service
 * Aggregates recalls from FDA, USDA, and CPSC APIs
 * Stores them in the database and provides search/filter functionality
 */

import { PrismaClient } from '@prisma/client';
import { fetchFDARecalls, parseFDADate, extractStateFromDistribution, type FDARecall } from './fda-api';
import { fetchUSDARecalls, normalizeUSDAClass, type USDARecall } from './usda-api';
import { fetchCPSCRecalls, inferCPSCClassification, extractCPSCProductType, type CPSCRecall } from './cpsc-api';

const prisma = new PrismaClient();

export interface RecallFilters {
  source?: 'FDA' | 'USDA' | 'CPSC';
  state?: string;
  classification?: 'Class I' | 'Class II' | 'Class III';
  productType?: string;
  searchQuery?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

/**
 * Fetch and store recalls from all three government APIs
 * @param days Number of days to look back (default: 60)
 */
export async function updateAllRecalls(days: number = 60): Promise<{
  fda: number;
  usda: number;
  cpsc: number;
  total: number;
}> {
  console.log(`[Recall Service] Starting update for last ${days} days`);

  const results = {
    fda: 0,
    usda: 0,
    cpsc: 0,
    total: 0,
  };

  try {
    // Fetch from all APIs in parallel
    const [fdaRecalls, usdaRecalls, cpscRecalls] = await Promise.all([
      fetchFDARecalls(days).catch(err => {
        console.error('[Recall Service] FDA fetch failed:', err);
        return [];
      }),
      fetchUSDARecalls(days).catch(err => {
        console.error('[Recall Service] USDA fetch failed:', err);
        return [];
      }),
      fetchCPSCRecalls(days).catch(err => {
        console.error('[Recall Service] CPSC fetch failed:', err);
        return [];
      }),
    ]);

    // Process FDA recalls
    for (const recall of fdaRecalls) {
      try {
        await storeFDARecall(recall);
        results.fda++;
      } catch (error) {
        console.error(`[Recall Service] Failed to store FDA recall ${recall.recall_number}:`, error);
      }
    }

    // Process USDA recalls
    for (const recall of usdaRecalls) {
      try {
        await storeUSDARecall(recall);
        results.usda++;
      } catch (error) {
        console.error(`[Recall Service] Failed to store USDA recall ${recall.recallNumber}:`, error);
      }
    }

    // Process CPSC recalls
    for (const recall of cpscRecalls) {
      try {
        await storeCPSCRecall(recall);
        results.cpsc++;
      } catch (error) {
        console.error(`[Recall Service] Failed to store CPSC recall ${recall.RecallNumber}:`, error);
      }
    }

    results.total = results.fda + results.usda + results.cpsc;

    console.log(`[Recall Service] Update complete:`, results);

    return results;
  } catch (error) {
    console.error('[Recall Service] Update failed:', error);
    throw error;
  }
}

/**
 * Store FDA recall in database (upsert to avoid duplicates)
 */
async function storeFDARecall(recall: FDARecall): Promise<void> {
  await prisma.recall.upsert({
    where: { recallNumber: recall.recall_number },
    update: {
      title: recall.product_description.substring(0, 255),
      productDescription: recall.product_description,
      reasonForRecall: recall.reason_for_recall,
      companyName: recall.company_name,
      classification: recall.classification,
      distributionPattern: recall.distribution_pattern,
      state: extractStateFromDistribution(recall.distribution_pattern),
      recallInitiationDate: parseFDADate(recall.recall_initiation_date),
      reportDate: recall.report_date ? parseFDADate(recall.report_date) : null,
      productType: 'Food',
      status: recall.status || 'Active',
      updatedAt: new Date(),
    },
    create: {
      recallNumber: recall.recall_number,
      source: 'FDA',
      title: recall.product_description.substring(0, 255),
      productDescription: recall.product_description,
      reasonForRecall: recall.reason_for_recall,
      companyName: recall.company_name,
      classification: recall.classification,
      distributionPattern: recall.distribution_pattern,
      state: extractStateFromDistribution(recall.distribution_pattern),
      recallInitiationDate: parseFDADate(recall.recall_initiation_date),
      reportDate: recall.report_date ? parseFDADate(recall.report_date) : null,
      productType: 'Food',
      status: recall.status || 'Active',
    },
  });
}

/**
 * Store USDA recall in database (upsert to avoid duplicates)
 */
async function storeUSDARecall(recall: USDARecall): Promise<void> {
  await prisma.recall.upsert({
    where: { recallNumber: recall.recallNumber },
    update: {
      title: recall.productName?.substring(0, 255) || recall.summary?.substring(0, 255) || 'USDA Recall',
      productDescription: recall.summary || recall.productName || '',
      reasonForRecall: recall.reason || recall.hazard || '',
      companyName: recall.companyName || 'Unknown',
      classification: normalizeUSDAClass(recall.recallClass),
      distributionPattern: recall.distribution || '',
      state: recall.state || null,
      recallInitiationDate: new Date(recall.recallDate),
      productType: recall.productType || 'Meat/Poultry',
      hazard: recall.hazard,
      status: 'Active',
      imageUrl: recall.images?.[0] || null,
      updatedAt: new Date(),
    },
    create: {
      recallNumber: recall.recallNumber,
      source: 'USDA',
      title: recall.productName?.substring(0, 255) || recall.summary?.substring(0, 255) || 'USDA Recall',
      productDescription: recall.summary || recall.productName || '',
      reasonForRecall: recall.reason || recall.hazard || '',
      companyName: recall.companyName || 'Unknown',
      classification: normalizeUSDAClass(recall.recallClass),
      distributionPattern: recall.distribution || '',
      state: recall.state || null,
      recallInitiationDate: new Date(recall.recallDate),
      productType: recall.productType || 'Meat/Poultry',
      hazard: recall.hazard,
      status: 'Active',
      imageUrl: recall.images?.[0] || null,
    },
  });
}

/**
 * Store CPSC recall in database (upsert to avoid duplicates)
 */
async function storeCPSCRecall(recall: CPSCRecall): Promise<void> {
  const productType = extractCPSCProductType(recall);
  const classification = inferCPSCClassification(recall);
  const manufacturer = recall.Manufacturers?.[0]?.Name || 'Unknown';
  const hazardText = recall.Hazards?.map(h => h.Name).join(', ') || '';
  const imageUrl = recall.Images?.[0]?.URL || null;

  await prisma.recall.upsert({
    where: { recallNumber: recall.RecallNumber },
    update: {
      title: recall.Title?.substring(0, 255) || 'CPSC Recall',
      productDescription: recall.Description || '',
      reasonForRecall: hazardText,
      companyName: manufacturer,
      classification,
      distributionPattern: 'Nationwide', // CPSC doesn't provide distribution
      state: 'US',
      recallInitiationDate: new Date(recall.RecallDate),
      reportDate: recall.LastPublishDate ? new Date(recall.LastPublishDate) : null,
      productType,
      hazard: hazardText,
      status: 'Active',
      imageUrl,
      sourceUrl: recall.URL,
      updatedAt: new Date(),
    },
    create: {
      recallNumber: recall.RecallNumber,
      source: 'CPSC',
      title: recall.Title?.substring(0, 255) || 'CPSC Recall',
      productDescription: recall.Description || '',
      reasonForRecall: hazardText,
      companyName: manufacturer,
      classification,
      distributionPattern: 'Nationwide',
      state: 'US',
      recallInitiationDate: new Date(recall.RecallDate),
      reportDate: recall.LastPublishDate ? new Date(recall.LastPublishDate) : null,
      productType,
      hazard: hazardText,
      status: 'Active',
      imageUrl,
      sourceUrl: recall.URL,
    },
  });
}

/**
 * Search and filter recalls from database
 */
export async function searchRecalls(filters: RecallFilters = {}) {
  const {
    source,
    state,
    classification,
    productType,
    searchQuery,
    startDate,
    endDate,
    limit = 50,
    offset = 0,
  } = filters;

  const where: any = {};

  if (source) where.source = source;
  if (state) where.state = state;
  if (classification) where.classification = classification;
  if (productType) where.productType = productType;

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: 'insensitive' } },
      { productDescription: { contains: searchQuery, mode: 'insensitive' } },
      { companyName: { contains: searchQuery, mode: 'insensitive' } },
      { reasonForRecall: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  if (startDate || endDate) {
    where.recallInitiationDate = {};
    if (startDate) where.recallInitiationDate.gte = startDate;
    if (endDate) where.recallInitiationDate.lte = endDate;
  }

  const [recalls, total] = await Promise.all([
    prisma.recall.findMany({
      where,
      orderBy: { recallInitiationDate: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.recall.count({ where }),
  ]);

  return {
    recalls,
    total,
    page: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get recall statistics
 */
export async function getRecallStats() {
  const [total, bySource, byClassification, recentCount] = await Promise.all([
    prisma.recall.count(),
    prisma.recall.groupBy({
      by: ['source'],
      _count: true,
    }),
    prisma.recall.groupBy({
      by: ['classification'],
      _count: true,
    }),
    prisma.recall.count({
      where: {
        recallInitiationDate: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    }),
  ]);

  return {
    total,
    bySource: bySource.reduce((acc, item) => {
      acc[item.source] = item._count;
      return acc;
    }, {} as Record<string, number>),
    byClassification: byClassification.reduce((acc, item) => {
      acc[item.classification || 'Unknown'] = item._count;
      return acc;
    }, {} as Record<string, number>),
    last30Days: recentCount,
  };
}
