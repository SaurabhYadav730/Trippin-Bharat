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

const durationOptions = [
  { value: 'Weekend (2 Days)', label: 'Weekend (2 Days)', badge: 'Quick Getaway', desc: 'Highlights & essential spots' },
  { value: '3–5 Days', label: '3–5 Days', badge: 'Recommended', desc: 'Balanced circuit & rich experiences' },
  { value: '1 Week (7 Days)', label: '1 Week (7 Days)', badge: 'Deep Dive', desc: 'Comprehensive heritage & hidden gems' },
  { value: '10+ Days', label: '10+ Days', badge: 'Grand Circuit', desc: 'All-inclusive multi-region expedition' },
]

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
  const [searchQuery, setSearchQuery] = useState('Jaipur, Rajasthan')
  const [showDestDropdown, setShowDestDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false)
  
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[1])
  const [selectedExperience, setSelectedExperience] = useState<DestinationExperience>(curatedDestinations[0].experiences[0])

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const durationContainerRef = useRef<HTMLDivElement>(null)
  const experienceContainerRef = useRef<HTMLDivElement>(null)

  // Current available experiences based on the selected city or search query
  const availableExperiences: DestinationExperience[] = selectedCity.experiences?.length
    ? selectedCity.experiences
    : genericExperiences

  // Helper when selecting a city: automatically set the authentic style for that destination
  const handleSelectCity = (city: DestinationItem) => {
    setSelectedCity(city)
    setSearchQuery(`${city.city}, ${city.state}`)
    setShowDestDropdown(false)
    if (city.experiences && city.experiences.length > 0) {
      setSelectedExperience(city.experiences[0])
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

  const ExpIcon = selectedExperience.icon || Sparkles

  return (
    <section className="relative pt-24 lg:pt-28 pb-32 sm:pb-40 bg-slate-900 z-20">
      
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
        {/* Deep cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-slate-950/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
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
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-t-xl transition-all cursor-pointer relative ${
                      isActive
                        ? 'text-blue-600 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 font-bold'
                    }`}
                  >
                    <div className="relative">
                      <Icon 
                        size={22} 
                        className={`transition-transform duration-200 ${
                          isActive ? 'text-blue-600 scale-110' : 'text-slate-500'
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
                          if (match.experiences && match.experiences.length > 0) {
                            if (!match.experiences.some(exp => exp.id === selectedExperience.id)) {
                              setSelectedExperience(match.experiences[0])
                            }
                          }
                        }
                      }}
                      onFocus={() => {
                        setShowDestDropdown(true)
                        setShowDurationDropdown(false)
                        setShowExperienceDropdown(false)
                      }}
                      placeholder="Search 'Jaipur', 'Shillong', 'Varanasi'..."
                      className="w-full bg-transparent font-black text-2xl sm:text-3xl text-slate-900 placeholder:text-slate-400 placeholder:font-bold focus:outline-none truncate cursor-pointer"
                    />
                  </div>

                  <div className="text-xs font-semibold text-slate-500 mt-1 truncate">
                    {selectedCity.sub}
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
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group ${
                              isSelected ? 'bg-blue-50 border border-blue-200/80' : 'hover:bg-slate-50'
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
                className="lg:col-span-3 p-4 sm:p-5 hover:bg-blue-50/40 cursor-pointer transition-colors relative group z-30"
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

                  <div className="flex items-center justify-between">
                    <span className="font-black text-2xl sm:text-3xl text-slate-900 truncate">
                      {selectedDuration.value.replace(' (2 Days)', '').replace(' (7 Days)', '')}
                    </span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${showDurationDropdown ? 'rotate-180 text-blue-600' : ''}`} />
                  </div>

                  <div className="text-xs font-semibold text-slate-500 mt-1 truncate flex items-center gap-1.5">
                    <span className="text-blue-600 font-bold">{selectedCity.bestSeason ? `Season: ${selectedCity.bestSeason}` : 'Best: Oct–Mar'}</span>
                    <span>·</span>
                    <span className="truncate">{selectedDuration.desc}</span>
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
                        Trip Duration & Pace
                      </div>
                      <div className="space-y-1 pt-1">
                        {durationOptions.map((opt, idx) => {
                          const isSel = selectedDuration.value === opt.value
                          return (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedDuration(opt)
                                setShowDurationDropdown(false)
                              }}
                              className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                                isSel ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div>
                                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                  {opt.label}
                                  {isSel && <Check size={14} className="text-blue-600 stroke-[3]" />}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                              </div>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {opt.badge}
                              </span>
                            </div>
                          )
                        })}
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
                    <span className="group-hover:text-amber-600 transition-colors flex items-center gap-1">
                      Experience & Style
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 uppercase">
                        {selectedExperience.tag}
                      </span>
                    </span>
                    <Sparkles size={15} className="text-amber-500" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                        <ExpIcon size={16} />
                      </div>
                      <span className="font-black text-lg sm:text-xl text-slate-900 truncate">
                        {selectedExperience.title}
                      </span>
                    </div>
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
                              className={`p-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 group/item ${
                                isSelected 
                                  ? 'bg-amber-50/80 border-2 border-amber-300 shadow-xs' 
                                  : 'hover:bg-slate-50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected 
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
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                  isSelected 
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
                  const firstPart = queryLower.split(',')[0].trim()
                  
                  // 1. Look for matching destination in curated list
                  const matchedDestination = curatedDestinations.find(
                    d => d.city.toLowerCase() === queryLower ||
                         queryLower.includes(d.city.toLowerCase()) ||
                         (firstPart.length >= 3 && d.city.toLowerCase().includes(firstPart)) ||
                         d.state.toLowerCase().includes(queryLower)
                  )
                  
                  const targetCity = matchedDestination ? matchedDestination.city : (firstPart || selectedCity.city)
                  const duration = selectedDuration.value
                  const style = selectedExperience.title
                  navigate(`/destination?city=${encodeURIComponent(targetCity)}&duration=${encodeURIComponent(duration)}&style=${encodeURIComponent(style)}`)
                }}
                className="inline-flex items-center justify-center gap-3 px-12 sm:px-14 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_12px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer uppercase tracking-wider"
              >
                <Search size={20} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>

          </div>

          {/* Quick Popular Circuit Chips (below search card) */}
          <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <TrendingUp size={14} className="text-rose-400" />
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
                className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer font-medium"
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

