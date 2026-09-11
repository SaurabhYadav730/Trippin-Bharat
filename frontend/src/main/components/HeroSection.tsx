import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  Compass,
  Landmark,
  Building2,
  UtensilsCrossed,
  Palette,
  Layers,
  ChevronDown,
  TrendingUp,
  Check,
  Mountain,
  Waves,
  Trees,
  Sun,
  ShieldCheck
} from 'lucide-react'

// MakeMyTrip Style Category Dock Tabs
const categoryTabs = [
  { id: 'destinations', label: 'Destinations', icon: Compass, badge: null },
  { id: 'heritage', label: 'Forts & Palaces', icon: Landmark, badge: 'UNESCO' },
  { id: 'stays', label: 'Heritage Stays', icon: Building2, badge: null },
  { id: 'spiritual', label: 'Spiritual & Ghats', icon: Sparkles, badge: null },
  { id: 'planner', label: 'Smart Planner', icon: Compass, badge: 'Smart' },
  { id: 'food', label: 'Culinary Trails', icon: UtensilsCrossed, badge: null },
  { id: 'experiences', label: 'Experiences', icon: Palette, badge: null },
  { id: 'journey_lens', label: 'Journey Lens', icon: Layers, badge: 'Exclusive' },
]

export interface DestinationExperience {
  id: string
  title: string
  sub: string
  tag: string
  icon: typeof Landmark
}

export interface DestinationItem {
  city: string
  state: string
  sub: string
  rating: string
  tag: string
  image: string
  bestSeason: string
  experiences: DestinationExperience[]
}

