"use client";

import { motion } from "framer-motion";
import { Zap, Target, FileSpreadsheet, Key } from "lucide-react";

const features = [
  {
    title: "Keyword Clustering",
    description: "Group thousands of keywords semantically in seconds.",
    icon: Key,
    badge: "10x Faster",
  },
  {
    title: "Intent Analysis",
    description: "Map exactly what users want to see for every search.",
    icon: Target,
    badge: "Accurate",
  },
  {
    title: "Automated Outlines",
    description: "Generate comprehensive, data-backed article structures.",
    icon: FileSpreadsheet,
    badge: "Auto",
  },
  {
    title: "Meta Generation",
    description: "Create compelling titles and descriptions optimized for CTR.",
    icon: Zap,
    badge: "SEO Ready",
  },
];

export function LandingFeatures({ overlap = false }: { overlap?: boolean }) {
  return (
    <section className={`py-20 px-4 sm:px-6 max-w-7xl mx-auto relative ${overlap ? '-mt-16 sm:-mt-24 z-20' : ''}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-light/30 flex items-center justify-center text-amber-accent mb-6 group-hover:scale-110 group-hover:bg-amber-accent group-hover:text-white transition-all duration-300">
                <Icon className="w-8 h-8" />
              </div>
              <span className="inline-block px-3 py-1 bg-slate-100 text-ink-secondary text-xs font-bold rounded-full mb-4">
                {feature.badge}
              </span>
              <h3 className="text-xl font-bold text-ink mb-3">{feature.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
