'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: string;
  featured: boolean;
  imageUrl: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The History and Evolution of Ambigram Art',
    excerpt: 'Explore the evolution of ambigrams from ancient symbols to modern digital art, understanding the cultural background and technical development of this unique art form.',
    content: '',
    category: 'Art History',
    tags: ['history', 'art', 'culture'],
    author: 'Art Historian',
    publishDate: '2025-06-20',
    readTime: '8 min read',
    featured: true,
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '2',
    title: 'Ambigram Design Trends in Tattoo Art',
    excerpt: 'The most popular ambigram design styles in the tattoo world for 2025, from minimalism to complex geometric patterns - a comprehensive analysis.',
    content: '',
    category: 'Tattoo Design',
    tags: ['tattoo', 'design', 'trends'],
    author: 'Tattoo Artist',
    publishDate: '2025-06-18',
    readTime: '6 min read',
    featured: true,
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '3',
    title: 'Creative Techniques for Multi-Language Ambigrams',
    excerpt: 'In-depth analysis of character structure characteristics, mastering core techniques and aesthetic principles for creating ambigrams in different languages.',
    content: '',
    category: 'Creative Techniques',
    tags: ['multilingual', 'techniques', 'tutorial'],
    author: 'Typography Designer',
    publishDate: '2025-06-15',
    readTime: '10 min read',
    featured: false,
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '4',
    title: 'How Font Choice Affects Ambigram Results',
    excerpt: 'How different font styles influence the visual effect of ambigrams, and how to choose the most suitable font for your design.',
    content: '',
    category: 'Design Theory',
    tags: ['fonts', 'design', 'theory'],
    author: 'Font Designer',
    publishDate: '2025-06-12',
    readTime: '7 min read',
    featured: false,
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '5',
    title: 'AI Technology in Ambigram Generation',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the ambigram creation process and future development prospects.',
    content: '',
    category: 'Technology Innovation',
    tags: ['AI', 'technology', 'innovation'],
    author: 'Tech Expert',
    publishDate: '2025-06-10',
    readTime: '12 min read',
    featured: false,
    imageUrl: '/api/placeholder/400/250'
  },
  {
    id: '6',
    title: 'Ambigrams in Brand Design Applications',
    excerpt: 'How brands use ambigrams to create unique visual identity, enhancing brand memorability and influence.',
    content: '',
    category: 'Brand Design',
    tags: ['branding', 'business', 'design'],
    author: 'Brand Designer',
    publishDate: '2025-06-08',
    readTime: '9 min read',
    featured: false,
    imageUrl: '/api/placeholder/400/250'
  }
];

const categories = ['All', 'Art History', 'Tattoo Design', 'Creative Techniques', 'Design Theory', 'Technology Innovation', 'Brand Design'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const router = useRouter();

  // Handle article click
  const handleArticleClick = (post: BlogPost) => {
    router.push(`/blog/${post.id}`);
  };

  // Handle subscription
  const handleSubscribe = () => {
    if (!email.trim()) {
      alert('Please enter a valid email address!');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email format!');
      return;
    }
    
    alert(`Thank you for subscribing! We will send the latest design insights and tips to ${email}.`);
    setEmail('');
  };

  const filteredPosts = mockBlogPosts.filter(post =>
    selectedCategory === 'All' || post.category === selectedCategory
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
              Design Blog
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Share ambigram design inspiration, techniques and latest trends
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
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
        </motion.div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  onClick={() => handleArticleClick(post)}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20
                           hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                >
                  {/* Article Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                                flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>by {post.author}</span>
                      <span>{post.publishDate}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onClick={() => handleArticleClick(post)}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20
                         hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Article Image */}
                <div className="relative h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                              flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.publishDate}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Subscription Area */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg
                        rounded-2xl p-8 border border-purple-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Blog</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest ambigram design techniques, trend analysis and creative inspiration delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                className="flex-1 bg-white/10 text-white placeholder-gray-400 border border-white/20
                         rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700
                               hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold
                               transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}