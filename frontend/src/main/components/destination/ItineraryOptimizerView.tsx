import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Zap,
  Check,
  Bookmark,
  Share2,
  Car,
  Wallet,
  Landmark,
  UtensilsCrossed,
  Waves,
  Building2,
  RotateCw,
  Eye,
  CheckCircle2,
  Lock,
  Unlock,
  HelpCircle,
  Moon
} from 'lucide-react'
import type { ItineraryDay, ItineraryStop, Place, FoodSpot, StayHotel } from '../../types/destination'
import { destinationService } from '../../services/api'

interface ItineraryOptimizerViewProps {
  initialDays: ItineraryDay[]
  allPlaces: Place[]
  destinationName: string
  foodSpots?: FoodSpot[]
  stays?: StayHotel[]
  onSelectPlace: (place: Place) => void
  onSaveTrip: (days: ItineraryDay[]) => void
}

// ── Smart Timing Helper aligned with Best Time to Visit (Requirement) ──
function getPlaceTimeSlot(place: Place, stopIndex: number): { timeSlot: string; durationMin: number } {
  const best = (place.bestTimeToVisit || '').toLowerCase()
  const durationMin = 90

  // 1. Dawn / Sunrise
  if (best.includes('sunrise') || best.includes('dawn') || best.includes('early morning')) {
    return { timeSlot: '6:30 AM – 8:30 AM', durationMin: 120 }
  }

  // 2. Evening Sunset / Golden Hour / Aarti
  if (
    best.includes('sunset') ||
    best.includes('golden hour') ||
    best.includes('evening') ||
    best.includes('aarti') ||
    best.includes('dusk') ||
    best.includes('5:30') ||
    best.includes('5:00') ||
    best.includes('6:30')
  ) {
    return { timeSlot: '5:30 PM – 7:30 PM', durationMin: 120 }
  }

  // 3. Solar Noon / Midday
  if (best.includes('12:00') || best.includes('solar noon') || best.includes('noon')) {
    return { timeSlot: '11:30 AM – 1:30 PM', durationMin: 120 }
  }

  // 4. Morning
  if (best.includes('morning') || best.includes('8:30') || best.includes('9:00') || best.includes('10:00')) {
    if (stopIndex === 0) return { timeSlot: '8:30 AM – 10:30 AM', durationMin: 120 }
    return { timeSlot: '10:45 AM – 12:45 PM', durationMin: 120 }
  }

  // 5. Afternoon
  if (best.includes('afternoon') || best.includes('2:30') || best.includes('3:00')) {
    return { timeSlot: '2:30 PM – 4:30 PM', durationMin: 120 }
  }

  // 6. Natural sequence with 12-hour AM/PM format (NEVER "14:00 AM")
  const sequentialSlots = [
    '8:30 AM – 10:30 AM',
    '10:45 AM – 12:45 PM',
    '2:15 PM – 4:15 PM',
    '4:30 PM – 6:30 PM',
    '6:45 PM – 8:30 PM',
  ]
  const slot = sequentialSlots[stopIndex]
  if (slot) return { timeSlot: slot, durationMin }

  const startH = 8 + stopIndex * 2
  const endH = startH + 2
  const startStr = `${startH % 12 || 12}:00 ${startH >= 12 ? 'PM' : 'AM'}`
  const endStr = `${endH % 12 || 12}:00 ${endH >= 12 ? 'PM' : 'AM'}`
  return { timeSlot: `${startStr} – ${endStr}`, durationMin }
}

