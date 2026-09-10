"use client";

import { marked, type Tokens } from "marked";
import { CopyButton } from "./copy-button";

interface MarkdownSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

function buildRenderer() {
  const r = new marked.Renderer();

  r.link = function ({ href, text }: Tokens.Link) {
    return `<a href="${href}" class="text-amber-accent hover:text-amber-hover underline underline-offset-2" rel="noopener noreferrer">${text}</a>`;
  };

  // marked v18 passes the full List token; render items manually
  r.list = function (token: Tokens.List) {
    const tag = token.ordered ? "ol" : "ul";
    const cls = token.ordered
      ? "list-decimal list-outside pl-5 mb-4 space-y-1"
      : "list-disc list-outside pl-5 mb-4 space-y-1";

    const itemsHtml = token.items
      .map((item) => {
        // item.tokens contains inline tokens — render them
        const inner = marked.parseInline(item.text, { renderer: r });
        return `<li class="text-ink-secondary leading-relaxed">${inner}</li>`;
      })
      .join("");

    return `<${tag} class="${cls}">${itemsHtml}</${tag}>`;
  };

  r.heading = function ({ text, depth }: Tokens.Heading) {
    const cls =
      depth === 2
        ? "text-base font-bold text-ink mt-6 mb-2"
        : depth === 3
          ? "text-sm font-bold text-ink mt-4 mb-1.5"
          : "text-sm font-semibold text-ink mt-3 mb-1";
    return `<h${depth} class="${cls}">${text}</h${depth}>`;
  };

  r.paragraph = function ({ text }: Tokens.Paragraph) {
    return `<p class="text-ink-secondary leading-relaxed mb-3">${text}</p>`;
  };

  r.strong = function ({ text }: Tokens.Strong) {
    return `<strong class="font-semibold text-ink">${text}</strong>`;
  };

  r.em = function ({ text }: Tokens.Em) {
    return `<em class="italic">${text}</em>`;
  };

  r.codespan = function ({ text }: Tokens.Codespan) {
    return `<code class="bg-stone-faint px-1.5 py-0.5 rounded text-sm font-mono font-medium text-ink">${text}</code>`;
  };

  r.code = function ({ text }: Tokens.Code) {
    return `<pre class="bg-stone-faint rounded-xl p-4 overflow-x-auto mb-4"><code class="text-sm font-mono text-ink">${text}</code></pre>`;
  };

  r.blockquote = function ({ text }: Tokens.Blockquote) {
    return `<blockquote class="border-l-4 border-amber-accent pl-4 py-1 mb-4 text-stone-muted italic">${text}</blockquote>`;
  };

  r.hr = function () {
    return `<hr class="border-stone-faint my-4" />`;
  };

  return r;
}

const renderer = buildRenderer();

export function MarkdownSection({ title, icon, content }: MarkdownSectionProps) {
  const html = marked.parse(content, { renderer, async: false, gfm: true }) as string;

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

