import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechGrid from './components/TechGrid';
import YourStack from './components/YourStack';
import Footer from './components/Footer';
import { Layers, ShieldCheck, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'devstack_selected_stack_v1';

/**
 * Curated Preset Architectures for the Projects section
 */
const PRESET_STACKS = [
  {
    id: 'modern-fullstack',
    name: 'Modern Full-Stack Web',
    description: 'Blazing fast React frontend with Node.js API runtime and PostgreSQL relational database.',
    badge: 'Most Popular',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    techIds: ['react', 'tailwindcss', 'nodejs', 'postgresql', 'typescript', 'git'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    id: 'scalable-edge',
    name: 'Serverless Edge & Microservices',
    description: 'Next.js hybrid SSR with GraphQL API layer, Redis fast caching, and Docker containerization.',
    badge: 'High Performance',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    techIds: ['nextjs', 'graphql', 'redis', 'docker', 'typescript', 'git'],
    tags: ['Next.js', 'GraphQL', 'Redis', 'Docker'],
  },
  {
    id: 'realtime-data',
    name: 'Reactive & Real-Time App',
    description: 'Approachable Vue/Svelte UI with scalable MongoDB document store and Docker tooling.',
    badge: 'Rapid Prototyping',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    techIds: ['vue', 'nodejs', 'mongodb', 'docker', 'javascript', 'git'],
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'JavaScript'],
  },
];

/**
 * App Component - Root Component for DevStack Builder
 */
function App() {
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lazy initialize stack state from localStorage for zero-lag restoration
  const [stack, setStack] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse saved stack from localStorage:', e);
      return [];
    }
  });

  // Sync stack changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stack));
    } catch (e) {
      console.warn('Failed to persist stack to localStorage:', e);
    }
  }, [stack]);

  // Fetch technologies dataset on initial mount
  useEffect(() => {
    setIsLoading(true);
    const basePath = import.meta.env.BASE_URL || './';
    const jsonUrl = `${basePath.endsWith('/') ? basePath : basePath + '/'}technologies.json`;
    
    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          // Fallback try relative path
          return fetch('./technologies.json').then((res) => {
            if (!res.ok) throw new Error('Failed to fetch technologies');
            return res.json();
          });
        }
        return response.json();
      })
      .then((data) => {
        setTechnologies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading technologies:', error);
        toast.error('Failed to load technologies dataset.');
        setIsLoading(false);
      });
  }, []);

  /**
   * Add a technology item to the stack
   */
  const handleAddToStack = useCallback((tech) => {
    setStack((prevStack) => {
      const alreadyExists = prevStack.some((item) => item.id === tech.id);
      if (alreadyExists) {
        toast.warn(`${tech.name} is already in your stack!`, {
          icon: '⚠️',
        });
        return prevStack;
      }
      toast.success(`Added ${tech.name} to stack!`, {
        icon: '🚀',
      });
      return [...prevStack, tech];
    });
  }, []);

  /**
   * Remove a single technology from the stack
   */
  const handleRemoveFromStack = useCallback((tech) => {
    setStack((prevStack) => prevStack.filter((item) => item.id !== tech.id));
    toast.info(`Removed ${tech.name} from stack`, {
      icon: '🗑️',
    });
  }, []);

  /**
   * Clear all selected technologies from the stack
   */
  const handleRemoveAll = useCallback(() => {
    setStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      toast.error('Stack cleared', {
        icon: '🧹',
      });
      return [];
    });
  }, []);

  /**
   * Load a full preset stack
   */
  const handleLoadPreset = useCallback((preset) => {
    if (!technologies || technologies.length === 0) return;

    const matchedTechs = technologies.filter((t) => preset.techIds.includes(t.id));
    setStack(matchedTechs);
    toast.success(`Loaded "${preset.name}" preset!`, {
      icon: '✨',
    });
  }, [technologies]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-pink-500 selection:text-white">
      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Sticky Top Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Main Dashboard Section: 70% Tech Grid + 30% Stack Panel on Desktop */}
        <section id="technologies" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* Left 70%: Technology Cards Grid */}
            <div className="w-full lg:w-[68%] xl:w-[70%]">
              <TechGrid
                technologies={technologies}
                isLoading={isLoading}
                stack={stack}
                onAddToStack={handleAddToStack}
              />
            </div>

            {/* Right 30%: "Your Stack" Control Panel */}
            <div className="w-full lg:w-[32%] xl:w-[30%]">
              <YourStack
                stack={stack}
                onRemoveFromStack={handleRemoveFromStack}
                onRemoveAll={handleRemoveAll}
              />
            </div>

          </div>
        </section>

        {/* Projects / Preset Architectures Showcase Section */}
        <section id="projects" className="border-t border-slate-100 bg-slate-50/60 py-16 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-1 text-xs font-bold text-pink-700 border border-pink-200/70 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                Curated Presets
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Popular Architecture <span className="gradient-tech-text">Presets</span>
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Kickstart your project with proven technology combinations designed for reliability, developer velocity, and scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRESET_STACKS.map((preset) => (
                <div
                  key={preset.id}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-xl hover:border-pink-300/80 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${preset.badgeColor}`}>
                        {preset.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      {preset.name}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {preset.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {preset.tags.map((tag) => (
                        <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-black text-white py-3 px-4 text-xs font-bold transition-all active:scale-[0.98] shadow-sm"
                  >
                    <span>Load This Preset</span>
                    <ArrowRight className="h-3.5 w-3.5 text-pink-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About & Guide Section */}
        <section id="about" className="py-16 bg-white border-t border-slate-100 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 border border-indigo-200/70 mb-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                  Developer Guide
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  How DevStack Accelerates <br className="hidden sm:inline" />
                  <span className="gradient-brand-text">Architecture Decisions</span>
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Choosing the right technology stack can make or break your software lifecycle. DevStack provides a clean, visual canvas to assemble, test compatibility, and export curated stacks directly into your repository workflow.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Zero-Overhead Prototyping</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">
                        Instantly filter across multiple architectural layers with sub-millisecond responsiveness.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-600 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">One-Click Markdown Export</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">
                        Copy structured markdown badge lists directly for project READMEs and RFC documentation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Browser Persistence</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">
                        Your custom stack is safely preserved in local storage across browser refreshes and tabs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-pink-400 font-mono text-xs uppercase tracking-wider mb-3">
                    <Zap className="h-4 w-4" />
                    Quick Tip
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    The Modern Stack Rule of Thumb
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    "Start simple with a type-safe language, a mature reactive framework, and a proven relational database. Add caching, message queues, and microservices only when latency or scale bottlenecks demand them."
                  </p>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
                    <p className="text-xs font-mono text-slate-200">
                      npm create vite@latest my-stack -- --template react-ts
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
