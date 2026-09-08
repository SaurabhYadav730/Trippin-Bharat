import React, { useState } from 'react'
import {
  Compass,
  Plus,
  Search,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
  Edit3,
  Trash2,
  X,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import type { AdminExperience } from '../types/admin'

export const ExperiencesAdminPage: React.FC = () => {
  const [selectedDestId, setSelectedDestId] = useState('all')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<AdminExperience>>({})
  const [refresh, setRefresh] = useState(0)

  const db = adminStorage.getDb()
  const experiences = adminService.getExperiences(selectedDestId)

  const handleOpenEdit = (exp: AdminExperience) => {
    setFormData(JSON.parse(JSON.stringify(exp)))
    setIsEditing(true)
  }

  const handleOpenCreate = () => {
    const dest = db.destinations[0]
    setFormData({
      id: `exp-${Date.now()}`,
      title: '',
      category: 'cultural',
      categoryLabel: 'Cultural Experience',
      location: `Old City, ${dest.name}`,
      destinationId: dest.id,
      destinationName: dest.name,
      duration: '2 Hours',
      durationMin: 120,
      price: 800,
      bestTime: '09:00 AM – 11:00 AM',
      season: 'October – March',
      coordinates: { lat: 24.58, lng: 73.68 },
      highlights: ['Local storytelling', 'Artisan interaction'],
      description: '',
      heroImage: '/images/places/bagore-ki-haveli.jpg',
      images: ['/images/places/bagore-ki-haveli.jpg'],
      status: 'draft',
      verificationStatus: 'draft',
      lastVerified: new Date().toISOString(),
    })
    setIsEditing(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    adminService.saveExperience(formData as AdminExperience, 'Admin', 'Admin')
    setIsEditing(false)
    setRefresh((p) => p + 1)
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Confirm deletion of "${title}"?`)) {
      adminService.deleteExperience(id, 'Admin', 'Admin')
      setIsEditing(false)
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-600">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Curated Experiences Studio</h2>
            <p className="text-[#6B7280] mt-0.5">
              Cultural workshops, heritage walks, folk performances, and desert astronomy camps.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDestId}
            onChange={(e) => setSelectedDestId(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl px-3 py-1.5 focus:border-[#C96F3B] outline-none"
          >
            <option value="all">All Destinations</option>
            {db.destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>
      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-gray-300 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 bg-gray-100">
                <img src={exp.heroImage} alt={exp.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
                    {exp.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-gray-200 text-emerald-700 font-mono font-bold shadow-sm backdrop-blur">
                    ₹{exp.price}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="text-[#C96F3B] font-semibold text-[11px]">{exp.destinationName}</div>
                <h3 className="font-bold text-[#1F2937] text-sm leading-snug">{exp.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-[11px] line-clamp-2">
                  {exp.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#E5E7EB]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9CA3AF]" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{exp.bestTime}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#6B7280]">
                {exp.verificationStatus}
              </span>
              <button
                onClick={() => handleOpenEdit(exp)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#374151] border border-[#E5E7EB] font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C96F3B]" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-xl w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#1F2937] text-sm">
                {formData.id ? `Edit: ${formData.title}` : 'Add Experience'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Experience Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Category</label>
                  <select
                    value={formData.category || 'cultural'}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    <option value="cultural">Cultural Performance</option>
                    <option value="adventure">Adventure & Trekking</option>
                    <option value="photography">Photography Walk</option>
                    <option value="workshops">Artisan Workshop</option>
                    <option value="local_activities">Local Heritage Walk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Tariff per Person (₹)</label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Duration Window</label>
                  <input
                    type="text"
                    placeholder="e.g. 2.5 Hours"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Best Timing Slot</label>
                  <input
                    type="text"
                    placeholder="e.g. 08:00 AM – 10:30 AM"
                    value={formData.bestTime || ''}
                    onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Experience Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                {formData.id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(formData.id!, formData.title || '')}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
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
