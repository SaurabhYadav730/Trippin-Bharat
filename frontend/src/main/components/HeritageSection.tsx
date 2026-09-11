import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Landmark, Sparkles, ArrowRight, ShieldCheck, Clock, BookOpen, Layers } from 'lucide-react'

const heritageHighlights = [
  {
    id: 1,
    title: 'Amber Fort & Sheesh Mahal',
    targetCity: 'Jaipur',
    location: 'Amer, Jaipur, Rajasthan',
    period: '1592 CE (Raja Man Singh I)',
    style: 'Rajput-Mughal Fusion',
    image: '/images/places/amber-fort.jpg',
    tag: 'UNESCO World Heritage',
    desc: 'Perched on the rugged Aravalli ridge, featuring subterranean tunnels, intricate mirrored glass ceilings (Sheesh Mahal), and indigenous rainwater harvesting stepwells.',
    architecturalFeat: 'Passive natural cooling courtyards and water-circulated marble channels.',
    dynasty: 'Kachwaha Rajput Dynasty',
  },
  {
    id: 2,
    title: 'Virupaksha Temple & Vittala Complex',
    targetCity: 'Hampi',
    location: 'Hampi, Bellary, Karnataka',
    period: '7th Century CE (Expanded 1510 CE)',
    style: 'Vijayanagara Dravidian',
    image: '/images/places/vittala-stone-chariot.jpg',
    tag: 'UNESCO World Heritage',
    desc: 'Consecrated along the sacred Tungabhadra River, standing unbroken through centuries with a 50-meter tiered gopuram and musical stone pillars.',
    architecturalFeat: 'Pinhole camera effect projecting the inverted gopuram shadow inside the sanctum.',
    dynasty: 'Vijayanagara Empire',
  },
  {
    id: 3,
    title: 'Udaipur City Palace & Lake Pichola',
    targetCity: 'Udaipur',
    location: 'Udaipur, Rajasthan',
    period: '1559 CE (Maharana Udai Singh II)',
    style: 'Mewar Rajputana & European Infusion',
    image: '/images/places/city-palace.jpg',
    tag: 'Living Heritage Palace',
    desc: 'The largest palace complex in Rajasthan, built over four centuries using granite and marble with sweeping panoramic lake vistas from Zenana Mahal.',
    architecturalFeat: 'Cantilevered balconies (Jharokhas) engineered for natural ventilation and defensive vision.',
    dynasty: 'Sisodia Rajput Clan',
  },
]

export default function HeritageSection() {
  const navigate = useNavigate()

  const handleOpenHeritage = (targetCity: string) => {
    navigate(`/destination?city=${encodeURIComponent(targetCity)}`)
  }

  return (
    <section id="heritage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-tag-amber mb-2">
              <Landmark size={13} />
              Architectural & Cultural Heritage
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              India's Living Heritage & Architectural Wonders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Travel beyond superficial photo stops. Discover the engineering genius, historical timelines, and sacred geometry carved into India's greatest monuments.
            </p>
          </div>

          <a
            href="#planner"
            className="btn-outline self-start md:self-auto text-xs gap-1.5 shrink-0"
          >
            <span>Browse All ASI Sites</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* 3 Featured Heritage Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {heritageHighlights.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenHeritage(item.targetCity)}
              className="card-interactive overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Image Banner with Badges */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    ;(e.target as HTMLElement).style.opacity = '0.7'
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white shadow-sm">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    <Clock size={11} />
                    <span>{item.period.split('(')[0]}</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <div className="text-xs text-amber-300 font-bold mb-0.5">
                    {item.style}
                  </div>
                  <h3 className="font-display text-xl font-black leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Meta location & dynasty */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <span className="font-medium text-slate-700">{item.location}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                    {item.dynasty}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Architectural Marvel Insight Box */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                  <span className="font-bold text-amber-900 block mb-0.5">
                    ⚙️ Architectural Genius:
                  </span>
                  <span className="text-amber-800">
                    {item.architecturalFeat}
                  </span>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenHeritage(item.targetCity)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red group-hover:text-red-700 transition-colors"
                  >
                    <span>Explore History & Floor Plan</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Unique Feature: Journey Lens Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Sparkles size={13} />
                Signature Ecosystem Innovation
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                Journey Lens™ — Connect Place + Story + Stays + Route
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you tap any heritage monument, Journey Lens automatically stitches together its historical legend, adjacent artisan markets, verified local stays, and walking routes into a singular interactive canvas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href="#planner"
                className="btn-primary w-full sm:w-auto py-3.5 px-6 text-xs rounded-xl"
              >
                Experience Journey Lens
              </a>
              <button className="btn-outline bg-transparent border-slate-700 text-white hover:bg-white/10 hover:border-slate-500 w-full sm:w-auto py-3.5 px-6 text-xs rounded-xl">
                Watch Visual Demo
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
