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
  ChevronDown,
  X,
  Phone,
  UserRound,
  Images,
  Play,
  Star,
  ShieldCheck
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
    { id: 'comfort', label: 'Medium Range Stays', description: 'Extra space, amenities, and local character' },
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
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 z-10"
            >
              <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <img src={activeModalHotel.image} alt={activeModalHotel.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">{activeModalHotel.typeLabel || 'Stay profile'}</p>
                    <h3 className="mt-1 text-2xl font-black">{activeModalHotel.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveModalHotel(null)}
                    className="rounded-xl bg-white/20 p-2 backdrop-blur hover:bg-white/35"
                    aria-label="Close stay details"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-blue-50 p-3"><div className="text-[10px] font-black uppercase text-blue-600">From</div><div className="mt-1 text-lg font-black text-slate-900">₹{activeModalHotel.pricePerNight.toLocaleString()}<span className="text-[10px] font-medium text-slate-500"> / night</span></div></div>
                <div className="rounded-2xl bg-amber-50 p-3"><div className="text-[10px] font-black uppercase text-amber-600">Rating</div><div className="mt-1 flex items-center gap-1 text-lg font-black text-slate-900"><Star size={15} className="fill-amber-400 text-amber-400" /> {activeModalHotel.rating.toFixed(1)}</div></div>
                <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-[10px] font-black uppercase text-emerald-600">Reviews</div><div className="mt-1 text-lg font-black text-slate-900">{(activeModalHotel.reviewsCount || 0).toLocaleString()}</div></div>
                <div className="rounded-2xl bg-violet-50 p-3"><div className="text-[10px] font-black uppercase text-violet-600">Category</div><div className="mt-1 text-sm font-black text-slate-900">{activeModalHotel.tier === 'ultra_luxury' ? 'Ultra Luxury' : activeModalHotel.tier === 'luxury' ? 'Luxury' : activeModalHotel.tier === 'comfort' ? 'Medium Range' : 'Low Cost'}</div></div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <h4 className="mb-3 text-sm font-black text-slate-900">Stay information</h4>
                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="flex gap-2"><MapPin size={16} className="shrink-0 text-purple-600" /><span>{activeModalHotel.address}</span></div>
                    <div className="flex gap-2"><Phone size={16} className="shrink-0 text-purple-600" /><span>{activeModalHotel.contactPhone || '+91 1800 123 4567'}</span></div>
                    <div className="flex gap-2"><UserRound size={16} className="shrink-0 text-purple-600" /><span>Owner: {activeModalHotel.ownerName || 'Verified property management'}</span></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <h4 className="mb-3 text-sm font-black text-slate-900">Amenities</h4>
                  <div className="flex flex-wrap gap-2">{activeModalHotel.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{amenity}</span>)}</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <h4 className="mb-2 text-sm font-black text-slate-900">About this stay</h4>
                  <p className="text-xs leading-5 text-slate-600">{activeModalHotel.description || `${activeModalHotel.name} offers a comfortable base for exploring the destination, with convenient access to local landmarks and attentive hospitality.`}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <h4 className="mb-2 text-sm font-black text-slate-900">Stay details</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Check-in</span><strong className="text-slate-800">2:00 PM</strong></div>
                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Check-out</span><strong className="text-slate-800">11:00 AM</strong></div>
                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Capacity</span><strong className="text-slate-800">2 guests / room</strong></div>
                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Booking</span><strong className="text-slate-800">Instant confirmation</strong></div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-600" /><h4 className="text-sm font-black text-slate-900">Guest policies & nearby sights</h4></div>
                <div className="grid gap-4 sm:grid-cols-2 text-xs text-slate-600">
                  <div className="space-y-2"><p>• Government ID required at check-in</p><p>• Cancellation available up to 24 hours before arrival</p><p>• Quiet hours: 10:00 PM – 7:00 AM</p></div>
                  <div className="space-y-2">{activeModalHotel.distanceToItineraryHighlights.slice(0, 3).map((item) => <p key={item.placeId}><strong className="text-slate-800">{item.placeName}</strong> · {item.distanceKm} km · {item.drivingTimeMin} min drive</p>)}</div>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2"><Images size={18} className="text-purple-600" /><h4 className="text-sm font-black text-slate-900">Gallery</h4></div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{Array.from(new Set([activeModalHotel.image, ...(activeModalHotel.galleryImages || [])])).slice(0, 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${activeModalHotel.name} gallery ${index + 1}`} className="h-28 w-full rounded-xl object-cover" onError={(e) => { e.currentTarget.src = activeModalHotel.image }} />)}</div>
                {(activeModalHotel.galleryVideos || []).length > 0 ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{activeModalHotel.galleryVideos?.map((video) => <iframe key={video} className="h-48 w-full rounded-xl border border-slate-200" src={video} title={`${activeModalHotel.name} video`} allowFullScreen />)}</div> : <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><Play size={15} className="text-purple-600" /> Video tours will appear here when provided by the stay.</div>}
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
