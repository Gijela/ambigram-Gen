'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const handleEmailContact = () => {
    window.location.href = 'mailto:contact@ambigramgen.com?subject=Contact AmbigramGen&body=Hello, I would like to learn more about AmbigramGen.';
  };

  const handleJoinCommunity = () => {
    alert('Redirecting to AmbigramGen community! We are currently building it, stay tuned.');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Dedicated to making beautiful ambigram creation accessible to everyone
          </p>
        </motion.div>

        {/* 项目介绍 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">What is AmbigramGen?</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                AmbigramGen is the world's first free ambigram generator that supports different length word combinations.
                An ambigram is a special form of text art that can be read as different words or meanings from different
                angles (usually rotated 180 degrees).
              </p>
              <p>
                Traditional ambigram creation requires deep design skills and significant time investment, and most tools
                can only handle words of the same length. Our innovative algorithm breaks through this limitation,
                allowing anyone to easily create professional-grade ambigram artworks.
              </p>
              <p>
                Whether you're a tattoo enthusiast, designer, or simply interested in text art, AmbigramGen can help
                you bring your creative ideas to life.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 核心特色 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Smart Algorithm</h3>
              <p className="text-gray-400 text-sm">
                Proprietary letter mapping algorithm that perfectly solves the challenge of generating ambigrams
                with different length words, supports mixed languages, and intelligently optimizes letter spacing and proportions.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Tattoo Optimized</h3>
              <p className="text-gray-400 text-sm">
                Specially optimized for tattoo design, providing professional features like tattoo templates,
                size calculations, and skin adaptation to make your tattoo designs perfect.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Completely Free</h3>
              <p className="text-gray-400 text-sm">
                No watermarks, no restrictions, supports high-quality export in multiple formats including PNG, SVG, PDF,
                letting creativity flow without any constraints.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Continuous Innovation</h3>
              <p className="text-gray-400 text-sm">
                Continuously optimizing algorithms, adding new features, supporting more languages and fonts,
                committed to becoming the most powerful ambigram creation platform.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 技术创新 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg 
                        rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Innovation Breakthrough</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Different Length Word Algorithm</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Traditional ambigrams can only handle words of the same length. We developed a revolutionary
                  letter mapping algorithm that perfectly solves this challenge through intelligent padding,
                  letter transformation, and space optimization techniques.
                </p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Smart letter mapping and matching</li>
                  <li>• Dynamic space allocation algorithm</li>
                  <li>• Visual balance optimization system</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Multi-language Support</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Supports mixed language ambigram creation, with special optimization for various character
                  structures, achieving perfect presentation of ambigrams in multiple languages.
                </p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Character structure analysis</li>
                  <li>• Stroke symmetry processing</li>
                  <li>• Calligraphic aesthetics integration</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 使用统计 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Artworks Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">15K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-400 mb-2">200+</div>
              <div className="text-gray-400 text-sm">Font Library</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Service Uptime</div>
            </div>
          </div>
        </motion.section>

        {/* 联系我们 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              Have any questions or suggestions? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleEmailContact}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700
                         hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold
                         transition-all duration-300 transform hover:scale-105"
              >
                Send Email
              </button>
              <button
                onClick={handleJoinCommunity}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl
                         font-semibold transition-all duration-300 border border-white/20"
              >
                Join Community
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}