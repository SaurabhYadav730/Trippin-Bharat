import React, { useState, useEffect } from 'react'
import {
  Search,
  MapPin,
  Landmark,
  Hotel,
  Utensils,
  Compass,
  FileText,
  Sliders,
  ShieldCheck,
  BarChart3,
  X,
  ArrowRight,
} from 'lucide-react'
import { adminStorage } from '../../services/adminStorage'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string, filter?: string) => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('')
  const db = adminStorage.getDb()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as any)?.tagName)) {
        e.preventDefault()
        setQuery('')
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.toLowerCase().trim()

  // Dynamic search across entities
  const matchingDestinations = db.destinations.filter(
    (d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
  )
  const matchingAttractions = db.attractions.filter(
    (a) => a.name.toLowerCase().includes(q) || a.destinationName.toLowerCase().includes(q)
  )
  const matchingHotels = db.hotels.filter(
    (h) => h.name.toLowerCase().includes(q) || h.destinationName.toLowerCase().includes(q)
  )
  const matchingRestaurants = db.restaurants.filter(
    (r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
  )

  const quickActions = [
    { label: 'Create New Destination', section: 'destinations', icon: MapPin },
    { label: 'Add Attraction / Monument', section: 'attractions', icon: Landmark },
    { label: 'Launch Trip Engine Lab', section: 'trip-lab', icon: Sliders },
    { label: 'Open Verification Queue', section: 'verification', icon: ShieldCheck },
    { label: 'Run Data Quality Scanner', section: 'data-quality', icon: FileText },
    { label: 'View Platform Analytics', section: 'analytics', icon: BarChart3 },
  ].filter((a) => a.label.toLowerCase().includes(q))

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
        {/* Search Input */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#C96F3B]" />
          <input
            type="text"
            autoFocus
            placeholder="Search attractions, hotels, destinations, or type a command... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-[#1F2937] placeholder-[#9CA3AF] text-sm focus:ring-0 outline-none p-0"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-gray-100 text-[#6B7280] hover:text-[#1F2937]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1">
                Commands & Workflows
              </div>
              <div className="space-y-1 mt-1">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        onNavigate(action.section)
                        onClose()
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-[#1F2937] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#C96F3B]" />
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Attractions */}
          {matchingAttractions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1">
                Attractions & Monuments ({matchingAttractions.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingAttractions.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onNavigate('attractions', a.id)
                      onClose()
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-[#1F2937]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Landmark className="w-4 h-4 text-[#C96F3B]" />
                      <span className="font-semibold text-[#1F2937]">{a.name}</span>
                      <span className="text-[#6B7280]">&bull; {a.destinationName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold uppercase">
                      {a.verificationStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destinations */}
          {matchingDestinations.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1">
                Destinations ({matchingDestinations.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingDestinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onNavigate('destinations', d.id)
                      onClose()
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-[#1F2937]"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-[#1F2937]">{d.name}</span>
                      <span className="text-[#6B7280]">&bull; {d.state}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7280]">
                      Readiness: {d.tripEngineReadiness}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {matchingHotels.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1">
                Hotels & Stays ({matchingHotels.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingHotels.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      onNavigate('hotels', h.id)
                      onClose()
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-[#1F2937]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Hotel className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-[#1F2937]">{h.name}</span>
                      <span className="text-[#6B7280]">&bull; {h.destinationName}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7280]">
                      ₹{h.baseEstimatedPrice}/night
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Restaurants */}
          {matchingRestaurants.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1">
                Restaurants & Cuisine ({matchingRestaurants.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingRestaurants.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onNavigate('restaurants', r.id)
                      onClose()
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-[#1F2937]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Utensils className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-[#1F2937]">{r.name}</span>
                      <span className="text-[#6B7280]">&bull; {r.cuisine}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7280]">
                      ₹{r.priceForTwo} for 2
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 border-t border-[#E5E7EB] bg-gray-50 flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>Navigate with mouse or keyboard &bull; Esc to dismiss</span>
          <span className="font-mono">Global Spotlight: ⌘K or /</span>
        </div>
      </div>
    </div>
  )
}
