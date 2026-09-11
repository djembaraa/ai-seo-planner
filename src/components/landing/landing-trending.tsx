"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, LineChart, PieChart, Activity, TrendingUp } from "lucide-react";

interface LandingTrendingProps {
  onSelectKeyword: (keyword: string) => void;
}

const trendingItems = [
  { keyword: "B2B SaaS Marketing", icon: BarChart3, volume: "High", difficulty: "Hard" },
  { keyword: "Local Plumber SEO", icon: Activity, volume: "Medium", difficulty: "Medium" },
  { keyword: "Ecommerce Content Strategy", icon: PieChart, volume: "High", difficulty: "Hard" },
  { keyword: "Fitness Blog Ideas", icon: LineChart, volume: "Very High", difficulty: "Medium" },
  { keyword: "Real Estate Lead Gen", icon: TrendingUp, volume: "Medium", difficulty: "Hard" },
];

export function LandingTrending({ onSelectKeyword }: LandingTrendingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-deep">
            Trending Niches
          </h2>
          <p className="mt-2 text-ink-secondary">Click on any niche to generate a live content plan.</p>
        </motion.div>
        
        <div className="hidden sm:flex gap-3">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-surface border border-slate-200 flex items-center justify-center text-ink-secondary hover:bg-slate-50 hover:text-slate-deep transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-amber-accent flex items-center justify-center text-white hover:bg-amber-hover transition-colors shadow-lg shadow-amber-accent/30"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x hide-scrollbar"
      >
        {trendingItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.keyword}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onSelectKeyword(item.keyword);
              }}
              className="min-w-[280px] sm:min-w-[340px] bg-slate-deep rounded-3xl p-8 cursor-pointer group hover:shadow-2xl hover:shadow-slate-deep/20 transition-all snap-start relative overflow-hidden flex flex-col"
            >
              {/* Decorative corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-amber-accent/10 transition-colors" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-12 group-hover:bg-amber-accent/20 transition-colors">
                <Icon className="w-8 h-8 text-amber-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-amber-accent transition-colors">{item.keyword}</h3>
              <div className="flex items-center gap-4 text-sm font-medium mt-auto">
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {item.volume} Vol
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {item.difficulty} Diff
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
