'use client';

import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-violet-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Ambigram Generator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Smart ambigram creation tool supporting different length words
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            World's first free ambigram generator supporting different length word combinations, optimized for tattoo design, watermark-free, unlimited, high-quality export
          </p>
        </motion.div>

        {/* Featured Functions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Algorithm</h3>
            <p className="text-gray-400 text-sm">
              Original letter mapping algorithm that perfectly solves the ambigram generation challenge for different length words
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tattoo Optimized</h3>
            <p className="text-gray-400 text-sm">
              Specially optimized for tattoo design, providing tattoo templates, size calculations and other professional features
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Completely Free</h3>
            <p className="text-gray-400 text-sm">
              No watermarks, no restrictions, supports high-quality export in PNG, SVG, PDF and other formats
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <a
            href="#generator"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600
                     hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl
                     transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">Start Create Free Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>

        {/* Example Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16"
        >
          <p className="text-gray-400 text-sm mb-6">Popular Ambigram Examples</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { word1: 'Love', word2: 'Life' },
              { word1: 'Hope', word2: 'Faith' },
              { word1: 'Family', word2: 'Forever' },
              { word1: '爱', word2: '心' }
            ].map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/10"
              >
                <span className="text-white text-sm font-medium">
                  {example.word1} ↔ {example.word2}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};