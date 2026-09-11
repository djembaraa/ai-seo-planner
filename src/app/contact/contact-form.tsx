"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [state, handleSubmit] = useForm("xnpqrndb");

  if (state.succeeded) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600">Thanks for reaching out. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50"
          />
          <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50"
          />
          <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-accent/50"
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <Button type="submit" disabled={state.submitting} className="w-full" size="lg">
        {state.submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
