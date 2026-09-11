import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, ArrowRight, Sparkles, Heart } from 'lucide-react'

// Categories for filtering
const categories = [
  'All Highlights',
  'Royal Heritage',
  'Spiritual & Ghats',
  'Backwaters & Coast',
  'Himalayan & Hills',
  'Ancient Ruins'
]

// Detailed destination cards with verified authentic local photography
const destinationCards = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    targetCity: 'Jaipur',
    state: 'Rajasthan',
    category: 'Royal Heritage',
    tag: 'Trending This Month',
    rating: '4.9',
    reviews: '14,280',
    image: '/images/places/amber-fort.jpg',
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Pyaaz Kachori Trail'],
    bestTime: 'Oct – Mar',
    attractionsCount: '24+ Monuments',
    estBudget: '₹2,500',
    duration: '3–5 Days',
    style: 'Royal Forts & Palaces',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    targetCity: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Spiritual & Ghats',
    tag: 'Sacred Heritage',
    rating: '4.9',
    reviews: '18,450',
    image: '/images/places/dashashwamedh-ghat.jpg',
    highlights: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Sarnath', 'Morning Boat Aarti'],
    bestTime: 'Oct – Mar',
    attractionsCount: '84+ Ghats & Temples',
    estBudget: '₹1,800',
    duration: '2–3 Days',
    style: 'Sacred Ghats & Ganga Aarti',
  },
  {
    id: 'hampi',
    name: 'Hampi',
    targetCity: 'Hampi',
    state: 'Karnataka',
    category: 'Ancient Ruins',
    tag: 'UNESCO World Heritage',
    rating: '4.9',
    reviews: '9,820',
    image: '/images/places/vittala-stone-chariot.jpg',
    highlights: ['Virupaksha Temple', 'Stone Chariot', 'Matanga Hill Sunrise', 'Tungabhadra River'],
    bestTime: 'Nov – Feb',
    attractionsCount: '500+ Ancient Monuments',
    estBudget: '₹2,200',
    duration: '3–4 Days',
    style: 'UNESCO Monoliths & Stone Chariot',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    targetCity: 'Udaipur',
    state: 'Rajasthan',
    category: 'Royal Heritage',
    tag: 'City of Lakes',
    rating: '4.8',
    reviews: '12,190',
    image: '/images/places/city-palace.jpg',
    highlights: ['City Palace Complex', 'Lake Pichola', 'Jag Mandir', 'Saheliyon-ki-Bari'],
    bestTime: 'Sep – Mar',
    attractionsCount: '16+ Royal Sites',
    estBudget: '₹3,200',
    duration: '3–5 Days',
    style: 'Lake Pichola & Island Palaces',
  },
  {
    id: 'kerala',
    name: 'Alleppey & Munnar',
    targetCity: 'Munnar',
    state: 'Kerala',
    category: 'Backwaters & Coast',
    tag: "God's Own Country",
    rating: '4.9',
    reviews: '22,400',
    image: '/images/places/alleppey-houseboat.jpg',
    highlights: ['Vembanad Backwaters', 'Tea Plantations', 'Kathakali Centers', 'Spice Gardens'],
    bestTime: 'Sep – Mar',
    attractionsCount: '30+ Experiences',
    estBudget: '₹3,500',
    duration: '4–5 Days',
    style: 'Backwater Houseboat Cruises',
  },
  {
    id: 'ladakh',
    name: 'Leh & Nubra Valley',
    targetCity: 'Ladakh',
    state: 'Ladakh',
    category: 'Himalayan & Hills',
    tag: 'High Altitude Passes',
    rating: '4.9',
    reviews: '11,300',
    image: '/images/places/pangong-tso.jpg',
    highlights: ['Pangong Tso', 'Thiksey Monastery', 'Khardung La Pass', 'Hunder Sand Dunes'],
    bestTime: 'May – Sep',
    attractionsCount: '20+ Monasteries & Passes',
    estBudget: '₹4,500',
    duration: '5–7 Days',
    style: 'High Mountain Passes & Nubra Dunes',
  },
  {
    id: 'agra',
    name: 'Agra',
    targetCity: 'Agra',
    state: 'Uttar Pradesh',
    category: 'Royal Heritage',
    tag: 'Mughal Wonder',
    rating: '4.9',
    reviews: '26,700',
    image: '/images/places/taj-mahal.jpg',
    highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
    bestTime: 'Oct – Mar',
    attractionsCount: '12+ Monuments',
    estBudget: '₹2,100',
    duration: '2–3 Days',
    style: 'Taj Mahal & Mughal Marvels',
  },
  {
    id: 'shillong',
    name: 'Shillong',
    targetCity: 'Shillong',
    state: 'Meghalaya',
    category: 'Himalayan & Hills',
    tag: 'Living Heritage',
    rating: '4.8',
    reviews: '8,400',
    image: '/images/places/living-root-bridge.jpg',
    highlights: ['Living Root Bridges', 'Nohkalikai Falls', 'Umiam Lake', 'Mawlynnong'],
    bestTime: 'Sep – May',
    attractionsCount: '15+ Natural Wonders',
    estBudget: '₹2,800',
    duration: '4–5 Days',
    style: 'Living Root Bridges & Waterfalls',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    targetCity: 'Rishikesh',
    state: 'Uttarakhand',
    category: 'Spiritual & Ghats',
    tag: 'Yoga & River Heritage',
    rating: '4.9',
    reviews: '15,600',
    image: '/images/places/laxman-jhula.jpg',
    highlights: ['Triveni Ghat Aarti', 'Laxman Jhula', 'Beatles Ashram', 'Ganga Rafting'],
    bestTime: 'Sep – Apr',
    attractionsCount: '18+ Ashrams & Ghats',
    estBudget: '₹1,900',
    duration: '3–4 Days',
    style: 'Sacred Ganga & Ashram Trails',
  },
]

