'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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
  {
    id: '7',
    word1: 'Angel',
    word2: 'Devil',
    category: 'Contrast',
    tags: ['angel', 'devil', 'contrast'],
    likes: 1890,
    downloads: 756,
    imageUrl: '/api/placeholder/300/200',
    author: 'Tattoo Artist F',
    createdAt: '2025-06-09'
  },
  {
    id: '8',
    word1: 'Strength',
    word2: 'Courage',
    category: 'Belief',
    tags: ['strength', 'courage', 'motivation'],
    likes: 1345,
    downloads: 623,
    imageUrl: '/api/placeholder/300/200',
    author: 'Fitness Coach G',
    createdAt: '2025-06-08'
  },
  {
    id: '9',
    word1: 'Create',
    word2: 'Inspire',
    category: 'Art',
    tags: ['create', 'inspire', 'artistic'],
    likes: 2234,
    downloads: 987,
    imageUrl: '/api/placeholder/300/200',
    author: 'Master Artist H',
    createdAt: '2025-06-07'
  },
  {
    id: '10',
    word1: 'Mother',
    word2: 'Father',
    category: 'Family',
    tags: ['parents', 'family', 'gratitude'],
    likes: 1678,
    downloads: 834,
    imageUrl: '/api/placeholder/300/200',
    author: 'Designer I',
    createdAt: '2025-06-06'
  },
  {
    id: '11',
    word1: 'Sun',
    word2: 'Moon',
    category: 'Nature',
    tags: ['sun', 'moon', 'nature'],
    likes: 1123,
    downloads: 445,
    imageUrl: '/api/placeholder/300/200',
    author: 'Astronomy Lover J',
    createdAt: '2025-06-05'
  },
  {
    id: '12',
    word1: 'Music',
    word2: 'Soul',
    category: 'Art',
    tags: ['music', 'soul', 'artistic'],
    likes: 967,
    downloads: 378,
    imageUrl: '/api/placeholder/300/200',
    author: 'Musician K',
    createdAt: '2025-06-04'
  }
];

const categories = ['All', 'Emotion', 'Belief', 'Family', 'Philosophy', 'Contrast', 'Nature', 'Art'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const handleDownload = (item: GalleryItem) => {
    // 创建一个canvas来生成双向图
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    canvas.width = 800;
    canvas.height = 400;

    // 设置背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 设置文字样式
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 绘制正向文字
    ctx.font = 'bold 48px Arial';
    ctx.fillText(item.word1, canvas.width / 2, canvas.height / 2 - 40);

    // 绘制反向文字
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 40);
    ctx.rotate(Math.PI);
    ctx.fillText(item.word2, 0, 0);
    ctx.restore();

    // 添加作者信息
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(`Created by ${item.author} - AmbigramGen.com`, canvas.width / 2, canvas.height - 30);

    // 转换为blob并下载
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ambigram-${item.word1}-${item.word2}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const filteredItems = mockGalleryItems.filter(item =>
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'Most Popular':
        return b.likes - a.likes;
      case 'Most Downloaded':
        return b.downloads - a.downloads;
      case 'Latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ambigram Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore stunning ambigram artworks created by users worldwide, get inspired and discover creativity
          </p>
        </motion.div>

        {/* 筛选和排序 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        >
          {/* 分类筛选 */}
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

          {/* 排序选择 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Latest">Latest</option>
            <option value="Most Popular">Most Popular</option>
            <option value="Most Downloaded">Most Downloaded</option>
          </select>
        </motion.div>

        {/* 作品网格 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 
                       hover:border-purple-500/50 transition-all duration-300 group"
            >
              {/* 作品预览图 */}
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

              {/* 作品信息 */}
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

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 统计信息 */}
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{item.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{item.downloads}</span>
                    </span>
                  </div>
                  <span>{item.createdAt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 作品统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-gray-300 text-lg">
              Showcasing <span className="text-purple-400 font-semibold">{sortedItems.length}</span> beautiful ambigram artworks
            </p>
            <p className="text-gray-400 text-sm mt-2">
              More artworks are being added continuously, stay tuned
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}