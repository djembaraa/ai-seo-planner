"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DownloadCloud, Sparkles, Bot, SearchCheck } from "lucide-react";

export function LandingBanners() {
  return (
    <>
      {/* Banner 1: Export & Integration - Full width light section */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-light/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-light/50 text-amber-hover text-xs font-bold uppercase tracking-wider"
            >
              <DownloadCloud className="w-4 h-4" /> Export Anywhere
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-deep leading-[1.1]"
            >
              Take your SEO plan <br className="hidden md:block" />
              <span className="text-amber-accent">to your workspace</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-ink-secondary text-lg md:text-xl max-w-lg leading-relaxed"
            >
              Seamlessly export your AI-generated content structures, keyword clusters, and meta data to Notion, Google Docs, or Markdown in a single click.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 bg-slate-deep hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Export to Notion
              </Link>
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-deep px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1"
              >
                Copy Markdown
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg relative"
          >
            <div className="aspect-[4/3] bg-slate-50 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 flex items-center justify-center relative overflow-hidden">
               {/* Abstract document visual */}
               <div className="w-3/4 h-[85%] bg-slate-deep rounded-t-2xl shadow-2xl p-8 flex flex-col gap-6 transform translate-y-8">
                  <div className="w-1/2 h-5 bg-white/10 rounded-lg" />
                  <div className="w-full h-3 bg-white/5 rounded-full" />
                  <div className="w-5/6 h-3 bg-white/5 rounded-full" />
                  <div className="w-full h-3 bg-white/5 rounded-full" />
                  
                  <div className="w-1/3 h-5 bg-white/10 rounded-lg mt-8" />
                  <div className="w-full h-24 bg-white/5 rounded-xl" />
               </div>
               
               <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute right-8 top-1/3 bg-amber-accent text-white p-4 rounded-2xl shadow-xl rotate-6"
               >
                 <Sparkles className="w-8 h-8" />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banner 2: Deep Dive 1 - Full width dark section */}
      <section className="py-24 bg-slate-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid opacity-20" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-accent/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24 relative z-10">
          <div className="flex-1 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1]"
            >
              Dominate your niche with <br />
              <span className="text-amber-accent">AI-driven clusters</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed"
            >
              Don't just target one keyword. Our engine builds a complete semantic cluster around your topic, establishing topical authority in hours instead of months.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                href="/"
                className="bg-amber-accent hover:bg-amber-hover text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-amber-accent/20 hover:-translate-y-1 inline-block"
              >
                Generate Cluster
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="aspect-[4/3] bg-slate-800/50 rounded-3xl border border-white/5 flex items-center justify-center p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Bot className="w-32 h-32 text-slate-600 group-hover:text-amber-accent/50 transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banner 3: Deep Dive 2 - Full width off-white section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <div className="flex-1 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-slate-deep leading-[1.1]"
            >
              Stop guessing intent.<br />
              <span className="text-amber-accent">Let AI map it for you.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ink-secondary text-lg md:text-xl max-w-lg leading-relaxed"
            >
              We analyze the top-ranking pages to tell you exactly what Google wants to see. Informational, commercial, or transactional — get it right the first time.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                href="/"
                className="bg-slate-deep hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 inline-block"
              >
                Analyze Intent
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="aspect-[4/3] bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-center p-8 relative overflow-hidden group">
              <div className="w-48 h-48 rounded-full bg-amber-light/30 absolute group-hover:scale-150 transition-transform duration-700 ease-out" />
              <SearchCheck className="w-32 h-32 text-amber-accent relative z-10" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
