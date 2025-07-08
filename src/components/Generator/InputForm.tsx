'use client';

import { useAmbigramStore } from '@/lib/store/ambigramStore';
import { motion } from 'framer-motion';

export const InputForm = () => {
  const { inputText, inputText2, setInputText, setInputText2 } = useAmbigramStore();

  return (
    <div className="space-y-4">
      {/* First Input Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label htmlFor="inputText" className="block text-sm font-medium text-gray-300 mb-2">
          First Text (Top Display)
        </label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter first text, e.g.: Love"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-purple-500 focus:border-transparent transition-all duration-200
                   resize-none"
          maxLength={25}
          rows={1}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400">
            Supports English and Chinese characters
          </p>
          <span className="text-xs text-gray-400">
            {inputText.length}/25
          </span>
        </div>
      </motion.div>

      {/* Second Input Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label htmlFor="inputText2" className="block text-sm font-medium text-gray-300 mb-2">
          Second Text (Bottom Display) - Optional
        </label>
        <textarea
          id="inputText2"
          value={inputText2}
          onChange={(e) => setInputText2(e.target.value)}
          placeholder="Enter second text, e.g.: Life (leave blank for single text mode)"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-purple-500 focus:border-transparent transition-all duration-200
                   resize-none"
          maxLength={25}
          rows={1}
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400">
            Leave blank to maintain original functionality, fill to create vertical ambigram
          </p>
          <span className="text-xs text-gray-400">
            {inputText2.length}/25
          </span>
        </div>
      </motion.div>

      {/* Input Format Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20"
      >
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-xs text-gray-300">
            <p className="font-medium mb-2 text-white">Supported Input Formats:</p>
            <ul className="space-y-1">
              <li>• <span className="text-purple-300">Single Text Mode</span>: Fill only the first input box to create traditional ambigrams</li>
              <li>• <span className="text-pink-300">Dual Text Mode</span>: Fill both input boxes to create vertically arranged ambigrams</li>
              <li>• <span className="text-blue-300">Chinese Support</span>: Supports mixed Chinese and English input</li>
              <li>• <span className="text-green-300">Auto Adaptation</span>: Font size automatically adjusts based on content length</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Quick Example Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="pt-2"
      >
        <p className="text-xs text-gray-400 mb-2">Quick Try:</p>
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Single Text Mode Examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Peace',
              'Love',
              'Hope',
              '爱心'
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(example);
                  setInputText2('');
                }}
                className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10
                         border border-white/10 hover:border-white/20
                         rounded-lg text-gray-300 hover:text-white
                         transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
          
          <p className="text-xs text-gray-400 mt-3">Dual Text Mode Examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { text1: 'Love', text2: 'Life' },
              { text1: 'Hope', text2: 'Faith' },
              { text1: '爱', text2: '心' }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(example.text1);
                  setInputText2(example.text2);
                }}
                className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10
                         border border-white/10 hover:border-white/20
                         rounded-lg text-gray-300 hover:text-white
                         transition-all duration-200"
              >
                {example.text1} / {example.text2}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Input Hints */}
      {(inputText || inputText2) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
        >
          <div className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-xs text-blue-300">
              <p className="font-medium mb-1">Current Mode:</p>
              <div>
                <p className="text-green-300 font-medium">Vertical Ambigram Mode</p>
                <div className="mt-2 space-y-1">
                  <p className="text-white font-mono bg-white/10 px-2 py-1 rounded">
                    Top: {inputText}
                  </p>
                  {inputText2.trim() && (
                    <p className="text-white font-mono bg-white/10 px-2 py-1 rounded">
                      Bottom: {inputText2}
                    </p>
                  )}
                  {!inputText2.trim() && (
                    <p className="text-gray-400 font-mono bg-white/5 px-2 py-1 rounded italic">
                      Bottom: (Empty, not displayed)
                    </p>
                  )}
                </div>
                <p className="text-blue-200 mt-2">
                  ✨ {inputText2.trim() ? 'Will create vertically arranged ambigram' : 'Will create single-line vertical ambigram'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};