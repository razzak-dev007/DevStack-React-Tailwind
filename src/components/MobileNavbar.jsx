import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

/**
 * MobileNavbar Component
 * A slide-in drawer menu for mobile viewports.
 * Handles:
 * - Backdrop click to close
 * - Escape key to close
 * - Body scroll locking while open
 * - Accessible dialog attributes
 */
export default function MobileNavbar({ isOpen, onClose }) {
  // Lock body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation drawer"
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl transition-transform ease-in-out flex flex-col justify-between">
        <div>
          {/* Drawer header with close button */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <a href="#" onClick={onClose} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#FF5E3A] via-[#FF2A85] to-[#8A2BE2] text-xs font-black text-white shadow-sm">
                DS
              </span>
              <span className="text-lg font-bold text-slate-900">
                Dev<span className="text-pink-600">Stack</span>
              </span>
            </a>
            
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation">
            <a
              href="#home"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl bg-pink-50/80 px-4 py-3 text-sm font-semibold text-pink-600 transition-colors"
            >
              Home
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
            </a>
            <a
              href="#technologies"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Technologies
            </a>
            <a
              href="#projects"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Preset Stacks
            </a>
            <a
              href="#about"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              About & Guide
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Mobile auth buttons */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            className="w-full rounded-xl btn-nav-gradient py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-pink-500/20"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
