"use client";

import { useState, useRef, type FormEvent } from "react";

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
      <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:py-40">
        <div className="animate-fade-up">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-accent">
            AI-Powered SEO Strategy
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Content plans
            <br />
            that rank.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-on-dark-muted sm:text-xl">
            Enter a target keyword and get a full SEO content strategy —
            search intent, keyword clusters, outlines, and meta data —
            streamed in real time.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
          role="search"
          aria-label="Generate SEO plan"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-hero-glass p-2 backdrop-blur-sm sm:p-2.5">
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
              className="shrink-0 bg-amber-accent hover:bg-amber-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-colors cursor-pointer"
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
        </form>

        {recentSearches.length > 0 && (
          <div
            className="mt-6 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
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
          </div>
        )}
      </div>
    </section>
  );
}
