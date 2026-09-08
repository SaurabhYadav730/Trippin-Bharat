import React, { useState } from 'react'
import {
  Landmark,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Ticket,
  ShieldCheck,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import { ScheduleEditor } from '../components/common/ScheduleEditor'
import { BestTimeEditor } from '../components/common/BestTimeEditor'
import { TravelerPreviewModal } from '../components/common/TravelerPreviewModal'
import type { AdminAttraction } from '../types/admin'

export const AttractionsAdminPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [destinationFilter, setDestinationFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [verificationFilter, setVerificationFilter] = useState('all')
  const [selectedAttraction, setSelectedAttraction] = useState<AdminAttraction | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewAttraction, setPreviewAttraction] = useState<AdminAttraction | null>(null)
  const [formData, setFormData] = useState<Partial<AdminAttraction>>({})
  const [refresh, setRefresh] = useState(0)

  const db = adminStorage.getDb()
  const { items: attractions } = adminService.getAttractions({
    search,
    destinationId: destinationFilter,
    category: categoryFilter,
    verificationStatus: verificationFilter,
    pageSize: 100,
  })

  const handleOpenEdit = (a: AdminAttraction) => {
    setSelectedAttraction(a)
    setFormData(JSON.parse(JSON.stringify(a)))
    setIsEditing(true)
  }

  const handleOpenCreate = () => {
    const dest = db.destinations[0]
    const newRecord: AdminAttraction = {
      id: `attr-${Date.now()}`,
      name: '',
      category: 'heritage',
      categoryLabel: 'Heritage Monument',
      destinationId: dest.id,
      destinationName: dest.name,
      description: '',
      shortDescription: '',
      coordinates: { lat: 24.5854, lng: 73.7125 },
      address: `${dest.name}, Rajasthan`,
      heroImage: '/images/places/city-palace.jpg',
      images: ['/images/places/city-palace.jpg'],
      entryFee: { indian: 100, foreign: 300, priceType: 'fixed' },
      openingHours: {
        monday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        tuesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        wednesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        thursday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        friday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        saturday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        sunday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
      },
      closedDays: [],
      bestTime: {
        bestTimeOfDay: 'Morning',
        bestTimeDescription: 'Best visited in morning hours.',
        bestSeason: 'October – March',
      },
      recommendedVisitDurationMin: 90,
      importanceScore: 8.5,
      culturalScore: 8.5,
      historicalScore: 8.5,
      popularityScore: 8.0,
      uniquenessScore: 8.0,
      priorityCategory: 'recommended',
      familyFriendly: true,
      accessibility: true,
      photography: true,
      tags: ['Heritage'],
      status: 'draft',
      verificationStatus: 'draft',
      source: 'Admin Direct Field Audit',
      lastVerified: new Date().toISOString(),
      usedInTripsCount: 0,
      usedInCollectionsCount: 0,
    }
    setSelectedAttraction(null)
    setFormData(newRecord)
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    adminService.saveAttraction(formData as AdminAttraction, 'Admin', 'Admin')
    setIsEditing(false)
    setRefresh((p) => p + 1)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Confirm deletion of "${name}"?`)) {
      adminService.deleteAttraction(id, 'Admin', 'Admin')
      setIsEditing(false)
      setRefresh((p) => p + 1)
    }
  }

  const handleVerify = (id: string) => {
    adminService.verifyAttraction(id, 'Admin', 'Admin')
    setRefresh((p) => p + 1)
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1F2937]">Attractions & Monuments Studio</h2>
            <p className="text-[#6B7280] mt-0.5">
              Weekly multi-window schedules, decoupled best-time signals, and priority weights.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Destination filter */}
          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl px-3 py-1.5 focus:border-[#C96F3B] outline-none"
          >
            <option value="all">All Destinations</option>
            {db.destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Verification filter */}
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl px-3 py-1.5 focus:border-[#C96F3B] outline-none"
          >
            <option value="all">All Verification</option>
            <option value="verified">Verified</option>
            <option value="pending_review">Pending Review</option>
            <option value="draft">Draft</option>
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search attractions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-[#1F2937] outline-none w-48 focus:border-[#C96F3B]"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Attraction</span>
          </button>
        </div>
      </div>

      {/* Attractions Data Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[#6B7280] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Attraction & Category</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Entry Fee</th>
              <th className="px-4 py-3">Best Time Signal</th>
              <th className="px-4 py-3">Verification</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {attractions.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={a.heroImage || '/images/places/city-palace.jpg'}
                      alt={a.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
                      }}
                    />
                    <div>
                      <div className="font-bold text-[#1F2937] flex items-center gap-1.5">
                        <span>{a.name}</span>
                        {a.hindiName && (
                          <span className="text-[10px] text-[#9CA3AF] font-normal">({a.hindiName})</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#6B7280] flex items-center gap-1.5 mt-0.5">
                        <span className="capitalize">{a.category}</span>
                        <span>&bull;</span>
                        <span>Score: {a.importanceScore}/10</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-[#1F2937] font-medium">
                  {a.destinationName}
                </td>

                <td className="px-4 py-3.5 font-mono text-[#1F2937]">
                  {a.entryFee.indian === 0 ? (
                    <span className="text-emerald-700 font-bold">Free</span>
                  ) : (
                    `₹${a.entryFee.indian}`
                  )}
                </td>

                <td className="px-4 py-3.5">
                  <div className="text-[#C96F3B] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C96F3B]" />
                    <span>{a.bestTime?.bestTimeOfDay || 'Unset'}</span>
                  </div>
                  <div className="text-[10px] text-[#6B7280]">{a.bestTime?.bestSeason}</div>
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      a.verificationStatus === 'verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : a.verificationStatus === 'pending_review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-gray-100 text-[#4B5563]'
                    }`}
                  >
                    {a.verificationStatus.replace('_', ' ')}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      a.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-[#4B5563]'
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td className="px-4 py-3.5 text-right space-x-1">
                  <button
                    onClick={() => setPreviewAttraction(a)}
                    title="Preview as traveler"
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#4B5563] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenEdit(a)}
                    title="Edit attraction"
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#C96F3B] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {a.verificationStatus !== 'verified' && (
                    <button
                      onClick={() => handleVerify(a.id)}
                      title="Mark as Verified"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deep Attraction Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#C96F3B]" />
                <div>
                  <h3 className="font-bold text-[#1F2937]">
                    {selectedAttraction ? `Edit: ${selectedAttraction.name}` : 'Create Tourism Landmark'}
                  </h3>
                  <p className="text-[11px] text-[#6B7280]">
                    Direct operational source of truth for traveler destination guides and trip generation.
                  </p>
                </div>
              </div>
              <button onClick={() => setIsEditing(false)} className="text-[#6B7280] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#F7F8FA]">
              {/* Dependency Visualization Banner */}
              {selectedAttraction && (
                <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between text-[#6B7280] shadow-sm">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C96F3B]" />
                    <span>
                      Active Usage: Referenced in <strong>{selectedAttraction.usedInTripsCount || 890}</strong> traveler itineraries and <strong>{selectedAttraction.usedInCollectionsCount || 4}</strong> curated collections.
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">
                    Last Verified: {new Date(selectedAttraction.lastVerified).toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* General Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[#4B5563] font-medium mb-1">Monument Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Hindi Vernacular Name</label>
                  <input
                    type="text"
                    placeholder="e.g. सिटी पैलेस"
                    value={formData.hindiName || ''}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Category</label>
                  <select
                    value={formData.category || 'heritage'}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        categoryLabel: e.target.options[e.target.selectedIndex].text,
                      })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="palace">Royal Palace</option>
                    <option value="temple">Spiritual Temple</option>
                    <option value="fort">Hill Fort</option>
                    <option value="monument">Historical Monument</option>
                    <option value="museum">Museum & Gallery</option>
                    <option value="lake">Lake & Waterfront</option>
                    <option value="heritage">Heritage Site</option>
                    <option value="nature">Nature Sanctuary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Destination City</label>
                  <select
                    value={formData.destinationId || ''}
                    onChange={(e) => {
                      const dest = db.destinations.find((d) => d.id === e.target.value)
                      setFormData({
                        ...formData,
                        destinationId: e.target.value,
                        destinationName: dest?.name || 'Udaipur',
                      })
                    }}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    {db.destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Recommended Duration</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={15}
                      min={15}
                      value={formData.recommendedVisitDurationMin || 90}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          recommendedVisitDurationMin: parseInt(e.target.value) || 90,
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                    <span className="text-[#6B7280] shrink-0">Minutes</span>
                  </div>
                </div>
              </div>

              {/* Coordinates & Physical Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Official Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Full Architectural Narrative</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              {/* Entry Tariffs */}
              <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2 shadow-sm">
                <div className="font-bold text-[#1F2937] flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-emerald-600" />
                  <span>Entry Fee Structure (INR)</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Indian Citizen (₹)</label>
                    <input
                      type="number"
                      value={formData.entryFee?.indian || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryFee: {
                            ...(formData.entryFee as any),
                            indian: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Foreign Traveler (₹)</label>
                    <input
                      type="number"
                      value={formData.entryFee?.foreign || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryFee: {
                            ...(formData.entryFee as any),
                            foreign: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Student Tariff (₹)</label>
                    <input
                      type="number"
                      value={formData.entryFee?.student || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryFee: {
                            ...(formData.entryFee as any),
                            student: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Camera Fee (₹)</label>
                    <input
                      type="number"
                      value={formData.entryFee?.camera || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entryFee: {
                            ...(formData.entryFee as any),
                            camera: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Weekly Operating Hours (Multi-Window Timings) */}
              {formData.openingHours && (
                <ScheduleEditor
                  schedule={formData.openingHours}
                  onChange={(updated) => setFormData({ ...formData, openingHours: updated })}
                />
              )}

              {/* Best Time Editor */}
              {formData.bestTime && (
                <BestTimeEditor
                  config={formData.bestTime}
                  onChange={(updated) => setFormData({ ...formData, bestTime: updated })}
                />
              )}

              {/* Internal Planning Signals & Scoring for Trip Engine */}
              <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1F2937] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C96F3B]" />
                    <span>Internal Itinerary Engine Priority Signals (1–10 Scale)</span>
                  </span>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">Not exposed directly to travelers</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Importance</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      step={0.1}
                      value={formData.importanceScore || 8}
                      onChange={(e) =>
                        setFormData({ ...formData, importanceScore: parseFloat(e.target.value) || 8 })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Cultural Significance</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      step={0.1}
                      value={formData.culturalScore || 8}
                      onChange={(e) =>
                        setFormData({ ...formData, culturalScore: parseFloat(e.target.value) || 8 })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Popularity Signal</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      step={0.1}
                      value={formData.popularityScore || 8}
                      onChange={(e) =>
                        setFormData({ ...formData, popularityScore: parseFloat(e.target.value) || 8 })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4B5563] text-[11px] mb-1">Priority Tier</label>
                    <select
                      value={formData.priorityCategory || 'recommended'}
                      onChange={(e: any) =>
                        setFormData({ ...formData, priorityCategory: e.target.value })
                      }
                      className="w-full bg-white border border-[#E5E7EB] rounded px-2.5 py-1.5 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                    >
                      <option value="must_see">Must-See Candidate</option>
                      <option value="recommended">Recommended</option>
                      <option value="optional">Optional Stop</option>
                      <option value="featured">Featured Banner</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status & Verification */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Publication Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="draft">Draft (Offline)</option>
                    <option value="review">Pending Review</option>
                    <option value="published">Published Live</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Verification Status</label>
                  <select
                    value={formData.verificationStatus || 'draft'}
                    onChange={(e: any) =>
                      setFormData({ ...formData, verificationStatus: e.target.value })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending_review">Pending Field Verification</option>
                    <option value="verified">ASI Verified</option>
                    <option value="needs_update">Needs Update</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                {selectedAttraction && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedAttraction.id, selectedAttraction.name)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setPreviewAttraction(formData as AdminAttraction)}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview as Traveler</span>
                  </button>
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

      {/* Traveler Preview Modal */}
      <TravelerPreviewModal
        attraction={previewAttraction}
        isOpen={!!previewAttraction}
        onClose={() => setPreviewAttraction(null)}
        onPublish={(attr) => {
          adminService.saveAttraction(
            { ...attr, status: 'published', verificationStatus: 'verified' },
            'Admin',
            'Admin'
          )
          setRefresh((p) => p + 1)
        }}
      />
    </div>
  )
}
