import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Compass,
  Landmark,
  Building2,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Bookmark,
  Share2,
  ChevronRight,
  Filter,
  Eye,
  Check,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DestinationHero from '../components/destination/DestinationHero'
import PersonalizedCuration from '../components/destination/PersonalizedCuration'
import StayItineraryConnector from '../components/destination/StayItineraryConnector'
import SmartTripBuilderModal from '../components/destination/SmartTripBuilderModal'
import PlaceDashboardModal from '../components/destination/PlaceDashboardModal'
import SavedTripsDrawer from '../components/destination/SavedTripsDrawer'
import { destinationService } from '../services/api'
import type { DestinationData, Place, StayHotel, ItineraryDay } from '../types/destination'

export default function DestinationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const cityParam = searchParams.get('city') || 'Jaipur'
  const durationParam = searchParams.get('duration') || '3–5 Days'
  const styleParam = searchParams.get('style') || ''

  const [destinationData, setDestinationData] = useState<DestinationData | null>(null)
  const [activeTab, setActiveTab] = useState<'explore' | 'stay' | 'eat' | 'experiences'>('explore')
  const [selectedPlaceForModal, setSelectedPlaceForModal] = useState<Place | null>(null)
  const [showTripBuilder, setShowTripBuilder] = useState(false)
  const [showSavedTripsDrawer, setShowSavedTripsDrawer] = useState(false)
  const [exploreCategoryFilter, setExploreCategoryFilter] = useState<'all' | 'palaces' | 'temples' | 'lakes' | 'crafts' | 'heritage'>('all')
  const [addedPlaceIds, setAddedPlaceIds] = useState<Set<string>>(new Set())
  const [placeToAddToItinerary, setPlaceToAddToItinerary] = useState<Place | null>(null)

  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = `${cityParam} Travel & Heritage Guide | Trippin' Bharat`
    // Fetch destination data dynamically for any city
    destinationService.getDestination(cityParam).then((data) => {
      setDestinationData(data)
    })
  }, [cityParam])

  if (!destinationData) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#E5293E] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-bold tracking-wider text-slate-700">Loading {cityParam} Travel Guide...</span>
        </div>
      </div>
    )
  }

  // Find curated style matching user's query or default to first
  const stylesList = destinationData.curatedForStyles || []
  const matchedStyle =
    stylesList.find(
      (s) =>
        s.styleTitle.toLowerCase().includes(styleParam.toLowerCase()) ||
        styleParam.toLowerCase().includes(s.styleTitle.toLowerCase()) ||
        s.styleId.toLowerCase() === styleParam.toLowerCase()
    ) || stylesList[0]

  // Sights curated for user's selected style
  const curatedPlaces = matchedStyle
    ? (destinationData.places || []).filter((p) => matchedStyle.recommendedPlaceIds.includes(p.id))
    : (destinationData.places || []).slice(0, 6)

  // Filter places in Explore Tab
  const explorePlaces = destinationData.places.filter((p) => {
    if (exploreCategoryFilter === 'all') return true
    if (exploreCategoryFilter === 'palaces') return p.category === 'palace'
    if (exploreCategoryFilter === 'temples') return p.category === 'temple'
    if (exploreCategoryFilter === 'lakes')
      return p.category === 'lake' || p.category === 'waterfall' || p.category === 'nature'
    if (exploreCategoryFilter === 'crafts') return p.category === 'craft'
    if (exploreCategoryFilter === 'heritage')
      return p.category === 'heritage' || p.category === 'museum'
    return true
  })

  const scrollToTabs = (tabId: typeof activeTab) => {
    setActiveTab(tabId)
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleBuildFromHotel = (hotel: StayHotel) => {
    navigate(`/build-trip?dest=${destinationData.slug}`)
  }

  const handleSaveTrip = (days: ItineraryDay[]) => {
    destinationService.saveTrip({
      id: `trip-${Date.now()}`,
      destinationName: destinationData.name,
      destinationSlug: destinationData.slug,
      tripTitle: `${destinationData.name} Customized ${days.length}-Day Heritage Journey`,
      durationDays: days.length,
      savedAt: 'Just now',
      placesCount: days.reduce((acc, d) => acc + d.stops.length, 0),
      days,
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenSavedTrips={() => setShowSavedTripsDrawer(true)} />

      <main className="flex-1">
        {/* 1. First Screen: Destination Dashboard Header (Requirement 1) */}
        <DestinationHero
          data={destinationData}
          onExploreClick={() => scrollToTabs('explore')}
          onBuildTripClick={() => navigate(`/build-trip?dest=${destinationData.slug}`)}
        />

        {/* 2. Sticky Master Navigation Tabs Ribbon (Requirement 3) */}
        <div ref={tabsRef} className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
              <div className="flex items-center gap-1.5 sm:gap-3 min-w-max">
                {[
                  { id: 'explore', label: '🏛️ Explore', sub: 'Attractions & Temples' },
                  { id: 'stay', label: '🏨 Stay', sub: 'Itinerary-Connected' },
                  { id: 'eat', label: '🍛 Eat', sub: 'Mewari Cuisine' },
                  { id: 'experiences', label: '🎨 Experiences', sub: 'Folk Dance & Art' },
                ].map((tab) => {
                  const isSel = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex flex-col items-start cursor-pointer ${isSel
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-normal ${isSel ? 'text-slate-300' : 'text-slate-400'}`}>
                        {tab.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Tab Content Display ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* TAB 1: 🏛️ EXPLORE */}
          {activeTab === 'explore' && (
            <div className="space-y-8">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                    Explore Sights in {destinationData.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Click on any landmark to view its history, architecture, timings, and nearby spots.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  {[
                    { id: 'all', label: 'All Sights' },
                    { id: 'palaces', label: 'Forts & Palaces' },
                    { id: 'lakes', label: 'Lakes & Stepwells' },
                    { id: 'crafts', label: 'Artisan Bazaars & Crafts' },
                    { id: 'temples', label: 'Temples & Springs' },
                    { id: 'heritage', label: 'Museums & Heritage' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setExploreCategoryFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${exploreCategoryFilter === filter.id
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {explorePlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlaceForModal(place)}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={place.images[0]}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          if (place.images[1]) {
                            ; (e.target as HTMLImageElement).src = place.images[1]
                          } else if (destinationData?.heroBanner) {
                            ; (e.target as HTMLImageElement).src = destinationData.heroBanner
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-900 text-white shadow-sm">
                          {place.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-500 text-white">
                          ★ {place.rating}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h4 className="text-xl font-black">{place.name}</h4>
                        <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{place.tagline}</p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                        {place.description}
                      </p>

                      {/* Clean structured timing & entry badges */}
                      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Timings</span>
                          <span className="font-bold text-slate-800 text-xs truncate block mt-0.5" title={place.timings}>
                            {place.timings}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Entry Fee</span>
                          <span className="font-bold text-slate-800 text-xs block mt-0.5">
                            {place.entryFee.indian === 0 ? 'Free Entry' : `₹${place.entryFee.indian} / Person`}
                          </span>
                        </div>
                      </div>

                      {/* Refined subtle action footer (No AI dashboard button) */}
                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#E5293E] transition-colors">
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 group-hover:text-[#E5293E] transition-colors">
                          <Compass size={14} className="text-[#E5293E]" />
                          <span>Explore Place & Stories</span>
                        </span>
                        <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#E5293E] group-hover:text-white flex items-center justify-center text-slate-600 transition-all shadow-xs">
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 🏨 STAY (Requirement 5 & 6) */}
          {activeTab === 'stay' && (
            <StayItineraryConnector
              stays={destinationData.stays}
              onBuildFromHotel={handleBuildFromHotel}
            />
          )}

          {/* TAB 3: 🍛 EAT (Local Cuisine & Iconic Spots) */}
          {activeTab === 'eat' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  Local Flavors & Dining in {destinationData.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Discover nearby dining from affordable local plates to premium destination experiences, with prices shown for two people:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...destinationData.foodSpots]
                  .sort((a, b) => a.priceForTwo - b.priceForTwo)
                  .map((spot) => (
                    <div
                      key={spot.id}
                      className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5"
                    >
                      <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                        <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {spot.cuisineType}
                            </span>
                            <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                              ★ {spot.rating}
                            </span>
                          </div>
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                            {spot.priceForTwo < 800 ? 'Affordable' : spot.priceForTwo < 1800 ? 'Mid-range' : 'Premium'}
                          </span>
                          <h4 className="text-lg font-black text-slate-900 mt-1">{spot.name}</h4>
                          <p className="text-xs text-slate-500 font-medium truncate">{spot.address}</p>
                        </div>

                        <div className="space-y-1">
                          <div className="text-[11px] font-black uppercase text-slate-400">Must Try Delicacies:</div>
                          <div className="flex flex-wrap gap-1">
                            {spot.mustTryDishes.map((dish, i) => (
                              <span key={i} className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span>₹{spot.priceForTwo} for 2 people</span>
                          <span>{spot.timings}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: 🎨 EXPERIENCES */}
          {activeTab === 'experiences' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  Signature Mewar Experiences & Folk Arts
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Immerse yourself in authentic living traditions — from hands-on court painting workshops to twilight lake cruises:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinationData.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="relative h-48 w-full bg-slate-100">
                      <img src={exp.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                          {exp.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-white text-slate-900 shadow-sm">
                          ₹{exp.price} / person
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">{exp.title}</h4>
                        <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{exp.description}</p>
                      </div>

                      <div className="space-y-1 text-xs text-slate-500 font-medium">
                        <div>Duration: <strong className="text-slate-900">{exp.duration}</strong></div>
                        <div>Timing: <strong className="text-slate-900">{exp.timing}</strong></div>
                      </div>

                      <button
                        onClick={() => alert(`Reserved spot for: ${exp.title}`)}
                        className="w-full py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                      >
                        Reserve Experience
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ── Place Dedicated Dashboard Modal (Opens whenever ANY place is clicked) ── */}
      <PlaceDashboardModal
        place={selectedPlaceForModal}
        onClose={() => setSelectedPlaceForModal(null)}
        isAdded={selectedPlaceForModal ? addedPlaceIds.has(selectedPlaceForModal.id) : false}
        onAddToItinerary={(place) => {
          setPlaceToAddToItinerary(place)
          setSelectedPlaceForModal(null)
          navigate(`/build-trip?dest=${destinationData.slug}`)
        }}
        onSelectNearby={(nearbyId) => {
          const matched = destinationData.places.find((p) => p.id === nearbyId)
          if (matched) {
            setSelectedPlaceForModal(matched)
          }
        }}
      />

      {/* ── Smart Trip Builder Modal (Requirement 7) ── */}
      {showTripBuilder && (
        <SmartTripBuilderModal
          destinationName={destinationData.name}
          defaultDuration={durationParam}
          defaultInterest={styleParam}
          onClose={() => setShowTripBuilder(false)}
          onGenerate={() => {
            setShowTripBuilder(false)
            navigate(`/build-trip?dest=${destinationData.slug}`)
          }}
        />
      )}

      {/* ── Saved Trips Slide-over Drawer (Requirement 13) ── */}
      <SavedTripsDrawer
        isOpen={showSavedTripsDrawer}
        onClose={() => setShowSavedTripsDrawer(false)}
      />
    </div>
  )
}
