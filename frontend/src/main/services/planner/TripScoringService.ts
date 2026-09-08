import type { Place } from '../../types/destination'
import type { TravelPriority } from './TripPlanningTypes'

export class TripScoringService {
  /**
   * Computes a realistic multi-factor priority score for an attraction.
   * Core rule: USER PRIORITY > SYSTEM PRIORITY.
   * If user marks a place Must Visit, it dominates the score.
   */
  static computeAttractionScore(
    place: Place,
    userPriority: TravelPriority,
    userStyles: string[],
    destinationBestSeason?: string
  ): number {
    let score = 0

    // 1. User Priority Weight (Primary constraint)
    switch (userPriority) {
      case 'must_visit':
        score += 1000 // Guarantees highest scheduling priority
        break
      case 'want_to_visit':
        score += 250
        break
      case 'optional':
        score += 50
        break
      default:
        score += 20
    }

    // 2. Interest / Style Match
    const categoryLower = (place.category || '').toLowerCase()
    const labelLower = (place.categoryLabel || '').toLowerCase()
    const descLower = (place.description || '').toLowerCase()

    userStyles.forEach((style) => {
      const s = style.toLowerCase()
      if (
        categoryLower.includes(s) ||
        labelLower.includes(s) ||
        descLower.includes(s)
      ) {
        score += 45
      }
    })

    // 3. Cultural & Archaeological Survey of India (ASI) Significance
    if (place.isAsiVerified) {
      score += 35
    }

    // 4. Public Quality & Popularity (Rating & Review count logarithm)
    score += (place.rating || 4.5) * 8
    if (place.reviewCount > 20000) {
      score += 25
    } else if (place.reviewCount > 5000) {
      score += 15
    }

    // 5. Cost Sensibility (Common Man Travel)
    // Low entry fee or free is given an affordability bonus
    const indianFee = place.entryFee?.indian ?? 0
    if (indianFee === 0) {
      score += 30 // Free attractions boost score
    } else if (indianFee <= 50) {
      score += 20
    } else if (indianFee > 500) {
      score -= 15 // Premium price slight penalty unless user explicitly selected it
    }

    return Math.round(score)
  }

  /**
   * Internal Value Score: (Quality / Cost Ratio)
   * Designed to highlight "Best Experiences Under ₹500" or free public cultural assets.
   */
  static computeValueScore(place: Place): number {
    const fee = place.entryFee?.indian ?? 0
    const rating = place.rating || 4.5

    if (fee === 0) {
      // Free attraction with 4.5+ rating = 9.5+ value score
      return Math.min(9.8, Number((rating * 2.0).toFixed(1)))
    }

    if (fee <= 50) {
      return Math.min(9.5, Number(((rating * 2.0) - 0.2).toFixed(1)))
    }

    if (fee <= 250) {
      return Math.min(8.8, Number(((rating * 1.8) - 0.5).toFixed(1)))
    }

    return Math.max(5.0, Number(((rating * 1.5) - 1.2).toFixed(1)))
  }
}
