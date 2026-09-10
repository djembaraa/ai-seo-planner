"use client";

import { marked } from "marked";
import { CopyButton } from "./copy-button";

interface MarkdownSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

const renderer = new marked.Renderer();

renderer.link = function ({ href, text }: { href: string; text: string }) {
  return `<a href="${href}" class="text-amber-accent hover:text-amber-hover underline underline-offset-2" rel="noopener noreferrer">${text}</a>`;
};

renderer.listitem = function ({ text }: { text: string }) {
  return `<li class="ml-4 text-ink-secondary leading-relaxed">${text}</li>`;
};

renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
  const cls =
    depth === 2
      ? "text-lg font-bold mt-6 mb-3"
      : depth === 3
        ? "text-base font-bold mt-5 mb-2"
        : "text-sm font-bold mt-4 mb-2";
  return `<h${depth} class="${cls}">${text}</h${depth}>`;
};

renderer.paragraph = function ({ text }: { text: string }) {
  return `<p class="mb-3">${text}</p>`;
};

renderer.strong = function ({ text }: { text: string }) {
  return `<strong class="font-semibold text-ink">${text}</strong>`;
};

renderer.em = function ({ text }: { text: string }) {
  return `<em>${text}</em>`;
};

renderer.codespan = function ({ text }: { text: string }) {
  return `<code class="bg-stone-faint px-1.5 py-0.5 rounded text-sm font-medium">${text}</code>`;
};

export function MarkdownSection({ title, icon, content }: MarkdownSectionProps) {
  const html = marked.parse(content, { renderer, async: false }) as string;

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
      <div
        className="prose prose-sm sm:prose-base prose-stone max-w-none prose-headings:font-bold prose-headings:text-ink prose-p:text-ink-secondary prose-p:leading-relaxed prose-strong:text-ink prose-li:text-ink-secondary"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
