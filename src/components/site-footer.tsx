"use client";

import Link from "next/link";
import { MessageSquare, Globe, Hash, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-20 pb-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-accent">
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
              <span className="text-lg font-bold tracking-tight text-white">
                AI SEO Planner
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The world's fastest way to generate search intent, keyword clusters, and content strategies using advanced AI.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-amber-accent hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="https://github.com/djembaraa/ai-seo-planner" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-amber-accent hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-amber-accent hover:text-white transition-colors">
                <Hash className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-6">Product</h3>
            <ul className="space-y-4">
              <li><Link href="/features" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Features</Link></li>
              <li><Link href="/templates" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Templates</Link></li>
              <li><Link href="/industries" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Industries</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Pricing</Link></li>
              <li><Link href="/changelog" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Changelog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Blog</Link></li>
              <li><Link href="/guides" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">SEO Guides</Link></li>
              <li><Link href="/help" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Help Center</Link></li>
              <li><Link href="/community" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-amber-accent transition-colors text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} AI SEO Planner. Built by Djembar Arafat.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-medium text-slate-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}