import { Router } from 'express'
import { destinationController } from '../controllers/destination.controller.js'

const router = Router()

router.get('/', destinationController.getAll)
router.get('/:slug', destinationController.getBySlug)
router.get('/:slug/places', destinationController.getPlaces)
router.get('/:slug/places/:placeId', destinationController.getPlaceDetails)

export default router
