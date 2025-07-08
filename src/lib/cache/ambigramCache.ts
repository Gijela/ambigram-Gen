// Ambigram Cache System
// Ambigram caching system for improving generation performance and user experience

import type { AmbigramConfig, GenerationResult } from '../ambigram/types';

interface CacheEntry {
  result: GenerationResult;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
  size: number; // SVG string size
}

interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
}

export class AmbigramCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private maxAge: number;
  private totalHits = 0;
  private totalMisses = 0;

  constructor(
    maxSize: number = 100, // Maximum cache entries
    maxAge: number = 30 * 60 * 1000 // 30 minutes expiration time
  ) {
    this.maxSize = maxSize;
    this.maxAge = maxAge;

    // Periodically clean expired cache
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.cleanup();
      }, 5 * 60 * 1000); // Clean every 5 minutes
    }
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(config: AmbigramConfig): string {
    const keyData = {
      inputText: config.inputText.toLowerCase(),
      fontFamily: config.fontFamily,
      fontSize: config.fontSize,
      color: config.color,
      strokeWidth: config.strokeWidth,
      letterSpacing: config.letterSpacing || 0
    };

    // Use JSON string as key and add hash to shorten length
    const jsonStr = JSON.stringify(keyData);
    return this.simpleHash(jsonStr);
  }

  /**
   * Simple hash function
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get cached result
   */
  get(config: AmbigramConfig): GenerationResult | null {
    const key = this.generateCacheKey(config);
    const entry = this.cache.get(key);

    if (!entry) {
      this.totalMisses++;
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      this.totalMisses++;
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.totalHits++;

    console.log(`🎯 Cache hit for: ${config.inputText}`);
    return entry.result;
  }

  /**
   * Set cache result
   */
  set(config: AmbigramConfig, result: GenerationResult): void {
    const key = this.generateCacheKey(config);
    const size = result.svg.length;

    // Check cache size limit
    if (this.cache.size >= this.maxSize) {
      this.evictLeastUsed();
    }

    const entry: CacheEntry = {
      result,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now(),
      size
    };

    this.cache.set(key, entry);
    console.log(`💾 Cached result for: ${config.inputText}`);
  }

  /**
   * Check if cache exists
   */
  has(config: AmbigramConfig): boolean {
    const key = this.generateCacheKey(config);
    const entry = this.cache.get(key);
    
    if (!entry) return false;
    
    // Check if expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Clear specific cache
   */
  delete(config: AmbigramConfig): boolean {
    const key = this.generateCacheKey(config);
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.totalHits = 0;
    this.totalMisses = 0;
    console.log('🗑️ Cache cleared');
  }

  /**
   * Clean expired cache
   */
  cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;

    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned ${cleanedCount} expired cache entries`);
    }
  }

  /**
   * Evict least recently used cache items
   */
  private evictLeastUsed(): void {
    let leastUsedKey: string | null = null;
    let leastUsedEntry: CacheEntry | null = null;

    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (!leastUsedEntry || 
          entry.accessCount < leastUsedEntry.accessCount ||
          (entry.accessCount === leastUsedEntry.accessCount && 
           entry.lastAccessed < leastUsedEntry.lastAccessed)) {
        leastUsedKey = key;
        leastUsedEntry = entry;
      }
    }

    if (leastUsedKey) {
      this.cache.delete(leastUsedKey);
      console.log('🗑️ Evicted least used cache entry');
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.totalHits + this.totalMisses;
    const totalSize = Array.from(this.cache.values())
      .reduce((sum, entry) => sum + entry.size, 0);

    return {
      totalEntries: this.cache.size,
      totalSize,
      hitRate: totalRequests > 0 ? (this.totalHits / totalRequests) * 100 : 0,
      missRate: totalRequests > 0 ? (this.totalMisses / totalRequests) * 100 : 0,
      totalHits: this.totalHits,
      totalMisses: this.totalMisses
    };
  }

  /**
   * Get cache details (for debugging)
   */
  getDebugInfo(): any {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      timestamp: new Date(entry.timestamp).toISOString(),
      accessCount: entry.accessCount,
      lastAccessed: new Date(entry.lastAccessed).toISOString(),
      size: entry.size,
      age: Date.now() - entry.timestamp
    }));

    return {
      stats: this.getStats(),
      entries: entries.sort((a, b) => b.accessCount - a.accessCount)
    };
  }

  /**
   * Warm up cache - Pre-generate cache for common word combinations
   */
  async preWarm(commonPairs: Array<{ word1: string; word2: string }>, generateFn: (config: AmbigramConfig) => Promise<GenerationResult>): Promise<void> {
    console.log('🔥 Starting cache pre-warming...');
    
    const defaultConfig: Partial<AmbigramConfig> = {
      fontFamily: 'Arial',
      fontSize: 48,
      color: '#8B5CF6',
      strokeWidth: 1,
      letterSpacing: 0
    };

    let warmedCount = 0;
    for (const pair of commonPairs) {
      const config: AmbigramConfig = {
        ...defaultConfig,
        word1: pair.word1,
        word2: pair.word2
      } as AmbigramConfig;

      if (!this.has(config)) {
        try {
          const result = await generateFn(config);
          this.set(config, result);
          warmedCount++;
        } catch (error) {
          console.warn(`Failed to pre-warm cache for ${pair.word1}+${pair.word2}:`, error);
        }
      }
    }

    console.log(`🔥 Cache pre-warming completed: ${warmedCount} entries added`);
  }

  /**
   * Export cache data
   */
  export(): string {
    const data = {
      version: '1.0',
      timestamp: Date.now(),
      entries: Array.from(this.cache.entries()),
      stats: {
        totalHits: this.totalHits,
        totalMisses: this.totalMisses
      }
    };
    
    return JSON.stringify(data);
  }

  /**
   * Import cache data
   */
  import(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.version !== '1.0') {
        console.warn('Unsupported cache version');
        return false;
      }

      // Clear existing cache
      this.clear();

      // Import cache entries
      for (const [key, entry] of parsed.entries) {
        // Check if entry is still valid
        if (Date.now() - entry.timestamp < this.maxAge) {
          this.cache.set(key, entry);
        }
      }

      // Restore statistics
      this.totalHits = parsed.stats.totalHits || 0;
      this.totalMisses = parsed.stats.totalMisses || 0;

      console.log(`📥 Imported ${this.cache.size} cache entries`);
      return true;
      
    } catch (error) {
      console.error('Failed to import cache data:', error);
      return false;
    }
  }
}

// Singleton instance
export const ambigramCache = new AmbigramCache();

// Common word pairs (for cache warming)
export const COMMON_WORD_PAIRS = [
  { word1: 'love', word2: 'hate' },
  { word1: 'good', word2: 'evil' },
  { word1: 'light', word2: 'dark' },
  { word1: 'hope', word2: 'fear' },
  { word1: 'peace', word2: 'war' },
  { word1: 'happy', word2: 'sad' },
  { word1: 'life', word2: 'death' },
  { word1: 'angel', word2: 'devil' },
  { word1: 'heaven', word2: 'hell' },
  { word1: 'sun', word2: 'moon' }
];