import { LandingTemplates } from "@/components/landing/landing-templates";
import { LandingCTA } from "@/components/landing/landing-cta";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "Templates",
  description: "AI-generated output formats.",
};

export default function TemplatesPage() {
  return (
    <main className="pt-24 pb-0 bg-canvas min-h-screen">
      <PageHeader 
        badge="AI Formats"
        title="Output Formats"
        description="From Pillar Pages to Developer Guides, our engine automatically structures the output based on the precise search intent of your target keyword."
      />
      <LandingTemplates />
      <LandingCTA />
    </main>
  );
}
