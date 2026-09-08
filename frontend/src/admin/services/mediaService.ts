import { adminStorage } from './adminStorage'
import { auditService } from './auditService'
import type { MediaItem, MediaUsage } from '../types/admin'

export const mediaService = {
  getAllMedia(search = '', licenseFilter = 'all'): MediaItem[] {
    const db = adminStorage.getDb()
    let list = [...db.media]

    if (licenseFilter !== 'all') {
      list = list.filter((m) => m.license === licenseFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.altText.toLowerCase().includes(q) ||
          m.caption.toLowerCase().includes(q) ||
          m.attribution.toLowerCase().includes(q)
      )
    }

    return list
  },

  getMediaById(id: string): MediaItem | undefined {
    return adminStorage.getDb().media.find((m) => m.id === id)
  },

  /**
   * Scan system to find everywhere an image URL is currently active
   */
  detectMediaUsages(imageUrl: string): MediaUsage[] {
    const db = adminStorage.getDb()
    const usages: MediaUsage[] = []

    db.destinations.forEach((d) => {
      if (d.heroImage === imageUrl || d.gallery.includes(imageUrl)) {
        usages.push({ entityType: 'destination', entityId: d.id, entityName: `${d.name} Destination Page` })
      }
    })

    db.attractions.forEach((a) => {
      if (a.heroImage === imageUrl || a.images.includes(imageUrl)) {
        usages.push({ entityType: 'attraction', entityId: a.id, entityName: `${a.name} (Attraction)` })
      }
    })

    db.hotels.forEach((h) => {
      if (h.heroImage === imageUrl || h.images.includes(imageUrl)) {
        usages.push({ entityType: 'hotel', entityId: h.id, entityName: `${h.name} (Hotel)` })
      }
    })

    db.restaurants.forEach((r) => {
      if (r.heroImage === imageUrl || r.images.includes(imageUrl)) {
        usages.push({ entityType: 'restaurant', entityId: r.id, entityName: `${r.name} (Restaurant)` })
      }
    })

    return usages
  },

  addMedia(item: Omit<MediaItem, 'id' | 'createdAt' | 'usedBy'>, user = 'Admin', role = 'Admin'): MediaItem {
    const id = `media-${Date.now()}`
    const usages = this.detectMediaUsages(item.url)
    const newMedia: MediaItem = {
      ...item,
      id,
      createdAt: new Date().toISOString(),
      usedBy: usages,
    }

    adminStorage.saveDb((prev) => ({
      ...prev,
      media: [newMedia, ...prev.media],
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'CREATE',
      entityType: 'media',
      entityId: id,
      entityName: item.title,
      summary: `Registered media asset "${item.title}" (${item.license})`,
    })

    return newMedia
  },

  deleteMedia(
    id: string,
    force = false,
    user = 'Admin',
    role = 'Admin'
  ): { success: boolean; message: string } {
    const db = adminStorage.getDb()
    const item = db.media.find((m) => m.id === id)
    if (!item) return { success: false, message: 'Media not found' }

    const liveUsages = this.detectMediaUsages(item.url)
    if (liveUsages.length > 0 && !force) {
      return {
        success: false,
        message: `Cannot delete: Media is actively referenced by ${liveUsages.length} destination/attraction records (${liveUsages.map((u) => u.entityName).join(', ')}).`,
      }
    }

    adminStorage.saveDb((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== id),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'DELETE',
      entityType: 'media',
      entityId: id,
      entityName: item.title,
      summary: `Deleted media asset "${item.title}"`,
    })

    return { success: true, message: 'Media successfully deleted' }
  },
}
