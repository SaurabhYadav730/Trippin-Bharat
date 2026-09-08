import React, { useState } from 'react'
import {
  Hotel,
  Plus,
  Search,
  Star,
  DollarSign,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  ExternalLink,
  Edit3,
  Trash2,
  X,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import type { AdminHotel } from '../types/admin'

export const HotelsAdminPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedDestId, setSelectedDestId] = useState('all')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<AdminHotel>>({})
  const [refresh, setRefresh] = useState(0)

  const db = adminStorage.getDb()
  const hotels = adminService.getHotels(selectedDestId, search)

  const handleOpenEdit = (h: AdminHotel) => {
    setFormData(JSON.parse(JSON.stringify(h)))
    setIsEditing(true)
  }

  const handleOpenCreate = () => {
    const dest = db.destinations[0]
    setFormData({
      id: `hotel-${Date.now()}`,
      name: '',
      destinationId: dest.id,
      destinationName: dest.name,
      coordinates: { lat: 24.5854, lng: 73.68 },
      address: `${dest.name}, Rajasthan`,
      description: '',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
      baseEstimatedPrice: 3500,
      isLivePricing: false,
      rating: 4.5,
      reviewsCount: 80,
      tier: 'comfort',
      type: 'Heritage Haveli',
      amenities: ['Free Wi-Fi', 'Rooftop Restaurant', 'Air Conditioning'],
      roomTypes: ['Standard Heritage', 'Deluxe Mewari Room'],
      featured: false,
      status: 'draft',
      verificationStatus: 'draft',
      lastVerified: new Date().toISOString(),
    })
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    adminService.saveHotel(formData as AdminHotel, 'Admin', 'Admin')
    setIsEditing(false)
    setRefresh((p) => p + 1)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Confirm deletion of hotel "${name}"?`)) {
      adminService.deleteHotel(id, 'Admin', 'Admin')
      setIsEditing(false)
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
            <Hotel className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Hotels & Stays Operations Studio</h2>
            <p className="text-[#6B7280] mt-0.5">
              Strict separation between base/estimated tariff and verified live pricing feeds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl px-3 py-1.5 focus:border-[#C96F3B] focus:outline-none"
          >
            <option value="all">All Destinations</option>
            {db.destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C96F3B] outline-none w-48"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Hotel</span>
          </button>
        </div>
      </div>

      {/* Grid of Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((h) => (
          <div
            key={h.id}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-gray-300 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 bg-gray-100">
                <img
                  src={h.heroImage}
                  alt={h.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/95 text-[#1F2937] border border-gray-200 shadow-sm backdrop-blur">
                    {h.tier}
                  </span>
                  {h.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3">
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-gray-200 text-right shadow-sm backdrop-blur">
                    <div className="text-[10px] text-[#6B7280]">
                      {h.isLivePricing ? 'Live API Tariff' : 'Base Est. Tariff'}
                    </div>
                    <div className="text-xs font-bold font-mono text-emerald-700">
                      ₹{h.isLivePricing ? h.livePrice?.toLocaleString() : h.baseEstimatedPrice.toLocaleString()}
                      <span className="text-[10px] text-[#9CA3AF] font-sans">/night</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#C96F3B] font-semibold text-[11px]">{h.destinationName}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{h.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-[#1F2937] text-sm">{h.name}</h3>
                <p className="text-[#6B7280] line-clamp-2 leading-relaxed">{h.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {h.amenities.slice(0, 3).map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-gray-50 border border-[#E5E7EB] text-[10px] text-[#4B5563]"
                    >
                      {a}
                    </span>
                  ))}
                  {h.amenities.length > 3 && (
                    <span className="text-[10px] text-[#9CA3AF] self-center">
                      +{h.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">
                {h.verificationStatus}
              </span>
              <button
                onClick={() => handleOpenEdit(h)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#374151] border border-[#E5E7EB] font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C96F3B]" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Editor Drawer / Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
              <h3 className="font-bold text-[#1F2937] text-sm">
                {formData.id ? `Edit Hotel: ${formData.name}` : 'Register New Stay'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Hotel Property Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Tier Category</label>
                  <select
                    value={formData.tier || 'comfort'}
                    onChange={(e: any) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="budget">Budget / Homestay</option>
                    <option value="comfort">Comfort / Heritage Haveli</option>
                    <option value="luxury">Luxury Palace Resort</option>
                  </select>
                </div>
              </div>

              {/* Price Separation: Base vs Live */}
              <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="font-bold text-[#1F2937] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tariff Architecture (Rule: Decouple Base from Live Pricing)</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6B7280] text-[11px] mb-1">
                      Base / Estimated Price (₹/Night) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.baseEstimatedPrice || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, baseEstimatedPrice: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B7280] text-[11px] mb-1">
                      Verified Live Price Feed (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.livePrice || ''}
                      placeholder="Only if live API provider active"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          livePrice: e.target.value ? parseFloat(e.target.value) : undefined,
                          isLivePricing: !!e.target.value,
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Property Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Latitude (°N)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates?.lat || 24.58}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          lat: parseFloat(e.target.value),
                          lng: formData.coordinates?.lng || 73.68,
                        },
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Longitude (°E)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates?.lng || 73.68}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          lat: formData.coordinates?.lat || 24.58,
                          lng: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                {formData.id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(formData.id!, formData.name || '')}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Stay</span>
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937] border border-transparent hover:border-[#E5E7EB] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
