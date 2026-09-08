import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Compass, Eye, EyeOff, Mail, Lock, User, ArrowRight,
  MapPin, Star, ChevronLeft, Check
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const SLIDES = [
  {
    img: '/images/places/pangong-tso.jpg',
    city: 'Pangong Tso, Ladakh',
    caption: 'The Sky-Blue High-Altitude Lake',
    tag: 'Himalayan Wonder',
  },
  {
    img: '/images/places/lotus-mahal.jpg',
    city: 'Hampi, Karnataka',
    caption: 'Ruins of the Vijayanagara Empire',
    tag: 'UNESCO World Heritage',
  },
  {
    img: '/images/places/living-root-bridge.jpg',
    city: 'Meghalaya, Northeast India',
    caption: 'Living Root Bridges of the Khasis',
    tag: 'Living Architecture',
  },
  {
    img: '/images/places/munnar-tea-hills.jpg',
    city: 'Munnar, Kerala',
    caption: 'The Green Highlands of India',
    tag: 'Nature Escape',
  },
]

function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 1) return { score, label: 'Weak', color: '#ef4444' }
  if (score <= 2) return { score, label: 'Fair', color: '#f59e0b' }
  if (score <= 3) return { score, label: 'Good', color: '#3b82f6' }
  return { score, label: 'Strong', color: '#10b981' }
}

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({})
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideVisible, setSlideVisible] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const [formShake, setFormShake] = useState(false)

  const strength = getPasswordStrength(password)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideVisible(false)
      setTimeout(() => {
        setSlideIndex(prev => (prev + 1) % SLIDES.length)
        setSlideVisible(true)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (error) {
      setFormShake(true)
      setTimeout(() => setFormShake(false), 600)
    }
  }, [error])

  const validate = () => {
    const errs: typeof fieldErrors = {}
    if (!name.trim()) errs.name = 'Your name is required.'
    else if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.'
    if (!confirm) errs.confirm = 'Please confirm your password.'
    else if (confirm !== password) errs.confirm = 'Passwords do not match.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return
    if (!agreed) {
      alert('Please agree to the Terms of Service to continue.')
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
    } catch {
      // handled in context
    }
  }

  const slide = SLIDES[slideIndex]

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>

      {/* ─── Left Panel ───────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[58%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${slide.img})`, opacity: slideVisible ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20" />

        <div className="relative z-10 flex flex-col justify-between h-full p-10 w-full">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Compass size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-2xl tracking-tight text-white leading-none">Yātra</div>
                <div className="text-[10px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">Discover India</div>
              </div>
            </a>
            <a href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors group">
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </a>
          </div>

          <div
            className="space-y-4 transition-all duration-700"
            style={{ opacity: slideVisible ? 1 : 0, transform: slideVisible ? 'translateY(0)' : 'translateY(8px)' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              {slide.tag}
            </div>
            <div>
              <h2 className="text-4xl font-black text-white leading-tight mb-1">{slide.caption}</h2>
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium mt-2">
                <MapPin size={13} className="text-rose-400" />
                {slide.city}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ─── Right Panel: Signup Form ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 bg-slate-50 overflow-y-auto">

        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white">
            <Compass size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-black text-xl text-slate-900">Yātra</div>
            <div className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Discover India</div>
          </div>
        </div>

        <div
          className="w-full max-w-md mx-auto"
          style={{ animation: formShake ? 'shake 0.5s ease' : 'none' }}
        >
          <div className="mb-7">

            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              Begin your journey<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #E5293E, #C0392B)' }}>
                across India
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Create your free Yātra account in seconds.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-[9px] font-black">!</span>
              </div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={e => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: undefined })) }}
                  placeholder="Aarav Sharma"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 ${
                    fieldErrors.name ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
              </div>
              {fieldErrors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: undefined })) }}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 ${
                    fieldErrors.email ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
              </div>
              {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: undefined })) }}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 ${
                    fieldErrors.password ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= Math.min(strength.score, 4) ? strength.color : '#E2E8F0' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: strength.color }}>
                    {strength.label} password
                  </p>
                </div>
              )}
              {fieldErrors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setFieldErrors(p => ({ ...p, confirm: undefined })) }}
                  placeholder="Re-enter password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 ${
                    fieldErrors.confirm ? 'border-red-400 bg-red-50/40' : confirm && confirm === password ? 'border-emerald-400' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {confirm && confirm === password && (
                  <Check size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-500" strokeWidth={3} />
                )}
              </div>
              {fieldErrors.confirm && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.confirm}</p>}
            </div>

            {/* ToS */}
            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setAgreed(p => !p)}
                className={`w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  agreed ? 'bg-red-600 border-red-600' : 'border-slate-300 bg-white hover:border-slate-400'
                }`}
              >
                {agreed && <Check size={9} className="text-white" strokeWidth={3.5} />}
              </button>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                I agree to Yātra's{' '}
                <a href="#" className="text-red-600 hover:underline font-bold">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-red-600 hover:underline font-bold">Privacy Policy</a>.
              </p>
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-black text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              style={{ background: 'linear-gradient(135deg, #E5293E, #C0392B)', boxShadow: '0 8px 20px -4px rgba(229,41,62,0.45)' }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account…
                </>
              ) : (
                <>
                  Create Free Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 px-3 text-xs text-slate-400 font-medium">OR SIGN UP WITH</span>
            </div>
          </div>

          <div>
            <button type="button" className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-700 text-sm font-bold hover:border-slate-300 hover:bg-slate-50 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-7 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-black transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
