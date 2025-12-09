/**
 * Simple in-memory cache for recall data
 * Reduces API calls to government servers and improves response times
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Get cached data if it exists and hasn't expired
   * @param key Cache key
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data as T;
  }

  /**
   * Set cached data with TTL (time to live)
   * @param key Cache key
   * @param data Data to cache
   * @param ttlSeconds TTL in seconds (default: 1 hour)
   */
  set<T>(key: string, data: T, ttlSeconds: number = 3600): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + (ttlSeconds * 1000),
    };
    
    this.cache.set(key, entry);
  }

  /**
   * Check if a key exists and is not expired
   * @param key Cache key
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete a cache entry
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries (cleanup)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const cache = new MemoryCache();

// Run cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 3600000); // 1 hour
}

/**
 * Cache keys for different data types
 */
export const CacheKeys = {
  FDA_RECALLS: 'recalls:fda',
  USDA_RECALLS: 'recalls:usda',
  CPSC_RECALLS: 'recalls:cpsc',
  ALL_RECALLS: 'recalls:all',
  STORES: 'stores:all',
} as const;

/**
 * Cache TTL (time to live) in seconds
 */
export const CacheTTL = {
  SHORT: 900,      // 15 minutes
  MEDIUM: 3600,    // 1 hour
  LONG: 21600,     // 6 hours
  DAY: 86400,      // 24 hours
} as const;
