import { motion } from 'framer-motion'
import { Landmark, Compass, Building2, Users, Award, ShieldCheck, Map } from 'lucide-react'

const statsData = [
  {
    icon: Map,
    metric: '36',
    unit: 'States & UTs',
    title: 'Nationwide Discovery',
    desc: 'Deep coverage across every Indian state, region, and district',
    color: 'text-brand-red',
    bg: 'bg-rose-50',
  },
  {
    icon: Landmark,
    metric: '40,000+',
    unit: 'Monuments',
    title: 'Living Heritage Records',
    desc: 'Forts, ancient temples, stepwells & UNESCO protected sites',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Building2,
    metric: '25,000+',
    unit: 'Properties',
    title: 'Contextual Stays',
    desc: 'Havelis, eco-resorts & verified homestays linked to your routes',
    color: 'text-brand-blue',
    bg: 'bg-blue-50',
  },
  {
    icon: Users,
    metric: '1.2M+',
    unit: 'Travelers',
    title: 'Journeys Crafted',
    desc: 'Personalized day-by-day itineraries mapped with live budgets',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

export default function StatsBar() {
  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 hover:bg-white hover:shadow-card transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {stat.metric}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {stat.unit}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mt-0.5">{stat.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
