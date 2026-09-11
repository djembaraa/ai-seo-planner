"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="py-24 sm:py-32 bg-amber-accent relative overflow-hidden">
      {/* Background decorative patterns */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:24px_24px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
            Are you ready to rank higher <br className="hidden md:block" />
            with the best SEO data?
          </h2>
          <p className="text-slate-800 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours on manual keyword research. Generate your first comprehensive content strategy in seconds.
          </p>
          <Link 
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-12 py-5 rounded-2xl transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            Generate Plan Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
