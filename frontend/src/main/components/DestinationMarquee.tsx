import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MapPin, Clock, Compass, Layers } from 'lucide-react'

// Rich, curated Indian circuits with real local imagery & route metadata
const circuits = [
  {
    id: 1,
    name: 'The Golden Triangle',
    targetCity: 'Agra',
    route: 'Delhi → Agra → Jaipur',
    duration: '5 Days',
    distance: '480 km',
    tag: 'Top Heritage',
    image: '/images/places/taj-mahal.jpg',
    highlights: 'Taj Mahal · Amber Fort · Qutub Minar',
    color: 'from-amber-600 to-rose-600',
    tagColor: 'bg-amber-100 text-amber-800',
  },
  {
    id: 2,
    name: 'Royal Rajputana Circuit',
    targetCity: 'Jaipur',
    route: 'Jaipur → Jodhpur → Udaipur',
    duration: '7 Days',
    distance: '620 km',
    tag: 'Forts & Havelis',
    image: '/images/places/amber-fort.jpg',
    highlights: 'Mehrangarh · City Palace · Lake Pichola',
    color: 'from-rose-600 to-crimson-700',
    tagColor: 'bg-rose-100 text-brand-red',
  },
  {
    id: 3,
    name: 'Sacred Ganges Trail',
    targetCity: 'Varanasi',
    route: 'Varanasi → Prayagraj → Ayodhya',
    duration: '4 Days',
    distance: '310 km',
    tag: 'Spiritual Heritage',
    image: '/images/places/dashashwamedh-ghat.jpg',
    highlights: 'Dashashwamedh Ghat · Kashi Vishwanath · Triveni',
    color: 'from-orange-600 to-amber-700',
    tagColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: 4,
    name: 'Kerala Serenity Backwaters',
    targetCity: 'Munnar',
    route: 'Kochi → Munnar → Alleppey',
    duration: '6 Days',
    distance: '380 km',
    tag: 'Backwaters & Tea',
    image: '/images/places/alleppey-houseboat.jpg',
    highlights: 'Vembanad Houseboats · Tea Estates · Kathakali',
    color: 'from-emerald-600 to-teal-700',
    tagColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 5,
    name: 'Vijayanagara Empire Trail',
    targetCity: 'Hampi',
    route: 'Hampi → Badami → Pattadakal',
    duration: '5 Days',
    distance: '350 km',
    tag: 'UNESCO Ruins',
    image: '/images/places/vittala-stone-chariot.jpg',
    highlights: 'Virupaksha Temple · Cave Temples · Stone Chariot',
    color: 'from-purple-600 to-indigo-700',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: 6,
    name: 'Ladakh High Himalayan Passes',
    targetCity: 'Ladakh',
    route: 'Leh → Nubra Valley → Pangong Tso',
    duration: '7 Days',
    distance: '540 km',
    tag: 'High Altitude',
    highlights: 'Khardung La · Thiksey Monastery · Pangong Lake',
    color: 'from-blue-600 to-cyan-700',
    tagColor: 'bg-blue-100 text-blue-800',
    image: '/images/places/pangong-tso.jpg',
  },
]

const circuitsRow2 = [
  {
    id: 7,
    name: 'Meghalaya Living Root & Waterfalls',
    targetCity: 'Shillong',
    route: 'Guwahati → Shillong → Cherrapunji',
    duration: '5 Days',
    distance: '290 km',
    tag: 'Eco Discovery',
    image: '/images/places/living-root-bridge.jpg',
    highlights: 'Nohkalikai Falls · Double Decker Root Bridge · Mawlynnong',
    color: 'from-teal-600 to-emerald-700',
    tagColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 8,
    name: 'Western Ghats Coffee & Mist',
    targetCity: 'Munnar',
    route: 'Munnar → Wayanad → Coorg',
    duration: '6 Days',
    distance: '420 km',
    tag: 'Plantations & Hills',
    image: '/images/places/munnar-tea-hills.jpg',
    highlights: 'Mullayanagiri Peak · Eravikulam · Spice Trails',
    color: 'from-green-600 to-lime-700',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: 9,
    name: 'Udaipur & Mewar Heritage',
    targetCity: 'Udaipur',
    route: 'Udaipur → Kumbhalgarh → Ranakpur',
    duration: '4 Days',
    distance: '240 km',
    tag: 'Lakes & Palaces',
    image: '/images/places/city-palace.jpg',
    highlights: 'City Palace Complex · Lake Pichola · Great Wall of India',
    color: 'from-amber-700 to-orange-800',
    tagColor: 'bg-amber-100 text-amber-800',
  },
  {
    id: 10,
    name: 'Goa Heritage & Coastal Forts',
    targetCity: 'Goa',
    route: 'Panaji → Old Goa → Aguada',
    duration: '5 Days',
    distance: '180 km',
    tag: 'Coast & Forts',
    image: '/images/places/aguada-fort.jpg',
    highlights: 'Aguada Fort · Basilica of Bom Jesus · Palolem Beach',
    color: 'from-cyan-600 to-blue-700',
    tagColor: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: 11,
    name: 'Himalayan Foothills & Ganga',
    targetCity: 'Rishikesh',
    route: 'Haridwar → Rishikesh → Dehradun',
    duration: '4 Days',
    distance: '160 km',
    tag: 'Yoga & River Heritage',
    image: '/images/places/laxman-jhula.jpg',
    highlights: 'Triveni Ghat · Laxman Jhula · Ram Jhula Aarti',
    color: 'from-rose-600 to-pink-700',
    tagColor: 'bg-rose-100 text-rose-800',
  },
]

