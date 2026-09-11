import express from 'express'
import cors from 'cors'
import { config } from './config/environment.js'
import { connectDatabase } from './config/database.js'
import { seedDatabase } from './database/seeder.js'

import healthRoutes from './routes/health.routes.js'
import destinationRoutes from './routes/destination.routes.js'
import itineraryRoutes from './routes/itinerary.routes.js'
import tripRoutes from './routes/trip.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'

const app = express()
const PORT = config.port

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.corsOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true)
      } else {
        callback(null, true) // Permissive during development & preview
      }
    },
    credentials: true,
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request Logger
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})

// Public & Traveler API Routes
app.use('/api/health', healthRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/itinerary', itineraryRoutes)
app.use('/api/routes', itineraryRoutes) // Alias for route optimization
app.use('/api/trips', tripRoutes)
app.use('/api/auth', authRoutes)

// Admin Panel API Routes (Unified Backend for Admin & Main)
app.use('/api/admin', adminRoutes)

// Root API Explorer
app.get('/', (_req, res) => {
  res.json({
    name: "Trippin' Bharat Tourism Intelligence & Operations API",
    version: '2.0.0',
    edition: 'Smart India Hackathon (SIH 2026)',
    status: 'online',
    architecture: 'MERN Stack (MongoDB + Express.js + React.js + Node.js)',
    endpoints: {
      health: '/api/health',
      auth: ['/api/auth/login', '/api/auth/signup', '/api/auth/me', '/api/auth/logout'],
      traveler: [
        '/api/destinations',
        '/api/destinations/:slug',
        '/api/destinations/:slug/places',
        '/api/itinerary/plan',
        '/api/routes/optimize',
        '/api/trips',
      ],
      admin: [
        '/api/admin/destinations',
        '/api/admin/attractions',
        '/api/admin/hotels',
        '/api/admin/restaurants',
        '/api/admin/cuisines',
        '/api/admin/dishes',
        '/api/admin/experiences',
        '/api/admin/media',
        '/api/admin/audit-logs',
        '/api/admin/analytics/overview',
      ],
    },
  })
})

// 404 and Error Handling
app.use(notFoundHandler)
app.use(errorHandler)

// Initialize and start server
async function startServer() {
  // Connect to MongoDB
  const connected = await connectDatabase()
  if (connected) {
    await seedDatabase()
  }

  app.listen(PORT, () => {
    console.log(`🚀 Trippin' Bharat MERN Backend API running on port ${PORT} [http://localhost:${PORT}]`)
  })
}

startServer()

export default app
