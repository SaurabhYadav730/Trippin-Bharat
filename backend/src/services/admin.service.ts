import { Destination } from '../models/Destination.js'
import { Attraction } from '../models/Attraction.js'
import { Hotel } from '../models/Hotel.js'
import { Restaurant } from '../models/Restaurant.js'
import { Cuisine } from '../models/Cuisine.js'
import { Dish } from '../models/Dish.js'
import { Experience } from '../models/Experience.js'
import { MediaItem } from '../models/MediaItem.js'
import { VerificationRequest } from '../models/VerificationRequest.js'
import { AuditLog } from '../models/AuditLog.js'
import { isDbConnected } from '../config/database.js'

export class AdminService {
  // ──────────────────────────────────────────────
  // AUDIT LOGGER
  // ──────────────────────────────────────────────
  static async logAction(params: {
    adminUser: string
    role?: string
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'VERIFY' | 'REJECT' | 'MERGE' | 'ROLLBACK' | 'IMPORT'
    entityType: string
    entityId: string
    entityName: string
    summary: string
    previousState?: any
    newState?: any
    ipAddress?: string
  }) {
    if (isDbConnected()) {
      try {
        await AuditLog.create({
          timestamp: new Date(),
          adminUser: params.adminUser || 'Admin',
          role: params.role || 'Admin',
          action: params.action,
          entityType: params.entityType,
          entityId: String(params.entityId),
          entityName: params.entityName,
          summary: params.summary,
          previousState: params.previousState,
          newState: params.newState,
          ipAddress: params.ipAddress,
        })
      } catch (e) {
        console.error('Audit log write failed:', e)
      }
    }
  }

  // ──────────────────────────────────────────────
  // DESTINATIONS
  // ──────────────────────────────────────────────
  static async getDestinations(search = '', status = 'all') {
    if (isDbConnected()) {
      const filter: any = {}
      if (status !== 'all') filter.status = status
      if (search.trim()) {
        const regex = new RegExp(search, 'i')
        filter.$or = [{ name: regex }, { state: regex }, { region: regex }]
      }
      const list = await Destination.find(filter).sort({ name: 1 })
      return list.map((d) => d.toJSON())
    }
    return []
  }

  static async getDestinationById(id: string) {
    if (isDbConnected()) {
      const dest = await Destination.findOne({
        $or: [{ _id: id.length === 24 ? id : undefined }, { slug: id }, { name: new RegExp(`^${id}$`, 'i') }],
      })
      return dest ? dest.toJSON() : null
    }
    return null
  }

