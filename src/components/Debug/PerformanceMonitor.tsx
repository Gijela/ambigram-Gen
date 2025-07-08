'use client';

import React, { useState, useEffect } from 'react';
import { ambigramEngine } from '@/lib/ambigram/engine';

interface PerformanceInfo {
  cache: {
    totalEntries: number;
    totalSize: number;
    hitRate: number;
    missRate: number;
    totalHits: number;
    totalMisses: number;
  };
  worker: {
    available: boolean;
    pendingTasks: number;
  };
  memory: {
    used: number;
    total: number;
    limit: number;
  } | null;
  recommendations: string[];
}

export const PerformanceMonitor: React.FC = () => {
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Get performance information
  const fetchPerformanceInfo = () => {
    const info = ambigramEngine.getPerformanceInfo();
    setPerformanceInfo(info);
  };

  // Auto refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchPerformanceInfo, 2000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Initial load
  useEffect(() => {
    fetchPerformanceInfo();
  }, []);

  // Format file size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  // Clear cache
  const handleClearCache = () => {
    ambigramEngine.clearCache();
    fetchPerformanceInfo();
  };

  // Pre-warm cache
  const handlePreWarmCache = async () => {
    await ambigramEngine.preWarmCache();
    fetchPerformanceInfo();
  };

  if (!performanceInfo) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-lg text-sm">
        Loading performance info...
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg z-50 transition-colors"
        title="Performance Monitor"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Performance Monitor Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto z-40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Monitor
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-2 py-1 text-xs rounded ${
                  autoRefresh
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {autoRefresh ? 'Auto Refresh' : 'Manual Refresh'}
              </button>
              <button
                onClick={fetchPerformanceInfo}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Cache Information */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cache Status
            </h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Cache Entries:</span>
                <span className="font-mono">{performanceInfo.cache.totalEntries}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache Size:</span>
                <span className="font-mono">{formatBytes(performanceInfo.cache.totalSize)}</span>
              </div>
              <div className="flex justify-between">
                <span>Hit Rate:</span>
                <span className={`font-mono ${
                  performanceInfo.cache.hitRate > 70 ? 'text-green-600' :
                  performanceInfo.cache.hitRate > 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {formatPercentage(performanceInfo.cache.hitRate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hits/Misses:</span>
                <span className="font-mono">
                  {performanceInfo.cache.totalHits}/{performanceInfo.cache.totalMisses}
                </span>
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleClearCache}
                className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
              >
                Clear Cache
              </button>
              <button
                onClick={handlePreWarmCache}
                className="px-2 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded hover:bg-orange-200 dark:hover:bg-orange-800"
              >
                Pre-warm Cache
              </button>
            </div>
          </div>

          {/* Worker Status */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Worker Status
            </h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className={`font-mono ${
                  performanceInfo.worker.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performanceInfo.worker.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pending Tasks:</span>
                <span className={`font-mono ${
                  performanceInfo.worker.pendingTasks > 5 ? 'text-red-600' :
                  performanceInfo.worker.pendingTasks > 2 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {performanceInfo.worker.pendingTasks}
                </span>
              </div>
            </div>
          </div>

          {/* Memory Information */}
          {performanceInfo.memory && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Memory Usage
              </h4>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span className="font-mono">{performanceInfo.memory.used} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-mono">{performanceInfo.memory.total} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Limit:</span>
                  <span className="font-mono">{performanceInfo.memory.limit} MB</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(performanceInfo.memory.used / performanceInfo.memory.total) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Recommendations */}
          {performanceInfo.recommendations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Performance Recommendations
              </h4>
              <div className="space-y-1">
                {performanceInfo.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-2 rounded"
                  >
                    {recommendation}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};