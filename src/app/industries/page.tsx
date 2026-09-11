import { LandingIndustries } from "@/components/landing/landing-industries";
import { LandingCTA } from "@/components/landing/landing-cta";

export const metadata = {
  title: "Industries",
  description: "AI SEO Planner across various industries.",
};

export default function IndustriesPage() {
  return (
    <main className="pt-24 pb-12">
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-deep mb-4">
          For Every Industry
        </h1>
        <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
          Whether you are an agency, local business, or SaaS, our tool adapts to your niche.
        </p>
      </div>
      <LandingIndustries />
      <LandingCTA />
    </main>
  );
}
