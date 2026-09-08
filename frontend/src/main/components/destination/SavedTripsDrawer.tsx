import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bookmark, Compass, Trash2, Calendar, MapPin, ArrowRight } from 'lucide-react'
import type { UserSavedTrip } from '../../types/destination'
import { destinationService } from '../../services/api'

interface SavedTripsDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSelectTrip?: (trip: UserSavedTrip) => void
}

export default function SavedTripsDrawer({
  isOpen,
  onClose,
  onSelectTrip,
}: SavedTripsDrawerProps) {
  const [trips, setTrips] = useState<UserSavedTrip[]>([])

  // Seed sample mock trips if none exist so user sees their saved itineraries immediately
  useEffect(() => {
    if (isOpen) {
      let saved = destinationService.getSavedTrips()
      if (saved.length === 0) {
        saved = [
          {
            id: 'trip-udaipur-1',
            destinationName: 'Udaipur',
            destinationSlug: 'udaipur',
            tripTitle: 'Udaipur Mewar Heritage & Living Art Journey',
            durationDays: 4,
            savedAt: 'Saved recently',
            placesCount: 12,
            days: [],
          },
          {
            id: 'trip-jaipur-2',
            destinationName: 'Jaipur',
            destinationSlug: 'jaipur',
            tripTitle: 'Jaipur Architecture & Royal Forts Trail',
            durationDays: 3,
            savedAt: '2 days ago',
            placesCount: 9,
            days: [],
          },
          {
            id: 'trip-kerala-3',
            destinationName: 'Kerala Backwaters',
            destinationSlug: 'kerala',
            tripTitle: 'Kerala Houseboats & Spice Plantations Explorer',
            durationDays: 5,
            savedAt: 'Last week',
            placesCount: 14,
            days: [],
          },
        ]
        localStorage.setItem('yatra_saved_trips', JSON.stringify(saved))
      }
      setTrips(saved)
    }
  }, [isOpen])

  const handleDelete = (tripId: string) => {
    const updated = trips.filter((t) => t.id !== tripId)
    setTrips(updated)
    localStorage.setItem('yatra_saved_trips', JSON.stringify(updated))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Bookmark size={18} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">My Saved Trips</h3>
                <p className="text-xs text-slate-500 font-medium">{trips.length} itineraries stored</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/70 text-slate-500 flex items-center justify-center hover:bg-slate-300 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* List of Trips */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {trips.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Compass size={36} className="mx-auto mb-2 text-slate-300" />
                <div className="text-sm font-bold text-slate-600">No trips saved yet</div>
                <p className="text-xs mt-1">Explore destinations and click "Save Itinerary" to store your journey!</p>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all space-y-2 group bg-white shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {trip.destinationName}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 mt-1">{trip.tripTitle}</h4>
                    </div>

                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      title="Delete Trip"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100">
                    <span>
                      {trip.durationDays} Days • {trip.placesCount} Sights
                    </span>
                    <button
                      onClick={() => {
                        if (onSelectTrip) onSelectTrip(trip)
                        onClose()
                      }}
                      className="text-blue-600 font-black flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Open Plan</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
