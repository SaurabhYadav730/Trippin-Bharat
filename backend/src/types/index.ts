export interface GeoCoordinates {
  lat: number
  lng: number
}

export interface PlaceTimings {
  open: string
  close: string
  days: string[]
}

export interface EntryFee {
  indian: number
  foreign: number
  camera?: number
  currency: string
}

export interface Place {
  id: string
  name: string
  hindiName?: string
  tagline?: string
  category: string
  categoryLabel?: string
  image?: string
  images?: string[]
  rating: number
  reviewCount?: number
  reviewsCount?: number
  price?: number
  description: string
  shortDescription?: string
  timings?: string | PlaceTimings
  recommendedVisitDurationMin?: number
  timeRequired?: string
  entryFee?: {
    indian: number
    foreign: number
    student?: number
    camera?: number
    currency?: string
  }
  bestTime?: {
    bestTimeOfDay: 'Early Morning' | 'Morning' | 'Afternoon' | 'Evening' | 'Sunset' | 'Night'
    preferredSlots?: string[]
  }
  bestTimeToVisit?: string | any
  coordinates?: GeoCoordinates
  isAsiVerified?: boolean
  journeyLens?: any
  verificationStatus?: 'verified' | 'pending' | 'needs_update' | 'draft'
}

export interface StayHotel {
  id: string
  name: string
  tier: 'budget' | 'comfort' | 'luxury'
  type: string
  image: string
  pricePerNight: number
  rating: number
  amenities: string[]
}

export interface DestinationData {
  id: string
  name: string
  slug: string
  tagline: string
  heroImage: string
  overview: string
  idealDurationDays: number
  bestSeason: string
  coordinates: GeoCoordinates
  places: Place[]
  stays: StayHotel[]
  signatureFoods?: {
    name: string
    description: string
    bestSpot: string
  }[]
}

export interface ItineraryRequest {
  destinationSlug: string
  durationDays: number
  pace: 'relaxed' | 'balanced' | 'packed'
  budgetTier: 'budget' | 'comfort' | 'luxury'
  budgetInr?: number
  selectedPlaces?: string[]
  travelStyle?: string
}

export interface ItineraryDayPlan {
  dayNumber: number
  title: string
  stops: {
    timeSlot: string
    place: Place
    durationMin: number
    notes?: string
  }[]
  dayBudgetEst: number
}

export interface ItineraryResponse {
  destination: string
  durationDays: number
  pace: string
  estimatedTotalBudget: number
  days: ItineraryDayPlan[]
  algorithmMetrics: {
    placesConsidered: number
    placesScheduled: number
    satisfactionScore: number
    efficiencyPercent: number
  }
}
