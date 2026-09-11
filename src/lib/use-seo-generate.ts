import { useState, useCallback, useRef } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRecentSearches } from "@/lib/use-recent-searches";

export function useSeoGenerate() {
  const { isSignedIn, isLoaded } = useAuth();
  const clerk = useClerk();
  
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [error, setError] = useState("");
  
  const abortRef = useRef<AbortController | null>(null);
  const { recent, addRecent, clearRecent } = useRecentSearches();

  const generatePlan = useCallback(
    async (keyword: string) => {
      if (isLoaded && !isSignedIn) {
        clerk.openSignIn();
        return;
      }

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
            errorMessage = "Too many requests. Please wait a moment and try again.";
          } else if (response.status === 400) {
            errorMessage = "Invalid keyword. Please check your input and try again.";
          } else if (response.status === 500) {
            errorMessage = "Server error. Please verify your API key is configured.";
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

        const message = timedOut
          ? "The generation took too long to complete."
          : err instanceof Error
            ? err.message
            : "An unexpected error occurred";
        
        setContent("");
        setError(`${message} Please try again. If the issue persists, verify your Google Gemini API key is configured.`);
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
    [addRecent, isLoaded, isSignedIn, clerk]
  );

  return {
    content,
    isLoading,
    isStreaming,
    showSkeleton,
    error,
    recent,
    generatePlan,
    clearRecent
  };
}
