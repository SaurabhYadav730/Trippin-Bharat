import jwt from 'jsonwebtoken'
import { config } from '../config/environment.js'
import { User, type IUser } from '../models/User.js'
import { isDbConnected } from '../config/database.js'

export class AuthService {
  static generateToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as any }
    )
  }

  static async login(email: string, password: string):Promise<{ user: any; token: string }> {
    const trimmedEmail = email.toLowerCase().trim()

    if (isDbConnected()) {
      const user = await User.findOne({ email: trimmedEmail }).select('+password')
      if (!user) {
        throw new Error('Invalid email or password')
      }

      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        throw new Error('Invalid email or password')
      }

      user.lastLogin = new Date()
      await user.save()

      const userJson = user.toJSON() as any
      const token = this.generateToken({ id: user._id.toString(), email: user.email, role: user.role })
      return { user: userJson, token }
    }

    // Memory / Demo Mode Fallback
    const isAdmin = trimmedEmail.includes('admin')
    const fallbackUser = {
      id: isAdmin ? 'usr-admin-01' : 'usr-traveler-01',
      name: trimmedEmail.split('@')[0],
      email: trimmedEmail,
      role: isAdmin ? 'admin' : 'user',
      avatar: isAdmin
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    }
    const token = this.generateToken(fallbackUser)
    return { user: fallbackUser, token }
  }

  static async signup(name: string, email: string, password: string): Promise<{ user: any; token: string }> {
    const trimmedEmail = email.toLowerCase().trim()

    if (isDbConnected()) {
      const existing = await User.findOne({ email: trimmedEmail })
      if (existing) {
        throw new Error('An account with this email address already exists')
      }

      const user = await User.create({
        name: name.trim(),
        email: trimmedEmail,
        password,
        role: trimmedEmail.includes('admin') ? 'admin' : 'user',
      })

      const userJson = user.toJSON() as any
      const token = this.generateToken({ id: user._id.toString(), email: user.email, role: user.role })
      return { user: userJson, token }
    }

    // Fallback mode
    const fallbackUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role: trimmedEmail.includes('admin') ? 'admin' : 'user',
    }
    const token = this.generateToken(fallbackUser)
    return { user: fallbackUser, token }
  }

  static async getMe(userId: string): Promise<any> {
    if (isDbConnected()) {
      const user = await User.findById(userId)
      if (!user) throw new Error('User not found')
      return user.toJSON()
    }
    return {
      id: userId,
      name: 'Operations Admin',
      email: 'admin@yatra.in',
      role: 'admin',
    }
  }
}
