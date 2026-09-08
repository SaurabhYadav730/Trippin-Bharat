import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Calendar,
  CloudSun,
  ShieldCheck,
  Compass,
  Wallet,
  MapPin,
  Landmark,
  Waves,
  Palette,
  UtensilsCrossed,
  ArrowRight,
  Share2,
  Heart
} from 'lucide-react'
import type { DestinationData } from '../../types/destination'

interface DestinationHeroProps {
  data: DestinationData
  onExploreClick: () => void
  onBuildTripClick: () => void
}

export default function DestinationHero({
  data,
  onExploreClick,
  onBuildTripClick,
}: DestinationHeroProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const quickThemes = [
    { label: 'Heritage', icon: Landmark, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Lakes', icon: Waves, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Living Art', icon: Palette, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'Mewari Food', icon: UtensilsCrossed, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  ]

  return (
    <section className="relative pt-24 pb-14 lg:pb-20 bg-slate-100 overflow-hidden">
      {/* Background Scenic Landscape with Soft Bright Light Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.heroBanner}
          alt={data.name}
          className="w-full h-full object-cover object-center scale-105 filter brightness-95"
        />
        {/* Soft elegant warm gradient overlay for clean contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-100" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb & Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">
            <span className="text-amber-200">India</span>
            <span>/</span>
            <span>{data.state}</span>
            <span>/</span>
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white">{data.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
                isFavorite
                  ? 'bg-rose-500 border-rose-400 text-white shadow-sm'
                  : 'bg-white/80 border-white/90 text-slate-800 hover:bg-white shadow-sm'
              }`}
            >
              <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'text-white' : 'text-rose-500'} />
              <span>{isFavorite ? 'Saved' : 'Save City'}</span>
            </button>
          </div>
        </div>

        {/* ── Main Destination Card: Clean, Light, Elegant Heritage Design ── */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Main Destination Title & Description */}
            <div className="lg:col-span-7 space-y-4">
              {/* Natural Heritage Tag (Removed AI buzzwords) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
                <Landmark size={13} className="text-amber-700" />
                <span>Verified Heritage Travel Guide</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
                  {data.name}
                </h1>
                <p className="text-lg sm:text-xl font-bold text-amber-700 mt-1">
                  {data.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {data.shortBio}
              </p>

              {/* Theme Pills in Warm Heritage Palette */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {data.curatedForStyles && data.curatedForStyles.length > 0 ? (
                  data.curatedForStyles.slice(0, 4).map((style, idx) => {
                    const icons = [Landmark, Waves, Palette, UtensilsCrossed, Sparkles]
                    const colorClasses = [
                      'bg-amber-50 border-amber-200 text-amber-900',
                      'bg-sky-50 border-sky-200 text-sky-900',
                      'bg-rose-50 border-rose-200 text-rose-900',
                      'bg-emerald-50 border-emerald-200 text-emerald-900',
                    ]
                    const IconComp = icons[idx % icons.length]
                    return (
                      <span
                        key={style.styleId}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border ${colorClasses[idx % colorClasses.length]}`}
                      >
                        <IconComp size={14} />
                        {style.styleTitle}
                      </span>
                    )
                  })
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border bg-amber-50 border-amber-200 text-amber-900">
                      <Landmark size={14} className="text-amber-700" />
                      Heritage & Forts
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border bg-emerald-50 border-emerald-200 text-emerald-900">
                      <UtensilsCrossed size={14} className="text-emerald-700" />
                      Authentic Local Culture
                    </span>
                  </>
                )}
              </div>

              {/* CTAs in Brand Red & Clean Slate (No harsh AI blue) */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onExploreClick}
                  className="px-7 py-3.5 rounded-2xl font-black text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 hover:scale-102 active:scale-98 transition-all shadow-xs cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                >
                  <Compass size={18} className="text-slate-700" />
                  <span>Explore {data.name}</span>
                </button>

                <button
                  onClick={onBuildTripClick}
                  className="px-7 py-3.5 rounded-2xl font-black text-sm text-white bg-[#E5293E] hover:bg-[#D01D32] hover:scale-102 active:scale-98 transition-all shadow-[0_8px_20px_rgba(229,41,62,0.3)] cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                >
                  <Sparkles size={18} />
                  <span>Build My Trip</span>
                </button>
              </div>
            </div>

            {/* Right Col: 4-Cell Intelligence Matrix Widget (Light, Clean, High Readability) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
              {/* Box 1: Best Season */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Calendar size={14} className="text-amber-600" />
                  <span>Best Time</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1.5">
                  {data.bestSeason}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Optimal travel window</div>
              </div>

              {/* Box 2: Duration */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Compass size={14} className="text-rose-600" />
                  <span>Duration</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1.5">
                  {data.recommendedDays}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Optimal pace for heritage</div>
              </div>

              {/* Box 3: Approx Budget */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Wallet size={14} className="text-emerald-600" />
                  <span>Avg Budget</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1.5">
                  ₹{data.approxBudgetPerDay.comfort.toLocaleString()}
                  <span className="text-xs text-slate-500 font-normal"> / day</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Comfort tier (stay + food)</div>
              </div>

              {/* Box 4: Current Weather */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <CloudSun size={14} className="text-sky-600" />
                  <span>Weather Today</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 mt-1.5">
                  {data.weather.tempC}°C · {data.weather.condition}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Humidity: {data.weather.humidity}</div>
              </div>

              {/* Bottom full-width strip: Tourist Safety Status */}
              <div className="col-span-2 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <ShieldCheck size={16} className="text-emerald-700" />
                  <span>{data.tourismStatus.safetyScore}</span>
                </div>
                <span className="text-emerald-800 font-medium hidden sm:inline">
                  Peak: {data.tourismStatus.peakHours}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
