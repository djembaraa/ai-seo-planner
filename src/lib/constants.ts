export const RECENT_SEARCH_LIMIT = 3;

export const SECTION_DEFINITIONS = [
  {
    title: "Search Intent",
    iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    progressLabel: "Mapping search intent and audience needs",
  },
  {
    title: "Related Keywords",
    iconPath: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    progressLabel: "Exploring keyword opportunities",
  },
  {
    title: "Content Ideas & Titles",
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547",
    progressLabel: "Developing content angles that can compete",
  },
  {
    title: "Content Outline",
    iconPath: "M4 6h16M4 10h16M4 14h16M4 18h16",
    progressLabel: "Structuring a useful, search-ready article",
  },
  {
    title: "Meta Data",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    progressLabel: "Polishing on-page SEO recommendations",
  },
] as const;

export const SECTION_TITLES = SECTION_DEFINITIONS.map(({ title }) => title);

export const SKELETON_WIDTHS = [
  ["85%", "60%", "75%"],
  ["70%", "55%", "80%"],
  ["90%", "65%", "72%"],
  ["60%", "78%", "68%"],
  ["75%", "50%", "85%"],
] as const;

export const TAG_WIDTHS = [95, 110, 80, 120, 88, 105, 92, 115, 78, 130];