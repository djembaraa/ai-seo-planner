"use client";

import { useState, useRef, type FormEvent } from "react";

interface HeroSectionProps {
  onSubmit: (keyword: string) => void;
  isLoading: boolean;
}

export function HeroSection({ onSubmit, isLoading }: HeroSectionProps) {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-deep via-[#1E293B] to-[#0C1222]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:py-40">
        <div className="animate-fade-up">
          <p className="text-amber-accent text-sm font-semibold tracking-widest uppercase mb-6">
            AI-Powered SEO Strategy
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Content plans
            <br />
            that rank.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-xl font-light">
            Enter a target keyword and get a full SEO content strategy —
            search intent, keyword clusters, outlines, and meta data —
            streamed in real time.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex items-center gap-3 bg-white/[0.07] backdrop-blur-sm rounded-2xl p-2 sm:p-2.5">
            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. content marketing strategy"
              className="flex-1 bg-transparent text-white placeholder:text-[#64748B] text-base sm:text-lg px-4 py-3 outline-none min-w-0"
              disabled={isLoading}
              aria-label="Target keyword"
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
        </form>
      </div>
    </section>
  );
}
