import { Destination } from '../models/Destination.js'
import { Attraction } from '../models/Attraction.js'
import { Hotel } from '../models/Hotel.js'
import { Restaurant } from '../models/Restaurant.js'
import { Dish } from '../models/Dish.js'
import { isDbConnected } from '../config/database.js'
import { seedDestinations, generateDynamicDestination } from '../data/catalog.js'

export class DestinationService {
  static async getAllDestinations(query: { search?: string; featured?: boolean } = {}) {
    if (isDbConnected()) {
      const filter: any = { status: 'published' }
      if (query.featured) filter.featured = true
      if (query.search) {
        const regex = new RegExp(query.search, 'i')
        filter.$or = [{ name: regex }, { state: regex }, { region: regex }]
      }

      const destinations = await Destination.find(filter).sort({ featured: -1, name: 1 })
      return destinations.map((d) => d.toJSON())
    }

    // Fallback mode
    return Object.values(seedDestinations)
  }

  static async getDestinationBySlug(slug: string) {
    const rawKey = (slug || '').trim()
    const key = rawKey.toLowerCase()
    const firstWord = key.split(',')[0].trim().replace(/^,+|,+$/g, '')

    if (isDbConnected()) {
      // 1. Find destination document
      let dest = await Destination.findOne({
        $or: [
          { slug: key },
          { slug: firstWord },
          { name: new RegExp(`^${key}$`, 'i') },
          { name: new RegExp(`^${firstWord}$`, 'i') },
        ],
        status: 'published',
      })

      if (!dest) {
        // Try fuzzy regex
        dest = await Destination.findOne({
          $or: [{ name: new RegExp(key, 'i') }, { name: new RegExp(firstWord, 'i') }],
          status: 'published',
        })
      }

      if (dest) {
        // 2. Fetch associated attractions, stays, restaurants, dishes
        const [places, stays, restaurants, dishes] = await Promise.all([
          Attraction.find({ destinationSlug: dest.slug, status: 'published' }).sort({ importanceScore: -1 }),
          Hotel.find({ destinationSlug: dest.slug, status: 'published' }).sort({ rating: -1 }),
          Restaurant.find({ destinationSlug: dest.slug, status: 'published' }).sort({ rating: -1 }),
          Dish.find({ destinationId: dest.id }),
        ])

        const destJson = dest.toJSON()

        return {
          ...destJson,
          places: places.map((p) => p.toJSON()),
          stays: stays.map((s) => s.toJSON()),
          restaurants: restaurants.map((r) => r.toJSON()),
          dishes: dishes.map((d) => d.toJSON()),
        }
      }
    }

    // Direct / In-Memory Match
    if (seedDestinations[key]) {
      return seedDestinations[key]
    }
    if (seedDestinations[firstWord]) {
      return seedDestinations[firstWord]
    }

    // Fuzzy match across seedDestinations
    const found = Object.values(seedDestinations).find(
      (d) =>
        d.name.toLowerCase().includes(key) ||
        key.includes(d.name.toLowerCase()) ||
        d.name.toLowerCase().includes(firstWord) ||
        firstWord.includes(d.name.toLowerCase()) ||
        d.slug.includes(key) ||
        key.includes(d.slug)
    )

    if (found) {
      return found
    }

    // Dynamic destination generator for any custom city/region searched!
    return generateDynamicDestination(rawKey)
  }

  static async getPlacesForDestination(slug: string) {
    const key = (slug || '').toLowerCase().trim()

    if (isDbConnected()) {
      const places = await Attraction.find({
        destinationSlug: key,
        status: 'published',
      }).sort({ importanceScore: -1 })

      return places.map((p) => p.toJSON())
    }

    const dest = await this.getDestinationBySlug(slug)
    return dest ? dest.places : []
  }

  static async getPlaceDetails(slug: string, placeId: string) {
    if (isDbConnected()) {
      const place = await Attraction.findOne({
        $or: [{ id: placeId }, { slug: placeId }, { _id: placeId.length === 24 ? placeId : undefined }],
        status: 'published',
      })
      return place ? place.toJSON() : null
    }

    const dest = await this.getDestinationBySlug(slug)
    return dest?.places.find((p) => p.id === placeId) || null
  }
}
