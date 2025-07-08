'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true, // 必要Cookie不能关闭
    functional: true,
    analytics: false,
    marketing: false
  });

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return; // 必要Cookie不能关闭
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    // 保存Cookie偏好到本地存储
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Cookie preferences saved!');
  };

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
              Cookie Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn how we use cookies and similar technologies to improve your user experience
          </p>
          <p className="text-gray-400 mt-4">Last updated: January 1, 2025</p>
        </motion.div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Cookie Preferences</h2>
          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Necessary Cookies</h3>
                <p className="text-gray-300 text-sm">
                  These cookies are essential for the website to function properly and cannot be disabled.
                </p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Functional Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Used to remember your preferences, such as language selection and font preferences.
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => handlePreferenceChange('functional')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.functional
                      ? 'bg-purple-500 justify-end'
                      : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Analytics Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Help us understand how the website is used so we can improve our services.
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => handlePreferenceChange('analytics')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics
                      ? 'bg-purple-500 justify-end'
                      : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Marketing Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => handlePreferenceChange('marketing')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing
                      ? 'bg-purple-500 justify-end'
                      : 'bg-gray-600 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={savePreferences}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                       text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300
                       transform hover:scale-105"
            >
              Save Preferences
            </button>
          </div>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 space-y-8"
        >
          {/* What are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What are Cookies?</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work,
                or work more efficiently, as well as to provide information to the owners of the site.
              </p>
              <p>
                Cookies contain a small amount of information that the website can read when you visit it again.
                Cookies cannot run programs or deliver viruses to your computer.
              </p>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
            <div className="text-gray-300 space-y-4">
              <p>AmbigramGen.com uses cookies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ensure the website functions properly and securely</li>
                <li>Remember your preferences and choices</li>
                <li>Provide personalized user experience</li>
                <li>Analyze website usage to improve our services</li>
                <li>Save your creation history and settings</li>
              </ul>
            </div>
          </section>

          {/* Cookie Types */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cookie Types Explained</h2>
            <div className="text-gray-300 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3.1 Necessary Cookies</h3>
                <p className="mb-3">These cookies are essential for the website to function properly, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Session Management:</strong> Maintain your session state</li>
                  <li><strong>Security Features:</strong> Prevent cross-site request forgery attacks</li>
                  <li><strong>Load Balancing:</strong> Ensure website performance</li>
                  <li><strong>Basic Functions:</strong> Support core website functionality</li>
                </ul>
                <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>Note:</strong> These cookies cannot be disabled as they are essential for website operation.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3.2 Functional Cookies</h3>
                <p className="mb-3">These cookies enhance your user experience:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Preferences:</strong> Remember your chosen fonts, color themes, etc.</li>
                  <li><strong>Language Settings:</strong> Save your language preferences</li>
                  <li><strong>Creation History:</strong> Locally save your ambigram creation records</li>
                  <li><strong>Interface State:</strong> Remember panel expand/collapse states</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3.3 Analytics Cookies</h3>
                <p className="mb-3">Help us understand website usage:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Visit Statistics:</strong> Page views, visit duration, etc.</li>
                  <li><strong>User Behavior:</strong> Most popular features and content</li>
                  <li><strong>Performance Monitoring:</strong> Page load times, error rates, etc.</li>
                  <li><strong>Device Information:</strong> Screen resolution, browser type, etc.</li>
                </ul>
                <div className="mt-3 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <p className="text-green-200 text-sm">
                    <strong>Privacy Protection:</strong> All analytics data is anonymous and does not identify individuals.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3.4 Marketing Cookies</h3>
                <p className="mb-3">We currently do not use marketing cookies, but may include in the future:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Ad Targeting:</strong> Display relevant advertising content</li>
                  <li><strong>Social Media:</strong> Social sharing functionality</li>
                  <li><strong>Retargeting:</strong> Display relevant ads on other websites</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
            <div className="text-gray-300 space-y-4">
              <p>We may use the following third-party services that may set their own cookies:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-300">
                    Used for website analytics and performance monitoring. You can disable these cookies through Google's opt-out tools.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Font Services</h4>
                  <p className="text-sm text-gray-300">
                    Services like Google Fonts may set cookies to optimize font loading performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. How to Manage Cookies</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">5.1 Browser Settings</h3>
              <p>You can manage cookies through your browser settings:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Chrome</h4>
                  <p className="text-sm text-gray-300">
                    Settings → Privacy and security → Cookies and other site data
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Firefox</h4>
                  <p className="text-sm text-gray-300">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Safari</h4>
                  <p className="text-sm text-gray-300">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Edge</h4>
                  <p className="text-sm text-gray-300">
                    Settings → Cookies and site permissions → Cookies and stored data
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6">5.2 Website Settings</h3>
              <p>
                You can use the Cookie Preferences at the top of this page to control the types of cookies our website uses.
                Your choices will be saved and applied on your next visit.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">5.3 Impact of Disabling Cookies</h3>
              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mt-3">
                <p className="text-yellow-200 text-sm">
                  <strong>Important Notice:</strong> Disabling certain cookies may affect website functionality,
                  including the inability to save your preferences, creation history, etc.
                </p>
              </div>
            </div>
          </section>

          {/* Local Storage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Local Storage and Other Technologies</h2>
            <div className="text-gray-300 space-y-4">
              <p>In addition to cookies, we also use other local storage technologies:</p>
              
              <h3 className="text-lg font-semibold text-white">6.1 Local Storage</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Save your ambigram creation history</li>
                <li>Store user preference settings</li>
                <li>Cache frequently used data to improve performance</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">6.2 Session Storage</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Temporarily store current session data</li>
                <li>Save form input states</li>
                <li>Maintain state transfer between pages</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">6.3 Cache Storage</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cache font files to improve loading speed</li>
                <li>Store generation algorithm calculation results</li>
                <li>Offline functionality support</li>
              </ul>
            </div>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <div className="text-gray-300 space-y-4">
              <p>If you have any questions about our Cookie Policy or need help managing cookie settings, please contact us:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: privacy@ambigramgen.com</li>
                <li>Contact page: <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact Us</a></li>
              </ul>
              <p>
                We will respond to your request as soon as possible, usually within 48 hours.
              </p>
            </div>
          </section>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          <a
            href="/privacy"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Privacy Policy</h3>
            <p className="text-gray-400 text-sm">Learn how we protect your personal information</p>
          </a>
          <a
            href="/terms"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Terms of Service</h3>
            <p className="text-gray-400 text-sm">Learn about the terms and conditions of using our services</p>
          </a>
          <a
            href="/help"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Help Center</h3>
            <p className="text-gray-400 text-sm">Find answers to common questions and usage guides</p>
          </a>
        </motion.div>
      </div>
    </div>
  );
}