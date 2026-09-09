import type { Request, Response, NextFunction } from 'express'

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required for this resource',
      })
    }

    const userRole = (req.user.role || '').toLowerCase()
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase())

    // Master 'admin' has super-privilege across all admin operations
    if (userRole === 'admin' || normalizedAllowed.includes(userRole)) {
      return next()
    }

    return res.status(403).json({
      success: false,
      message: `Access denied. Requires one of roles: [${allowedRoles.join(', ')}]`,
    })
  }
}
