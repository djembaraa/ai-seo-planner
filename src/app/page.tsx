"use client";

import { HeroSection } from "@/components/hero-section";
import { ResultDashboard } from "@/components/result-dashboard";
import { ResultSkeleton } from "@/components/result-skeleton";
import { useSeoGenerate } from "@/lib/use-seo-generate";

// Import landing components
import { LandingTrending } from "@/components/landing/landing-trending";
import { LandingCTA } from "@/components/landing/landing-cta";

import { AlertTriangle, XCircle } from "lucide-react";

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

      <main id="main-content" role="main">
        <HeroSection
          onSubmit={generatePlan}
          isLoading={isLoading}
          recentSearches={recent}
          onClearRecent={clearRecent}
        />

        {/* Dynamic App State Area */}
        <div className="relative z-10">
          {error && error === "API_TOKEN_EXHAUSTED" && (
            <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8" role="alert">
              <div className="rounded-3xl bg-amber-50 p-8 border border-amber-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">API Token Exhausted</h3>
                <p className="text-slate-600 mb-6 max-w-lg leading-relaxed">
                  We&apos;re experiencing extremely high demand and our AI quota has temporarily run out. We cannot process your request right now.
                </p>
                <div className="bg-white rounded-2xl p-5 border border-amber-100 w-full max-w-lg text-left shadow-sm">
                  <p className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Developer Action Required
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Our AI API quota has been completely exhausted. Please contact the developer to upgrade the billing plan or add more API quota to restore the service.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && error !== "API_TOKEN_EXHAUSTED" && (
            <div className="mx-auto max-w-3xl px-6 pt-8" role="alert" aria-live="assertive">
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 shadow-sm border border-red-100 flex items-start sm:items-center gap-3">
                <XCircle className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" />
                <span>{error}</span>
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
          <div className="flex flex-col gap-0 mt-8 w-full overflow-hidden">
            <LandingTrending onSelectKeyword={generatePlan} />
            <LandingCTA />
          </div>
        )}
      </main>

    </div>
  );
}
