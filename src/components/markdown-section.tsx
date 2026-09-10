"use client";

import { CopyButton } from "./copy-button";

interface MarkdownSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

export function MarkdownSection({ title, icon, content }: MarkdownSectionProps) {
  return (
    <div className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-light text-amber-accent">
            {icon}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-ink">{title}</h2>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="prose prose-sm sm:prose-base prose-stone max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-secondary prose-p:leading-relaxed prose-strong:text-ink prose-li:text-ink-secondary prose-code:bg-stone-faint prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
      </div>
    </div>
  );
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold mt-5 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-6 mb-3">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-stone-faint px-1.5 py-0.5 rounded text-sm font-medium">$1</code>'
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-amber-accent hover:text-amber-hover underline underline-offset-2">$1</a>'
    )
    .replace(
      /^- (.+)$/gm,
      '<li class="ml-4 list-disc text-ink-secondary leading-relaxed">$1</li>'
    )
    .replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-4 list-decimal text-ink-secondary leading-relaxed">$1</li>'
    );

  const lines = html.split("\n");
  const processed: string[] = [];
  let inList = false;

  for (const line of lines) {
    const isListItem = line.includes("<li");
    const isHeading = line.includes("<h2") || line.includes("<h3");

    if (isListItem && !inList) {
      processed.push("<ul>");
      inList = true;
    } else if (!isListItem && inList) {
      processed.push("</ul>");
      inList = false;
    }

    if (
      !isListItem &&
      !isHeading &&
      line.trim() &&
      !line.startsWith("<")
    ) {
      processed.push(`<p>${line}</p>`);
    } else {
      processed.push(line);
    }
  }

  if (inList) processed.push("</ul>");

  return processed.join("\n");
}
