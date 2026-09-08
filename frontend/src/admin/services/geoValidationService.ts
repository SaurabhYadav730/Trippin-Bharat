import type { GeoPoint } from '../types/admin'

export interface GeoValidationResult {
  isValid: boolean
  distanceFromCenterKm: number
  isOutlier: boolean // > 70 km from city center
  error?: string
  warning?: string
}

export const geoValidationService = {
  /**
   * Haversine distance in kilometers
   */
  calculateDistanceKm(p1: GeoPoint, p2: GeoPoint): number {
    const R = 6371 // Earth radius in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c * 10) / 10
  },

  validateEntityCoordinates(
    point: GeoPoint,
    centerPoint?: GeoPoint,
    entityName = 'Entity',
    cityName = 'Destination'
  ): GeoValidationResult {
    // 1. Basic coordinate range check
    if (point.lat < -90 || point.lat > 90) {
      return {
        isValid: false,
        distanceFromCenterKm: 0,
        isOutlier: false,
        error: `Latitude ${point.lat} is out of valid range (-90 to +90).`,
      }
    }
    if (point.lng < -180 || point.lng > 180) {
      return {
        isValid: false,
        distanceFromCenterKm: 0,
        isOutlier: false,
        error: `Longitude ${point.lng} is out of valid range (-180 to +180).`,
      }
    }

    // 2. India terrestrial bounding box sanity check (Lat ~6 to 37.5, Lng ~68.5 to 97.5)
    if (point.lat < 6.0 || point.lat > 37.5 || point.lng < 68.5 || point.lng > 97.5) {
      return {
        isValid: true,
        distanceFromCenterKm: 0,
        isOutlier: true,
        warning: `Coordinates (${point.lat}, ${point.lng}) fall outside standard Indian territory bounds.`,
      }
    }

    // 3. Distance from city center
    if (centerPoint && centerPoint.lat && centerPoint.lng) {
      const dist = this.calculateDistanceKm(point, centerPoint)
      if (dist > 70) {
        return {
          isValid: true,
          distanceFromCenterKm: dist,
          isOutlier: true,
          warning: `"${entityName}" is located ${dist} km from ${cityName} city center. Verify if this belongs to a different district.`,
        }
      }
      return {
        isValid: true,
        distanceFromCenterKm: dist,
        isOutlier: false,
      }
    }

    return {
      isValid: true,
      distanceFromCenterKm: 0,
      isOutlier: false,
    }
  },
}
