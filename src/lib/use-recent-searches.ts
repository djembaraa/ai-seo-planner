"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "seo-planner-recent";
const MAX_ITEMS = 3;

export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        if (Array.isArray(parsed)) {
          setRecent(parsed.filter((s) => typeof s === "string").slice(0, MAX_ITEMS));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const addRecent = useCallback((keyword: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((s) => s !== keyword);
      const updated = [keyword, ...filtered].slice(0, MAX_ITEMS);
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
