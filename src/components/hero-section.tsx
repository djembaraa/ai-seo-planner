"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, FileText, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onSubmit: (keyword: string) => void;
  isLoading: boolean;
  recentSearches: string[];
  onClearRecent: () => void;
}

export function HeroSection({
  onSubmit,
  isLoading,
  recentSearches,
  onClearRecent,
}: HeroSectionProps) {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  const handleRecentClick = (term: string) => {
    setKeyword(term);
    onSubmit(term);
  };

  return (
    <section className="relative overflow-hidden" aria-label="Keyword input">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="hero-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Input */}
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-accent">
                AI-Powered SEO Strategy
              </p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight">
                Content plans
                <br />
                that rank.
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-on-dark-muted sm:text-xl">
                Enter a target keyword and get a full SEO content strategy —
                search intent, keyword clusters, outlines, and meta data —
                streamed in real time.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="mt-10"
              role="search"
              aria-label="Generate SEO plan"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl bg-hero-glass p-2 backdrop-blur-sm sm:p-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. content marketing strategy"
                  className="flex-1 min-w-0 rounded-lg bg-transparent px-4 py-3 text-base text-on-dark placeholder:text-on-dark-faint outline-none focus-visible:bg-on-dark-focus sm:text-lg"
                  disabled={isLoading}
                  aria-label="Target keyword"
                  aria-describedby="keyword-help"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLoading || !keyword.trim()}
                  className="shrink-0 bg-amber-accent hover:bg-amber-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-3.5 rounded-xl transition-colors cursor-pointer w-full sm:w-auto flex items-center justify-center"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Generating
                    </span>
                  ) : (
                    "Generate Plan"
                  )}
                </button>
              </div>
              <p id="keyword-help" className="mt-2 px-1 text-xs text-on-dark-muted">
                We use your keyword to build an evidence-informed content plan.
              </p>
            </motion.form>

            {recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                className="mt-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-on-dark-faint">
                    Recent
                  </p>
                  <button
                    onClick={onClearRecent}
                    className="cursor-pointer text-xs font-medium text-on-dark-subtle transition-colors hover:text-on-dark-muted"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleRecentClick(term)}
                      disabled={isLoading}
                      className="cursor-pointer rounded-lg bg-hero-glass px-3 py-1.5 text-xs font-medium text-on-dark-muted transition-colors hover:bg-hero-glass-hover hover:text-on-dark disabled:opacity-40 sm:text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Abstract Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center relative" 
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 rounded-full bg-hero-glass border border-hero-glass-hover shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-md">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-amber-accent/10 rounded-full blur-3xl"></div>
                 
                 {/* Central icon or abstract shape */}
                 <div className="relative z-10 grid grid-cols-2 gap-4 p-6 w-full h-full">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-hero-glass-hover rounded-xl shadow-inner border border-white/5 flex items-center justify-center"
                    >
                        <Search className="w-12 h-12 text-amber-accent/80" />
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-amber-accent/20 rounded-xl shadow-inner border border-amber-accent/30 flex items-center justify-center mt-8"
                    >
                        <TrendingUp className="w-12 h-12 text-amber-accent" />
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-hero-glass-hover rounded-xl shadow-inner border border-white/5 flex items-center justify-center mb-8"
                    >
                        <FileText className="w-12 h-12 text-on-dark-muted" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-hero-glass-hover rounded-xl shadow-inner border border-white/5 flex items-center justify-center"
                    >
                        <Sparkles className="w-12 h-12 text-on-dark-muted" />
                    </motion.div>
                 </div>
              </div>
              
              {/* Floating badges */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-slate-800 text-amber-accent border border-slate-700 font-bold px-4 py-2 rounded-full shadow-lg rotate-12 text-sm z-20"
              >
                #1 Ranking
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-amber-accent text-slate-900 font-bold px-4 py-2 rounded-full shadow-lg -rotate-6 text-sm z-20"
              >
                AI Driven
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
