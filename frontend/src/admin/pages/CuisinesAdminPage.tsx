import React, { useState } from 'react'
import {
  BookOpen,
  Plus,
  Search,
  UtensilsCrossed,
  MapPin,
  DollarSign,
  Edit3,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react'
import { adminService } from '../services/adminService'
import { adminStorage } from '../services/adminStorage'
import type { CuisineItem, DishItem } from '../types/admin'

export const CuisinesAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cuisines' | 'dishes'>('cuisines')
  const [isEditingDish, setIsEditingDish] = useState(false)
  const [dishFormData, setDishFormData] = useState<Partial<DishItem>>({})
  const [refresh, setRefresh] = useState(0)

  const db = adminStorage.getDb()
  const cuisines = adminService.getCuisines()
  const dishes = adminService.getDishes()

  const handleOpenCreateDish = () => {
    const cuisine = cuisines[0]
    const dest = db.destinations[0]
    setDishFormData({
      id: `dish-${Date.now()}`,
      name: '',
      cuisineId: cuisine.id,
      cuisineName: cuisine.name,
      destinationId: dest.id,
      destinationName: dest.name,
      isVeg: true,
      priceEstimate: 250,
      description: '',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      recommendedRestaurantIds: [],
      flavorProfile: 'Spiced, Aromatic, Ghee-Infused',
    })
    setIsEditingDish(true)
  }

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dishFormData.name) return

    adminService.saveDish(dishFormData as DishItem, 'Admin', 'Admin')
    setIsEditingDish(false)
    setRefresh((p) => p + 1)
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Regional Cuisines & Dish Engine</h2>
            <p className="text-[#6B7280] mt-0.5">
              Connect: Destination &rarr; Cuisine &rarr; Restaurant &rarr; Iconic Regional Dish.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 border border-[#E5E7EB] rounded-xl p-0.5">
            <button
              onClick={() => setActiveTab('cuisines')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'cuisines'
                  ? 'bg-white text-[#1F2937] shadow-sm font-semibold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              Cuisines ({cuisines.length})
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'dishes'
                  ? 'bg-white text-[#1F2937] shadow-sm font-semibold'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              Iconic Dishes ({dishes.length})
            </button>
          </div>

          <button
            onClick={handleOpenCreateDish}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Dish</span>
          </button>
        </div>
      </div>

      {activeTab === 'cuisines' ? (
        /* Cuisines Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cuisines.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-gray-300 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 bg-gray-100">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <div className="text-[10px] text-amber-300 font-semibold">{c.region}</div>
                    <h3 className="text-sm font-bold">{c.name}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <p className="text-[#6B7280] leading-relaxed text-[11px]">{c.description}</p>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#6B7280] mb-1">
                      Signature Dishes:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.signatureDishes.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-gray-50 border border-[#E5E7EB] text-[10px] text-[#374151]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[#6B7280] text-[10px] font-mono">
                <span>{c.dishCount} catalogued dishes</span>
                <span className="text-[#C96F3B] font-medium">Linked to Itinerary Engine</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Dishes Table */
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Dish Name</th>
                <th className="px-4 py-3">Cuisine</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Flavor Profile</th>
                <th className="px-4 py-3">Est. Price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {dishes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#1F2937]">{d.name}</td>
                  <td className="px-4 py-3 text-[#4B5563]">{d.cuisineName}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{d.destinationName}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{d.flavorProfile}</td>
                  <td className="px-4 py-3 font-mono text-emerald-700 font-bold">
                    ₹{d.priceEstimate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setDishFormData(d)
                        setIsEditingDish(true)
                      }}
                      className="text-[#C96F3B] hover:text-[#B55F2D] font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dish Modal */}
      {isEditingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#1F2937] text-sm">
                {dishFormData.id ? `Edit Dish: ${dishFormData.name}` : 'Register Regional Dish'}
              </h3>
              <button onClick={() => setIsEditingDish(false)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ker Sangri or Litti Chokha"
                  value={dishFormData.name || ''}
                  onChange={(e) => setDishFormData({ ...dishFormData, name: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Cuisine System</label>
                  <select
                    value={dishFormData.cuisineId || ''}
                    onChange={(e) => {
                      const c = cuisines.find((x) => x.id === e.target.value)
                      setDishFormData({
                        ...dishFormData,
                        cuisineId: e.target.value,
                        cuisineName: c?.name || '',
                      })
                    }}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                  >
                    {cuisines.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#4B5563] font-medium mb-1">Avg Price (₹)</label>
                  <input
                    type="number"
                    value={dishFormData.priceEstimate || 200}
                    onChange={(e) =>
                      setDishFormData({ ...dishFormData, priceEstimate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Flavor Profile Note</label>
                <input
                  type="text"
                  placeholder="e.g. Spicy, Smoked, Piquant, Aromatic"
                  value={dishFormData.flavorProfile || ''}
                  onChange={(e) => setDishFormData({ ...dishFormData, flavorProfile: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={dishFormData.description || ''}
                  onChange={(e) => setDishFormData({ ...dishFormData, description: e.target.value })}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsEditingDish(false)}
                  className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937] border border-transparent hover:border-[#E5E7EB] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-colors"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
