'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { FileExporter } from '@/lib/export/fileExporter';
import { ambigramEngine } from '@/lib/ambigram/engine';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fileExporter = new FileExporter();

export const DownloadPanel = () => {
  const { generationResult, inputText, inputText2 } = useAmbigramStore();
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exportMetrics, setExportMetrics] = useState<any>(null);

  // Get export metrics
  useEffect(() => {
    if (inputText) {
      const stats = ambigramEngine.getGenerationStats(inputText);
      setExportMetrics(stats);
    }
  }, [inputText, inputText2]);

  const handleExport = async (format: string, options?: any) => {
    if (!generationResult?.svg) return;

    setIsExporting(format);
    setExportSuccess(null);

    const startTime = performance.now();

    try {
      const exportOptions = {
        resolution: options?.resolution || (format === 'png-hd' ? 2048 : 1024),
        quality: options?.quality || 0.95,
        ...options
      };

      switch (format) {
        case 'png':
          await fileExporter.exportPNG(generationResult.svg, exportOptions);
          break;
        case 'png-hd':
          await fileExporter.exportPNG(generationResult.svg, exportOptions);
          break;
        case 'png-ultra':
          await fileExporter.exportPNG(generationResult.svg, { ...exportOptions, resolution: 4096 });
          break;
        case 'svg':
          await fileExporter.exportSVG(generationResult.svg);
          break;
        case 'pdf':
          await fileExporter.exportPDF(generationResult.svg);
          break;
        case 'tattoo':
          await fileExporter.exportTattooTemplate(generationResult.svg);
          break;
        case 'batch':
          await handleBatchExport();
          break;
        default:
          throw new Error('Unsupported format');
      }
      
      const endTime = performance.now();
      console.log(`Export ${format} took: ${(endTime - startTime).toFixed(2)}ms`);
      
      setExportSuccess(format);
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed, please try again');
    } finally {
      setIsExporting(null);
    }
  };

  // Batch export handling
  const handleBatchExport = async () => {
    if (!generationResult?.svg) return;
    
    const formats = ['png', 'svg', 'pdf'];
    const results = [];
    
    for (const format of formats) {
      try {
        switch (format) {
          case 'png':
            await fileExporter.exportPNG(generationResult.svg, { resolution: 2048 });
            break;
          case 'svg':
            await fileExporter.exportSVG(generationResult.svg);
            break;
          case 'pdf':
            await fileExporter.exportPDF(generationResult.svg);
            break;
        }
        results.push(format);
      } catch (error) {
        console.error(`Batch export ${format} failed:`, error);
      }
    }
    
    return results;
  };

  const downloadOptions = [
    {
      id: 'png',
      name: 'PNG Standard',
      description: 'Standard resolution (1024px)',
      icon: '🖼️',
      size: '~200KB',
      recommended: false,
      category: 'basic'
    },
    {
      id: 'png-hd',
      name: 'PNG HD',
      description: 'High resolution (2048px)',
      icon: '🖼️',
      size: '~800KB',
      recommended: true,
      category: 'basic'
    },
    {
      id: 'png-ultra',
      name: 'PNG Ultra HD',
      description: 'Ultra high resolution (4096px)',
      icon: '🖼️',
      size: '~3MB',
      recommended: false,
      category: 'advanced'
    },
    {
      id: 'svg',
      name: 'SVG Vector',
      description: 'Lossless scaling, professional design',
      icon: '📐',
      size: '~50KB',
      recommended: true,
      category: 'basic'
    },
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Perfect for printing and sharing',
      icon: '📄',
      size: '~500KB',
      recommended: false,
      category: 'basic'
    },
    {
      id: 'tattoo',
      name: 'Tattoo Template',
      description: 'Black & white lines, tattoo artist optimized',
      icon: '🎨',
      size: '~300KB',
      recommended: true,
      category: 'basic'
    },
    {
      id: 'batch',
      name: 'Batch Download',
      description: 'PNG + SVG + PDF all-in-one',
      icon: '📦',
      size: '~1.5MB',
      recommended: true,
      category: 'advanced'
    }
  ];

  // Filter options based on display mode
  const filteredOptions = showAdvanced
    ? downloadOptions
    : downloadOptions.filter(option => option.category === 'basic');

  if (!generationResult) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Performance Metrics Display */}
      {exportMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Generation Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-blue-200">
            <div>
              <span className="text-blue-400">Complexity:</span>
              <span className="ml-2 font-mono">{exportMetrics.complexity.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-blue-400">Strategy:</span>
              <span className="ml-2 font-mono">{exportMetrics.strategy}</span>
            </div>
            <div>
              <span className="text-blue-400">Quality Score:</span>
              <span className="ml-2 font-mono">{exportMetrics.qualityScore}%</span>
            </div>
            <div>
              <span className="text-blue-400">Estimated Time:</span>
              <span className="ml-2 font-mono">{exportMetrics.estimatedTime}s</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Advanced Options Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Download Options</h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
        >
          {showAdvanced ? 'Simple Mode' : 'Advanced Options'}
          <svg
            className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Download Options */}
      <div className="grid gap-3">
        {filteredOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-4 rounded-xl border transition-all duration-200 ${
              option.recommended
                ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            {option.recommended && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <h4 className="font-medium text-white">{option.name}</h4>
                  <p className="text-sm text-gray-400">{option.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Size: {option.size}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExport(option.id)}
                disabled={isExporting === option.id}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isExporting === option.id
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : exportSuccess === option.id
                    ? 'bg-green-500 text-white'
                    : option.recommended
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isExporting === option.id ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Exporting...</span>
                  </div>
                ) : exportSuccess === option.id ? (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Downloaded</span>
                  </div>
                ) : (
                  'Download'
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Batch Download */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4 border-t border-white/10"
      >
        <button
          onClick={() => fileExporter.exportAll(generationResult.svg)}
          disabled={isExporting !== null}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600
                   hover:from-purple-700 hover:to-pink-700 disabled:opacity-50
                   disabled:cursor-not-allowed text-white font-medium rounded-xl
                   transition-all duration-200"
        >
          {isExporting ? 'Exporting...' : 'Download All Formats'}
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          One-click download PNG, SVG, PDF formats
        </p>
      </motion.div>

      {/* Usage Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 rounded-lg p-4 border border-white/10"
      >
        <h4 className="text-sm font-medium text-white mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Format Guide
        </h4>
        <div className="text-xs text-gray-300 space-y-1">
          <p>• <strong>PNG</strong>: Perfect for web sharing and social media</p>
          <p>• <strong>SVG</strong>: Vector format, infinite scaling, professional design</p>
          <p>• <strong>PDF</strong>: Ideal for printing, document storage and professional use</p>
          <p>• <strong>Tattoo Template</strong>: Black & white line version, optimized for tattoo artists</p>
        </div>
      </motion.div>

      {/* Copyright Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>All downloads are completely free, no watermark, commercial use allowed</span>
        </div>
      </motion.div>
    </motion.div>
  );
};