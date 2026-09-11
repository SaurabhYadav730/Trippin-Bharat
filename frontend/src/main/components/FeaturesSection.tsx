import { motion } from 'framer-motion'
import { 
  Compass, 
  Map, 
  Landmark, 
  Building2, 
  UtensilsCrossed, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Clock,
  Layers,
  HeartHandshake
} from 'lucide-react'

const ecosystemFeatures = [
  {
    icon: Compass,
    title: '360° Destination Intelligence',
    tag: 'Discover',
    desc: 'Deep cultural context, historical significance, architectural styles, opening hours, connectivity, and best visiting seasons for every destination.',
    color: 'text-brand-red',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: Map,
    title: 'Smart Itinerary Architect',
    tag: 'Plan',
    desc: 'Generate optimized day-by-day itineraries tailored to your duration, budget, travel style, and group preferences with realistic travel times.',
    color: 'text-brand-blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Landmark,
    title: 'Living Heritage & Architecture',
    tag: 'Heritage',
    desc: 'Explore ancient temples, forts, stepwells, and UNESCO monuments with architectural breakdowns, dynasties, and verified historical timelines.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Building2,
    title: 'Contextual Stays & Havelis',
    tag: 'Stay',
    desc: 'Discover verified heritage hotels, boutique homestays, and eco-resorts strategically located along your daily sightseeing routes.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: UtensilsCrossed,
    title: 'Authentic Culinary Trails',
    tag: 'Taste',
    desc: 'Discover authentic regional cuisine, iconic street food joints, and traditional thalis with dietary filters and hygiene-verified ratings.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible & Accessible Travel',
    tag: 'Trust',
    desc: 'Real-time crowd trends, verified wheelchair accessibility, emergency help contacts, and ethical local artisan recommendations.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-tag-blue mb-3">
            <Layers size={13} />
            Unified Tourism Ecosystem
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Everything You Need to Experience the True Soul of India
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Unlike fragmented booking engines or static travel blogs, Trippin' Bharat interconnects discovery, planning, verified stays, heritage stories, and local experiences into one intelligent companion.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemFeatures.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-interactive p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${feat.bg} ${feat.color} flex items-center justify-center shadow-xs border ${feat.border} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Production Ready</span>
                  <a
                    href="#planner"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-red group-hover:underline"
                  >
                    Learn More
                    <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
