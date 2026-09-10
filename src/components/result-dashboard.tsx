"use client";

import { useMemo } from "react";
import { MarkdownSection } from "./markdown-section";
import { TagCloud } from "./tag-cloud";
import { CopyButton } from "./copy-button";
import { parseSeoSections, extractTags } from "@/lib/parse-seo";

interface ResultDashboardProps {
  content: string;
  isStreaming: boolean;
}

const SECTION_META: Record<
  string,
  { icon: React.ReactNode; description: string }
> = {
  "Search Intent": {
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description: "Understanding why users search for this keyword",
  },
  "Related Keywords": {
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    description: "Keyword variations and long-tail opportunities",
  },
  "Content Ideas & Titles": {
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    description: "Actionable content formats and title suggestions",
  },
  "Content Outline": {
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    description: "Structured H2/H3 outline for your pillar article",
  },
  "Meta Data": {
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: "Optimized title tags, descriptions, and schema markup",
  },
};

export function ResultDashboard({ content, isStreaming }: ResultDashboardProps) {
  const sections = useMemo(() => parseSeoSections(content), [content]);
  const keywordTags = useMemo(
    () => (sections["Related Keywords"] ? extractTags(sections["Related Keywords"]) : []),
    [sections]
  );

  const sectionOrder = [
    "Search Intent",
    "Related Keywords",
    "Content Ideas & Titles",
    "Content Outline",
    "Meta Data",
  ];

  const hasAnyContent = Object.keys(sections).length > 0;

  if (!hasAnyContent && !isStreaming) return null;

  return (
    <section
      className="mx-auto max-w-3xl px-6 py-12 sm:py-16"
      aria-label="SEO strategy results"
      aria-live="polite"
    >
      {isStreaming && !hasAnyContent && (
        <div className="flex items-center gap-3 text-stone-muted text-sm font-medium animate-fade-up">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Analyzing keyword and building your strategy…
        </div>
      )}

      {hasAnyContent && (
        <div className="space-y-6">
          <div className="flex items-center justify-between animate-fade-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Your SEO Strategy
              </h2>
              <p className="mt-1.5 text-sm text-stone-muted font-medium">
                {isStreaming ? "Streaming results…" : "Complete — copy any section below"}
              </p>
            </div>
            {!isStreaming && (
              <CopyButton text={content} />
            )}
          </div>

          {keywordTags.length > 0 && (
            <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <p className="text-xs font-semibold text-stone-muted uppercase tracking-wider mb-3">
                Keyword Tags
              </p>
              <TagCloud tags={keywordTags} />
            </div>
          )}

          {sectionOrder.map((title, i) => {
            const sectionContent = sections[title];
            if (!sectionContent) return null;

            const meta = SECTION_META[title];

            return (
              <article
                key={title}
                className="animate-fade-up"
                style={{ animationDelay: `${0.08 * (i + 1)}s` }}
              >
                <MarkdownSection
                  title={title}
                  icon={meta?.icon ?? null}
                  content={sectionContent}
                />
              </article>
            );
          })}

          {isStreaming && (
            <div className="flex items-center gap-2 text-stone-muted text-xs font-medium pt-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse" aria-hidden="true" />
              <span role="status">Generating…</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
