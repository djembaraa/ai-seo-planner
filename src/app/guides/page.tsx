import { PageHeader } from "@/components/page-header";
import { BookOpen, Layers, Terminal } from "lucide-react";

export const metadata = { title: "SEO Guides | AI SEO Planner" };

export default function GuidesPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Learning Center" title="Definitive SEO Guides" description="Master modern SEO with our comprehensive, step-by-step technical guides." />
      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-3 gap-8">
        {[
          { icon: BookOpen, title: "Content Strategy 101", desc: "Learn how to build topical authority from scratch." },
          { icon: Layers, title: "Pillar Pages", desc: "The architecture behind massive organic traffic growth." },
          { icon: Terminal, title: "Technical SEO", desc: "Site speed, structured data, and crawlability optimization." }
        ].map((g, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-amber-accent/10 rounded-2xl flex items-center justify-center mb-6"><g.icon className="w-8 h-8 text-amber-accent" /></div>
            <h2 className="text-xl font-bold text-slate-deep mb-3">{g.title}</h2>
            <p className="text-slate-500 mb-6">{g.desc}</p>
            <button className="text-amber-accent font-bold hover:underline">Read Guide &rarr;</button>
          </div>
        ))}
      </div>
    </main>
  );
}
