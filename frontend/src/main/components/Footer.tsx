import { Compass, MapPin, Globe, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react'

const footerCircuits = [
  { label: 'Golden Triangle (Delhi · Agra · Jaipur)', href: '#destinations' },
  { label: 'Royal Rajasthan (Udaipur · Jodhpur · Jaisalmer)', href: '#destinations' },
  { label: 'Sacred Ghats & Ayodhya (Varanasi · Prayagraj)', href: '#destinations' },
  { label: 'Kerala Backwaters & Tea Trails (Munnar · Alleppey)', href: '#destinations' },
  { label: 'Vijayanagara Heritage (Hampi · Badami · Pattadakal)', href: '#destinations' },
  { label: 'Himalayan High Passes (Leh · Ladakh · Spiti)', href: '#destinations' },
]

const footerHeritage = [
  { label: 'UNESCO World Heritage Monuments', href: '#heritage' },
  { label: 'Ancient Hill Forts of Rajasthan', href: '#heritage' },
  { label: 'Dravidian Temple Architecture', href: '#heritage' },
  { label: 'Historic Stepwells & Baolis', href: '#heritage' },
  { label: 'Mughal Architecture & Mausoleums', href: '#heritage' },
  { label: 'Living Root Bridges of Meghalaya', href: '#heritage' },
]

const footerEcosystem = [
  { label: 'Smart Itinerary Architect', href: '#planner' },
  { label: 'Contextual Stays & Heritage Havelis', href: '#destinations' },
  { label: 'Authentic Regional Culinary Guides', href: '#destinations' },
  { label: 'ASI Monument Pass & Timings', href: '#heritage' },
  { label: 'Curated Audio & Local Guides', href: '#destinations' },
  { label: 'Dynamic Journey Cost Estimator', href: '#planner' },
]

const footerTrust = [
  { label: 'About the Yātra Ecosystem', href: '#' },
  { label: 'National Tourism Standards', href: '#' },
  { label: 'Responsible Tourism Charter', href: '#' },
  { label: 'Data Verification & ASI Records', href: '#' },
  { label: 'Traveler Safety Guidelines', href: '#' },
  { label: 'Tourism Partner Network', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0E1A] text-slate-400 text-sm border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Brand & Mission (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-900/30 group-hover:scale-105 transition-transform duration-200">
                <Compass size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-2xl tracking-tight text-white leading-none">Yātra</div>
                <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Discover India</div>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              India's premier intelligent travel and heritage discovery platform. Connecting cultural circuits, authentic architecture guides, contextual stays, and seamless journeys.
            </p>

            {/* Badges */}
            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-rose-500 shrink-0" />
                <span>Headquartered in New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-sky-500 shrink-0" />
                <span>Covering all 28 States & 8 Union Territories</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                <span>Verified Archaeological & Cultural Records</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Contact / Mail */}
              <a
                href="mailto:contact@yatra.travel"
                aria-label="Contact Email"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 flex items-center justify-center transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns (8 cols on lg: 4 columns of 2) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Iconic Circuits */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                Iconic Circuits
              </h4>
              <ul className="space-y-2.5 text-xs">
                {footerCircuits.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-150 block leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Living Heritage */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                Living Heritage
              </h4>
              <ul className="space-y-2.5 text-xs">
                {footerHeritage.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-150 block leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Ecosystem */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                Travel Tools
              </h4>
              <ul className="space-y-2.5 text-xs">
                {footerEcosystem.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-150 block leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust & Standards */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                Trust & Standards
              </h4>
              <ul className="space-y-2.5 text-xs">
                {footerTrust.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-150 block leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Yātra Digital Tourism Ecosystem. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security & Trust</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Responsible Tourism Charter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