export default function DestinationMarquee() {
  const navigate = useNavigate()

  const handleOpenCircuit = (targetCity: string, duration: string) => {
    navigate(`/destination?city=${encodeURIComponent(targetCity)}&duration=${encodeURIComponent(duration)}`)
  }

  return (
    <section className="py-20 bg-white border-y border-slate-200/80 overflow-hidden">
      
      {/* Section Header with Enterprise Breadcrumb & Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="section-tag-blue mb-2.5">
            <Compass size={13} />
            Seamless Regional Circuits
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Curated Inter-City Cultural Circuits
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
            Optimized multi-destination routes engineered with realistic drive times, ASI monument checkpoints, and heritage stays.
          </p>
        </div>

        <a
          href="#planner"
          className="btn-outline self-start md:self-auto text-xs gap-1.5 shrink-0"
        >
          <span>All Regional Circuits</span>
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Two Marquee Infinite Scroll Tracks */}
      <div className="flex flex-col gap-5">
        
        {/* Row 1 - Leftward */}
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] transition-all">
          {[...circuits, ...circuits].map((circuit, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenCircuit(circuit.targetCity, circuit.duration)}
              className="inline-flex items-center gap-4 mx-3 p-3.5 pr-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-card-hover text-slate-800 transition-all duration-300 cursor-pointer group/card w-[420px] shrink-0"
            >
              {/* Thumbnail Image with Gradient Scrim */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                <img
                  src={circuit.image}
                  alt={circuit.name}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/places/amber-fort.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                  {circuit.duration}
                </span>
              </div>

              {/* Circuit Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${circuit.tagColor}`}>
                    {circuit.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {circuit.distance}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover/card:text-brand-red transition-colors truncate">
                  {circuit.name}
                </h4>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-600 mt-1 truncate">
                  <MapPin size={12} className="text-brand-red shrink-0" />
                  <span className="truncate">{circuit.route}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  {circuit.highlights}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover/card:bg-rose-50 flex items-center justify-center text-slate-400 group-hover/card:text-brand-red shrink-0 transition-colors">
                <ArrowRight size={14} className="group-hover/card:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Rightward */}
        <div className="flex animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused] transition-all">
          {[...circuitsRow2, ...circuitsRow2].map((circuit, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenCircuit(circuit.targetCity, circuit.duration)}
              className="inline-flex items-center gap-4 mx-3 p-3.5 pr-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-card-hover text-slate-800 transition-all duration-300 cursor-pointer group/card w-[420px] shrink-0"
            >
              {/* Thumbnail Image with Gradient Scrim */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                <img
                  src={circuit.image}
                  alt={circuit.name}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/places/amber-fort.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                  {circuit.duration}
                </span>
              </div>

              {/* Circuit Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${circuit.tagColor}`}>
                    {circuit.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {circuit.distance}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover/card:text-brand-red transition-colors truncate">
                  {circuit.name}
                </h4>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-600 mt-1 truncate">
                  <MapPin size={12} className="text-brand-red shrink-0" />
                  <span className="truncate">{circuit.route}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  {circuit.highlights}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover/card:bg-rose-50 flex items-center justify-center text-slate-400 group-hover/card:text-brand-red shrink-0 transition-colors">
                <ArrowRight size={14} className="group-hover/card:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
