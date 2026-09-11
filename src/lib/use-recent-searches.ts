"use client";

import { startTransition, useState, useEffect, useCallback } from "react";
import { RECENT_SEARCH_LIMIT } from "@/lib/constants";

const STORAGE_KEY = "seo-planner-recent";

export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          const recentSearches = parsed
            .filter((s) => typeof s === "string")
            .slice(0, RECENT_SEARCH_LIMIT);
          startTransition(() => setRecent(recentSearches));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const addRecent = useCallback((keyword: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((s) => s !== keyword);
      const updated = [keyword, ...filtered].slice(0, RECENT_SEARCH_LIMIT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { recent, addRecent, clearRecent };
}
