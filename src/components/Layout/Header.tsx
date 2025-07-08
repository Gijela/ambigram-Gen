'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  
  const navItems = [
    { href: '/gallery', title: 'Gallery' },
    { href: '/tutorials', title: 'Tutorials' },
    { href: '/about', title: 'About' },
    { href: '/blog', title: 'Blog' }
  ];

  const handleStartCreate = () => {
    // 如果当前不在首页，先跳转到首页
    if (window.location.pathname !== '/') {
      router.push('/#generator');
    } else {
      // 如果已经在首页，直接滚动到generator部分
      const generatorElement = document.getElementById('generator');
      if (generatorElement) {
        generatorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AmbigramGen</h1>
              <p className="text-xs text-gray-400">Free Ambigram Generator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="hidden md:block"
          >
            <button
              onClick={handleStartCreate}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600
                       hover:from-purple-700 hover:to-pink-700 text-white font-medium
                       rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Create Free
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};