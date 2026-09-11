import { PageHeader } from "@/components/page-header";

export const metadata = { title: "About Us | AI SEO Planner" };

export default function AboutPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Our Story" title="We are on a mission to automate SEO." description="AI SEO Planner was built to eliminate the tedious spreadsheet work of keyword research and let marketers focus on writing great content." />
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-deep mb-4">The Problem</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">Traditional SEO research takes days. You have to export thousands of keywords, manually group them into clusters, analyze the search intent of the top 10 results, and finally build an outline. It&apos;s exhausting.</p>
          <h2 className="text-2xl font-bold text-slate-deep mb-4">Our Solution</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">We leverage advanced AI models to do all of that in exactly 15 seconds. By understanding the true semantic relationship between queries and the underlying intent Google is rewarding, we generate pixel-perfect content strategies instantly.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center border-t border-slate-100 pt-12">
            <div><div className="text-4xl font-extrabold text-amber-accent mb-2">1M+</div><div className="text-slate-500 font-medium">Keywords Analyzed</div></div>
            <div><div className="text-4xl font-extrabold text-amber-accent mb-2">50k+</div><div className="text-slate-500 font-medium">Active Users</div></div>
            <div><div className="text-4xl font-extrabold text-amber-accent mb-2">99%</div><div className="text-slate-500 font-medium">Uptime</div></div>
            <div><div className="text-4xl font-extrabold text-amber-accent mb-2">2026</div><div className="text-slate-500 font-medium">Founded</div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
