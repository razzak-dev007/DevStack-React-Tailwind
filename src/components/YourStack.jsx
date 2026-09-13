import React, { useState, memo } from 'react';
import { X, Copy, Check, Sparkles, Layers, Share2, Code2 } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * Individual Stack Item in YourStack sidebar
 */
function StackItemRow({ item, onRemove }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2 border border-slate-100">
          {!imgError && item.icon ? (
            <img
              src={item.icon}
              alt={item.name}
              width="24"
              height="24"
              className="h-full w-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-bold text-xs text-slate-700">
              {item.name ? item.name.charAt(0) : <Code2 className="w-3.5 h-3.5" />}
            </span>
          )}
        </div>
        <div className="truncate">
          <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
            {item.name}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">
            {item.category}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item)}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label={`Remove ${item.name} from stack`}
        title={`Remove ${item.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

const MemoizedStackItemRow = memo(StackItemRow);

/**
 * YourStack Component
 * Right sidebar control panel displaying selected stack technologies.
 * Features:
 * - Dynamic selected count header
 * - Empty state matching Figma design
 * - Single column list with safe image fallback and removal
 * - "Export / Copy Stack as Markdown" action for developer READMEs
 * - "Remove All" bulk action button
 */
export default function YourStack({ stack = [], onRemoveFromStack, onRemoveAll }) {
  const [copied, setCopied] = useState(false);
  const count = stack.length;

  /**
   * Generates a markdown summary of the chosen stack for README files
   */
  const handleCopyMarkdown = async () => {
    if (stack.length === 0) return;

    const stackList = stack
      .map((item) => `- **${item.category}**: ${item.name} (${item.difficulty || 'Standard'})`)
      .join('\n');

    const markdown = `### 🚀 Project Tech Stack\n\n${stackList}\n\n*Generated with [DevStack](https://github.com)*`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(markdown);
      } else {
        // Fallback for older clipboard support
        const textarea = document.createElement('textarea');
        textarea.value = markdown;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      toast.success('Stack copied as Markdown for README.md!', {
        icon: '📋',
      });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      toast.error('Could not copy to clipboard.');
    }
  };

  return (
    <aside className="w-full">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sticky top-28 transition-all">
        
        {/* Header with dynamic counter */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="h-5 w-5 text-pink-600" />
              Your Stack
            </h3>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {count === 0
                ? 'No technologies selected yet.'
                : `${count} ${count === 1 ? 'Technology' : 'Technologies'} Selected`}
            </p>
          </div>

          {count > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-pink-100 px-2 text-xs font-bold text-pink-700">
              {count}
            </span>
          )}
        </div>

        {/* Dynamic Content: Empty State vs Selected List */}
        {count === 0 ? (
          /* Empty State Box matching Figma design */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/90 bg-slate-50/50 py-10 px-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 mb-2 shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-slate-600">
              Your stack is empty.
            </span>
            <p className="mt-1 text-xs text-slate-400 max-w-[200px]">
              Click "Add to Stack" on any card to assemble your development stack.
            </p>
          </div>
        ) : (
          /* Selected Technologies List */
          <div className="space-y-4">
            <div className="max-h-[380px] overflow-y-auto pr-1 space-y-2.5">
              {stack.map((item) => (
                <MemoizedStackItemRow
                  key={item.id}
                  item={item}
                  onRemove={onRemoveFromStack}
                />
              ))}
            </div>

            {/* Actions: Copy Markdown & Remove All */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-2.5 px-4 text-center text-xs font-bold text-white hover:bg-black transition-all duration-150 active:scale-[0.99] shadow-sm"
                title="Copy markdown badge list for your README.md"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-pink-400" />
                    <span>Copy Markdown for README</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onRemoveAll}
                className="w-full rounded-2xl border border-red-200/80 bg-white py-2 text-center text-xs font-bold text-red-500 hover:bg-red-50/70 hover:border-red-300 transition-all duration-150 active:scale-[0.99]"
              >
                Remove All
              </button>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
