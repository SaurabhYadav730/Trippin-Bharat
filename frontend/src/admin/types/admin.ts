export type EntityStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived'

export type VerificationState = 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface TimeWindow {
  open: string  // e.g. "09:00"
  close: string // e.g. "17:00"
}

export interface DaySchedule {
  isOpen: boolean
  windows: TimeWindow[]
  specialNote?: string
}

export interface WeeklySchedule {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface BestTimeConfig {
  bestTimeOfDay: 'Early Morning' | 'Morning' | 'Afternoon' | 'Sunset' | 'Evening' | 'Night'
  bestTimeDescription: string
  bestSeason: string
}

export interface EntryFeeConfig {
  indian: number
  foreign: number
  student?: number
  camera?: number
  priceType: 'free' | 'fixed' | 'tiered'
}

export interface AdminDestination {
  id: string
  name: string
  slug: string
  state: string
  region: string
  country: string
  locality?: string
  tagline: string
  description: string
  heroImage: string
  gallery: string[]
  coordinates: GeoPoint
  bestSeason: string
  bestDuration: string
  approxBudgetPerDay: {
    budget: number
    comfort: number
    luxury: number
  }
  tags: string[]
  travelStyles: string[]
  featured: boolean
  status: EntityStatus
  verificationStatus: VerificationState
  tripEngineReadiness: number // 0-100%
  dataHealth: number // 0-100%
  lastVerified: string
  verifiedBy?: string
  attractionsCount?: number
  hotelsCount?: number
  restaurantsCount?: number
  experiencesCount?: number
}

export type AttractionCategory =
  | 'heritage'
  | 'palace'
  | 'temple'
  | 'fort'
  | 'monument'
  | 'museum'
  | 'lake'
  | 'nature'
  | 'hidden_gem'
  | 'craft'
  | 'waterfall'

export interface AdminAttraction {
  id: string
  name: string
  hindiName?: string
  category: AttractionCategory
  categoryLabel: string
  destinationId: string
  destinationName: string
  description: string
  shortDescription: string
  coordinates: GeoPoint
  address: string
  heroImage: string
  images: string[]
  entryFee: EntryFeeConfig
  openingHours: WeeklySchedule
  closedDays: string[]
  bestTime: BestTimeConfig
  recommendedVisitDurationMin: number
  // Internal Planning Signals for Itinerary Engine
  importanceScore: number   // 1 - 10
  culturalScore: number     // 1 - 10
  historicalScore: number   // 1 - 10
  popularityScore: number   // 1 - 10
  uniquenessScore: number   // 1 - 10
  priorityCategory: 'featured' | 'must_see' | 'recommended' | 'optional'
  familyFriendly: boolean
  accessibility: boolean
  photography: boolean
  tags: string[]
  status: EntityStatus
  verificationStatus: VerificationState
  source: string
  lastVerified: string
  verifiedBy?: string
  usedInTripsCount: number
  usedInCollectionsCount: number
}

export interface AdminHotel {
  id: string
  name: string
  destinationId: string
  destinationName: string
  coordinates: GeoPoint
  address: string
  description: string
  heroImage: string
  images: string[]
  baseEstimatedPrice: number
  livePrice?: number
  isLivePricing: boolean
  rating: number
  reviewsCount: number
  tier: 'budget' | 'comfort' | 'luxury'
  type: string
  amenities: string[]
  roomTypes: string[]
  contactPhone?: string
  website?: string
  featured: boolean
  status: EntityStatus
  verificationStatus: VerificationState
  lastVerified: string
  verifiedBy?: string
}

export interface AdminRestaurant {
  id: string
  name: string
  destinationId: string
  destinationName: string
  coordinates: GeoPoint
  address: string
  cuisine: string
  cuisineId?: string
  priceRange: 'budget' | 'moderate' | 'fine_dining'
  priceForTwo: number
  rating: number
  openingHours: string
  closedDays: string[]
  isVeg: boolean
  isVegan: boolean
  isJainFriendly: boolean
  localSpecialties: string[]
  mustTryDishes: string[]
  description: string
  heroImage: string
  images: string[]
  featured: boolean
  status: EntityStatus
  verificationStatus: VerificationState
  lastVerified: string
  verifiedBy?: string
}

export interface CuisineItem {
  id: string
  name: string
  region: string
  description: string
  image: string
  destinationIds: string[]
  dishCount: number
  signatureDishes: string[]
}

export interface DishItem {
  id: string
  name: string
  cuisineId: string
  cuisineName: string
  destinationId: string
  destinationName: string
  isVeg: boolean
  priceEstimate: number
  description: string
  image: string
  recommendedRestaurantIds: string[]
  flavorProfile: string
}

export interface AdminExperience {
  id: string
  title: string
  category: 'cultural' | 'adventure' | 'photography' | 'shopping' | 'workshops' | 'local_activities' | 'festivals'
  categoryLabel: string
  location: string
  destinationId: string
  destinationName: string
  duration: string
  durationMin: number
  price: number
  bestTime: string
  season: string
  coordinates: GeoPoint
  highlights: string[]
  description: string
  heroImage: string
  images: string[]
  status: EntityStatus
  verificationStatus: VerificationState
  lastVerified: string
  verifiedBy?: string
}

export interface MediaUsage {
  entityType: 'destination' | 'attraction' | 'hotel' | 'restaurant' | 'experience' | 'collection'
  entityId: string
  entityName: string
}

export interface MediaItem {
  id: string
  title: string
  url: string
  altText: string
  caption: string
  source: string
  license: 'Public Domain' | 'Creative Commons' | 'Direct Ownership' | 'Editorial License' | 'ASI Verified'
  attribution: string
  uploadedBy: string
  createdAt: string
  fileSize: string
  dimensions: string
  format: string
  usedBy: MediaUsage[]
}

export interface VerificationRequest {
  id: string
  entityType: 'attraction' | 'destination' | 'hotel' | 'restaurant' | 'experience'
  entityId: string
  entityName: string
  destinationName: string
  submittedBy: string
  submittedAt: string
  currentStatus: VerificationState
  changesSummary: string
  reviewerNotes?: string
  sourceProof?: string
  verifiedBy?: string
  verifiedAt?: string
}

export type DataQualitySeverity = 'critical' | 'warning' | 'info'

export interface DataQualityIssue {
  id: string
  entityType: 'destination' | 'attraction' | 'hotel' | 'restaurant'
  entityId: string
  entityName: string
  destinationName: string
  severity: DataQualitySeverity
  issueType:
    | 'missing_coordinates'
    | 'missing_images'
    | 'missing_opening_hours'
    | 'missing_best_time'
    | 'missing_entry_fee'
    | 'duplicate_candidate'
    | 'invalid_coordinates'
    | 'geo_distance_outlier'
    | 'suspicious_price'
    | 'incomplete_description'
  message: string
  recommendation: string
}

export interface DuplicatePair {
  id: string
  similarityPercentage: number
  distanceMeters: number
  reason: string
  recordA: {
    id: string
    name: string
    destination: string
    category: string
    coordinates: GeoPoint
    description: string
    images: string[]
    openingHours: string
    entryFee: number
    lastVerified: string
  }
  recordB: {
    id: string
    name: string
    destination: string
    category: string
    coordinates: GeoPoint
    description: string
    images: string[]
    openingHours: string
    entryFee: number
    lastVerified: string
  }
  status: 'pending' | 'merged' | 'dismissed'
}

export interface ImportBatch {
  id: string
  timestamp: string
  fileName: string
  entityType: 'attraction' | 'hotel' | 'restaurant' | 'destination'
  totalRows: number
  insertedCount: number
  updatedCount: number
  invalidCount: number
  duplicateCount: number
  status: 'previewed' | 'applied' | 'rolled_back'
  records: any[]
  errors: string[]
  auditLogId: string
}

export type AdminAuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'PUBLISH'
  | 'UNPUBLISH'
  | 'VERIFY'
  | 'REJECT'
  | 'MERGE'
  | 'ROLLBACK'
  | 'IMPORT'

export interface AuditLogEntry {
  id: string
  timestamp: string
  adminUser: string
  role: string
  action: AdminAuditAction
  entityType: string
  entityId: string
  entityName: string
  summary: string
  fieldChanges?: {
    fieldName: string
    from: any
    to: any
  }[]
  previousState?: any
  newState?: any
}

export type AdminRole =
  | 'Admin'
  | 'Content Admin'
  | 'Tourism Data Editor'
  | 'Verification Manager'
  | 'Moderator'
  | 'Analyst'

export interface AdminUserProfile {
  id: string
  name: string
  email: string
  role: AdminRole
  avatar: string
  activeSessions: number
  lastLogin: string
}

export interface SystemIntegration {
  id: string
  name: string
  type: 'map' | 'geocoding' | 'routing' | 'hotel_api' | 'restaurant_api' | 'email' | 'storage' | 'database'
  status: 'connected' | 'degraded' | 'disconnected'
  latencyMs: number
  uptimePercent: number
  errorRate: number
  lastChecked: string
  provider: string
}

export interface TripEngineSimulationParams {
  destinationSlug: string
  destinationName: string
  durationDays: number
  budgetTotalInr: number
  travelStyle: string
  transportMode: string
  mustVisitPlaceIds: string[]
}

export interface SimulationScoreBreakdown {
  placeId: string
  placeName: string
  finalScore: number
  positiveFactors: string[]
  negativeFactors: string[]
  timeFit: boolean
  budgetFit: boolean
}

export interface TripEngineSimulationResult {
  params: TripEngineSimulationParams
  itineraryDays: {
    dayNumber: number
    themeTitle: string
    totalCost: number
    totalDurationMin: number
    totalDistanceKm: number
    stops: {
      id: string
      placeName: string
      timeSlot: string
      durationMin: number
      cost: number
      distanceFromPrevKm: number
      category: string
      scoring: SimulationScoreBreakdown
    }[]
  }[]
  totalEstimatedCost: number
  budgetSurplusDeficit: number
  planFeasibilityScore: number // 0-100
  scoringBreakdowns: SimulationScoreBreakdown[]
  warnings: string[]
}
