import { PageHeader } from "@/components/page-header";
import { Terminal, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Community | AI SEO Planner" };

export default function CommunityPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Join Us" title="Join the Community" description="Connect with 50,000+ marketers and developers building the future of SEO." />
      <div className="max-w-4xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-[#5865F2] rounded-3xl p-10 text-white flex flex-col items-center text-center shadow-xl shadow-[#5865F2]/20 hover:-translate-y-2 transition-all">
          <MessageSquare className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Discord Server</h2>
          <p className="text-white/80 mb-8">Chat with other users, share your workflows, and get direct support from our engineering team.</p>
          <Button className="w-full !bg-white !text-[#5865F2] hover:!bg-white/90">Join Discord</Button>
        </div>
        <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col items-center text-center shadow-xl hover:-translate-y-2 transition-all">
          <Terminal className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">GitHub</h2>
          <p className="text-slate-400 mb-8">Contribute to our open-source templates, report bugs, or star our repository to show your support.</p>
          <a href="https://github.com/djembaraa/ai-seo-planner" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full !bg-white !text-slate-900 hover:!bg-slate-200">View Repository</Button>
          </a>
        </div>
      </div>
    </main>
  );
}
