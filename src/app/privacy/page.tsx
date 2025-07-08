'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal information security
          </p>
          <p className="text-gray-400 mt-4">Last updated: January 1, 2025</p>
        </motion.div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 space-y-8"
        >
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                AmbigramGen.com (hereinafter referred to as "we" or "this website") understands the importance of personal information to you and will do our utmost to protect the security and reliability of your personal information.
                We are committed to maintaining your trust in us and adhering to the following principles to protect your personal information: principle of consistency of rights and responsibilities, principle of clear purpose, principle of choice and consent,
                principle of minimum necessity, principle of ensuring security, principle of subject participation, principle of openness and transparency, etc.
              </p>
              <p>
                This privacy policy applies to information processing activities when you access and use our services through the AmbigramGen.com website, mobile applications, or other online services.
              </p>
            </div>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">2.1 Information You Actively Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information: Name, email address, etc. provided when you contact us</li>
                <li>Feedback information: Comments, suggestions, or error reports you submit</li>
                <li>Creative content: Text content you input for ambigram generation</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information: Browser type, operating system, device model, etc.</li>
                <li>Usage information: Access time, page browsing records, feature usage</li>
                <li>Technical information: IP address, cookies, local storage data</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">2.3 Information We Do Not Collect</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sensitive personal information: ID numbers, bank accounts, biometric information, etc.</li>
                <li>Third-party account information: Unless you explicitly authorize it</li>
                <li>Minor information: We do not intentionally collect personal information from children under 13</li>
              </ul>
            </div>
          </section>

          {/* Information Usage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
            <div className="text-gray-300 space-y-4">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Provide services:</strong> Process your ambigram generation requests and provide personalized experiences</li>
                <li><strong>Improve products:</strong> Analyze usage patterns, optimize algorithms and user interfaces</li>
                <li><strong>Technical support:</strong> Respond to your inquiries and resolve technical issues</li>
                <li><strong>Security protection:</strong> Detect and prevent fraud, abuse, and security threats</li>
                <li><strong>Legal compliance:</strong> Comply with applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          {/* Information Storage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Storage and Protection</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">4.1 Storage Location</h3>
              <p>
                Your information is primarily stored on your local device. We use browser local storage technology to save your creation history and preference settings,
                and this data is not automatically uploaded to our servers.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">4.2 Security Measures</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Data encryption: Use HTTPS protocol to protect data transmission security</li>
                <li>Access control: Strictly limit access permissions to personal information</li>
                <li>Security monitoring: Continuously monitor system security, promptly detect and respond to threats</li>
                <li>Regular audits: Regularly assess and update security measures</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">4.3 Retention Period</h3>
              <p>
                We only retain your personal information for the period necessary to achieve the collection purpose. Locally stored data is under your control,
                and you can delete this information at any time by clearing your browser data.
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing and Disclosure</h2>
            <div className="text-gray-300 space-y-4">
              <p>We promise not to sell, rent, or otherwise commercialize your personal information. We may share your information in the following circumstances:</p>
              
              <h3 className="text-lg font-semibold text-white">5.1 With Your Consent</h3>
              <p>With your explicit consent, we will share your specified information with third parties.</p>

              <h3 className="text-lg font-semibold text-white mt-6">5.2 Legal Requirements</h3>
              <p>
                We may disclose your information when required by laws and regulations, legal procedures, litigation, or government authorities.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">5.3 Business Transfer</h3>
              <p>
                In the event of business changes such as mergers, acquisitions, or asset transfers, your information may be transferred as part of business assets.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <div className="text-gray-300 space-y-4">
              <p>According to applicable laws and regulations, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right of access:</strong> Understand how we process your personal information</li>
                <li><strong>Right of rectification:</strong> Request us to correct inaccurate personal information</li>
                <li><strong>Right of erasure:</strong> Request us to delete your personal information</li>
                <li><strong>Right to restrict processing:</strong> Request us to restrict the processing of your personal information</li>
                <li><strong>Right to data portability:</strong> Request us to transfer your data to other service providers</li>
                <li><strong>Right to object:</strong> Object to our processing of your personal information based on legitimate interests</li>
              </ul>
              <p className="mt-4">
                To exercise the above rights, please contact us through our <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact Us</a> page.
              </p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Similar Technologies</h2>
            <div className="text-gray-300 space-y-4">
              <p>We use cookies and similar technologies to improve your user experience:</p>
              
              <h3 className="text-lg font-semibold text-white">7.1 Necessary Cookies</h3>
              <p>These cookies are essential for the normal operation of the website, including security, network management, and accessibility features.</p>

              <h3 className="text-lg font-semibold text-white mt-6">7.2 Functional Cookies</h3>
              <p>Used to remember your preference settings, such as language selection, font preferences, etc., to provide personalized experiences.</p>

              <h3 className="text-lg font-semibold text-white mt-6">7.3 Analytics Cookies</h3>
              <p>Help us understand website usage to improve our services.</p>

              <p className="mt-4">
                You can manage cookie preferences through your browser settings. For detailed information, please see our
                <a href="/cookies" className="text-purple-400 hover:text-purple-300"> Cookie Policy</a>.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services</h2>
            <div className="text-gray-300 space-y-4">
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these third-party websites.</p>
              <p>
                We may use third-party service providers to support our services, such as cloud storage, analytics services, etc.
                These service providers can only access your information to the extent necessary to provide services and must comply with strict confidentiality obligations.
              </p>
            </div>
          </section>

          {/* International Transfer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfer</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Your information may be transferred to and processed in locations outside your country/region.
                We will ensure that such transfers comply with applicable data protection laws and take appropriate protective measures.
              </p>
            </div>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Privacy Policy Updates</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may update this privacy policy from time to time. For significant changes, we will notify you through website announcements or other appropriate means.
                Continued use of our services indicates your acceptance of the updated privacy policy.
              </p>
              <p>
                We recommend that you regularly review this page to stay informed about the latest privacy policy.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <div className="text-gray-300 space-y-4">
              <p>If you have any questions about this privacy policy or need to exercise your rights, please contact us through the following methods:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: privacy@ambigramgen.com</li>
                <li>Contact page: <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact Us</a></li>
              </ul>
              <p>
                We will respond to your request as soon as possible, usually within 30 days.
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
            href="/terms"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Terms of Service</h3>
            <p className="text-gray-400 text-sm">Learn about the terms and conditions of using our services</p>
          </a>
          <a
            href="/cookies"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Cookie Policy</h3>
            <p className="text-gray-400 text-sm">Learn how we use cookies and similar technologies</p>
          </a>
          <a
            href="/contact"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 text-sm">Have questions? We're here to help you anytime</p>
          </a>
        </motion.div>
      </div>
    </div>
  );
}