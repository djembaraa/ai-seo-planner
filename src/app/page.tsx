"use client";

import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { ResultDashboard } from "@/components/result-dashboard";
import { ResultSkeleton } from "@/components/result-skeleton";
import { AuthControls } from "@/components/auth-controls";
import { useRecentSearches } from "@/lib/use-recent-searches";

export default function Home() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const { recent, addRecent, clearRecent } = useRecentSearches();

  const handleSubmit = useCallback(
    async (keyword: string) => {
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setContent("");
      setError("");
      setIsLoading(true);
      setIsStreaming(true);
      setShowSkeleton(true);

      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
      let timedOut = false;
      const timeoutId = window.setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, 65_000);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await response.text().catch(() => "");
          let errorMessage = `Request failed (${response.status})`;

          if (response.status === 429) {
            errorMessage =
              "Too many requests. Please wait a moment and try again.";
          } else if (response.status === 400) {
            errorMessage =
              "Invalid keyword. Please check your input and try again.";
          } else if (response.status === 500) {
            errorMessage =
              "Server error. Please verify your API key is configured.";
          } else if (errorBody) {
            try {
              const parsed = JSON.parse(errorBody) as { error?: string };
              if (parsed.error) errorMessage = parsed.error;
            } catch {
              // use default message
            }
          }

          throw new Error(errorMessage);
        }

        reader = response.body?.getReader() ?? null;
        if (!reader) throw new Error("No reader available");

        const decoder = new TextDecoder();
        let accumulated = "";
        let skeletonHidden = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setContent(accumulated);

          if (!skeletonHidden) {
            skeletonHidden = true;
            setShowSkeleton(false);
          }
        }

        accumulated += decoder.decode();
        setContent(accumulated);

        addRecent(keyword);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError" &&
          abortRef.current !== controller &&
          !timedOut
        ) {
          return;
        }

        const message =
          timedOut
            ? "The generation took too long to complete."
            : err instanceof Error
              ? err.message
              : "An unexpected error occurred";
        setContent("");
        setError(
          `${message} Please try again. If the issue persists, verify your Google Gemini API key is configured.`
        );
      } finally {
        window.clearTimeout(timeoutId);
        await reader?.cancel().catch(() => undefined);
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsLoading(false);
          setIsStreaming(false);
          setShowSkeleton(false);
        }
      }
    },
    [addRecent]
  );

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="absolute top-0 left-0 right-0 z-10">
        <nav
          className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-accent">
              <svg
                className="w-4.5 h-4.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-on-dark">
              AI SEO Planner
            </span>
          </Link>
          <a
            href="https://github.com/djembaraa/ai-seo-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-on-dark-muted transition-colors hover:text-on-dark"
          >
            GitHub
          </a>
          <AuthControls />
        </nav>
      </header>

      <main id="main-content" role="main">
        <HeroSection
          onSubmit={handleSubmit}
          isLoading={isLoading}
          recentSearches={recent}
          onClearRecent={clearRecent}
        />

        {error && (
          <div className="mx-auto max-w-3xl px-6 pt-8" role="alert" aria-live="assertive">
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 shadow-sm">
              {error}
            </div>
          </div>
        )}

        {showSkeleton && <ResultSkeleton />}

        {(content || isStreaming) && !showSkeleton && (
          <ResultDashboard content={content} isStreaming={isStreaming} />
        )}
      </main>

    </div>
  );
}
