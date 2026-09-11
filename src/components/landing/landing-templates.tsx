"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutTemplate, FileType, AlignLeft, Layers, PenTool, Hash, FileCode2, Globe } from "lucide-react";

const templates = [
  { name: "Pillar Page Strategy", icon: Layers, rating: "4.9", uses: "12k+", query: "SEO Pillar Page Strategy" },
  { name: "Blog Post Outline", icon: AlignLeft, rating: "4.8", uses: "45k+", query: "How to start a blog" },
  { name: "Service Page Setup", icon: Globe, rating: "4.7", uses: "8k+", query: "Local Plumber Services" },
  { name: "Ecommerce Category", icon: LayoutTemplate, rating: "4.9", uses: "15k+", query: "Best Running Shoes" },
  { name: "Local Landing Page", icon: FileType, rating: "4.6", uses: "5k+", query: "Roofing repair in Austin" },
  { name: "Listicle Format", icon: Hash, rating: "4.8", uses: "22k+", query: "Top 10 CRM Software" },
  { name: "Product Review", icon: PenTool, rating: "4.7", uses: "18k+", query: "iPhone 15 Pro Review" },
  { name: "Developer Guide", icon: FileCode2, rating: "4.9", uses: "4k+", query: "React useActionState tutorial" },
];

export function LandingTemplates() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-slate-deep mb-4"
        >
          AI-Generated Formats
        </motion.h2>
        <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
          Select a template below to see how our engine automatically structures the output based on the precise search intent.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <Link key={template.name} href={`/?q=${encodeURIComponent(template.query)}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                className="bg-slate-deep rounded-3xl p-5 group hover:shadow-2xl hover:shadow-amber-accent/20 hover:-translate-y-2 transition-all cursor-pointer h-full"
              >
                <div className="h-40 rounded-2xl bg-white/5 flex items-center justify-center mb-5 relative overflow-hidden group-hover:bg-amber-accent/10 transition-colors">
                  <Icon className="w-16 h-16 text-slate-400 group-hover:text-amber-accent group-hover:scale-110 transition-all duration-300" />
                  
                  {/* Badges mimicking the food UI */}
                  <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span className="text-amber-accent text-sm">★</span> {template.rating}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-accent text-slate-900 text-[11px] font-bold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Try Template
                  </div>
                </div>
                
                <h3 className="font-bold text-white mb-3 text-lg px-2 group-hover:text-amber-accent transition-colors">{template.name}</h3>
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2 pb-2">
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">Auto Detected</span>
                  <span>{template.uses} generated</span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-16 text-center">
        <Link 
          href="/"
          className="inline-block bg-surface hover:bg-slate-50 text-slate-deep font-bold py-4 px-10 rounded-2xl transition-all border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          Create Custom Format
        </Link>
      </div>
    </section>
  );
}
