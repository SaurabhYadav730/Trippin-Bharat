import type { Request, Response } from 'express'
import { seedDestinations } from '../data/seedData.js'

export const destinationController = {
  getAll(req: Request, res: Response) {
    const list = Object.values(seedDestinations).map((d) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      tagline: d.tagline,
      heroImage: d.heroImage,
      overview: d.overview,
      idealDurationDays: d.idealDurationDays,
      bestSeason: d.bestSeason,
      placesCount: d.places.length,
      staysCount: d.stays.length,
    }))
    res.json({ success: true, count: list.length, data: list })
  },

  getBySlug(req: Request, res: Response) {
    const slug = (req.params.slug || '').toLowerCase()
    const dest = seedDestinations[slug]
    if (!dest) {
      // Fallback fuzzy match
      const found = Object.values(seedDestinations).find((d) => d.slug.includes(slug) || d.name.toLowerCase().includes(slug))
      if (found) {
        return res.json({ success: true, data: found })
      }
      return res.status(404).json({ success: false, message: `Destination "${slug}" not found` })
    }
    res.json({ success: true, data: dest })
  },

  getPlaces(req: Request, res: Response) {
    const slug = (req.params.slug || '').toLowerCase()
    const dest = seedDestinations[slug] || seedDestinations['udaipur']
    res.json({ success: true, destination: dest.name, count: dest.places.length, data: dest.places })
  }
}
