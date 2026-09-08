import { adminStorage } from './adminStorage'
import { destinationsDatabase } from '../../main/data/destinationData'
import { TripPlanningService } from '../../main/services/planner/TripPlanningService'
import type { DestinationData, Place } from '../../main/types/destination'
import type {
  TripEngineSimulationParams,
  TripEngineSimulationResult,
  SimulationScoreBreakdown,
} from '../types/admin'

export const tripLabService = {
  /**
   * Run simulation through the live planning engine
   */
  simulateTrip(params: TripEngineSimulationParams): TripEngineSimulationResult {
    const db = adminStorage.getDb()

    // Find destination from operational database or fallback
    const adminDest = db.destinations.find((d) => d.slug === params.destinationSlug)
    const baseDest: DestinationData = destinationsDatabase[params.destinationSlug] || destinationsDatabase['udaipur']

    // Build operational places list from Admin attractions
    const destinationAttractions = db.attractions.filter(
      (a) => a.destinationId === adminDest?.id || a.destinationName.toLowerCase() === params.destinationSlug.toLowerCase()
    )

    const placesToUse: Place[] = destinationAttractions.length > 0
      ? destinationAttractions.map((a) => ({
          id: a.id,
          name: a.name,
          hindiName: a.hindiName,
          tagline: a.shortDescription,
          category: (a.category === 'palace' ? 'palace' : a.category === 'temple' ? 'temple' : 'heritage') as any,
          categoryLabel: a.categoryLabel,
          rating: (a.importanceScore / 2) || 4.8,
          reviewCount: 420,
          images: a.images.length > 0 ? a.images : ['/images/places/city-palace.jpg'],
          description: a.description,
          coordinates: a.coordinates,
          entryFee: {
            indian: a.entryFee.indian,
            foreign: a.entryFee.foreign,
            camera: a.entryFee.camera,
          },
          timings: `${a.openingHours.monday.windows[0]?.open || '09:00'} - ${a.openingHours.monday.windows[0]?.close || '18:00'}`,
          bestTimeToVisit: a.bestTime.bestTimeOfDay,
          timeRequired: `${Math.round(a.recommendedVisitDurationMin / 60)} hours`,
          isAsiVerified: a.verificationStatus === 'verified',
          journeyLens: {
            history: a.description,
            architecturalStyle: 'Indo-Aryan & Rajput Heritage',
            architectureHighlights: a.tags,
            legendsAndStories: ['Centuries-old folklore preserved through oral Mewar traditions.'],
            bestPhotoSpots: ['Eastern Pavilion', 'Waterfront steps'],
            audioGuideAvailable: true,
          },
          nearbyWithin1Km: [],
          nearbyWithin5Km: [],
        }))
      : baseDest.places

    const mockDestination: DestinationData = {
      ...baseDest,
      name: adminDest?.name || baseDest.name,
      slug: adminDest?.slug || baseDest.slug,
      places: placesToUse,
    }

    // Build selected places map with must_visit priority
    const selectedPlaces: Record<string, 'must_visit' | 'want_to_visit' | 'optional'> = {}
    placesToUse.forEach((p) => {
      if (params.mustVisitPlaceIds.includes(p.id)) {
        selectedPlaces[p.id] = 'must_visit'
      } else {
        selectedPlaces[p.id] = 'want_to_visit'
      }
    })

    // Run TripPlanningService
    const planned = TripPlanningService.planTrip(mockDestination, {
      destinationSlug: params.destinationSlug,
      destinationName: params.destinationName,
      daysCount: params.durationDays,
      dailyTime: { startTime: '09:00', endTime: '19:30', bufferMinutes: 15 },
      budget: {
        amount: params.budgetTotalInr,
        mode: 'total',
        tier: params.budgetTotalInr < 5000 ? 'smart_budget' : params.budgetTotalInr < 15000 ? 'comfort' : 'premium',
      },
      transport: (params.transportMode as any) || 'auto_rickshaw',
      travelStyles: [params.travelStyle || 'Heritage & Architecture'],
      selectedPlaces,
      startLocationType: 'hotel',
      includeFoodStops: true,
    })

    // Construct scoring explanations for each stop
    const scoringBreakdowns: SimulationScoreBreakdown[] = []
    const warnings: string[] = []

    planned.days.forEach((d) => {
      d.stops.forEach((s) => {
        if (s.isMealStop) return
        const attr = destinationAttractions.find((a) => a.id === s.placeId)
        const isMustVisit = params.mustVisitPlaceIds.includes(s.placeId)

        const positiveFactors: string[] = []
        const negativeFactors: string[] = []

        if (isMustVisit) positiveFactors.push('Locked as Must Visit by traveler specification')
        if (attr && attr.culturalScore >= 9) positiveFactors.push(`High cultural score (${attr.culturalScore}/10)`)
        if (attr && attr.importanceScore >= 9) positiveFactors.push(`Top landmark prominence (${attr.importanceScore}/10)`)
        if (s.distanceFromPrevKm < 3) positiveFactors.push(`Optimal geo-cluster: only ${s.distanceFromPrevKm}km from previous stop`)
        positiveFactors.push(`Fits available time window (${s.durationMin} min duration)`)

        if (s.estimatedCost > 500) negativeFactors.push(`High entry tariff (₹${s.estimatedCost})`)
        if (s.travelFromPrevMin > 25) negativeFactors.push(`Substantial transit time (${s.travelFromPrevMin} mins)`)

        scoringBreakdowns.push({
          placeId: s.placeId,
          placeName: s.placeName,
          finalScore: isMustVisit ? 9.8 : Math.min(9.5, 7.0 + (attr?.importanceScore || 8) * 0.25),
          positiveFactors,
          negativeFactors,
          timeFit: true,
          budgetFit: s.estimatedCost <= params.budgetTotalInr / (params.durationDays * 2),
        })
      })
    })

    const totalEstimatedCost = planned.budgetBreakdown.totalEstimated
    const budgetSurplusDeficit = params.budgetTotalInr - totalEstimatedCost

    if (budgetSurplusDeficit < 0) {
      warnings.push(`Trip exceeds budget limit by ₹${Math.abs(budgetSurplusDeficit)}. Recommended: switch stay tier or transport mode.`)
    }

    // Check if any must-visit places were excluded
    planned.excludedPlaces.forEach((ex) => {
      if (params.mustVisitPlaceIds.includes(ex.placeId)) {
        warnings.push(`CRITICAL: Must-visit place "${ex.placeName}" could not fit within time constraints.`)
      }
    })

    return {
      params,
      itineraryDays: planned.days.map((day) => ({
        dayNumber: day.dayNumber,
        themeTitle: day.themeTitle,
        totalCost: day.totalDaySpend,
        totalDurationMin: day.totalSightseeingTimeMin + day.totalTravelTimeMin,
        totalDistanceKm: day.totalDistanceKm,
        stops: day.stops.map((stop) => {
          const scoreItem = scoringBreakdowns.find((b) => b.placeId === stop.placeId) || {
            placeId: stop.placeId,
            placeName: stop.placeName,
            finalScore: 8.5,
            positiveFactors: ['Geographically aligned', 'Fits morning time slot'],
            negativeFactors: [],
            timeFit: true,
            budgetFit: true,
          }
          return {
            id: stop.id,
            placeName: stop.placeName,
            timeSlot: stop.timeSlot,
            durationMin: stop.durationMin,
            cost: stop.estimatedCost,
            distanceFromPrevKm: stop.distanceFromPrevKm,
            category: stop.category,
            scoring: scoreItem,
          }
        }),
      })),
      totalEstimatedCost,
      budgetSurplusDeficit,
      planFeasibilityScore: planned.health.score,
      scoringBreakdowns,
      warnings,
    }
  },

  /**
   * Run budget stress test across ₹2,000, ₹5,000, ₹10,000, ₹20,000 tiers
   */
  runBudgetStressTest(destinationSlug: string, durationDays: number): {
    tier: string
    budgetInr: number
    feasible: boolean
    feasibilityScore: number
    totalCost: number
    warnings: string[]
  }[] {
    const testBudgets = [
      { tier: 'Low Budget', budget: 2000 },
      { tier: 'Moderate Budget', budget: 5000 },
      { tier: 'Comfort Budget', budget: 10000 },
      { tier: 'Premium Luxury', budget: 20000 },
    ]

    return testBudgets.map(({ tier, budget }) => {
      const result = this.simulateTrip({
        destinationSlug,
        destinationName: destinationSlug.toUpperCase(),
        durationDays,
        budgetTotalInr: budget,
        travelStyle: 'Heritage & Architecture',
        transportMode: 'mixed',
        mustVisitPlaceIds: ['udaipur-city-palace', 'udaipur-lake-pichola'],
      })
      return {
        tier,
        budgetInr: budget,
        feasible: result.budgetSurplusDeficit >= 0,
        feasibilityScore: result.planFeasibilityScore,
        totalCost: result.totalEstimatedCost,
        warnings: result.warnings,
      }
    })
  },
}
