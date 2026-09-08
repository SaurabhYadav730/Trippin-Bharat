import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  X,
  User,
  Users,
  Heart,
  Wallet,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react'

interface SmartTripBuilderModalProps {
  destinationName: string
  defaultDuration: string
  defaultInterest: string
  onClose: () => void
  onGenerate: (params: {
    companion: string
    budget: string
    preferences: string[]
    durationDays: number
  }) => void
}

export default function SmartTripBuilderModal({
  destinationName,
  defaultDuration,
  defaultInterest,
  onClose,
  onGenerate,
}: SmartTripBuilderModalProps) {
  const [companion, setCompanion] = useState('Couple')
  const [budget, setBudget] = useState('Comfortable')
  const [preferences, setPreferences] = useState<string[]>([
    'Heritage & Forts',
    'Local Food',
    'Photography',
  ])
  const [isGenerating, setIsGenerating] = useState(false)

  const companionOptions = [
    { id: 'Solo', label: 'Solo Traveler', icon: User },
    { id: 'Couple', label: 'Couple / Romantic', icon: Heart },
    { id: 'Family', label: 'Family with Kids', icon: Users },
    { id: 'Friends', label: 'Friends Group', icon: Compass },
  ]

  const budgetOptions = [
    { id: 'Budget', label: 'Budget / Backpacker', desc: '₹1,500 – ₹2,500 / day', tag: 'Savvy' },
    { id: 'Comfortable', label: 'Comfortable & Balanced', desc: '₹3,500 – ₹6,000 / day', tag: 'Popular' },
    { id: 'Premium', label: 'Palatial Luxury', desc: '₹12,000+ / day', tag: 'Exclusive' },
  ]

  const preferenceOptions = [
    'Heritage & Forts',
    'Local Food',
    'Photography',
    'Lakes & Nature',
    'Artisans & Shopping',
    'Spiritual Ghats',
    'Sunset Viewpoints',
  ]

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter((p) => p !== pref))
    } else {
      setPreferences([...preferences, pref])
    }
  }

  const handleGenerateClick = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      onGenerate({
        companion,
        budget,
        preferences,
        durationDays: 4,
      })
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden z-10 space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-blue-600" />
              <span>Smart Itinerary Generator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Build Your {destinationName} Journey
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Customized based on your initial search: <span className="font-bold text-slate-800">{defaultDuration}</span> · <span className="font-bold text-slate-800">{defaultInterest}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. Who are you travelling with? */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500">
            1. Who are you travelling with?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {companionOptions.map((opt) => {
              const Icon = opt.icon
              const isSel = companion === opt.id
              return (
                <div
                  key={opt.id}
                  onClick={() => setCompanion(opt.id)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center gap-1.5 ${
                    isSel
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon size={18} className={isSel ? 'text-blue-600' : 'text-slate-400'} />
                  <span className="text-xs font-bold">{opt.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 2. Budget Tier */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500">
            2. Preferred Budget Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {budgetOptions.map((opt) => {
              const isSel = budget === opt.id
              return (
                <div
                  key={opt.id}
                  onClick={() => setBudget(opt.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSel
                      ? 'bg-blue-50 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">{opt.label}</span>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {opt.tag}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">{opt.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. Preferences Checkbox Grid */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500">
            3. What do you prefer most? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((pref) => {
              const isSel = preferences.includes(pref)
              return (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isSel && <Check size={13} strokeWidth={3} />}
                  <span>{pref}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Generate CTA */}
        <div className="pt-3">
          <button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Optimal 4-Day Route...</span>
              </div>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate My Journey</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
