import type { Place } from '../../types/destination'
import type { PlannedDay, BudgetBreakdown } from './TripPlanningTypes'

export interface ConflictAlert {
  id: string
  type: 'closure' | 'timing' | 'budget'
  severity: 'warning' | 'error'
  title: string
  description: string
  suggestedFix?: string
  canAutoFix: boolean
}

export class ConflictDetectionService {
  /**
   * Scan planned days and budget for practical conflicts.
   */
  static detectConflicts(
    days: PlannedDay[],
    allPlaces: Place[],
    budgetBreakdown: BudgetBreakdown
  ): ConflictAlert[] {
    const alerts: ConflictAlert[] = []

    // 1. Budget Overflow Check
    if (budgetBreakdown.isOverBudget) {
      alerts.push({
        id: 'conflict-budget-overflow',
        type: 'budget',
        severity: 'warning',
        title: 'Trip Exceeds Stated Budget Target',
        description: `Projected spend is ₹${budgetBreakdown.difference.toLocaleString()} over your target budget.`,
        suggestedFix: budgetBreakdown.savingsSuggestions[0]?.title || 'Consider switching transport mode or opting for a homestay.',
        canAutoFix: true,
      })
    }

    // 2. Closure Day Check (e.g. Taj Mahal closed on Friday)
    days.forEach((day) => {
      day.stops.forEach((stop) => {
        const place = allPlaces.find((p) => p.id === stop.placeId)
        if (!place) return

        const timingsLower = (place.timings || '').toLowerCase()
        if (timingsLower.includes('closed on friday')) {
          // If Day 1 or Day is set to Friday, warn traveler
          alerts.push({
            id: `closure-check-${stop.id}`,
            type: 'closure',
            severity: 'warning',
            title: `Weekly Closure Notice: ${place.name}`,
            description: `${place.name} is closed on Fridays by ASI mandate. Ensure this day does not fall on a Friday.`,
            suggestedFix: 'Reorder this stop to a different day of your trip.',
            canAutoFix: false,
          })
        }
      })
    })

    return alerts
  }
}