  static async saveDestination(data: any, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      const isNew = !data.id || data.id.startsWith('dest-temp')
      let result: any
      let prev: any = null

      if (!isNew && data.id) {
        prev = await Destination.findOne({
          $or: [{ _id: data.id.length === 24 ? data.id : undefined }, { slug: data.slug || data.id }],
        })
      }

      if (prev) {
        Object.assign(prev, data)
        prev.lastVerified = new Date()
        prev.verifiedBy = user
        result = await prev.save()
      } else {
        result = await Destination.create({
          ...data,
          slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
          lastVerified: new Date(),
          verifiedBy: user,
        })
      }

      const resJson = result.toJSON()
      await this.logAction({
        adminUser: user,
        role,
        action: isNew ? 'CREATE' : 'UPDATE',
        entityType: 'destination',
        entityId: resJson.id,
        entityName: resJson.name,
        summary: `${isNew ? 'Created' : 'Updated'} destination "${resJson.name}"`,
        previousState: prev ? prev.toJSON() : null,
        newState: resJson,
      })

      return resJson
    }
    return data
  }

  static async deleteDestination(id: string, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      const existing = await this.getDestinationById(id)
      if (!existing) return false

      await Destination.deleteOne({
        $or: [{ _id: id.length === 24 ? id : undefined }, { slug: id }],
      })

      await this.logAction({
        adminUser: user,
        role,
        action: 'DELETE',
        entityType: 'destination',
        entityId: existing.id,
        entityName: existing.name,
        summary: `Deleted destination "${existing.name}"`,
        previousState: existing,
      })

      return true
    }
    return true
  }

  // ──────────────────────────────────────────────
  // ATTRACTIONS
  // ──────────────────────────────────────────────
  static async getAttractions(params: { search?: string; destinationId?: string; category?: string; status?: string } = {}) {
    if (isDbConnected()) {
      const filter: any = {}
      if (params.status && params.status !== 'all') filter.status = params.status
      if (params.category && params.category !== 'all') filter.category = params.category
      if (params.destinationId && params.destinationId !== 'all') {
        filter.$or = [
          { destinationId: params.destinationId },
          { destinationSlug: params.destinationId.toLowerCase() },
        ]
      }
      if (params.search?.trim()) {
        const regex = new RegExp(params.search, 'i')
        filter.$and = filter.$and || []
        filter.$and.push({ $or: [{ name: regex }, { hindiName: regex }, { destinationName: regex }] })
      }

      const list = await Attraction.find(filter).sort({ importanceScore: -1, name: 1 })
      return list.map((a) => a.toJSON())
    }
    return []
  }

  static async getAttractionById(id: string) {
    if (isDbConnected()) {
      const attr = await Attraction.findOne({
        $or: [{ _id: id.length === 24 ? id : undefined }, { id }, { slug: id }],
      })
      return attr ? attr.toJSON() : null
    }
    return null
  }

  static async saveAttraction(data: any, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      let prev: any = null
      let result: any
      const isNew = !data.id || data.id.startsWith('attr-temp')

      if (!isNew && data.id) {
        prev = await Attraction.findOne({
          $or: [{ _id: data.id.length === 24 ? data.id : undefined }, { id: data.id }, { slug: data.slug || data.id }],
        })
      }

      if (prev) {
        Object.assign(prev, data)
        prev.lastVerified = new Date()
        prev.verifiedBy = user
        result = await prev.save()
      } else {
        result = await Attraction.create({
          ...data,
          slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
          lastVerified: new Date(),
          verifiedBy: user,
        })
      }

      const resJson = result.toJSON()
      await this.logAction({
        adminUser: user,
        role,
        action: isNew ? 'CREATE' : 'UPDATE',
        entityType: 'attraction',
        entityId: resJson.id,
        entityName: resJson.name,
        summary: `${isNew ? 'Created' : 'Updated'} attraction "${resJson.name}" in ${resJson.destinationName || 'Mewar'}`,
        previousState: prev ? prev.toJSON() : null,
        newState: resJson,
      })

      return resJson
    }
    return data
  }

  static async deleteAttraction(id: string, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      const existing = await this.getAttractionById(id)
      if (!existing) return false

      await Attraction.deleteOne({
        $or: [{ _id: id.length === 24 ? id : undefined }, { id }, { slug: id }],
      })

      await this.logAction({
        adminUser: user,
        role,
        action: 'DELETE',
        entityType: 'attraction',
        entityId: existing.id,
        entityName: existing.name,
        summary: `Deleted attraction "${existing.name}"`,
        previousState: existing,
      })

      return true
    }
    return true
  }

  // ──────────────────────────────────────────────
  // HOTELS & RESTAURANTS
  // ──────────────────────────────────────────────
  static async getHotels(destinationSlug?: string) {
    if (isDbConnected()) {
      const filter: any = {}
      if (destinationSlug && destinationSlug !== 'all') filter.destinationSlug = destinationSlug.toLowerCase()
      const hotels = await Hotel.find(filter).sort({ rating: -1 })
      return hotels.map((h) => h.toJSON())
    }
    return []
  }

  static async saveHotel(data: any, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      let prev = data.id ? await Hotel.findById(data.id.length === 24 ? data.id : undefined) : null
      let result: any
      const isNew = !prev

      if (prev) {
        Object.assign(prev, data)
        result = await prev.save()
      } else {
        result = await Hotel.create(data)
      }

      const resJson = result.toJSON()
      await this.logAction({
        adminUser: user,
        role,
        action: isNew ? 'CREATE' : 'UPDATE',
        entityType: 'hotel',
        entityId: resJson.id,
        entityName: resJson.name,
        summary: `${isNew ? 'Created' : 'Updated'} hotel "${resJson.name}"`,
      })
      return resJson
    }
    return data
  }

  static async deleteHotel(id: string, user = 'Admin') {
    if (isDbConnected()) {
      await Hotel.deleteOne({ _id: id })
      return true
    }
    return true
  }

  static async getRestaurants(destinationSlug?: string) {
    if (isDbConnected()) {
      const filter: any = {}
      if (destinationSlug && destinationSlug !== 'all') filter.destinationSlug = destinationSlug.toLowerCase()
      const restaurants = await Restaurant.find(filter).sort({ rating: -1 })
      return restaurants.map((r) => r.toJSON())
    }
    return []
  }

  static async saveRestaurant(data: any, user = 'Admin', role = 'Admin') {
    if (isDbConnected()) {
      let prev = data.id ? await Restaurant.findById(data.id.length === 24 ? data.id : undefined) : null
      let result: any
      const isNew = !prev

      if (prev) {
        Object.assign(prev, data)
        result = await prev.save()
      } else {
        result = await Restaurant.create(data)
      }

      const resJson = result.toJSON()
      await this.logAction({
        adminUser: user,
        role,
        action: isNew ? 'CREATE' : 'UPDATE',
        entityType: 'restaurant',
        entityId: resJson.id,
        entityName: resJson.name,
        summary: `${isNew ? 'Created' : 'Updated'} restaurant "${resJson.name}"`,
      })
      return resJson
    }
    return data
  }

  static async deleteRestaurant(id: string) {
    if (isDbConnected()) {
      await Restaurant.deleteOne({ _id: id })
      return true
    }
    return true
  }

  // ──────────────────────────────────────────────
  // CUISINES & DISHES
  // ──────────────────────────────────────────────
  static async getCuisines() {
    if (isDbConnected()) {
      const list = await Cuisine.find().sort({ name: 1 })
      return list.map((c) => c.toJSON())
    }
    return []
  }

  static async saveCuisine(data: any, user = 'Admin') {
    if (isDbConnected()) {
      let result: any
      if (data.id && data.id.length === 24) {
        result = await Cuisine.findByIdAndUpdate(data.id, data, { new: true })
      } else {
        result = await Cuisine.create(data)
      }
      return result.toJSON()
    }
    return data
  }

  static async getDishes(cuisineId?: string) {
    if (isDbConnected()) {
      const filter: any = {}
      if (cuisineId && cuisineId !== 'all') filter.cuisineId = cuisineId
      const list = await Dish.find(filter).sort({ name: 1 })
      return list.map((d) => d.toJSON())
    }
    return []
  }

  static async saveDish(data: any) {
    if (isDbConnected()) {
      let result: any
      if (data.id && data.id.length === 24) {
        result = await Dish.findByIdAndUpdate(data.id, data, { new: true })
      } else {
        result = await Dish.create(data)
      }
      return result.toJSON()
    }
    return data
  }

  // ──────────────────────────────────────────────
  // EXPERIENCES & MEDIA
  // ──────────────────────────────────────────────
  static async getExperiences() {
    if (isDbConnected()) {
      const list = await Experience.find().sort({ createdAt: -1 })
      return list.map((e) => e.toJSON())
    }
    return []
  }

  static async saveExperience(data: any) {
    if (isDbConnected()) {
      let result: any
      if (data.id && data.id.length === 24) {
        result = await Experience.findByIdAndUpdate(data.id, data, { new: true })
      } else {
        result = await Experience.create(data)
      }
      return result.toJSON()
    }
    return data
  }

  static async getMedia() {
    if (isDbConnected()) {
      const list = await MediaItem.find().sort({ createdAt: -1 })
      return list.map((m) => m.toJSON())
    }
    return []
  }

  static async saveMedia(data: any) {
    if (isDbConnected()) {
      const created = await MediaItem.create(data)
      return created.toJSON()
    }
    return data
  }

  // ──────────────────────────────────────────────
  // AUDIT LOGS & ANALYTICS OVERVIEW
  // ──────────────────────────────────────────────
  static async getAuditLogs(limit = 100) {
    if (isDbConnected()) {
      const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(limit)
      return logs.map((l) => l.toJSON())
    }
    return []
  }

  static async getAnalyticsOverview() {
    if (isDbConnected()) {
      const [destCount, attrCount, hotelCount, restCount, expCount, verifiedAttrCount, auditCount] = await Promise.all([
        Destination.countDocuments(),
        Attraction.countDocuments(),
        Hotel.countDocuments(),
        Restaurant.countDocuments(),
        Experience.countDocuments(),
        Attraction.countDocuments({ verificationStatus: 'verified' }),
        AuditLog.countDocuments(),
      ])

      return {
        destinationsCount: destCount,
        attractionsCount: attrCount,
        hotelsCount: hotelCount,
        restaurantsCount: restCount,
        experiencesCount: expCount,
        verifiedAttractionsRatio: attrCount > 0 ? Number(((verifiedAttrCount / attrCount) * 100).toFixed(1)) : 100,
        totalAuditActions: auditCount,
        averageReadiness: 94.8,
        systemStatus: 'Optimal',
      }
    }

    return {
      destinationsCount: 2,
      attractionsCount: 8,
      hotelsCount: 3,
      restaurantsCount: 2,
      experiencesCount: 2,
      verifiedAttractionsRatio: 100,
      totalAuditActions: 14,
      averageReadiness: 95,
      systemStatus: 'Optimal',
    }
  }
}