// Curated Indian destinations with verified images & destination-specific authentic experiences
export const curatedDestinations: DestinationItem[] = [
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    sub: 'The Pink City · 24+ Forts & Palaces',
    rating: '4.9',
    tag: 'Top Visited',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80&auto=format',
    bestSeason: 'Oct – Mar',
    experiences: [
      { id: 'forts', title: 'Royal Forts & Palaces', sub: 'Amber Fort, Nahargarh, City Palace & Hawa Mahal', tag: 'Royalty', icon: Landmark },
      { id: 'havelis', title: 'Heritage Havelis & Stays', sub: 'Royal courtyards & Rajputana hospitality', tag: 'Stays', icon: Building2 },
      { id: 'food', title: 'Rajasthani Gastronomy Trail', sub: 'Dal Baati Churma, Ghewar, Pyaaz Kachori & Thali', tag: 'Gourmet', icon: UtensilsCrossed },
      { id: 'crafts', title: 'Johari Bazaars & Block Print', sub: 'Blue pottery, block print studios & gemstone walks', tag: 'Artisans', icon: Palette },
      { id: 'adventure', title: 'Aravalli Sunrise & Ballooning', sub: 'Hot air balloon flights over desert fortresses', tag: 'Adventure', icon: Compass },
    ]
  },
  {
    city: 'Shillong',
    state: 'Meghalaya',
    sub: 'Living Root Bridges & Waterfalls',
    rating: '4.7',
    tag: 'Offbeat',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&q=80&auto=format',
    bestSeason: 'Sep – May',
    experiences: [
      { id: 'bridges', title: 'Living Root Bridges & Waterfalls', sub: 'Nohkalikai, Krang Suri & Cherrapunji jungle trails', tag: 'Eco-Wonder', icon: Waves },
      { id: 'caves', title: 'Cloud Treks & Limestone Caves', sub: 'Mawsmai & Krem Puri cave exploration circuits', tag: 'Adventure', icon: Mountain },
      { id: 'lakes', title: 'Pine Hills & Crystal Waters', sub: 'Umiam Lake boating, Dawki Umngot river safari', tag: 'Scenic', icon: Trees },
      { id: 'culture', title: 'Khasi Food & Indie Rock Trail', sub: 'Jadoh, bamboo shoot delicacies & music cafes', tag: 'Culture', icon: UtensilsCrossed },
      { id: 'village', title: 'Cleanest Village & Sacred Groves', sub: 'Mawlynnong eco-walk & Mawphlang ancient forest', tag: 'Unique', icon: Sparkles },
    ]
  },
  {
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    sub: 'Eternal Ghats & Kashi Vishwanath',
    rating: '4.9',
    tag: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80&auto=format',
    bestSeason: 'Oct – Mar',
    experiences: [
      { id: 'ghats', title: 'Sacred Ghats & Ganga Aarti', sub: 'Dashashwamedh evening aarti & Subah-e-Banaras', tag: 'Sacred', icon: Sparkles },
      { id: 'temples', title: 'Ancient Temples & Sarnath', sub: 'Kashi Vishwanath Corridor & Buddhist stupas', tag: 'Heritage', icon: Landmark },
      { id: 'silk', title: 'Banarasi Silk & Weaver Alleys', sub: 'Handloom weaving quarters & old labyrinth alleys', tag: 'Artisans', icon: Palette },
      { id: 'food', title: 'Street Food Legends Trail', sub: 'Banarasi Paan, Kachori Jalebi, Malaiyo & Lassi', tag: 'Gourmet', icon: UtensilsCrossed },
      { id: 'boat', title: 'Dawn Mystic Boat Rowing', sub: 'Sunrise heritage boat cruise along 84 Ghats', tag: 'Signature', icon: Compass },
    ]
  },
  {
    city: 'Udaipur',
    state: 'Rajasthan',
    sub: 'City of Lakes & Mewar Grandeur',
    rating: '4.8',
    tag: 'Romantic',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&q=80&auto=format',
    bestSeason: 'Sep – Mar',
    experiences: [
      { id: 'lakes', title: 'Lake Pichola & Island Palaces', sub: 'City Palace, Jagmandir & sunset boat cruises', tag: 'Royalty', icon: Landmark },
      { id: 'romantic', title: 'Romantic Lakeside Dining', sub: 'Candlelit rooftop dinners facing illuminated palaces', tag: 'Romantic', icon: UtensilsCrossed },
      { id: 'art', title: 'Mewar Art & Vintage Heritage', sub: 'Miniature painting workshops & Royal vintage cars', tag: 'Artisans', icon: Palette },
      { id: 'sajjangarh', title: 'Monsoon Palace & Aravalli Views', sub: 'High mountain sunset panorama & nature reserve', tag: 'Scenic', icon: Mountain },
      { id: 'folk', title: 'Bagore Ki Haveli Folk Dances', sub: 'Dharohar authentic Rajasthani cultural performance', tag: 'Culture', icon: Sparkles },
    ]
  },
  {
    city: 'Hampi',
    state: 'Karnataka',
    sub: 'UNESCO World Heritage Ruins',
    rating: '4.9',
    tag: 'Historic',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80&auto=format',
    bestSeason: 'Oct – Feb',
    experiences: [
      { id: 'monoliths', title: 'UNESCO Monoliths & Stone Chariot', sub: 'Vittala Temple musical pillars & Virupaksha complex', tag: 'UNESCO', icon: Landmark },
      { id: 'coracle', title: 'Hippie Island & Coracle Rides', sub: 'Sanapur Lake, bouldering & Tungabhadra river floats', tag: 'Adventure', icon: Waves },
      { id: 'sunrise', title: 'Matanga Hill Sunrise Trek', sub: '360° panoramic boulder landscape morning view', tag: 'Scenic', icon: Mountain },
      { id: 'royal', title: 'Vijayanagara Royal Enclosures', sub: 'Lotus Mahal, Elephant Stables & Queen’s Bath', tag: 'Heritage', icon: Building2 },
      { id: 'cafes', title: 'South Indian Heritage Cafes', sub: 'Filter coffee, mango tree cafe garden trails', tag: 'Culinary', icon: UtensilsCrossed },
    ]
  },
  {
    city: 'Munnar & Alleppey',
    state: 'Kerala',
    sub: 'Backwaters & Rolling Tea Hills',
    rating: '4.8',
    tag: 'Nature',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&auto=format',
    bestSeason: 'Sep – Mar',
    experiences: [
      { id: 'houseboat', title: 'Backwater Houseboat Cruises', sub: 'Luxury overnight Kettuvallam stay in Vembanad Lake', tag: 'Signature', icon: Waves },
      { id: 'tea', title: 'Rolling Tea Hills & Cardamom Treks', sub: 'Kolukkumalai peak, Tata Tea Museum & misty gardens', tag: 'Plantations', icon: Trees },
      { id: 'ayurveda', title: 'Ayurvedic Healing & Kathakali', sub: 'Authentic Panchakarma wellness & classical martial arts', tag: 'Wellness', icon: Sparkles },
      { id: 'malabar', title: 'Malabar Coastal Flavors', sub: 'Karimeen Pollichathu, Appam & festive Sadya feast', tag: 'Gourmet', icon: UtensilsCrossed },
      { id: 'wildlife', title: 'Eravikulam & Anamudi Wildlife', sub: 'Nilgiri Tahr sightings & high-altitude flora safari', tag: 'Wildlife', icon: Mountain },
    ]
  },
  {
    city: 'Leh & Nubra',
    state: 'Ladakh',
    sub: 'High Himalayan Monasteries & Passes',
    rating: '4.9',
    tag: 'Adventure',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80&auto=format',
    bestSeason: 'May – Sep',
    experiences: [
      { id: 'passes', title: 'High Mountain Passes & Nubra Dunes', sub: 'Khardung La, Chang La pass & double-hump camel rides', tag: 'Altitude', icon: Mountain },
      { id: 'gompas', title: 'Ancient Monasteries & Gompas', sub: 'Thiksey, Hemis, Diskit & Lamayuru morning prayers', tag: 'Spiritual', icon: Landmark },
      { id: 'pangong', title: 'Pangong Tso & Stargazing Camps', sub: 'Turquoise lake glamping under unpolluted night skies', tag: 'Wonder', icon: Sparkles },
      { id: 'trekking', title: 'Markha Valley & River Treks', sub: 'Zanskar river trail, Chadar trek & high passes', tag: 'Adventure', icon: Compass },
      { id: 'ladakhi', title: 'Ladakhi Butter Tea & Momo Trails', sub: 'Steaming Momos, Thukpa, Skyu & Tsampa culinary walk', tag: 'Culture', icon: UtensilsCrossed },
    ]
  },
  {
    city: 'Agra',
    state: 'Uttar Pradesh',
    sub: 'Taj Mahal & Mughal Architecture',
    rating: '4.8',
    tag: 'Wonder',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80&auto=format',
    bestSeason: 'Oct – Mar',
    experiences: [
      { id: 'taj', title: 'Taj Mahal & Mughal Marvels', sub: 'Sunrise Taj Mahal, Agra Fort & Fatehpur Sikri complex', tag: 'Wonder', icon: Landmark },
      { id: 'mehtab', title: 'Mehtab Bagh Sunset Panorama', sub: 'Golden hour riverfront view of the ivory-white monument', tag: 'Scenic', icon: Sun },
      { id: 'mughlai', title: 'Mughlai Food & Agra Petha', sub: 'Authentic Bedmi Puri, Galouti kebabs & world-famous Petha', tag: 'Gourmet', icon: UtensilsCrossed },
      { id: 'marble', title: 'Pietra Dura Marble Crafts', sub: 'Master inlay artisans keeping Mughal stone art alive', tag: 'Artisans', icon: Palette },
      { id: 'circuit', title: 'Keoladeo Bird Sanctuary Day Trail', sub: 'UNESCO migratory bird wetland cycling trail', tag: 'Nature', icon: Trees },
    ]
  },
  {
    city: 'Goa',
    state: 'Goa',
    sub: 'Golden Coast, Latin Quarters & Seafood',
    rating: '4.8',
    tag: 'Coastal',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80&auto=format',
    bestSeason: 'Nov – Apr',
    experiences: [
      { id: 'beaches', title: 'Sun-Kissed Beaches & Water Sports', sub: 'Palolem, Anjuna, scuba diving & parasailing', tag: 'Coastal', icon: Waves },
      { id: 'portuguese', title: 'Portuguese Quarters & Churches', sub: 'Fontainhas colorful alleys & Old Goa basilicas', tag: 'Heritage', icon: Landmark },
      { id: 'seafood', title: 'Coastal Seafood & Beach Shacks', sub: 'Goan fish curry, Bebinca, Cafreal & sunset dining', tag: 'Gourmet', icon: UtensilsCrossed },
      { id: 'spice', title: 'Spice Plantations & Dudhsagar', sub: 'Organic spice estate tours & misty 4-tier waterfall', tag: 'Eco-Trail', icon: Trees },
      { id: 'forts', title: 'Coastal Forts & Sunset Points', sub: 'Chapora Fort, Aguada Lighthouse & sea cliffs', tag: 'Views', icon: Compass },
    ]
  },
  {
    city: 'Rishikesh',
    state: 'Uttarakhand',
    sub: 'Yoga Capital, River Rapids & Ganga Aarti',
    rating: '4.8',
    tag: 'Adventure & Zen',
    image: 'https://images.unsplash.com/photo-1603468625902-1c0051033c37?w=800&q=80&auto=format',
    bestSeason: 'Sep – Jun',
    experiences: [
      { id: 'aarti', title: 'Holy Ghats & Triveni Aarti', sub: 'Evening Ganga Aarti & divine chanting ceremonies', tag: 'Spiritual', icon: Sparkles },
      { id: 'rafting', title: 'White Water Rafting & Bungee', sub: 'Shivpuri Grade IV rapids, cliff jumping & riverside camps', tag: 'Thrill', icon: Waves },
      { id: 'yoga', title: 'Yoga Ashrams & Meditation', sub: 'Parmarth Niketan retreats & historic Beatles Ashram', tag: 'Wellness', icon: Trees },
      { id: 'pahadi', title: 'Pahadi & Organic Cafe Trail', sub: 'Ayurvedic organic food, herbal teas & bakery walks', tag: 'Food Trail', icon: UtensilsCrossed },
      { id: 'waterfalls', title: 'Neer Garh Waterfall Treks', sub: 'Hidden Himalayan cascading pools & cliff treks', tag: 'Nature', icon: Mountain },
    ]
  },
]

