import { Router } from 'express'
import { adminController } from '../controllers/admin.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/rbac.middleware.js'

const router = Router()

// All admin routes require authentication and an authorized role
router.use(requireAuth)
router.use(requireRole('admin', 'content_admin', 'data_editor', 'verification_manager', 'moderator', 'analyst'))

// Destinations
router.get('/destinations', adminController.getDestinations)
router.get('/destinations/:id', adminController.getDestinationById)
router.post('/destinations', adminController.saveDestination)
router.put('/destinations/:id', adminController.saveDestination)
router.delete('/destinations/:id', adminController.deleteDestination)

// Attractions
router.get('/attractions', adminController.getAttractions)
router.get('/attractions/:id', adminController.getAttractionById)
router.post('/attractions', adminController.saveAttraction)
router.put('/attractions/:id', adminController.saveAttraction)
router.delete('/attractions/:id', adminController.deleteAttraction)

// Hotels
router.get('/hotels', adminController.getHotels)
router.post('/hotels', adminController.saveHotel)
router.put('/hotels/:id', adminController.saveHotel)
router.delete('/hotels/:id', adminController.deleteHotel)

// Restaurants
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', adminController.saveRestaurant)
router.put('/restaurants/:id', adminController.saveRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

// Cuisines & Dishes
router.get('/cuisines', adminController.getCuisines)
router.post('/cuisines', adminController.saveCuisine)
router.get('/dishes', adminController.getDishes)
router.post('/dishes', adminController.saveDish)

// Experiences & Media
router.get('/experiences', adminController.getExperiences)
router.post('/experiences', adminController.saveExperience)
router.get('/media', adminController.getMedia)
router.post('/media', adminController.saveMedia)

// Audit Logs & Analytics
router.get('/audit-logs', adminController.getAuditLogs)
router.get('/analytics/overview', adminController.getAnalyticsOverview)

export default router
