import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, PhoneCall, Compass, CheckCircle2 } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-red via-crimson-600 to-rose-700 text-white p-8 sm:p-14 shadow-2xl overflow-hidden">
          
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 mb-6 backdrop-blur-sm">
              <Sparkles size={13} />
              Start Your Indian Expedition Today
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Every Story of India Deserves to be Experienced.
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
              Join over 1.2 million travelers planning authentic, culturally rich, and budget-optimized journeys with Trippin' Bharat's intelligent companion platform.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#planner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white text-brand-red shadow-lg hover:bg-slate-50 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Compass size={18} />
                Generate Custom Itinerary (Free)
              </a>

              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-slate-900/40 text-white hover:bg-slate-900/60 border border-white/20 backdrop-blur-sm transition-all"
              >
                <span>Browse Destinations</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                Zero Booking Fees
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                Verified Heritage Timings
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                24x7 Traveler Support
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                Offline-Friendly Guides
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