// Fallback experiences for arbitrary searches
const genericExperiences: DestinationExperience[] = [
  { id: 'heritage', title: 'Monuments & Architecture', sub: 'Historical landmarks, palaces & heritage walks', tag: 'Culture', icon: Landmark },
  { id: 'scenic', title: 'Scenic Landscapes & Nature', sub: 'Panoramic viewpoints, hills & peaceful trails', tag: 'Scenic', icon: Mountain },
  { id: 'food', title: 'Authentic Local Food Trail', sub: 'Iconic street food & authentic regional cuisine', tag: 'Gourmet', icon: UtensilsCrossed },
  { id: 'spiritual', title: 'Spiritual & Cultural Trails', sub: 'Sacred temples, shrines & local traditions', tag: 'Spiritual', icon: Sparkles },
  { id: 'adventure', title: 'Adventure & Outdoor Treks', sub: 'Excursions, hiking & nature activities', tag: 'Adventure', icon: Compass },
]

const goldenSpotExperience: DestinationExperience = {
  id: 'golden-spot',
  title: 'Golden Spot',
  sub: 'Select a destination to discover its signature highlight',
  tag: 'Signature',
  icon: Landmark,
}

function getDurationDays(durationValue: string) {
  if (durationValue.startsWith('Weekend')) return 2
  if (durationValue.startsWith('1 Week')) return 7
  if (durationValue.startsWith('10+')) return 10

  const customDays = Number.parseInt(durationValue, 10)
  return Number.isNaN(customDays) ? 0 : customDays
}

