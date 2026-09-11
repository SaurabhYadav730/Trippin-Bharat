export interface GeoCoordinates {
  lat: number
  lng: number
}

export interface NearbySpot {
  id: string
  name: string
  category: 'attraction' | 'stay' | 'food' | 'experience'
  distanceKm: number
  travelTimeMin: number
  image?: string
}

export interface Place {
  id: string
  name: string
  hindiName?: string
  tagline: string
  category: 'heritage' | 'palace' | 'temple' | 'lake' | 'hidden_gem' | 'museum' | 'craft' | 'waterfall' | 'nature'
  categoryLabel: string
  rating: number
  reviewCount: number
  images: string[]
  description: string
  coordinates: GeoCoordinates
  entryFee: {
    indian: number
    foreign: number
    student?: number
    camera?: number
  }
  timings: string
  bestTimeToVisit: string
  timeRequired: string
  isAsiVerified: boolean
  journeyLens: {
    history: string
    architecturalStyle: string
    architectureHighlights: string[]
    legendsAndStories: string[]
    bestPhotoSpots: string[]
    audioGuideAvailable: boolean
    audioGuidePreviewText?: string
  }
  nearbyWithin1Km: NearbySpot[]
  nearbyWithin5Km: NearbySpot[]
}

export interface StayHotel {
  id: string
  name: string
  type: 'heritage_palace' | 'boutique_haveli' | 'lakeview_resort' | 'budget_homestay' | 'luxury_palace' | 'boutique_heritage' | 'resort_lakeside' | string
  typeLabel?: string
  tier?: 'budget' | 'comfort' | 'luxury' | 'ultra_luxury'
  rating: number
  reviewsCount?: number
  image: string
  pricePerNight: number
  coordinates?: GeoCoordinates
  amenities: string[]
  address: string
  contactPhone?: string
  ownerName?: string
  description?: string
  galleryImages?: string[]
  galleryVideos?: string[]
  distanceToItineraryHighlights: {
    placeId: string
    placeName: string
    distanceKm: number
    drivingTimeMin: number
  }[]
  bookingUrl?: string
}

export interface FoodSpot {
  id: string
  name: string
  cuisineType: string
  type: 'heritage_restaurant' | 'street_food_legend' | 'lakeview_rooftop' | 'traditional_thali' | 'cafe' | 'local_specialty'
  rating: number
  priceForTwo: number
  image: string
  mustTryDishes: string[]
  specialty?: string
  timings: string
  address: string
  coordinates: GeoCoordinates
  isVeg: boolean
}

export interface CuratedExperience {
  id: string
  title: string
  category: 'art' | 'craft' | 'folk_culture' | 'boat_cruise' | 'heritage_walk' | 'photography' | 'adventure' | 'nature'
  categoryLabel: string
  duration: string
  price: number
  image: string
  description: string
  highlights: string[]
  timing: string
  location: string
  rating: number
}

export interface ItineraryStop {
  id: string
  placeId: string
  placeName: string
  category: string
  timeSlot: string
  durationMin: number
  travelFromPrevMin: number
  distanceFromPrevKm: number
  estimatedCost: number
  iconType: string
  notes?: string
  coordinates?: GeoCoordinates
}

export interface ItineraryDay {
  dayNumber: number
  themeTitle: string
  title?: string
  dateLabel?: string
  stops: ItineraryStop[]
  totalDistanceKm: number
  totalTravelTimeMin: number
  totalDaySpend: number
}

export interface DestinationData {
  id: string
  slug: string
  name: string
  state: string
  tagline: string
  shortBio: string
  heroBanner: string
  heroGallery: string[]
  bestSeason: string
  recommendedDays: string
  approxBudgetPerDay: {
    budget: number
    comfort: number
    luxury: number
  }
  weather: {
    tempC: number
    condition: string
    humidity: string
  }
  tourismStatus: {
    safetyScore: string
    crowdLevel: 'Low' | 'Moderate' | 'High'
    peakHours: string
  }
  curatedForStyles: {
    styleId: string
    styleTitle: string
    description: string
    recommendedPlaceIds: string[]
  }[]
  places: Place[]
  stays: StayHotel[]
  foodSpots: FoodSpot[]
  experiences: CuratedExperience[]
  defaultItinerary: ItineraryDay[]
}

export interface UserSavedTrip {
  id: string
  destinationName: string
  destinationSlug: string
  tripTitle: string
  durationDays: number
  savedAt: string
  placesCount: number
  days: ItineraryDay[]
}
