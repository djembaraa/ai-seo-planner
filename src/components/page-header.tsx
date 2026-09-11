import { ReactNode } from "react";

interface PageHeaderProps {
  badge: string;
  title: ReactNode;
  description: ReactNode;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="text-center py-20 px-4 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-accent/10 text-amber-accent text-sm font-bold uppercase tracking-wider mb-6">
        {badge}
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-deep mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-xl text-ink-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
