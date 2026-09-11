import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Wallet,
  Car,
  Compass,
  Heart,
  Star,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  Unlock,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Zap,
  Bookmark,
  Share2,
  Printer,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Building2,
  UtensilsCrossed,
  Layers,
  Search,
  CheckCircle2,
  ChevronRight,
  Eye,
  Info,
  Moon,
  Bed,
  Utensils,
  ExternalLink,
  Coffee,
  Navigation,
  LocateFixed,
  Maximize2,
  Minimize2,
  Route,
  X,
  Phone,
  UserRound,
  Images,
  Play
} from 'lucide-react'
import { destinationService } from '../services/api'
import { destinationsDatabase } from '../data/destinationData'
import type { DestinationData, Place, StayHotel, ItineraryDay } from '../types/destination'
import type {
  TransportMode,
  BudgetTier,
  TravelPriority,
  DailyTimeWindow,
  TripBudgetInput,
  UserTripRequest,
  PlannedTrip,
  PlannedDay,
  PlannedStop,
  ConstraintValidationResult,
} from '../services/planner/TripPlanningTypes'
import { TimeConstraintService } from '../services/planner/TimeConstraintService'
import { TripPlanningService } from '../services/planner/TripPlanningService'
import { RecommendationService } from '../services/planner/RecommendationService'
import { RouteOptimizationService } from '../services/planner/RouteOptimizationService'
import PlanExplanationModal from '../components/planner/PlanExplanationModal'
import ConstraintConflictModal from '../components/planner/ConstraintConflictModal'
import TripShareModal from '../components/planner/TripShareModal'
import TripExportModal from '../components/planner/TripExportModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function formatScheduleTime(totalMinutes: number): string {
  const normalizedMinutes = Math.max(0, totalMinutes)
  const hour24 = Math.floor(normalizedMinutes / 60) % 24
  const minutes = normalizedMinutes % 60
  const period = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 || 12
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
}

function parseScheduleTime(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) {
    const [hour, minute] = time.split(':').map(Number)
    return Number.isFinite(hour) && Number.isFinite(minute) ? hour * 60 + minute : 8 * 60 + 30
  }

  let hour = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') hour += 12
  return hour * 60 + Number(match[2])
}

function getTrafficMultiplier(departureMinute: number): number {
  const hour = Math.floor(departureMinute / 60) % 24
  if ((hour >= 7 && hour < 10) || (hour >= 17 && hour < 21)) return 1.35
  if (hour >= 10 && hour < 16) return 1.15
  return 1
}

function getTrafficLabel(departureMinute: number): string {
  const hour = Math.floor(departureMinute / 60) % 24
  if ((hour >= 7 && hour < 10) || (hour >= 17 && hour < 21)) return 'Heavy traffic'
  if (hour >= 10 && hour < 16) return 'Moderate traffic'
  return 'Light traffic'
}

function formatBestTimeToVisit(val: unknown): string {
  if (typeof val === 'string') {
    return val.split('(')[0].trim()
  }

  if (val && typeof val === 'object' && val !== null && 'bestTimeOfDay' in (val as Record<string, unknown>)) {
    return String((val as Record<string, unknown>).bestTimeOfDay).split('(')[0].trim()
  }
  return ''
}

