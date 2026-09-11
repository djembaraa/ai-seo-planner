import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingBanners } from "@/components/landing/landing-banners";
import { LandingCTA } from "@/components/landing/landing-cta";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Features",
  description: "Explore the powerful features of AI SEO Planner.",
};

export default function FeaturesPage() {
  return (
    <main className="pt-24 pb-0 bg-canvas min-h-screen">
      <PageHeader 
        badge="Everything You Need"
        title={<>Powerful SEO Features <br /><span className="text-slate-400">Powered by AI</span></>}
        description="Say goodbye to spreadsheets and manual SERP analysis. Our engine reverse-engineers Google's algorithm to give you exactly what you need to rank."
      />
      
      <LandingFeatures overlap={false} />
      <LandingHowItWorks />
      
      <div className="mt-12">
        <LandingBanners />
      </div>
      
      <LandingCTA />
    </main>
  );
}
