'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { FontLibrary } from '@/lib/ambigram/fontLibrary';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fontLibrary = new FontLibrary();

// Font name to ID mapping
const getCorrectFontId = (fontName: string): string => {
  const fontMapping: Record<string, string> = {
    'Arial': 'arial',
    'Times New Roman': 'times',
    'Impact': 'impact',
    'Courier New': 'courier',
    'Georgia': 'georgia',
    'Helvetica': 'helvetica',
    '黑体': 'simhei',
    '楷体': 'kaiti',
    'Brush Script': 'brush',
    'Papyrus': 'papyrus',
    'Comic Sans': 'comic',
    'Chalkduster': 'chalk'
  };
  
  return fontMapping[fontName] || fontName.toLowerCase();
};

export const FontSelector = () => {
  const { selectedFont, setSelectedFont, inputText, inputText2, generateAmbigram } = useAmbigramStore();
  const [fonts] = useState(() => fontLibrary.getAllFonts());
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Update recommendations when words change
  useEffect(() => {
    if (inputText && inputText2) {
      const recommended = fontLibrary.recommendFont(inputText, inputText2);
      setRecommendations(recommended);
    }
  }, [inputText, inputText2]);

  const handleFontSelect = async (fontName: string) => {
    setSelectedFont(fontName);
    // Auto-regenerate if words are already entered
    if (inputText.trim() && inputText2.trim()) {
      await generateAmbigram();
    }
  };

  return (
    <div className="space-y-4">
      {/* Recommended Fonts */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Smart Recommendations
          </h4>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((fontName) => (
              <button
                key={fontName}
                onClick={() => handleFontSelect(fontName)}
                className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                  selectedFont === fontName
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30'
                }`}
              >
                {fontLibrary.getFontDisplayName(fontName)}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Font Selection */}
      <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
        <div className="grid grid-cols-1 gap-3">
          {fonts.map((font, index) => (
          <motion.div
            key={font.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-white/30`}
            onClick={() => handleFontSelect(getCorrectFontId(font.name))}
          >
            <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {/* 字体预览 */}
                    <div className="w-16 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <span 
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: font.name }}
                      >
                        Aa
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-white">
                        {fontLibrary.getFontDisplayName(getCorrectFontId(font.name))}
                      </h3>
                      <p className="text-xs text-gray-400 capitalize">
                        {font.category} style
                      </p>
                    </div>
                  </div>
                  
                  {/* Font Features */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {font.category === 'tech' && (
                      <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded">
                        Tech Neon
                      </span>
                    )}
                    {font.category === 'royal' && (
                      <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded">
                        Royal Gold
                      </span>
                    )}
                    {font.category === 'explosive' && (
                      <span className="px-2 py-1 text-xs bg-rainbow-500/20 text-pink-300 rounded">
                        Explosive Rainbow
                      </span>
                    )}
                    {font.category === 'cyberpunk' && (
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                        Cyberpunk
                      </span>
                    )}
                    {font.category === 'elegant' && (
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                        Elegant Classic
                      </span>
                    )}
                    {font.category === 'modern' && (
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                        Modern Minimal
                      </span>
                    )}
                    {font.category === 'chinese' && (
                      <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded">
                        Chinese Red
                      </span>
                    )}
                    {font.category === 'calligraphy' && (
                      <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded">
                        Ink Calligraphy
                      </span>
                    )}
                    {font.category === 'artistic' && (
                      <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded">
                        Hand-drawn Art
                      </span>
                    )}
                    {font.category === 'ancient' && (
                      <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded">
                        Ancient Egypt
                      </span>
                    )}
                    {font.category === 'cartoon' && (
                      <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                        Cartoon Style
                      </span>
                    )}
                    {font.category === 'chalk' && (
                      <span className="px-2 py-1 text-xs bg-slate-500/20 text-slate-300 rounded">
                        Chalk Art
                      </span>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="ml-4">
                  {selectedFont === getCorrectFontId(font.name) ? (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-white/30 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Live Preview */}
              {(inputText || inputText2) && selectedFont === getCorrectFontId(font.name) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">Preview Effect:</p>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div
                        className="text-white text-lg"
                        style={{ fontFamily: font.name }}
                      >
                        {inputText || 'Word1'} / {inputText2 || 'Word2'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      {/* Font Description - Compact Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-2 bg-white/5 rounded-lg border border-white/10"
      >
        <details className="group">
          <summary className="text-sm font-medium text-white cursor-pointer flex items-center justify-between hover:text-purple-300 transition-colors">
            <span className="flex items-center">
              🎨 Artistic Font Styles
              <span className="ml-2 text-xs text-gray-400">(Click for details)</span>
            </span>
            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-2 pt-2 border-t border-white/10">
            <div className="text-xs text-gray-300 grid grid-cols-2 gap-1">
              <p>• <strong>Tech Neon</strong>: Futuristic vibes</p>
              <p>• <strong>Royal Gold</strong>: Luxurious elegance</p>
              <p>• <strong>Explosive Rainbow</strong>: Ultimate impact</p>
              <p>• <strong>Cyberpunk</strong>: Hacker style</p>
              <p>• <strong>Ink Calligraphy</strong>: Chinese tradition</p>
              <p>• <strong>Hand-drawn Art</strong>: Unlimited creativity</p>
            </div>
          </div>
        </details>
      </motion.div>
    </div>
  );
};