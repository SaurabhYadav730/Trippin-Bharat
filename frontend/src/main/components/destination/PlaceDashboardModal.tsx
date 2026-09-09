import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  Compass,
  Building2,
  UtensilsCrossed,
  Volume2,
  Camera,
  Heart,
  Bookmark,
  Share2,
  ArrowRight,
  Landmark,
  Check,
  ChevronRight,
  Info
} from 'lucide-react'
import type { Place } from '../../types/destination'

interface PlaceDashboardModalProps {
  place: Place | null
  onClose: () => void
  onAddToItinerary?: (place: Place) => void
  isAdded?: boolean
  onSelectNearby?: (placeId: string) => void
}

export default function PlaceDashboardModal({
  place,
  onClose,
  onAddToItinerary,
  isAdded = false,
  onSelectNearby,
}: PlaceDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'journey_lens' | 'nearby' | 'visiting_info'>('journey_lens')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  if (!place) return null

  const handleAdd = () => {
    if (onAddToItinerary && !isAdded) {
      onAddToItinerary(place)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
        >
          {/* ── Top Header Hero Media ── */}
          <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-slate-900">
            <img
              src={place.images[0]}
              alt={place.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-black/30" />

            {/* Close & Action Buttons on Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900/90 text-white backdrop-blur-md uppercase tracking-wider shadow-sm">
                  {place.categoryLabel}
                </span>
                {place.isAsiVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
                    <ShieldCheck size={13} /> ASI Verified Heritage
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                    isSaved ? 'bg-rose-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                  title={isSaved ? 'Saved to Favorites' : 'Save to Favorites'}
                >
                  <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Title on Hero Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8 text-white z-20">
              {place.hindiName && (
                <div className="text-xs sm:text-sm font-bold text-amber-300 tracking-wider mb-1">
                  {place.hindiName}
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
                {place.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1 mt-1">
                {place.tagline}
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/20 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  ★ {place.rating} ({place.reviewCount.toLocaleString()} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-slate-300" /> {place.timings}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-emerald-400" /> Req: {place.timeRequired}
                </span>
                <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                  {place.entryFee.indian === 0 ? 'Free Entry' : `₹${place.entryFee.indian} / Person`}
                </span>
              </div>
            </div>
          </div>

          {/* ── Sub-Navigation Tabs ── */}
          <div className="border-b border-slate-200 bg-slate-50 px-5 sm:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('journey_lens')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'journey_lens'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Sparkles size={15} />
                <span>Heritage & Legends</span>
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Info size={15} />
                <span>Overview & Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('nearby')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'nearby'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Compass size={15} />
                <span>Nearby Highlights</span>
              </button>
            </div>

            {/* Quick Add To Itinerary CTA */}
            <button
              onClick={handleAdd}
              disabled={isAdded}
              aria-pressed={isAdded}
              className={`shrink-0 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#E5293E] hover:bg-[#D01D32] text-white shadow-xs'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Added to My Journey
                </>
              ) : (
                <>
                  <span>+ Add to My Journey</span>
                </>
              )}
            </button>
          </div>

          {/* ── Tab Content Area (Scrollable) ── */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {/* 1. JOURNEY LENS TAB */}
            {activeTab === 'journey_lens' && (
              <div className="space-y-6">
                {/* Audio Guide Player Banner */}
                {place.journeyLens.audioGuideAvailable && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-300 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                          isPlayingAudio
                            ? 'bg-amber-600 text-white animate-pulse'
                            : 'bg-amber-500 text-white hover:bg-amber-600'
                        }`}
                      >
                        <Volume2 size={22} />
                      </button>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                          Journey Lens Audio Experience
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {isPlayingAudio ? 'Playing 2-min Curated Audio Story...' : 'Listen to the 400-Year Architectural Legend'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full hidden sm:inline">
                      ASI Verified Narration
                    </span>
                  </div>
                )}

                {/* Grid: History & Architectural Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* History & Origin */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 mb-2">
                      <Landmark size={15} />
                      <span>History & Origins</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {place.journeyLens.history}
                    </p>
                  </div>

                  {/* Architecture & Engineering */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-600 mb-2">
                      <Building2 size={15} />
                      <span>{place.journeyLens.architecturalStyle}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700 font-medium">
                      {place.journeyLens.architectureHighlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Legends & Stories */}
                {place.journeyLens.legendsAndStories.length > 0 && (
                  <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
                    <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                      <Sparkles size={15} />
                      <span>Royal Lore & Untold Stories</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-800 font-medium leading-relaxed">
                      {place.journeyLens.legendsAndStories.map((story, i) => (
                        <p key={i}>"{story}"</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Curated Photography Spots */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-3">
                    <Camera size={16} />
                    <span>Best Angles for Photographers & Content Creators</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {place.journeyLens.bestPhotoSpots.map((spot, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-slate-200">
                        <span className="text-amber-400 font-black mr-1.5">0{i + 1}.</span>
                        {spot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 mb-2">About {place.name}</h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {place.description}
                  </p>
                </div>

                {/* Practical Visit Specifications */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-400 font-bold uppercase">Timings</div>
                    <div className="text-sm font-black text-slate-900 mt-1">{place.timings}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-400 font-bold uppercase">Indian Entry</div>
                    <div className="text-sm font-black text-slate-900 mt-1">
                      {place.entryFee.indian === 0 ? 'Free' : `₹${place.entryFee.indian}`}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-400 font-bold uppercase">Foreign Entry</div>
                    <div className="text-sm font-black text-slate-900 mt-1">
                      {place.entryFee.foreign === 0 ? 'Free' : `₹${place.entryFee.foreign}`}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-400 font-bold uppercase">Suggested Window</div>
                    <div className="text-sm font-black text-slate-900 mt-1">{place.bestTimeToVisit}</div>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider">Visual Gallery</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {place.images.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden h-48 border border-slate-200">
                        <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. WHILE YOU'RE HERE (NEARBY RADAR) */}
            {activeTab === 'nearby' && (
              <div className="space-y-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  📍 Connected Radar: Top spots, stays, and food right next to {place.name}
                </div>

                {/* Within 1 Km */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-black text-blue-600 mb-3">
                    <MapPin size={16} />
                    <span>Within 1 km Walking Radius</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {place.nearbyWithin1Km.map((spot) => (
                      <div
                        key={spot.id}
                        onClick={() => onSelectNearby && onSelectNearby(spot.id)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {spot.name}
                          </div>
                          <div className="text-xs text-slate-500 font-medium capitalize mt-0.5">
                            {spot.category} · {spot.distanceKm} km away
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-blue-600 bg-blue-100/60 px-2.5 py-1 rounded-lg">
                          ~{spot.travelTimeMin} min
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Within 5 Km */}
                {place.nearbyWithin5Km.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3">
                      <Compass size={16} />
                      <span>Within 5 km Circuit (Short Cab / Auto Drive)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {place.nearbyWithin5Km.map((spot) => (
                        <div
                          key={spot.id}
                          onClick={() => onSelectNearby && onSelectNearby(spot.id)}
                          className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex items-center justify-between cursor-pointer group"
                        >
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {spot.name}
                            </div>
                            <div className="text-xs text-slate-500 font-medium capitalize mt-0.5">
                              {spot.category} · {spot.distanceKm} km away
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            ~{spot.travelTimeMin} min drive
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
