import { adminStorage } from './adminStorage'
import type { DataQualityIssue } from '../types/admin'

export const dataQualityService = {
  scanPlatformDataQuality(): {
    overallHealthPercent: number
    issues: DataQualityIssue[]
    summaryCounts: {
      critical: number
      warning: number
      info: number
      total: number
    }
  } {
    const db = adminStorage.getDb()
    const issues: DataQualityIssue[] = []

    // 1. Scan Attractions
    db.attractions.forEach((a) => {
      // Check coordinates
      if (!a.coordinates || a.coordinates.lat === 0 || a.coordinates.lng === 0) {
        issues.push({
          id: `dq-attr-coord-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'critical',
          issueType: 'missing_coordinates',
          message: 'Attraction has missing or zero coordinates',
          recommendation: 'Specify precise GPS coordinates to allow itinerary routing.',
        })
      } else if (
        a.coordinates.lat < 6 ||
        a.coordinates.lat > 38 ||
        a.coordinates.lng < 68 ||
        a.coordinates.lng > 98
      ) {
        issues.push({
          id: `dq-attr-invcoord-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'critical',
          issueType: 'invalid_coordinates',
          message: `Latitude/Longitude (${a.coordinates.lat}, ${a.coordinates.lng}) outside Indian territorial bounds`,
          recommendation: 'Calibrate coordinates using GIS Map Studio.',
        })
      }

      // Check Best Time
      if (!a.bestTime || !a.bestTime.bestTimeOfDay || !a.bestTime.bestTimeDescription) {
        issues.push({
          id: `dq-attr-bt-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'warning',
          issueType: 'missing_best_time',
          message: 'Missing best time of day or seasonal recommendation',
          recommendation: 'Set best time of day (e.g. Sunrise/Evening) for trip engine scheduling.',
        })
      }

      // Check Opening Hours
      if (!a.openingHours || !a.openingHours.monday) {
        issues.push({
          id: `dq-attr-oh-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'critical',
          issueType: 'missing_opening_hours',
          message: 'Weekly schedule missing or incomplete',
          recommendation: 'Define opening & closing hours across Monday–Sunday.',
        })
      }

      // Check Hero Image / Gallery
      if (!a.heroImage || a.images.length === 0) {
        issues.push({
          id: `dq-attr-img-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'warning',
          issueType: 'missing_images',
          message: 'Attraction has no authentic photograph assigned',
          recommendation: 'Upload high-resolution verified ASI photograph to Media Library.',
        })
      }

      // Check Entry Fee
      if (a.entryFee === undefined || a.entryFee.indian === undefined) {
        issues.push({
          id: `dq-attr-fee-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'warning',
          issueType: 'missing_entry_fee',
          message: 'Ticket pricing structure not configured',
          recommendation: 'Enter Indian and Foreign entry tariffs or designate as Free.',
        })
      }

      // Check Incomplete description
      if (!a.description || a.description.length < 40) {
        issues.push({
          id: `dq-attr-desc-${a.id}`,
          entityType: 'attraction',
          entityId: a.id,
          entityName: a.name,
          destinationName: a.destinationName,
          severity: 'info',
          issueType: 'incomplete_description',
          message: 'Description is too brief for editorial heritage standard',
          recommendation: 'Expand architectural context and cultural story.',
        })
      }
    })

    // 2. Scan Restaurants
    db.restaurants.forEach((r) => {
      if (!r.coordinates || r.coordinates.lat === 0) {
        issues.push({
          id: `dq-rest-coord-${r.id}`,
          entityType: 'restaurant',
          entityId: r.id,
          entityName: r.name,
          destinationName: r.destinationName,
          severity: 'critical',
          issueType: 'missing_coordinates',
          message: 'Restaurant coordinates missing',
          recommendation: 'Set geo coordinates to allow proximity lunch/dinner stops.',
        })
      }
      if (r.priceForTwo <= 0) {
        issues.push({
          id: `dq-rest-price-${r.id}`,
          entityType: 'restaurant',
          entityId: r.id,
          entityName: r.name,
          destinationName: r.destinationName,
          severity: 'warning',
          issueType: 'suspicious_price',
          message: 'Price for two is zero or unconfigured',
          recommendation: 'Set realistic average dining price for two.',
        })
      }
    })

    // 3. Scan Hotels
    db.hotels.forEach((h) => {
      if (h.baseEstimatedPrice <= 0) {
        issues.push({
          id: `dq-hotel-price-${h.id}`,
          entityType: 'hotel',
          entityId: h.id,
          entityName: h.name,
          destinationName: h.destinationName,
          severity: 'critical',
          issueType: 'suspicious_price',
          message: 'Base tariff is zero or unconfigured',
          recommendation: 'Configure nightly base tariff for budget calculation.',
        })
      }
    })

    // 4. Duplicate candidates check
    db.duplicatePairs
      .filter((dp) => dp.status === 'pending')
      .forEach((dp) => {
        issues.push({
          id: `dq-dup-${dp.id}`,
          entityType: 'attraction',
          entityId: dp.recordA.id,
          entityName: `${dp.recordA.name} & ${dp.recordB.name}`,
          destinationName: dp.recordA.destination,
          severity: 'warning',
          issueType: 'duplicate_candidate',
          message: `High similarity (${dp.similarityPercentage}%) detected with another record`,
          recommendation: 'Review and merge via Duplicate Resolution Center.',
        })
      })

    const critical = issues.filter((i) => i.severity === 'critical').length
    const warning = issues.filter((i) => i.severity === 'warning').length
    const info = issues.filter((i) => i.severity === 'info').length

    // Score deduction
    const totalEntities = db.destinations.length + db.attractions.length + db.hotels.length + db.restaurants.length
    const penalty = critical * 4 + warning * 1.5 + info * 0.5
    const overallHealthPercent = Math.max(50, Math.min(100, Math.round(100 - (penalty / Math.max(totalEntities, 1)) * 10)))

    return {
      overallHealthPercent,
      issues,
      summaryCounts: {
        critical,
        warning,
        info,
        total: issues.length,
      },
    }
  },
}
