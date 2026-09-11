import { describe, it, expect } from "vitest";
import { parseSeoSections, extractTags } from "./parse-seo";

describe("parseSeoSections", () => {
  const sampleMarkdown = `## Search Intent

This is informational intent. Users want to learn about content marketing.

## Related Keywords

**Primary Related Keywords** (8 terms): content marketing, digital marketing, marketing strategy, content creation, content plan, marketing plan, content strategy, online marketing.

**Long-tail Keywords** (8 phrases): what is content marketing, content marketing strategy for beginners, how to create a content plan, content marketing examples.

## Content Ideas & Titles

- **The Complete Guide to Content Marketing** — Guide: Everything you need to know to get started.
- **10 Content Marketing Strategies** — Listicle: Proven strategies that drive results.

## Content Outline

### Introduction
- What is content marketing
- Why it matters

### Getting Started
- Define your audience
- Set goals

## Meta Data

- **Title Tag**: Content Marketing Strategy — The Complete Guide
- **Meta Description**: Learn how to build a content marketing strategy that drives traffic and conversions.
- **URL Slug**: content-marketing-strategy
`;

  it("extracts all 5 sections from well-formed markdown", () => {
    const sections = parseSeoSections(sampleMarkdown);

    expect(sections["Search Intent"]).toBeDefined();
    expect(sections["Related Keywords"]).toBeDefined();
    expect(sections["Content Ideas & Titles"]).toBeDefined();
    expect(sections["Content Outline"]).toBeDefined();
    expect(sections["Meta Data"]).toBeDefined();
  });

  it("extracts Search Intent content correctly", () => {
    const sections = parseSeoSections(sampleMarkdown);
    expect(sections["Search Intent"]).toContain("informational intent");
  });

  it("returns empty object for empty markdown", () => {
    const sections = parseSeoSections("");
    expect(Object.keys(sections)).toHaveLength(0);
  });

  it("handles markdown with missing sections gracefully", () => {
    const partial = `## Search Intent\n\nOnly this section exists.`;
    const sections = parseSeoSections(partial);
    expect(sections["Search Intent"]).toContain("Only this section exists");
    expect(sections["Related Keywords"]).toBeUndefined();
  });
});

describe("extractTags", () => {
  it("extracts comma-separated terms as tags", () => {
    const section = `**Primary Related Keywords** (8 terms): closely related variations.

content marketing, digital marketing, marketing strategy, content creation, content plan, marketing plan, content strategy, online marketing.`;
    const tags = extractTags(section);
    expect(tags.length).toBeGreaterThan(0);
    expect(tags).toContain("content marketing");
    expect(tags).toContain("digital marketing");
  });

  it("filters out section headers like 'Primary Related Keywords'", () => {
    const section = `**Primary Related Keywords** (8 terms): content marketing, digital marketing.`;
    const tags = extractTags(section);
    expect(tags).not.toContain("Primary Related Keywords");
    expect(tags).not.toContain("Long-tail Keywords");
  });

  it("returns empty array for empty section", () => {
    expect(extractTags("")).toHaveLength(0);
  });

  it("deduplicates tags", () => {
    const section = "content marketing, content marketing, SEO";
    const tags = extractTags(section);
    const contentMarketingCount = tags.filter(
      (t) => t === "content marketing"
    ).length;
    expect(contentMarketingCount).toBe(1);
  });

  it("limits tags to 20", () => {
    const many = Array.from({ length: 30 }, (_, i) => `keyword-${i}`).join(
      ", "
    );
    const tags = extractTags(many);
    expect(tags.length).toBeLessThanOrEqual(20);
  });
});
