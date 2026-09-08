import type { Place, StayHotel } from '../../types/destination'
import type { TripBudgetInput, TransportMode, BudgetBreakdown } from './TripPlanningTypes'

export class BudgetCalculationService {
  /**
   * Calculates realistic cost breakdown across all categories for the trip.
   */
  static calculateBudget(
    budgetInput: TripBudgetInput,
    daysCount: number,
    transportMode: TransportMode,
    selectedPlaces: Place[],
    selectedHotel?: StayHotel
  ): BudgetBreakdown {
    // 1. Determine Total User Target Budget
    const userBudgetTotal =
      budgetInput.mode === 'daily'
        ? budgetInput.amount * daysCount
        : budgetInput.amount

    // 2. Accommodation Estimation
    let stayCostTotal = 0
    if (selectedHotel) {
      stayCostTotal = selectedHotel.pricePerNight * Math.max(1, daysCount - 1)
    } else {
      // Estimated stay per night according to selected tier
      let stayRatePerNight = 1800 // Smart Budget default
      if (budgetInput.tier === 'backpacker') stayRatePerNight = 850
      else if (budgetInput.tier === 'comfort') stayRatePerNight = 3800
      else if (budgetInput.tier === 'premium') stayRatePerNight = 11000

      stayCostTotal = stayRatePerNight * Math.max(1, daysCount - 1)
    }

    // 3. Food Estimation (Common Man travel focus)
    let dailyFoodRate = 600 // ₹200 breakfast + ₹250 lunch + ₹150 dinner/chai
    if (budgetInput.tier === 'backpacker') dailyFoodRate = 350
    else if (budgetInput.tier === 'comfort') dailyFoodRate = 1200
    else if (budgetInput.tier === 'premium') dailyFoodRate = 3000

    const foodCostTotal = dailyFoodRate * daysCount

    // 4. Local Transportation Estimation based on Mode
    let dailyTransportRate = 650 // Mixed mode default (Auto + Metro/walking)
    switch (transportMode) {
      case 'walking':
        dailyTransportRate = 50 // Occasional short hop
        break
      case 'public_transit':
        dailyTransportRate = 180 // Bus / Metro passes
        break
      case 'auto_rickshaw':
        dailyTransportRate = 550
        break
      case 'cab':
        dailyTransportRate = 1600 // Full day Ola/Uber or private taxi
        break
      case 'rental':
        dailyTransportRate = 1400 // Scooter / self-drive car + fuel
        break
      case 'mixed':
      default:
        dailyTransportRate = 650
    }
    const transportCostTotal = dailyTransportRate * daysCount

    // 5. Entry Tickets (Summed from verified Indian tourist fees of selected places)
    const ticketsCostTotal = selectedPlaces.reduce((sum, p) => {
      return sum + (p.entryFee?.indian || 0)
    }, 0)

    // 6. Experiences & Activities buffer
    const experiencesCostTotal = Math.round(daysCount * 250)

    // 7. Miscellaneous Emergency & Shopping Buffer
    const miscCostTotal = Math.round(daysCount * 200)

    const totalEstimated =
      stayCostTotal +
      foodCostTotal +
      transportCostTotal +
      ticketsCostTotal +
      experiencesCostTotal +
      miscCostTotal

    const difference = totalEstimated - userBudgetTotal
    const isOverBudget = difference > 0

    // 8. Generate Actionable Savings Suggestions if Over-Budget
    const savingsSuggestions: BudgetBreakdown['savingsSuggestions'] = []

    if (isOverBudget) {
      if (transportMode === 'cab') {
        const potentialSave = (1600 - 550) * daysCount
        savingsSuggestions.push({
          title: `Switch from Private Cab to Auto/Rickshaw or Metro (Save ~₹${potentialSave.toLocaleString()})`,
          savingAmount: potentialSave,
          actionType: 'transport',
        })
      } else if (transportMode === 'auto_rickshaw' || transportMode === 'mixed') {
        const potentialSave = (dailyTransportRate - 180) * daysCount
        savingsSuggestions.push({
          title: `Use Public Transport & Metro where available (Save ~₹${potentialSave.toLocaleString()})`,
          savingAmount: potentialSave,
          actionType: 'transport',
        })
      }

      if (stayCostTotal > 1200 * (daysCount - 1)) {
        const potentialSave = Math.round(stayCostTotal * 0.35)
        savingsSuggestions.push({
          title: `Choose a Verified Heritage Homestay or Budget Stay (Save ~₹${potentialSave.toLocaleString()})`,
          savingAmount: potentialSave,
          actionType: 'stay',
        })
      }

      if (experiencesCostTotal > 0) {
        savingsSuggestions.push({
          title: `Skip optional paid experiences in favor of free cultural ghats & heritage strolls (Save ~₹${experiencesCostTotal.toLocaleString()})`,
          savingAmount: experiencesCostTotal,
          actionType: 'optional_places',
        })
      }

      savingsSuggestions.push({
        title: `Increase budget slightly by ₹${Math.ceil(difference / 500) * 500} to cover all preferred selections`,
        savingAmount: difference,
        actionType: 'budget_bump',
      })
    }

    return {
      stay: stayCostTotal,
      food: foodCostTotal,
      transport: transportCostTotal,
      tickets: ticketsCostTotal,
      experiences: experiencesCostTotal,
      misc: miscCostTotal,
      totalEstimated,
      difference,
      isOverBudget,
      savingsSuggestions,
    }
  }
}
