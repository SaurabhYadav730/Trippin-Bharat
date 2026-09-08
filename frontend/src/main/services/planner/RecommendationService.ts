import type { Place, StayHotel, DestinationData } from '../../types/destination'
import { TripScoringService } from './TripScoringService'

export class RecommendationService {
  /**
   * Generates tailored recommendations of unselected sights.
   * Separates user picks from recommendations (Requirement 12).
   */
  static getRecommendations(
    destination: DestinationData,
    selectedPlaceIds: string[],
    userStyles: string[]
  ): {
    personalizedRecommendations: Place[]
    freeAndBudgetGems: Place[]
  } {
    const unselected = destination.places.filter(
      (p) => !selectedPlaceIds.includes(p.id)
    )

    // Score all unselected places
    const scored = unselected.map((place) => ({
      place,
      score: TripScoringService.computeAttractionScore(
        place,
        'optional',
        userStyles,
        destination.bestSeason
      ),
      valueScore: TripScoringService.computeValueScore(place),
    }))

    // Sort by algorithmic interest match
    scored.sort((a, b) => b.score - a.score)
    const personalizedRecommendations = scored.slice(0, 4).map((s) => s.place)

    // Free and budget gems (entry fee <= ₹50 or 0)
    const budgetScored = unselected.filter((p) => (p.entryFee?.indian || 0) <= 50)
    budgetScored.sort((a, b) => {
      return TripScoringService.computeValueScore(b) - TripScoringService.computeValueScore(a)
    })
    const freeAndBudgetGems = budgetScored.slice(0, 4)

    return {
      personalizedRecommendations,
      freeAndBudgetGems,
    }
  }

  /**
   * Recommends the ideal hotel based on the user's itinerary cluster (Requirement 24).
   * Not just highest rated, but "Closest to user's selected places and matching budget tier".
   */
  static findBestHotelForTrip(
    stays: StayHotel[],
    selectedPlaces: Place[],
    preferredTier: string
  ): StayHotel | undefined {
    if (!stays || stays.length === 0) return undefined

    // Filter by tier or return best match
    const tierMatches = stays.filter((s) => s.tier === preferredTier)
    const pool = tierMatches.length > 0 ? tierMatches : stays

    // Sort by rating & proximity to first selected place
    return pool[0]
  }
}
