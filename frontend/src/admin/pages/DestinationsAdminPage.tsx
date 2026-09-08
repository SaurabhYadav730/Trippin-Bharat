import React, { useState } from 'react'
import {
  MapPin,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders,
  Edit3,
  Trash2,
  X,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import type { AdminDestination } from '../types/admin'

export const DestinationsAdminPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDest, setSelectedDest] = useState<AdminDestination | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<AdminDestination>>({})
  const [refresh, setRefresh] = useState(0)

  const destinations = adminService.getDestinations(search, statusFilter)
  const db = adminStorage.getDb()

  const handleOpenEdit = (dest: AdminDestination) => {
    setSelectedDest(dest)
    setFormData(dest)
    setIsEditing(true)
  }

  const handleOpenCreate = () => {
    setSelectedDest(null)
    setFormData({
      id: `dest-${Date.now()}`,
      name: '',
      slug: '',
      state: 'Rajasthan',
      region: 'Northwest India',
      country: 'India',
      locality: '',
      tagline: '',
      description: '',
      heroImage: '/images/places/city-palace.jpg',
      gallery: ['/images/places/city-palace.jpg'],
      coordinates: { lat: 24.5854, lng: 73.7125 },
      bestSeason: 'October – March',
      bestDuration: '3–5 Days',
      approxBudgetPerDay: { budget: 1800, comfort: 4200, luxury: 12000 },
      tags: ['Heritage', 'Culture'],
      travelStyles: ['Heritage & Architecture'],
      featured: false,
      status: 'draft',
      verificationStatus: 'draft',
      tripEngineReadiness: 75,
      dataHealth: 85,
      lastVerified: new Date().toISOString(),
    })
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    adminService.saveDestination(formData as AdminDestination, 'Admin', 'Admin')
    setIsEditing(false)
    setRefresh((p) => p + 1)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete destination "${name}"?`)) {
      adminService.deleteDestination(id, 'Admin', 'Admin')
      setIsEditing(false)
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-5 text-xs animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1F2937]">Destinations & Hierarchy Studio</h2>
            <p className="text-[#6B7280] mt-0.5">
              Country &rarr; State &rarr; Region &rarr; City &rarr; Locality geographic taxonomy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-[#1F2937] outline-none w-52 focus:border-[#C96F3B]"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Destinations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((dest) => {
          const destAttractionsCount = db.attractions.filter(
            (a) => a.destinationId === dest.id || a.destinationName.toLowerCase() === dest.slug.toLowerCase()
          ).length
          const destHotelsCount = db.hotels.filter(
            (h) => h.destinationId === dest.id || h.destinationName.toLowerCase() === dest.slug.toLowerCase()
          ).length
          const destRestaurantsCount = db.restaurants.filter(
            (r) => r.destinationId === dest.id || r.destinationName.toLowerCase() === dest.slug.toLowerCase()
          ).length

          return (
            <div
              key={dest.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-gray-300 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              {/* Card Header & Media */}
              <div>
                <div className="relative h-36 bg-gray-100 overflow-hidden">
                  <img
                    src={dest.heroImage || '/images/places/city-palace.jpg'}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        dest.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-[#4B5563]'
                      }`}
                    >
                      {dest.status}
                    </span>
                    {dest.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[11px] text-amber-200 font-semibold">
                      {dest.state} &bull; {dest.region}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">{dest.name}</h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3">
                  <p className="text-[#6B7280] line-clamp-2 leading-relaxed">{dest.description}</p>

                  {/* Readiness & Quality Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#6B7280]">Trip Engine Readiness</span>
                      <span
                        className={`font-mono font-bold ${
                          dest.tripEngineReadiness >= 90 ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {dest.tripEngineReadiness}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          dest.tripEngineReadiness >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${dest.tripEngineReadiness}%` }}
                      />
                    </div>
                  </div>

                  {/* Entity Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-gray-50 rounded-xl border border-[#E5E7EB] text-center font-mono">
                    <div>
                      <div className="text-[10px] text-[#6B7280] font-sans">Attractions</div>
                      <div className="text-xs font-bold text-[#1F2937] mt-0.5">{destAttractionsCount}</div>
                    </div>
                    <div className="border-x border-[#E5E7EB]">
                      <div className="text-[10px] text-[#6B7280] font-sans">Hotels</div>
                      <div className="text-xs font-bold text-[#1F2937] mt-0.5">{destHotelsCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#6B7280] font-sans">Restaurants</div>
                      <div className="text-xs font-bold text-[#1F2937] mt-0.5">{destRestaurantsCount}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 border-t border-[#E5E7EB] mt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#9CA3AF] font-mono">
                  Best: {dest.bestSeason}
                </span>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleOpenEdit(dest)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C96F3B]" />
                    <span>Manage</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Destination Detail Drawer / Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C96F3B]" />
                <h3 className="font-bold text-[#1F2937]">
                  {formData.id && selectedDest ? `Edit Destination: ${selectedDest.name}` : 'New Destination'}
                </h3>
              </div>
              <button onClick={() => setIsEditing(false)} className="text-[#6B7280] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F7F8FA]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Slug URL Identifier</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              {/* Geographic Hierarchy (Country -> State -> Region -> Locality) */}
              <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="font-bold text-[#4B5563] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C96F3B]" />
                  <span>Geographic Hierarchy Taxonomy</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[#6B7280] text-[10px] mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country || 'India'}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2 py-1.5 text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B7280] text-[10px] mb-1">State / Province</label>
                    <input
                      type="text"
                      value={formData.state || ''}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2 py-1.5 text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B7280] text-[10px] mb-1">Region / Zone</label>
                    <input
                      type="text"
                      value={formData.region || ''}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2 py-1.5 text-[#1F2937]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B7280] text-[10px] mb-1">Locality</label>
                    <input
                      type="text"
                      value={formData.locality || ''}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2 py-1.5 text-[#1F2937]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Tagline & Summary</label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Best Season Window</label>
                  <input
                    type="text"
                    value={formData.bestSeason || ''}
                    onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Recommended Duration</label>
                  <input
                    type="text"
                    value={formData.bestDuration || ''}
                    onChange={(e) => setFormData({ ...formData, bestDuration: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Latitude (°N)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates?.lat || 24.5854}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          lat: parseFloat(e.target.value),
                          lng: formData.coordinates?.lng || 73.7125,
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
                    value={formData.coordinates?.lng || 73.7125}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: {
                          lat: formData.coordinates?.lat || 24.5854,
                          lng: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Publication Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                  />
                  <label htmlFor="feat" className="text-[#1F2937] font-medium">
                    Feature on Homepage Carousel
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                {selectedDest && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedDest.id, selectedDest.name)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Destination</span>
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm"
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
