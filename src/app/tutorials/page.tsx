'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  steps: number;
  thumbnail: string;
  tags: string[];
}

const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Ambigram Basics Introduction',
    description: 'Learn the basic concepts and creation methods of ambigrams from scratch',
    category: 'Basic Tutorials',
    difficulty: 'beginner',
    duration: '10 min',
    steps: 5,
    thumbnail: '/api/placeholder/300/200',
    tags: ['beginner', 'basics', 'concepts']
  },
  {
    id: '2',
    title: 'Different Length Words Ambigram Techniques',
    description: 'Master advanced techniques for handling different length word combinations',
    category: 'Advanced Techniques',
    difficulty: 'intermediate',
    duration: '15 min',
    steps: 8,
    thumbnail: '/api/placeholder/300/200',
    tags: ['advanced', 'algorithm', 'techniques']
  },
  {
    id: '3',
    title: 'Tattoo Design Specialized Ambigrams',
    description: 'Professional methods for optimizing ambigrams for tattoo design',
    category: 'Tattoo Design',
    difficulty: 'intermediate',
    duration: '20 min',
    steps: 10,
    thumbnail: '/api/placeholder/300/200',
    tags: ['tattoo', 'design', 'professional']
  },
  {
    id: '4',
    title: 'Multi-Language Ambigram Creation Guide',
    description: 'Special handling methods and techniques for multi-language character ambigrams',
    category: 'Language Tutorials',
    difficulty: 'advanced',
    duration: '25 min',
    steps: 12,
    thumbnail: '/api/placeholder/300/200',
    tags: ['multilingual', 'characters', 'typography']
  },
  {
    id: '5',
    title: 'Font Selection and Pairing',
    description: 'How to choose the right fonts to enhance ambigram effects',
    category: 'Design Theory',
    difficulty: 'beginner',
    duration: '12 min',
    steps: 6,
    thumbnail: '/api/placeholder/300/200',
    tags: ['fonts', 'design', 'aesthetics']
  },
  {
    id: '6',
    title: 'Advanced Customization Techniques',
    description: 'Use advanced features to create unique ambigram works',
    category: 'Advanced Techniques',
    difficulty: 'advanced',
    duration: '30 min',
    steps: 15,
    thumbnail: '/api/placeholder/300/200',
    tags: ['advanced', 'customization', 'creative']
  }
];

const categories = ['All', 'Basic Tutorials', 'Advanced Techniques', 'Tattoo Design', 'Language Tutorials', 'Design Theory'];

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-300',
  intermediate: 'bg-yellow-500/20 text-yellow-300',
  advanced: 'bg-red-500/20 text-red-300'
};

const difficultyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredTutorials = mockTutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const handleQuickStart = () => {
    // Jump to first tutorial
    window.location.href = '/tutorials/1';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From basics to advanced, master ambigram creation techniques comprehensively
          </p>
        </motion.div>

        {/* Quick Start Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg
                   rounded-2xl p-6 mb-8 border border-purple-500/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Quick Start for Beginners</h2>
              <p className="text-gray-300">
                Get started in 5 minutes, create your first ambigram work
              </p>
            </div>
            <button
              onClick={handleQuickStart}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700
                             hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold
                             transition-all duration-300 transform hover:scale-105"
            >
              Start Learning
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Category Filter */}
          <div className="flex-1">
            <h3 className="text-white font-medium mb-3">Tutorial Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="lg:w-64">
            <h3 className="text-white font-medium mb-3">Difficulty Level</h3>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </motion.div>

        {/* Tutorial Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20
                       hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
              onClick={() => window.location.href = `/tutorials/${tutorial.id}`}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                            flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 6h12M6 18h12" />
                    </svg>
                  </div>
                  <div className="text-white font-medium">{tutorial.steps} Steps</div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tutorial Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[tutorial.difficulty]}`}>
                    {difficultyLabels[tutorial.difficulty]}
                  </span>
                  <span className="text-gray-400 text-sm">{tutorial.duration}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {tutorial.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tutorial.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-sm font-medium">
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {tutorial.steps} Steps
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Path Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Recommended Learning Paths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Beginner Path</h3>
              <p className="text-gray-400 text-sm mb-4">
                Start with basic concepts and gradually master ambigram creation skills
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Ambigram Basics Introduction</li>
                <li>• Font Selection and Pairing</li>
                <li>• Simple Work Practice</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-yellow-400 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Intermediate Path</h3>
              <p className="text-gray-400 text-sm mb-4">
                Master advanced techniques and create professional-level ambigram works
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Different Length Words Techniques</li>
                <li>• Tattoo Design Specialized Methods</li>
                <li>• Multi-Language Ambigram Creation</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-red-400 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Path</h3>
              <p className="text-gray-400 text-sm mb-4">
                Explore innovative techniques and become an ambigram design expert
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Advanced Customization Techniques</li>
                <li>• Creative Design Theory</li>
                <li>• Commercial Application Practice</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}