'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ambigramEngine } from '@/lib/ambigram/engine';

export const PreviewCanvas = () => {
  const {
    generationResult,
    isGenerating,
    previewRotated,
    toggleRotation,
    inputText,
    inputText2,
    selectedFont
  } = useAmbigramStore();


  const [imageError, setImageError] = useState(false);
  const [livePreview, setLivePreview] = useState<string>('');
  const [isPreviewGenerating, setIsPreviewGenerating] = useState(false);

  // Live preview generation
  useEffect(() => {
    const generateLivePreview = async () => {
      if (isGenerating || (generationResult && generationResult.success)) {
        return; // Don't show live preview if generating or already have result
      }

      setIsPreviewGenerating(true);
      try {
        // 🔥 Modified: Always use vertical bidirectional mode, even if second input is empty
        const previewText = `${inputText.trim()}|${inputText2.trim()}`;
        
        const preview = ambigramEngine.generatePreview(previewText, selectedFont);
        setLivePreview(preview);
      } catch (error) {
        console.error('Live preview generation failed:', error);
        setLivePreview(ambigramEngine.generatePreview('', selectedFont));
      } finally {
        setIsPreviewGenerating(false);
      }
    };

    // Add debounce delay
    const timeoutId = setTimeout(generateLivePreview, 300);
    return () => clearTimeout(timeoutId);
  }, [inputText, inputText2, selectedFont, isGenerating, generationResult]);

  const handleRotationToggle = () => {
    toggleRotation();
  };

  return (
    <div className="space-y-4">
      {/* Preview Area */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gradient-to-br from-black/20 via-purple-900/10 to-black/20 rounded-xl border border-white/10 overflow-hidden min-h-[300px] flex items-center justify-center backdrop-blur-sm">
          {/* Background Decoration Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <AnimatePresence mode="wait">
            {isGenerating ? (
              // Generating State
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500/30 border-b-pink-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                  <p className="text-white font-medium">Generating Ambigram...</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {inputText}{inputText2.trim() ? ` / ${inputText2}` : ''}
                  </p>
                </div>
              </motion.div>
            ) : generationResult && generationResult.success ? (
              // Display Generation Result - Enhanced Version
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="w-full h-full flex items-center justify-center p-4 relative"
              >
                {/* Success Generation Celebration Effect */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
                </motion.div>

                <motion.div
                  animate={{
                    rotateZ: previewRotated ? 180 : 0
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="w-full h-full flex items-center justify-center relative"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    transformOrigin: 'center center',
                    minHeight: '200px' // 确保有足够的高度
                  }}
                >
                  {!imageError ? (
                    <motion.div
                      className="max-w-full max-h-full relative"
                      initial={{ filter: 'blur(10px)', opacity: 0 }}
                      animate={{ filter: 'blur(0px)', opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      dangerouslySetInnerHTML={{ __html: generationResult.svg }}
                      onError={() => setImageError(true)}
                      style={{
                        minWidth: '300px',
                        minHeight: '150px'
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <motion.svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </motion.svg>
                      <p>Preview Loading Failed</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ) : inputText && livePreview ? (
              // Live Preview State - Enhanced Version
              <motion.div
                key="live-preview"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="w-full h-full flex items-center justify-center p-6 relative"
              >
                {/* Live Preview Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg"></div>
                
                {isPreviewGenerating ? (
                  <div className="text-center relative z-10">
                    <div className="relative">
                      <div className="w-12 h-12 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
                      <div className="absolute inset-0 w-12 h-12 border-3 border-pink-500/20 border-b-pink-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>
                    <motion.p
                      className="text-gray-300 text-sm font-medium"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Generating Preview...
                    </motion.p>
                    <p className="text-gray-500 text-xs mt-1">
                      Processing {inputText}{inputText2.trim() ? ` / ${inputText2}` : ''}
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                    <motion.div
                      className="w-full max-h-full mb-4 flex items-center justify-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      dangerouslySetInnerHTML={{ __html: livePreview.replaceAll('|', '') }}
                      style={{ minHeight: '200px' }}
                    />
                    <div className="text-center">
                      <motion.div
                        className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(59, 130, 246, 0.4)',
                            '0 0 0 4px rgba(59, 130, 246, 0.1)',
                            '0 0 0 0 rgba(59, 130, 246, 0.4)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-300 font-medium">Live Preview</span>
                      </motion.div>
                      <motion.p
                        className="text-xs text-gray-400 mt-2"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Click "Generate Ambigram" for high-quality results
                      </motion.p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              // Empty State
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 font-medium">Ambigram Preview</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter text to start create
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Rotation Button */}
        {generationResult && generationResult.success && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
              backgroundColor: 'rgba(139, 92, 246, 0.2)'
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRotationToggle}
            className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30
                     backdrop-blur-sm border border-purple-400/30 rounded-full
                     flex items-center justify-center transition-all duration-300 group"
            title="Rotate Preview"
          >
            <motion.svg
              className="w-6 h-6 text-white group-hover:text-purple-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: previewRotated ? 180 : 0,
                scale: previewRotated ? 1.1 : 1
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </motion.svg>
            
            {/* Button Halo Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </div>

      {/* Preview Controls */}
      {generationResult && generationResult.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRotationToggle}
              className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 
                       rounded-lg border border-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm text-white">
                {previewRotated ? 'Normal' : 'Rotate'}
              </span>
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Click rotation button to view bidirectional effect
          </div>
        </motion.div>
      )}

      {/* Generation Information */}
      {generationResult && generationResult.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-300">
              <span className="text-white font-medium">
                {generationResult.metadata.word1}
              </span>
              {' ↔ '}
              <span className="text-white font-medium">
                {generationResult.metadata.word2}
              </span>
            </div>
            <div className="text-gray-400">
              {generationResult.metadata.fontUsed} Font
            </div>
          </div>
          
          {generationResult.metadata.mappings && generationResult.metadata.mappings.length > 0 && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-1">Letter Mapping:</p>
              <div className="flex flex-wrap gap-1">
                {generationResult.metadata.mappings.map((mapping, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/10 rounded text-xs text-white"
                  >
                    {mapping.letter1} ↔ {mapping.letter2}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Ambigrams can be read from both directions, rotating 180 degrees reveals another word</span>
        </div>
      </motion.div>
    </div>
  );
};