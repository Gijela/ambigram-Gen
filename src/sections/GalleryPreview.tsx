'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  word1: string;
  word2: string;
  category: string;
  tags: string[];
  likes: number;
  downloads: number;
  imageUrl: string;
  author: string;
  createdAt: string;
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    word1: 'Love',
    word2: 'Life',
    category: 'Emotion',
    tags: ['love', 'life', 'tattoo'],
    likes: 1234,
    downloads: 567,
    imageUrl: '/api/placeholder/300/200',
    author: 'Anonymous User',
    createdAt: '2025-06-15'
  },
  {
    id: '2',
    word1: 'Hope',
    word2: 'Faith',
    category: 'Belief',
    tags: ['hope', 'faith', 'inspiration'],
    likes: 987,
    downloads: 432,
    imageUrl: '/api/placeholder/300/200',
    author: 'Designer A',
    createdAt: '2025-06-14'
  },
  {
    id: '3',
    word1: 'Family',
    word2: 'Forever',
    category: 'Family',
    tags: ['family', 'forever', 'tattoo'],
    likes: 2156,
    downloads: 891,
    imageUrl: '/api/placeholder/300/200',
    author: 'Tattoo Artist B',
    createdAt: '2025-06-13'
  },
  {
    id: '4',
    word1: 'Wisdom',
    word2: 'Power',
    category: 'Philosophy',
    tags: ['wisdom', 'power', 'minimalist'],
    likes: 1567,
    downloads: 678,
    imageUrl: '/api/placeholder/300/200',
    author: 'Calligrapher C',
    createdAt: '2025-06-12'
  },
  {
    id: '5',
    word1: 'Dream',
    word2: 'Reality',
    category: 'Philosophy',
    tags: ['dream', 'reality', 'deep'],
    likes: 876,
    downloads: 345,
    imageUrl: '/api/placeholder/300/200',
    author: 'Philosopher D',
    createdAt: '2025-06-11'
  },
  {
    id: '6',
    word1: 'Peace',
    word2: 'War',
    category: 'Contrast',
    tags: ['peace', 'war', 'contrast'],
    likes: 654,
    downloads: 234,
    imageUrl: '/api/placeholder/300/200',
    author: 'Artist E',
    createdAt: '2025-06-10'
  },
];

export const GalleryPreview = () => {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Community Gallery
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore stunning ambigram artworks created by our talented community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockGalleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 
                       hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20
                            flex items-center justify-center overflow-hidden">
                <div className="text-center transition-transform duration-500 group-hover:rotate-180">
                  <div className="text-2xl font-bold text-white mb-2">
                    {item.word1}
                  </div>
                  <div className="text-lg text-gray-300 transform rotate-180">
                    {item.word2}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.word1} ↔ {item.word2}
                    </h3>
                    <p className="text-sm text-gray-400">by {item.author}</p>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
            <Link href="/gallery" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700
                         hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold
                         transition-all duration-300 transform hover:scale-105">
                View Full Gallery
            </Link>
        </div>
      </div>
    </div>
  );
};