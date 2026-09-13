import React, { useState, memo } from 'react';
import { Star, Check, Code2 } from 'lucide-react';

/**
 * Helper to compute badge styling based on badge identifier.
 * Defined outside component so it is never recreated on re-renders.
 */
const getBadgeStyle = (badgeName) => {
  switch (badgeName?.toLowerCase()) {
    case 'popular':
    case 'essential':
    case 'robust':
    case 'top sql':
    case 'containers':
      return 'bg-sky-50 text-sky-700 border-sky-200/80';
    case 'versatile':
    case 'standard':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    case 'fast':
    case 'cache':
      return 'bg-orange-50 text-orange-700 border-orange-200/80';
    case 'ubiquitous':
      return 'bg-amber-50 text-amber-700 border-amber-200/80';
    case 'modern':
      return 'bg-teal-50 text-teal-700 border-teal-200/80';
    case 'fullstack':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    default:
      return 'bg-pink-50 text-pink-700 border-pink-200/80';
  }
};

/**
 * TechCard Component
 * Displays an individual technology card with icon, badge, description,
 * metadata (category, difficulty, rating), and dynamic "Add to Stack" action.
 * Wrapped in React.memo for high performance.
 */
function TechCardComponent({ tech, isAdded, onAddToStack }) {
  const { name, category, description, icon, rating, difficulty, badge } = tech;
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-pink-200/60 transition-all duration-300 transform-gpu hover:-translate-y-0.5">
      
      {/* Card Header: Icon & Badge */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-2.5 shadow-sm group-hover:scale-105 group-hover:bg-pink-50/40 transition-all duration-300">
            {!imgError && icon ? (
              <img
                src={icon}
                alt={`${name} logo`}
                width="32"
                height="32"
                className="h-full w-full object-contain"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="font-bold text-slate-700 text-sm flex items-center justify-center">
                {name ? name.charAt(0) : <Code2 className="w-4 h-4 text-slate-400" />}
              </span>
            )}
          </div>

          {badge && (
            <span
              className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${getBadgeStyle(
                badge
              )}`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Tech Title & Description */}
        <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Footer: Metadata & Action Button */}
      <div className="mt-6 border-t border-slate-50 pt-4">
        {/* Metadata info row */}
        <div className="mb-4 flex items-center justify-between gap-2 text-xs">
          <span className="rounded-md bg-slate-100/80 px-2.5 py-1 font-semibold text-slate-600">
            {category}
          </span>
          
          <span className="text-slate-500 font-medium">
            {difficulty}
          </span>

          <div className="flex items-center gap-1 font-bold text-slate-700" title={`Rated ${rating} out of 5`}>
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={() => onAddToStack(tech)}
          disabled={isAdded}
          aria-label={isAdded ? `${name} is already in your stack` : `Add ${name} to your stack`}
          className={`w-full rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${
            isAdded
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-slate-900 text-white hover:bg-black hover:shadow-md active:scale-[0.98]'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 text-emerald-500 stroke-[2.5]" />
              <span>Added to Stack</span>
            </>
          ) : (
            <span>Add to Stack</span>
          )}
        </button>
      </div>

    </article>
  );
}

export default memo(TechCardComponent);
