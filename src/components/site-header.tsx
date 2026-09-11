"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthControls } from "@/components/auth-controls";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Templates", href: "/templates" },
  { name: "Industries", href: "/industries" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-deep border-b border-white/5 sticky top-0 z-50">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-accent shadow-md">
              <svg
                className="w-4.5 h-4.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-white drop-shadow-sm">
              AI SEO Planner
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-amber-accent" 
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/djembaraa/ai-seo-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-xs font-medium text-slate-300 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <AuthControls />
        </div>
      </nav>
    </header>
  );
}
