"use client";

import { useState, useEffect } from "react";
import { X, LayoutDashboard, Sparkles, Settings, LineChart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BetaWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Use useEffect to prevent hydration mismatch
  useEffect(() => {
    const dismissed = localStorage.getItem("beta_widget_dismissed");
    if (!dismissed) {
      // Automatically open after 2.5 seconds
      const timer = setTimeout(() => setIsOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMinimize = () => {
    setIsOpen(false);
    localStorage.setItem("beta_widget_dismissed", "true");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 w-[340px] sm:w-[380px] mb-4 relative"
          >
            <button
              onClick={handleMinimize}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Beta Notice</h3>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              We are currently running on a <strong>free AI plan</strong>. The dedicated User Dashboard and Pro features are under construction! 
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Coming Soon:</h4>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <LayoutDashboard className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Personalized User Dashboard &amp; History</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Premium AI Models (Huge Improvements!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Settings className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Advanced API settings &amp; Custom Prompts</span>
                </li>
                <li className="flex items-start gap-3">
                  <LineChart className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span>Save, export, and track your SEO clusters</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleMinimize}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              Got it, thanks!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-amber-accent hover:bg-amber-hover text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
          aria-label="Open Beta Notice"
        >
          <Info className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
