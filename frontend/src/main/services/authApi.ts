import type { AuthUser } from '../context/AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const MOCK_USERS: Array<AuthUser & { password: string }> = []

export async function login(email: string, password: string): Promise<AuthUser> {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message ?? 'Invalid credentials.')
    }
    return (await res.json()).user
  }
  await delay(800)
  const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!found) throw new Error('Invalid email or password.')
  const { password: _p, ...user } = found
  return user
}

export async function signup(name: string, email: string, password: string): Promise<AuthUser> {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message ?? 'Could not create account.')
    }
    return (await res.json()).user
  }
  await delay(900)
  const exists = MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) throw new Error('An account with this email already exists.')
  const newUser: AuthUser & { password: string } = {
    id: crypto.randomUUID(),
    name,
    email,
    role: 'user',
    password,
  }
  MOCK_USERS.push(newUser)
  const { password: _p, ...user } = newUser
  return user
}

export async function logout(): Promise<void> {
  if (BASE_URL) {
    await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {})
  }
  await delay(200)
}