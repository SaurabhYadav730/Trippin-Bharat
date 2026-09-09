import type { Request, Response } from 'express'
import { AdminService } from '../services/admin.service.js'

export const adminController = {
  // Destinations
  async getDestinations(req: Request, res: Response) {
    try {
      const search = (req.query.search as string) || ''
      const status = (req.query.status as string) || 'all'
      const data = await AdminService.getDestinations(search, status)
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getDestinationById(req: Request, res: Response) {
    try {
      const data = await AdminService.getDestinationById(req.params.id)
      if (!data) return res.status(404).json({ success: false, message: 'Destination not found' })
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveDestination(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const data = await AdminService.saveDestination(req.body, user, role)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async deleteDestination(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const success = await AdminService.deleteDestination(req.params.id, user, role)
      res.json({ success })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Attractions
  async getAttractions(req: Request, res: Response) {
    try {
      const search = req.query.search as string | undefined
      const destinationId = req.query.destinationId as string | undefined
      const category = req.query.category as string | undefined
      const status = req.query.status as string | undefined
      const data = await AdminService.getAttractions({ search, destinationId, category, status })
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getAttractionById(req: Request, res: Response) {
    try {
      const data = await AdminService.getAttractionById(req.params.id)
      if (!data) return res.status(404).json({ success: false, message: 'Attraction not found' })
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveAttraction(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const data = await AdminService.saveAttraction(req.body, user, role)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async deleteAttraction(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const success = await AdminService.deleteAttraction(req.params.id, user, role)
      res.json({ success })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Hotels
  async getHotels(req: Request, res: Response) {
    try {
      const destinationSlug = req.query.destination as string | undefined
      const data = await AdminService.getHotels(destinationSlug)
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveHotel(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const data = await AdminService.saveHotel(req.body, user, role)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async deleteHotel(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const success = await AdminService.deleteHotel(req.params.id, user)
      res.json({ success })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Restaurants
  async getRestaurants(req: Request, res: Response) {
    try {
      const destinationSlug = req.query.destination as string | undefined
      const data = await AdminService.getRestaurants(destinationSlug)
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveRestaurant(req: Request, res: Response) {
    try {
      const user = req.user?.name || 'Admin'
      const role = req.user?.role || 'Admin'
      const data = await AdminService.saveRestaurant(req.body, user, role)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async deleteRestaurant(req: Request, res: Response) {
    try {
      const success = await AdminService.deleteRestaurant(req.params.id)
      res.json({ success })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Cuisines & Dishes
  async getCuisines(_req: Request, res: Response) {
    try {
      const data = await AdminService.getCuisines()
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveCuisine(req: Request, res: Response) {
    try {
      const data = await AdminService.saveCuisine(req.body)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getDishes(req: Request, res: Response) {
    try {
      const cuisineId = req.query.cuisineId as string | undefined
      const data = await AdminService.getDishes(cuisineId)
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveDish(req: Request, res: Response) {
    try {
      const data = await AdminService.saveDish(req.body)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Experiences & Media
  async getExperiences(_req: Request, res: Response) {
    try {
      const data = await AdminService.getExperiences()
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveExperience(req: Request, res: Response) {
    try {
      const data = await AdminService.saveExperience(req.body)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getMedia(_req: Request, res: Response) {
    try {
      const data = await AdminService.getMedia()
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async saveMedia(req: Request, res: Response) {
    try {
      const data = await AdminService.saveMedia(req.body)
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  // Audit Logs & Analytics
  async getAuditLogs(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string || '100', 10)
      const data = await AdminService.getAuditLogs(limit)
      res.json({ success: true, count: data.length, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },

  async getAnalyticsOverview(_req: Request, res: Response) {
    try {
      const data = await AdminService.getAnalyticsOverview()
      res.json({ success: true, data })
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message })
    }
  },
}
