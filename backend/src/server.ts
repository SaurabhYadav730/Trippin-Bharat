import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import healthRoutes from './routes/health.routes.js'
import destinationRoutes from './routes/destination.routes.js'
import itineraryRoutes from './routes/itinerary.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174').split(',')
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true)
    } else {
      callback(null, true) // permissive in development
    }
  },
  credentials: true
}))

app.use(express.json())

// Request Logger
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})

// Base API Routes
app.use('/api/health', healthRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/itinerary', itineraryRoutes)
app.use('/api/auth', authRoutes)

// Root health & welcome endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Yātra Tourism Intelligence API',
    version: '1.0.0',
    edition: 'Smart India Hackathon (SIH 2026)',
    status: 'online',
    endpoints: [
      '/api/health',
      '/api/destinations',
      '/api/destinations/:slug',
      '/api/destinations/:slug/places',
      '/api/itinerary/plan',
      '/api/auth/login',
      '/api/auth/signup',
    ]
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Yātra API Server running on port ${PORT} [http://localhost:${PORT}]`)
})

export default app
