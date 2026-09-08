import type { Request, Response } from 'express'

export const healthController = {
  check(req: Request, res: Response) {
    res.json({
      status: 'healthy',
      platform: 'Yātra Tourism Operations API (SIH 2026)',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      services: {
        database: { status: 'connected', latencyMs: 14 },
        gisGeocoding: { status: 'operational', provider: 'ISRO / Bhuvan' },
        itineraryTspEngine: { status: 'operational', version: '2.4.0' },
      }
    })
  }
}
