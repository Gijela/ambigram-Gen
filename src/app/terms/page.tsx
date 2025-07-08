'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
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
              Terms of Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read and understand the following terms before using AmbigramGen.com services
          </p>
          <p className="text-gray-400 mt-4">Last updated: January 1, 2025</p>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 space-y-8"
        >
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Welcome to AmbigramGen.com (referred to as "this website" or "our service"). By accessing or using our website and services,
                you agree to be bound by these Terms of Service (referred to as "Terms"). If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and AmbigramGen.com. We reserve the right to modify these terms at any time,
                and the modified terms will take effect after being published on the website.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <div className="text-gray-300 space-y-4">
              <p>AmbigramGen.com is a free online ambigram generator tool that provides the following main features:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Automatic text-to-ambigram generation</li>
                <li>Multiple font and style options</li>
                <li>Real-time preview and editing features</li>
                <li>High-quality image downloads</li>
                <li>Creation history records</li>
                <li>Tutorials and design guidance</li>
              </ul>
              <p>
                We are committed to providing high-quality services, but do not guarantee the continuity, accuracy, or completeness of the service.
                We reserve the right to modify, suspend, or terminate services at any time.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities and Code of Conduct</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">3.1 Lawful Use</h3>
              <p>You agree to use our services only for lawful purposes and comply with all applicable laws and regulations. You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service for any illegal, harmful, threatening, abusive, harassing, or defamatory activities</li>
                <li>Upload or generate ambigrams containing hate speech, violence, pornography, or other inappropriate content</li>
                <li>Infringe on others' intellectual property, privacy rights, or other rights</li>
                <li>Distribute malware, viruses, or other harmful code</li>
                <li>Attempt unauthorized access to our systems or other users' accounts</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">3.2 Content Responsibility</h3>
              <p>
                You are fully responsible for all content created or shared through our services. You warrant that you have the legal right to use the relevant text and content,
                and that you will not infringe on any third party's rights.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">3.3 Account Security</h3>
              <p>
                Although our service currently does not require account registration, you are responsible for protecting the security of local data on your device,
                including your creation history and preference settings.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">4.1 Our Rights</h3>
              <p>
                The AmbigramGen.com website, software, algorithms, designs, trademarks, logos, and all related intellectual property are owned by us.
                Without explicit written permission, you may not copy, modify, distribute, or otherwise use these materials.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">4.2 Your Rights</h3>
              <p>
                You retain all rights to the ambigrams created through our services. We do not claim any rights to your creative content,
                but you grant us a non-exclusive license to use, display, and distribute this content to provide and improve our services.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">4.3 Third-Party Content</h3>
              <p>
                Our services may contain fonts, icons, or other content provided by third parties. The use of such content is subject to their respective license terms.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">5.1 Service As-Is</h3>
              <p>
                Our services are provided on an "as-is" and "as-available" basis, without any express or implied warranties, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Continuity, accuracy, or reliability of the service</li>
                <li>Quality or suitability of generated results</li>
                <li>Uninterrupted or error-free service</li>
                <li>Correction of defects</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">5.2 Technical Limitations</h3>
              <p>
                Ambigram generation is a complex technical process, and results may vary due to multiple factors. We do not guarantee that all text will produce satisfactory ambigram effects.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">5.3 Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these websites.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                To the maximum extent permitted by law, AmbigramGen.com and its affiliates, directors, employees, agents, or licensors shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data loss, or business interruption</li>
                <li>Any damages arising from the use or inability to use the service</li>
                <li>Third-party actions or content</li>
              </ul>
              <p>
                In any case, our total liability shall not exceed the amount you paid for using the service in the past 12 months (if applicable).
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Indemnification</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                You agree to indemnify, defend, and hold harmless AmbigramGen.com from any claims, losses, liabilities,
                damages, costs, and expenses (including reasonable attorney fees) arising from your breach of these terms, misuse of services, or infringement of any third-party rights.
              </p>
            </div>
          </section>

          {/* Service Modification and Termination */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Service Modification and Termination</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">8.1 Service Modification</h3>
              <p>
                We reserve the right to modify, suspend, or terminate any part of the service at any time without notice.
                We may periodically update features, fix bugs, or improve user experience.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">8.2 Termination of Use</h3>
              <p>
                We may terminate or restrict your access to the service for the following reasons:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these terms of service</li>
                <li>Engaging in illegal or harmful activities</li>
                <li>Misusing services or affecting other users' experience</li>
                <li>Technical or security reasons</li>
              </ul>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Dispute Resolution</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">9.1 Amicable Resolution</h3>
              <p>
                If you have any disputes or dissatisfaction with our services, we encourage you to first contact us through our
                <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact Us</a>
                page, and we will strive to resolve issues amicably.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">9.2 Governing Law</h3>
              <p>
                These terms are governed by and construed in accordance with the laws of the jurisdiction where our services are provided. Any disputes shall be resolved by courts of competent jurisdiction.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">9.3 Severability</h3>
              <p>
                If any part of these terms is deemed invalid or unenforceable, the remaining parts shall remain in full effect.
              </p>
            </div>
          </section>

          {/* Other Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Other Terms</h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-lg font-semibold text-white">10.1 Entire Agreement</h3>
              <p>
                These Terms of Service, together with our Privacy Policy, constitute the complete agreement between you and us regarding the use of our services,
                superseding all prior or contemporaneous agreements, negotiations, discussions, or understandings.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">10.2 Terms Modification</h3>
              <p>
                We may update these terms from time to time. For significant changes, we will post a notice on the website.
                Continued use of the service indicates your acceptance of the modified terms.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">10.3 Language Versions</h3>
              <p>
                These terms may be translated into other languages. In case of conflicts, the English version shall prevail.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6">10.4 Contact Information</h3>
              <p>
                If you have any questions about these terms, please contact us through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: legal@ambigramgen.com</li>
                <li>Contact page: <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact Us</a></li>
              </ul>
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
            href="/cookies"
            className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-4
                     transition-all duration-300 text-center"
          >
            <h3 className="text-white font-semibold mb-2">Cookie Policy</h3>
            <p className="text-gray-400 text-sm">Learn how we use cookies and similar technologies</p>
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 bg-purple-500/20 border border-purple-400/30 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Important Notice</h3>
              <p className="text-gray-300 text-sm">
                Please read and understand these Terms of Service carefully. Using our services indicates your agreement to comply with these terms.
                If you have any questions, please feel free to contact our customer service team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}