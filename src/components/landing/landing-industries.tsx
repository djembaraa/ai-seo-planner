"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Briefcase, Building2, Megaphone, MonitorPlay, Newspaper } from "lucide-react";

const industries = [
  { name: "Ecommerce", icon: ShoppingCart },
  { name: "SaaS", icon: MonitorPlay },
  { name: "Local Biz", icon: Building2 },
  { name: "Agencies", icon: Megaphone },
  { name: "Publishers", icon: Newspaper },
  { name: "B2B", icon: Briefcase },
];

export function LandingIndustries() {
  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-deep"
          >
            Built for your industry
          </motion.h2>
          {/* Removed the 'View all' and arrows as requested */}
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between gap-10 sm:gap-6">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-5 group cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-deep flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(217,119,6,0.3)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 group-hover:text-amber-accent transition-colors relative z-10" />
                </div>
                <span className="text-sm font-bold text-slate-deep group-hover:text-amber-accent transition-colors uppercase tracking-wider">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
