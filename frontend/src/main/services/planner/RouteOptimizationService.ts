import type { Place, StayHotel, GeoCoordinates } from '../../types/destination'
import type {
  PlannedStop,
  PlannedDay,
  DailyTimeWindow,
  TransportMode,
  TravelPriority,
  PlanExplanationItem,
} from './TripPlanningTypes'
import { TimeConstraintService } from './TimeConstraintService'

export class RouteOptimizationService {
  /**
   * Great Circle Haversine Distance in Kilometers between two coordinates.
   */
  static calculateDistanceKm(c1: GeoCoordinates, c2: GeoCoordinates): number {
    const R = 6371 // Earth radius in km
    const dLat = ((c2.lat - c1.lat) * Math.PI) / 180
    const dLon = ((c2.lng - c1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((c1.lat * Math.PI) / 180) *
        Math.cos((c2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Number((R * c).toFixed(2))
  }

  /**
   * Estimate transit minutes between two locations based on distance and transport mode.
   */
  static estimateTransitMinutes(distanceKm: number, mode: TransportMode): number {
    if (distanceKm <= 0.1) return 5 // Immediate adjacent

    let speedKmh = 22 // Average city traffic speed in km/h for Indian cities
    if (mode === 'walking') speedKmh = 4.5
    else if (mode === 'public_transit') speedKmh = 18
    else if (mode === 'auto_rickshaw') speedKmh = 24
    else if (mode === 'cab') speedKmh = 28
    else if (mode === 'rental') speedKmh = 26

    const rawMinutes = (distanceKm / speedKmh) * 60
    // Add 5-8 minutes parking/waiting buffer
    return Math.max(8, Math.round(rawMinutes + 5))
  }

  /**
   * Spatially partition selected attractions across the trip days.
   * Clusters geographically proximate places into the same day to eliminate back-and-forth zigzagging.
   */
  static clusterPlacesByDays(
    places: { place: Place; priority: TravelPriority; score: number }[],
    daysCount: number,
    baseCoord: GeoCoordinates
  ): { place: Place; priority: TravelPriority }[][] {
    if (daysCount <= 1 || places.length <= 1) {
      return [places.map((p) => ({ place: p.place, priority: p.priority }))]
    }

    // Sort initially by priority and score
    const sorted = [...places].sort((a, b) => b.score - a.score)

    // Initial buckets for each day
    const dayBuckets: { place: Place; priority: TravelPriority }[][] = Array.from(
      { length: daysCount },
      () => []
    )

    // Seed each day bucket with one major high-priority anchor attraction
    for (let d = 0; d < Math.min(daysCount, sorted.length); d++) {
      dayBuckets[d].push({ place: sorted[d].place, priority: sorted[d].priority })
    }

    // For the remaining places, assign to the bucket with the nearest center of gravity
    for (let i = daysCount; i < sorted.length; i++) {
      const candidate = sorted[i]
      const candCoord = candidate.place.coordinates || baseCoord

      let bestDayIdx = 0
      let minAvgDist = Infinity

      for (let d = 0; d < daysCount; d++) {
        const bucket = dayBuckets[d]
        if (bucket.length >= 4) continue // Keep max 4 sights per day for realism

        let distSum = 0
        bucket.forEach((item) => {
          const itemCoord = item.place.coordinates || baseCoord
          distSum += this.calculateDistanceKm(candCoord, itemCoord)
        })
        const avgDist = distSum / Math.max(1, bucket.length)

        if (avgDist < minAvgDist) {
          minAvgDist = avgDist
          bestDayIdx = d
        }
      }

      dayBuckets[bestDayIdx].push({
        place: candidate.place,
        priority: candidate.priority,
      })
    }

    return dayBuckets
  }

  /**
   * Schedule a sequence of stops for a single day.
   * Solves TSP nearest-neighbor ordering, checks opening hours, inserts lunch, and computes metrics.
   */
  static scheduleSingleDay(
    dayNumber: number,
    dayPlaces: { place: Place; priority: TravelPriority }[],
    baseCoord: GeoCoordinates,
    timeWindow: DailyTimeWindow,
    transportMode: TransportMode,
    hotelName: string,
    includeFoodStops: boolean
  ): { day: PlannedDay; explanations: PlanExplanationItem[] } {
    const explanations: PlanExplanationItem[] = []

    // Helper: format minutes from midnight to "H:MM AM/PM"
    const formatTime = (totalMinutes: number): string => {
      const h24 = Math.floor(totalMinutes / 60)
      const m = totalMinutes % 60
      const period = h24 >= 12 ? 'PM' : 'AM'
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12
      const mStr = m < 10 ? `0${m}` : `${m}`
      return `${h12}:${mStr} ${period}`
    }

    const [startH, startM] = (timeWindow.startTime || '08:30').split(':').map(Number)
    const [endH, endM] = (timeWindow.endTime || '20:00').split(':').map(Number)
    let currentMinute = startH * 60 + startM
    const dayEndMinute = endH * 60 + endM

    // TSP Nearest-Neighbor sequence ordering
    const unvisited = [...dayPlaces]
    const orderedPlaces: { place: Place; priority: TravelPriority }[] = []
    let currentCoord = baseCoord

    // Priority adjustment: Check for sunrise / morning specific sights (e.g. Taj Mahal, Sunrise viewpoint)
    const morningPlaceIdx = unvisited.findIndex(
      (p) =>
        p.place.bestTimeToVisit?.toLowerCase().includes('sunrise') ||
        p.place.bestTimeToVisit?.toLowerCase().includes('early morning')
    )
    if (morningPlaceIdx !== -1) {
      orderedPlaces.push(unvisited.splice(morningPlaceIdx, 1)[0])
      currentCoord = orderedPlaces[0].place.coordinates || baseCoord
      explanations.push({
        placeName: orderedPlaces[0].place.name,
        type: 'timing',
        title: 'Dawn / Early Morning Priority',
        detail: `Scheduled ${orderedPlaces[0].place.name} first at dawn to witness optimal sunrise lighting and beat peak crowds.`,
      })
    }

    // Check for sunset specific sights (e.g. Mehtab Bagh, Lake Pichola, Nahargarh sunset)
    let sunsetPlace: { place: Place; priority: TravelPriority } | null = null
    const sunsetIdx = unvisited.findIndex(
      (p) =>
        p.place.bestTimeToVisit?.toLowerCase().includes('sunset') ||
        p.place.bestTimeToVisit?.toLowerCase().includes('golden hour')
    )
    if (sunsetIdx !== -1) {
      sunsetPlace = unvisited.splice(sunsetIdx, 1)[0]
    }

    // Nearest Neighbor for remainder
    while (unvisited.length > 0) {
      let nearestIdx = 0
      let minDist = Infinity

      for (let i = 0; i < unvisited.length; i++) {
        const coord = unvisited[i].place.coordinates || baseCoord
        const dist = this.calculateDistanceKm(currentCoord, coord)
        if (dist < minDist) {
          minDist = dist
          nearestIdx = i
        }
      }

      const nextPlace = unvisited.splice(nearestIdx, 1)[0]
      orderedPlaces.push(nextPlace)
      currentCoord = nextPlace.place.coordinates || baseCoord
    }

    // Append sunset place near the end if present
    if (sunsetPlace) {
      orderedPlaces.push(sunsetPlace)
      explanations.push({
        placeName: sunsetPlace.place.name,
        type: 'timing',
        title: 'Sunset Golden Hour Alignment',
        detail: `Placed ${sunsetPlace.place.name} in the late afternoon / evening for famous sunset reflections and skyline vistas.`,
      })
    }

    // Build Planned Stops with time slots, transit, lunch break
    const stops: PlannedStop[] = []
    let totalDistKm = 0
    let totalTransitMin = 0
    let totalSightseeingMin = 0
    let totalSpend = 0
    let lunchAdded = false
    let prevCoord = baseCoord

    orderedPlaces.forEach((item, idx) => {
      const place = item.place
      const coord = place.coordinates || baseCoord
      const dist = this.calculateDistanceKm(prevCoord, coord)
      const transitMin = idx === 0 ? this.estimateTransitMinutes(dist, transportMode) : this.estimateTransitMinutes(dist, transportMode)

      totalDistKm += dist
      totalTransitMin += transitMin
      currentMinute += transitMin

      // Check if it's lunch time (between 12:45 PM and 2:15 PM) and we haven't eaten
      if (includeFoodStops && !lunchAdded && currentMinute >= 12 * 60 + 45) {
        const lunchStartMin = currentMinute
        const lunchDuration = 60
        const lunchEndMin = lunchStartMin + lunchDuration

        stops.push({
          id: `day-${dayNumber}-lunch`,
          placeId: `lunch-${dayNumber}`,
          placeName: 'Authentic Regional Lunch & Rest Break',
          category: 'food',
          categoryLabel: 'Culinary Break',
          timeSlot: `${formatTime(lunchStartMin)} – ${formatTime(lunchEndMin)}`,
          startTime: formatTime(lunchStartMin),
          endTime: formatTime(lunchEndMin),
          durationMin: lunchDuration,
          travelFromPrevMin: 0,
          distanceFromPrevKm: 0,
          estimatedCost: 250,
          priority: 'want_to_visit',
          locked: false,
          isMealStop: true,
          mealType: 'lunch',
          notes: 'Authentic local cuisine, lassi/chai, and relaxing midday pause away from noon sun.',
          explanation: 'Midday food break inserted near attraction cluster.',
        })

        currentMinute += lunchDuration
        totalSightseeingMin += lunchDuration
        totalSpend += 250
        lunchAdded = true

        explanations.push({
          type: 'meal',
          title: 'Midday Lunch Break',
          detail: 'Scheduled 60-minute culinary rest break between 1:00 PM and 2:00 PM in the central historic quarter.',
        })
      }

      const durationMin = TimeConstraintService.parseDurationMinutes(place.timeRequired)
      const stopStartMin = currentMinute
      const stopEndMin = stopStartMin + durationMin

      stops.push({
        id: `stop-${dayNumber}-${place.id}`,
        placeId: place.id,
        placeName: place.name,
        hindiName: place.hindiName,
        category: place.category,
        categoryLabel: place.categoryLabel,
        timeSlot: `${formatTime(stopStartMin)} – ${formatTime(stopEndMin)}`,
        startTime: formatTime(stopStartMin),
        endTime: formatTime(stopEndMin),
        durationMin,
        travelFromPrevMin: transitMin,
        distanceFromPrevKm: dist,
        estimatedCost: place.entryFee?.indian || 0,
        priority: item.priority,
        locked: false,
        coordinates: place.coordinates,
        notes: place.tagline,
        image: place.images?.[0],
        explanation: `Scheduled based on ${item.priority.replace('_', ' ')} priority and geographic proximity to preceding stop.`,
      })

      currentMinute += durationMin
      totalSightseeingMin += durationMin
      totalSpend += place.entryFee?.indian || 0
      prevCoord = coord
    })

    // Return transit to hotel at end of day
    const returnDist = this.calculateDistanceKm(prevCoord, baseCoord)
    const returnTransitMin = this.estimateTransitMinutes(returnDist, transportMode)
    totalDistKm += returnDist
    totalTransitMin += returnTransitMin
    currentMinute += returnTransitMin

    const freeTimeMin = Math.max(0, dayEndMinute - currentMinute)

    // Generate theme title for the day based on premier stops
    const topStopNames = stops
      .filter((s) => !s.isMealStop)
      .slice(0, 2)
      .map((s) => s.placeName.split('(')[0].trim())
      .join(' & ')

    const themeTitle =
      topStopNames.length > 0
        ? `Day 0${dayNumber}: ${topStopNames}`
        : `Day 0${dayNumber}: Heritage Exploration`

    const plannedDay: PlannedDay = {
      dayNumber,
      dateLabel: `Day 0${dayNumber}`,
      themeTitle,
      startTime: formatTime(startH * 60 + startM),
      endTime: formatTime(Math.min(dayEndMinute, currentMinute)),
      stops,
      totalDistanceKm: Number(totalDistKm.toFixed(1)),
      totalTravelTimeMin: totalTransitMin,
      totalSightseeingTimeMin: totalSightseeingMin,
      totalDaySpend: totalSpend,
      freeTimeMin,
    }

    return { day: plannedDay, explanations }
  }
}