export default function ItineraryOptimizerView({
  initialDays,
  allPlaces,
  destinationName,
  foodSpots = [],
  stays = [],
  onSelectPlace,
  onSaveTrip,
}: ItineraryOptimizerViewProps) {
  const navigate = useNavigate()
  const [days, setDays] = useState<ItineraryDay[]>(initialDays)
  const [activeDayIdx, setActiveDayIdx] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [lockedStops, setLockedStops] = useState<Record<string, boolean>>({})
  const [showExplainModal, setShowExplainModal] = useState(false)
  const [optimizationAlert, setOptimizationAlert] = useState<{
    savedTimeMin: number
    savedDistKm: number
  } | null>(null)
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState<'flow' | 'dining' | 'stays'>('flow')
  const [selectedStayId, setSelectedStayId] = useState<string>(stays[0]?.id || '')

  const currentDay = days[activeDayIdx] || days[0]

  const toggleLock = (stopId: string) => {
    setLockedStops((prev) => ({ ...prev, [stopId]: !prev[stopId] }))
  }

  // ── Duplicate Place Prevention Helper ──
  const isPlaceAlreadyAdded = (placeId: string, placeName: string) => {
    const norm = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '')
    const targetNorm = norm(placeName)
    const targetBase = placeId ? placeId.toLowerCase().replace(/-/g, '') : targetNorm

    return days.some((d) =>
      d.stops.some((s) => {
        if (s.placeId && placeId && s.placeId.toLowerCase() === placeId.toLowerCase()) return true
        const sNorm = norm(s.placeName)
        const sBase = s.placeId ? s.placeId.toLowerCase().replace(/-/g, '') : sNorm
        if (sNorm === targetNorm) return true
        if (targetBase && (sBase.includes(targetBase) || targetBase.includes(sBase))) return true
        if (targetNorm.length >= 6 && (sNorm.includes(targetNorm) || targetNorm.includes(sNorm))) return true
        return false
      })
    )
  }

  // Move a stop UP
  const moveStopUp = (stopIdx: number) => {
    if (stopIdx <= 0) return
    const updatedDays = [...days]
    const stops = [...updatedDays[activeDayIdx].stops]
    const temp = stops[stopIdx - 1]
    stops[stopIdx - 1] = stops[stopIdx]
    stops[stopIdx] = temp

    // Recalculate timeslots smoothly with 12-hr format (never "14:00 AM")
    const sequentialSlots = [
      '8:30 AM – 10:30 AM',
      '10:45 AM – 12:45 PM',
      '2:15 PM – 4:15 PM',
      '4:30 PM – 6:30 PM',
      '6:45 PM – 8:30 PM',
    ]
    stops.forEach((s, i) => {
      s.timeSlot = sequentialSlots[i] || `${((8 + i * 2) % 12) || 12}:00 ${8 + i * 2 >= 12 ? 'PM' : 'AM'} – ${((10 + i * 2) % 12) || 12}:00 ${10 + i * 2 >= 12 ? 'PM' : 'AM'}`
    })

    updatedDays[activeDayIdx].stops = stops
    setDays(updatedDays)
    setOptimizationAlert(null)
  }

  // Move a stop DOWN
  const moveStopDown = (stopIdx: number) => {
    if (stopIdx >= currentDay.stops.length - 1) return
    const updatedDays = [...days]
    const stops = [...updatedDays[activeDayIdx].stops]
    const temp = stops[stopIdx + 1]
    stops[stopIdx + 1] = stops[stopIdx]
    stops[stopIdx] = temp

    const sequentialSlots = [
      '8:30 AM – 10:30 AM',
      '10:45 AM – 12:45 PM',
      '2:15 PM – 4:15 PM',
      '4:30 PM – 6:30 PM',
      '6:45 PM – 8:30 PM',
    ]
    stops.forEach((s, i) => {
      s.timeSlot = sequentialSlots[i] || `${((8 + i * 2) % 12) || 12}:00 ${8 + i * 2 >= 12 ? 'PM' : 'AM'} – ${((10 + i * 2) % 12) || 12}:00 ${10 + i * 2 >= 12 ? 'PM' : 'AM'}`
    })

    updatedDays[activeDayIdx].stops = stops
    setDays(updatedDays)
    setOptimizationAlert(null)
  }

  // Remove a stop
  const removeStop = (stopIdx: number) => {
    const updatedDays = [...days]
    const stops = updatedDays[activeDayIdx].stops.filter((_, i) => i !== stopIdx)
    updatedDays[activeDayIdx].stops = stops
    // Recalculate day spend & travel
    updatedDays[activeDayIdx].totalDaySpend = stops.reduce((acc, s) => acc + s.estimatedCost, 0)
    updatedDays[activeDayIdx].totalDistanceKm = Number((stops.length * 1.8).toFixed(1))
    updatedDays[activeDayIdx].totalTravelTimeMin = stops.length * 12
    setDays(updatedDays)
  }

  // Add Place to current day (Strictly prevents adding duplicate sights twice or thrice)
  const handleAddPlace = (place: Place) => {
    if (isPlaceAlreadyAdded(place.id, place.name)) {
      return // Disallow duplicate place
    }
    const updatedDays = [...days]
    const stops = [...updatedDays[activeDayIdx].stops]
    const { timeSlot, durationMin } = getPlaceTimeSlot(place, stops.length)
    const newStop: ItineraryStop = {
      id: `custom-${Date.now()}`,
      placeId: place.id,
      placeName: place.name,
      category: place.category,
      timeSlot,
      durationMin,
      travelFromPrevMin: 15,
      distanceFromPrevKm: 2.2,
      estimatedCost: place.entryFee?.indian || 0,
      iconType: 'Landmark',
      notes: place.tagline || `Best Visited: ${place.bestTimeToVisit || 'Daytime'}`,
      coordinates: place.coordinates,
    }
    stops.push(newStop)
    updatedDays[activeDayIdx].stops = stops
    updatedDays[activeDayIdx].totalDaySpend = stops.reduce((acc, s) => acc + s.estimatedCost, 0)
    updatedDays[activeDayIdx].totalDistanceKm = Number((stops.length * 1.8).toFixed(1))
    updatedDays[activeDayIdx].totalTravelTimeMin = stops.length * 12
    setDays(updatedDays)
    setShowAddPlaceModal(false)
  }

  // ⚡ Optimize My Route (Requirement 10)
  const handleOptimizeRoute = async () => {
    setIsOptimizing(true)
    const result = await destinationService.optimizeRoute(currentDay.stops)

    setTimeout(() => {
      const updatedDays = [...days]
      updatedDays[activeDayIdx].stops = result.optimizedStops
      updatedDays[activeDayIdx].totalTravelTimeMin = Math.max(
        25,
        updatedDays[activeDayIdx].totalTravelTimeMin - result.savedTravelTimeMin
      )
      updatedDays[activeDayIdx].totalDistanceKm = Math.max(
        3.5,
        Number((updatedDays[activeDayIdx].totalDistanceKm - result.savedDistanceKm).toFixed(1))
      )
      setDays(updatedDays)
      setIsOptimizing(false)
      setOptimizationAlert({
        savedTimeMin: result.savedTravelTimeMin,
        savedDistKm: result.savedDistanceKm,
      })
    }, 600)
  }

  const handleSave = () => {
    onSaveTrip(days)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  return (
    <div className="space-y-8">
      {/* ── Section Title & Day Selector Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles size={14} />
            <span>Interactive Algorithmic Itinerary Planner</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display">
            {destinationName} — {days.length} Day Heritage Journey
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
            Fully customizable: Drag, reorder, add/remove stops, and run geospatial route optimization.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowExplainModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-black bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <HelpCircle size={14} />
            <span>Why This Plan?</span>
          </button>
          <button
            onClick={() => navigate(`/build-trip?dest=${destinationName.toLowerCase()}`)}
            className="px-4 py-2.5 rounded-xl text-xs font-black bg-[#E5293E] hover:bg-[#D01D32] text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Sparkles size={14} />
            <span>Build My Trip</span>
          </button>
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
            }`}
          >
            {isSaved ? <Check size={16} /> : <Bookmark size={15} />}
            <span>{isSaved ? 'Trip Saved to My Trips!' : 'Save Itinerary'}</span>
          </button>
        </div>
      </div>

      {/* ── Day Tabs Switcher ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-2">
        {days.map((day, idx) => {
          const isSel = activeDayIdx === idx
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveDayIdx(idx)
                setOptimizationAlert(null)
              }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isSel
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{day.dateLabel || `Day 0${day.dayNumber}`}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSel ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                {day.stops.length} Stops
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Algorithmic Optimization Notice Banner (Requirement 10) ── */}
      <AnimatePresence>
        {optimizationAlert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-300 flex items-center justify-between gap-4 text-emerald-950"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Route Geospatially Optimized!
                </div>
                <div className="text-sm font-bold">
                  Reduced zigzag travel: Saved ~{optimizationAlert.savedTimeMin} minutes of driving time and {optimizationAlert.savedDistKm} km of cab fare.
                </div>
              </div>
            </div>
            <button
              onClick={() => setOptimizationAlert(null)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Day Content Grid (Left: Interactive Timeline, Right: Day Map & Metrics) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline & Stop Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>{currentDay.themeTitle}</span>
            </h4>

            {/* Optimize Route Button (Requirement 10) */}
            <button
              onClick={handleOptimizeRoute}
              disabled={isOptimizing}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Zap size={14} />
              <span>{isOptimizing ? 'Optimizing Matrix...' : '⚡ Optimize My Route'}</span>
            </button>
          </div>

          {/* Timeline Sequence */}
          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
            {currentDay.stops.map((stop, idx) => {
              const matchedPlace = allPlaces.find((p) => p.id === stop.placeId)

              return (
                <div key={stop.id} className="space-y-6">
                  <div className="relative group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm ring-2 ring-blue-600/30" />

                    {/* Stop Card */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                              {stop.timeSlot}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase">
                              {stop.durationMin} mins duration
                            </span>
                            {matchedPlace?.bestTimeToVisit && (
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/70 px-2 py-0.5 rounded-md">
                                ✨ Best: {matchedPlace.bestTimeToVisit.split('(')[0].trim()}
                              </span>
                            )}
                          </div>
                          <h5 className="text-base font-black text-slate-900 mt-1">
                            {stop.placeName}
                          </h5>
                          {stop.notes && (
                            <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                              {stop.notes}
                            </p>
                          )}
                        </div>

                        {/* Move Up/Down, Lock & Remove Buttons */}
                        <div className="flex items-center gap-1 shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() => toggleLock(stop.id)}
                            title={lockedStops[stop.id] ? 'Unlock Stop' : 'Lock Stop to Order'}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                              lockedStops[stop.id]
                                ? 'bg-amber-100 text-amber-700'
                                : 'hover:bg-slate-200 text-slate-400'
                            }`}
                          >
                            {lockedStops[stop.id] ? <Lock size={13} /> : <Unlock size={13} />}
                          </button>
                          <button
                            onClick={() => moveStopUp(idx)}
                            disabled={idx === 0 || lockedStops[stop.id]}
                            className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer"
                            title="Move Stop Earlier"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => moveStopDown(idx)}
                            disabled={idx === currentDay.stops.length - 1 || lockedStops[stop.id]}
                            className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer"
                            title="Move Stop Later"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            onClick={() => removeStop(idx)}
                            className="w-7 h-7 rounded-lg hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-400 cursor-pointer"
                            title="Remove Stop"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Bottom Metadata & View Details */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-slate-700 font-bold">
                          <Wallet size={13} className="text-emerald-600" />
                          <span>{stop.estimatedCost === 0 ? 'Free Entry' : `Est. ₹${stop.estimatedCost}`}</span>
                        </span>

                        {matchedPlace && (
                          <button
                            onClick={() => onSelectPlace(matchedPlace)}
                            className="text-slate-700 hover:text-[#E5293E] font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Eye size={13} />
                            <span>View Details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Midday Lunch Break Card inserted after morning sight ── */}
                  {idx === 0 && currentDay.stops.length > 1 && (
                    <div className="relative group">
                      <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm ring-2 ring-emerald-500/30" />
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/90 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                              <UtensilsCrossed size={12} />
                              <span>1:00 PM – 2:00 PM</span>
                            </span>
                            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                              Regional Lunch Break
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-500">~60 mins</span>
                        </div>
                        <div>
                          <h5 className="text-sm font-black text-slate-900">
                            Midday Culinary Break & Local Lunch
                          </h5>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Recharge away from the midday heat with authentic local thali and beverages near your morning route.
                          </p>
                        </div>

                        {foodSpots.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-emerald-200/60">
                            {foodSpots.slice(0, 2).map((f) => (
                              <div key={f.id} className="p-2 rounded-xl bg-white border border-emerald-200 flex items-center gap-2">
                                <img
                                  src={f.image}
                                  alt={f.name}
                                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                                  onError={(e) => {
                                    ;(e.currentTarget as HTMLImageElement).src = '/images/places/ram-jhula.jpg'
                                  }}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-black text-slate-900 truncate">{f.name}</div>
                                  <div className="text-[10px] text-slate-500 truncate">{f.cuisineType}</div>
                                  <div className="text-[10px] font-bold text-emerald-700">₹{f.priceForTwo} for two · ★ {f.rating}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* + Add Place Button */}
          <button
            onClick={() => setShowAddPlaceModal(true)}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-600 hover:text-blue-600 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Plus size={16} />
            <span>+ Add Place to {currentDay.dateLabel || `Day 0${currentDay.dayNumber}`}</span>
          </button>

          {/* ══════════════════════════════════════════════════════════════
              DONE ROAMING FOR THE DAY? EVENING DINNER & HOTEL REST
          ══════════════════════════════════════════════════════════════ */}
          <div className="mt-8 p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Moon size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Evening Post-Roaming Plan
                  </div>
                  <h4 className="text-base font-black font-display text-white">
                    Done Roaming for {currentDay.dateLabel || `Day 0${currentDay.dayNumber}`}? Dinner & Tonight's Rest
                  </h4>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-white/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                🌙 Roaming Wraps ~7:30 PM
              </span>
            </div>

            {/* Dinner Recommendations */}
            <div className="space-y-2.5">
              <div className="text-xs font-black text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <UtensilsCrossed size={14} className="text-amber-400" />
                <span>Recommended Nearby Dinner Restaurants</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(foodSpots.length > 0 ? foodSpots : []).slice(0, 2).map((spot) => (
                  <div
                    key={spot.id}
                    className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5"
                  >
                    <div className="flex gap-2.5 items-center">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                        onError={(e) => {
                          ;(e.currentTarget as HTMLImageElement).src = '/images/places/laxman-jhula.jpg'
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h6 className="text-xs font-black text-white truncate">{spot.name}</h6>
                          <span className="text-[10px] font-bold text-amber-400">★ {spot.rating}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{spot.cuisineType}</p>
                        <div className="text-[10px] font-bold text-emerald-400">
                          ₹{spot.priceForTwo} for two · {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tonight's Rest Base */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800">
              <div className="text-xs font-black text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <Building2 size={14} className="text-blue-400" />
                <span>Where to Stay Tonight (Hotel Base)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(stays.length > 0 ? stays : []).slice(0, 3).map((stay) => {
                  const isBase = selectedStayId === stay.id || stays[0]?.id === stay.id
                  return (
                    <div
                      key={stay.id}
                      onClick={() => setSelectedStayId(stay.id)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                        isBase
                          ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 relative">
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
                          }}
                        />
                        {isBase && (
                          <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                            Active Base
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white truncate">{stay.name}</span>
                        <span className="text-[10px] font-bold text-amber-400">★ {stay.rating}</span>
                      </div>
                      <div className="text-[10px] font-black text-emerald-400">
                        ₹{stay.pricePerNight.toLocaleString()} / night
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Day Metrics & Route Graph & Dining/Stay Quick Tabs (5 cols) ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Quick Summary Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {currentDay.dateLabel || `Day 0${currentDay.dayNumber}`} Metrics & Expense Projection
              </h4>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                AI Balanced
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Distance</div>
                <div className="text-base sm:text-lg font-black text-amber-400 mt-1">
                  {currentDay.totalDistanceKm} km
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Transit Time</div>
                <div className="text-base sm:text-lg font-black text-blue-400 mt-1">
                  ~{currentDay.totalTravelTimeMin} min
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Est. Spend</div>
                <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                  ₹{currentDay.totalDaySpend.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Free Buffer</div>
                <div className="text-base sm:text-lg font-black text-slate-300 mt-1">
                  ~1h 20m
                </div>
              </div>
            </div>

            {/* Right-Panel Tab Buttons: Route Flow, Dining, Stays */}
            <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setRightPanelTab('flow')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  rightPanelTab === 'flow'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Route Flow
              </button>
              <button
                type="button"
                onClick={() => setRightPanelTab('dining')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  rightPanelTab === 'dining'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🍛 Dining ({foodSpots.length})
              </button>
              <button
                type="button"
                onClick={() => setRightPanelTab('stays')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  rightPanelTab === 'stays'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏨 Stays ({stays.length})
              </button>
            </div>

            {/* Tab 1: Route Sequence Flowchart */}
            {rightPanelTab === 'flow' && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Route Transit Flow:
                </div>
                <div className="space-y-2 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Hotel Base Departure (8:45 AM)</span>
                  </div>

                  {currentDay.stops.map((stop) => (
                    <div key={stop.id} className="flex items-center gap-2 text-xs font-semibold text-white pl-4">
                      <span className="text-slate-500">↓ {stop.travelFromPrevMin > 0 ? `${stop.travelFromPrevMin}m` : 'start'}</span>
                      <span className="font-bold text-blue-300">{stop.placeName}</span>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pl-4 pt-1">
                    <span>↓ 15m</span>
                    <span>Return to Hotel (Evening)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Curated Regional Dining */}
            {rightPanelTab === 'dining' && (
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>En-Route & Post-Roaming Dining:</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Verified Cuisine</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {foodSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
                    >
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                        onError={(e) => {
                          ;(e.currentTarget as HTMLImageElement).src = '/images/places/chotiwala.jpg'
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h6 className="text-xs font-black text-white truncate">{spot.name}</h6>
                          <span className="text-[10px] font-bold text-amber-400">★ {spot.rating}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{spot.cuisineType}</p>
                        <div className="text-[10px] font-bold text-emerald-400">
                          ₹{spot.priceForTwo} for two · {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Verified Stays */}
            {rightPanelTab === 'stays' && (
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Verified Heritage & Boutique Stays:</span>
                  <span className="text-[10px] text-blue-400 font-bold">Itinerary Connected</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {stays.map((stay) => {
                    const isBase = selectedStayId === stay.id || stays[0]?.id === stay.id
                    return (
                      <div
                        key={stay.id}
                        onClick={() => setSelectedStayId(stay.id)}
                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isBase
                            ? 'bg-blue-600/20 border-blue-500'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                          onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h6 className="text-xs font-black text-white truncate">{stay.name}</h6>
                            <span className="text-[10px] font-bold text-amber-400">★ {stay.rating}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{stay.typeLabel || stay.type}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-bold text-emerald-400">
                              ₹{stay.pricePerNight.toLocaleString()} / night
                            </span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                              isBase ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'
                            }`}>
                              {isBase ? 'Active Base' : 'Set as Base'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Place Modal with Duplicate Prevention ── */}
      <AnimatePresence>
        {showAddPlaceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setShowAddPlaceModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Add Sights to {currentDay.dateLabel || `Day 0${currentDay.dayNumber}`}
                </h3>
                <button
                  onClick={() => setShowAddPlaceModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {allPlaces.map((place) => {
                  const alreadyAdded = isPlaceAlreadyAdded(place.id, place.name)
                  return (
                    <div
                      key={place.id}
                      onClick={() => !alreadyAdded && handleAddPlace(place)}
                      className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                        alreadyAdded
                          ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                          : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer group'
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className={`text-sm font-bold truncate ${alreadyAdded ? 'text-slate-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                          {place.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{place.categoryLabel}</span>
                          {place.bestTimeToVisit && (
                            <span className="text-amber-700 font-medium truncate">
                              · Best: {place.bestTimeToVisit.split('(')[0].trim()}
                            </span>
                          )}
                        </div>
                      </div>

                      {alreadyAdded ? (
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg shrink-0">
                          ✓ In Itinerary
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-blue-600 bg-blue-100/60 group-hover:bg-blue-600 group-hover:text-white px-3 py-1 rounded-lg shrink-0 transition-colors">
                          + Add
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Explainability Modal */}
      {showExplainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setShowExplainModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 z-10 space-y-5 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  Algorithmic Rationale
                </div>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  Why this itinerary sequence?
                </h3>
              </div>
              <button
                onClick={() => setShowExplainModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-500" />
                  <span>Early Morning Anchor</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Scheduled your premiere monument first at 9:00 AM to beat midday tourist queues and capture soft morning light.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-500" />
                  <span>Geographic Proximity Flow</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Stops are sequenced in a single forward loop rather than zigzagging across the city, reducing unnecessary auto/cab spend.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5">
                  <UtensilsCrossed size={14} className="text-emerald-500" />
                  <span>Buffer & Rest Pacing</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Maintained ~1 hour 20 mins of flexible buffer time for authentic street food, tea breaks, and photo stops.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowExplainModal(false)
                navigate(`/build-trip?dest=${destinationName.toLowerCase()}`)
              }}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Open Full Multi-Step Constraint Engine</span>
              <Sparkles size={14} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
