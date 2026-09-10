"use client";

interface TagCloudProps {
  tags: string[];
}

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-block bg-stone-faint text-ink-secondary text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full hover:bg-amber-light hover:text-amber-hover transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
