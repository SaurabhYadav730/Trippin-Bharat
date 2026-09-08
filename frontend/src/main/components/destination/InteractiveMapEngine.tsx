import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Compass,
  Landmark,
  Building2,
  UtensilsCrossed,
  Sparkles,
  Layers,
  Eye,
  ArrowRight,
  Plus,
  Star
} from 'lucide-react'
import type { Place, StayHotel, FoodSpot, CuratedExperience } from '../../types/destination'

interface InteractiveMapEngineProps {
  places: Place[]
  stays: StayHotel[]
  foodSpots: FoodSpot[]
  experiences: CuratedExperience[]
  onSelectPlace: (place: Place) => void
}

type MapFilterCategory = 'all' | 'attractions' | 'stays' | 'food' | 'experiences'

interface MapItem {
  id: string
  name: string
  category: 'attraction' | 'stay' | 'food' | 'experience'
  categoryLabel: string
  rating: number
  priceLabel?: string
  coordinates: { lat: number; lng: number }
  image: string
  sub: string
  originalObj: any
}

export default function InteractiveMapEngine({
  places,
  stays,
  foodSpots,
  experiences,
  onSelectPlace,
}: InteractiveMapEngineProps) {
  const [filter, setFilter] = useState<MapFilterCategory>('all')
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null)
  const [searchFilter, setSearchFilter] = useState('')

  // Normalize all items into map pins
  const allMapItems: MapItem[] = [
    ...places.map((p) => ({
      id: p.id,
      name: p.name,
      category: 'attraction' as const,
      categoryLabel: p.categoryLabel,
      rating: p.rating,
      priceLabel: p.entryFee.indian === 0 ? 'Free' : `₹${p.entryFee.indian}`,
      coordinates: p.coordinates,
      image: p.images[0],
      sub: p.tagline,
      originalObj: p,
    })),
    ...stays.map((s) => ({
      id: s.id,
      name: s.name,
      category: 'stay' as const,
      categoryLabel: s.typeLabel || 'Heritage Stay',
      rating: s.rating,
      priceLabel: `₹${s.pricePerNight.toLocaleString()}/night`,
      coordinates: s.coordinates || { lat: 26.91, lng: 75.78 },
      image: s.image,
      sub: s.address,
      originalObj: s,
    })),
    ...foodSpots.map((f) => ({
      id: f.id,
      name: f.name,
      category: 'food' as const,
      categoryLabel: f.cuisineType,
      rating: f.rating,
      priceLabel: `₹${f.priceForTwo} for 2`,
      coordinates: f.coordinates,
      image: f.image,
      sub: f.mustTryDishes.slice(0, 2).join(', '),
      originalObj: f,
    })),
    ...experiences.map((e) => ({
      id: e.id,
      name: e.title,
      category: 'experience' as const,
      categoryLabel: e.categoryLabel,
      rating: e.rating,
      priceLabel: `₹${e.price}`,
      coordinates: { lat: 24.577 + (Math.random() * 0.01 - 0.005), lng: 73.682 + (Math.random() * 0.01 - 0.005) },
      image: e.image,
      sub: e.duration,
      originalObj: e,
    })),
  ]

  // Filter items
  const filteredItems = allMapItems.filter((item) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'attractions' && item.category === 'attraction') ||
      (filter === 'stays' && item.category === 'stay') ||
      (filter === 'food' && item.category === 'food') ||
      (filter === 'experiences' && item.category === 'experience')

    const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Normalize lat/lng to percentage in bounds for visual map display
  // Udaipur approximate bounds: Lat 24.57 to 24.61, Lng 73.63 to 73.70
  const minLat = 24.57
  const maxLat = 24.615
  const minLng = 73.63
  const maxLng = 73.705

  const getCoordinatesPct = (coords: { lat: number; lng: number }) => {
    const x = ((coords.lng - minLng) / (maxLng - minLng)) * 100
    // Invert Y because latitude goes northwards
    const y = 100 - ((coords.lat - minLat) / (maxLat - minLat)) * 100
    return {
      x: Math.min(Math.max(x, 8), 92),
      y: Math.min(Math.max(y, 10), 90),
    }
  }

  const getPinColor = (category: string) => {
    switch (category) {
      case 'attraction':
        return 'bg-blue-600 border-white text-white'
      case 'stay':
        return 'bg-purple-600 border-white text-white'
      case 'food':
        return 'bg-emerald-600 border-white text-white'
      case 'experience':
        return 'bg-amber-500 border-white text-white'
      default:
        return 'bg-slate-700 border-white text-white'
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
      {/* ── Top Bar Filter Ribbon ── */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Filters:
          </span>
          {(
            [
              { id: 'all', label: 'All Sights', icon: Layers },
              { id: 'attractions', label: 'Attractions', icon: Landmark },
              { id: 'stays', label: 'Hotels & Stays', icon: Building2 },
              { id: 'food', label: 'Food & Dining', icon: UtensilsCrossed },
              { id: 'experiences', label: 'Experiences', icon: Sparkles },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon
            const isSel = filter === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing <span className="font-extrabold text-blue-600">{filteredItems.length}</span> plotted pins
        </div>
      </div>

      {/* ── Main Split View (Sidebar + Interactive Map) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Left Sidebar List (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 p-4 space-y-3 max-h-[620px] overflow-y-auto bg-slate-50/50">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search map spots..."
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-blue-600"
          />

          <div className="space-y-2">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-black text-slate-900 truncate">{item.name}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 shrink-0">
                        ★ {item.rating}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.categoryLabel}</div>
                    <div className="text-[11px] font-bold text-blue-600 mt-1">{item.priceLabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Interactive Graphical Map (8 cols) */}
        <div className="lg:col-span-8 relative bg-slate-900 overflow-hidden min-h-[460px] flex items-center justify-center p-4">
          {/* Stylized Visual Map Blueprint */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Lake Pichola stylized water body */}
              <path
                d="M 280,240 Q 320,180 380,210 T 430,320 T 360,450 T 260,390 Z"
                fill="#38bdf8"
                opacity="0.6"
              />
              {/* Fateh Sagar Lake */}
              <path
                d="M 240,110 Q 290,90 330,130 T 290,190 T 220,160 Z"
                fill="#38bdf8"
                opacity="0.5"
              />
              {/* City ring roads */}
              <circle cx="360" cy="270" r="140" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="360" cy="270" r="240" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="120" y1="180" x2="600" y2="380" stroke="#64748b" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Map Geographic Annotations */}
          <div className="absolute top-4 left-4 pointer-events-none z-10 text-left">
            <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Udaipur Heritage Geospatial Matrix
            </div>
            <div className="text-xs font-bold text-slate-200">
              Lake Pichola & Mewar Cultural Enclave
            </div>
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none z-10 text-[10px] font-bold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10">
            Latitude: 24.5854° N · Longitude: 73.7125° E
          </div>

          {/* Plotted Interactive Location Pins */}
          <div className="relative w-full h-full min-h-[460px]">
            {filteredItems.map((item) => {
              const pos = getCoordinatesPct(item.coordinates)
              const isSelected = selectedItem?.id === item.id
              const pinColor = getPinColor(item.category)

              return (
                <div
                  key={item.id}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={() => setSelectedItem(item)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 shadow-lg flex items-center justify-center transition-all ${pinColor} ${
                      isSelected ? 'ring-4 ring-amber-400 scale-125 z-30' : ''
                    }`}
                  >
                    <MapPin size={15} />
                  </motion.div>

                  {/* Tooltip Label */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap z-30 pointer-events-none">
                    <div className="bg-slate-950 text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-lg border border-white/20">
                      {item.name}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Overlay Selected Pin Preview Card (Prominently displays when a pin is clicked) ── */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-40"
              >
                <div className="relative h-32 w-full bg-slate-100">
                  <img src={selectedItem.image} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 text-white">
                      {selectedItem.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900 truncate">{selectedItem.name}</h4>
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      ★ {selectedItem.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2">{selectedItem.sub}</p>
                  <div className="text-xs font-bold text-blue-600 pt-1">{selectedItem.priceLabel}</div>

                  <div className="pt-2 flex items-center gap-2">
                    {selectedItem.category === 'attraction' ? (
                      <button
                        onClick={() => onSelectPlace(selectedItem.originalObj)}
                        className="w-full py-2.5 rounded-xl text-xs font-black bg-slate-900 hover:bg-black text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Selected ${selectedItem.name}`)}
                        className="w-full py-2 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-black text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span>View Details</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
