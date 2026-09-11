export function parseSeoSections(markdown: string) {
  const sections: Record<string, string> = {};
  const headings = [
    "Search Intent",
    "Related Keywords",
    "Content Ideas & Titles",
    "Content Outline",
    "Meta Data",
  ];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextHeading = headings[i + 1];

    // Match ## heading with optional trailing whitespace/newline
    const startRegex = new RegExp(`##\\s*${escapeRegex(heading)}\\s*(?:\\n|$)`, "i");
    const startMatch = markdown.match(startRegex);

    if (startMatch) {
      const startIndex = startMatch.index! + startMatch[0].length;
      let endIndex: number;

      if (nextHeading) {
        const endRegex = new RegExp(
          `##\\s*${escapeRegex(nextHeading)}`,
          "i"
        );
        const endMatch = markdown.slice(startIndex).match(endRegex);
        endIndex = endMatch
          ? startIndex + endMatch.index!
          : markdown.length;
      } else {
        endIndex = markdown.length;
      }

      sections[heading] = markdown.slice(startIndex, endIndex).trim();
    }
  }

  return sections;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function extractTags(section: string): string[] {
  const tags: string[] = [];

  // Process line by line — keywords can be on the same line as a **Label**
  for (const rawLine of section.split("\n")) {
    // Strip leading bold label like "**Primary Related Keywords**" or "**Long-tail Keywords**"
    const line = rawLine.replace(/^\*\*[^*]+\*\*\s*/, "").trim();
    if (!line || line.startsWith("#")) continue;

    // Split by comma, clean each token
    for (const token of line.split(",")) {
      const clean = token
        .trim()
        // Remove markdown bold/italic markers
        .replace(/\*+/g, "")
        // Remove list prefixes
        .replace(/^[-•*]\s*/, "")
        // Remove volume tiers like "(High)", "(Medium)", "(Low/Medium)"
        .replace(/\s*\([^)]*\)\s*$/, "")
        .trim();

      if (clean.length > 2 && clean.length < 60) {
        tags.push(clean);
      }
    }
  }

  return [...new Set(tags)].slice(0, 20);
}
