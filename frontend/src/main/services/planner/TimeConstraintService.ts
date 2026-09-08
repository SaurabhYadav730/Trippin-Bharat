import type { Place } from '../../types/destination'
import type { DailyTimeWindow, TravelPriority, ConstraintValidationResult } from './TripPlanningTypes'

export class TimeConstraintService {
  /**
   * Helper to parse visit duration string (e.g., "2 – 3 Hours", "90 mins", "45 Minutes")
   * Returns duration in minutes.
   */
  static parseDurationMinutes(timeRequiredStr?: string): number {
    if (!timeRequiredStr) return 90 // Sensible default 1.5h

    const str = timeRequiredStr.toLowerCase()

    if (str.includes('hour') || str.includes('hr')) {
      const numbers = str.match(/[\d.]+/g)?.map(Number) || [1.5]
      if (numbers.length >= 2) {
        // Average the range (e.g., 2 - 3 hrs -> 2.5 hrs = 150 mins)
        const avgHours = (numbers[0] + numbers[1]) / 2
        return Math.round(avgHours * 60)
      } else if (numbers.length === 1) {
        return Math.round(numbers[0] * 60)
      }
    }

    if (str.includes('min')) {
      const numbers = str.match(/\d+/g)?.map(Number) || [60]
      return numbers[0] || 60
    }

    return 90
  }

  /**
   * Calculate daily sightseeing hours available after deducting lunch/buffer time.
   */
  static getDailyAvailableMinutes(timeWindow: DailyTimeWindow): number {
    const [startH, startM] = (timeWindow.startTime || '08:30').split(':').map(Number)
    const [endH, endM] = (timeWindow.endTime || '20:00').split(':').map(Number)

    const totalSpanMinutes = (endH * 60 + endM) - (startH * 60 + startM)
    // Reserve 60 mins for lunch/tea and 30 mins natural buffer
    const buffer = (timeWindow.bufferMinutes ?? 30) + 60
    return Math.max(180, totalSpanMinutes - buffer)
  }

  /**
   * Validates capacity constraints across the trip days.
   * Compares required sightseeing & estimated transit against total available hours.
   */
  static validateConstraints(
    selectedPlaceIds: Record<string, TravelPriority>,
    allPlaces: Place[],
    daysCount: number,
    timeWindow: DailyTimeWindow
  ): ConstraintValidationResult {
    const dailyAvailableMins = this.getDailyAvailableMinutes(timeWindow)
    const totalAvailableSightseeingMins = dailyAvailableMins * daysCount

    let mustVisitMins = 0
    let mustVisitCount = 0
    let totalSelectedMins = 0
    let totalPlacesCount = 0

    Object.entries(selectedPlaceIds).forEach(([placeId, priority]) => {
      const place = allPlaces.find((p) => p.id === placeId)
      if (!place) return

      totalPlacesCount++
      const duration = this.parseDurationMinutes(place.timeRequired)
      // Account for ~20 mins estimated transit between attractions
      const effectiveDuration = duration + 20

      totalSelectedMins += effectiveDuration

      if (priority === 'must_visit') {
        mustVisitCount++
        mustVisitMins += effectiveDuration
      }
    })

    const requiredHours = Number((mustVisitMins / 60).toFixed(1))
    const availableHours = Number((totalAvailableSightseeingMins / 60).toFixed(1))
    const differenceHours = Number((requiredHours - availableHours).toFixed(1))

    // Constraint is violated if MUST-VISIT places alone exceed the trip's available hours!
    if (mustVisitMins > totalAvailableSightseeingMins) {
      return {
        isFeasible: false,
        mustVisitCount,
        totalPlacesCount,
        totalSightseeingHoursRequired: requiredHours,
        totalAvailableSightseeingHours: availableHours,
        differenceHours,
        warningType: 'time_overflow',
        message: `Your selected places cannot all fit into ${daysCount} day${daysCount > 1 ? 's' : ''}. You selected ${mustVisitCount} Must-Visit places requiring ~${requiredHours} hours, but your sightseeing schedule allows ~${availableHours} hours.`,
        resolutionOptions: [
          {
            label: `Increase trip to ${daysCount + 1} Days`,
            action: 'increase_days',
          },
          {
            label: 'Extend Daily Sightseeing Hours (e.g. 8:00 AM – 9:30 PM)',
            action: 'extend_hours',
          },
          {
            label: 'Move Some Places to "Want to Visit"',
            action: 'downgrade_must_visit',
          },
          {
            label: 'Keep My Choices & System Will Optimize Best Fit',
            action: 'proceed_anyway',
          },
        ],
      }
    }

    return {
      isFeasible: true,
      mustVisitCount,
      totalPlacesCount,
      totalSightseeingHoursRequired: Number((totalSelectedMins / 60).toFixed(1)),
      totalAvailableSightseeingHours: availableHours,
      differenceHours: Math.max(0, Number(((totalSelectedMins - totalAvailableSightseeingMins) / 60).toFixed(1))),
      resolutionOptions: [],
    }
  }
}
