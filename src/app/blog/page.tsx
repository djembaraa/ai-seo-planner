import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog | AI SEO Planner",
};

export default function Page() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-canvas">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-amber-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-deep mb-6">
          Blog
        </h1>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">??</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-deep mb-3">Page Under Construction</h2>
          <p className="text-ink-secondary max-w-md mx-auto leading-relaxed">
            We are currently building this page. The Blog content will be available here soon. 
            Check back later or subscribe to our newsletter for updates!
          </p>
        </div>
      </div>
    </main>
  );
}
