interface SectionIconProps {
  path: string;
}

export function SectionIcon({ path }: SectionIconProps) {
  return (
    <svg
      className="h-4.5 w-4.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}