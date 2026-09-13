import React from 'react';

/**
 * Footer Component
 * Matches the bottom navigation, brand copyright, and multi-column directory from DevStack.fig.
 */
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-100 bg-white pt-16 pb-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand info & Navigation links */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-12 border-b border-slate-100">
          
          {/* Brand description & socials (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#FF5E3A] via-[#FF2A85] to-[#8A2BE2] text-xs font-black text-white shadow-sm">
                DS
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Dev<span className="text-pink-600">Stack</span>
              </span>
            </a>

            <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-sm">
              Curated tools, technologies, and resources for developers building modern software.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-slate-600">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Nav Columns (7 cols on lg) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: PRODUCT */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Product
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <a href="#home" className="hover:text-slate-900 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#technologies" className="hover:text-slate-900 transition-colors">
                    Technologies
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-slate-900 transition-colors">
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: COMPANY */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Company
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <a href="#about" className="hover:text-slate-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-slate-900 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-slate-900 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: LEGAL */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Legal
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <a href="#privacy" className="hover:text-slate-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-slate-900 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 DevStack. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-slate-600 transition-colors">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
