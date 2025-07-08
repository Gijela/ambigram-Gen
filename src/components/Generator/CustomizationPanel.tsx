'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { motion } from 'framer-motion';

export const CustomizationPanel = () => {
  const {
    fontSize,
    color,
    strokeWidth,
    letterSpacing,
    setFontSize,
    setColor,
    setStrokeWidth,
    setLetterSpacing,
    applyPreset,
    resetToDefaults
  } = useAmbigramStore();

  const presets = [
    { id: 'romantic', name: 'Romantic', color: '#ff69b4', icon: '💕' },
    { id: 'family', name: 'Family', color: '#2c3e50', icon: '👨‍👩‍👧‍👦' },
    { id: 'gothic', name: 'Gothic', color: '#000000', icon: '🗡️' },
    { id: 'elegant', name: 'Elegant', color: '#8b4513', icon: '✨' },
    { id: 'bold', name: 'Bold', color: '#1a1a1a', icon: '💪' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-6"
    >
      {/* Preset Styles */}
      <div>
        <h4 className="text-sm font-medium text-white mb-3">Quick Presets</h4>
        <div className="grid grid-cols-5 gap-2">
          {presets.map((preset) => (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyPreset(preset.id)}
              className="flex flex-col items-center p-3 bg-white/5 hover:bg-white/10
                       rounded-lg border border-white/10 hover:border-white/20
                       transition-all duration-200"
            >
              <span className="text-lg mb-1">{preset.icon}</span>
              <span className="text-xs text-gray-300">{preset.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Font Size: {fontSize}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="24"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                     slider-thumb:appearance-none slider-thumb:w-4 slider-thumb:h-4
                     slider-thumb:bg-purple-500 slider-thumb:rounded-full slider-thumb:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Small (24px)</span>
            <span>Large (72px)</span>
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Color
        </label>
        <div className="space-y-3">
          {/* 颜色输入 */}
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent"
              placeholder="#000000"
            />
          </div>
          
          {/* Preset Colors */}
          <div className="grid grid-cols-8 gap-2">
            {[
              '#000000', '#ffffff', '#ff0000', '#00ff00',
              '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
              '#800000', '#008000', '#000080', '#808000',
              '#800080', '#008080', '#c0c0c0', '#808080'
            ].map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                  color === presetColor
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{ backgroundColor: presetColor }}
                title={presetColor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stroke Width */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Stroke Width: {strokeWidth}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Thin (0.5px)</span>
            <span>Thick (5px)</span>
          </div>
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Letter Spacing: {letterSpacing > 0 ? '+' : ''}{letterSpacing}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="-10"
            max="10"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Tight (-10px)</span>
            <span>Normal (0px)</span>
            <span>Loose (+10px)</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={resetToDefaults}
          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20
                   border border-white/20 rounded-lg text-white text-sm
                   transition-all duration-200"
        >
          Reset to Default Settings
        </button>
      </div>

      {/* Live Preview Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
      >
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-blue-300">
            <p className="font-medium mb-1">💡 Customization Tips</p>
            <ul className="space-y-1">
              <li>• Need to regenerate after adjusting settings to see effects</li>
              <li>• Tattoo designs recommend using thicker strokes (2-3px)</li>
              <li>• Dark backgrounds recommend using light fonts</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};