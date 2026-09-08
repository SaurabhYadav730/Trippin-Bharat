import { adminStorage } from './adminStorage'
import { auditService } from './auditService'
import type { DuplicatePair, AdminAttraction } from '../types/admin'

export const duplicateDetectionService = {
  getDuplicatePairs(): DuplicatePair[] {
    return adminStorage.getDb().duplicatePairs
  },

  dismissDuplicate(id: string, user = 'Admin', role = 'Admin'): boolean {
    const db = adminStorage.getDb()
    const pair = db.duplicatePairs.find((p) => p.id === id)
    if (!pair) return false

    adminStorage.saveDb((prev) => ({
      ...prev,
      duplicatePairs: prev.duplicatePairs.map((p) => (p.id === id ? { ...p, status: 'dismissed' } : p)),
    }))

    auditService.logAction({
      adminUser: user,
      role,
      action: 'UPDATE',
      entityType: 'duplicate_pair',
      entityId: id,
      entityName: `${pair.recordA.name} / ${pair.recordB.name}`,
      summary: `Marked duplicate candidate as distinct (false positive)`,
    })

    return true
  },

  /**
   * Field-level merge of two duplicate records
   */
  mergeRecords(
    pairId: string,
    primaryRecordId: string,
    fieldSelections: {
      name: 'A' | 'B'
      description: 'A' | 'B'
      coordinates: 'A' | 'B'
      openingHours: 'A' | 'B'
      entryFee: 'A' | 'B'
      images: 'A' | 'B' | 'both'
    },
    user = 'Admin',
    role = 'Admin'
  ): boolean {
    const db = adminStorage.getDb()
    const pair = db.duplicatePairs.find((p) => p.id === pairId)
    if (!pair) return false

    const secondaryRecordId = primaryRecordId === pair.recordA.id ? pair.recordB.id : pair.recordA.id

    // Find full attraction objects if in attractions list
    const primaryAttr = db.attractions.find((a) => a.id === primaryRecordId)
    const secondaryAttr = db.attractions.find((a) => a.id === secondaryRecordId)

    if (primaryAttr) {
      const mergedImages =
        fieldSelections.images === 'both' && secondaryAttr
          ? Array.from(new Set([...primaryAttr.images, ...secondaryAttr.images]))
          : fieldSelections.images === 'B' && secondaryAttr
          ? secondaryAttr.images
          : primaryAttr.images

      const mergedName =
        fieldSelections.name === 'B' && secondaryAttr ? secondaryAttr.name : primaryAttr.name
      const mergedDesc =
        fieldSelections.description === 'B' && secondaryAttr
          ? secondaryAttr.description
          : primaryAttr.description
      const mergedCoords =
        fieldSelections.coordinates === 'B' && secondaryAttr
          ? secondaryAttr.coordinates
          : primaryAttr.coordinates
      const mergedHours =
        fieldSelections.openingHours === 'B' && secondaryAttr
          ? secondaryAttr.openingHours
          : primaryAttr.openingHours
      const mergedFee =
        fieldSelections.entryFee === 'B' && secondaryAttr
          ? secondaryAttr.entryFee
          : primaryAttr.entryFee

      const updatedPrimary: AdminAttraction = {
        ...primaryAttr,
        name: mergedName,
        description: mergedDesc,
        coordinates: mergedCoords,
        openingHours: mergedHours,
        entryFee: mergedFee,
        images: mergedImages,
        lastVerified: new Date().toISOString(),
        verifiedBy: user,
      }

      adminStorage.saveDb((prev) => ({
        ...prev,
        attractions: prev.attractions
          .map((a) => (a.id === primaryRecordId ? updatedPrimary : a))
          .filter((a) => a.id !== secondaryRecordId), // remove duplicate
        duplicatePairs: prev.duplicatePairs.map((p) => (p.id === pairId ? { ...p, status: 'merged' } : p)),
      }))

      auditService.logAction({
        adminUser: user,
        role,
        action: 'MERGE',
        entityType: 'attraction',
        entityId: primaryRecordId,
        entityName: mergedName,
        summary: `Merged duplicate record "${secondaryRecordId}" into primary record "${primaryRecordId}" with custom field selections.`,
        newState: updatedPrimary,
      })
    } else {
      // Mark pair as merged
      adminStorage.saveDb((prev) => ({
        ...prev,
        duplicatePairs: prev.duplicatePairs.map((p) => (p.id === pairId ? { ...p, status: 'merged' } : p)),
      }))
    }

    return true
  },
}
