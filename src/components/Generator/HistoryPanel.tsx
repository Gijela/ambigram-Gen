'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GenerationResult } from '@/lib/ambigram/types';

export const HistoryPanel = () => {
  const { history, clearHistory, setInputText, setInputText2, setSelectedFont, setFontSize, setColor, setStrokeWidth, setLetterSpacing } = useAmbigramStore();
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-400 font-medium">No History Records</p>
        <p className="text-gray-500 text-sm mt-1">
          History records will appear here after generating ambigrams
        </p>
      </motion.div>
    );
  }

  const restoreFromHistory = (result: GenerationResult) => {
    if (result.metadata) {
      setInputText(result.metadata.word1);
      setInputText2(result.metadata.word2);
      setSelectedFont(result.metadata.fontUsed);
      // Note: GenerationResult metadata doesn't contain fontSize and other style info
      // These need to be obtained from elsewhere or use default values
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* History Records List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={`${item.metadata.word1}-${item.metadata.word2}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
            >
              {/* History Item Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {item.metadata.word1}
                    </span>
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    <span className="text-white font-medium">
                      {item.metadata.word2}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHistory(
                      selectedHistory === `${item.metadata.word1}-${item.metadata.word2}-${index}`
                        ? null
                        : `${item.metadata.word1}-${item.metadata.word2}-${index}`
                    )}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {selectedHistory === `${item.metadata.word1}-${item.metadata.word2}-${index}` ? 'Collapse' : 'Expand'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{item.metadata.fontUsed} Font</span>
                  <span>{new Date(item.metadata.generatedAt).toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedHistory === `${item.metadata.word1}-${item.metadata.word2}-${index}` && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-4 space-y-4">
                      {/* Preview Image */}
                      <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.svg }}
                          className="max-w-full max-h-full"
                        />
                      </div>

                      {/* Letter Mapping Information */}
                      {item.metadata.mappings && item.metadata.mappings.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Letter Mapping:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.metadata.mappings.map((mapping, mappingIndex) => (
                              <span
                                key={mappingIndex}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-white"
                              >
                                {mapping.letter1} ↔ {mapping.letter2}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => restoreFromHistory(item)}
                          className="flex-1 py-2 px-3 bg-purple-500/20 hover:bg-purple-500/30
                                   border border-purple-500/30 rounded-lg text-purple-300 text-xs
                                   transition-all duration-200"
                        >
                          Restore Settings
                        </button>
                        <button
                          onClick={() => {
                            // Download this history record
                            const link = document.createElement('a');
                            const blob = new Blob([item.svg], { type: 'image/svg+xml' });
                            link.href = URL.createObjectURL(blob);
                            link.download = `${item.metadata.word1}-${item.metadata.word2}.svg`;
                            link.click();
                          }}
                          className="flex-1 py-2 px-3 bg-green-500/20 hover:bg-green-500/30
                                   border border-green-500/30 rounded-lg text-green-300 text-xs
                                   transition-all duration-200"
                        >
                          Download SVG
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* History Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 rounded-lg p-3 border border-white/10"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-300">
            <span className="text-white font-medium">Total Generated:</span>
            {history.length} ambigrams
          </div>
          <div className="text-gray-400">
            Max 10 history records saved
          </div>
        </div>
      </motion.div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
      >
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-blue-300">
            <p className="font-medium mb-1">💡 History Tips</p>
            <ul className="space-y-1">
              <li>• Click "Expand" to view details and preview</li>
              <li>• Can regenerate or directly download historical works</li>
              <li>• History records are auto-saved, max 10 records kept</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};