export default function FeaturedDestinations() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All Highlights')
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleOpenDestination = (dest: typeof destinationCards[0]) => {
    const city = dest.targetCity || dest.name
    const duration = dest.duration || '3–5 Days'
    const style = dest.style || ''
    navigate(`/destination?city=${encodeURIComponent(city)}&duration=${encodeURIComponent(duration)}&style=${encodeURIComponent(style)}`)
  }

  const filtered = selectedCategory === 'All Highlights'
    ? destinationCards
    : destinationCards.filter(d => d.category === selectedCategory)

  return (
    <section id="destinations" className="relative pb-14 sm:pb-18 bg-[#F8FAFC]">
      {/* ── Seamless blend transition after the Hero screen ── */}
      <div className="w-full h-24 sm:h-36 bg-gradient-to-b from-slate-950 via-slate-900/35 to-[#F8FAFC] pointer-events-none mb-6 sm:mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="section-tag mb-2">
              <Sparkles size={13} />
              Nationwide Directory
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Top Trending Destinations in India
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Discover comprehensive destination intelligence — historical context, verified entry timings, nearby stays, local cuisine, and suggested itineraries.
            </p>
          </div>

          <a
            href="#planner"
            className="btn-outline self-start md:self-auto text-xs gap-1.5 shrink-0"
          >
            <span>Explore All 36 States</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenDestination(dest)}
              className="card-interactive overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.state}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    ;(e.target as HTMLElement).style.opacity = '0.7'
                  }}
                />
                
                {/* Gradient scrim for top badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                    {dest.tag}
                  </span>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(dest.id)
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition-transform active:scale-90"
                    aria-label="Save to favorites"
                  >
                    <Heart 
                      size={16} 
                      className={favorites[dest.id] ? 'fill-brand-red text-brand-red' : 'text-slate-600'} 
                    />
                  </button>
                </div>

                {/* Bottom Overlay Info inside Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white z-10">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-200 font-medium">
                      <MapPin size={13} className="text-brand-coral" />
                      {dest.state}
                    </div>
                    <h3 className="font-display text-2xl font-black text-white leading-tight">
                      {dest.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 text-white text-xs font-black shadow-sm">
                    <Star size={12} className="fill-white" />
                    {dest.rating}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Meta details (Attractions & Best season) */}
                <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Key Sites</span>
                    <span className="font-bold text-slate-800">{dest.attractionsCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
                    <span className="font-bold text-slate-800">{dest.bestTime}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Must Experience
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100/80 text-slate-700 font-semibold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action & Estimated Budget */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Est. Budget / Day</span>
                    <span className="text-base font-black text-slate-900">
                      {dest.estBudget} <span className="text-xs text-slate-500 font-normal">/ person</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenDestination(dest)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red group-hover:text-red-700 transition-colors"
                  >
                    <span>View Destination</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
