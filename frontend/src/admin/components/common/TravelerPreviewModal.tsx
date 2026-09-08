import React, { useState } from 'react'
import { X, Smartphone, Monitor, ShieldCheck, Clock, Ticket, Sparkles, MapPin } from 'lucide-react'
import type { AdminAttraction } from '../../types/admin'

interface TravelerPreviewModalProps {
  attraction: AdminAttraction | null
  isOpen: boolean
  onClose: () => void
  onPublish?: (attraction: AdminAttraction) => void
}

export const TravelerPreviewModal: React.FC<TravelerPreviewModalProps> = ({
  attraction,
  isOpen,
  onClose,
  onPublish,
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  if (!isOpen || !attraction) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C96F3B] font-bold px-2 py-0.5 rounded bg-[#FDF6F0] border border-[#F3DFD1]">
              Traveler Simulation Preview
            </span>
            <h3 className="text-sm font-semibold text-[#1F2937]">
              {attraction.name} &bull; {attraction.destinationName}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport switchers */}
            <div className="flex items-center bg-gray-100 border border-[#E5E7EB] rounded-lg p-0.5">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  device === 'desktop' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  device === 'mobile' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {onPublish && attraction.status !== 'published' && (
              <button
                onClick={() => {
                  onPublish(attraction)
                  onClose()
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Approve & Publish Live
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Render Frame */}
        <div className="flex-1 bg-[#F7F8FA] overflow-y-auto flex items-center justify-center p-6">
          <div
            className={`transition-all duration-300 bg-[#F7F8FA] text-[#1F2937] rounded-2xl shadow-2xl overflow-hidden border border-[#E5E7EB] ${
              device === 'mobile' ? 'w-[375px] min-h-[640px]' : 'w-full max-w-3xl min-h-[580px]'
            }`}
          >
            {/* Hero Image */}
            <div className="relative h-56 bg-gray-100 overflow-hidden">
              <img
                src={attraction.heroImage || '/images/places/city-palace.jpg'}
                alt={attraction.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C96F3B] text-white">
                  {attraction.categoryLabel || attraction.category}
                </span>
                {attraction.verificationStatus === 'verified' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>ASI Verified</span>
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-xs text-amber-200 font-medium">
                  {attraction.destinationName} &bull; Mewar Heritage
                </div>
                <h1 className="text-xl font-extrabold tracking-tight drop-shadow-sm">
                  {attraction.name}
                </h1>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4">
              {/* Quick Info Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-xl border border-[#E5E7EB] shadow-sm text-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#6B7280] flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-[#C96F3B]" />
                    <span>Duration</span>
                  </div>
                  <div className="text-xs font-bold text-[#1F2937] mt-0.5">
                    {Math.round(attraction.recommendedVisitDurationMin / 60)} Hours
                  </div>
                </div>
                <div className="border-x border-[#E5E7EB]">
                  <div className="text-[10px] uppercase font-bold text-[#6B7280] flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Best Time</span>
                  </div>
                  <div className="text-xs font-bold text-[#1F2937] mt-0.5">
                    {attraction.bestTime?.bestTimeOfDay || 'Morning'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#6B7280] flex items-center justify-center gap-1">
                    <Ticket className="w-3 h-3 text-emerald-600" />
                    <span>Entry Fee</span>
                  </div>
                  <div className="text-xs font-bold text-[#1F2937] mt-0.5">
                    {attraction.entryFee?.indian === 0 ? 'Free Entry' : `₹${attraction.entryFee?.indian || 0}`}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Heritage Story & Context
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {attraction.description}
                </p>
              </div>

              {/* Best Time Rationale */}
              {attraction.bestTime?.bestTimeDescription && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Traveler Insight: </span>
                    {attraction.bestTime.bestTimeDescription}
                  </div>
                </div>
              )}

              {/* Address / Location */}
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <MapPin className="w-4 h-4 text-[#E5293E] shrink-0" />
                <span className="truncate">{attraction.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
