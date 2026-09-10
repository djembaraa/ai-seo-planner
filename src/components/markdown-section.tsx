"use client";

import { marked, type Token, type Tokens } from "marked";
import { CopyButton } from "./copy-button";

interface MarkdownSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

function buildRenderer() {
  const r = new marked.Renderer();

  const renderTokens = (tokens: Token[]) =>
    marked.parser(tokens, { renderer: r, breaks: true });

  r.link = function ({ href, tokens }: Tokens.Link) {
    return `<a href="${href}" class="text-amber-accent hover:text-amber-hover underline underline-offset-2" rel="noopener noreferrer">${this.parser.parseInline(tokens)}</a>`;
  };

  r.list = function (token: Tokens.List) {
    const tag = token.ordered ? "ol" : "ul";
    const cls = token.ordered
      ? "list-decimal list-outside pl-5 mb-4 space-y-2"
      : "list-disc list-outside pl-5 mb-4 space-y-2";

    const itemsHtml = token.items.map((item) => r.listitem(item)).join("");

    return `<${tag} class="${cls}">${itemsHtml}</${tag}>`;
  };

  r.listitem = function (item: Tokens.ListItem) {
    const checkbox = item.task
      ? `<input type="checkbox" class="mr-2 align-middle accent-amber-accent" ${item.checked ? "checked" : ""} disabled />`
      : "";
    return `<li class="text-ink-secondary leading-relaxed">${checkbox}${renderTokens(item.tokens)}</li>`;
  };

  r.heading = function ({ tokens, depth }: Tokens.Heading) {
    const cls =
      depth === 2
        ? "text-base font-bold text-ink mt-6 mb-2"
        : depth === 3
          ? "text-sm font-bold text-ink mt-4 mb-1.5"
          : "text-sm font-semibold text-ink mt-3 mb-1";
    return `<h${depth} class="${cls}">${this.parser.parseInline(tokens)}</h${depth}>`;
  };

  r.paragraph = function ({ tokens }: Tokens.Paragraph) {
    return `<p class="text-ink-secondary leading-relaxed mb-3">${this.parser.parseInline(tokens)}</p>`;
  };

  r.strong = function ({ tokens }: Tokens.Strong) {
    return `<strong class="font-semibold text-ink">${this.parser.parseInline(tokens)}</strong>`;
  };

  r.em = function ({ tokens }: Tokens.Em) {
    return `<em class="italic">${this.parser.parseInline(tokens)}</em>`;
  };

  r.del = function ({ tokens }: Tokens.Del) {
    return `<del class="text-stone-muted">${this.parser.parseInline(tokens)}</del>`;
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

  r.table = function (token: Tokens.Table) {
    const header = token.header
      .map((cell) => r.tablecell({ ...cell, header: true }))
      .join("");
    const headerRow = r.tablerow({ text: header });
    const body = token.rows
      .map((row) => r.tablerow({ text: row.map((cell) => r.tablecell(cell)).join("") }))
      .join("");

    return `<div class="overflow-x-auto mb-4"><table class="w-full border-collapse text-left text-sm"><thead>${headerRow}</thead><tbody>${body}</tbody></table></div>`;
  };

  r.tablerow = function ({ text }: Tokens.TableRow<string>) {
    return `<tr class="border-b border-stone-faint last:border-0">${text}</tr>`;
  };

  r.tablecell = function (cell: Tokens.TableCell) {
    const tag = cell.header ? "th" : "td";
    const align = cell.align ? ` style="text-align:${cell.align}"` : "";
    const className = cell.header
      ? "px-3 py-2 font-semibold text-ink bg-stone-faint"
      : "px-3 py-2 text-ink-secondary align-top";
    return `<${tag} class="${className}"${align}>${renderTokens(cell.tokens)}</${tag}>`;
  };

  r.hr = function () {
    return `<hr class="border-stone-faint my-4" />`;
  };

  return r;
}

const renderer = buildRenderer();

export function MarkdownSection({ title, icon, content }: MarkdownSectionProps) {
  const html = marked.parse(content, {
    renderer,
    async: false,
    gfm: true,
    breaks: true,
  }) as string;

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
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

