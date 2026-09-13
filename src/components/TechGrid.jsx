import React, { useState, useMemo } from 'react';
import TechCard from './TechCard';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'Styling', 'DevOps', 'Tools'];

/**
 * TechGrid Component
 * Renders the responsive grid of technology cards with memoized search and category filtering,
 * O(1) stack membership verification, accessible search/filter controls, and animated loading skeletons.
 */
export default function TechGrid({ technologies = [], isLoading, stack = [], onAddToStack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // O(1) set lookup for stack items to avoid O(N * M) checks on each render
  const stackIdSet = useMemo(() => {
    return new Set(stack.map((item) => item.id));
  }, [stack]);

  // Compute category count breakdown for badges
  const categoryCounts = useMemo(() => {
    const counts = { All: technologies.length };
    for (let i = 0; i < technologies.length; i++) {
      const cat = technologies[i].category;
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [technologies]);

  // Memoized filter calculation
  const filteredTechs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return technologies.filter((tech) => {
      const matchesSearch =
        !query ||
        tech.name.toLowerCase().includes(query) ||
        (tech.description && tech.description.toLowerCase().includes(query)) ||
        (tech.category && tech.category.toLowerCase().includes(query)) ||
        (tech.badge && tech.badge.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All' || tech.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [technologies, searchTerm, selectedCategory]);

  return (
    <div className="w-full">
      
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600 border border-pink-200/60">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            Stack Components
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          Explore the <span className="gradient-tech-text">Technologies</span>
        </h2>
        <p className="mt-2 text-base text-slate-500">
          Select modern tools across frontend, backend, database, and DevOps to build your optimal tech stack.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <label htmlFor="tech-search-input" className="sr-only">
              Search technologies
            </label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="tech-search-input"
              type="text"
              placeholder="Search by name, category, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Clear search input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter technologies by category"
            className="flex flex-wrap items-center gap-1.5 text-xs"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                      : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Loading State: Skeleton Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
                <div className="h-5 w-16 rounded-full bg-slate-200"></div>
              </div>
              <div className="mt-5 h-6 w-28 rounded bg-slate-200"></div>
              <div className="mt-3 space-y-2">
                <div className="h-3.5 w-full rounded bg-slate-100"></div>
                <div className="h-3.5 w-4/5 rounded bg-slate-100"></div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-4 w-16 rounded bg-slate-200"></div>
                <div className="h-4 w-12 rounded bg-slate-200"></div>
              </div>
              <div className="mt-4 h-10 w-full rounded-xl bg-slate-200"></div>
            </div>
          ))}
        </div>
      ) : filteredTechs.length > 0 ? (
        /* Technology Cards Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTechs.map((tech) => (
            <TechCard
              key={tech.id}
              tech={tech}
              isAdded={stackIdSet.has(tech.id)}
              onAddToStack={onAddToStack}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-400 mb-3">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <p className="text-base font-bold text-slate-800">
            No technologies found
          </p>
          <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
            No results match "{searchTerm}" in category "{selectedCategory}". Try adjusting your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
