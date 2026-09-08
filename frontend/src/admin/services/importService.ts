import { adminStorage } from './adminStorage'
import { auditService } from './auditService'
import type { ImportBatch, AdminAttraction } from '../types/admin'

const IMPORT_BATCHES_KEY = 'yatra_admin_import_batches'

class ImportService {
  private batches: ImportBatch[] = []

  constructor() {
    this.loadBatches()
  }

  private loadBatches() {
    try {
      const stored = localStorage.getItem(IMPORT_BATCHES_KEY)
      if (stored) {
        this.batches = JSON.parse(stored)
      } else {
        this.batches = [
          {
            id: 'BATCH-2026-09-07-001',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            fileName: 'udaipur_heritage_monuments.csv',
            entityType: 'attraction',
            totalRows: 6,
            insertedCount: 4,
            updatedCount: 2,
            invalidCount: 0,
            duplicateCount: 0,
            status: 'applied',
            records: [],
            errors: [],
            auditLogId: 'audit-import-001',
          },
        ]
        this.saveBatches()
      }
    } catch {
      this.batches = []
    }
  }

  private saveBatches() {
    try {
      localStorage.setItem(IMPORT_BATCHES_KEY, JSON.stringify(this.batches))
    } catch {
      // ignore storage overflow
    }
  }

  getBatches(): ImportBatch[] {
    return this.batches
  }

