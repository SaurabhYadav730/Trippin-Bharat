import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Check, MessageCircle, X } from 'lucide-react'
import type { PlannedTrip } from '../../services/planner/TripPlanningTypes'

interface TripShareModalProps {
  trip: PlannedTrip
  onClose: () => void
}

export default function TripShareModal({ trip, onClose }: TripShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `${window.location.origin}/build-trip?dest=${trip.destinationSlug}&tripId=${trip.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out my custom ${trip.daysCount}-day itinerary for ${trip.destinationName} on Trippin' Bharat: ${shareUrl}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 z-10 space-y-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Share Your Itinerary
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {trip.tripTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Share Link Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-500">
            Direct Shareable Link
          </label>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-xs text-slate-700 font-mono focus:outline-none px-2 select-all"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp & Social Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageCircle size={16} />
            <span>Share via WhatsApp</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center font-medium">
          Anyone with this link can view this curated itinerary and map trail.
        </p>
      </motion.div>
    </div>
  )
}
