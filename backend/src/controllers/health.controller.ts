import type { Request, Response } from 'express'
import { isDbConnected } from '../config/database.js'

export const healthController = {
  check(_req: Request, res: Response) {
    const dbStatus = isDbConnected() ? 'connected' : 'memory_fallback'
    res.json({
      status: 'healthy',
      platform: 'Yātra Tourism Operations API (SIH 2026)',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      services: {
        database: { status: dbStatus, driver: 'MongoDB / Mongoose 8.x' },
        gisGeocoding: { status: 'operational', provider: 'ISRO Bhuvan & GeoSpatial Coordinates' },
        itineraryTspEngine: { status: 'operational', version: '3.0.0' },
      },
    })
  },
}