  validateRawData(
    rawText: string,
    fileType: 'csv' | 'json',
    entityType: 'attraction' | 'hotel' | 'restaurant' | 'destination'
  ): {
    isValid: boolean
    totalRows: number
    validNew: any[]
    validUpdates: any[]
    duplicates: any[]
    invalid: { row: number; reason: string; data: any }[]
    previewRecords: any[]
  } {
    let parsedRows: any[] = []

    try {
      if (fileType === 'json') {
        const parsed = JSON.parse(rawText)
        parsedRows = Array.isArray(parsed) ? parsed : [parsed]
      } else {
        // Simple CSV parser
        const lines = rawText
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
        if (lines.length < 2) {
          return {
            isValid: false,
            totalRows: 0,
            validNew: [],
            validUpdates: [],
            duplicates: [],
            invalid: [{ row: 1, reason: 'File has fewer than 2 rows (header + data required)', data: {} }],
            previewRecords: [],
          }
        }
        const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''))
        parsedRows = lines.slice(1).map((line) => {
          const values = line.split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''))
          const obj: Record<string, any> = {}
          headers.forEach((h, idx) => {
            obj[h] = values[idx] !== undefined ? values[idx] : ''
          })
          return obj
        })
      }
    } catch (e: any) {
      return {
        isValid: false,
        totalRows: 0,
        validNew: [],
        validUpdates: [],
        duplicates: [],
        invalid: [{ row: 0, reason: `Parse error: ${e.message}`, data: {} }],
        previewRecords: [],
      }
    }

    const db = adminStorage.getDb()
    const validNew: any[] = []
    const validUpdates: any[] = []
    const duplicates: any[] = []
    const invalid: { row: number; reason: string; data: any }[] = []

    parsedRows.forEach((row, idx) => {
      const rowNum = idx + 2
      const name = row.name || row.title || ''

      if (!name) {
        invalid.push({ row: rowNum, reason: 'Missing required field: "name"', data: row })
        return
      }

      // Check existence
      const existing = db.attractions.find(
        (a) => a.id === row.id || a.name.toLowerCase() === name.toLowerCase()
      )

      if (existing) {
        validUpdates.push({ ...row, matchedId: existing.id })
      } else {
        validNew.push(row)
      }
    })

    return {
      isValid: invalid.length === 0,
      totalRows: parsedRows.length,
      validNew,
      validUpdates,
      duplicates,
      invalid,
      previewRecords: parsedRows.slice(0, 5),
    }
  }

  applyImportBatch(
    fileName: string,
    entityType: 'attraction' | 'hotel' | 'restaurant' | 'destination',
    validatedData: { validNew: any[]; validUpdates: any[] },
    user = 'Admin',
    role = 'Admin'
  ): ImportBatch {
    const batchId = `BATCH-${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    const newAttractionsToInsert: AdminAttraction[] = validatedData.validNew.map((item, idx) => ({
      id: item.id || `imp-attr-${Date.now()}-${idx}`,
      name: item.name || 'Imported Place',
      category: (item.category as any) || 'heritage',
      categoryLabel: item.categoryLabel || 'Heritage Site',
      destinationId: item.destinationId || 'dest-udaipur',
      destinationName: item.destinationName || 'Udaipur',
      description: item.description || 'Imported cultural place record.',
      shortDescription: item.shortDescription || item.description?.slice(0, 80) || '',
      coordinates: {
        lat: parseFloat(item.lat || item.latitude || '24.58'),
        lng: parseFloat(item.lng || item.longitude || '73.71'),
      },
      address: item.address || 'Udaipur, Rajasthan',
      heroImage: item.heroImage || item.image || '/images/places/city-palace.jpg',
      images: [item.heroImage || item.image || '/images/places/city-palace.jpg'],
      entryFee: {
        indian: parseFloat(item.entryFeeIndian || '100'),
        foreign: parseFloat(item.entryFeeForeign || '300'),
        priceType: 'fixed',
      },
      openingHours: {
        monday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        tuesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        wednesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        thursday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        friday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        saturday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        sunday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
      },
      closedDays: [],
      bestTime: {
        bestTimeOfDay: (item.bestTimeOfDay as any) || 'Morning',
        bestTimeDescription: item.bestTimeDescription || 'Best visited in the morning.',
        bestSeason: 'October – March',
      },
      recommendedVisitDurationMin: parseInt(item.durationMin || '90'),
      importanceScore: parseFloat(item.importanceScore || '8.5'),
      culturalScore: 8.5,
      historicalScore: 8.5,
      popularityScore: 8.0,
      uniquenessScore: 8.0,
      priorityCategory: 'recommended',
      familyFriendly: true,
      accessibility: true,
      photography: true,
      tags: ['Imported', 'Heritage'],
      status: 'draft',
      verificationStatus: 'pending_review',
      source: `Batch Import: ${fileName}`,
      lastVerified: new Date().toISOString(),
      verifiedBy: user,
      usedInTripsCount: 0,
      usedInCollectionsCount: 0,
    }))

    // Save into DB
    adminStorage.saveDb((prev) => ({
      ...prev,
      attractions: [...newAttractionsToInsert, ...prev.attractions],
    }))

    const batch: ImportBatch = {
      id: batchId,
      timestamp: new Date().toISOString(),
      fileName,
      entityType,
      totalRows: validatedData.validNew.length + validatedData.validUpdates.length,
      insertedCount: validatedData.validNew.length,
      updatedCount: validatedData.validUpdates.length,
      invalidCount: 0,
      duplicateCount: 0,
      status: 'applied',
      records: newAttractionsToInsert,
      errors: [],
      auditLogId: `audit-${batchId}`,
    }

    this.batches.unshift(batch)
    this.saveBatches()

    auditService.logAction({
      adminUser: user,
      role,
      action: 'IMPORT',
      entityType,
      entityId: batchId,
      entityName: fileName,
      summary: `Imported ${batch.insertedCount} new records and updated ${batch.updatedCount} records from ${fileName}`,
    })

    return batch
  }

  rollbackBatch(batchId: string, user = 'Admin', role = 'Admin'): boolean {
    const batch = this.batches.find((b) => b.id === batchId)
    if (!batch || batch.status === 'rolled_back') return false

    const insertedIds = new Set(batch.records.map((r) => r.id))

    adminStorage.saveDb((prev) => ({
      ...prev,
      attractions: prev.attractions.filter((a) => !insertedIds.has(a.id)),
    }))

    batch.status = 'rolled_back'
    this.saveBatches()

    auditService.logAction({
      adminUser: user,
      role,
      action: 'ROLLBACK',
      entityType: batch.entityType,
      entityId: batch.id,
      entityName: batch.fileName,
      summary: `Rolled back import batch ${batch.id} (${batch.insertedCount} records reverted)`,
    })

    return true
  }
}

export const importService = new ImportService()
