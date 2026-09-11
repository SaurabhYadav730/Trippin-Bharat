import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import {
  Compass, Eye, EyeOff, Mail, Lock, ArrowRight,
  MapPin, Star, ChevronLeft
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Cinematic slide images — verified local assets
const SLIDES = [
  {
    img: '/images/places/taj-mahal.jpg',
    city: 'Agra, Uttar Pradesh',
    caption: 'Symbol of Eternal Love',
    tag: 'UNESCO World Heritage',
  },
  {
    img: '/images/places/hawa-mahal.jpg',
    city: 'Jaipur, Rajasthan',
    caption: 'Palace of the Winds',
    tag: '18th Century Architecture',
  },
  {
    img: '/images/places/dashashwamedh-ghat.jpg',
    city: 'Varanasi, Uttar Pradesh',
    caption: 'Oldest Living City on Earth',
    tag: '5,000+ Years of Heritage',
  },
  {
    img: '/images/places/amber-fort.jpg',
    city: 'Amber, Rajasthan',
    caption: 'Fort of Celestial Grandeur',
    tag: 'Rajput Military Architecture',
  },
  {
    img: '/images/places/munnar-tea-hills.jpg',
    city: 'Munnar, Kerala',
    caption: 'Scotland of the East',
    tag: 'High-Altitude Tea Gardens',
  },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideVisible, setSlideVisible] = useState(true)
  const [formShake, setFormShake] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const returnTo = new URLSearchParams(location.search).get('returnTo') ?? '/'

  // Auto-advance cinematic slides
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
    if (isAuthenticated) navigate(returnTo, { replace: true })
  }, [isAuthenticated, navigate, returnTo])

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  useEffect(() => {
    if (error) {
      setFormShake(true)
      setTimeout(() => setFormShake(false), 600)
    }
  }, [error])

  const validate = () => {
    const errs: typeof fieldErrors = {}
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return
    try {
      await login(email, password)
    } catch {
      // error handled in context
    }
  }

  const slide = SLIDES[slideIndex]

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>

      {/* ─── Left Panel: Cinematic Image ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
        {/* Background image with smooth crossfade */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${slide.img})`,
            opacity: slideVisible ? 1 : 0,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

        {/* Brand & back button */}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.jpg"
                alt="Trippin' Bharat"
                className="w-11 h-11 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-200 border-2 border-white/20"
              />
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-white leading-none">Trippin' Bharat</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">Discover India</span>
              </div>
            </a>

            {/* Back to home */}
            <a
              href="/"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </a>
          </div>

          {/* Slide info */}
          <div
            className="space-y-4 transition-all duration-700"
            style={{ opacity: slideVisible ? 1 : 0, transform: slideVisible ? 'translateY(0)' : 'translateY(8px)' }}
          >
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              {slide.tag}
            </div>

            <div>
              <h2 className="text-5xl font-black text-white leading-tight mb-1">{slide.caption}</h2>
              <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium mt-2">
                <MapPin size={13} className="text-rose-400" />
                {slide.city}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ─── Right Panel: Login Form ──────────────────────────────────────── */}
      <div className="flex-1 lg:w-[40%] flex flex-col justify-center px-6 py-10 sm:px-10 bg-slate-50 overflow-y-auto">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <img
            src="/logo.jpg"
            alt="Trippin' Bharat"
            className="w-10 h-10 rounded-full object-cover shadow-md border border-slate-200"
          />
          <div>
            <div className="font-black text-xl text-slate-900">Trippin' Bharat</div>
            <div className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Discover India</div>
          </div>
        </div>

        <div
          className="w-full max-w-md mx-auto"
          style={{ animation: formShake ? 'shake 0.5s ease' : 'none' }}
        >
          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              Welcome back to<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #E5293E, #C0392B)' }}>
                Trippin' Bharat
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Sign in to continue your journey across India.
            </p>
          </div>

          {/* Auth error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-[9px] font-black">!</span>
              </div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-email"
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors(p => ({ ...p, email: undefined })) }}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 focus:shadow-sm ${
                    fieldErrors.email ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-red-600 hover:text-red-700 font-semibold transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors(p => ({ ...p, password: undefined })) }}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm font-medium bg-white border-2 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-slate-800 focus:shadow-sm ${
                    fieldErrors.password ? 'border-red-400 bg-red-50/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-black text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style={{ background: 'linear-gradient(135deg, #E5293E, #C0392B)', boxShadow: '0 8px 20px -4px rgba(229,41,62,0.45)' }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 px-3 text-xs text-slate-400 font-medium">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Social Auth — Google only */}
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-700 text-sm font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            New to Trippin' Bharat?{' '}
            <Link to="/signup" className="text-red-600 hover:text-red-700 font-black transition-colors">
              Create an account
            </Link>
          </p>


        </div>
      </div>

      {/* Shake keyframe */}
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
