import React from 'react';
import { ArrowRight, Sparkles, Layers, Cpu, Database } from 'lucide-react';
import bannerStackImg from '../assets/banner-stack.png';

/**
 * Hero Component
 * Displays the high-impact two-tone headline, value proposition,
 * primary CTA buttons, and the isometric 3D developer stack graphic.
 */
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white py-12 lg:py-20 border-b border-slate-100/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-gradient-to-r from-pink-50 to-purple-50 px-3.5 py-1.5 text-xs font-bold text-pink-700 shadow-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-pulse" />
              <span>Next-Gen Stack Builder for Developers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-900 leading-[1.12]">
              Build Your Ideal <br className="hidden sm:inline" />
              <span className="gradient-title-text">Development Stack</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#technologies"
                className="btn-brand-gradient inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Technologies</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
              >
                Preset Stacks
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-100 pt-6 w-full max-w-lg">
              <div>
                <p className="text-2xl font-black text-slate-900">15+</p>
                <p className="text-xs font-semibold text-slate-500">Core Technologies</p>
              </div>
              <div>
                <p className="text-2xl font-black text-pink-600">100%</p>
                <p className="text-xs font-semibold text-slate-500">Free & Curated</p>
              </div>
              <div>
                <p className="text-2xl font-black text-violet-600">Instant</p>
                <p className="text-xs font-semibold text-slate-500">Export & Markdown</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Stack Graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md">
              {/* Subtle background glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-indigo-400/20 blur-3xl -z-10 transform scale-95 pointer-events-none" />
              
              <img
                src={bannerStackImg}
                alt="DevStack multi-layer architectural illustration"
                width="450"
                height="450"
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto object-contain drop-shadow-2xl animate-float transition-all"
                style={{ filter: "drop-shadow(0 20px 30px rgba(138, 43, 226, 0.18))" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
