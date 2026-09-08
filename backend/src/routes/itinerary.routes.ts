import { Router } from 'express'
import { itineraryController } from '../controllers/itinerary.controller.js'

const router = Router()

router.post('/plan', itineraryController.plan)
router.get('/plan', itineraryController.plan)

export default router
