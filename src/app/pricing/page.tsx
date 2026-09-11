import { PageHeader } from "@/components/page-header";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Pricing & Plans | AI SEO Planner" };

const plans = [
  { name: "Starter", price: "$0", desc: "Perfect for exploring.", features: ["3 Searches / day", "Basic Keyword Clusters", "Standard Support"] },
  { name: "Pro", price: "$29", desc: "For SEO professionals.", features: ["Unlimited Searches", "Advanced Search Intent", "Export to Notion", "Priority Support"], popular: true },
  { name: "Agency", price: "$99", desc: "For marketing teams.", features: ["Everything in Pro", "API Access", "Custom Templates", "Dedicated Account Manager"] }
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Pricing" title="Simple, transparent pricing" description="Choose the plan that best fits your SEO needs. No hidden fees." />
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mt-12">
        {plans.map(p => (
          <div key={p.name} className={`bg-white rounded-3xl p-8 border ${p.popular ? 'border-amber-accent shadow-xl shadow-amber-accent/10 relative' : 'border-slate-200 shadow-sm'}`}>
            {p.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
            <h3 className="text-2xl font-bold text-slate-deep">{p.name}</h3>
            <p className="text-ink-secondary mt-2">{p.desc}</p>
            <div className="my-6 text-5xl font-extrabold text-slate-deep">{p.price}<span className="text-lg text-slate-400 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {p.features.map(f => (
                <li key={f} className="flex gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {f}</li>
              ))}
            </ul>
            <Button className="w-full" variant={p.popular ? "primary" : "outline"} size="lg">
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
