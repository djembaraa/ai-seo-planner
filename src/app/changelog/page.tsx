import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Changelog | AI SEO Planner" };

const logs = [
  { version: "v2.4.0", date: "Sep 10, 2026", title: "New AI Output Formats", desc: "Added 5 new auto-detected output formats including Developer Guides and Ecommerce Categories. Improved the speed of intent clustering by 40%." },
  { version: "v2.3.1", date: "Aug 28, 2026", title: "Export to Notion", desc: "You can now directly export your generated SEO plans to your Notion workspace with a single click. Supported properties include status, assignee, and target keyword." },
  { version: "v2.3.0", date: "Aug 15, 2026", title: "Dark Mode Optimization", desc: "Completely overhauled the dark mode contrast across all landing pages to meet WCAG AAA accessibility standards." }
];

export default function ChangelogPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Updates" title="Product Changelog" description="New updates and improvements to our AI engine." />
      <div className="max-w-3xl mx-auto px-4 mt-12 space-y-8">
        {logs.map((log, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative pl-12 md:pl-16">
            <div className="absolute top-10 left-0 w-8 md:w-12 h-[2px] bg-amber-accent" />
            <div className="flex items-center gap-4 mb-3">
              <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-sm">{log.version}</span>
              <span className="text-slate-400 text-sm font-medium">{log.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-deep mb-3">{log.title}</h2>
            <p className="text-slate-600 leading-relaxed">{log.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
