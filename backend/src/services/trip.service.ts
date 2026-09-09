import { SavedTrip, type ISavedTrip } from '../models/SavedTrip.js'
import { isDbConnected } from '../config/database.js'
import crypto from 'crypto'

export class TripService {
  static async saveTrip(tripData: any, userId?: string) {
    const tripToSave = {
      ...tripData,
      userId: userId || tripData.userId,
      shareToken: tripData.shareToken || crypto.randomBytes(8).toString('hex'),
      stopsCount: tripData.days?.reduce((acc: number, d: any) => acc + (d.stops?.length || 0), 0) || 0,
    }

    if (isDbConnected()) {
      if (tripData.id && tripData.id.length === 24) {
        const existing = await SavedTrip.findByIdAndUpdate(tripData.id, tripToSave, { new: true })
        if (existing) return existing.toJSON()
      }

      const created = await SavedTrip.create(tripToSave)
      return created.toJSON()
    }

    // Fallback mode
    return {
      ...tripToSave,
      id: tripData.id || `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  static async getUserTrips(userId?: string) {
    if (isDbConnected() && userId) {
      const trips = await SavedTrip.find({ userId }).sort({ updatedAt: -1 })
      return trips.map((t) => t.toJSON())
    }
    return []
  }

  static async getTripById(tripId: string) {
    if (isDbConnected()) {
      const trip = await SavedTrip.findOne({
        $or: [{ _id: tripId.length === 24 ? tripId : undefined }, { shareToken: tripId }, { id: tripId }],
      })
      return trip ? trip.toJSON() : null
    }
    return null
  }

  static async deleteTrip(tripId: string, userId?: string) {
    if (isDbConnected()) {
      const query: any = { _id: tripId }
      if (userId) query.userId = userId
      const result = await SavedTrip.deleteOne(query)
      return result.deletedCount > 0
    }
    return true
  }
}
