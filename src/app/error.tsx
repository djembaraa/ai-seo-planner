"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Something went wrong
        </h1>
        <p className="text-stone-muted text-sm mb-8 leading-relaxed">
          An unexpected error occurred while loading the application.
          Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-amber-accent hover:bg-amber-hover text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
