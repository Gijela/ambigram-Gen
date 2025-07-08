"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Information */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <span className="text-xl font-bold text-white">AmbigramGen</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              World's first free ambigram generator supporting different length
              word combinations, optimized for tattoo design, watermark-free,
              unlimited, high-quality export.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/frontendGijela"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://github.com/Gijela/ambigram-Gen"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ambigram Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* published website badge */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://fazier.com/launches/ambigramgen.com"
                target="_blank"
              >
                <img
                  src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                  width="120"
                  alt="Fazier badge"
                />
              </a>
              <a href="https://dang.ai/" target="_blank">
                <img
                  src="https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png"
                  alt="Dang.ai"
                  style={{ width: "150px", height: "54px" }}
                  width="150"
                  height="54"
                />
              </a>
            </div>

            <a
              href="https://startupfa.me/s/ambigramgen?utm_source=ambigramgen.com"
              target="_blank"
            >
              <img
                src="https://startupfa.me/badges/featured-badge.webp"
                alt="Featured on Startup Fame"
                width="171"
                height="54"
              />
            </a>

            <a href="https://magicbox.tools" target="_blank">
              <img
                src="https://magicbox.tools/badge.svg"
                alt="Featured on MagicBox.tools"
                width="200"
                height="54"
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 AmbigramGen.com. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
