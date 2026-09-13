import React, { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import MobileNavbar from './MobileNavbar';

/**
 * Navbar Component
 * Features a sticky frosted glass container with responsive desktop links
 * and a mobile hamburger drawer trigger.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-100/80 bg-white/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
          
          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF5E3A] via-[#FF2A85] to-[#8A2BE2] text-sm font-black text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              DS
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Dev<span className="text-pink-600">Stack</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            <a
              href="#home"
              className="text-sm font-semibold text-slate-900 hover:text-pink-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#technologies"
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
            >
              Technologies
            </a>
            <a
              href="#projects"
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
            >
              Preset Stacks
            </a>
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
            >
              About & Guide
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden sm:inline-block text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 transition-colors rounded-xl hover:bg-slate-50"
            >
              Sign In
            </button>
            <button
              type="button"
              className="btn-nav-gradient rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-pink-500/20 hover:shadow-md transition-all active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavbar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
