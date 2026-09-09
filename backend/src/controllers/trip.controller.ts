import type { Request, Response } from 'express'
import { TripService } from '../services/trip.service.js'

export const tripController = {
  async saveTrip(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      const savedTrip = await TripService.saveTrip(req.body, userId)
      res.status(201).json({ success: true, data: savedTrip })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to save trip' })
    }
  },

  async getUserTrips(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      const trips = await TripService.getUserTrips(userId)
      res.json({ success: true, count: trips.length, data: trips })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch saved trips' })
    }
  },

  async getTripById(req: Request, res: Response) {
    try {
      const trip = await TripService.getTripById(req.params.id)
      if (!trip) {
        return res.status(404).json({ success: false, message: 'Saved trip not found' })
      }
      res.json({ success: true, data: trip })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch trip' })
    }
  },

  async deleteTrip(req: Request, res: Response) {
    try {
      const userId = req.user?.id
      const success = await TripService.deleteTrip(req.params.id, userId)
      res.json({ success, message: success ? 'Trip deleted successfully' : 'Trip not found' })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to delete trip' })
    }
  },
}
