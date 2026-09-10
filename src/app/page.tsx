"use client";

import { useState, useCallback, useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { ResultDashboard } from "@/components/result-dashboard";
import { ResultSkeleton } from "@/components/result-skeleton";

export default function Home() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(async (keyword: string) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setContent("");
    setIsLoading(true);
    setIsStreaming(true);
    setShowSkeleton(true);

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
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (response.status === 400) {
          errorMessage = "Invalid keyword. Please check your input and try again.";
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

      const reader = response.body?.getReader();
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
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setContent(
        `## Error\n\n${message}\n\nPlease try again. If the issue persists, verify your Google Gemini API key is configured.`
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
        setIsStreaming(false);
        setShowSkeleton(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-accent flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">
              AI SEO Planner
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94A3B8] hover:text-white text-xs font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>

      <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />

      {showSkeleton && <ResultSkeleton />}

      {(content || isStreaming) && !showSkeleton && (
        <ResultDashboard content={content} isStreaming={isStreaming} />
      )}

      <footer className="mt-auto py-8 text-center">
        <p className="text-xs text-stone-subtle font-medium">
          Built with Next.js, Vercel AI SDK, and Google Gemini
        </p>
      </footer>
    </div>
  );
}
