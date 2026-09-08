import { adminStorage } from './adminStorage'
import { auditService } from './auditService'
import type {
  AdminDestination,
  AdminAttraction,
  AdminHotel,
  AdminRestaurant,
  CuisineItem,
  DishItem,
  AdminExperience,
  VerificationRequest,
  SystemIntegration,
  AdminUserProfile,
} from '../types/admin'

export const adminService = {
  // ──────────────────────────────────────────────
  // DESTINATIONS
  // ──────────────────────────────────────────────
  getDestinations(search = '', status = 'all'): AdminDestination[] {
    const db = adminStorage.getDb()
    let list = [...db.destinations]
    if (status !== 'all') {
      list = list.filter((d) => d.status === status)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      )
    }
    return list
  },

  getDestinationById(id: string): AdminDestination | undefined {
    return adminStorage.getDb().destinations.find((d) => d.id === id || d.slug === id)
  },

  saveDestination(destination: AdminDestination, user = 'Admin', role = 'Admin'): AdminDestination {
    const db = adminStorage.getDb()
    const index = db.destinations.findIndex((d) => d.id === destination.id)
    const isNew = index === -1

    // Recalculate tripEngineReadiness & dataHealth
    const readiness = this.calculateDestinationReadiness(destination)
    const updated = {
      ...destination,
      tripEngineReadiness: readiness,
      lastVerified: new Date().toISOString(),
      verifiedBy: user,
    }

    adminStorage.saveDb((prev) => {
      const copy = [...prev.destinations]
      if (isNew) {
        copy.unshift(updated)
      } else {
        copy[index] = updated
      }
      return { ...prev, destinations: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'destination',
      entityId: updated.id,
      entityName: updated.name,
      summary: isNew ? `Created destination "${updated.name}"` : `Updated destination "${updated.name}"`,
      newState: updated,
    })

    return updated
  },

  deleteDestination(id: string, user = 'Admin', role = 'Admin'): boolean {
    const existing = this.getDestinationById(id)
    if (!existing) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'destination',
      entityId: id,
      entityName: existing.name,
      summary: `Deleted destination "${existing.name}"`,
      previousState: existing,
    })

    return true
  },

  calculateDestinationReadiness(dest: AdminDestination): number {
    let score = 0
    if (dest.coordinates && dest.coordinates.lat && dest.coordinates.lng) score += 20
    if (dest.heroImage) score += 15
    if (dest.gallery && dest.gallery.length >= 2) score += 15
    if (dest.bestSeason) score += 15
    if (dest.bestDuration) score += 15
    if (dest.travelStyles && dest.travelStyles.length >= 1) score += 10
    if (dest.description && dest.description.length > 50) score += 10
    return Math.min(100, score)
  },

  // ──────────────────────────────────────────────
  // ATTRACTIONS
  // ──────────────────────────────────────────────
  getAttractions(filters?: {
    search?: string
    destinationId?: string
    category?: string
    status?: string
    verificationStatus?: string
    page?: number
    pageSize?: number
  }): { items: AdminAttraction[]; total: number } {
    const db = adminStorage.getDb()
    let list = [...db.attractions]

    if (filters?.destinationId && filters.destinationId !== 'all') {
      list = list.filter((a) => a.destinationId === filters.destinationId)
    }
    if (filters?.category && filters.category !== 'all') {
      list = list.filter((a) => a.category === filters.category)
    }
    if (filters?.status && filters.status !== 'all') {
      list = list.filter((a) => a.status === filters.status)
    }
    if (filters?.verificationStatus && filters.verificationStatus !== 'all') {
      list = list.filter((a) => a.verificationStatus === filters.verificationStatus)
    }
    if (filters?.search?.trim()) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.destinationName.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    const total = list.length
    const page = filters?.page || 1
    const pageSize = filters?.pageSize || 20
    const start = (page - 1) * pageSize
    const items = list.slice(start, start + pageSize)

    return { items, total }
  },

  getAttractionById(id: string): AdminAttraction | undefined {
    return adminStorage.getDb().attractions.find((a) => a.id === id)
  },

  saveAttraction(attraction: AdminAttraction, user = 'Admin', role = 'Admin'): AdminAttraction {
    const db = adminStorage.getDb()
    const index = db.attractions.findIndex((a) => a.id === attraction.id)
    const isNew = index === -1
    const prevAttraction = index >= 0 ? db.attractions[index] : undefined

    const updated: AdminAttraction = {
      ...attraction,
      lastVerified: new Date().toISOString(),
      verifiedBy: user,
    }

    adminStorage.saveDb((prev) => {
      const copy = [...prev.attractions]
      if (isNew) {
        copy.unshift(updated)
      } else {
        copy[index] = updated
      }
      return { ...prev, attractions: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'attraction',
      entityId: updated.id,
      entityName: updated.name,
      summary: isNew ? `Created attraction "${updated.name}"` : `Updated attraction "${updated.name}"`,
      previousState: prevAttraction,
      newState: updated,
    })

    return updated
  },

  deleteAttraction(id: string, user = 'Admin', role = 'Admin'): boolean {
    const existing = this.getAttractionById(id)
    if (!existing) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      attractions: prev.attractions.filter((a) => a.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'attraction',
      entityId: id,
      entityName: existing.name,
      summary: `Deleted attraction "${existing.name}"`,
      previousState: existing,
    })

    return true
  },

  verifyAttraction(id: string, user = 'Admin', role = 'Admin'): boolean {
    const attraction = this.getAttractionById(id)
    if (!attraction) return false

    return !!this.saveAttraction(
      {
        ...attraction,
        verificationStatus: 'verified',
        status: 'published',
        lastVerified: new Date().toISOString(),
        verifiedBy: user,
      },
      user,
      role
    )
  },

  // ──────────────────────────────────────────────
  // HOTELS
  // ──────────────────────────────────────────────
  getHotels(destinationId = 'all', search = ''): AdminHotel[] {
    const db = adminStorage.getDb()
    let list = [...db.hotels]
    if (destinationId !== 'all') {
      list = list.filter((h) => h.destinationId === destinationId)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((h) => h.name.toLowerCase().includes(q) || h.type.toLowerCase().includes(q))
    }
    return list
  },

  saveHotel(hotel: AdminHotel, user = 'Admin', role = 'Admin'): AdminHotel {
    const db = adminStorage.getDb()
    const index = db.hotels.findIndex((h) => h.id === hotel.id)
    const isNew = index === -1

    adminStorage.saveDb((prev) => {
      const copy = [...prev.hotels]
      if (isNew) copy.unshift(hotel)
      else copy[index] = hotel
      return { ...prev, hotels: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'hotel',
      entityId: hotel.id,
      entityName: hotel.name,
      summary: `${isNew ? 'Added' : 'Updated'} hotel "${hotel.name}"`,
      newState: hotel,
    })

    return hotel
  },

  deleteHotel(id: string, user = 'Admin', role = 'Admin'): boolean {
    const existing = adminStorage.getDb().hotels.find((h) => h.id === id)
    if (!existing) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      hotels: prev.hotels.filter((h) => h.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'hotel',
      entityId: id,
      entityName: existing.name,
      summary: `Deleted hotel "${existing.name}"`,
    })

    return true
  },

  // ──────────────────────────────────────────────
  // RESTAURANTS
  // ──────────────────────────────────────────────
  getRestaurants(destinationId = 'all', search = ''): AdminRestaurant[] {
    const db = adminStorage.getDb()
    let list = [...db.restaurants]
    if (destinationId !== 'all') {
      list = list.filter((r) => r.destinationId === destinationId)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.localSpecialties.some((s) => s.toLowerCase().includes(q))
      )
    }
    return list
  },

  saveRestaurant(restaurant: AdminRestaurant, user = 'Admin', role = 'Admin'): AdminRestaurant {
    const db = adminStorage.getDb()
    const index = db.restaurants.findIndex((r) => r.id === restaurant.id)
    const isNew = index === -1

    adminStorage.saveDb((prev) => {
      const copy = [...prev.restaurants]
      if (isNew) copy.unshift(restaurant)
      else copy[index] = restaurant
      return { ...prev, restaurants: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'restaurant',
      entityId: restaurant.id,
      entityName: restaurant.name,
      summary: `${isNew ? 'Added' : 'Updated'} restaurant "${restaurant.name}"`,
      newState: restaurant,
    })

    return restaurant
  },

  deleteRestaurant(id: string, user = 'Admin', role = 'Admin'): boolean {
    const existing = adminStorage.getDb().restaurants.find((r) => r.id === id)
    if (!existing) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      restaurants: prev.restaurants.filter((r) => r.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'restaurant',
      entityId: id,
      entityName: existing.name,
      summary: `Deleted restaurant "${existing.name}"`,
    })

    return true
  },

  // ──────────────────────────────────────────────
  // CUISINES & DISHES
  // ──────────────────────────────────────────────
  getCuisines(): CuisineItem[] {
    return adminStorage.getDb().cuisines
  },

  getDishes(cuisineId = 'all'): DishItem[] {
    const list = adminStorage.getDb().dishes
    if (cuisineId !== 'all') {
      return list.filter((d) => d.cuisineId === cuisineId)
    }
    return list
  },

  saveCuisine(cuisine: CuisineItem, user = 'Admin', role = 'Admin'): CuisineItem {
    const db = adminStorage.getDb()
    const index = db.cuisines.findIndex((c) => c.id === cuisine.id)
    const isNew = index === -1

    adminStorage.saveDb((prev) => {
      const copy = [...prev.cuisines]
      if (isNew) copy.unshift(cuisine)
      else copy[index] = cuisine
      return { ...prev, cuisines: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'cuisine',
      entityId: cuisine.id,
      entityName: cuisine.name,
      summary: `${isNew ? 'Created' : 'Updated'} cuisine "${cuisine.name}"`,
    })

    return cuisine
  },

  saveDish(dish: DishItem, user = 'Admin', role = 'Admin'): DishItem {
    const db = adminStorage.getDb()
    const index = db.dishes.findIndex((d) => d.id === dish.id)
    const isNew = index === -1

    adminStorage.saveDb((prev) => {
      const copy = [...prev.dishes]
      if (isNew) copy.unshift(dish)
      else copy[index] = dish
      return { ...prev, dishes: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'dish',
      entityId: dish.id,
      entityName: dish.name,
      summary: `${isNew ? 'Created' : 'Updated'} dish "${dish.name}"`,
    })

    return dish
  },

  // ──────────────────────────────────────────────
  // EXPERIENCES
  // ──────────────────────────────────────────────
  getExperiences(destinationId = 'all'): AdminExperience[] {
    const list = adminStorage.getDb().experiences
    if (destinationId !== 'all') {
      return list.filter((e) => e.destinationId === destinationId)
    }
    return list
  },

  saveExperience(experience: AdminExperience, user = 'Admin', role = 'Admin'): AdminExperience {
    const db = adminStorage.getDb()
    const index = db.experiences.findIndex((e) => e.id === experience.id)
    const isNew = index === -1

    adminStorage.saveDb((prev) => {
      const copy = [...prev.experiences]
      if (isNew) copy.unshift(experience)
      else copy[index] = experience
      return { ...prev, experiences: copy }
    })

    auditService.logAction({
      adminUser: user,
      role,
      action: isNew ? 'CREATE' : 'UPDATE',
      entityType: 'experience',
      entityId: experience.id,
      entityName: experience.title,
      summary: `${isNew ? 'Added' : 'Updated'} experience "${experience.title}"`,
    })

    return experience
  },

  deleteExperience(id: string, user = 'Admin', role = 'Admin'): boolean {
    const existing = adminStorage.getDb().experiences.find((e) => e.id === id)
    if (!existing) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'experience',
      entityId: id,
      entityName: existing.title,
      summary: `Deleted experience "${existing.title}"`,
    })

    return true
  },

  // ──────────────────────────────────────────────
  // VERIFICATION WORKFLOW
  // ──────────────────────────────────────────────
  getVerificationRequests(): VerificationRequest[] {
    return adminStorage.getDb().verifications
  },

  resolveVerification(
    id: string,
    action: 'approve' | 'reject',
    reviewerNotes: string,
    user = 'Admin',
    role = 'Admin'
  ): boolean {
    const db = adminStorage.getDb()
    const req = db.verifications.find((v) => v.id === id)
    if (!req) return false

    const newStatus = action === 'approve' ? 'verified' : 'needs_update'

    adminStorage.saveDb((prev) => ({
      ...prev,
      verifications: prev.verifications.map((v) =>
        v.id === id
          ? {
              ...v,
              currentStatus: newStatus,
              reviewerNotes,
              verifiedBy: user,
              verifiedAt: new Date().toISOString(),
            }
          : v
      ),
      // If approved, update entity verification status
      attractions:
        req.entityType === 'attraction' && action === 'approve'
          ? prev.attractions.map((a) =>
              a.id === req.entityId
                ? { ...a, verificationStatus: 'verified', lastVerified: new Date().toISOString(), verifiedBy: user }
                : a
            )
          : prev.attractions,
      restaurants:
        req.entityType === 'restaurant' && action === 'approve'
          ? prev.restaurants.map((r) =>
              r.id === req.entityId
                ? { ...r, verificationStatus: 'verified', lastVerified: new Date().toISOString(), verifiedBy: user }
                : r
            )
          : prev.restaurants,
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: action === 'approve' ? 'VERIFY' : 'REJECT',
      entityType: req.entityType,
      entityId: req.entityId,
      entityName: req.entityName,
      summary: `${action === 'approve' ? 'Approved & verified' : 'Rejected'} verification request for "${req.entityName}": ${reviewerNotes}`,
    })

    return true
  },

  // ──────────────────────────────────────────────
  // SYSTEM INTEGRATIONS
  // ──────────────────────────────────────────────
  getSystemIntegrations(): SystemIntegration[] {
    return [
      {
        id: 'int-map',
        name: 'Mapbox / Leaflet GIS Engine',
        type: 'map',
        provider: 'OpenStreetMap + Vector Tiles',
        status: 'connected',
        latencyMs: 42,
        uptimePercent: 99.98,
        errorRate: 0.01,
        lastChecked: new Date().toISOString(),
      },
      {
        id: 'int-geocoding',
        name: 'Government ASI & Geocoding Resolver',
        type: 'geocoding',
        provider: 'Bhuvan ISRO & Survey of India',
        status: 'connected',
        latencyMs: 78,
        uptimePercent: 99.92,
        errorRate: 0.04,
        lastChecked: new Date().toISOString(),
      },
      {
        id: 'int-routing',
        name: 'Route Optimization Engine (TSP + Haversine)',
        type: 'routing',
        provider: 'Yātra Internal Planner Core',
        status: 'connected',
        latencyMs: 12,
        uptimePercent: 100.0,
        errorRate: 0.0,
        lastChecked: new Date().toISOString(),
      },
      {
        id: 'int-storage',
        name: 'CDN Media Storage',
        type: 'storage',
        provider: 'AWS S3 Mumbai Edge Cache',
        status: 'connected',
        latencyMs: 24,
        uptimePercent: 99.99,
        errorRate: 0.0,
        lastChecked: new Date().toISOString(),
      },
      {
        id: 'int-db',
        name: 'Distributed Database Cluster',
        type: 'database',
        provider: 'MongoDB Atlas High-Availability',
        status: 'connected',
        latencyMs: 18,
        uptimePercent: 99.99,
        errorRate: 0.0,
        lastChecked: new Date().toISOString(),
      },
      {
        id: 'int-email',
        name: 'Transactional Mailer Service',
        type: 'email',
        provider: 'Postmark / SendGrid',
        status: 'connected',
        latencyMs: 110,
        uptimePercent: 99.85,
        errorRate: 0.12,
        lastChecked: new Date().toISOString(),
      },
    ]
  },

  // ──────────────────────────────────────────────
  // ACTIVE ADMIN USER & SESSIONS
  // ──────────────────────────────────────────────
  getAdminProfile(): AdminUserProfile {
    return {
      id: 'usr-admin-01',
      name: 'Saurabh Admin',
      email: 'saurabh@yatra.internal',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      activeSessions: 2,
      lastLogin: '2026-09-08T08:15:00Z',
    }
  },
}
