import { PageHeader } from "@/components/page-header";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";

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
            <a href="mailto:djembararafat98@gmail.com" className="text-slate-500 text-sm hover:text-amber-accent transition-colors">djembararafat98@gmail.com</a>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4"><MessageSquare className="text-emerald-500" /></div>
            <h3 className="font-bold text-slate-deep mb-2">WhatsApp</h3>
            <a href="https://wa.me/6285150701934" target="_blank" rel="noopener noreferrer" className="text-slate-500 text-sm hover:text-emerald-500 transition-colors">085150701934</a>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4"><MapPin className="text-blue-500" /></div>
            <h3 className="font-bold text-slate-deep mb-2">Office</h3>
            <p className="text-slate-500 text-sm">Banyumas, Jawa Tengah</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
