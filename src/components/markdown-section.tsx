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

renderer.list = function ({ body, ordered }: { body: string; ordered: boolean }) {
  const tag = ordered ? "ol" : "ul";
  const cls = ordered
    ? "list-decimal list-outside ml-5 mb-4 space-y-1.5"
    : "list-disc list-outside ml-5 mb-4 space-y-1.5";
  return `<${tag} class="${cls}">${body}</${tag}>`;
};

renderer.listitem = function ({ text }: { text: string }) {
  return `<li class="text-ink-secondary leading-relaxed pl-1">${text}</li>`;
};

renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
  const cls =
    depth === 2
      ? "text-base font-bold text-ink mt-6 mb-2"
      : depth === 3
        ? "text-sm font-bold text-ink mt-4 mb-1.5"
        : "text-sm font-semibold text-ink mt-3 mb-1";
  return `<h${depth} class="${cls}">${text}</h${depth}>`;
};

renderer.paragraph = function ({ text }: { text: string }) {
  return `<p class="text-ink-secondary leading-relaxed mb-3">${text}</p>`;
};

renderer.strong = function ({ text }: { text: string }) {
  return `<strong class="font-semibold text-ink">${text}</strong>`;
};

renderer.em = function ({ text }: { text: string }) {
  return `<em class="italic">${text}</em>`;
};

renderer.codespan = function ({ text }: { text: string }) {
  return `<code class="bg-stone-faint px-1.5 py-0.5 rounded text-sm font-mono font-medium text-ink">${text}</code>`;
};

renderer.code = function ({ text }: { text: string }) {
  return `<pre class="bg-stone-faint rounded-xl p-4 overflow-x-auto mb-4"><code class="text-sm font-mono text-ink">${text}</code></pre>`;
};

renderer.blockquote = function ({ text }: { text: string }) {
  return `<blockquote class="border-l-4 border-amber-accent pl-4 py-1 mb-4 text-stone-muted italic">${text}</blockquote>`;
};

renderer.hr = function () {
  return `<hr class="border-stone-faint my-4" />`;
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
