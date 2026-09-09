import type { Request, Response } from 'express'
import { DestinationService } from '../services/destination.service.js'

export const destinationController = {
  async getAll(req: Request, res: Response) {
    try {
      const search = req.query.search as string | undefined
      const featured = req.query.featured === 'true'
      const list = await DestinationService.getAllDestinations({ search, featured })
      res.json({ success: true, count: list.length, data: list })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch destinations' })
    }
  },

  async getBySlug(req: Request, res: Response) {
    try {
      const slug = (req.params.slug || '').toLowerCase()
      const dest = await DestinationService.getDestinationBySlug(slug)

      if (!dest) {
        return res.status(404).json({ success: false, message: `Destination "${slug}" not found` })
      }

      res.json(dest) // Returns full DestinationData directly matching frontend API contract
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch destination' })
    }
  },

  async getPlaces(req: Request, res: Response) {
    try {
      const slug = (req.params.slug || '').toLowerCase()
      const places = await DestinationService.getPlacesForDestination(slug)
      res.json({ success: true, destination: slug, count: places.length, data: places })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch places' })
    }
  },

  async getPlaceDetails(req: Request, res: Response) {
    try {
      const slug = (req.params.slug || '').toLowerCase()
      const placeId = req.params.placeId
      const place = await DestinationService.getPlaceDetails(slug, placeId)

      if (!place) {
        return res.status(404).json({ success: false, message: `Place "${placeId}" not found in ${slug}` })
      }

      res.json(place)
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || 'Failed to fetch place details' })
    }
  },
}