const artisanShopProfiles = [
  ['Heritage Craft Collective', 'Hand-block prints, local textiles, and artisan souvenirs', 'https://images.unsplash.com/photo-1601924928374-0b9c9c8f6b4c?w=800&q=85'],
  ['Royal Handicraft Studio', 'Handmade decor, miniature art, and traditional crafts', 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?w=800&q=85'],
  ['The Artisan Bazaar', 'Locally made jewellery, pottery, and woven keepsakes', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=85'],
] as const

const localArtifactShops = [
  { name: 'Heritage Craft Collective', description: 'Hand-block prints, local textiles, and artisan souvenirs', image: 'https://images.unsplash.com/photo-1601924928374-0b9c9c8f6b4c?w=800&q=85', specialty: 'Textiles & prints', openingMinutes: 600, closingMinutes: 1140 },
  { name: 'Royal Handicraft Studio', description: 'Handmade decor, miniature art, and traditional crafts', image: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?w=800&q=85', specialty: 'Miniature art', openingMinutes: 630, closingMinutes: 1110 },
  { name: 'The Artisan Bazaar', description: 'Locally made jewellery, pottery, and woven keepsakes', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=85', specialty: 'Jewellery & pottery', openingMinutes: 660, closingMinutes: 1200 },
  { name: 'Local Loom House', description: 'Small-batch woven goods made by regional artisan families', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=85', specialty: 'Handwoven goods', openingMinutes: 600, closingMinutes: 1080 },
  { name: 'The Craft Trail Store', description: 'Curated woodwork, souvenirs, and sustainable gifts', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=85', specialty: 'Woodcraft & gifts', openingMinutes: 690, closingMinutes: 1170 },
] as const

const localExperiences = [
  { name: 'Morning Flower Market Walk', description: 'Join local vendors as they set up fresh marigold garlands, spices, and seasonal produce before the lanes get busy.', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=85', category: 'Everyday local life', openingMinutes: 390, closingMinutes: 570, durationMin: 60 },
  { name: 'Block Printing with a Local Maker', description: 'Learn the rhythm of hand-carved wooden blocks and print your own small textile with a neighbourhood artisan family.', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=85', category: 'Hands-on craft', openingMinutes: 600, closingMinutes: 1020, durationMin: 90 },
  { name: 'Courtyard Folk Music Evening', description: 'A relaxed live folk performance with local musicians, storytelling, and seasonal snacks in an intimate heritage courtyard.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=85', category: 'Current event', openingMinutes: 1080, closingMinutes: 1260, durationMin: 90 },
  { name: 'Neighbourhood Chai & Street Breakfast', description: 'Share chai and a regional breakfast at a family-run stall while discovering the unhurried morning routine of the old city.', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=85', category: 'Local food ritual', openingMinutes: 450, closingMinutes: 690, durationMin: 60 },
  { name: 'Open-Air Craft & Storytelling Fair', description: 'A pop-up evening fair featuring local makers, folk stories, small performances, and responsibly sourced souvenirs.', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=85', category: 'Happening today', openingMinutes: 960, closingMinutes: 1260, durationMin: 90 },
] as const

function formatOpeningWindow(openingMinutes: number, closingMinutes: number): string {
  return `${formatScheduleTime(openingMinutes)} – ${formatScheduleTime(closingMinutes)}`
}

function recalculateStopSchedule(
  stops: PlannedStop[],
  dayStartTime: string,
  baseCoord: { lat: number; lng: number },
  transportMode: TransportMode,
  preferredStart?: { index: number; time: string }
): { stops: PlannedStop[]; totalDistanceKm: number; totalTravelTimeMin: number } {
  let currentMinute = parseScheduleTime(dayStartTime)
  let previousCoord = baseCoord
  let totalDistanceKm = 0
  let totalTravelTimeMin = 0

  const recalculatedStops = stops.map((stop, index) => {
    const stopCoord = stop.coordinates || previousCoord
    const distanceKm = RouteOptimizationService.calculateDistanceKm(previousCoord, stopCoord)
    const baseTravelMinutes = RouteOptimizationService.estimateTransitMinutes(distanceKm, transportMode)
    const travelMinutes = Math.ceil(baseTravelMinutes * getTrafficMultiplier(currentMinute))
    const preferredMinute =
      preferredStart?.index === index ? parseScheduleTime(preferredStart.time) : undefined
    const startMinute = preferredMinute ?? currentMinute + travelMinutes
    const endMinute = startMinute + stop.durationMin

    currentMinute = endMinute
    previousCoord = stopCoord
    totalDistanceKm += distanceKm
    totalTravelTimeMin += travelMinutes
    return {
      ...stop,
      travelFromPrevMin: travelMinutes,
      distanceFromPrevKm: distanceKm,
      startTime: formatScheduleTime(startMinute),
      endTime: formatScheduleTime(endMinute),
      timeSlot: `${formatScheduleTime(startMinute)} – ${formatScheduleTime(endMinute)}`,
    }
  })

  const returnDistanceKm = RouteOptimizationService.calculateDistanceKm(previousCoord, baseCoord)
  totalDistanceKm += returnDistanceKm
  totalTravelTimeMin += RouteOptimizationService.estimateTransitMinutes(returnDistanceKm, transportMode)

  return {
    stops: recalculatedStops,
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
    totalTravelTimeMin,
  }
}

function getTimeInputValue(time: string): string {
  const minutes = parseScheduleTime(time)
  return `${Math.floor(minutes / 60).toString().padStart(2, '0')}:${(minutes % 60)
    .toString()
    .padStart(2, '0')}`
}

function getScheduleMinutes(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return Number.MAX_SAFE_INTEGER
  let hour = Number(match[1]) % 12
  if (match[3].toUpperCase() === 'PM') hour += 12
  return hour * 60 + Number(match[2])
}

export default function BuildTripPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // ── Query Parameters ──
  const destQueryParam = searchParams.get('dest') || searchParams.get('city')
  const initialDestQuery = (destQueryParam || 'agra').toLowerCase()
  const initialDaysQuery = parseInt(searchParams.get('days') || '2', 10)
  const hasInitialDest = Boolean(destQueryParam)

  // ── Main UI State ──
  // If destination is already provided (e.g. Rishikesh), start directly in generated mode
  const [currentStep, setCurrentStep] = useState<number>(hasInitialDest ? 2 : 1)
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [destinationData, setDestinationData] = useState<DestinationData | null>(null)
  const [isLoadingDest, setIsLoadingDest] = useState<boolean>(true)
  const [rightPanelTab, setRightPanelTab] = useState<'flow' | 'dining' | 'stays'>('flow')
  const [diningCategoryFilter, setDiningCategoryFilter] = useState<'all' | 'veg' | 'lunch' | 'dinner'>('all')

  // ── Wizard Form State ──
  const [destinationSearch, setDestinationSearch] = useState<string>('')
  const [selectedDestSlug, setSelectedDestSlug] = useState<string>(initialDestQuery)
  const [daysCount, setDaysCount] = useState<number>(initialDaysQuery || 2)
  const [dailyTime, setDailyTime] = useState<DailyTimeWindow>({
    startTime: '08:30',
    endTime: '20:00',
    bufferMinutes: 30,
  })
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('smart_budget')
  const [customBudgetAmount, setCustomBudgetAmount] = useState<number>(4500)
  const [budgetMode, setBudgetMode] = useState<'total' | 'daily'>('total')
  const [transportMode, setTransportMode] = useState<TransportMode>('mixed')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    'Heritage & History',
    'Architecture',
    'Local Food',
  ])
  const [selectedPlaces, setSelectedPlaces] = useState<Record<string, TravelPriority>>({})
  const [selectedHotelId, setSelectedHotelId] = useState<string>('')
  const [openHotelTier, setOpenHotelTier] = useState<'budget' | 'comfort' | 'luxury' | 'ultra_luxury' | null>(null)
  const [selectedHotelDetails, setSelectedHotelDetails] = useState<StayHotel | null>(null)
  const [expandedArtisanStopId, setExpandedArtisanStopId] = useState<string | null>(null)
  const [expandedLocalSpecialityStopId, setExpandedLocalSpecialityStopId] = useState<string | null>(null)
  const [includeFoodStops, setIncludeFoodStops] = useState<boolean>(true)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')

  // ── Planned Trip Result State ──
  const [plannedTrip, setPlannedTrip] = useState<PlannedTrip | null>(null)
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0)
  const [selectedMapPinId, setSelectedMapPinId] = useState<string | null>(null)
  const [isSharingLocation, setIsSharingLocation] = useState(false)
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationShareMessage, setLocationShareMessage] = useState<string | null>(null)
  const locationWatchIdRef = useRef<number | null>(null)
  const liveLocationMarkerRef = useRef<L.Marker | null>(null)
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [isSatelliteView, setIsSatelliteView] = useState(false)
  const [showMoreDinnerSpots, setShowMoreDinnerSpots] = useState(false)
  const [showMoreLunchSpots, setShowMoreLunchSpots] = useState(false)
  const [showMoreLocalArtifactShops, setShowMoreLocalArtifactShops] = useState(false)
  const [showMoreLocalExperiences, setShowMoreLocalExperiences] = useState(false)
  const [selectedArtifactShop, setSelectedArtifactShop] = useState<((typeof localArtifactShops)[number] & {
    coordinates: { lat: number; lng: number }
    nearestRouteDistanceKm: number
    available: boolean
  }) | null>(null)
  const [selectedArtifactImage, setSelectedArtifactImage] = useState<string | null>(null)
  const [showSOSPanel, setShowSOSPanel] = useState(false)
  const [showGuidePanel, setShowGuidePanel] = useState(false)
  const [routePreference, setRoutePreference] = useState<'shortest' | 'less_traffic'>('less_traffic')
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const mapRouteLayerRef = useRef<L.LayerGroup | null>(null)
  const mapDirectionLayerRef = useRef<L.LayerGroup | null>(null)
  const mapRoadLayerRef = useRef<L.TileLayer | null>(null)
  const mapSatelliteLayerRef = useRef<L.TileLayer | null>(null)
  const routeLineRef = useRef<L.Polyline | null>(null)
  const [startedDays, setStartedDays] = useState<Record<number, boolean>>({})
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [visitedAt, setVisitedAt] = useState<Record<string, string>>({})
  const [mobileTab, setMobileTab] = useState<'itinerary' | 'map'>('itinerary')

  // ── Automatically scroll to top on step or mode changes ──
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [currentStep, isGenerated])

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!plannedTrip || !startedDays[activeDayIdx]) return
    const day = plannedTrip.days[activeDayIdx]
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const newlyVisited = day.stops.filter(
      (stop) => !visitedAt[stop.id] && !stop.isMealStop && nowMinutes > getScheduleMinutes(stop.endTime)
    )
    if (newlyVisited.length === 0) return

    const actualTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = {
      ...day,
      stops: day.stops.map((stop) =>
        newlyVisited.some((visited) => visited.id === stop.id)
          ? {
              ...stop,
              endTime: actualTime,
              timeSlot: `${formatScheduleTime(parseScheduleTime(stop.startTime || stop.timeSlot))} – ${actualTime} (Visited)`,
            }
          : stop
      ),
    }
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setVisitedAt((previous) => ({
      ...previous,
      ...Object.fromEntries(newlyVisited.map((stop) => [stop.id, actualTime])),
    }))
  }, [currentTime, plannedTrip, activeDayIdx, startedDays, visitedAt])

  const startCurrentDay = () => {
    if (!plannedTrip) return
    const now = new Date()
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return
    const baseCoord =
      plannedTrip.selectedHotel?.coordinates ||
      currentDay.stops[0]?.coordinates ||
      { lat: 26.9124, lng: 75.7873 }
    const startTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
    const recalculatedSchedule = recalculateStopSchedule(
      currentDay.stops,
      startTime,
      baseCoord,
      transportMode
    )
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = {
      ...currentDay,
      startTime: formatScheduleTime(parseScheduleTime(startTime)),
      stops: recalculatedSchedule.stops,
      totalDistanceKm: recalculatedSchedule.totalDistanceKm,
      totalTravelTimeMin: recalculatedSchedule.totalTravelTimeMin,
      totalSightseeingTimeMin: recalculatedSchedule.stops.reduce(
        (total, stop) => total + stop.durationMin,
        0
      ),
    }

    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setStartedDays((previous) => ({ ...previous, [activeDayIdx]: true }))
    setCurrentTime(now)
  }

  const liveDay = plannedTrip?.days[activeDayIdx]
  const liveNowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
  const currentLiveStopIndex =
    startedDays[activeDayIdx] && liveDay
      ? liveDay.stops.findIndex(
          (stop) => !visitedAt[stop.id] && liveNowMinutes <= getScheduleMinutes(stop.endTime)
        )
      : -1
  const currentLiveStopId =
    currentLiveStopIndex >= 0 ? liveDay?.stops[currentLiveStopIndex]?.id : undefined

  const formatLiveClock = currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })
  const liveCurrentPlace =
    liveDay && currentLiveStopIndex >= 0
      ? destinationData?.places.find((place) => place.id === liveDay.stops[currentLiveStopIndex]?.placeId)
      : undefined
  const nearbyLowerCrowdSuggestion =
    liveCurrentPlace && destinationData
      ? destinationData.places
          .filter((place) => place.id !== liveCurrentPlace.id)
          .map((place) => ({
            place,
            distanceKm: RouteOptimizationService.calculateDistanceKm(
              liveCurrentPlace.coordinates,
              place.coordinates
            ),
          }))
          .filter(({ place, distanceKm }) =>
            distanceKm <= 5 &&
            /quiet|peaceful|calm|early morning|late afternoon|morning/i.test(place.bestTimeToVisit)
          )
          .sort((a, b) => a.distanceKm - b.distanceKm)[0]
      : undefined

  // ── Modals State ──
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false)
  const [showConflictModal, setShowConflictModal] = useState<boolean>(false)
  const [conflictData, setConflictData] = useState<ConstraintValidationResult | null>(null)
  const [showShareModal, setShowShareModal] = useState<boolean>(false)
  const [showExportModal, setShowExportModal] = useState<boolean>(false)
  const [showAddPlaceModal, setShowAddPlaceModal] = useState<boolean>(false)
  const [saveToast, setSaveToast] = useState<string | null>(null)

  // ── Load Destination Data & Auto-Design Trip If Dest Provided ──
  useEffect(() => {
    let isMounted = true
    setIsLoadingDest(true)
    destinationService
      .getDestination(selectedDestSlug)
      .then((data) => {
        if (!isMounted) return
        setDestinationData(data)
        
        // Select top authentic places for this destination (up to 6)
        const initialSelections: Record<string, TravelPriority> = {}
        data.places.slice(0, Math.min(6, data.places.length)).forEach((p, idx) => {
          initialSelections[p.id] = idx < 3 ? 'must_visit' : 'want_to_visit'
        })
        setSelectedPlaces(initialSelections)
        
        const defaultHotelId = data.stays.length > 0 ? data.stays[0].id : ''
        if (defaultHotelId) {
          setSelectedHotelId(defaultHotelId)
        }

        setIsLoadingDest(false)
      })
      .catch(() => {
        if (isMounted) setIsLoadingDest(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedDestSlug])

  // Destination Options for Step 1
  const availableDestinations = [
    { slug: 'agra', name: 'Agra', state: 'Uttar Pradesh', image: '/images/places/taj-mahal.jpg', tag: 'Taj Mahal & Mughal Marvels' },
    { slug: 'udaipur', name: 'Udaipur', state: 'Rajasthan', image: '/images/places/city-palace.jpg', tag: 'Palaces & Royal Lakes' },
    { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', image: '/images/places/amber-fort.jpg', tag: 'Pink City & Hill Forts' },
    { slug: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', image: '/images/places/kashi-vishwanath.jpg', tag: 'Sacred Ghats & Ganga Aarti' },
    { slug: 'hampi', name: 'Hampi', state: 'Karnataka', image: '/images/places/vittala-stone-chariot.jpg', tag: 'Vijayanagara Ruins' },
    { slug: 'goa', name: 'Goa', state: 'Goa', image: '/images/places/aguada-fort.jpg', tag: 'UNESCO Churches & Coast' },
    { slug: 'munnar', name: 'Munnar & Kerala', state: 'Kerala', image: '/images/places/munnar-tea-hills.jpg', tag: 'Tea Hills & Backwaters' },
    { slug: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', image: '/images/places/ram-jhula.jpg', tag: 'Yoga Capital & River Ganges' },
    { slug: 'ladakh', name: 'Ladakh', state: 'Ladakh', image: '/images/places/pangong-tso.jpg', tag: 'High-Altitude Lakes & Monasteries' },
    { slug: 'shillong', name: 'Shillong', state: 'Meghalaya', image: '/images/places/living-root-bridge.jpg', tag: 'Living Root Bridges & Waterfalls' },
  ]

  const filteredDestinations = useMemo(() => {
    if (!destinationSearch.trim()) return availableDestinations
    const q = destinationSearch.toLowerCase()
    return availableDestinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tag.toLowerCase().includes(q)
    )
  }, [destinationSearch])

  // Style Options
  const styleOptions = [
    'Heritage & History',
    'Architecture',
    'Spiritual & Temples',
    'Local Food',
    'Photography',
    'Nature & Lakes',
    'Shopping & Artisans',
    'Family Friendly',
    'Relaxed Pace',
    'Offbeat Hidden Gems',
  ]

  // Transport Options
  const transportOptions: { id: TransportMode; label: string; desc: string; icon: string }[] = [
    { id: 'mixed', label: 'Mixed (Recommended)', desc: 'Auto-rickshaw for medium hops + walking in bazaars', icon: '🛺' },
    { id: 'auto_rickshaw', label: 'Auto / Rickshaw', desc: 'Fast local transit, ideal for city streets', icon: '🛺' },
    { id: 'cab', label: 'Private Cab', desc: 'Air-conditioned comfort, higher budget', icon: '🚕' },
    { id: 'public_transit', label: 'Public Transport & Metro', desc: 'Most economical Indian travel', icon: '🚌' },
    { id: 'walking', label: 'Walking & Heritage Trail', desc: 'Best for compact historic old quarters', icon: '🚶' },
  ]

  // Budget Tier Options
  const budgetOptions: { id: BudgetTier; label: string; perDay: number; desc: string }[] = [
    { id: 'backpacker', label: 'Backpacker', perDay: 1200, desc: 'Hostels, street food, public transport' },
    { id: 'smart_budget', label: 'Smart Budget (Value-First)', perDay: 2400, desc: 'Heritage homestays, auto-rickshaw, iconic dining' },
    { id: 'comfort', label: 'Comfort Travel', perDay: 4800, desc: 'Boutique hotels, private cab, premium meals' },
    { id: 'premium', label: 'Palatial Luxury', perDay: 12000, desc: '5-Star palaces, private chauffeur' },
  ]

  // Toggle Place Priority (Must Visit ❤️ -> Want to Visit ☆ -> Optional ○ -> Deselected)
  const cyclePlacePriority = (placeId: string) => {
    const current = selectedPlaces[placeId]
    const updated = { ...selectedPlaces }
    if (!current) {
      updated[placeId] = 'must_visit'
    } else if (current === 'must_visit') {
      updated[placeId] = 'want_to_visit'
    } else if (current === 'want_to_visit') {
      updated[placeId] = 'optional'
    } else {
      delete updated[placeId]
    }
    setSelectedPlaces(updated)
  }

  const setSpecificPriority = (placeId: string, priority: TravelPriority | 'remove') => {
    const updated = { ...selectedPlaces }
    if (priority === 'remove') {
      delete updated[placeId]
    } else {
      updated[placeId] = priority
    }
    setSelectedPlaces(updated)
  }

  // Count Priority Selections
  const mustVisitCount = Object.values(selectedPlaces).filter((p) => p === 'must_visit').length
  const wantVisitCount = Object.values(selectedPlaces).filter((p) => p === 'want_to_visit').length
  const optionalCount = Object.values(selectedPlaces).filter((p) => p === 'optional').length

  // Calculate Target Budget Amount
  const resolvedBudgetAmount = useMemo(() => {
    if (budgetTier === 'custom') return customBudgetAmount
    const selectedTier = budgetOptions.find((b) => b.id === budgetTier)
    const perDay = selectedTier ? selectedTier.perDay : 2400
    return budgetMode === 'daily' ? perDay : perDay * daysCount
  }, [budgetTier, customBudgetAmount, budgetMode, daysCount])

  // Recommendations for Step 6
  const recommendations = useMemo(() => {
    if (!destinationData) return { personalizedRecommendations: [], freeAndBudgetGems: [] }
    return RecommendationService.getRecommendations(
      destinationData,
      Object.keys(selectedPlaces),
      selectedStyles
    )
  }, [destinationData, selectedPlaces, selectedStyles])

  // Filtered Places for Step 6
  const filteredPlaces = useMemo(() => {
    if (!destinationData) return []
    if (activeCategoryFilter === 'all') return destinationData.places
    if (activeCategoryFilter === 'must_see') {
      return destinationData.places.filter((p) => p.rating >= 4.8 || p.isAsiVerified)
    }
    if (activeCategoryFilter === 'heritage') {
      return destinationData.places.filter((p) => p.category === 'heritage' || p.category === 'palace')
    }
    if (activeCategoryFilter === 'temples') {
      return destinationData.places.filter((p) => p.category === 'temple')
    }
    if (activeCategoryFilter === 'nature') {
      return destinationData.places.filter((p) => p.category === 'nature' || p.category === 'lake')
    }
    if (activeCategoryFilter === 'craft') {
      return destinationData.places.filter((p) => p.category === 'craft' || p.category === 'hidden_gem')
    }
    return destinationData.places
  }, [destinationData, activeCategoryFilter])

  // ── Handle Generation Execution ──
  const handleBuildJourney = () => {
    if (!destinationData) return

    try {
      // 1. Validate Capacity Constraints (Requirements 11, 16, 54)
      const validation = TimeConstraintService.validateConstraints(
        selectedPlaces,
        destinationData.places,
        daysCount,
        dailyTime
      )

      if (!validation.isFeasible) {
        setConflictData(validation)
        setShowConflictModal(true)
        return
      }

      // 2. Generate Trip via TripPlanningService
      executeTripGeneration()
    } catch (err) {
      console.error('Trip validation failed:', err)
      setIsGenerated(false)
      setGenerationError('We could not validate this trip. Please review your selections and try again.')
    }
  }

  const executeTripGeneration = () => {
    if (!destinationData) return

    setIsGenerated(false)

    // Guard: require at least one place to be selected
    if (Object.keys(selectedPlaces).length === 0) {
      setGenerationError('Please select at least one sight before building your journey.')
      return
    }

    try {
      setGenerationError(null)
      const request: UserTripRequest = {
        destinationSlug: destinationData.slug,
        destinationName: destinationData.name,
        daysCount,
        dailyTime,
        budget: {
          amount: resolvedBudgetAmount,
          mode: budgetMode,
          tier: budgetTier,
        },
        transport: transportMode,
        travelStyles: selectedStyles,
        selectedPlaces,
        startLocationType: 'hotel',
        selectedHotelId,
        includeFoodStops,
      }

      const trip = TripPlanningService.planTrip(destinationData, request)

      // Guard: ensure at least one day with stops was generated
      const hasStops = trip.days.some((d) => d.stops.length > 0)
      if (!hasStops) {
        setGenerationError('No stops could be scheduled. Try selecting more sights or extending your trip duration.')
        return
      }

      setGenerationError(null)
      setPlannedTrip(trip)
      setIsGenerated(true)
      setActiveDayIdx(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Trip generation failed:', err)
      setGenerationError('Something went wrong while building your trip. Please try again.')
    }
  }

  // ── Quick Modifiers Without Re-Entering Wizard ──
  const handleQuickChangeDays = (newDays: number) => {
    if (!destinationData) return
    setDaysCount(newDays)
    const selectedTier = budgetOptions.find((b) => b.id === budgetTier)
    const perDay = selectedTier ? selectedTier.perDay : 2400
    const newBudget = budgetMode === 'daily' ? perDay : perDay * newDays

    const request: UserTripRequest = {
      destinationSlug: destinationData.slug,
      destinationName: destinationData.name,
      daysCount: newDays,
      dailyTime,
      budget: {
        amount: newBudget,
        mode: budgetMode,
        tier: budgetTier,
      },
      transport: transportMode,
      travelStyles: selectedStyles,
      selectedPlaces,
      startLocationType: 'hotel',
      selectedHotelId,
      includeFoodStops,
    }

    const trip = TripPlanningService.planTrip(destinationData, request)
    setPlannedTrip(trip)
    setActiveDayIdx(0)
  }

  const handleQuickChangeTransport = (newTransport: TransportMode) => {
    if (!destinationData || !plannedTrip) return
    setTransportMode(newTransport)
    const request: UserTripRequest = {
      destinationSlug: destinationData.slug,
      destinationName: destinationData.name,
      daysCount,
      dailyTime,
      budget: {
        amount: resolvedBudgetAmount,
        mode: budgetMode,
        tier: budgetTier,
      },
      transport: newTransport,
      travelStyles: selectedStyles,
      selectedPlaces,
      startLocationType: 'hotel',
      selectedHotelId,
      includeFoodStops,
    }
    const trip = TripPlanningService.planTrip(destinationData, request)
    setPlannedTrip(trip)
  }

  const handleQuickChangeHotel = (newHotelId: string) => {
    if (!destinationData || !plannedTrip) return
    setSelectedHotelId(newHotelId)
    const request: UserTripRequest = {
      destinationSlug: destinationData.slug,
      destinationName: destinationData.name,
      daysCount,
      dailyTime,
      budget: {
        amount: resolvedBudgetAmount,
        mode: budgetMode,
        tier: budgetTier,
      },
      transport: transportMode,
      travelStyles: selectedStyles,
      selectedPlaces,
      startLocationType: 'hotel',
      selectedHotelId: newHotelId,
      includeFoodStops,
    }
    const trip = TripPlanningService.planTrip(destinationData, request)
    setPlannedTrip(trip)
  }

  // ── Itinerary Editing Actions ──
  const handleMoveStop = (stopIdx: number, direction: 'up' | 'down') => {
    if (!plannedTrip) return
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return

    const stops = [...currentDay.stops]
    const targetIdx = direction === 'up' ? stopIdx - 1 : stopIdx + 1
    if (targetIdx < 0 || targetIdx >= stops.length) return

    // Swap
    const temp = stops[stopIdx]
    stops[stopIdx] = stops[targetIdx]
    stops[targetIdx] = temp

    const baseCoord =
      plannedTrip.selectedHotel?.coordinates ||
      currentDay.stops[0]?.coordinates ||
      { lat: 26.9124, lng: 75.7873 }
    const recalculatedSchedule = recalculateStopSchedule(
      stops,
      dailyTime.startTime,
      baseCoord,
      transportMode
    )
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx].stops = recalculatedSchedule.stops
    updatedDays[activeDayIdx].totalDistanceKm = recalculatedSchedule.totalDistanceKm
    updatedDays[activeDayIdx].totalTravelTimeMin = recalculatedSchedule.totalTravelTimeMin
    updatedDays[activeDayIdx].totalSightseeingTimeMin = recalculatedSchedule.stops.reduce(
      (total, stop) => total + stop.durationMin,
      0
    )
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  const handleChangeStopTime = (stopIdx: number, time: string) => {
    if (!plannedTrip) return
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return

    const stops = [...currentDay.stops]
    const baseCoord =
      plannedTrip.selectedHotel?.coordinates ||
      currentDay.stops[0]?.coordinates ||
      { lat: 26.9124, lng: 75.7873 }
    const recalculatedSchedule = recalculateStopSchedule(
      stops,
      dailyTime.startTime,
      baseCoord,
      transportMode,
      { index: stopIdx, time }
    )
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = {
      ...currentDay,
      stops: recalculatedSchedule.stops,
      totalDistanceKm: recalculatedSchedule.totalDistanceKm,
      totalTravelTimeMin: recalculatedSchedule.totalTravelTimeMin,
      totalSightseeingTimeMin: recalculatedSchedule.stops.reduce(
        (total, stop) => total + stop.durationMin,
        0
      ),
    }
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  const handleChangeStopDuration = (stopIdx: number, durationValue: string) => {
    if (!plannedTrip) return
    const durationMin = Math.max(15, Math.min(720, Number(durationValue)))
    if (!Number.isFinite(durationMin)) return

    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return
    const stops = currentDay.stops.map((stop, index) =>
      index === stopIdx ? { ...stop, durationMin } : stop
    )
    const baseCoord =
      plannedTrip.selectedHotel?.coordinates ||
      currentDay.stops[0]?.coordinates ||
      { lat: 26.9124, lng: 75.7873 }
    const recalculatedSchedule = recalculateStopSchedule(
      stops,
      dailyTime.startTime,
      baseCoord,
      transportMode,
      { index: stopIdx, time: currentDay.stops[stopIdx].startTime }
    )
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = {
      ...currentDay,
      stops: recalculatedSchedule.stops,
      totalDistanceKm: recalculatedSchedule.totalDistanceKm,
      totalTravelTimeMin: recalculatedSchedule.totalTravelTimeMin,
      totalSightseeingTimeMin: recalculatedSchedule.stops.reduce(
        (total, stop) => total + stop.durationMin,
        0
      ),
    }
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  const handleToggleLockStop = (stopId: string) => {
    if (!plannedTrip) return
    const updatedDays = plannedTrip.days.map((day) => ({
      ...day,
      stops: day.stops.map((stop) =>
        stop.id === stopId ? { ...stop, locked: !stop.locked } : stop
      ),
    }))
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  const handleRemoveStop = (stopIdx: number) => {
    if (!plannedTrip) return
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return

    const updatedStops = currentDay.stops.filter((_, i) => i !== stopIdx)
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx].stops = updatedStops
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  // ── Duplicate Place Prevention Helper ──
  const isPlaceAlreadyAddedInTrip = (placeId: string, placeName: string) => {
    if (!plannedTrip) return false
    return plannedTrip.days.some((d) =>
      d.stops.some(
        (s) =>
          s.placeId === placeId ||
          s.placeName.toLowerCase().trim() === placeName.toLowerCase().trim() ||
          s.placeName.toLowerCase().includes(placeName.toLowerCase().slice(0, 10))
      )
    )
  }

  const handleAddStopToCurrentDay = (place: Place) => {
    if (!plannedTrip) return
    if (isPlaceAlreadyAddedInTrip(place.id, place.name)) return

    const currentDay = plannedTrip.days[activeDayIdx]
    const best = (place.bestTimeToVisit || '').toLowerCase()
    let timeSlot = '2:30 PM – 4:00 PM'
    let durationMin = 90

    if (best.includes('sunrise') || best.includes('dawn') || best.includes('early morning')) {
      timeSlot = '6:30 AM – 8:30 AM'
      durationMin = 120
    } else if (best.includes('sunset') || best.includes('aarti') || best.includes('evening') || best.includes('5:30') || best.includes('dusk')) {
      timeSlot = '5:30 PM – 7:30 PM'
      durationMin = 120
    } else if (best.includes('morning') || best.includes('8:30') || best.includes('9:00') || best.includes('10:00')) {
      timeSlot = currentDay.stops.length === 0 ? '8:30 AM – 10:30 AM' : '10:45 AM – 12:45 PM'
      durationMin = 120
    } else if (best.includes('12:00') || best.includes('noon') || best.includes('solar noon')) {
      timeSlot = '11:30 AM – 1:30 PM'
      durationMin = 120
    } else if (best.includes('afternoon') || best.includes('2:30') || best.includes('3:00')) {
      timeSlot = '2:30 PM – 4:30 PM'
      durationMin = 120
    } else {
      const idx = currentDay.stops.length
      const slots = ['8:30 AM – 10:30 AM', '10:45 AM – 12:45 PM', '2:15 PM – 4:15 PM', '4:30 PM – 6:30 PM', '6:45 PM – 8:30 PM']
      timeSlot = slots[idx] || '3:00 PM – 4:30 PM'
    }

    const newStop: PlannedStop = {
      id: `custom-${Date.now()}`,
      placeId: place.id,
      placeName: place.name,
      hindiName: place.hindiName,
      category: place.category,
      categoryLabel: place.categoryLabel,
      timeSlot,
      startTime: timeSlot.split('–')[0].trim(),
      endTime: timeSlot.split('–')[1]?.trim() || '4:00 PM',
      durationMin,
      travelFromPrevMin: 15,
      distanceFromPrevKm: 2.5,
      estimatedCost: place.entryFee?.indian || 0,
      priority: 'want_to_visit',
      locked: false,
      coordinates: place.coordinates,
      notes: place.tagline || (place.bestTimeToVisit ? `Best Visited: ${place.bestTimeToVisit}` : ''),
      image: place.images[0],
      explanation: place.bestTimeToVisit ? `Scheduled to align with optimal visit window (${formatBestTimeToVisit(place.bestTimeToVisit)}).` : undefined,
    }

    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx].stops.push(newStop)
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setShowAddPlaceModal(false)
  }

  const handleAddArtifactShopToCurrentDay = (shop: (typeof localArtifactShops)[number] & { coordinates: { lat: number; lng: number }; nearestRouteDistanceKm: number }) => {
    if (!plannedTrip) return
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return

    const shopStop: PlannedStop = {
      id: `artisan-${Date.now()}`,
      placeId: `artisan-${shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      placeName: shop.name,
      category: 'shopping',
      categoryLabel: 'Local artifacts',
      timeSlot: '',
      startTime: '',
      endTime: '',
      durationMin: 45,
      travelFromPrevMin: 0,
      distanceFromPrevKm: 0,
      estimatedCost: 0,
      priority: 'optional',
      locked: false,
      coordinates: shop.coordinates,
      notes: `${shop.specialty}. Open ${formatOpeningWindow(shop.openingMinutes, shop.closingMinutes)}.`,
      image: shop.image,
      explanation: `Placed near your existing route (${shop.nearestRouteDistanceKm ?? 0} km away) and within the shop's opening hours.`,
    }

    const baseCoord = plannedTrip.selectedHotel?.coordinates || currentDay.stops[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }
    const dayEnd = parseScheduleTime(dailyTime.endTime)
    const candidates = currentDay.stops.map((_, index) => index).concat(currentDay.stops.length)
      .map((insertAt) => {
        const stops = [...currentDay.stops]
        stops.splice(insertAt, 0, shopStop)
        const schedule = recalculateStopSchedule(stops, dailyTime.startTime, baseCoord, transportMode)
        const scheduledShop = schedule.stops[insertAt]
        const isOpen = parseScheduleTime(scheduledShop.startTime) >= shop.openingMinutes &&
          parseScheduleTime(scheduledShop.endTime) <= shop.closingMinutes &&
          parseScheduleTime(scheduledShop.endTime) <= dayEnd
        return { insertAt, schedule, isOpen }
      })
      .filter((candidate) => candidate.isOpen)
      .sort((a, b) => a.schedule.totalDistanceKm - b.schedule.totalDistanceKm)[0]

    if (!candidates) {
      setSaveToast(`${shop.name} cannot fit this day's route during its opening hours.`)
      window.setTimeout(() => setSaveToast(null), 3500)
      return
    }

    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = {
      ...currentDay,
      stops: candidates.schedule.stops,
      totalDistanceKm: candidates.schedule.totalDistanceKm,
      totalTravelTimeMin: candidates.schedule.totalTravelTimeMin,
      totalSightseeingTimeMin: candidates.schedule.stops.reduce((total, stop) => total + stop.durationMin, 0),
    }
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setSelectedArtifactShop(null)
    setSaveToast(`${shop.name} added to Day ${activeDayIdx + 1} in the shortest feasible sequence.`)
    window.setTimeout(() => setSaveToast(null), 3500)
  }

  const handleAddLocalExperienceToCurrentDay = (experience: (typeof localExperiences)[number] & { coordinates: { lat: number; lng: number }; nearestRouteDistanceKm: number }) => {
    if (!plannedTrip) return
    const currentDay = plannedTrip.days[activeDayIdx]
    if (!currentDay) return
    if (currentDay.stops.some((stop) => stop.placeName === experience.name)) return

    const experienceStop: PlannedStop = {
      id: `experience-${Date.now()}`,
      placeId: `experience-${experience.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      placeName: experience.name,
      category: 'experience',
      categoryLabel: experience.category,
      timeSlot: '',
      startTime: '',
      endTime: '',
      durationMin: experience.durationMin,
      travelFromPrevMin: 0,
      distanceFromPrevKm: 0,
      estimatedCost: 0,
      priority: 'optional',
      locked: false,
      coordinates: experience.coordinates,
      notes: experience.description,
      image: experience.image,
      explanation: `Placed near your route (${experience.nearestRouteDistanceKm} km away), respecting the experience hours.`,
    }
    const baseCoord = plannedTrip.selectedHotel?.coordinates || currentDay.stops[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }
    const dayEnd = parseScheduleTime(dailyTime.endTime)
    const candidate = currentDay.stops.map((_, index) => index).concat(currentDay.stops.length)
      .map((insertAt) => {
        const stops = [...currentDay.stops]
        stops.splice(insertAt, 0, experienceStop)
        const schedule = recalculateStopSchedule(stops, dailyTime.startTime, baseCoord, transportMode)
        const scheduled = schedule.stops[insertAt]
        return { schedule, isOpen: parseScheduleTime(scheduled.startTime) >= experience.openingMinutes && parseScheduleTime(scheduled.endTime) <= experience.closingMinutes && parseScheduleTime(scheduled.endTime) <= dayEnd }
      })
      .filter((item) => item.isOpen)
      .sort((a, b) => a.schedule.totalDistanceKm - b.schedule.totalDistanceKm)[0]

    if (!candidate) {
      setSaveToast(`${experience.name} cannot fit today's itinerary during its event hours.`)
      window.setTimeout(() => setSaveToast(null), 3500)
      return
    }
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = { ...currentDay, stops: candidate.schedule.stops, totalDistanceKm: candidate.schedule.totalDistanceKm, totalTravelTimeMin: candidate.schedule.totalTravelTimeMin, totalSightseeingTimeMin: candidate.schedule.stops.reduce((total, stop) => total + stop.durationMin, 0) }
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setSaveToast(`${experience.name} added to today's itinerary in the shortest feasible sequence.`)
    window.setTimeout(() => setSaveToast(null), 3500)
  }

  const handleOptimizeCurrentDay = () => {
    if (!plannedTrip || !destinationData) return
    const currentDay = plannedTrip.days[activeDayIdx]
    const baseCoord =
      plannedTrip.selectedHotel?.coordinates ||
      currentDay.stops[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }

    const dayPlaces = currentDay.stops
      .filter((s) => !s.isMealStop)
      .map((s) => {
        const place = destinationData.places.find((p) => p.id === s.placeId)
        return {
          place: place || ({
            id: s.placeId,
            name: s.placeName,
            category: s.category,
            categoryLabel: s.categoryLabel,
            coordinates: s.coordinates || baseCoord,
            timeRequired: `${s.durationMin} mins`,
            entryFee: { indian: s.estimatedCost, foreign: s.estimatedCost * 5 },
            rating: 4.8,
            reviewCount: 1000,
            images: s.image ? [s.image] : [],
            description: s.notes || '',
            timings: 'Open Daily',
            bestTimeToVisit: 'Daytime',
            isAsiVerified: true,
            tagline: s.notes || '',
            journeyLens: {} as any,
            nearbyWithin1Km: [],
            nearbyWithin5Km: [],
          } as Place),
          priority: s.priority,
        }
      })

    const { day: optimizedDay } = RouteOptimizationService.scheduleSingleDay(
      currentDay.dayNumber,
      dayPlaces,
      baseCoord,
      dailyTime,
      transportMode,
      plannedTrip.selectedHotel?.name || 'Hotel Base',
      includeFoodStops
    )

    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx] = optimizedDay
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
  }

  const handleSaveTrip = () => {
    if (!plannedTrip) return
    try {
      const existing = JSON.parse(localStorage.getItem('yatra_saved_trips') || '[]')
      const filtered = existing.filter((t: any) => t.id !== plannedTrip.id)
      filtered.unshift({
        id: plannedTrip.id,
        destinationName: plannedTrip.destinationName,
        destinationSlug: plannedTrip.destinationSlug,
        tripTitle: plannedTrip.tripTitle,
        durationDays: plannedTrip.daysCount,
        savedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        placesCount: plannedTrip.days.reduce((acc, d) => acc + d.stops.length, 0),
        days: plannedTrip.days,
      })
      localStorage.setItem('yatra_saved_trips', JSON.stringify(filtered))
      setSaveToast('Trip successfully saved to your saved journeys!')
      setTimeout(() => setSaveToast(null), 3000)
    } catch {
      setSaveToast('Could not save trip to local storage.')
    }
  }

  // ── Coordinates Bounding Box for Dynamic Map ──
  const activeDayStops = plannedTrip?.days[activeDayIdx]?.stops || []
  const artifactShopRecommendations = useMemo(() => {
    const day = plannedTrip?.days[activeDayIdx]
    if (!day) return []
    const baseCoord = plannedTrip.selectedHotel?.coordinates || day.stops[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }
    const routeCoords = [baseCoord, ...day.stops.map((stop) => stop.coordinates).filter(Boolean) as { lat: number; lng: number }[]]
    return localArtifactShops
      .map((shop, shopIndex) => {
        const anchor = routeCoords[shopIndex % routeCoords.length] || baseCoord
        const coordinates = { lat: anchor.lat + (shopIndex % 2 ? 0.002 : -0.002), lng: anchor.lng + (shopIndex % 3 === 0 ? 0.002 : -0.001) }
        const nearestRouteDistanceKm = Math.min(...routeCoords.map((point) => RouteOptimizationService.calculateDistanceKm(coordinates, point)))
        const available = day.stops.length === 0 || day.stops.some((stop) => {
          const start = getScheduleMinutes(stop.startTime)
          return start >= shop.openingMinutes && start + 45 <= shop.closingMinutes
        })
        return { ...shop, coordinates, nearestRouteDistanceKm: Number(nearestRouteDistanceKm.toFixed(1)), available }
      })
      .sort((a, b) => a.nearestRouteDistanceKm - b.nearestRouteDistanceKm)
  }, [plannedTrip, activeDayIdx])
  const localExperienceRecommendations = useMemo(() => {
    const day = plannedTrip?.days[activeDayIdx]
    if (!day) return []
    const baseCoord = plannedTrip.selectedHotel?.coordinates || day.stops[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }
    const routeCoords = [baseCoord, ...day.stops.map((stop) => stop.coordinates).filter(Boolean) as { lat: number; lng: number }[]]
    return localExperiences.map((experience, index) => {
      const anchor = routeCoords[index % routeCoords.length] || baseCoord
      const coordinates = { lat: anchor.lat + (index % 2 ? 0.0015 : -0.0015), lng: anchor.lng + (index % 3 ? 0.001 : -0.001) }
      const nearestRouteDistanceKm = Math.min(...routeCoords.map((point) => RouteOptimizationService.calculateDistanceKm(coordinates, point)))
      const available = getScheduleMinutes(day.startTime) <= experience.closingMinutes && getScheduleMinutes(day.endTime) >= experience.openingMinutes
      return { ...experience, coordinates, nearestRouteDistanceKm: Number(nearestRouteDistanceKm.toFixed(1)), available }
    }).sort((a, b) => a.nearestRouteDistanceKm - b.nearestRouteDistanceKm)
  }, [plannedTrip, activeDayIdx])
  const coordsList = activeDayStops
    .map((s) => s.coordinates)
    .filter(Boolean) as { lat: number; lng: number }[]
  const currentTrafficMinute = currentTime.getHours() * 60 + currentTime.getMinutes()
  const currentTrafficMultiplier = getTrafficMultiplier(currentTrafficMinute)
  const currentTrafficLabel = getTrafficLabel(currentTrafficMinute)

  useEffect(() => {
    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
      mapRouteLayerRef.current = null
      mapDirectionLayerRef.current = null
      mapRoadLayerRef.current = null
      mapSatelliteLayerRef.current = null
      routeLineRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isGenerated || !plannedTrip) {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
      mapRouteLayerRef.current = null
      mapDirectionLayerRef.current = null
      mapRoadLayerRef.current = null
      mapSatelliteLayerRef.current = null
      routeLineRef.current = null
      return
    }

    if (!mapContainerRef.current) return
    const routeRequestController = new AbortController()

    if (mapInstanceRef.current && mapInstanceRef.current.getContainer() !== mapContainerRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
      mapRouteLayerRef.current = null
      mapDirectionLayerRef.current = null
      mapRoadLayerRef.current = null
      mapSatelliteLayerRef.current = null
      routeLineRef.current = null
    }

    if (!mapInstanceRef.current) {
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id
      }
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([26.9124, 75.7873], 12)

      mapRoadLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      })
      mapSatelliteLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
        }
      )
      mapRoadLayerRef.current.addTo(mapInstanceRef.current)
      mapRouteLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current)
      mapDirectionLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current)
    }

    const map = mapInstanceRef.current
    const routeLayer = mapRouteLayerRef.current
    const directionLayer = mapDirectionLayerRef.current
    const roadLayer = mapRoadLayerRef.current
    const satelliteLayer = mapSatelliteLayerRef.current
    if (!routeLayer || !directionLayer || !roadLayer || !satelliteLayer) {
      return () => routeRequestController.abort()
    }
    if (isSatelliteView) {
      roadLayer.removeFrom(map)
      satelliteLayer.addTo(map)
    } else {
      satelliteLayer.removeFrom(map)
      roadLayer.addTo(map)
    }
    window.requestAnimationFrame(() => {
      map.invalidateSize()
      window.setTimeout(() => map.invalidateSize(), 150)
    })
    routeLayer.clearLayers()
    directionLayer.clearLayers()

    const validStops = activeDayStops.filter(
      (stop) =>
        stop.coordinates &&
        Number.isFinite(stop.coordinates.lat) &&
        Number.isFinite(stop.coordinates.lng)
    )
    const departurePoint = plannedTrip.selectedHotel?.coordinates
    const hasDeparturePoint =
      departurePoint &&
      Number.isFinite(departurePoint.lat) &&
      Number.isFinite(departurePoint.lng)
    if (validStops.length === 0 && !hasDeparturePoint) {
      map.setView([26.9124, 75.7873], 12)
      return () => routeRequestController.abort()
    }

    const stopPoints = validStops.map((stop) => [stop.coordinates!.lat, stop.coordinates!.lng] as [number, number])
    const routePoints: Array<[number, number]> = hasDeparturePoint
      ? [[departurePoint.lat, departurePoint.lng], ...stopPoints, [departurePoint.lat, departurePoint.lng]]
      : stopPoints

    // Center and fit bounds FIRST before layer projection calculations
    map.fitBounds(L.latLngBounds(routePoints), { padding: [28, 28], maxZoom: 15 })

    const addDirectionPointers = (points: Array<[number, number]>) => {
      if (points.length < 2) return
      try {
        if (!(map as any)._loaded) return
        const pointerIndexes = [...new Set([
          Math.floor(points.length * 0.3),
          Math.floor(points.length * 0.6),
          Math.floor(points.length * 0.85),
        ])].filter((index) => index > 0 && index < points.length)

        pointerIndexes.forEach((index) => {
          const previous = points[index - 1]
          const current = points[index]
          const previousPoint = map.latLngToLayerPoint(previous)
          const currentPoint = map.latLngToLayerPoint(current)
          const angle = (Math.atan2(currentPoint.y - previousPoint.y, currentPoint.x - previousPoint.x) * 180) / Math.PI
          L.marker(current, {
            icon: L.divIcon({
              className: '',
              html: `<div style="width:26px;height:26px;border-radius:9999px;background:#2563eb;border:2px solid white;color:white;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;line-height:1;box-shadow:0 2px 6px rgba(15,23,42,.35);transform:rotate(${angle}deg)">➜</div>`,
              iconSize: [26, 26],
              iconAnchor: [13, 13],
            }),
            interactive: false,
          }).addTo(directionLayer)
        })
      } catch (err) {
        console.warn('Could not add direction pointers:', err)
      }
    }

    routeLineRef.current = L.polyline(routePoints, {
      color: '#2563eb',
      weight: 5,
      opacity: 0.85,
    }).addTo(routeLayer)
    addDirectionPointers(routePoints)

    if (hasDeparturePoint) {
      const departureMarker = L.marker([departurePoint.lat, departurePoint.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="width:34px;height:34px;border-radius:9999px;background:#4f46e5;border:2.5px solid white;color:white;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(79,70,229,.45)">⌂</div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        }),
        zIndexOffset: 1100,
      }).addTo(routeLayer)
      departureMarker.bindTooltip(
        `Departure: ${plannedTrip.selectedHotel?.name || 'Hotel Base'}`,
        { direction: 'top', offset: [0, -16] }
      )
    }

    validStops.forEach((stop, stopIndex) => {
      const isMealStop = stop.isMealStop
      const isSelected = selectedMapPinId === stop.id
      const markerHtml = isMealStop
        ? `<div style="
            width: 32px; height: 32px; border-radius: 9999px;
            background: linear-gradient(135deg, #10b981, #047857);
            border: 2.5px solid white;
            box-shadow: 0 4px 14px rgba(16,185,129,0.45);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; transform: scale(${isSelected ? 1.2 : 1});
            transition: transform 0.2s ease;
          ">🍛</div>`
        : `<div style="
            width: ${isSelected ? 36 : 30}px; height: ${isSelected ? 36 : 30}px;
            border-radius: 9999px;
            background: ${isSelected ? 'linear-gradient(135deg, #E5293E, #b91c1c)' : 'linear-gradient(135deg, #1e293b, #0f172a)'};
            border: 2.5px solid white;
            color: white; font-family: ui-sans-serif, system-ui, sans-serif;
            font-size: ${isSelected ? 12 : 11}px; font-weight: 900;
            box-shadow: 0 4px 12px ${isSelected ? 'rgba(229,41,62,0.5)' : 'rgba(15,23,42,0.35)'};
            display: flex; align-items: center; justify-content: center;
            transform: scale(${isSelected ? 1.15 : 1});
            transition: transform 0.2s ease;
          ">${stopIndex + 1}</div>`

      const marker = L.marker([stop.coordinates!.lat, stop.coordinates!.lng], {
        icon: L.divIcon({
          className: '',
          html: markerHtml,
          iconSize: [isSelected ? 36 : 30, isSelected ? 36 : 30],
          iconAnchor: [isSelected ? 18 : 15, isSelected ? 18 : 15],
        }),
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(routeLayer)

      marker.bindTooltip(`Stop ${stopIndex + 1}: ${stop.placeName}`, { direction: 'top', offset: [0, -14] })
      marker.on('click', () => setSelectedMapPinId(stop.id))
    })

    if (routePoints.length > 1) {
      const coordinates = routePoints.map(([lat, lng]) => `${lng},${lat}`).join(';')
      fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&alternatives=3&continue_straight=false&geometries=geojson`,
        { signal: routeRequestController.signal }
      )
        .then((response) => {
          if (!response.ok) throw new Error('Road route unavailable')
          return response.json() as Promise<{
            routes?: Array<{
              distance: number
              duration: number
              geometry?: { coordinates: Array<[number, number]> }
            }>
          }>
        })
        .then((data) => {
          const routes = data.routes || []
          if (routes.length === 0 || routeRequestController.signal.aborted) return
          const selectedRoute =
            routePreference === 'shortest'
              ? routes.reduce((shortest, route) => (route.distance < shortest.distance ? route : shortest), routes[0])
              : routes.reduce(
                  (lessTraffic, route) => {
                    const routeTrafficScore = route.duration * currentTrafficMultiplier
                    const selectedTrafficScore = lessTraffic.duration * currentTrafficMultiplier
                    return routeTrafficScore < selectedTrafficScore ? route : lessTraffic
                  },
                  routes[0]
                )
          const geometry = selectedRoute?.geometry?.coordinates
          if (!geometry || geometry.length < 2 || routeRequestController.signal.aborted) return
          if (routeLineRef.current) routeLayer.removeLayer(routeLineRef.current)
          routeLineRef.current = L.polyline(
            geometry.map(([lng, lat]) => [lat, lng] as [number, number]),
            {
              color: '#2563eb',
              weight: 5,
              opacity: 0.9,
            }
          ).addTo(routeLayer)
          addDirectionPointers(geometry.map(([lng, lat]) => [lat, lng] as [number, number]))
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') return
          console.warn('Road route unavailable; using the straight-line fallback.', error)
        })
    }

    return () => routeRequestController.abort()
  }, [
    isGenerated,
    plannedTrip,
    activeDayStops,
    selectedMapPinId,
    isMapExpanded,
    isSatelliteView,
    routePreference,
    currentTrafficMultiplier,
  ])

  useEffect(() => {
    if (!mapInstanceRef.current || !liveLocation) return
    liveLocationMarkerRef.current?.remove()
    liveLocationMarkerRef.current = L.marker([liveLocation.lat, liveLocation.lng], {
      icon: L.divIcon({
        className: '',
        html: '<div style="width:38px;height:38px;border-radius:9999px;background:#2563eb;border:3px solid white;box-shadow:0 0 0 8px rgba(37,99,235,.2),0 4px 12px rgba(15,23,42,.35);display:flex;align-items:center;justify-content:center;color:white;font-size:17px">➤</div>',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      }),
      zIndexOffset: 1800,
    }).addTo(mapInstanceRef.current)
    liveLocationMarkerRef.current.bindTooltip('Your live location', { direction: 'top', offset: [0, -19] })
    return () => {
      liveLocationMarkerRef.current?.remove()
      liveLocationMarkerRef.current = null
    }
  }, [liveLocation, isMapExpanded])

  useEffect(() => () => {
    if (locationWatchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchIdRef.current)
    }
  }, [])

  const shareLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationShareMessage('Live location is not supported by this browser.')
      return
    }
    if (isSharingLocation) {
      if (locationWatchIdRef.current !== null) navigator.geolocation.clearWatch(locationWatchIdRef.current)
      locationWatchIdRef.current = null
      setIsSharingLocation(false)
      setLocationShareMessage('Live location sharing stopped.')
      return
    }

    setLocationShareMessage('Requesting your location permission...')
    locationWatchIdRef.current = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const nextLocation = { lat: coords.latitude, lng: coords.longitude }
        setLiveLocation(nextLocation)
        setIsSharingLocation(true)
        const shareUrl = `${window.location.origin}/live-location?lat=${nextLocation.lat.toFixed(6)}&lng=${nextLocation.lng.toFixed(6)}`
        if (navigator.share) {
          navigator.share({
            title: "My live Trippin' Bharat location",
            text: "Follow my live location while I am travelling with Trippin' Bharat.",
            url: shareUrl,
          }).catch(() => undefined)
        } else {
          navigator.clipboard?.writeText(shareUrl).then(
            () => setLocationShareMessage('Live location link copied. Share it with your travel companions.'),
            () => setLocationShareMessage('Live location is active on the map.'),
          )
        }
      },
      () => {
        setIsSharingLocation(false)
        setLocationShareMessage('Location permission was unavailable. Please enable it to share live location.')
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    )
  }

  const triggerEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      {/* ── Save Notification Toast ── */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-black shadow-2xl flex items-center gap-2 border border-emerald-500"
          >
            <CheckCircle2 size={16} />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Container ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-8">
        {/* ══════════════════════════════════════════════════════════════
            HEADER & STEP PROGRESS BAR
        ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles size={13} className="text-[#E5293E]" />
                <span>Intelligent Constraint-Based Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
                Build My Trip
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">
                <span className="font-extrabold text-slate-800">User Chooses. System Optimizes.</span> Realistic scheduling, exact entry fees, and route efficiency.
              </p>
            </div>

            {/* View Mode Toggle / Reset */}
            {isGenerated && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Modify Trip Constraints</span>
                </button>
                <button
                  onClick={() => setShowExplanationModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle size={14} />
                  <span>Why This Plan?</span>
                </button>
              </div>
            )}
          </div>

          {/* 7-Step Progress Stepper (Visible during planning mode) */}
          {!isGenerated && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-slate-100">
              {[
                { step: 1, label: 'Destination', icon: MapPin },
                { step: 2, label: 'Duration & Hours', icon: Calendar },
                { step: 3, label: 'Budget', icon: Wallet },
                { step: 4, label: 'Transport', icon: Car },
                { step: 5, label: 'Travel Styles', icon: Compass },
                { step: 6, label: 'Choose Sights', icon: Heart },
                { step: 7, label: 'Hotel & Review', icon: Building2 },
              ].map((s) => {
                const Icon = s.icon
                const isCurrent = currentStep === s.step
                const isPassed = currentStep > s.step
                return (
                  <button
                    key={s.step}
                    onClick={() => setCurrentStep(s.step)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isCurrent
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : isPassed
                        ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                        : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-black ${
                        isCurrent
                          ? 'bg-rose-500 text-white'
                          : isPassed
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPassed ? <Check size={13} strokeWidth={3} /> : s.step}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-black truncate">{s.label}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Local experiences and live events */}
        <div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5 text-slate-900 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-emerald-900">
              <Compass size={15} className="text-emerald-600" />
              <span>Local Experiences & What’s On Today</span>
            </div>
            <span className="text-[10px] font-black uppercase text-emerald-700">Near your route</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">See everyday local life and verified current events happening near your journey. Trippin' Bharat checks the time window before adding anything to today’s plan.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {localExperienceRecommendations.slice(0, showMoreLocalExperiences ? undefined : 4).map((experience) => (
              <div key={experience.name} className="overflow-hidden rounded-2xl border border-emerald-200 bg-white">
                <div className="flex gap-3 p-3">
                  <img src={experience.image} alt={experience.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-[11px] font-black leading-tight text-slate-900">{experience.name}</h5>
                      <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase text-emerald-800">{experience.category}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-slate-600">{experience.description}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-[9px] font-bold">
                      <span className="text-slate-500">{experience.nearestRouteDistanceKm} km from route · {formatOpeningWindow(experience.openingMinutes, experience.closingMinutes)}</span>
                      <button type="button" onClick={() => handleAddLocalExperienceToCurrentDay(experience)} disabled={!experience.available} className="shrink-0 rounded-lg bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">{experience.available ? '+ Add today' : 'Unavailable'}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {localExperienceRecommendations.length > 4 && (
            <button type="button" onClick={() => setShowMoreLocalExperiences((shown) => !shown)} className="mx-auto flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-[10px] font-black text-emerald-800 hover:border-emerald-400">
              {showMoreLocalExperiences ? 'Show Less Experiences' : 'Show More Experiences'}
              {showMoreLocalExperiences ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MODE A: MULTI-STEP WIZARD (WHEN NOT YET GENERATED)
        ══════════════════════════════════════════════════════════════ */}
        {!isGenerated && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm min-h-[480px]">
            {/* ── STEP 1: DESTINATION ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    Where are you traveling in India?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Select from verified heritage destinations with authentic ASI monument records.
                  </p>
                </div>

                <div className="relative max-w-md">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={destinationSearch}
                    onChange={(e) => setDestinationSearch(e.target.value)}
                    placeholder="Search city, state, or heritage wonder..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDestinations.map((d) => {
                    const isSel = selectedDestSlug === d.slug
                    return (
                      <div
                        key={d.slug}
                        onClick={() => setSelectedDestSlug(d.slug)}
                        className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all p-4 flex items-center gap-4 ${
                          isSel
                            ? 'border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/10 shadow-md'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img
                            src={d.image}
                            alt={d.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              ;(e.currentTarget as HTMLElement).style.opacity = '0.7'
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-slate-900 truncate">{d.name}</h4>
                            {isSel && (
                              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                                <Check size={12} strokeWidth={3} />
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-bold text-slate-500">{d.state}</div>
                          <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{d.tag}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Trip Duration & Hours</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: DURATION & DAILY SIGHTSEEING HOURS ── */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    How long are you staying in {destinationData?.name}?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Realistic trip schedules ensure you don't squeeze 12 hours of sightseeing into an 8-hour day.
                  </p>
                </div>

                {/* Duration Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Number of Days
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                      const isSel = daysCount === num
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setDaysCount(num)}
                          className={`py-3.5 rounded-2xl border text-center font-black text-xs transition-all cursor-pointer ${
                            isSel
                              ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>{num} Day{num > 1 ? 's' : ''}</div>
                          <div className={`text-[10px] font-normal mt-0.5 ${isSel ? 'text-blue-100' : 'text-slate-400'}`}>
                            {num === 1 ? 'Express' : num <= 3 ? 'Classic' : 'Comprehensive'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Daily Sightseeing Hours */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Daily Sightseeing Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                        <Clock size={13} className="text-blue-600" />
                        <span>Daily Departure Time</span>
                      </div>
                      <input
                        type="time"
                        value={dailyTime.startTime}
                        onChange={(e) =>
                          setDailyTime({ ...dailyTime, startTime: e.target.value })
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-blue-600"
                      />
                      <div className="text-[10px] text-slate-400">
                        Dawn visits for monuments like Taj Mahal start at 6:00 AM.
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                        <Clock size={13} className="text-amber-600" />
                        <span>Daily Return to Hotel</span>
                      </div>
                      <input
                        type="time"
                        value={dailyTime.endTime}
                        onChange={(e) =>
                          setDailyTime({ ...dailyTime, endTime: e.target.value })
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-blue-600"
                      />
                      <div className="text-[10px] text-slate-400">
                        Evening ghat aartis and night market strolls usually finish by 8:30 PM.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Budget & Spending</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: BUDGET (COMMON MAN TRAVEL FOCUS) ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    What is your approximate budget for this {daysCount}-day journey?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Designed for everyday Indian travelers. Defaults to "Smart Budget" without assuming luxury.
                  </p>
                </div>

                {/* Tier Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {budgetOptions.map((opt) => {
                    const isSel = budgetTier === opt.id
                    const totalCost = opt.perDay * daysCount
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setBudgetTier(opt.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                          isSel
                            ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900">{opt.label}</span>
                          {opt.id === 'smart_budget' && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                              Value-First
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-black text-blue-700">
                          ₹{totalCost.toLocaleString()}
                          <span className="text-[10px] font-bold text-slate-400"> / total</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          ~₹{opt.perDay.toLocaleString()} per day
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug">{opt.desc}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Custom Budget Slider / Input */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Or Set Custom Total Budget:
                    </span>
                    <span className="text-base font-black text-slate-900">
                      ₹{customBudgetAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="60000"
                    step="500"
                    value={customBudgetAmount}
                    onChange={(e) => {
                      setCustomBudgetAmount(Number(e.target.value))
                      setBudgetTier('custom')
                    }}
                    style={{
                     background: `linear-gradient(to right, #2563eb ${((customBudgetAmount - 1500) / (60000 - 1500)) * 100}%, #e2e8f0 ${((customBudgetAmount - 1500) / (60000 - 1500)) * 100}%)`,
                    }}
                    className="w-full h-2 appearance-none rounded-full bg-slate-200 accent-blue-600 cursor-pointer focus:outline-none [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>₹1,500 (Budget Solo)</span>
                    <span>₹15,000 (Family Comfort)</span>
                    <span>₹50,000+ (Palatial)</span>
                  </div>
                </div>

                {/* Estimated Budget Allocation Preview (Requirement 7) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-black uppercase tracking-widest text-blue-700">
                    Suggested Estimated Allocation (~₹{resolvedBudgetAmount.toLocaleString()})
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Stay (~40%)</div>
                      <div className="font-bold text-slate-900 mt-1">₹{Math.round(resolvedBudgetAmount * 0.4).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Food (~25%)</div>
                      <div className="font-bold text-slate-900 mt-1">₹{Math.round(resolvedBudgetAmount * 0.25).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Transit (~18%)</div>
                      <div className="font-bold text-slate-900 mt-1">₹{Math.round(resolvedBudgetAmount * 0.18).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Tickets (~10%)</div>
                      <div className="font-bold text-slate-900 mt-1">₹{Math.round(resolvedBudgetAmount * 0.1).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Buffer (~7%)</div>
                      <div className="font-bold text-slate-900 mt-1">₹{Math.round(resolvedBudgetAmount * 0.07).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    * Estimates based on verified ASI tickets and typical local transportation rates.
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Local Transportation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: TRANSPORTATION ── */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    How will you travel locally in {destinationData?.name}?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Transportation speeds and waiting buffers affect route feasibility and transit cost.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {transportOptions.map((opt) => {
                    const isSel = transportMode === opt.id
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setTransportMode(opt.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                          isSel
                            ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{opt.icon}</span>
                          {isSel && <Check size={16} className="text-blue-600 font-black" />}
                        </div>
                        <div className="text-sm font-black text-slate-900">{opt.label}</div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Food Stops Toggle */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <UtensilsCrossed size={14} className="text-amber-600" />
                      <span>Include Curated Lunch & Food Breaks in Itinerary</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Inserts a 60-minute midday rest stop at authentic local thali or legendary eateries.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeFoodStops}
                    onChange={(e) => setIncludeFoodStops(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Travel Styles</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 5: TRAVEL STYLE ── */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    What kind of trip do you want?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Select all that match your travel personality. Used for intelligent recommendation scoring.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {styleOptions.map((style) => {
                    const isSel = selectedStyles.includes(style)
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => {
                          if (isSel) {
                            setSelectedStyles(selectedStyles.filter((s) => s !== style))
                          } else {
                            setSelectedStyles([...selectedStyles, style])
                          }
                        }}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                          isSel
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isSel && <Check size={14} strokeWidth={3} />}
                        <span>{style}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Select Places ({Object.keys(selectedPlaces).length} chosen)</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 6: SELECT PLACES (THE MOST IMPORTANT PART) ── */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 font-display">
                        Choose Your Places in {destinationData?.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Set your priorities: <span className="text-rose-600 font-bold">❤️ Must Visit</span> (Hard constraint), <span className="text-blue-600 font-bold">☆ Want to Visit</span>, or <span className="text-slate-500 font-bold">○ Optional</span>.
                      </p>
                    </div>

                    {/* Quick Priority Summary Counter */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black">
                        ❤️ {mustVisitCount} Must
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black">
                        ☆ {wantVisitCount} Want
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-black">
                        ○ {optionalCount} Opt
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
                  {[
                    { id: 'all', label: 'All Sights' },
                    { id: 'must_see', label: 'UNESCO & Icons' },
                    { id: 'heritage', label: 'Palaces & Forts' },
                    { id: 'temples', label: 'Temples & Shrines' },
                    { id: 'nature', label: 'Gardens & Lakes' },
                    { id: 'craft', label: 'Artisans & Bazaars' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveCategoryFilter(filter.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        activeCategoryFilter === filter.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Sights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPlaces.map((place) => {
                    const priority = selectedPlaces[place.id]
                    return (
                      <div
                        key={place.id}
                        className={`rounded-2xl border transition-all p-4 flex gap-4 ${
                          priority === 'must_visit'
                            ? 'border-rose-400 bg-rose-50/20 shadow-sm'
                            : priority === 'want_to_visit'
                            ? 'border-blue-400 bg-blue-50/20 shadow-sm'
                            : priority === 'optional'
                            ? 'border-slate-300 bg-slate-50/50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                          <img
                            src={place.images[0]}
                            alt={place.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (place.images[1]) {
                                ;(e.currentTarget as HTMLImageElement).src = place.images[1]
                              } else if (destinationData?.heroBanner) {
                                ;(e.currentTarget as HTMLImageElement).src = destinationData.heroBanner
                              }
                            }}
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] font-black bg-black/70 text-white px-1.5 py-0.2 rounded">
                            ★ {place.rating}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-black uppercase text-blue-600">
                                {place.categoryLabel}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500">
                                {place.timeRequired}
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 truncate mt-0.5">
                              {place.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                              {place.tagline}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                            <span className="font-extrabold text-slate-700">
                              {place.entryFee?.indian === 0 ? 'Free Entry' : `₹${place.entryFee?.indian}`}
                            </span>

                            {/* Priority Action Toggles (Three Levels of User Control) */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setSpecificPriority(
                                    place.id,
                                    priority === 'must_visit' ? 'remove' : 'must_visit'
                                  )
                                }
                                title="Mark Must Visit (Hard constraint)"
                                className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                                  priority === 'must_visit'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600'
                                }`}
                              >
                                ❤️ Must
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setSpecificPriority(
                                    place.id,
                                    priority === 'want_to_visit' ? 'remove' : 'want_to_visit'
                                  )
                                }
                                title="Mark Want to Visit (High priority)"
                                className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                                  priority === 'want_to_visit'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600'
                                }`}
                              >
                                ☆ Want
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setSpecificPriority(
                                    place.id,
                                    priority === 'optional' ? 'remove' : 'optional'
                                  )
                                }
                                title="Mark Optional (Fills remaining capacity)"
                                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                  priority === 'optional'
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                                }`}
                              >
                                ○ Opt
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Smart Recommendations Section (Requirement 12) */}
                {recommendations.personalizedRecommendations.length > 0 && (
                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-blue-900">
                          Based on your interests, you may also like:
                        </h4>
                      </div>
                      <span className="text-[10px] text-blue-600 font-bold">Unselected Sights</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {recommendations.personalizedRecommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-black text-slate-900 truncate">{rec.name}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">{rec.timeRequired}</div>
                          </div>
                          <button
                            onClick={() => setSpecificPriority(rec.id, 'want_to_visit')}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 transition-colors cursor-pointer shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Hotel & Review</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 7: HOTEL BASE & CONSTRAINT SUMMARY REVIEW ── */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    Select Your Starting Base in {destinationData?.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Your daily itinerary starts from and returns to this base to eliminate unnecessary transit.
                  </p>
                </div>

                {/* Hotel categories */}
                <div className="grid grid-cols-1 gap-3">
                  {([
                    { id: 'budget', label: 'Low Cost' },
                    { id: 'comfort', label: 'Medium Range' },
                    { id: 'luxury', label: 'Luxury' },
                    { id: 'ultra_luxury', label: 'Ultra Luxury' },
                  ] as const).map((tier) => {
                    const staysInTier = (destinationData?.stays || []).filter((stay) => stay.tier === tier.id)
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setOpenHotelTier(tier.id)}
                        className="flex items-center justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer"
                      >
                        <span className="block text-base font-black uppercase tracking-wide text-slate-900">{tier.label}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase text-slate-500">
                          {staysInTier.length} {staysInTier.length === 1 ? 'Hotel' : 'Hotels'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {openHotelTier && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md">
                    <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl">
                      {(() => {
                        const tier = ([
                          { id: 'budget', label: 'Low Cost' },
                          { id: 'comfort', label: 'Medium Range' },
                          { id: 'luxury', label: 'Luxury' },
                          { id: 'ultra_luxury', label: 'Ultra Luxury' },
                        ] as const).find((item) => item.id === openHotelTier)
                        const staysInTier = (destinationData?.stays || [])
                          .filter((stay) => stay.tier === openHotelTier)
                          .sort((a, b) => a.pricePerNight - b.pricePerNight)
                        return (
                          <>
                            <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                              <div>
                                <h4 className="text-xl font-black text-slate-900">{tier?.label} Hotels</h4>
                                <p className="mt-1 text-xs font-medium text-slate-500">Choose your starting base from this category.</p>
                              </div>
                              <button type="button" onClick={() => setOpenHotelTier(null)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer" aria-label="Close hotel category">
                                <X size={20} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {staysInTier.map((stay) => {
                    const isSel = selectedHotelId === stay.id
                    return (
                      <div
                        key={stay.id}
                        onClick={() => {
                          setSelectedHotelId(stay.id)
                          setSelectedHotelDetails(stay)
                        }}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 ${
                          isSel
                            ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={stay.image}
                            alt={stay.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (destinationData?.heroBanner) {
                                ;(e.currentTarget as HTMLImageElement).src = destinationData.heroBanner
                              }
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-slate-900 truncate">{stay.name}</h4>
                          <span className="text-xs font-bold text-amber-600">★ {stay.rating}</span>
                        </div>
                        <div className="text-sm font-black text-blue-700">
                          ₹{stay.pricePerNight.toLocaleString()}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                        </div>
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600">
                          {stay.tier === 'ultra_luxury' ? 'Ultra Luxury' : stay.tier === 'luxury' ? 'Luxury' : stay.tier === 'comfort' ? 'Medium Range' : 'Low Cost'}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{stay.address}</p>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelectedHotelDetails(stay)
                          }}
                          className="w-full rounded-lg border border-blue-200 bg-blue-50 py-1.5 text-[10px] font-black text-blue-700 hover:bg-blue-100"
                        >
                          View Full Stay Details
                        </button>
                      </div>
                    )
                              })}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                )}

                {selectedHotelDetails && (
                  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
                    <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
                      {(() => {
                        const stay = selectedHotelDetails
                        const galleryImages = Array.from(new Set([
                          stay.image,
                          ...(stay.galleryImages || []),
                          ...(destinationData?.heroGallery || []),
                        ])).slice(0, 8)
                        const galleryVideos = stay.galleryVideos || []
                        return (
                          <>
                            <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
                              <img src={stay.image} alt={stay.name} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
                              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4 text-white">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">{stay.typeLabel || 'Hotel profile'}</p>
                                  <h3 className="mt-1 text-2xl font-black">{stay.name}</h3>
                                </div>
                                <button type="button" onClick={() => setSelectedHotelDetails(null)} className="rounded-xl bg-white/20 p-2 backdrop-blur hover:bg-white/35" aria-label="Close hotel details">
                                  <X size={20} />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-6 p-5 sm:p-7">
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <div className="rounded-2xl bg-blue-50 p-3"><div className="text-[10px] font-black uppercase text-blue-600">From</div><div className="mt-1 text-lg font-black text-slate-900">₹{stay.pricePerNight.toLocaleString()}<span className="text-[10px] font-medium text-slate-500"> / night</span></div></div>
                                <div className="rounded-2xl bg-amber-50 p-3"><div className="text-[10px] font-black uppercase text-amber-600">Rating</div><div className="mt-1 flex items-center gap-1 text-lg font-black text-slate-900"><Star size={15} className="fill-amber-400 text-amber-400" /> {stay.rating.toFixed(1)}</div></div>
                                <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-[10px] font-black uppercase text-emerald-600">Reviews</div><div className="mt-1 text-lg font-black text-slate-900">{(stay.reviewsCount || 0).toLocaleString()}</div></div>
                                <div className="rounded-2xl bg-violet-50 p-3"><div className="text-[10px] font-black uppercase text-violet-600">Category</div><div className="mt-1 text-sm font-black text-slate-900">{stay.tier === 'ultra_luxury' ? 'Ultra Luxury' : stay.tier === 'luxury' ? 'Luxury' : stay.tier === 'comfort' ? 'Medium Range' : 'Low Cost'}</div></div>
                              </div>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 p-4">
                                  <h4 className="mb-3 text-sm font-black text-slate-900">Hotel information</h4>
                                  <div className="space-y-3 text-xs text-slate-600">
                                    <div className="flex gap-2"><MapPin size={16} className="shrink-0 text-blue-600" /><span>{stay.address}</span></div>
                                    <div className="flex gap-2"><Phone size={16} className="shrink-0 text-blue-600" /><span>{stay.contactPhone || '+91 1800 123 4567'}</span></div>
                                    <div className="flex gap-2"><UserRound size={16} className="shrink-0 text-blue-600" /><span>Owner: {stay.ownerName || 'Verified hotel management'}</span></div>
                                  </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 p-4">
                                  <h4 className="mb-3 text-sm font-black text-slate-900">Amenities</h4>
                                  <div className="flex flex-wrap gap-2">{stay.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{amenity}</span>)}</div>
                                </div>
                              </div>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                  <h4 className="mb-2 text-sm font-black text-slate-900">About this stay</h4>
                                  <p className="text-xs leading-5 text-slate-600">
                                    {stay.description || `${stay.name} is a ${stay.typeLabel?.toLowerCase() || 'comfortable stay'} designed for travellers exploring ${destinationData?.name || 'the destination'}. Enjoy convenient access to local landmarks, attentive hospitality, and the amenities listed above.`}
                                  </p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                  <h4 className="mb-2 text-sm font-black text-slate-900">Stay details</h4>
                                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Check-in</span><strong className="text-slate-800">2:00 PM</strong></div>
                                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Check-out</span><strong className="text-slate-800">11:00 AM</strong></div>
                                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Guest capacity</span><strong className="text-slate-800">2 guests / room</strong></div>
                                    <div><span className="block text-[10px] font-black uppercase text-slate-400">Booking</span><strong className="text-slate-800">Instant confirmation</strong></div>
                                  </div>
                                </div>
                              </div>
                              <div className="rounded-2xl border border-slate-200 p-4">
                                <div className="mb-3 flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-600" /><h4 className="text-sm font-black text-slate-900">Guest policies & nearby places</h4></div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2 text-xs text-slate-600">
                                    <p>• Government ID required at check-in</p>
                                    <p>• Complimentary cancellation up to 24 hours before arrival</p>
                                    <p>• Quiet hours: 10:00 PM – 7:00 AM</p>
                                    <p>• 24-hour front desk and local transfer assistance</p>
                                  </div>
                                  <div className="space-y-2 text-xs text-slate-600">
                                    {stay.distanceToItineraryHighlights.length > 0
                                      ? stay.distanceToItineraryHighlights.slice(0, 3).map((place) => (
                                        <p key={place.placeId}><strong className="text-slate-800">{place.placeName}</strong> · {place.distanceKm} km · {place.drivingTimeMin} min drive</p>
                                      ))
                                      : <p>Conveniently located near the destination's key sightseeing spots.</p>}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="mb-3 flex items-center gap-2"><Images size={18} className="text-blue-600" /><h4 className="text-sm font-black text-slate-900">Gallery</h4></div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{galleryImages.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${stay.name} gallery ${index + 1}`} className="h-28 w-full rounded-xl object-cover" onError={(e) => { e.currentTarget.src = stay.image }} />)}</div>
                                {galleryVideos.length > 0 ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{galleryVideos.map((video) => <div key={video} className="overflow-hidden rounded-xl border border-slate-200"><iframe className="h-48 w-full" src={video} title={`${stay.name} video`} allowFullScreen /></div>)}</div> : <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><Play size={15} className="text-blue-600" /> Video tours will appear here when provided by the hotel.</div>}
                              </div>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                )}

                {/* Pre-Trip Constraint Summary Card (Requirement 44) */}
                <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-amber-400">
                        Trip Specification Summary
                      </div>
                      <h4 className="text-lg font-black font-display text-white mt-0.5">
                        {destinationData?.name} · {daysCount} Days
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Target Budget</div>
                      <div className="text-base font-black text-emerald-400">
                        ₹{resolvedBudgetAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Must Visit Sights</div>
                      <div className="text-base font-black text-rose-400 mt-1">
                        {mustVisitCount} Hard Constraints
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Want & Optional</div>
                      <div className="text-base font-black text-blue-400 mt-1">
                        {wantVisitCount + optionalCount} Sights
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Local Transport</div>
                      <div className="text-base font-black text-amber-400 mt-1 capitalize">
                        {transportMode.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Daily Sightseeing</div>
                      <div className="text-base font-black text-white mt-1">
                        {dailyTime.startTime} – {dailyTime.endTime}
                      </div>
                    </div>
                  </div>

                  {/* Big CTA */}
                  <div className="pt-2">
                    <button
                      onClick={handleBuildJourney}
                      className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-[#E5293E] via-rose-600 to-amber-600 hover:from-[#D01D32] hover:to-amber-700 shadow-xl cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-[0.99]"
                    >
                      <Sparkles size={18} />
                      <span>BUILD MY JOURNEY</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Back to Sights
                  </button>
                </div>
              </div>
          )}
          </div>
        )}

        {/* ── Generation Error State ── */}
        {generationError && (
          <div className="bg-white rounded-3xl p-8 border border-rose-200 shadow-sm flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
              <AlertCircle size={28} className="text-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-1">Couldn't Build Your Journey</h3>
              <p className="text-sm text-slate-500 font-medium max-w-md">{generationError}</p>
            </div>
            <button
              onClick={() => {
                setGenerationError(null)
                setCurrentStep(6)
              }}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Go Back & Choose Sights</span>
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            MODE B: GENERATED JOURNEY ITINERARY & INTERACTIVE MAP VIEW
        ══════════════════════════════════════════════════════════════ */}
        {isGenerated && plannedTrip && (
          <div className="space-y-6">
            {/* ── Top Bar: Day Selector & Health Score Badge ── */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-600 mb-1">
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                      <Sparkles size={12} />
                      <span>Optimized Itinerary</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">
                      <MapPin size={12} className="text-rose-600" />
                      <span>{destinationData?.name}, {destinationData?.state}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                    {plannedTrip.tripTitle}
                  </h2>
                  <div className="text-xs text-slate-500 font-medium mt-1 flex flex-wrap items-center gap-3">
                    <span>Base: <strong className="text-slate-800">{plannedTrip.selectedHotel?.name || 'Hotel Base'}</strong></span>
                    <span>·</span>
                    <span>Mode: <strong className="text-amber-700 capitalize">{transportMode.replace('_', ' ')}</strong></span>
                    <span>·</span>
                    <span>Estimated Spend: <strong className="text-emerald-600">₹{plannedTrip.budgetBreakdown.totalEstimated.toLocaleString()}</strong></span>
                  </div>
                </div>

                {/* Health Score Clickable Badge & Change City */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsGenerated(false)
                      setCurrentStep(1)
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Change Destination"
                  >
                    <MapPin size={13} className="text-rose-600" />
                    <span>Change City</span>
                  </button>

                  <button
                    onClick={() => setShowExplanationModal(true)}
                    className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left cursor-pointer flex items-center gap-3 shrink-0"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        Plan Health
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-600">
                        {plannedTrip.health.score}/100 · {plannedTrip.health.label}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Quick Config Bar: Instant Duration & Transport Tuning without Wizard */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Duration Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Trip Duration:</span>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => handleQuickChangeDays(d)}
                        className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                          daysCount === d
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Transit:</span>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {[
                      { id: 'mixed' as TransportMode, label: 'Mixed', icon: '🛺' },
                      { id: 'auto_rickshaw' as TransportMode, label: 'Auto', icon: '🛺' },
                      { id: 'cab' as TransportMode, label: 'Cab', icon: '🚕' },
                      { id: 'walking' as TransportMode, label: 'Walk', icon: '🚶' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleQuickChangeTransport(t.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          transportMode === t.id
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Day Tabs Switcher ── */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 no-scrollbar">
              {plannedTrip.days.map((day, idx) => {
                const isSel = activeDayIdx === idx
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayIdx(idx)}
                    className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isSel
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{day.dateLabel}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSel ? 'bg-white/20' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {day.stops.length} Stops
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Itinerary vs Map Switcher */}
            <div className="lg:hidden flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setMobileTab('itinerary')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  mobileTab === 'itinerary' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Itinerary Timeline
              </button>
              <button
                onClick={() => setMobileTab('map')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  mobileTab === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Interactive Map
              </button>
            </div>

            {/* ── Main Two-Column View: Timeline (Left 7 cols) & Map + Metrics (Right 5 cols) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Day Itinerary Stops */}
              <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'map' ? 'hidden lg:block' : 'block'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {plannedTrip.days[activeDayIdx]?.themeTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Drag, lock 🔒, move, or add places to this day.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <span className="text-[11px] font-bold text-slate-500">Live time: {formatLiveClock}</span>
                    <button
                      onClick={() => setShowSOSPanel(true)}
                      className="px-4 py-2 rounded-xl text-xs font-black text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer bg-rose-600 hover:bg-rose-700"
                    >
                      <AlertCircle size={14} />
                      <span>SOS</span>
                    </button>
                    <button
                      onClick={() => setShowGuidePanel(true)}
                      className="px-4 py-2 rounded-xl text-xs font-black text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer bg-blue-600 hover:bg-blue-700"
                    >
                      <UserRound size={14} />
                      <span>Book a Guide</span>
                    </button>
                    <button
                      onClick={startCurrentDay}
                      className={`px-4 py-2 rounded-xl text-xs font-black text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        startedDays[activeDayIdx] ? 'bg-emerald-600' : 'bg-rose-600 hover:bg-rose-700'
                      }`}
                    >
                      <Clock size={14} />
                      <span>{startedDays[activeDayIdx] ? 'Day In Progress' : 'Start Day'}</span>
                    </button>
                    <button
                      onClick={handleOptimizeCurrentDay}
                      className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Zap size={14} />
                      <span>⚡ Optimize Day Route</span>
                    </button>
                  </div>
                </div>

                {startedDays[activeDayIdx] && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-900">
                    <div className="flex items-center gap-2 font-black">
                      <Clock size={14} />
                      <span>Live route timing is anchored to your {formatLiveClock} start.</span>
                    </div>
                    <p className="mt-1 font-medium">
                      Travel legs include route distance and a time-of-day traffic buffer. Actual arrival can vary with live road conditions.
                    </p>
                    {nearbyLowerCrowdSuggestion && (
                      <p className="mt-2 font-bold text-emerald-800">
                        Suggestion: {nearbyLowerCrowdSuggestion.place.name} is about {nearbyLowerCrowdSuggestion.distanceKm.toFixed(1)} km away and is marked for a quieter visit at {formatBestTimeToVisit(nearbyLowerCrowdSuggestion.place.bestTimeToVisit) || 'a quieter time'}.
                      </p>
                    )}
                  </div>
                )}

                {/* Day Metrics Quick Bar (Requirement 30) */}
                <div className="grid grid-cols-5 gap-2 p-3 bg-white rounded-2xl border border-slate-200 text-center text-xs shadow-xs">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Distance</div>
                    <div className="font-black text-amber-600 mt-0.5">
                      {plannedTrip.days[activeDayIdx]?.totalDistanceKm} km
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Transit</div>
                    <div className="font-black text-blue-600 mt-0.5">
                      ~{plannedTrip.days[activeDayIdx]?.totalTravelTimeMin}m
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Sightseeing</div>
                    <div className="font-black text-purple-600 mt-0.5">
                      {Math.round((plannedTrip.days[activeDayIdx]?.totalSightseeingTimeMin || 0) / 60)}h
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Est. Spend</div>
                    <div className="font-black text-emerald-600 mt-0.5">
                      ₹{plannedTrip.days[activeDayIdx]?.totalDaySpend}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Free Buffer</div>
                    <div className="font-black text-slate-700 mt-0.5">
                      {Math.round((plannedTrip.days[activeDayIdx]?.freeTimeMin || 0) / 60)}h
                    </div>
                  </div>
                </div>

                {/* Stops Timeline */}
                <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-4">
                  {plannedTrip.days[activeDayIdx]?.stops
                    .map((stop, originalIndex) => ({ stop, originalIndex }))
                    .sort((a, b) => {
                      const aVisited = Boolean(visitedAt[a.stop.id])
                      const bVisited = Boolean(visitedAt[b.stop.id])
                      if (aVisited !== bVisited) return aVisited ? -1 : 1
                      return a.originalIndex - b.originalIndex
                    })
                    .map(({ stop, originalIndex: idx }) => {
                    const isSelectedOnMap = selectedMapPinId === stop.id
                    const isCompleted = Boolean(visitedAt[stop.id])
                    const isCurrent =
                      startedDays[activeDayIdx] && stop.id === currentLiveStopId
                    const liveStatusClass = isCompleted
                      ? 'border-emerald-500 bg-emerald-50/60'
                      : isCurrent
                        ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-400/20'
                        : ''

                    // ── SPECIAL RENDERING: MIDDAY REGIONAL LUNCH & CULINARY BREAK ──
                    if (stop.isMealStop) {
                      const lunchSpots = destinationData?.foodSpots || []
                      return (
                        <div
                          key={stop.id}
                          onClick={() => setSelectedMapPinId(stop.id)}
                          className={`relative group rounded-3xl p-5 border-2 transition-all cursor-pointer bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-white ${liveStatusClass || (
                            isSelectedOnMap
                              ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-400/20'
                              : 'border-emerald-200/90 shadow-sm hover:border-emerald-300'
                          )}`}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full border-4 border-white bg-emerald-500 shadow-sm ring-2 ring-emerald-500/30" />

                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1.5">
                                  <UtensilsCrossed size={12} />
                                  <span>{stop.timeSlot}</span>
                                </span>
                                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                  Midday Culinary Break (60 Mins)
                                </span>
                              </div>
                              <span className="text-xs font-bold text-slate-500">Est. ₹250 – ₹450 / person</span>
                            </div>

                            <div>
                              <h4 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                                <span>Authentic Regional Lunch & Rest Break</span>
                              </h4>
                              <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                                Recharge during the midday hours with authentic local food, regional thali, and refreshing drinks near your morning trail.
                              </p>
                            </div>

                            {/* Curated Nearby Lunch Spots */}
                            {lunchSpots.length > 0 && (
                              <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                                <div className="text-[11px] font-black uppercase tracking-wider text-emerald-900 flex items-center justify-between">
                                  <span>📍 Recommended Lunch Spots In {destinationData?.name}:</span>
                                  <span className="text-[10px] text-emerald-700 font-bold lowercase">near today's sights</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {lunchSpots.slice(0, showMoreLunchSpots ? undefined : 2).map((spot) => (
                                    <div
                                      key={spot.id}
                                      className="p-2.5 rounded-2xl bg-white/95 border border-emerald-200/70 shadow-2xs hover:border-emerald-400 transition-all space-y-1.5"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <img
                                          src={spot.image}
                                          alt={spot.name}
                                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                                          onError={(e) => {
                                            if (destinationData?.heroBanner) {
                                              ;(e.currentTarget as HTMLImageElement).src = destinationData.heroBanner
                                            }
                                          }}
                                        />
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center justify-between">
                                            <div className="text-xs font-black text-slate-900 truncate">{spot.name}</div>
                                            <span className="text-[10px] font-black text-amber-600 shrink-0">★ {spot.rating}</span>
                                          </div>
                                          <div className="text-[10px] text-slate-500 truncate">{spot.cuisineType}</div>
                                          <div className="text-[10px] font-bold text-emerald-700">₹{spot.priceForTwo} for two</div>
                                        </div>
                                      </div>

                                      {Array.isArray(spot.mustTryDishes) && spot.mustTryDishes.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {spot.mustTryDishes.slice(0, 2).map((dish, dIdx) => (
                                            <span
                                              key={dIdx}
                                              className="text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded"
                                            >
                                              Try: {dish}
                                            </span>
                                          ))}
                                        </div>
                                      )}

                                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                                        <span className="text-slate-500 font-medium truncate max-w-[140px]">
                                          {spot.address?.split(',')[0] || destinationData?.name || 'Nearby dining'}
                                        </span>
                                        <span className="font-bold text-emerald-700 shrink-0">
                                          {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {lunchSpots.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => setShowMoreLunchSpots((isShown) => !isShown)}
                                    className="mx-auto flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-[10px] font-black text-emerald-800 transition-colors hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer"
                                  >
                                    <span>{showMoreLunchSpots ? 'Show Less' : 'Show More Restaurants'}</span>
                                    {showMoreLunchSpots ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    }

                    // ── STANDARD ATTRACTION STOP RENDERING ──
                    const stopPlace = destinationData?.places.find((place) => place.id === stop.placeId)
                    const recommendedVisitTime = formatBestTimeToVisit(stopPlace?.bestTimeToVisit)

                    return (
                      <div
                        key={stop.id}
                        onClick={() => setSelectedMapPinId(stop.id)}
                        className={`relative group rounded-2xl p-4 border transition-all cursor-pointer ${
                          liveStatusClass ||
                          isSelectedOnMap
                            ? 'bg-blue-50/50 border-blue-400 shadow-md ring-2 ring-blue-400/20'
                            : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-2 bg-blue-600 ring-blue-600/30" />

                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {(isCompleted || isCurrent) && (
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                  isCompleted ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                                }`}>
                                  {isCompleted ? 'Visited' : 'Next Visit'}
                                </span>
                              )}
                              <label
                                className="inline-flex items-center gap-1.5 text-[11px] font-black px-2 py-1 rounded bg-blue-100 text-blue-800 cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                                title="Choose your preferred visit start time. Later visits will be adjusted automatically."
                              >
                                <Clock size={12} />
                                <span className="text-[10px] uppercase tracking-wide">Your time</span>
                                <span>{formatScheduleTime(parseScheduleTime(stop.startTime || stop.timeSlot))}</span>
                                <input
                                  type="time"
                                  value={getTimeInputValue(stop.startTime || stop.timeSlot)}
                                  onChange={(e) => handleChangeStopTime(idx, e.target.value)}
                                  className="sr-only"
                                  aria-label={`Preferred start time for ${stop.placeName}`}
                                />
                                <span>– {formatScheduleTime(parseScheduleTime(stop.endTime))}</span>
                              </label>
                              <label
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase"
                                onClick={(e) => e.stopPropagation()}
                                title="Set how long you want to spend at this location"
                              >
                                <input
                                  type="number"
                                  min="15"
                                  max="720"
                                  step="15"
                                  value={stop.durationMin}
                                  onChange={(e) => handleChangeStopDuration(idx, e.target.value)}
                                  className="w-14 rounded border border-slate-200 bg-white px-1 py-0.5 text-center font-black text-slate-700 outline-blue-500"
                                  aria-label={`Visit duration in minutes for ${stop.placeName}`}
                                />
                                <span>mins</span>
                              </label>
                              {stop.priority === 'must_visit' && (
                                <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                  ❤️ Must Visit
                                </span>
                              )}
                            </div>

                            {recommendedVisitTime && (
                              <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-lg inline-flex items-center gap-1 font-semibold">
                                <Sparkles size={12} />
                                <span>Recommended: {recommendedVisitTime}</span>
                              </div>
                            )}

                            <h4 className="text-base font-black text-slate-900">
                              {stop.placeName}
                            </h4>

                            {stop.notes && (
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                {stop.notes}
                              </p>
                            )}

                            {stop.explanation && (
                              <div className="text-[11px] text-blue-700 bg-blue-50/60 px-2 py-1 rounded-lg inline-flex items-center gap-1 font-semibold">
                                <Info size={12} />
                                <span>{stop.explanation}</span>
                              </div>
                            )}
                          </div>

                          {/* Stop Editing Controls: Move Up, Move Down, Lock, Delete */}
                          <div className="flex items-center gap-1 shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleLockStop(stop.id)
                              }}
                              title={stop.locked ? 'Unlock Stop' : 'Lock Stop to Time/Order'}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                                stop.locked
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'hover:bg-slate-200 text-slate-400'
                              }`}
                            >
                              {stop.locked ? <Lock size={13} /> : <Unlock size={13} />}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveStop(idx, 'up')
                              }}
                              disabled={idx === 0 || stop.locked}
                              title="Move Earlier"
                              className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoveStop(idx, 'down')
                              }}
                              disabled={idx === (plannedTrip.days[activeDayIdx]?.stops.length || 0) - 1 || stop.locked}
                              title="Move Later"
                              className="w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronDown size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveStop(idx)
                              }}
                              title="Remove Stop"
                              className="w-7 h-7 rounded-lg hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-400 cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Info: Cost & Travel from Previous */}
                        <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1 text-slate-800 font-bold">
                            <Wallet size={13} className="text-emerald-600" />
                            <span>{stop.estimatedCost === 0 ? 'Free Entry' : `Est. ₹${stop.estimatedCost}`}</span>
                          </span>

                          {stop.travelFromPrevMin > 0 && (
                            <span className="text-[11px] text-slate-400">
                              ↓ ~{stop.travelFromPrevMin}m transit ({stop.distanceFromPrevKm} km)
                            </span>
                          )}
                        </div>
                      </div>
                    )
                    })}
                </div>

                {/* + Add Stop to Day Button */}
                <button
                  onClick={() => setShowAddPlaceModal(true)}
                  className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-600 hover:text-blue-600 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Plus size={16} />
                  <span>+ Add Place to {plannedTrip.days[activeDayIdx]?.dateLabel}</span>
                </button>

                {/* Local artisan marketplace */}
                <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-slate-700">
                      <Sparkles size={14} className="text-amber-600" />
                      <span>Shop Local Artifacts in {destinationData?.name}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-emerald-600">✓ Verified by Trippin' Bharat</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Discover authentic handmade products from verified local artisans, support traditional makers, and take home a meaningful piece of {destinationData?.name}.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {artifactShopRecommendations.slice(0, showMoreLocalArtifactShops ? undefined : 3).map((shop) => (
                      <button type="button" key={shop.name} onClick={() => setSelectedArtifactShop(shop)} className="text-left rounded-2xl border border-amber-200 bg-amber-50/40 p-2.5 space-y-2 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer">
                        <div className="relative">
                          <img src={shop.image} alt={shop.name} className="h-24 w-full rounded-xl object-cover" />
                          <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[8px] font-black uppercase text-white">Verified</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-[11px] font-black leading-tight text-slate-900">{shop.name}</h5>
                          <span className="shrink-0 text-[9px] font-bold text-amber-700">Local</span>
                        </div>
                        <span className="inline-flex rounded-full bg-white px-2 py-1 text-[9px] font-bold text-amber-800">{shop.specialty}</span>
                        <p className="text-[10px] leading-4 text-slate-600">{shop.description}</p>
                        <div className="flex items-center justify-between border-t border-amber-200 pt-1.5 text-[9px] text-slate-500">
                          <span>{shop.nearestRouteDistanceKm} km from route</span>
                          <span className={`font-black ${shop.available ? 'text-emerald-700' : 'text-rose-600'}`}>{shop.available ? formatOpeningWindow(shop.openingMinutes, shop.closingMinutes) : 'Limited today'}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {artifactShopRecommendations.length > 3 && (
                    <button type="button" onClick={() => setShowMoreLocalArtifactShops((isShown) => !isShown)} className="mx-auto flex items-center gap-1.5 rounded-xl border border-amber-200 bg-white px-4 py-2 text-[10px] font-black text-amber-800 transition-colors hover:border-amber-400 hover:bg-amber-50 cursor-pointer">
                      <span>{showMoreLocalArtifactShops ? 'Show Less Shops' : 'Show More Shops'}</span>
                      {showMoreLocalArtifactShops ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  )}
                </div>

                {/* ══════════════════════════════════════════════════════════════
                    DONE ROAMING FOR THE DAY? EVENING DINNER & TONIGHT'S REST
                ══════════════════════════════════════════════════════════════ */}
                <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                        <Moon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                          Evening Post-Roaming Plan
                        </div>
                        <h4 className="text-lg font-black font-display text-slate-900">
                          Done Roaming for {plannedTrip.days[activeDayIdx]?.dateLabel}? Dinner & Tonight's Rest
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full self-start sm:self-auto">
                      🌙 Day Wraps ~{plannedTrip.days[activeDayIdx]?.endTime}
                    </span>
                  </div>

                  {/* PART 1: Nearby Dinner Restaurants */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <UtensilsCrossed size={14} className="text-amber-600" />
                        <span>Recommended Dinner Spots in {destinationData?.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Open for evening dining</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(destinationData?.foodSpots || [])
                        .slice(0, showMoreDinnerSpots ? undefined : 3)
                        .map((spot) => (
                        <div
                          key={spot.id}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-2 group"
                        >
                          <div className="flex gap-3">
                            <img
                              src={spot.image}
                              alt={spot.name}
                              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                if (destinationData?.heroBanner) {
                                  ;(e.currentTarget as HTMLImageElement).src = destinationData.heroBanner
                                }
                              }}
                            />
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-black text-slate-900 truncate">{spot.name}</h5>
                                <span className="text-[10px] font-black text-amber-600 shrink-0">★ {spot.rating}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">{spot.cuisineType}</p>
                              <div className="text-[11px] font-black text-emerald-600">
                                ₹{spot.priceForTwo} for two · <span className="text-slate-500 font-normal">{spot.timings}</span>
                              </div>
                            </div>
                          </div>

                          {spot.specialty && (
                            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed italic">
                              "{spot.specialty}"
                            </p>
                          )}

                          {Array.isArray(spot.mustTryDishes) && spot.mustTryDishes.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {(Array.isArray(spot.mustTryDishes) ? spot.mustTryDishes : []).slice(0, 3).map((dish, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full"
                                >
                                  {dish}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500 font-medium truncate max-w-[180px]">
                              📍 {spot.address}
                            </span>
                            <span className="font-bold text-emerald-600 shrink-0">
                              {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                            </span>
                          </div>
                        </div>
                        ))}
                    </div>

                    {(destinationData?.foodSpots || []).length > 3 && (
                      <button
                        type="button"
                        onClick={() => setShowMoreDinnerSpots((isShown) => !isShown)}
                        className="mx-auto flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-black text-slate-700 transition-colors hover:border-amber-400 hover:text-amber-700 cursor-pointer"
                      >
                        <span>{showMoreDinnerSpots ? 'Show Less' : 'Show More'}</span>
                        {showMoreDinnerSpots ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Right Column: Synchronized Interactive Map & Route Flow */}
              <div className={`lg:col-span-5 space-y-5 lg:sticky lg:top-24 self-start ${mobileTab === 'itinerary' ? 'hidden lg:block' : 'block'}`}>
                {isMapExpanded && (
                  <div
                    className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-sm"
                    onClick={() => setIsMapExpanded(false)}
                    aria-hidden="true"
                  />
                )}

                {/* Visual Map Card */}
                <div
                  style={
                    isMapExpanded
                      ? {
                          position: 'fixed',
                          top: '50%',
                          left: '50%',
                          width: 'min(92vw, calc(100vh - 6rem), 780px)',
                          height: 'min(92vw, calc(100vh - 6rem), 780px)',
                          transform: 'translate(-50%, -50%)',
                        }
                      : undefined
                  }
                  className={`bg-white text-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4 relative ${
                    isMapExpanded
                      ? 'z-[100] overflow-y-auto shadow-2xl ring-4 ring-white/90'
                      : 'overflow-hidden'
                  }`}
                >
                  {/* Clean Header: Title & Sleek Controls */}
                  <div className="space-y-2.5 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          <Navigation size={15} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900 tracking-tight">Interactive Route Map</h4>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                              {coordsList.length} Stops
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-400">
                            {plannedTrip.days[activeDayIdx]?.dateLabel} Circuit
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={shareLiveLocation}
                          className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-black transition-all cursor-pointer ${
                            isSharingLocation
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100'
                          }`}
                          title={isSharingLocation ? 'Stop sharing live location' : 'Share your live location'}
                        >
                          <LocateFixed size={13} />
                          <span>{isSharingLocation ? 'Sharing Live' : 'Share Live Location'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsSatelliteView((s) => !s)}
                          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSatelliteView
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                          }`}
                          title="Toggle Satellite View"
                        >
                          <Layers size={13} />
                          <span>{isSatelliteView ? 'Satellite' : 'Road'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsMapExpanded((e) => !e)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-all cursor-pointer"
                          title={isMapExpanded ? 'Collapse' : 'Expand Fullscreen'}
                        >
                          {isMapExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        </button>
                      </div>
                    </div>
                    {locationShareMessage && (
                      <div className="flex items-center justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-bold text-blue-800">
                        <span>{locationShareMessage}</span>
                        <button type="button" onClick={() => setLocationShareMessage(null)} className="text-blue-500 hover:text-blue-900" aria-label="Dismiss location message"><X size={13} /></button>
                      </div>
                    )}

                    {/* Secondary bar: Route optimization preference + live traffic tag */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
                        <button
                          type="button"
                          onClick={() => setRoutePreference('less_traffic')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                            routePreference === 'less_traffic'
                              ? 'bg-white text-blue-600 shadow-xs'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          ⚡ Less Traffic
                        </button>
                        <button
                          type="button"
                          onClick={() => setRoutePreference('shortest')}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                            routePreference === 'shortest'
                              ? 'bg-white text-blue-600 shadow-xs'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          📍 Shortest
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{currentTrafficLabel} (×{currentTrafficMultiplier.toFixed(1)})</span>
                      </div>
                    </div>
                  </div>

                  {/* OpenStreetMap canvas with route and numbered stop markers */}
                  <div className={`relative w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner ${
                    isMapExpanded ? 'aspect-square h-auto' : 'h-[360px]'
                  }`}>
                    <div ref={mapContainerRef} className="absolute inset-0 z-0" />

                    {/* Selected Stop Details Popover inside Map */}
                    {selectedMapPinId && (
                      <div className="absolute top-3 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-lg flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-[#E5293E] text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                            {activeDayStops.findIndex((s) => s.id === selectedMapPinId) + 1}
                          </span>
                          <div className="truncate">
                            <span className="text-[9px] uppercase font-black text-rose-600 tracking-wider block">Selected Location</span>
                            <strong className="font-extrabold text-slate-900 truncate block text-xs">
                              {activeDayStops.find((s) => s.id === selectedMapPinId)?.placeName}
                            </strong>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedMapPinId(null)}
                          className="px-2 py-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tabbed Explorer: Circuit Flow / Nearby Dining / Where to Stay */}
                  <div className="space-y-3 pt-1">
                    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/70 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('flow')}
                        className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                          rightPanelTab === 'flow'
                            ? 'bg-white text-slate-900 font-black shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Route size={13} className={rightPanelTab === 'flow' ? 'text-blue-600' : ''} />
                        <span>Circuit Flow</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('dining')}
                        className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                          rightPanelTab === 'dining'
                            ? 'bg-white text-slate-900 font-black shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <UtensilsCrossed size={13} className={rightPanelTab === 'dining' ? 'text-amber-600' : ''} />
                        <span>Dining ({destinationData?.foodSpots?.length || 0})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('stays')}
                        className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                          rightPanelTab === 'stays'
                            ? 'bg-white text-slate-900 font-black shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Building2 size={13} className={rightPanelTab === 'stays' ? 'text-rose-600' : ''} />
                        <span>Stays ({destinationData?.stays?.length || 0})</span>
                      </button>
                    </div>

                    {/* Tab 1: Route Transit Flow */}
                    {rightPanelTab === 'flow' && (
                      <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 text-xs space-y-2 max-h-72 overflow-y-auto pr-1">
                        {/* Hotel Start Point */}
                        <div className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                          <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <Building2 size={13} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-black uppercase text-indigo-600 tracking-wide">Departure Point</div>
                            <div className="font-bold text-slate-900 truncate">
                              {plannedTrip.selectedHotel?.name || 'Hotel Base'}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">~{plannedTrip.days[activeDayIdx]?.startTime || '08:30 AM'}</span>
                        </div>

                        {/* Stops in sequence */}
                        {activeDayStops.map((stop, sIdx) => {
                          const isSelected = selectedMapPinId === stop.id
                          return (
                            <div key={stop.id} className="space-y-1">
                              <div className="flex items-center gap-2 pl-4 text-[10px] font-semibold text-slate-400">
                                <span className="w-1 h-3 border-l-2 border-dashed border-slate-300 ml-1.5" />
                                <span>
                                  ↓ {stop.travelFromPrevMin > 0 ? `~${stop.travelFromPrevMin}m transit (${stop.distanceFromPrevKm} km)` : 'morning departure'}
                                </span>
                              </div>
                              <div
                                onClick={() => setSelectedMapPinId(stop.id)}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/20 shadow-xs'
                                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-md font-black text-[10px] flex items-center justify-center shrink-0 ${
                                  stop.isMealStop
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isSelected
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {stop.isMealStop ? '🍴' : sIdx + 1}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-slate-900 truncate text-[11px]">
                                    {stop.isMealStop ? 'Regional Culinary Break' : stop.placeName}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium">
                                    {stop.timeSlot} · {stop.durationMin} mins
                                  </div>
                                </div>
                                {stop.estimatedCost > 0 && (
                                  <span className="text-[10px] font-bold text-emerald-600 shrink-0">
                                    ₹{stop.estimatedCost}
                                  </span>
                                )}
                              {sIdx === 0 && (() => {
                                const isSpecialityOpen = expandedLocalSpecialityStopId === stop.id
                                const localSpecialities = (destinationData?.foodSpots || []).slice(0, 3)
                                return (
                                  <div className="ml-8 rounded-xl border border-emerald-200 bg-emerald-50/60 overflow-hidden">
                                    <button type="button" onClick={() => setExpandedLocalSpecialityStopId(isSpecialityOpen ? null : stop.id)} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-[10px] font-black text-emerald-900 cursor-pointer">
                                      <span>Local Speciality near {stop.placeName}</span>
                                      {isSpecialityOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                    {isSpecialityOpen && (
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-emerald-200 p-2">
                                        {localSpecialities.map((spot) => (
                                          <div key={spot.id} className="rounded-lg border border-emerald-100 bg-white p-2">
                                            <img src={spot.image} alt={spot.name} className="h-16 w-full rounded-md object-cover" />
                                            <div className="mt-1 flex items-center justify-between gap-1"><div className="text-[10px] font-black text-slate-900 truncate">{spot.name}</div><span className="shrink-0 text-[9px] font-black text-amber-600">★ {spot.rating}</span></div>
                                            <p className="mt-0.5 text-[9px] leading-3 text-slate-500">{spot.mustTryDishes.slice(0, 2).join(' · ')}</p>
                                            <span className="mt-1 inline-flex text-[8px] font-black uppercase text-emerald-700">✓ Local pick</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })()}
                              </div>
                              {(() => {
                                const nextStop = activeDayStops[sIdx + 1]
                                const isExpanded = expandedArtisanStopId === stop.id
                                return (
                                  <div className="ml-8 rounded-xl border border-amber-200 bg-amber-50/60 overflow-hidden">
                                    <button type="button" onClick={() => setExpandedArtisanStopId(isExpanded ? null : stop.id)} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-[10px] font-black text-amber-900 cursor-pointer">
                                      <span>Nearby verified artisan shops {nextStop ? `before ${nextStop.placeName}` : `near ${stop.placeName}`}</span>
                                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                    {isExpanded && (
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-amber-200 p-2">
                                        {artisanShopProfiles.map(([name, description, image]) => (
                                          <div key={name} className="rounded-lg border border-amber-100 bg-white p-2">
                                            <img src={image} alt={name} className="h-16 w-full rounded-md object-cover" />
                                            <div className="mt-1 text-[10px] font-black text-slate-900">{name}</div>
                                            <p className="mt-0.5 text-[9px] leading-3 text-slate-500">{description}</p>
                                            <span className="mt-1 inline-flex text-[8px] font-black uppercase text-emerald-700">✓ Verified by Trippin' Bharat</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })()}
                            </div>
                          )
                        })}

                        {/* Evening Wrap */}
                        <div className="pt-1">
                          <div className="flex items-center gap-2 pl-4 text-[10px] font-semibold text-slate-400">
                            <span className="w-1 h-3 border-l-2 border-dashed border-slate-300 ml-1.5" />
                            <span>↓ ~15m transit</span>
                          </div>
                          <div className="flex items-center gap-2.5 p-2 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 mt-1">
                            <Moon size={13} className="text-amber-600 shrink-0" />
                            <span className="text-[11px] font-bold truncate">Evening Dinner & Return to Base</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Dining Directory */}
                    {rightPanelTab === 'dining' && (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 no-scrollbar text-xs">
                        {(destinationData?.foodSpots || []).map((spot) => (
                          <div
                            key={spot.id}
                            className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-amber-300 transition-all shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={spot.image}
                                alt={spot.name}
                                className="w-11 h-11 rounded-xl object-cover border border-slate-200/80 shrink-0"
                                onError={(e) => {
                                  if (destinationData?.heroBanner) {
                                    ;(e.currentTarget as HTMLImageElement).src = destinationData.heroBanner
                                  }
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-black text-slate-900 text-xs truncate">{spot.name}</span>
                                  <span className="text-[10px] font-black text-amber-600 shrink-0">★ {spot.rating}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 truncate">{spot.cuisineType}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-200/60">
                              <span className="text-emerald-700 font-black">₹{spot.priceForTwo} for two</span>
                              <span className="text-slate-500 font-medium">{spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Stays Directory */}
                    {rightPanelTab === 'stays' && (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 no-scrollbar text-xs">
                        {(destinationData?.stays || []).map((stay) => {
                          const isBase = plannedTrip.selectedHotel?.id === stay.id
                          return (
                            <div
                              key={stay.id}
                              onClick={() => handleQuickChangeHotel(stay.id)}
                              className={`p-2.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 shadow-2xs ${
                                isBase
                                  ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-400/20'
                                  : 'bg-slate-50 border-slate-200/80 hover:border-blue-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-black text-slate-900 text-xs truncate">{stay.name}</span>
                                <span className="text-[10px] font-black text-amber-600">★ {stay.rating}</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-700 font-black">₹{Number(stay.pricePerNight || 0).toLocaleString()} / night</span>
                                <button
                                  type="button"
                                  className={`text-[9px] font-black px-2 py-0.5 rounded-md transition-all ${
                                    isBase ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                  }`}
                                >
                                  {isBase ? 'Active Base' : 'Set as Base'}
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {selectedArtifactShop && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
                      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
                        <button type="button" onClick={() => setSelectedArtifactShop(null)} className="sticky top-4 z-20 float-right mr-4 -mb-12 rounded-xl bg-slate-950/65 p-2 text-white backdrop-blur transition-colors hover:bg-slate-950/85" aria-label="Close shop details"><X size={20} /></button>
                        <div className="relative h-56 overflow-hidden rounded-t-3xl">
                          <img src={selectedArtifactShop.image} alt={selectedArtifactShop.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                            <div><span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">✓ Verified by Trippin' Bharat</span><h3 className="mt-1 text-2xl font-black">{selectedArtifactShop.name}</h3></div>
                          </div>
                        </div>
                        <div className="space-y-5 p-5 sm:p-7">
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl bg-amber-50 p-3"><div className="text-[10px] font-black uppercase text-amber-700">Speciality</div><strong className="text-sm">{selectedArtifactShop.specialty}</strong></div>
                            <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-[10px] font-black uppercase text-emerald-700">Status</div><strong className="text-sm">Verified</strong></div>
                            <div className="rounded-2xl bg-blue-50 p-3"><div className="text-[10px] font-black uppercase text-blue-700">Location</div><strong className="text-sm">{destinationData?.name}</strong></div>
                            <div className="rounded-2xl bg-violet-50 p-3"><div className="text-[10px] font-black uppercase text-violet-700">Craft type</div><strong className="text-sm">Local artisan</strong></div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 p-4"><h4 className="mb-2 text-sm font-black text-slate-900">About the shop</h4><p className="text-xs leading-5 text-slate-600">{selectedArtifactShop.description}. This verified local shop works with regional makers and helps preserve traditional techniques through responsible tourism.</p></div>
                            <div className="rounded-2xl border border-slate-200 p-4"><h4 className="mb-2 text-sm font-black text-slate-900">What you can find</h4><div className="flex flex-wrap gap-2">{['Handmade products', 'Artisan-made', 'Authenticity checked', 'Gift packaging'].map((item) => <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{item}</span>)}</div></div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4"><h4 className="mb-2 text-sm font-black text-slate-900">Visitor information</h4><div className="grid grid-cols-2 gap-3 text-xs text-slate-600"><span>📍 Near your planned route in {destinationData?.name}</span><span>🕘 Open daily: {formatOpeningWindow(selectedArtifactShop.openingMinutes, selectedArtifactShop.closingMinutes)}</span><span>📞 Shop support: +91 1800 123 4567</span><span>💳 UPI, cards, and cash accepted</span></div></div>
                          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4"><h4 className="mb-1 text-sm font-black text-blue-950">Route fit for this day</h4><p className="text-xs leading-5 text-blue-900">About {selectedArtifactShop.nearestRouteDistanceKm ?? 0} km from your hotel/route. Trippin' Bharat will place this stop in the shortest feasible sequence and avoid arriving before opening.</p></div>
                          <div><h4 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900"><Images size={18} className="text-amber-600" /> Shop gallery</h4><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{[selectedArtifactShop.image, ...localArtifactShops.filter((shop) => shop.name !== selectedArtifactShop.name).slice(0, 5).map((shop) => shop.image)].map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setSelectedArtifactImage(image)} className="group relative overflow-hidden rounded-xl cursor-zoom-in" aria-label={`Open ${selectedArtifactShop.name} gallery image ${index + 1}`}><img src={image} alt={`${selectedArtifactShop.name} gallery ${index + 1}`} className="h-32 w-full rounded-xl object-cover transition-transform group-hover:scale-105" /><span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition-all group-hover:bg-slate-950/25 group-hover:opacity-100"><Maximize2 size={20} /></span></button>)}</div></div>
                          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Shop responsibly:</strong> Ask about the maker, materials, and care instructions. Buying directly from verified artisans helps keep craft traditions alive.</div>
                          <button type="button" onClick={() => handleAddArtifactShopToCurrentDay(selectedArtifactShop)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-3 text-sm font-black text-white hover:bg-amber-700"><Plus size={17} /> Add to Day {activeDayIdx + 1} tour</button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedArtifactImage && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" onClick={() => setSelectedArtifactImage(null)}>
                      <button type="button" onClick={() => setSelectedArtifactImage(null)} className="absolute right-5 top-5 rounded-xl bg-white/15 p-3 text-white backdrop-blur hover:bg-white/25" aria-label="Close enlarged image"><X size={22} /></button>
                      <img src={selectedArtifactImage} alt={`${selectedArtifactShop?.name || 'Shop'} enlarged gallery`} className="max-h-[88vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
                    </div>
                  )}
                  </div>

                {/* Spending & Budget Breakdown Widget */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Estimated Trip Spending
                    </h4>
                    <span className="text-sm font-black text-slate-900">
                      ₹{plannedTrip.budgetBreakdown.totalEstimated.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>🏨 Stay & Accommodation</span>
                      <span className="font-bold text-slate-900">₹{plannedTrip.budgetBreakdown.stay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>🍛 Food & Dining</span>
                      <span className="font-bold text-slate-900">₹{plannedTrip.budgetBreakdown.food.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>🛺 Local Transportation</span>
                      <span className="font-bold text-slate-900">₹{plannedTrip.budgetBreakdown.transport.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>🎫 Verified Entry Tickets</span>
                      <span className="font-bold text-slate-900">₹{plannedTrip.budgetBreakdown.tickets.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Budget Warning if Over-Budget */}
                  {plannedTrip.budgetBreakdown.isOverBudget && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                      <div className="font-black text-amber-800 flex items-center gap-1.5">
                        <AlertCircle size={14} />
                        <span>Plan is ₹{plannedTrip.budgetBreakdown.difference.toLocaleString()} over budget</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {plannedTrip.budgetBreakdown.savingsSuggestions?.[0]?.title || 'Consider choosing budget-friendly transit or stays.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Bottom Action Toolbar ── */}
            {!selectedArtifactShop && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-wrap items-center justify-between gap-4 sticky bottom-4 z-30">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveTrip}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Bookmark size={15} />
                  <span>Save Trip</span>
                </button>

                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>

                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print / PDF</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExplanationModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle size={15} />
                  <span>Why This Plan?</span>
                </button>

                <button
                  onClick={() => setIsGenerated(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all cursor-pointer"
                >
                  Edit Trip Parameters
                </button>
              </div>
            </div>
            )}
          </div>
        )}
      </main>

      {showSOSPanel && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setShowSOSPanel(false)} />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-rose-600">Emergency assistance</div>
                <h3 className="mt-1 text-xl font-black text-slate-900">SOS</h3>
                <p className="mt-1 text-xs text-slate-500">Quick actions for urgent help while you are on the route.</p>
              </div>
              <button type="button" onClick={() => setShowSOSPanel(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close SOS panel">
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={shareLiveLocation}
                className="flex w-full items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-black text-blue-700 hover:bg-blue-100"
              >
                <span className="flex items-center gap-2"><LocateFixed size={16} /> Share live location</span>
                <span className="text-[10px] font-black uppercase">{isSharingLocation ? 'On' : 'Send link'}</span>
              </button>

              <button
                type="button"
                onClick={() => triggerEmergencyCall('112')}
                className="flex w-full items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm font-black text-rose-700 hover:bg-rose-100"
              >
                <span className="flex items-center gap-2"><Phone size={16} /> Call emergency 112</span>
                <span className="text-[10px] font-black uppercase">Immediate</span>
              </button>

              <button
                type="button"
                onClick={() => triggerEmergencyCall('108')}
                className="flex w-full items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-black text-amber-700 hover:bg-amber-100"
              >
                <span className="flex items-center gap-2"><AlertCircle size={16} /> Call medical 108</span>
                <span className="text-[10px] font-black uppercase">Ambulance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuidePanel && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setShowGuidePanel(false)} />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Verified local experts</div>
                <h3 className="mt-1 text-xl font-black text-slate-900">Book a Guide</h3>
                <p className="mt-1 text-xs text-slate-500">Choose a guide for your {plannedTrip?.destinationName || 'journey'} route.</p>
              </div>
              <button type="button" onClick={() => setShowGuidePanel(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Close guide booking panel"><X size={18} /></button>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ['Heritage storyteller', 'Monuments, history & local legends', '₹1,200 / day'],
                ['Food & market guide', 'Street food, bazaars & artisan lanes', '₹900 / day'],
                ['Family-friendly guide', 'Flexible pace with local activities', '₹1,000 / day'],
              ].map(([title, description, price]) => (
                <button key={title} type="button" onClick={() => { setShowGuidePanel(false); setSaveToast(`${title} request noted for Day ${activeDayIdx + 1}. Our verified guide team will contact you.`); window.setTimeout(() => setSaveToast(null), 3500) }} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3 text-left transition-colors hover:border-blue-400 hover:bg-blue-50">
                  <span><strong className="block text-sm text-slate-900">{title}</strong><span className="text-[11px] text-slate-500">{description}</span></span>
                  <span className="shrink-0 text-[10px] font-black text-blue-700">{price}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-[10px] font-bold leading-4 text-emerald-800">All guides are verified by Trippin' Bharat. Final availability and confirmation will be shared before booking.</p>
          </div>
        </div>
      )}

      {selectedHotelDetails && currentStep !== 7 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img src={selectedHotelDetails.image} alt={selectedHotelDetails.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                <div><p className="text-[10px] font-black uppercase tracking-widest text-amber-300">{selectedHotelDetails.typeLabel || 'Hotel profile'}</p><h3 className="mt-1 text-2xl font-black">{selectedHotelDetails.name}</h3></div>
                <button type="button" onClick={() => setSelectedHotelDetails(null)} className="rounded-xl bg-white/20 p-2 backdrop-blur" aria-label="Close stay details"><X size={20} /></button>
              </div>
            </div>
            <div className="space-y-5 p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-blue-50 p-3"><div className="text-[10px] font-black uppercase text-blue-600">From</div><strong className="text-lg">₹{selectedHotelDetails.pricePerNight.toLocaleString()}<span className="text-[10px] font-normal"> / night</span></strong></div>
                <div className="rounded-2xl bg-amber-50 p-3"><div className="text-[10px] font-black uppercase text-amber-600">Rating</div><strong className="text-lg">★ {selectedHotelDetails.rating.toFixed(1)}</strong></div>
                <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-[10px] font-black uppercase text-emerald-600">Reviews</div><strong className="text-lg">{(selectedHotelDetails.reviewsCount || 0).toLocaleString()}</strong></div>
                <div className="rounded-2xl bg-violet-50 p-3"><div className="text-[10px] font-black uppercase text-violet-600">Category</div><strong className="text-sm">{selectedHotelDetails.tier === 'ultra_luxury' ? 'Ultra Luxury' : selectedHotelDetails.tier === 'luxury' ? 'Luxury' : selectedHotelDetails.tier === 'comfort' ? 'Medium Range' : 'Low Cost'}</strong></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4 text-xs text-slate-600"><h4 className="mb-3 text-sm font-black text-slate-900">Hotel information</h4><p className="mb-2 flex gap-2"><MapPin size={15} className="text-blue-600" />{selectedHotelDetails.address}</p><p className="mb-2 flex gap-2"><Phone size={15} className="text-blue-600" />{selectedHotelDetails.contactPhone || '+91 1800 123 4567'}</p><p className="flex gap-2"><UserRound size={15} className="text-blue-600" />Owner: {selectedHotelDetails.ownerName || 'Verified hotel management'}</p></div>
                <div className="rounded-2xl border border-slate-200 p-4"><h4 className="mb-3 text-sm font-black text-slate-900">Amenities</h4><div className="flex flex-wrap gap-2">{selectedHotelDetails.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{amenity}</span>)}</div></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><h4 className="mb-2 text-sm font-black">About this stay</h4><p className="text-xs leading-5 text-slate-600">{selectedHotelDetails.description || `${selectedHotelDetails.name} offers a comfortable base for exploring ${destinationData?.name || 'the destination'}.`}</p></div><div className="rounded-2xl bg-slate-50 p-4"><h4 className="mb-2 text-sm font-black">Stay details</h4><div className="grid grid-cols-2 gap-3 text-xs"><span>Check-in <strong className="block">2:00 PM</strong></span><span>Check-out <strong className="block">11:00 AM</strong></span><span>Capacity <strong className="block">2 guests / room</strong></span><span>Booking <strong className="block">Instant confirmation</strong></span></div></div></div>
              <div className="rounded-2xl border border-slate-200 p-4 text-xs text-slate-600">
                <h4 className="mb-2 text-sm font-black text-slate-900">Guest policies & nearby sights</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p>• Government ID required at check-in</p>
                    <p>• Cancellation up to 24 hours before arrival</p>
                    <p>• Quiet hours: 10:00 PM – 7:00 AM</p>
                    <p>• 24-hour front desk and local transfer assistance</p>
                  </div>
                  <div className="space-y-2">
                    {selectedHotelDetails.distanceToItineraryHighlights.length > 0
                      ? selectedHotelDetails.distanceToItineraryHighlights.slice(0, 3).map((item) => (
                        <p key={item.placeId}><strong className="text-slate-800">{item.placeName}</strong> · {item.distanceKm} km · {item.drivingTimeMin} min drive</p>
                      ))
                      : <p>Conveniently located near the destination's key sightseeing spots.</p>}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2"><Images size={18} className="text-blue-600" /><h4 className="text-sm font-black">Gallery</h4></div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{Array.from(new Set([selectedHotelDetails.image, ...(selectedHotelDetails.galleryImages || []), ...(destinationData?.heroGallery || [])])).slice(0, 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${selectedHotelDetails.name} gallery ${index + 1}`} className="h-28 w-full rounded-xl object-cover" onError={(event) => { event.currentTarget.src = selectedHotelDetails.image }} />)}</div>
                {(selectedHotelDetails.galleryVideos || []).length > 0
                  ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{selectedHotelDetails.galleryVideos?.map((video) => <iframe key={video} className="h-48 w-full rounded-xl border border-slate-200" src={video} title={`${selectedHotelDetails.name} video`} allowFullScreen />)}</div>
                  : <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500"><Play size={15} className="text-blue-600" /> Video tours will appear here when provided by the hotel.</div>}
              </div>
              <button type="button" onClick={() => { handleQuickChangeHotel(selectedHotelDetails.id); setSelectedHotelDetails(null) }} className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-black text-white hover:bg-blue-700">Set as Trip Base</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Place Modal ── */}
      <AnimatePresence>
        {showAddPlaceModal && destinationData && (
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
                  Add Place to Day 0{(activeDayIdx + 1)}
                </h3>
                <button
                  onClick={() => setShowAddPlaceModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {destinationData.places.map((place) => {
                  const alreadyAdded = isPlaceAlreadyAddedInTrip(place.id, place.name)
                  return (
                    <div
                      key={place.id}
                      onClick={() => !alreadyAdded && handleAddStopToCurrentDay(place)}
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
                              · Best: {formatBestTimeToVisit(place.bestTimeToVisit)}
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

      {/* ── Explainability Modal ── */}
      {showExplanationModal && plannedTrip && (
        <PlanExplanationModal
          logs={plannedTrip.explainabilityLogs}
          health={plannedTrip.health}
          destinationName={plannedTrip.destinationName}
          onClose={() => setShowExplanationModal(false)}
        />
      )}

      {/* ── Capacity Constraint Conflict Modal ── */}
      {showConflictModal && conflictData && (
        <ConstraintConflictModal
          validation={conflictData}
          onIncreaseDays={() => {
            setDaysCount((prev) => prev + 1)
            setShowConflictModal(false)
          }}
          onExtendHours={() => {
            setDailyTime({
              startTime: '08:00',
              endTime: '21:30',
              bufferMinutes: 20,
            })
            setShowConflictModal(false)
          }}
          onAdjustPriorities={() => {
            setShowConflictModal(false)
            setCurrentStep(6)
          }}
          onProceedAnyway={() => {
            setShowConflictModal(false)
            executeTripGeneration()
          }}
          onClose={() => setShowConflictModal(false)}
        />
      )}

      {/* ── Share Modal ── */}
      {showShareModal && plannedTrip && (
        <TripShareModal
          trip={plannedTrip}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* ── Export / Print Modal ── */}
      {showExportModal && plannedTrip && (
        <TripExportModal
          trip={plannedTrip}
          onClose={() => setShowExportModal(false)}
        />
      )}

      <Footer />
    </div>
  )
}
