import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  MapPin,
  Clock,
  Compass,
  Sparkles,
  ArrowRight,
  Check,
  Navigation,
  Car,
  ChevronDown
} from 'lucide-react'
import type { StayHotel } from '../../types/destination'

interface StayItineraryConnectorProps {
  stays: StayHotel[]
  onBuildFromHotel: (hotel: StayHotel) => void
}

export default function StayItineraryConnector({
  stays,
  onBuildFromHotel,
}: StayItineraryConnectorProps) {
  const tierOrder: Record<string, number> = {
    budget: 0,
    comfort: 1,
    luxury: 2,
    ultra_luxury: 3,
  }
  const orderedStays = [...stays].sort(
    (a, b) =>
      (tierOrder[a.tier || 'comfort'] ?? 1) - (tierOrder[b.tier || 'comfort'] ?? 1) ||
      a.pricePerNight - b.pricePerNight
  )
  const [selectedStay, setSelectedStay] = useState<StayHotel>(orderedStays[0])
  const [activeModalHotel, setActiveModalHotel] = useState<StayHotel | null>(null)
  const [expandedTier, setExpandedTier] = useState<string>('budget')
  const tierSections = [
    { id: 'budget', label: 'Affordable Stays', description: 'Value-focused stays near your itinerary' },
    { id: 'comfort', label: 'Comfort Stays', description: 'Extra space, amenities, and local character' },
    { id: 'luxury', label: 'Luxury Stays', description: 'Premium rooms, service, and destination experiences' },
    { id: 'ultra_luxury', label: 'Ultra-Luxury Stays', description: 'Exclusive villas, palace service, and signature hospitality' },
  ] as const

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-purple-600" />
            <span>Itinerary-Connected Stays</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Best Stays for Your Heritage Journey
          </h3>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Every stay is mapped against your itinerary sights, with destination-specific rates ordered from affordable to ultra-luxury:
          </p>
        </div>
      </div>

      {/* Grouped stay sections with Radial Sights Proximity */}
      <div className="space-y-10">
        {tierSections.map((section) => {
          const sectionStays = orderedStays
            .filter((stay) => (stay.tier || 'comfort') === section.id)
            .sort((a, b) => a.pricePerNight - b.pricePerNight)

          if (sectionStays.length === 0) return null

          const isExpanded = expandedTier === section.id

          return (
            <section
              key={section.id}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden"
              aria-labelledby={`${section.id}-stays-heading`}
            >
              <button
                type="button"
                onClick={() => setExpandedTier(isExpanded ? '' : section.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div>
                  <h4
                  id={`${section.id}-stays-heading`}
                  className="text-xl sm:text-2xl font-black text-slate-900 font-display"
                  >
                    {section.label}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium mt-1">{section.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400">
                    {sectionStays.length} {sectionStays.length === 1 ? 'stay' : 'stays'}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 pt-0">
                {sectionStays.map((stay) => {
          const isSelected = selectedStay.id === stay.id

          return (
            <div
              key={stay.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-white shadow-xs hover:shadow-xl ${
                isSelected ? 'border-purple-400 ring-2 ring-purple-400/20' : 'border-slate-200'
              }`}
            >
              {/* Hotel Image with Badges */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white shadow-sm">
                    {stay.typeLabel}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500 text-white shadow-sm">
                    ★ {stay.rating} ({stay.reviewsCount ? stay.reviewsCount.toLocaleString() : 'Verified'})
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="text-xl font-black">{stay.name}</h4>
                  <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{stay.address}</p>
                </div>
              </div>

              {/* Connected Itinerary Radar (Requirement 5 & 6) */}
              <div className="p-5 space-y-4">
                {/* Pricing & Tag */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-semibold">
                    <span className="text-xl font-black text-slate-900">
                      ₹{stay.pricePerNight.toLocaleString()}
                    </span>
                    <span> / night</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    High Walkability to Sights
                  </span>
                </div>

                {/* 📍 Explore from this Stay: Proximity Tree (Requirement 6) */}
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Navigation size={14} className="text-purple-600" />
                    <span>Explore from this stay (Travel Times):</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                    {stay.distanceToItineraryHighlights.slice(0, 4).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-purple-100"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                        <span className="truncate font-bold text-slate-900">{highlight.placeName}</span>
                        <span className="ml-auto text-purple-700 font-extrabold shrink-0">
                          {highlight.drivingTimeMin}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5">
                  {stay.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: View Stay & Build Itinerary from this Hotel */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalHotel(stay)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black border border-slate-300 hover:bg-slate-50 text-slate-800 transition-all cursor-pointer"
                  >
                    View Stay Details
                  </button>

                  <button
                    onClick={() => onBuildFromHotel(stay)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Build Itinerary From Here</span>
                  </button>
                </div>
              </div>
            </div>
          )
                })}
              </div>
              )}
            </section>
          )
        })}
      </div>

      {/* Hotel Details Modal */}
      <AnimatePresence>
        {activeModalHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="fixed inset-0" onClick={() => setActiveModalHotel(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">{activeModalHotel.name}</h3>
                <button
                  onClick={() => setActiveModalHotel(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>

              <div className="h-48 rounded-2xl overflow-hidden">
                <img src={activeModalHotel.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-purple-700">
                  Full Proximity Breakdown to Udaipur Sights:
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {activeModalHotel.distanceToItineraryHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs font-semibold"
                    >
                      <span className="font-bold text-slate-900">{item.placeName}</span>
                      <span className="text-slate-600">
                        {item.distanceKm} km · {item.drivingTimeMin} min drive
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  onBuildFromHotel(activeModalHotel)
                  setActiveModalHotel(null)
                }}
                className="w-full py-3 rounded-2xl text-sm font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer"
              >
                Set as Trip Base & Generate Itinerary
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
