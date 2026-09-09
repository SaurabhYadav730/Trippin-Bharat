import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/environment.js'
import { User } from '../models/User.js'
import { isDbConnected } from '../config/database.js'

export interface AuthenticatedUser {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    let token: string | undefined

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required',
      })
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string; role: string }

    if (isDbConnected()) {
      const user = await User.findById(decoded.id)
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account not found or deactivated',
        })
      }
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    } else {
      // Memory / Fallback Mode
      req.user = {
        id: decoded.id,
        name: decoded.email.split('@')[0],
        email: decoded.email,
        role: decoded.role || 'admin',
      }
    }

    next()
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    })
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    let token: string | undefined

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    }

    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string; role: string }
      req.user = {
        id: decoded.id,
        name: decoded.email.split('@')[0],
        email: decoded.email,
        role: decoded.role || 'user',
      }
    }
  } catch {
    // Ignore invalid token on optional routes
  }
  next()
}
