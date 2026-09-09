import { Router } from 'express'
import { tripController } from '../controllers/trip.controller.js'
import { optionalAuth, requireAuth } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', optionalAuth, tripController.saveTrip)
router.get('/', requireAuth, tripController.getUserTrips)
router.get('/:id', optionalAuth, tripController.getTripById)
router.delete('/:id', requireAuth, tripController.deleteTrip)

export default router
