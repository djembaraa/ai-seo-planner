import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Privacy Policy | AI SEO Planner" };

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Legal" title="Privacy Policy" description="Last updated: September 11, 2026" />
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-deep mb-4 mt-2">1. Information We Collect</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">We collect information you provide directly to us when you create an account, subscribe to our newsletter, or use our platform. This includes your name, email address, and billing information.</p>
          <h2 className="text-2xl font-bold text-slate-deep mb-4 mt-8">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you about updates, security alerts, and promotional offers.</p>
          <h2 className="text-2xl font-bold text-slate-deep mb-4 mt-8">3. Data Processing via AI</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">When you input keywords into our engine, the data is processed via secure API integrations with Google Gemini. We do not use your proprietary search queries to train our own models without your explicit consent.</p>
          <h2 className="text-2xl font-bold text-slate-deep mb-4 mt-8">4. Contact Us</h2>
          <p className="text-slate-600 mb-4 leading-relaxed text-lg">If you have any questions about this Privacy Policy, please contact us at privacy@aiseoplanner.com.</p>
        </div>
      </div>
    </main>
  );
}
