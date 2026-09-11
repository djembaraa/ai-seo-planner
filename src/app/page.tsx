"use client";

import { HeroSection } from "@/components/hero-section";
import { ResultDashboard } from "@/components/result-dashboard";
import { ResultSkeleton } from "@/components/result-skeleton";
import { useSeoGenerate } from "@/lib/use-seo-generate";

// Import landing components
import { LandingTrending } from "@/components/landing/landing-trending";
import { LandingBanners } from "@/components/landing/landing-banners";
import { LandingCTA } from "@/components/landing/landing-cta";

export default function Home() {
  const {
    content,
    isLoading,
    isStreaming,
    showSkeleton,
    error,
    recent,
    generatePlan,
    clearRecent
  } = useSeoGenerate();

  const hasResultOrGenerating = content || isStreaming || showSkeleton || error;

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <main id="main-content" role="main" className="pb-12">
        <HeroSection
          onSubmit={generatePlan}
          isLoading={isLoading}
          recentSearches={recent}
          onClearRecent={clearRecent}
        />

        {/* Dynamic App State Area */}
        <div className="relative z-10">
          {error && (
            <div className="mx-auto max-w-3xl px-6 pt-8" role="alert" aria-live="assertive">
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 shadow-sm border border-red-100">
                {error}
              </div>
            </div>
          )}

          {showSkeleton && <ResultSkeleton />}

          {(content || isStreaming) && !showSkeleton && (
            <ResultDashboard content={content} isStreaming={isStreaming} />
          )}
        </div>

        {/* Landing Page Content - Hidden when app is actively used */}
        {!hasResultOrGenerating && (
          <div className="flex flex-col gap-0 mt-8">
            <LandingTrending onSelectKeyword={generatePlan} />
            <LandingBanners />
            <LandingCTA />
          </div>
        )}
      </main>

    </div>
  );
}
