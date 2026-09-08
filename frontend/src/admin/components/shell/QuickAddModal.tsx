import React, { useState } from 'react'
import {
  X,
  Plus,
  MapPin,
  Landmark,
  Hotel,
  Utensils,
  Compass,
  CheckCircle2,
} from 'lucide-react'
import { adminService } from '../../services/adminService'
import { adminStorage } from '../../services/adminStorage'

interface QuickAddModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [entityType, setEntityType] = useState<
    'destination' | 'attraction' | 'hotel' | 'restaurant' | 'experience'
  >('attraction')
  const [name, setName] = useState('')
  const [destinationSlug, setDestinationSlug] = useState('udaipur')
  const [tagline, setTagline] = useState('')
  const [lat, setLat] = useState('24.5854')
  const [lng, setLng] = useState('73.7125')
  const [price, setPrice] = useState('150')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const db = adminStorage.getDb()

  if (!isOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const dest = db.destinations.find((d) => d.slug === destinationSlug) || db.destinations[0]
    const parsedLat = parseFloat(lat) || 24.5854
    const parsedLng = parseFloat(lng) || 73.7125
    const parsedPrice = parseFloat(price) || 0

    if (entityType === 'destination') {
      adminService.saveDestination({
        id: `dest-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        state: 'Rajasthan',
        region: 'Northwest India',
        country: 'India',
        tagline: tagline || 'Heritage & Cultural Region',
        description: tagline || 'Newly registered tourism destination.',
        heroImage: '/images/places/city-palace.jpg',
        gallery: ['/images/places/city-palace.jpg'],
        coordinates: { lat: parsedLat, lng: parsedLng },
        bestSeason: 'October – March',
        bestDuration: '3–4 Days',
        approxBudgetPerDay: { budget: 1500, comfort: 3500, luxury: 10000 },
        tags: ['New', 'Heritage'],
        travelStyles: ['Heritage & Architecture'],
        featured: false,
        status: 'draft',
        verificationStatus: 'draft',
        tripEngineReadiness: 70,
        dataHealth: 85,
        lastVerified: new Date().toISOString(),
      })
    } else if (entityType === 'attraction') {
      adminService.saveAttraction({
        id: `attr-${Date.now()}`,
        name,
        category: 'heritage',
        categoryLabel: 'Heritage Site',
        destinationId: dest.id,
        destinationName: dest.name,
        description: tagline || 'Cultural heritage attraction in Rajasthan.',
        shortDescription: tagline || 'Authentic heritage site.',
        coordinates: { lat: parsedLat, lng: parsedLng },
        address: `${dest.name}, Rajasthan`,
        heroImage: '/images/places/city-palace.jpg',
        images: ['/images/places/city-palace.jpg'],
        entryFee: { indian: parsedPrice, foreign: parsedPrice * 3, priceType: 'fixed' },
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
          bestTimeDescription: 'Best visited during morning hours.',
          bestSeason: 'October – March',
        },
        recommendedVisitDurationMin: 90,
        importanceScore: 8.0,
        culturalScore: 8.0,
        historicalScore: 8.0,
        popularityScore: 8.0,
        uniquenessScore: 8.0,
        priorityCategory: 'recommended',
        familyFriendly: true,
        accessibility: true,
        photography: true,
        tags: ['Heritage'],
        status: 'draft',
        verificationStatus: 'draft',
        source: 'Admin Direct Entry',
        lastVerified: new Date().toISOString(),
        usedInTripsCount: 0,
        usedInCollectionsCount: 0,
      })
    } else if (entityType === 'hotel') {
      adminService.saveHotel({
        id: `hotel-${Date.now()}`,
        name,
        destinationId: dest.id,
        destinationName: dest.name,
        coordinates: { lat: parsedLat, lng: parsedLng },
        address: `${dest.name}, Rajasthan`,
        description: tagline || 'Comfort stay near central landmarks.',
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
        baseEstimatedPrice: parsedPrice || 3500,
        isLivePricing: false,
        rating: 4.5,
        reviewsCount: 120,
        tier: 'comfort',
        type: 'Heritage Boutique Stay',
        amenities: ['Free Wi-Fi', 'Breakfast Included', 'Air Conditioning'],
        roomTypes: ['Deluxe Heritage Room'],
        featured: false,
        status: 'draft',
        verificationStatus: 'draft',
        lastVerified: new Date().toISOString(),
      })
    } else if (entityType === 'restaurant') {
      adminService.saveRestaurant({
        id: `rest-${Date.now()}`,
        name,
        destinationId: dest.id,
        destinationName: dest.name,
        coordinates: { lat: parsedLat, lng: parsedLng },
        address: `${dest.name}, Rajasthan`,
        cuisine: 'Rajasthani & North Indian',
        priceRange: 'moderate',
        priceForTwo: parsedPrice || 800,
        rating: 4.5,
        openingHours: '11:00 AM – 10:30 PM',
        closedDays: [],
        isVeg: true,
        isVegan: false,
        isJainFriendly: true,
        localSpecialties: ['Mewari Thali'],
        mustTryDishes: ['Dal Baati Churma'],
        description: tagline || 'Authentic regional dining experience.',
        heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
        images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'],
        featured: false,
        status: 'draft',
        verificationStatus: 'draft',
        lastVerified: new Date().toISOString(),
      })
    }

    setSavedSuccess(true)
    setTimeout(() => {
      onSuccess()
      onClose()
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#FDF6F0] text-[#C96F3B] border border-[#F3DFD1]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1F2937]">Quick Create Entity</h3>
              <p className="text-[11px] text-[#6B7280]">
                Saves initially as Draft. Will not appear live to travelers until verified.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#1F2937] hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Entity Type Switcher */}
          <div className="grid grid-cols-5 gap-1 bg-gray-100 p-1 rounded-xl border border-[#E5E7EB]">
            {[
              { type: 'attraction', label: 'Attraction', icon: Landmark },
              { type: 'destination', label: 'Destination', icon: MapPin },
              { type: 'hotel', label: 'Hotel', icon: Hotel },
              { type: 'restaurant', label: 'Restaurant', icon: Utensils },
              { type: 'experience', label: 'Experience', icon: Compass },
            ].map((t) => {
              const Icon = t.icon
              const isSelected = entityType === t.type
              return (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setEntityType(t.type as any)}
                  className={`py-1.5 px-1 rounded-lg text-center flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-white text-[#C96F3B] font-bold shadow-xs'
                      : 'text-[#6B7280] hover:text-[#1F2937]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{t.label}</span>
                </button>
              )
            })}
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Entity Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sajjangarh Biological Park"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] placeholder-[#9CA3AF] outline-none focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B]"
            />
          </div>

          {entityType !== 'destination' && (
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Target Destination</label>
              <select
                value={destinationSlug}
                onChange={(e) => setDestinationSlug(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
              >
                {db.destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}, {d.state}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Summary Tagline / Context</label>
            <input
              type="text"
              placeholder="Short bio or essential description..."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] placeholder-[#9CA3AF] outline-none focus:border-[#C96F3B]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Latitude</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Longitude</label>
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono"
              />
            </div>
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Price / Tariff (₹)</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save as Draft</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
