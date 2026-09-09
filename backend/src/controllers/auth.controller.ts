import type { Request, Response } from 'express'
import { AuthService } from '../services/auth.service.js'

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' })
      }

      const result = await AuthService.login(email, password)
      res.json({
        success: true,
        message: 'Authentication successful',
        token: result.token,
        user: result.user,
      })
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message || 'Login failed' })
    }
  },

  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields (name, email, password) are required' })
      }

      const result = await AuthService.signup(name, email, password)
      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token: result.token,
        user: result.user,
      })
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message || 'Signup failed' })
    }
  },

  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
      }
      const user = await AuthService.getMe(req.user.id)
      res.json({ success: true, user })
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message || 'Unauthorized' })
    }
  },

  async logout(_req: Request, res: Response) {
    res.json({ success: true, message: 'Logged out successfully' })
  },
}
