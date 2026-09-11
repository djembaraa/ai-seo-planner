import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export const metadata = { title: "Blog | AI SEO Planner" };

const posts = [
  { title: "How Semantic Search Changed in 2026", cat: "SEO Strategy", date: "Sep 5" },
  { title: "The End of Keyword Density: What Matters Now", cat: "Content", date: "Aug 22" },
  { title: "Case Study: Scaling to 100k Traffic in 3 Months", cat: "Growth", date: "Aug 10" },
  { title: "Why Topic Clusters are the New Backlinks", cat: "SEO Strategy", date: "Jul 28" }
];

export default function BlogPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Our Blog" title="Latest Insights" description="Deep dives into AI, content marketing, and algorithm updates." />
      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <Link key={i} href="#" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-amber-accent font-bold text-sm tracking-wider uppercase">{post.cat}</span>
              <span className="text-slate-400 text-sm font-medium">{post.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-deep group-hover:text-amber-hover transition-colors">{post.title}</h2>
            <p className="text-slate-500 mt-4 leading-relaxed line-clamp-2">Learn the exact strategies and step-by-step methodologies we use to stay ahead of the continuous changes in Google&apos;s ranking algorithms.</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
