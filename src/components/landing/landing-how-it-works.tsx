"use client";

import { motion } from "framer-motion";
import { Search, Brain, FileOutput, ArrowUpRight } from "lucide-react";

const steps = [
  {
    title: "Enter Keyword",
    description: "Input your primary target keyword or topic.",
    icon: Search,
  },
  {
    title: "AI Analyzes SERP",
    description: "Our AI engine analyzes the top-ranking pages.",
    icon: Brain,
  },
  {
    title: "Review Strategy",
    description: "Get a comprehensive, ready-to-use content plan.",
    icon: FileOutput,
  },
  {
    title: "Write & Rank",
    description: "Follow the plan to create content that dominates.",
    icon: ArrowUpRight,
  },
];

export function LandingHowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-amber-accent font-bold uppercase tracking-widest text-sm mb-2 block">Workflow</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-deep">
            How does it work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-slate-200 border-dashed" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center group"
              >
                <div className="w-24 h-24 bg-surface shadow-lg border border-slate-100 rounded-3xl flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-all duration-300">
                  <Icon className="w-10 h-10 text-amber-accent group-hover:scale-110 transition-transform" />
                  <div className="absolute -bottom-4 bg-slate-deep text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-deep mb-2 mt-2">{step.title}</h3>
                <p className="text-sm text-ink-secondary max-w-[220px]">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
