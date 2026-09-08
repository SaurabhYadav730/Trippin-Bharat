import type { AuditLogEntry, AdminAuditAction } from '../types/admin'

const AUDIT_STORAGE_KEY = 'yatra_admin_audit_logs'

class AuditService {
  private logs: AuditLogEntry[] = []

  constructor() {
    this.loadLogs()
  }

  private loadLogs() {
    try {
      const stored = localStorage.getItem(AUDIT_STORAGE_KEY)
      if (stored) {
        this.logs = JSON.parse(stored)
      } else {
        this.logs = this.getInitialSeedLogs()
        this.saveLogs()
      }
    } catch {
      this.logs = this.getInitialSeedLogs()
    }
  }

  private saveLogs() {
    try {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(this.logs))
    } catch {
      // storage quota fallback
    }
  }

  private getInitialSeedLogs(): AuditLogEntry[] {
    return [
      {
        id: 'audit-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        adminUser: 'Saurabh Admin',
        role: 'Admin',
        action: 'VERIFY',
        entityType: 'attraction',
        entityId: 'udaipur-city-palace',
        entityName: 'City Palace Complex',
        summary: 'Verified ASI compliance & opening hours schedule',
        fieldChanges: [
          { fieldName: 'verificationStatus', from: 'pending_review', to: 'verified' },
          { fieldName: 'lastVerified', from: '2026-08-10', to: '2026-09-08' },
        ],
      },
      {
        id: 'audit-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
        adminUser: 'Saurabh Admin',
        role: 'Admin',
        action: 'UPDATE',
        entityType: 'attraction',
        entityId: 'udaipur-jagdish-temple',
        entityName: 'Jagdish Temple',
        summary: 'Updated Best Time to Visit from Afternoon to Early Morning',
        fieldChanges: [
          { fieldName: 'bestTime.bestTimeOfDay', from: 'Afternoon', to: 'Early Morning' },
          { fieldName: 'bestTime.bestTimeDescription', from: 'Open daily', to: 'Early morning aarti (5:30 AM) offers the most serene spiritual ambiance' },
        ],
      },
      {
        id: 'audit-003',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        adminUser: 'Pooja Verma',
        role: 'Tourism Data Editor',
        action: 'UPDATE',
        entityType: 'restaurant',
        entityId: 'amrai-udaipur',
        entityName: 'Ambrai Restaurant',
        summary: 'Added Jain-friendly options and revised price for two',
        fieldChanges: [
          { fieldName: 'isJainFriendly', from: false, to: true },
          { fieldName: 'priceForTwo', from: 2200, to: 2800 },
        ],
      },
      {
        id: 'audit-004',
        timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
        adminUser: 'Saurabh Admin',
        role: 'Admin',
        action: 'MERGE',
        entityType: 'attraction',
        entityId: 'udaipur-sajjangarh',
        entityName: 'Monsoon Palace (Sajjangarh)',
        summary: 'Merged duplicate candidate "Sajjangarh Fort Sunset Point" into primary record',
      },
      {
        id: 'audit-005',
        timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
        adminUser: 'Vikram Singh',
        role: 'Content Admin',
        action: 'PUBLISH',
        entityType: 'destination',
        entityId: 'dest-udaipur',
        entityName: 'Udaipur, Rajasthan',
        summary: 'Published revised destination guide with verified winter season metadata',
      },
    ]
  }

  logAction(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
    const newLog: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    }
    this.logs.unshift(newLog)
    if (this.logs.length > 500) {
      this.logs = this.logs.slice(0, 500)
    }
    this.saveLogs()
    return newLog
  }

  getLogs(filters?: {
    entityType?: string
    action?: AdminAuditAction
    search?: string
  }): AuditLogEntry[] {
    let result = [...this.logs]
    if (filters?.entityType && filters.entityType !== 'all') {
      result = result.filter((l) => l.entityType === filters.entityType)
    }
    if (filters?.action) {
      result = result.filter((l) => l.action === filters.action)
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (l) =>
          l.entityName.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.adminUser.toLowerCase().includes(q)
      )
    }
    return result
  }

  getLogById(id: string): AuditLogEntry | undefined {
    return this.logs.find((l) => l.id === id)
  }

  clearLogs() {
    this.logs = []
    this.saveLogs()
  }
}

export const auditService = new AuditService()
