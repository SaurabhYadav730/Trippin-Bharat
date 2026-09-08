import type { Request, Response } from 'express'
import { itineraryEngine } from '../services/itineraryEngine.js'
import type { ItineraryRequest } from '../types/index.js'

export const itineraryController = {
  plan(req: Request, res: Response) {
    try {
      const planReq: ItineraryRequest = {
        destinationSlug: req.body.destinationSlug || req.query.destination as string || 'udaipur',
        durationDays: parseInt(req.body.durationDays || req.query.duration || '3', 10),
        pace: req.body.pace || 'balanced',
        budgetTier: req.body.budgetTier || 'comfort',
        budgetInr: req.body.budgetInr ? parseInt(req.body.budgetInr, 10) : undefined,
        selectedPlaces: req.body.selectedPlaces,
        travelStyle: req.body.travelStyle,
      }

      const result = itineraryEngine.plan(planReq)
      res.json({ success: true, data: result })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to generate itinerary' })
    }
  }
}
