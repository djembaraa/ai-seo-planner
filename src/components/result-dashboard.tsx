"use client";

import { useMemo } from "react";
import { MarkdownSection } from "./markdown-section";
import { TagCloud } from "./tag-cloud";
import { CopyButton } from "./copy-button";
import { SectionIcon } from "./section-icon";
import { SECTION_DEFINITIONS, SECTION_TITLES } from "@/lib/constants";
import { parseSeoSections, extractTags } from "@/lib/parse-seo";

interface ResultDashboardProps {
  content: string;
  isStreaming: boolean;
}

export function ResultDashboard({ content, isStreaming }: ResultDashboardProps) {
  const sections = useMemo(() => parseSeoSections(content), [content]);
  const keywordTags = useMemo(
    () => (sections["Related Keywords"] ? extractTags(sections["Related Keywords"]) : []),
    [sections]
  );

  const hasAnyContent = Object.keys(sections).length > 0;
  const activeStep = Math.max(
    0,
    SECTION_DEFINITIONS.findIndex(({ title }) => !sections[title])
  );
  const progress = Math.round(((activeStep + 1) / SECTION_DEFINITIONS.length) * 100);

  if (!hasAnyContent && !isStreaming) return null;

  return (
    <section
      className="mx-auto max-w-3xl px-6 py-12 sm:py-16"
      aria-label="SEO strategy results"
      aria-live="polite"
    >
      {isStreaming && !hasAnyContent && (
        <GenerationStatus label="Analyzing your keyword and planning the strategy" progress={8} />
      )}

      {isStreaming && hasAnyContent && (
        <GenerationStatus label={SECTION_DEFINITIONS[activeStep].progressLabel} progress={progress} />
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

          {SECTION_TITLES.map((title, i) => {
            const sectionContent = sections[title];
            if (!sectionContent) return null;

            const definition = SECTION_DEFINITIONS[i];

            return (
              <article
                key={title}
                className="animate-fade-up"
                style={{ animationDelay: `${0.08 * (i + 1)}s` }}
              >
                <MarkdownSection
                  title={title}
                  icon={<SectionIcon path={definition.iconPath} />}
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

function GenerationStatus({ label, progress }: { label: string; progress: number }) {
  return (
    <div
      className="mb-6 rounded-xl bg-amber-50/70 px-4 py-3 shadow-sm animate-fade-up"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-sm font-semibold text-amber-900">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-accent" />
        </span>
        {label}
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-100"
        role="progressbar"
        aria-label={`${progress}% complete`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-amber-accent transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
