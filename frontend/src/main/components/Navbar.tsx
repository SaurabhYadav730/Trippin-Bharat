import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Compass,
  Menu,
  X,
  User,
  BookmarkCheck,
  Heart,
  ShieldCheck,
  Globe2,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onOpenSavedTrips?: () => void
}

export default function Navbar({ onOpenSavedTrips }: NavbarProps = {}) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-200 ${scrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800 py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.jpg"
              alt="Trippin' Bharat Logo"
              className="w-10 h-10 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-200 border-2 border-white/20"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display text-2xl font-black tracking-tight text-white leading-none">
                  Trippin' Bharat
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-red"></span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase mt-0.5">
                Discover India
              </span>
            </div>
          </a>

          {/* Tourism Discovery Action Area */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Trippin' Bharat Admin Operations OS Link */}
            <a href="/admin" className="flex items-center gap-2 text-left cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-white/20 transition-colors">
                <ShieldCheck size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Trippin' Bharat Admin
                </span>
                <span className="text-[10px] text-slate-400">
                  Operations OS
                </span>
              </div>
            </a>

            {/* My Trips */}
            <button
              onClick={() => onOpenSavedTrips && onOpenSavedTrips()}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 group-hover:bg-white/20 transition-colors">
                <BookmarkCheck size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  My Trips
                </span>
                <span className="text-[10px] text-slate-400">
                  Manage Itineraries
                </span>
              </div>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onOpenSavedTrips && onOpenSavedTrips()}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-rose-400 group-hover:bg-white/20 transition-colors">
                <Heart size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                  Saved Places
                </span>
                <span className="text-[10px] text-slate-400">
                  Your Favorites
                </span>
              </div>
            </button>

            {/* Language & Currency */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/15 cursor-pointer transition-colors">
              <Globe2 size={14} className="text-amber-400" />
              <span>INR (₹) · EN</span>
              <ChevronDown size={12} className="text-slate-400" />
            </div>

            {/* Auth Area */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/25 text-white transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-red-500 to-rose-400 flex items-center justify-center text-white text-xs font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-white text-sm font-bold truncate">{user.name}</p>
                      <p className="text-slate-400 text-xs truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); onOpenSavedTrips && onOpenSavedTrips() }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <BookmarkCheck size={14} className="text-blue-400" />
                        My Trips
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Settings size={14} className="text-slate-400" />
                        Account Settings
                      </button>
                    </div>
                    <div className="py-1 border-t border-slate-800">
                      <button
                        onClick={() => { setUserMenuOpen(false); logout() }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-white/5 transition-colors"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <User size={15} />
                <span>Login / Register</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#planner"
              className="btn-primary py-2 px-3.5 text-xs rounded-lg whitespace-nowrap"
            >
              Plan Trip
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 shadow-2xl p-4 space-y-3 text-white">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/10 text-xs font-bold text-white flex items-center gap-2"
            >
              <Compass size={16} className="text-brand-red" />
              Explore India
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/10 text-xs font-bold text-white flex items-center gap-2"
            >
              <ShieldCheck size={16} className="text-emerald-400" />
              Heritage Sites
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="p-3 rounded-xl bg-white/10 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-rose-400 flex items-center justify-center text-white text-xs font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => logout()} className="text-xs text-rose-400 font-bold">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/login') }}
                className="btn-primary w-full justify-center py-2.5 text-xs"
              >
                Login / Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
