import { PageHeader } from "@/components/page-header";
import { Search } from "lucide-react";

export const metadata = { title: "Help Center | AI SEO Planner" };

export default function HelpPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Support" title="How can we help?" description="Search our knowledge base or browse categories below." />
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
          <input type="text" placeholder="Search for answers..." className="w-full bg-white border border-slate-200 rounded-full px-16 py-5 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-accent/50" />
        </div>
        <div className="mt-16 space-y-4">
          <h2 className="text-xl font-bold text-slate-deep px-2 mb-6">Frequently Asked Questions</h2>
          {[
            "How does the AI determine search intent?",
            "Can I use my own Google Gemini API key?",
            "How do I export results to Notion?",
            "Are the generated plans ready to be published?"
          ].map((q, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-amber-accent transition-colors">
              <h3 className="font-semibold text-slate-deep">{q}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
