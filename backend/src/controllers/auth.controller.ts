import type { Request, Response } from 'express'

export const authController = {
  login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    res.json({
      success: true,
      message: 'Authentication successful',
      token: 'jwt_mock_token_sih2026_operator',
      user: {
        id: 'usr-admin-01',
        name: email.split('@')[0] || 'Operations Admin',
        email,
        role: 'Admin',
      }
    })
  },

  signup(req: Request, res: Response) {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' })
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: 'jwt_mock_token_sih2026_user',
      user: {
        id: `usr-${Date.now()}`,
        name,
        email,
        role: 'Traveler',
      }
    })
  }
}
