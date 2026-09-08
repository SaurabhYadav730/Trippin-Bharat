import React, { useState } from 'react'
import {
  Utensils,
  Plus,
  Search,
  Check,
  Star,
  DollarSign,
  MapPin,
  Clock,
  Edit3,
  Trash2,
  X,
  Leaf,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import type { AdminRestaurant } from '../types/admin'

export const RestaurantsAdminPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedDestId, setSelectedDestId] = useState('all')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<AdminRestaurant>>({})
  const [refresh, setRefresh] = useState(0)

  const db = adminStorage.getDb()
  const restaurants = adminService.getRestaurants(selectedDestId, search)

  const handleOpenEdit = (r: AdminRestaurant) => {
    setFormData(JSON.parse(JSON.stringify(r)))
    setIsEditing(true)
  }

  const handleOpenCreate = () => {
    const dest = db.destinations[0]
    setFormData({
      id: `rest-${Date.now()}`,
      name: '',
      destinationId: dest.id,
      destinationName: dest.name,
      coordinates: { lat: 24.585, lng: 73.68 },
      address: `${dest.name}, Rajasthan`,
      cuisine: 'Rajasthani & Mewari',
      cuisineId: 'cuisine-rajasthani',
      priceRange: 'moderate',
      priceForTwo: 800,
      rating: 4.6,
      openingHours: '11:30 AM – 10:30 PM',
      closedDays: [],
      isVeg: true,
      isVegan: false,
      isJainFriendly: true,
      localSpecialties: ['Dal Baati Churma'],
      mustTryDishes: ['Gatte Ki Sabzi'],
      description: 'Authentic regional culinary dining.',
      heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
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

    adminService.saveRestaurant(formData as AdminRestaurant, 'Admin', 'Admin')
    setIsEditing(false)
    setRefresh((p) => p + 1)
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Confirm deletion of restaurant "${name}"?`)) {
      adminService.deleteRestaurant(id, 'Admin', 'Admin')
      setIsEditing(false)
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Restaurants & Culinary Directory</h2>
            <p className="text-[#6B7280] mt-0.5">
              Powers automated lunch/dinner recommendations and regional thali scheduling in itineraries.
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

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search restaurants..."
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
            <span>Add Restaurant</span>
          </button>
        </div>
      </div>

      {/* Grid of Restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-gray-300 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 bg-gray-100">
                <img
                  src={r.heroImage}
                  alt={r.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {r.isVeg && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      <span>Pure Veg</span>
                    </span>
                  )}
                  {r.isJainFriendly && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                      Jain Friendly
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3">
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-gray-200 text-right shadow-sm backdrop-blur">
                    <div className="text-[10px] text-[#6B7280]">Price for Two</div>
                    <div className="text-xs font-bold font-mono text-emerald-700">
                      ₹{r.priceForTwo}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#C96F3B] font-semibold text-[11px]">{r.destinationName}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{r.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-[#1F2937] text-sm">{r.name}</h3>
                <p className="text-[#6B7280] text-[11px] leading-tight">{r.cuisine}</p>

                <div className="pt-2 text-[11px] text-[#6B7280] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <span>{r.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#6B7280] uppercase">
                {r.verificationStatus}
              </span>
              <button
                onClick={() => handleOpenEdit(r)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#374151] border border-[#E5E7EB] font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C96F3B]" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
              <h3 className="font-bold text-[#1F2937] text-sm">
                {formData.id ? `Edit Dining: ${formData.name}` : 'Add Restaurant'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Restaurant Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Cuisine Classification</label>
                  <input
                    type="text"
                    value={formData.cuisine || ''}
                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Price for Two (₹)</label>
                  <input
                    type="number"
                    value={formData.priceForTwo || 600}
                    onChange={(e) =>
                      setFormData({ ...formData, priceForTwo: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Opening Hours</label>
                  <input
                    type="text"
                    value={formData.openingHours || ''}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              {/* Dietary Flags */}
              <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2">
                <div className="text-[#1F2937] font-semibold mb-1">Dietary Specialization Flags</div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVeg || false}
                      onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                      className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                    />
                    <span className="text-[#374151]">Pure Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isJainFriendly || false}
                      onChange={(e) => setFormData({ ...formData, isJainFriendly: e.target.checked })}
                      className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                    />
                    <span className="text-[#374151]">Jain Friendly</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVegan || false}
                      onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                      className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                    />
                    <span className="text-[#374151]">Vegan Options</span>
                  </label>
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
                    <span>Delete Restaurant</span>
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
