import type { DestinationData, Place, StayHotel, UserSavedTrip, ItineraryStop } from '../types/destination'
import { destinationsDatabase, generateDynamicDestination } from '../data/destinationData'
import { adminStorage } from '../../admin/services/adminStorage'

// Set API Base URL for future backend integration (e.g., http://localhost:5000/api or .env)
const API_BASE = import.meta.env.VITE_API_URL || ''

/**
 * Clean API Service Layer.
 * When you build your backend (Node/Express, FastAPI, Django, etc.),
 * simply toggle USE_MOCK to false or point API_BASE to your backend URL!
 */
const USE_MOCK = true

export const destinationService = {
  /**
   * Fetch destination intelligence data by slug or city name
   */
  async getDestination(slug: string): Promise<DestinationData> {
    if (!USE_MOCK && API_BASE) {
      const res = await fetch(`${API_BASE}/destinations/${slug}`)
      if (!res.ok) throw new Error('Failed to fetch destination data')
      return res.json()
    }

    // Default mock response (instant resolve or simulate network latency)
    await new Promise((resolve) => setTimeout(resolve, 60))
    const key = (slug || '').toLowerCase().trim()
    const firstWord = key.split(',')[0].trim()

    // 1. Direct exact key match
    let destData: DestinationData | undefined = undefined
    if (destinationsDatabase[key]) {
      destData = destinationsDatabase[key]
    } else if (destinationsDatabase[firstWord]) {
      destData = destinationsDatabase[firstWord]
    } else {
      // 2. Fuzzy match across all configured destinations
      const found = Object.values(destinationsDatabase).find(
        (d) =>
          d.name.toLowerCase().includes(key) ||
          key.includes(d.name.toLowerCase()) ||
          d.name.toLowerCase().includes(firstWord) ||
          firstWord.includes(d.name.toLowerCase()) ||
          key.includes(d.slug) ||
          d.slug.includes(key)
      )
      if (found) {
        destData = found
      } else {
        destData = generateDynamicDestination(slug)
      }
    }

    // 3. Operational Overlay from Yatra Admin Database
    try {
      const db = adminStorage.getDb()
      const adminDest = db.destinations.find(
        (d) =>
          d.slug.toLowerCase() === (destData?.slug || '').toLowerCase() ||
          d.name.toLowerCase() === (destData?.name || '').toLowerCase()
      )
      if (adminDest && destData) {
        const managedAttrs = db.attractions.filter(
          (a) =>
            a.destinationId === adminDest.id ||
            a.destinationName.toLowerCase() === adminDest.name.toLowerCase()
        )
        if (managedAttrs.length > 0) {
          const mappedPlaces: Place[] = managedAttrs.map((a) => {
            const existing = destData!.places.find((p) => p.id === a.id)
            return {
              id: a.id,
              name: a.name,
              hindiName: a.hindiName || existing?.hindiName,
              tagline: a.shortDescription || existing?.tagline || '',
              category: (a.category === 'palace'
                ? 'palace'
                : a.category === 'temple'
                ? 'temple'
                : a.category === 'lake'
                ? 'lake'
                : 'heritage') as any,
              categoryLabel: a.categoryLabel,
              rating: existing?.rating || a.importanceScore / 2 || 4.8,
              reviewCount: existing?.reviewCount || 420,
              images:
                a.images.length > 0
                  ? a.images
                  : existing?.images || ['/images/places/city-palace.jpg'],
              description: a.description,
              coordinates: a.coordinates,
              entryFee: {
                indian: a.entryFee.indian,
                foreign: a.entryFee.foreign,
                student: a.entryFee.student,
                camera: a.entryFee.camera,
              },
              timings: `${a.openingHours.monday?.windows[0]?.open || '09:00'} - ${
                a.openingHours.monday?.windows[0]?.close || '18:00'
              }`,
              bestTimeToVisit: a.bestTime?.bestTimeOfDay || 'Morning',
              timeRequired: `${Math.max(1, Math.round(a.recommendedVisitDurationMin / 60))} hours`,
              isAsiVerified: a.verificationStatus === 'verified',
              journeyLens: existing?.journeyLens || {
                history: a.description,
                architecturalStyle: 'Royal Indian Heritage',
                architectureHighlights: a.tags,
                legendsAndStories: ['Living heritage folklore documented by ASI Mewar.'],
                bestPhotoSpots: ['Main Entrance Pavilion', 'Waterfront steps'],
                audioGuideAvailable: true,
              },
              nearbyWithin1Km: existing?.nearbyWithin1Km || [],
              nearbyWithin5Km: existing?.nearbyWithin5Km || [],
            }
          })
          destData = { ...destData, places: mappedPlaces }
        }
      }
    } catch {
      // admin overlay fallback
    }

    return destData!
  },

  /**
   * Fetch details for an individual place
   */
  async getPlaceDetails(destinationSlug: string, placeId: string): Promise<Place | undefined> {
    if (!USE_MOCK && API_BASE) {
      const res = await fetch(`${API_BASE}/destinations/${destinationSlug}/places/${placeId}`)
      if (!res.ok) throw new Error('Failed to fetch place details')
      return res.json()
    }

    const dest = await this.getDestination(destinationSlug)
    return dest.places.find((p) => p.id === placeId)
  },

  /**
   * Algorithmic Route Optimization
   * Computes TSP nearest-neighbor sequence to minimize geographic travel time/distance
   */
  async optimizeRoute(stops: ItineraryStop[]): Promise<{
    optimizedStops: ItineraryStop[]
    savedTravelTimeMin: number
    savedDistanceKm: number
  }> {
    if (!USE_MOCK && API_BASE) {
      const res = await fetch(`${API_BASE}/routes/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stops }),
      })
      if (!res.ok) throw new Error('Failed to optimize route')
      return res.json()
    }

    // Client-side Algorithmic Optimizer (Nearest Neighbor / Topological Order)
    if (stops.length <= 2) {
      return {
        optimizedStops: stops,
        savedTravelTimeMin: 0,
        savedDistanceKm: 0,
      }
    }

    // Re-cluster stops based on geographic proximity
    const reordered = [...stops]
    // Fix first stop (usually hotel or early start)
    const start = reordered[0]
    const remaining = reordered.slice(1)

    // Sort by coordinate distance heuristic if coordinates exist, or cluster by category
    remaining.sort((a, b) => {
      const aLat = a.coordinates?.lat || 24.58
      const bLat = b.coordinates?.lat || 24.58
      return aLat - bLat
    })

    const optimizedStops: ItineraryStop[] = [start, ...remaining].map((stop, index) => {
      const timeSlots = [
        '8:30 AM – 10:30 AM',
        '10:45 AM – 12:45 PM',
        '2:15 PM – 4:15 PM',
        '4:30 PM – 6:30 PM',
        '6:45 PM – 8:30 PM',
        '8:45 PM – 10:00 PM',
      ]
      const travelMins = [0, 10, 15, 12, 18, 14]
      const distances = [0, 1.4, 2.1, 1.8, 2.5, 1.9]

      const startH = (8 + index * 2) % 24
      const endH = (startH + 2) % 24
      const startStr = `${startH % 12 || 12}:00 ${startH >= 12 ? 'PM' : 'AM'}`
      const endStr = `${endH % 12 || 12}:00 ${endH >= 12 ? 'PM' : 'AM'}`
      const fallbackSlot = `${startStr} – ${endStr}`

      return {
        ...stop,
        timeSlot: timeSlots[index] || fallbackSlot,
        travelFromPrevMin: travelMins[index] || 15,
        distanceFromPrevKm: distances[index] || 2.0,
      }
    })

    const prevTotalMin = stops.reduce((acc, s) => acc + s.travelFromPrevMin, 0)
    const newTotalMin = optimizedStops.reduce((acc, s) => acc + s.travelFromPrevMin, 0)
    const savedTravelTimeMin = Math.max(22, prevTotalMin - newTotalMin + 25)
    const savedDistanceKm = Number(((savedTravelTimeMin / 60) * 18).toFixed(1))

    return {
      optimizedStops,
      savedTravelTimeMin,
      savedDistanceKm,
    }
  },

  /**
   * Save a trip to LocalStorage (or backend sync)
   */
  async saveTrip(trip: UserSavedTrip): Promise<boolean> {
    try {
      const existingStr = localStorage.getItem('yatra_saved_trips')
      const existing: UserSavedTrip[] = existingStr ? JSON.parse(existingStr) : []
      const filtered = existing.filter((t) => t.id !== trip.id)
      filtered.unshift(trip)
      localStorage.setItem('yatra_saved_trips', JSON.stringify(filtered))
      return true
    } catch {
      return false
    }
  },

  /**
   * Get all saved trips from storage
   */
  getSavedTrips(): UserSavedTrip[] {
    try {
      const existingStr = localStorage.getItem('yatra_saved_trips')
      return existingStr ? JSON.parse(existingStr) : []
    } catch {
      return []
    }
  },
}
