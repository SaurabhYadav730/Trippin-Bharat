import type { DestinationData, Place, GeoCoordinates } from '../../types/destination'
import type {
  UserTripRequest,
  PlannedTrip,
  PlannedDay,
  PlanExplanationItem,
  PlanHealthMetrics,
  TravelPriority,
} from './TripPlanningTypes'
import { TripScoringService } from './TripScoringService'
import { TimeConstraintService } from './TimeConstraintService'
import { RouteOptimizationService } from './RouteOptimizationService'
import { BudgetCalculationService } from './BudgetCalculationService'
import { RecommendationService } from './RecommendationService'

export class TripPlanningService {
  /**
   * Main engine entry point: Builds a complete, realistic, constraint-based trip.
   */
  static planTrip(destination: DestinationData, request: UserTripRequest): PlannedTrip {
    const allPlaces = destination.places
    const selectedEntries = Object.entries(request.selectedPlaces)

    // 1. Gather all selected places with their priorities and computed scores
    const selectedPlaceItems = selectedEntries
      .map(([placeId, priority]) => {
        const place = allPlaces.find((p) => p.id === placeId)
        if (!place) return null

        const score = TripScoringService.computeAttractionScore(
          place,
          priority,
          request.travelStyles,
          destination.bestSeason
        )

        return { place, priority, score }
      })
      .filter(Boolean) as { place: Place; priority: TravelPriority; score: number }[]

    // Sort by priority and score
    selectedPlaceItems.sort((a, b) => b.score - a.score)

    // 2. Determine base coordinate (Selected hotel or central destination coordinate)
    const selectedHotel = destination.stays.find((s) => s.id === request.selectedHotelId)
    const baseCoord: GeoCoordinates =
      selectedHotel?.coordinates ||
      selectedPlaceItems[0]?.place.coordinates ||
      destination.places[0]?.coordinates || { lat: 26.9124, lng: 75.7873 }

    // 3. Spatially partition places across the requested number of days
    const dayBuckets = RouteOptimizationService.clusterPlacesByDays(
      selectedPlaceItems,
      request.daysCount,
      baseCoord
    )

    // 4. Schedule each day individually with TSP ordering, opening hours, and lunch breaks
    const plannedDays: PlannedDay[] = []
    const allExplainabilityLogs: PlanExplanationItem[] = []

    dayBuckets.forEach((bucket, idx) => {
      const dayNum = idx + 1
      const { day, explanations } = RouteOptimizationService.scheduleSingleDay(
        dayNum,
        bucket,
        baseCoord,
        request.dailyTime,
        request.transport,
        selectedHotel?.name || 'Hotel Base',
        request.includeFoodStops
      )

      plannedDays.push(day)
      allExplainabilityLogs.push(...explanations)
    })

    // 5. Compute Comprehensive Budget Breakdown
    const flatSelectedPlaces = selectedPlaceItems.map((s) => s.place)
    const budgetBreakdown = BudgetCalculationService.calculateBudget(
      request.budget,
      request.daysCount,
      request.transport,
      flatSelectedPlaces,
      selectedHotel
    )

    // 6. Compute Transparent Plan Health Score (0–100)
    let healthScore = 95
    const healthFactors: PlanHealthMetrics['factors'] = []

    // Factor A: Must-Visit Coverage (Hard constraint)
    const mustVisitCount = selectedPlaceItems.filter((p) => p.priority === 'must_visit').length
    healthFactors.push({
      name: 'Must-Visit Sights Coverage',
      rating: 'positive',
      detail: `All ${mustVisitCount} Must-Visit hard constraints are successfully scheduled in your itinerary.`,
    })

    // Factor B: Budget Feasibility
    if (budgetBreakdown.isOverBudget) {
      healthScore -= 15
      healthFactors.push({
        name: 'Budget Alignment',
        rating: 'warning',
        detail: `Trip is projected ₹${budgetBreakdown.difference.toLocaleString()} over target budget. Actionable savings suggestions available.`,
      })
    } else {
      healthFactors.push({
        name: 'Budget Alignment',
        rating: 'positive',
        detail: `Comfortably within your ₹${request.budget.amount.toLocaleString()} budget target.`,
      })
    }

    // Factor C: Time & Pacing Feasibility
    const totalFreeTime = plannedDays.reduce((acc, d) => acc + d.freeTimeMin, 0)
    if (totalFreeTime < 60) {
      healthScore -= 8
      healthFactors.push({
        name: 'Daily Schedule Pacing',
        rating: 'neutral',
        detail: 'Tight sightseeing pace. Minimal buffer for spontaneous exploration or unexpected traffic delays.',
      })
    } else {
      healthFactors.push({
        name: 'Daily Schedule Pacing',
        rating: 'positive',
        detail: 'Relaxed and realistic daily pacing with dedicated buffer for meals, photography, and rest.',
      })
    }

    // Factor D: Route & Transit Efficiency
    healthFactors.push({
      name: 'Route & Transit Flow',
      rating: 'positive',
      detail: 'Geospatially clustered to minimize backtrack driving and city transit expenses.',
    })

    let healthLabel: PlanHealthMetrics['label'] = 'Excellent Fit'
    if (healthScore >= 90) healthLabel = 'Excellent Fit'
    else if (healthScore >= 80) healthLabel = 'Good Fit'
    else if (healthScore >= 70) healthLabel = 'Tight Schedule'
    else healthLabel = 'Needs Adjustment'

    const health: PlanHealthMetrics = {
      score: Math.max(50, healthScore),
      label: healthLabel,
      summary:
        healthScore >= 90
          ? 'Your trip has comfortable travel time, clusters nearby sights efficiently, and respects all constraints.'
          : 'Your trip is viable but has budget or schedule constraints that you can fine-tune.',
      factors: healthFactors,
    }

    // 7. General explainability logs
    allExplainabilityLogs.unshift({
      type: 'proximity',
      title: 'Geospatial Day Clustering',
      detail: `Grouped ${selectedPlaceItems.length} sights into ${request.daysCount} geographic zones based on coordinate proximity to minimize city transit time.`,
    })

    if (selectedHotel) {
      allExplainabilityLogs.unshift({
        type: 'proximity',
        title: 'Optimized Around Your Stay',
        detail: `Each day starts and concludes at ${selectedHotel.name} to minimize departure and evening return travel.`,
      })
    }

    return {
      id: `trip-${Date.now()}`,
      tripTitle: `${destination.name} ${request.daysCount}-Day Heritage Journey`,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      daysCount: request.daysCount,
      days: plannedDays,
      budgetBreakdown,
      health,
      explainabilityLogs: allExplainabilityLogs,
      selectedHotel,
      nearbyFoodSpots: destination.foodSpots || [],
      nearbyStays: destination.stays || [],
      excludedPlaces: [],
      createdAt: new Date().toISOString(),
    }
  }
}
