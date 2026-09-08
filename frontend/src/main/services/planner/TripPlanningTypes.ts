import type { Place, StayHotel, FoodSpot, GeoCoordinates } from '../../types/destination'

export type TransportMode = 'walking' | 'public_transit' | 'auto_rickshaw' | 'cab' | 'rental' | 'mixed'

export type BudgetTier = 'backpacker' | 'smart_budget' | 'comfort' | 'premium' | 'custom'

export type TravelPriority = 'must_visit' | 'want_to_visit' | 'optional'

export interface DailyTimeWindow {
  startTime: string // e.g., "08:30"
  endTime: string   // e.g., "20:00"
  bufferMinutes?: number
}

export interface SelectedPlaceItem {
  placeId: string
  priority: TravelPriority
  customNotes?: string
  locked?: boolean
  lockedTime?: string
  lockedDay?: number
}

export interface TripBudgetInput {
  amount: number
  mode: 'total' | 'daily'
  tier: BudgetTier
}

export interface BudgetBreakdown {
  stay: number
  food: number
  transport: number
  tickets: number
  experiences: number
  misc: number
  totalEstimated: number
  difference: number
  isOverBudget: boolean
  savingsSuggestions: {
    title: string
    savingAmount: number
    actionType: 'transport' | 'stay' | 'optional_places' | 'budget_bump'
  }[]
}

export interface PlannedStop {
  id: string
  placeId: string
  placeName: string
  hindiName?: string
  category: string
  categoryLabel: string
  timeSlot: string
  startTime: string
  endTime: string
  durationMin: number
  travelFromPrevMin: number
  distanceFromPrevKm: number
  estimatedCost: number
  priority: TravelPriority
  locked: boolean
  isMealStop?: boolean
  mealType?: 'breakfast' | 'lunch' | 'dinner'
  coordinates?: GeoCoordinates
  notes?: string
  image?: string
  explanation?: string
}

export interface PlannedDay {
  dayNumber: number
  dateLabel: string
  themeTitle: string
  startTime: string
  endTime: string
  stops: PlannedStop[]
  totalDistanceKm: number
  totalTravelTimeMin: number
  totalSightseeingTimeMin: number
  totalDaySpend: number
  freeTimeMin: number
}

export interface PlanExplanationItem {
  stopId?: string
  placeName?: string
  type: 'timing' | 'proximity' | 'priority' | 'closure' | 'meal' | 'budget'
  title: string
  detail: string
}

export interface PlanHealthMetrics {
  score: number // 0 - 100
  label: 'Excellent Fit' | 'Good Fit' | 'Tight Schedule' | 'Over Budget' | 'Needs Adjustment'
  summary: string
  factors: {
    name: string
    rating: 'positive' | 'neutral' | 'warning'
    detail: string
  }[]
}

export interface ConstraintValidationResult {
  isFeasible: boolean
  mustVisitCount: number
  totalPlacesCount: number
  totalSightseeingHoursRequired: number
  totalAvailableSightseeingHours: number
  differenceHours: number
  message?: string
  warningType?: 'time_overflow' | 'budget_overflow' | 'closed_day'
  resolutionOptions: {
    label: string
    action: 'increase_days' | 'extend_hours' | 'downgrade_must_visit' | 'proceed_anyway'
  }[]
}

export interface UserTripRequest {
  destinationSlug: string
  destinationName: string
  daysCount: number
  dailyTime: DailyTimeWindow
  budget: TripBudgetInput
  transport: TransportMode
  travelStyles: string[]
  selectedPlaces: Record<string, TravelPriority>
  lockedStops?: Record<string, { lockedTime?: string; lockedDay?: number }>
  startLocationType: 'hotel' | 'railway' | 'airport' | 'current' | 'custom'
  selectedHotelId?: string
  includeFoodStops: boolean
}

export interface PlannedTrip {
  id: string
  tripTitle: string
  destinationSlug: string
  destinationName: string
  daysCount: number
  days: PlannedDay[]
  budgetBreakdown: BudgetBreakdown
  health: PlanHealthMetrics
  explainabilityLogs: PlanExplanationItem[]
  selectedHotel?: StayHotel
  nearbyFoodSpots?: FoodSpot[]
  nearbyStays?: StayHotel[]
  excludedPlaces: {
    placeId: string
    placeName: string
    priority: TravelPriority
    reason: string
  }[]
  createdAt: string
}
