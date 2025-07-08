'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState({
    type: 'suggestion',
    category: 'feature',
    title: '',
    description: '',
    email: '',
    priority: 'medium',
    attachScreenshot: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFeedbackData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackData.title || !feedbackData.description) {
      alert('Please fill in the title and detailed description!');
      return;
    }

    if (feedbackData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackData.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    alert('Thank you for your feedback! We will carefully consider your suggestions and use them to improve our product.');
    
    // Reset form
    setFeedbackData({
      type: 'suggestion',
      category: 'feature',
      title: '',
      description: '',
      email: '',
      priority: 'medium',
      attachScreenshot: false
    });
  };

  const feedbackTypes = [
    { value: 'suggestion', label: 'Feature Suggestion', icon: '💡' },
    { value: 'bug', label: 'Bug Report', icon: '🐛' },
    { value: 'improvement', label: 'Improvement', icon: '⚡' },
    { value: 'compliment', label: 'Compliment', icon: '👍' }
  ];

  const categories = [
    { value: 'feature', label: 'Features' },
    { value: 'ui', label: 'UI Design' },
    { value: 'performance', label: 'Performance' },
    { value: 'usability', label: 'Usability' },
    { value: 'content', label: 'Content Quality' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'high', label: 'High', color: 'text-red-400' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Feedback & Suggestions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Every suggestion you make drives us forward and helps us build a better product
          </p>
        </motion.div>

        {/* Feedback Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">1,234</div>
            <div className="text-gray-400 text-sm">Received</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-pink-400 mb-1">856</div>
            <div className="text-gray-400 text-sm">Processed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-violet-400 mb-1">234</div>
            <div className="text-gray-400 text-sm">Implemented</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">98%</div>
            <div className="text-gray-400 text-sm">Satisfaction</div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feedback Type Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-1"
          >
            <h2 className="text-xl font-bold text-white mb-6">Feedback Type</h2>
            <div className="space-y-3">
              {feedbackTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    feedbackData.type === type.value
                      ? 'bg-purple-500/20 border-purple-500/50 text-white'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={feedbackData.type === type.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-2xl mr-3">{type.icon}</span>
                  <span className="font-medium">{type.label}</span>
                </label>
              ))}
            </div>

            {/* Recent Updates */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Updates</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-white text-sm font-medium">v2.1.0 Released</span>
                  </div>
                  <p className="text-gray-400 text-xs">Added batch export feature</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span className="text-white text-sm font-medium">Performance Optimization</span>
                  </div>
                  <p className="text-gray-400 text-xs">30% faster generation speed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Submit Feedback</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={feedbackData.category}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Priority</label>
                    <select
                      name="priority"
                      value={feedbackData.priority}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>{priority.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={feedbackData.title}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20
                             rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Please briefly describe your feedback"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description *</label>
                  <textarea
                    name="description"
                    value={feedbackData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20
                             rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Please describe your feedback in detail, including specific use cases, issues encountered, or improvement suggestions..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Contact Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={feedbackData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20
                             rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Leave your email if you need a reply"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="attachScreenshot"
                    checked={feedbackData.attachScreenshot}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded
                             focus:ring-purple-500 focus:ring-2"
                  />
                  <label className="text-gray-300 text-sm">
                    I'm willing to provide screenshots or more details to help improve the product
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700
                           hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold
                           transition-all duration-300 transform hover:scale-105"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Feedback Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg
                        rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">How to Provide Effective Feedback</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📝 Be Specific</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Describe the issues or suggestions in detail, including steps, expected results, and actual results.
                </p>
                <h3 className="text-lg font-semibold text-white mb-3">🎯 Provide Use Cases</h3>
                <p className="text-gray-300 text-sm">
                  Tell us when and how you use the feature, which helps us better understand your needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📸 Include Screenshots</h3>
                <p className="text-gray-300 text-sm mb-4">
                  If possible, provide relevant screenshots or screen recordings to help us identify issues faster.
                </p>
                <h3 className="text-lg font-semibold text-white mb-3">💡 Constructive Suggestions</h3>
                <p className="text-gray-300 text-sm">
                  Besides pointing out problems, we greatly appreciate any improvement suggestions you may have.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}