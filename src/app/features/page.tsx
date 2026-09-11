import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingCTA } from "@/components/landing/landing-cta";

export const metadata = {
  title: "Features",
  description: "Explore the powerful features of AI SEO Planner.",
};

export default function FeaturesPage() {
  return (
    <main className="pt-24 pb-12">
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-deep mb-4">
          Powerful SEO Features
        </h1>
        <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
          Everything you need to build content strategies that rank, powered by advanced AI analysis.
        </p>
      </div>
      <div className="mt-8">
        <LandingFeatures />
      </div>
      <LandingHowItWorks />
      <LandingCTA />
    </main>
  );
}
