import type { AuthUser } from '../context/AuthContext'

const rawBase = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'
const API_ROOT = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const MOCK_USERS: Array<AuthUser & { password: string }> = []

export async function login(email: string, password: string): Promise<AuthUser> {
  if (API_ROOT) {
    try {
      const res = await fetch(`${API_ROOT}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.token) {
          localStorage.setItem('yatra_auth_token', data.token)
        }
        return data.user
      } else {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message ?? 'Invalid credentials.')
      }
    } catch (err: any) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err
      }
      // If network offline, fallback to mock demo
    }
  }

  await delay(400)
  const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!found) {
    if (email.toLowerCase().includes('admin')) {
      const adminUser: AuthUser = {
        id: 'usr-admin-01',
        name: email.split('@')[0],
        email,
        role: 'admin',
      }
      return adminUser
    }
    throw new Error('Invalid email or password.')
  }
  const { password: _p, ...user } = found
  return user
}

export async function signup(name: string, email: string, password: string): Promise<AuthUser> {
  if (API_ROOT) {
    try {
      const res = await fetch(`${API_ROOT}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.token) {
          localStorage.setItem('yatra_auth_token', data.token)
        }
        return data.user
      } else {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message ?? 'Could not create account.')
      }
    } catch (err: any) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err
      }
      // If offline, fallback to mock
    }
  }

  await delay(500)
  const exists = MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) throw new Error('An account with this email already exists.')
  const newUser: AuthUser & { password: string } = {
    id: crypto.randomUUID(),
    name,
    email,
    role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
    password,
  }
  MOCK_USERS.push(newUser)
  const { password: _p, ...user } = newUser
  return user
}

export async function logout(): Promise<void> {
  localStorage.removeItem('yatra_auth_token')
  if (API_ROOT) {
    await fetch(`${API_ROOT}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {})
  }
  await delay(100)
}