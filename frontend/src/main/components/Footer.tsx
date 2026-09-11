import { MapPin, Globe, ShieldCheck, Mail } from 'lucide-react'

const footerCircuits = [
  { label: 'Golden Triangle (Delhi · Agra · Jaipur)', href: '#destinations' },
  { label: 'Royal Rajasthan (Udaipur · Jodhpur)', href: '#destinations' },
  { label: 'Sacred Ghats (Varanasi · Ayodhya)', href: '#destinations' },
  { label: 'Kerala Backwaters & Munnar', href: '#destinations' },
]

const footerHeritage = [
  { label: 'UNESCO World Heritage Sites', href: '#heritage' },
  { label: 'Hill Forts of Rajasthan', href: '#heritage' },
  { label: 'Dravidian Temple Architecture', href: '#heritage' },
  { label: 'Historic Stepwells & Baolis', href: '#heritage' },
]

const footerEcosystem = [
  { label: 'Smart Itinerary Architect', href: '#planner' },
  { label: 'Contextual Heritage Stays', href: '#destinations' },
  { label: 'Authentic Regional Food Trails', href: '#destinations' },
  { label: 'ASI Monument Pass & Timings', href: '#heritage' },
]

const footerTrust = [
  { label: 'About Trippin\' Bharat', href: '#' },
  { label: 'National Tourism Standards', href: '#' },
  { label: 'ASI Verification Records', href: '#' },
  { label: 'Traveler Safety Guidelines', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-7 border-b border-slate-800/80">

          {/* Brand & Mission (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <a href="/" className="inline-flex items-center gap-2.5 group">
              <img
                src="/logo.jpg"
                alt="Trippin' Bharat"
                className="w-9 h-9 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/20"
              />
              <div>
                <div className="font-black text-xl tracking-tight text-white leading-none">Trippin' Bharat</div>
                <div className="text-[8px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Discover India</div>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's intelligent travel ecosystem for discovering heritage, cultural circuits, and curated journeys.
            </p>

            {/* Compact Badges */}
            <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-slate-400 pt-0.5">
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} className="text-rose-500 shrink-0" /> New Delhi, India
              </span>
              <span className="inline-flex items-center gap-1">
                <Globe size={12} className="text-sky-500 shrink-0" /> 28 States & 8 UTs
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500 shrink-0" /> ASI Verified
              </span>
            </div>

            {/* Social Icons */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="mailto:contact@trippinbharat.com"
                aria-label="Contact Email"
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
              >
                <Mail size={13} />
              </a>
            </div>
          </div>

          {/* Links Columns (8 cols on lg: 4 columns of 2) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white mb-2.5">
                Iconic Circuits
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                {footerCircuits.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors block leading-tight">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white mb-2.5">
                Living Heritage
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                {footerHeritage.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors block leading-tight">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white mb-2.5">
                Travel Tools
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                {footerEcosystem.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors block leading-tight">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white mb-2.5">
                Trust & Standards
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                {footerTrust.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors block leading-tight">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} Trippin' Bharat. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Charter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
