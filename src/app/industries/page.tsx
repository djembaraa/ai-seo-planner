import { LandingIndustries } from "@/components/landing/landing-industries";
import { LandingCTA } from "@/components/landing/landing-cta";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Industries",
  description: "AI SEO Planner across various industries.",
};

const benefits = [
  {
    title: "Ecommerce Brands",
    desc: "Generate product category descriptions, comparison articles (vs pages), and buyer guides that capture commercial intent."
  },
  {
    title: "SaaS Startups",
    desc: "Build topical authority around your software niche with 'What is X' guides, alternative pages, and integration tutorials."
  },
  {
    title: "Local Businesses",
    desc: "Target geo-specific long-tail keywords with local service pages, 'near me' content, and localized pricing guides."
  },
  {
    title: "Marketing Agencies",
    desc: "Scale your content production. Generate entire content calendars for 10+ clients in a fraction of the time."
  }
];

import { PageHeader } from "@/components/page-header";

export default function IndustriesPage() {
  return (
    <main className="pt-24 pb-0 bg-canvas min-h-screen">
      <PageHeader 
        badge="Use Cases"
        title={<>Built for <span className="text-amber-accent">Every Industry</span></>}
        description="Whether you are selling software globally or plumbing services locally, our AI adapts to the exact search intent of your target audience."
      />
      
      <LandingIndustries />

      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-deep mb-8">
                Context-Aware Generation
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-deep text-lg">{benefit.title}</h3>
                      <p className="text-ink-secondary mt-1">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="flex flex-col gap-4">
                <div className="h-4 w-1/3 bg-slate-200 rounded-full" />
                <div className="h-3 w-full bg-slate-200 rounded-full" />
                <div className="h-3 w-5/6 bg-slate-200 rounded-full" />
                <div className="h-3 w-full bg-slate-200 rounded-full" />
                
                <div className="h-4 w-1/2 bg-slate-200 rounded-full mt-6" />
                <div className="h-24 w-full bg-slate-200 rounded-xl" />
                <div className="h-24 w-full bg-slate-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingCTA />
    </main>
  );
}
