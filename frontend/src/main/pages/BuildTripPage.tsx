import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Navigation
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
  const [includeFoodStops, setIncludeFoodStops] = useState<boolean>(true)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')

  // ── Planned Trip Result State ──
  const [plannedTrip, setPlannedTrip] = useState<PlannedTrip | null>(null)
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0)
  const [selectedMapPinId, setSelectedMapPinId] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<'itinerary' | 'map'>('itinerary')

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

        // If user arrived from a destination page (e.g. Rishikesh), IMMEDIATELY design the trip!
        // Do NOT show the destination picker grid (step 1).
        if (hasInitialDest || selectedDestSlug) {
          const defaultPerDay = 2400
          const autoBudget = defaultPerDay * (initialDaysQuery || 2)
          const autoRequest: UserTripRequest = {
            destinationSlug: data.slug,
            destinationName: data.name,
            daysCount: initialDaysQuery || 2,
            dailyTime: {
              startTime: '08:30',
              endTime: '20:00',
              bufferMinutes: 30,
            },
            budget: {
              amount: autoBudget,
              mode: 'total',
              tier: 'smart_budget',
            },
            transport: 'mixed',
            travelStyles: ['Heritage & History', 'Architecture', 'Local Food'],
            selectedPlaces: initialSelections,
            startLocationType: 'hotel',
            selectedHotelId: defaultHotelId,
            includeFoodStops: true,
          }

          const trip = TripPlanningService.planTrip(data, autoRequest)
          setPlannedTrip(trip)
          setIsGenerated(true)
          setActiveDayIdx(0)
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
  }

  const executeTripGeneration = () => {
    if (!destinationData) return
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
    setPlannedTrip(trip)
    setIsGenerated(true)
    setActiveDayIdx(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

    // Recalculate timeslots
    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx].stops = stops
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
      explanation: place.bestTimeToVisit ? `Scheduled to align with optimal visit window (${place.bestTimeToVisit.split('(')[0].trim()}).` : undefined,
    }

    const updatedDays = [...plannedTrip.days]
    updatedDays[activeDayIdx].stops.push(newStop)
    setPlannedTrip({ ...plannedTrip, days: updatedDays })
    setShowAddPlaceModal(false)
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
  const coordsList = activeDayStops
    .map((s) => s.coordinates)
    .filter(Boolean) as { lat: number; lng: number }[]

  const bounds = useMemo(() => {
    if (coordsList.length === 0) {
      return { minLat: 26.8, maxLat: 27.2, minLng: 75.7, maxLng: 75.9 }
    }
    let minLat = Infinity,
      maxLat = -Infinity,
      minLng = Infinity,
      maxLng = -Infinity
    coordsList.forEach((c) => {
      if (c.lat < minLat) minLat = c.lat
      if (c.lat > maxLat) maxLat = c.lat
      if (c.lng < minLng) minLng = c.lng
      if (c.lng > maxLng) maxLng = c.lng
    })
    // Add margin
    const latMargin = Math.max(0.015, (maxLat - minLat) * 0.2)
    const lngMargin = Math.max(0.015, (maxLng - minLng) * 0.2)
    return {
      minLat: minLat - latMargin,
      maxLat: maxLat + latMargin,
      minLng: minLng - lngMargin,
      maxLng: maxLng + lngMargin,
    }
  }, [coordsList])

  const getPinPct = (coords?: { lat: number; lng: number }) => {
    if (!coords) return { x: 50, y: 50 }
    const x = ((coords.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100
    const y = 100 - ((coords.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100
    return {
      x: Math.min(Math.max(x, 10), 90),
      y: Math.min(Math.max(y, 12), 88),
    }
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
                              ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
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
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>₹1,500 (Budget Solo)</span>
                    <span>₹15,000 (Family Comfort)</span>
                    <span>₹50,000+ (Palatial)</span>
                  </div>
                </div>

                {/* Estimated Budget Allocation Preview (Requirement 7) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-3">
                  <div className="text-xs font-black uppercase tracking-widest text-amber-400">
                    Suggested Estimated Allocation (~₹{resolvedBudgetAmount.toLocaleString()})
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Stay (~40%)</div>
                      <div className="font-bold text-white mt-1">₹{Math.round(resolvedBudgetAmount * 0.4).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Food (~25%)</div>
                      <div className="font-bold text-white mt-1">₹{Math.round(resolvedBudgetAmount * 0.25).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Transit (~18%)</div>
                      <div className="font-bold text-white mt-1">₹{Math.round(resolvedBudgetAmount * 0.18).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Tickets (~10%)</div>
                      <div className="font-bold text-white mt-1">₹{Math.round(resolvedBudgetAmount * 0.1).toLocaleString()}</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Buffer (~7%)</div>
                      <div className="font-bold text-white mt-1">₹{Math.round(resolvedBudgetAmount * 0.07).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
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
                              ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
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

                {/* Stays Carousel / Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {destinationData?.stays.map((stay) => {
                    const isSel = selectedHotelId === stay.id
                    return (
                      <div
                        key={stay.id}
                        onClick={() => setSelectedHotelId(stay.id)}
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
                              ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
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
                        <p className="text-[11px] text-slate-500 line-clamp-1">{stay.address}</p>
                      </div>
                    )
                  })}
                </div>

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

        {/* ══════════════════════════════════════════════════════════════
            MODE B: GENERATED JOURNEY ITINERARY & INTERACTIVE MAP VIEW
        ══════════════════════════════════════════════════════════════ */}
        {isGenerated && plannedTrip && (
          <div className="space-y-6">
            {/* ── Top Bar: Day Selector & Health Score Badge ── */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
                    <span className="flex items-center gap-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-1 rounded-full">
                      <Sparkles size={12} />
                      <span>Optimized Itinerary</span>
                    </span>
                    <span className="flex items-center gap-1 bg-white/10 text-slate-200 px-2.5 py-1 rounded-full">
                      <MapPin size={12} className="text-[#E5293E]" />
                      <span>{destinationData?.name}, {destinationData?.state}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                    {plannedTrip.tripTitle}
                  </h2>
                  <div className="text-xs text-slate-300 font-medium mt-1 flex flex-wrap items-center gap-3">
                    <span>Base: <strong className="text-white">{plannedTrip.selectedHotel?.name || 'Hotel Base'}</strong></span>
                    <span>·</span>
                    <span>Mode: <strong className="text-amber-300 capitalize">{transportMode.replace('_', ' ')}</strong></span>
                    <span>·</span>
                    <span>Estimated Spend: <strong className="text-emerald-400">₹{plannedTrip.budgetBreakdown.totalEstimated.toLocaleString()}</strong></span>
                  </div>
                </div>

                {/* Health Score Clickable Badge & Change City */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsGenerated(false)
                      setCurrentStep(1)
                    }}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Change Destination"
                  >
                    <MapPin size={13} className="text-rose-400" />
                    <span>Change City</span>
                  </button>

                  <button
                    onClick={() => setShowExplanationModal(true)}
                    className="p-2.5 sm:p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-left cursor-pointer flex items-center gap-3 shrink-0"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                        Plan Health
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {plannedTrip.health.score}/100 · {plannedTrip.health.label}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Quick Config Bar: Instant Duration & Transport Tuning without Wizard */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Duration Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Trip Duration:</span>
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {[1, 2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => handleQuickChangeDays(d)}
                        className={`px-3 py-1 rounded-lg font-black transition-all cursor-pointer ${
                          daysCount === d
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Transit:</span>
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
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
                            : 'text-slate-400 hover:text-white'
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

                  {/* Day Route Optimizer Button */}
                  <button
                    onClick={handleOptimizeCurrentDay}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Zap size={14} />
                    <span>⚡ Optimize Day Route</span>
                  </button>
                </div>

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
                  {plannedTrip.days[activeDayIdx]?.stops.map((stop, idx) => {
                    const isSelectedOnMap = selectedMapPinId === stop.id

                    // ── SPECIAL RENDERING: MIDDAY REGIONAL LUNCH & CULINARY BREAK ──
                    if (stop.isMealStop) {
                      const lunchSpots = destinationData?.foodSpots || []
                      return (
                        <div
                          key={stop.id}
                          onClick={() => setSelectedMapPinId(stop.id)}
                          className={`relative group rounded-3xl p-5 border-2 transition-all cursor-pointer bg-gradient-to-br from-amber-50/70 via-emerald-50/40 to-white ${
                            isSelectedOnMap
                              ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-400/20'
                              : 'border-emerald-200/90 shadow-sm hover:border-emerald-300'
                          }`}
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
                                  {lunchSpots.slice(0, 2).map((spot) => (
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
                                            ;(e.currentTarget as HTMLImageElement).src = '/images/places/ram-jhula.jpg'
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

                                      {spot.mustTryDishes && spot.mustTryDishes.length > 0 && (
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
                                        <span className="text-slate-500 font-medium truncate max-w-[140px]">{spot.address.split(',')[0]}</span>
                                        <span className="font-bold text-emerald-700 shrink-0">
                                          {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    }

                    // ── STANDARD ATTRACTION STOP RENDERING ──
                    return (
                      <div
                        key={stop.id}
                        onClick={() => setSelectedMapPinId(stop.id)}
                        className={`relative group rounded-2xl p-4 border transition-all cursor-pointer ${
                          isSelectedOnMap
                            ? 'bg-blue-50/50 border-blue-400 shadow-md ring-2 ring-blue-400/20'
                            : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-2 bg-blue-600 ring-blue-600/30" />

                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                                {stop.timeSlot}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">
                                {stop.durationMin} mins duration
                              </span>
                              {stop.priority === 'must_visit' && (
                                <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                  ❤️ Must Visit
                                </span>
                              )}
                            </div>

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

                {/* ══════════════════════════════════════════════════════════════
                    DONE ROAMING FOR THE DAY? EVENING DINNER & TONIGHT'S REST
                ══════════════════════════════════════════════════════════════ */}
                <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Moon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                          Evening Post-Roaming Plan
                        </div>
                        <h4 className="text-lg font-black font-display text-white">
                          Done Roaming for {plannedTrip.days[activeDayIdx]?.dateLabel}? Dinner & Tonight's Rest
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-white/10 px-3 py-1.5 rounded-full self-start sm:self-auto">
                      🌙 Day Wraps ~{plannedTrip.days[activeDayIdx]?.endTime}
                    </span>
                  </div>

                  {/* PART 1: Nearby Dinner Restaurants */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                        <UtensilsCrossed size={14} className="text-amber-400" />
                        <span>Recommended Dinner Spots in {destinationData?.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">Open for evening dining</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(destinationData?.foodSpots || []).map((spot) => (
                        <div
                          key={spot.id}
                          className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/50 transition-all space-y-2 group"
                        >
                          <div className="flex gap-3">
                            <img
                              src={spot.image}
                              alt={spot.name}
                              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                ;(e.currentTarget as HTMLImageElement).src = '/images/places/laxman-jhula.jpg'
                              }}
                            />
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-black text-white truncate">{spot.name}</h5>
                                <span className="text-[10px] font-black text-amber-400 shrink-0">★ {spot.rating}</span>
                              </div>
                              <p className="text-[11px] text-slate-300 truncate">{spot.cuisineType}</p>
                              <div className="text-[11px] font-black text-emerald-400">
                                ₹{spot.priceForTwo} for two · <span className="text-slate-400 font-normal">{spot.timings}</span>
                              </div>
                            </div>
                          </div>

                          {spot.specialty && (
                            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed italic">
                              "{spot.specialty}"
                            </p>
                          )}

                          {spot.mustTryDishes && spot.mustTryDishes.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {spot.mustTryDishes.slice(0, 3).map((dish, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="text-[9px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full"
                                >
                                  {dish}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-medium truncate max-w-[180px]">
                              📍 {spot.address}
                            </span>
                            <span className="font-bold text-emerald-400 shrink-0">
                              {spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PART 2: Where to Stay Tonight (Active Base & Alternative Stays) */}
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                        <Building2 size={14} className="text-blue-400" />
                        <span>Where to Stay Tonight (Hotel Base & Stays in {destinationData?.name})</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-bold">● Active Trip Base</span>
                    </div>

                    {/* Stays Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(destinationData?.stays || []).map((stay) => {
                        const isBase = plannedTrip.selectedHotel?.id === stay.id
                        return (
                          <div
                            key={stay.id}
                            onClick={() => handleQuickChangeHotel(stay.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                              isBase
                                ? 'bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                                : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                            }`}
                          >
                            <div className="h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 relative">
                              <img
                                src={stay.image}
                                alt={stay.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  ;(e.currentTarget as HTMLImageElement).src = '/images/places/city-palace.jpg'
                                }}
                              />
                              {isBase && (
                                <span className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-md">
                                  Active Base
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-black text-white truncate">{stay.name}</h5>
                              <span className="text-[10px] font-black text-amber-400 shrink-0">★ {stay.rating}</span>
                            </div>

                            <div className="text-xs font-black text-emerald-400">
                              ₹{stay.pricePerNight.toLocaleString()}{' '}
                              <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {stay.amenities?.slice(0, 2).map((a, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="text-[9px] font-medium bg-white/10 text-slate-300 px-1.5 py-0.5 rounded"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 truncate">{stay.address.split(',')[0]}</span>
                              <button
                                type="button"
                                className={`text-[10px] font-black px-2 py-0.5 rounded-md transition-all ${
                                  isBase
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                                }`}
                              >
                                {isBase ? '✓ Selected' : 'Set as Base'}
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Synchronized Interactive Map & Route Flow */}
              <div className={`lg:col-span-5 space-y-6 ${mobileTab === 'itinerary' ? 'hidden lg:block' : 'block'}`}>
                {/* Visual Map Canvas */}
                <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden min-h-[460px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{plannedTrip.days[activeDayIdx]?.dateLabel} Route Map</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {coordsList.length} plotted stops
                    </span>
                  </div>

                  {/* SVG Canvas with Pins and Route Line */}
                  <div className="relative w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                    {/* SVG Route Connector Polyline */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {activeDayStops.map((stop, sIdx) => {
                        if (sIdx === 0) return null
                        const prev = activeDayStops[sIdx - 1]
                        const p1 = getPinPct(prev.coordinates)
                        const p2 = getPinPct(stop.coordinates)
                        return (
                          <line
                            key={`line-${sIdx}`}
                            x1={`${p1.x}%`}
                            y1={`${p1.y}%`}
                            x2={`${p2.x}%`}
                            y2={`${p2.y}%`}
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                            strokeDasharray="4 4"
                            opacity="0.8"
                          />
                        )
                      })}
                    </svg>

                    {/* Plotted Stops Pins */}
                    {activeDayStops.map((stop, sIdx) => {
                      const pos = getPinPct(stop.coordinates)
                      const isSel = selectedMapPinId === stop.id
                      return (
                        <div
                          key={stop.id}
                          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                          onClick={() => setSelectedMapPinId(stop.id)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                        >
                          <div
                            className={`w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] font-black transition-all ${
                              stop.isMealStop
                                ? 'bg-emerald-500 text-white'
                                : isSel
                                ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/30'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {stop.isMealStop ? '🍴' : sIdx + 1}
                          </div>

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block whitespace-nowrap z-30 pointer-events-none">
                            <div className="bg-slate-950 text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-lg border border-white/20">
                              {stop.placeName}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Selected Stop Details Popover inside Map */}
                  {selectedMapPinId && (
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-amber-400">Selected Stop</div>
                        <div className="font-bold text-white">
                          {activeDayStops.find((s) => s.id === selectedMapPinId)?.placeName}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMapPinId(null)}
                        className="text-[11px] text-slate-400 hover:text-white"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {/* Tabbed Explorer: Route Flow / Nearby Dining / Where to Stay */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('flow')}
                        className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                          rightPanelTab === 'flow'
                            ? 'bg-blue-600 text-white font-black shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Route Flow
                      </button>
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('dining')}
                        className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                          rightPanelTab === 'dining'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>🍛 Dining</span>
                        <span className="text-[10px] opacity-75">({destinationData?.foodSpots?.length || 0})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRightPanelTab('stays')}
                        className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                          rightPanelTab === 'stays'
                            ? 'bg-blue-500 text-white font-black shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>🏨 Stays</span>
                        <span className="text-[10px] opacity-75">({destinationData?.stays?.length || 0})</span>
                      </button>
                    </div>

                    {/* Tab 1: Route Transit Flow */}
                    {rightPanelTab === 'flow' && (
                      <div className="space-y-2 p-3 bg-white/5 rounded-2xl border border-white/10 text-xs">
                        <div className="flex items-center gap-2 font-bold text-purple-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                          <span>Start Base: {plannedTrip.selectedHotel?.name || 'Hotel Base'}</span>
                        </div>

                        {activeDayStops.map((stop) => (
                          <div key={stop.id} className="flex items-center gap-2 text-white pl-4 text-[11px]">
                            <span className="text-slate-500">
                              ↓ {stop.travelFromPrevMin > 0 ? `${stop.travelFromPrevMin}m` : 'start'}
                            </span>
                            <span className={`font-bold truncate ${stop.isMealStop ? 'text-emerald-400' : 'text-blue-300'}`}>
                              {stop.isMealStop ? '🍴 Lunch: Regional Dining' : stop.placeName}
                            </span>
                          </div>
                        ))}

                        <div className="flex items-center gap-2 font-bold text-amber-300 pl-4 pt-1 text-[11px]">
                          <span>↓ ~15m</span>
                          <span>Evening: Dinner & Return to Base</span>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Nearby Dining Directory */}
                    {rightPanelTab === 'dining' && (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1 no-scrollbar text-xs">
                        {(destinationData?.foodSpots || []).map((spot) => (
                          <div
                            key={spot.id}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={spot.image}
                                alt={spot.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                                onError={(e) => {
                                  ;(e.currentTarget as HTMLImageElement).src = '/images/places/ram-jhula.jpg'
                                }}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-black text-white text-xs truncate">{spot.name}</span>
                                  <span className="text-[10px] font-bold text-amber-400 shrink-0">★ {spot.rating}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">{spot.cuisineType}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5">
                              <span className="text-emerald-400 font-bold">₹{spot.priceForTwo} for two</span>
                              <span className="text-slate-400">{spot.isVeg ? '🟢 Pure Veg' : 'Multi-Cuisine'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Stays & Hotel Options */}
                    {rightPanelTab === 'stays' && (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1 no-scrollbar text-xs">
                        {(destinationData?.stays || []).map((stay) => {
                          const isBase = plannedTrip.selectedHotel?.id === stay.id
                          return (
                            <div
                              key={stay.id}
                              onClick={() => handleQuickChangeHotel(stay.id)}
                              className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                                isBase
                                  ? 'bg-blue-600/20 border-blue-500'
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-black text-white text-xs truncate">{stay.name}</span>
                                <span className="text-[10px] font-bold text-amber-400">★ {stay.rating}</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-400 font-bold">₹{stay.pricePerNight.toLocaleString()} / night</span>
                                <button
                                  type="button"
                                  className={`text-[9px] font-black px-2 py-0.5 rounded ${
                                    isBase ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'
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
                        {plannedTrip.budgetBreakdown.savingsSuggestions[0]?.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Bottom Action Toolbar ── */}
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
          </div>
        )}
      </main>

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
