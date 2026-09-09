import { Router } from 'express'
import { itineraryController } from '../controllers/itinerary.controller.js'

const router = Router()

router.post('/plan', itineraryController.plan)
router.get('/plan', itineraryController.plan)
router.post('/optimize', itineraryController.optimize)

export default router