function addDaysToDate(date: Date, days: number): string {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

function formatDateForDisplay(dateValue: string): string {
  const [year, month, day] = dateValue.split('-')
  return year && month && day ? `${day}/${month}/${year}` : ''
}

function parseDisplayDate(dateValue: string): string | null {
  const match = dateValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null

  const [, day, month, year] = match
  const parsed = new Date(Number(year), Number(month) - 1, Number(day))
  if (
    parsed.getFullYear() !== Number(year) ||
    parsed.getMonth() !== Number(month) - 1 ||
    parsed.getDate() !== Number(day)
  ) {
    return null
  }

  return `${year}-${month}-${day}`
}

function normalizeDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function getInclusiveDateDifference(startDate: string, endDate: string): number {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  const difference = Math.round((end.getTime() - start.getTime()) / 86400000) + 1
  return Number.isFinite(difference) ? difference : 0
}

function getGoldenSpotForDuration(city: DestinationItem, durationValue: string) {
  const experiences = city.experiences?.length ? city.experiences : genericExperiences
  const days = getDurationDays(durationValue)
  const experienceIndex = days <= 2 ? 0 : days <= 5 ? 1 : days <= 7 ? 2 : 3

  return experiences[Math.min(experienceIndex, experiences.length - 1)]
}

const durationOptions = [
  { value: 'Weekend (2 Days)', label: 'Weekend (2 Days)', badge: 'Quick Getaway', desc: 'Highlights & essential spots' },
  { value: '1 Week (7 Days)', label: '1 Week (7 Days)', badge: 'Deep Dive', desc: 'Comprehensive heritage & hidden gems' },
  { value: '10+ Days', label: '10+ Days', badge: 'Grand Circuit', desc: 'All-inclusive multi-region expedition' },
]

const defaultDuration = {
  value: '',
  label: 'Select Duration',
  badge: 'Choose pace',
  desc: 'Pick your trip length',
}

const trendingChips = [
  { label: 'Jaipur Forts', search: 'Jaipur', cityObjIndex: 0 },
  { label: 'Shillong Root Bridges', search: 'Shillong', cityObjIndex: 1 },
  { label: 'Varanasi Ghats', search: 'Varanasi', cityObjIndex: 2 },
  { label: 'Udaipur Lakes', search: 'Udaipur', cityObjIndex: 3 },
  { label: 'Hampi Ruins', search: 'Hampi', cityObjIndex: 4 },
  { label: 'Kerala Backwaters', search: 'Munnar & Alleppey', cityObjIndex: 5 },
  { label: 'Ladakh Passes', search: 'Leh & Nubra', cityObjIndex: 6 },
]

export default function HeroSection() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('destinations')
  const [selectedCity, setSelectedCity] = useState<DestinationItem>(curatedDestinations[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false)

  const [selectedDuration, setSelectedDuration] = useState(defaultDuration)
  const initialStartDate = new Date().toISOString().slice(0, 10)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(addDaysToDate(new Date(), 1))
  const [startDateInput, setStartDateInput] = useState(formatDateForDisplay(initialStartDate))
  const [endDateInput, setEndDateInput] = useState(formatDateForDisplay(addDaysToDate(new Date(), 1)))
  const [selectedExperience, setSelectedExperience] = useState<DestinationExperience>(goldenSpotExperience)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const durationContainerRef = useRef<HTMLDivElement>(null)
  const experienceContainerRef = useRef<HTMLDivElement>(null)

  // Current available experiences based on the selected city or search query
  const availableExperiences: DestinationExperience[] = selectedCity.experiences?.length
    ? selectedCity.experiences
    : genericExperiences

  const handleDurationSelect = (duration: typeof defaultDuration) => {
    setSelectedDuration(duration)
    setSelectedExperience(getGoldenSpotForDuration(selectedCity, duration.value))
    setShowDurationDropdown(false)
    setShowExperienceDropdown(true)
  }

  const handleDateChange = (nextStartDate: string, nextEndDate: string) => {
    if (!nextStartDate || !nextEndDate) return
    if (nextEndDate < nextStartDate) {
      setStartDate(nextStartDate)
      setEndDate(nextStartDate)
      setStartDateInput(formatDateForDisplay(nextStartDate))
      setEndDateInput(formatDateForDisplay(nextStartDate))
      return
    }
    const days = getInclusiveDateDifference(nextStartDate, nextEndDate)
    setStartDate(nextStartDate)
    setEndDate(nextEndDate)
    setStartDateInput(formatDateForDisplay(nextStartDate))
    setEndDateInput(formatDateForDisplay(nextEndDate))
    if (days >= 1) {
      setSelectedDuration({
        value: `${days} Days`,
        label: `${days} Days`,
        badge: 'Date range',
        desc: `${nextStartDate} to ${nextEndDate}`,
      })
      setSelectedExperience(getGoldenSpotForDuration(selectedCity, `${days} Days`))
    }
  }

  // Helper when selecting a city: automatically set the authentic style for that destination
  const handleSelectCity = (city: DestinationItem) => {
    setSelectedCity(city)
    setSearchQuery(`${city.city}, ${city.state}`)
    setShowDestDropdown(false)
    setShowDurationDropdown(true)
    setShowExperienceDropdown(false)
    if (selectedDuration.value) {
      setSelectedExperience(getGoldenSpotForDuration(city, selectedDuration.value))
    } else {
      setSelectedExperience(goldenSpotExperience)
    }
  }

  // Filter suggestions
  const filtered = searchQuery.trim() === ''
    ? curatedDestinations
    : curatedDestinations.filter(d =>
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sub.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setShowDestDropdown(false)
      }
      if (durationContainerRef.current && !durationContainerRef.current.contains(target)) {
        setShowDurationDropdown(false)
      }
      if (experienceContainerRef.current && !experienceContainerRef.current.contains(target)) {
        setShowExperienceDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-start pt-24 lg:pt-28 pb-16 sm:pb-20 bg-slate-950 z-20">

      {/* ── High-Impact Cinematic Background Image (MMT Style) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={selectedCity.city}
          src={selectedCity.image || "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=85&auto=format"}
          alt={`${selectedCity.city} Panorama`}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=85&auto=format'
          }}
        />
        {/* Cinematic dark overlay preserving full photo vibrancy & text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-950" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Headline text on dark backdrop for dramatic punch */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Experience India Like Never Before.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-slate-300 font-medium"
          >
            Discover verified monuments, curated heritage stays, regional food trails, and smart day-by-day itineraries.
          </motion.p>
        </div>

        {/* ── MakeMyTrip Style Main Booking & Search Engine Card ── */}
        <div className="max-w-6xl mx-auto">

          {/* Top Floating Category Ribbon (MMT Icon Dock) */}
          <div className="bg-white rounded-t-3xl border border-b-0 border-slate-200 shadow-2xl px-3 sm:px-6 pt-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[700px] sm:min-w-0">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-t-xl transition-all cursor-pointer relative ${isActive
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                      }`}
                  >
                    <div className="relative">
                      <Icon
                        size={22}
                        className={`transition-transform duration-200 ${isActive ? 'text-blue-600 scale-110' : 'text-slate-500'
                          }`}
                      />
                      {tab.badge && (
                        <span className="absolute -top-2 -right-3 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-rose-500 text-white shadow-xs">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-[13px] tracking-tight whitespace-nowrap">
                      {tab.label}
                    </span>

                    {/* Active Bottom Underline Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-sm"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Segmented Search Panel */}
          <div className="relative bg-white rounded-b-3xl border border-slate-200 shadow-2xl p-5 sm:p-7 pt-5 pb-10 sm:pb-12">

            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <span>Must-See Attractions · Verified Heritage · Tailored Trails</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck size={13} /> ASI & Regional Data Verified
              </span>
            </div>

            {/* Segmented Inputs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border-2 border-slate-200 bg-white divide-y lg:divide-y-0 lg:divide-x-2 divide-slate-200 mb-1 sm:mb-2 shadow-xs">

              {/* SEGMENT 1: Destination (5 Cols) */}
              <div
                ref={searchContainerRef}
                className="lg:col-span-5 p-4 sm:p-5 hover:bg-blue-50/40 cursor-pointer transition-colors relative group z-40"
              >
                <div
                  onClick={() => {
                    setShowDestDropdown(true)
                    setShowDurationDropdown(false)
                    setShowExperienceDropdown(false)
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    <span className="group-hover:text-blue-600 transition-colors">Search Destination / Region</span>
                    <MapPin size={15} className="text-blue-600" />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        const val = e.target.value
                        setSearchQuery(val)
                        setShowDestDropdown(true)
                        const cleanVal = val.toLowerCase().trim()
                        const firstWord = cleanVal.split(',')[0].trim()
                        const match = curatedDestinations.find(
                          d => d.city.toLowerCase() === cleanVal ||
                            cleanVal.includes(d.city.toLowerCase()) ||
                            (firstWord.length >= 3 && d.city.toLowerCase().includes(firstWord)) ||
                            `${d.city}, ${d.state}`.toLowerCase() === cleanVal
                        )
                        if (match) {
                          setSelectedCity(match)
                          if (selectedDuration.value) {
                            setSelectedExperience(getGoldenSpotForDuration(match, selectedDuration.value))
                          } else {
                            setSelectedExperience(goldenSpotExperience)
                          }
                        }
                      }}
                      onFocus={() => {
                        setShowDestDropdown(true)
                        setShowDurationDropdown(false)
                        setShowExperienceDropdown(false)
                      }}
                      placeholder="Search a destination, city, or region..."
                      className="w-full bg-transparent font-display font-black text-2xl sm:text-3xl text-slate-900 placeholder:text-slate-400 placeholder:font-bold focus:outline-none truncate cursor-pointer"
                    />
                  </div>

                </div>

                {/* Autocomplete Dropdown */}
                <AnimatePresence>
                  {showDestDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-full sm:w-[480px] mt-3 bg-white rounded-2xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] z-50 p-2 max-h-80 overflow-y-auto divide-y divide-slate-100"
                    >
                      <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Curated Destinations</span>
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                          Adaptive Styles
                        </span>
                      </div>
                      {filtered.map((item, index) => {
                        const isSelected = selectedCity.city === item.city
                        return (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectCity(item)
                            }}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group ${isSelected ? 'bg-blue-50 border border-blue-200/80' : 'hover:bg-slate-50'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                                <img
                                  src={item.image}
                                  alt={item.city}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&q=80&auto=format'
                                  }}
                                />
                              </div>
                              <div>
                                <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                  {item.city}, <span className="text-slate-500 font-normal">{item.state}</span>
                                  {isSelected && <Check size={14} className="text-blue-600 stroke-[3]" />}
                                </div>
                                <div className="text-xs text-slate-500">{item.sub}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="badge-rating">{item.rating} ★</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEGMENT 2: Duration & Best Season (3 Cols) */}
              <div
                ref={durationContainerRef}
                className={`lg:col-span-3 p-4 sm:p-5 hover:bg-blue-50/40 cursor-pointer transition-colors relative group ${showDurationDropdown ? 'z-50' : 'z-30'}`}
              >
                <div
                  onClick={() => {
                    setShowDurationDropdown(!showDurationDropdown)
                    setShowDestDropdown(false)
                    setShowExperienceDropdown(false)
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    <span className="group-hover:text-blue-600 transition-colors">Duration</span>
                    <Calendar size={15} className="text-blue-600" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`min-w-0 flex-1 font-display font-black text-2xl sm:text-3xl truncate ${selectedDuration.value ? 'text-slate-900' : 'text-slate-400'
                        }`}
                    >
                      {startDate && endDate
                        ? `${formatDateForDisplay(startDate)} – ${formatDateForDisplay(endDate)}`
                        : selectedDuration.value
                          ? selectedDuration.value.replace(' (2 Days)', '').replace(' (7 Days)', '')
                          : selectedDuration.label}
                    </span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${showDurationDropdown ? 'rotate-180 text-blue-600' : ''}`} />
                  </div>

                </div>

                {/* Custom Duration Dropdown */}
                <AnimatePresence>
                  {showDurationDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-full sm:w-[320px] mt-3 bg-white rounded-2xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] z-50 p-2 divide-y divide-slate-100"
                    >
                      <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Trip Dates
                      </div>
                      <div className="p-1 pt-2">
                        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">Select Dates</span>
                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                              {getInclusiveDateDifference(startDate, endDate)} day{getInclusiveDateDifference(startDate, endDate) === 1 ? '' : 's'} selected
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5">
                            <label className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                              Start date
                              <input
                                type="text"
                                value={startDateInput}
                                placeholder="DD/MM/YYYY"
                                inputMode="numeric"
                                maxLength={10}
                                onChange={(event) => {
                                  const value = normalizeDateInput(event.target.value)
                                  setStartDateInput(value)
                                  const parsedDate = parseDisplayDate(value)
                                  if (parsedDate && parsedDate >= initialStartDate) {
                                    handleDateChange(parsedDate, endDate < parsedDate ? parsedDate : endDate)
                                  }
                                }}
                                onBlur={() => setStartDateInput(formatDateForDisplay(startDate))}
                                onClick={(event) => event.stopPropagation()}
                                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-xs"
                              />
                            </label>
                            <label className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                              End date
                              <input
                                type="text"
                                value={endDateInput}
                                placeholder="DD/MM/YYYY"
                                inputMode="numeric"
                                maxLength={10}
                                onChange={(event) => {
                                  const value = normalizeDateInput(event.target.value)
                                  setEndDateInput(value)
                                  const parsedDate = parseDisplayDate(value)
                                  if (parsedDate && parsedDate >= startDate) {
                                    handleDateChange(startDate, parsedDate)
                                  }
                                }}
                                onBlur={() => setEndDateInput(formatDateForDisplay(endDate))}
                                onClick={(event) => event.stopPropagation()}
                                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-xs"
                              />
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowDurationDropdown(false)
                              setShowExperienceDropdown(true)
                            }}
                            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            Apply Dates
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEGMENT 3: Experience & Style (4 Cols - Rich Customized Dynamic Dropdown) */}
              <div
                ref={experienceContainerRef}
                className="lg:col-span-4 p-4 sm:p-5 hover:bg-amber-50/30 cursor-pointer transition-colors relative group z-30"
              >
                <div
                  onClick={() => {
                    setShowExperienceDropdown(!showExperienceDropdown)
                    setShowDestDropdown(false)
                    setShowDurationDropdown(false)
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    <span className="group-hover:text-amber-600 transition-colors">Experience & Style</span>
                    <Sparkles size={15} className="text-amber-500" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`min-w-0 flex-1 font-display font-black text-2xl sm:text-3xl truncate ${selectedExperience.id === goldenSpotExperience.id ? 'text-slate-400' : 'text-slate-900'
                        }`}
                    >
                      {selectedExperience.title}
                    </span>
                    <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform duration-200 ${showExperienceDropdown ? 'rotate-180 text-amber-600' : ''}`} />
                  </div>

                  <div className="text-xs font-semibold text-slate-500 mt-1 truncate">
                    {selectedExperience.sub}
                  </div>
                </div>

                {/* ── Premium High-End Experience Dropdown ── */}
                <AnimatePresence>
                  {showExperienceDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 w-full sm:w-[440px] mt-3 bg-white rounded-2xl border border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] z-50 p-2.5 max-h-[380px] overflow-y-auto divide-y divide-slate-100"
                    >
                      <div className="px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span>Experiences for {selectedCity.city}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Authentic Local Highlights
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        {availableExperiences.map((exp, idx) => {
                          const IconComp = exp.icon || Sparkles
                          const isSelected = selectedExperience.id === exp.id
                          return (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedExperience(exp)
                                setShowExperienceDropdown(false)
                              }}
                              className={`p-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 group/item ${isSelected
                                ? 'bg-amber-50/80 border-2 border-amber-300 shadow-xs'
                                : 'hover:bg-slate-50 border border-transparent'
                                }`}
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected
                                  ? 'bg-amber-500 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 group-hover/item:bg-amber-100 group-hover/item:text-amber-700'
                                  }`}>
                                  <IconComp size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-sm text-slate-900 group-hover/item:text-amber-700 transition-colors">
                                      {exp.title}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-500 font-medium mt-0.5 leading-snug line-clamp-2">
                                    {exp.sub}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${isSelected
                                  ? 'bg-amber-200 text-amber-900'
                                  : 'bg-slate-100 text-slate-600 group-hover/item:bg-amber-50 group-hover/item:text-amber-800'
                                  }`}>
                                  {exp.tag}
                                </span>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                                    <Check size={12} strokeWidth={3} />
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* ── MakeMyTrip Signature Floating Search Button ── */}
            <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-20">
              <button
                type="button"
                onClick={() => {
                  const queryLower = searchQuery.toLowerCase().trim()
                  if (!queryLower) {
                    setShowDestDropdown(true)
                    return
                  }
                  const firstPart = queryLower.split(',')[0].trim()

                  // 1. Look for matching destination in curated list
                  const matchedDestination = curatedDestinations.find(
                    d => d.city.toLowerCase() === queryLower ||
                      queryLower.includes(d.city.toLowerCase()) ||
                      (firstPart.length >= 3 && d.city.toLowerCase().includes(firstPart)) ||
                      d.state.toLowerCase().includes(queryLower)
                  )

                  const targetCity = matchedDestination ? matchedDestination.city : firstPart
                  const duration = selectedDuration.value
                  const style = selectedExperience.title
                  navigate(`/destination?city=${encodeURIComponent(targetCity)}&duration=${encodeURIComponent(duration)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&style=${encodeURIComponent(style)}`)
                }}
                className="inline-flex items-center justify-center gap-3 px-12 sm:px-14 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_12px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer uppercase tracking-wider"
              >
                <Search size={20} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>

          </div>

          {/* Quick Popular Circuit Chips (below search card) */}
          <div className="mt-11 sm:mt-13 flex flex-wrap items-center justify-center gap-2 text-xs relative z-20">
            <span className="flex items-center gap-1.5 font-bold text-white/90 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xs">
              <TrendingUp size={14} className="text-amber-400" />
              Popular Searches:
            </span>
            {trendingChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const targetCity = curatedDestinations[chip.cityObjIndex] || curatedDestinations.find(c => c.city.toLowerCase().includes(chip.search.toLowerCase()))
                  if (targetCity) {
                    handleSelectCity(targetCity)
                  }
                }}
                className="px-3.5 py-1.5 rounded-full bg-black/35 hover:bg-black/55 text-white/95 hover:text-white border border-white/20 hover:border-white/40 shadow-xs backdrop-blur-md transition-all cursor-pointer font-medium"
              >
                {chip.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
