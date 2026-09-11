import { PageHeader } from "@/components/page-header";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact Us | AI SEO Planner" };

export default function ContactPage() {
  return (
    <main className="pt-24 pb-24 bg-canvas min-h-screen">
      <PageHeader badge="Get in Touch" title="Contact our team" description="Have questions about our API, pricing, or need technical support? We're here to help." />
      <div className="max-w-5xl mx-auto px-4 mt-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-accent/10 rounded-full flex items-center justify-center mb-4"><Mail className="text-amber-accent" /></div>
            <h3 className="font-bold text-slate-deep mb-2">Email Us</h3>
            <p className="text-slate-500 text-sm">support@aiseoplanner.com</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4"><MessageSquare className="text-emerald-500" /></div>
            <h3 className="font-bold text-slate-deep mb-2">Live Chat</h3>
            <p className="text-slate-500 text-sm">Available Mon-Fri, 9am-5pm EST</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4"><MapPin className="text-blue-500" /></div>
            <h3 className="font-bold text-slate-deep mb-2">Office</h3>
            <p className="text-slate-500 text-sm">123 AI Boulevard, Tech District</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div><label className="block text-sm font-bold text-slate-700 mb-2">First Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50" /></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50" /></div>
            </div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label><input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Message</label><textarea rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50"></textarea></div>
            <Button type="button" className="w-full" size="lg">Send Message</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
