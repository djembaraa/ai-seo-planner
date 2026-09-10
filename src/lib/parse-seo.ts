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

    const startRegex = new RegExp(`##\\s*${escapeRegex(heading)}\\s*\\n`, "i");
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
  const boldPattern = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldPattern.exec(section)) !== null) {
    const text = match[1].trim();
    if (
      text.length > 2 &&
      !text.includes(":") &&
      !text.startsWith("Primary") &&
      !text.startsWith("Long-tail")
    ) {
      tags.push(text);
    }
  }

  const commaItems = section
    .split("\n")
    .filter((line) => !line.startsWith("**") && !line.startsWith("#"))
    .flatMap((line) =>
      line
        .split(",")
        .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
        .filter((s) => s.length > 2 && s.length < 60)
    );

  tags.push(...commaItems);

  return [...new Set(tags)].slice(0, 24);
}
