import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.get('/me', requireAuth, authController.me)
router.post('/logout', authController.logout)

export default router
