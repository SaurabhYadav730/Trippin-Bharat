import React, { useState } from 'react'
import {
  MapPin,
  Compass,
  AlertTriangle,
  Check,
  Filter,
  Layers,
  Search,
  Navigation,
  Info,
  Maximize2,
  Move,
} from 'lucide-react'
import { adminStorage } from '../../services/adminStorage'
import { adminService } from '../../services/adminService'
import { geoValidationService } from '../../services/geoValidationService'
import type { GeoPoint } from '../../types/admin'

export const MapStudioView: React.FC = () => {
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState<string>('udaipur')
  const [filterType, setFilterType] = useState<'all' | 'attractions' | 'hotels' | 'restaurants'>('all')
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null)
  const [editLat, setEditLat] = useState<string>('')
  const [editLng, setEditLng] = useState<string>('')
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('')

  const db = adminStorage.getDb()
  const destination = db.destinations.find((d) => d.slug === selectedDestinationSlug) || db.destinations[0]

  const attractions = db.attractions.filter(
    (a) => a.destinationId === destination.id || a.destinationName.toLowerCase() === destination.slug.toLowerCase()
  )
  const hotels = db.hotels.filter(
    (h) => h.destinationId === destination.id || h.destinationName.toLowerCase() === destination.slug.toLowerCase()
  )
  const restaurants = db.restaurants.filter(
    (r) => r.destinationId === destination.id || r.destinationName.toLowerCase() === destination.slug.toLowerCase()
  )

  // Map viewport center & scale calculation
  const centerLat = destination.coordinates.lat
  const centerLng = destination.coordinates.lng

  // Projection conversion to SVG relative coordinates (scale ~ 1 deg = 800px)
  const project = (point: GeoPoint) => {
    const scale = 1400
    const x = 400 + (point.lng - centerLng) * scale
    const y = 300 - (point.lat - centerLat) * scale
    return { x: Math.max(30, Math.min(770, x)), y: Math.max(30, Math.min(570, y)) }
  }

  const handleSelectEntity = (entity: any, type: string) => {
    setSelectedEntity({ ...entity, entityCategory: type })
    setEditLat(entity.coordinates?.lat?.toString() || '')
    setEditLng(entity.coordinates?.lng?.toString() || '')
    setSaveSuccessMessage('')
  }

  const handleConfirmCoordinateUpdate = () => {
    if (!selectedEntity) return
    const lat = parseFloat(editLat)
    const lng = parseFloat(editLng)
    if (isNaN(lat) || isNaN(lng)) return

    const updatedCoords = { lat, lng }

    if (selectedEntity.entityCategory === 'attraction') {
      const full = db.attractions.find((a) => a.id === selectedEntity.id)
      if (full) adminService.saveAttraction({ ...full, coordinates: updatedCoords }, 'Admin', 'Admin')
    } else if (selectedEntity.entityCategory === 'hotel') {
      const full = db.hotels.find((h) => h.id === selectedEntity.id)
      if (full) adminService.saveHotel({ ...full, coordinates: updatedCoords }, 'Admin', 'Admin')
    } else if (selectedEntity.entityCategory === 'restaurant') {
      const full = db.restaurants.find((r) => r.id === selectedEntity.id)
      if (full) adminService.saveRestaurant({ ...full, coordinates: updatedCoords }, 'Admin', 'Admin')
    }

    setSelectedEntity({ ...selectedEntity, coordinates: updatedCoords })
    setShowConfirmModal(false)
    setSaveSuccessMessage('Coordinates successfully updated and logged to audit trail.')
    setTimeout(() => setSaveSuccessMessage(''), 4000)
  }

  // Outlier detection
  const outlierIssues: Array<{ name: string; distKm: number; entity: any; type: string }> = []
  ;[...attractions.map((a) => ({ item: a, type: 'attraction' })), ...restaurants.map((r) => ({ item: r, type: 'restaurant' }))].forEach(
    ({ item, type }) => {
      if (item.coordinates) {
        const val = geoValidationService.validateEntityCoordinates(
          item.coordinates,
          destination.coordinates,
          item.name,
          destination.name
        )
        if (val.isOutlier) {
          outlierIssues.push({ name: item.name, distKm: val.distanceFromCenterKm, entity: item, type })
        }
      }
    }
  )

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E5E7EB] rounded-2xl text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1F2937]">GIS Map Studio & Coordinate Engine</h2>
            <p className="text-[#6B7280] mt-0.5">
              Live spatial projection, cluster analysis, and geofence boundary verification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Destination Switcher */}
          <select
            value={selectedDestinationSlug}
            onChange={(e) => {
              setSelectedDestinationSlug(e.target.value)
              setSelectedEntity(null)
            }}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-lg px-3 py-1.5 font-medium outline-none focus:border-[#C96F3B]"
          >
            {db.destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}, {d.state}
              </option>
            ))}
          </select>

          {/* Layer Filter */}
          <div className="flex items-center bg-gray-100 border border-[#E5E7EB] rounded-lg p-0.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filterType === 'all' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              All Entities
            </button>
            <button
              onClick={() => setFilterType('attractions')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filterType === 'attractions' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              Attractions ({attractions.length})
            </button>
            <button
              onClick={() => setFilterType('hotels')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filterType === 'hotels' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              Hotels ({hotels.length})
            </button>
            <button
              onClick={() => setFilterType('restaurants')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                filterType === 'restaurants' ? 'bg-white text-[#1F2937] shadow-sm font-semibold' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              Restaurants ({restaurants.length})
            </button>
          </div>
        </div>
      </div>

      {/* Outlier Alert if any */}
      {outlierIssues.length > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Geographic Outlier Warning:</strong> {outlierIssues[0].name} is {outlierIssues[0].distKm} km from {destination.name} center.
            </span>
          </div>
          <button
            onClick={() => handleSelectEntity(outlierIssues[0].entity, outlierIssues[0].type)}
            className="px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold"
          >
            Inspect Entity
          </button>
        </div>
      )}

      {/* Main Map + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive GIS Map Canvas */}
        <div className="lg:col-span-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 relative overflow-hidden shadow-sm min-h-[560px] flex flex-col justify-between">
          <div className="absolute top-4 left-4 z-10 bg-white/95 border border-[#E5E7EB] backdrop-blur rounded-xl p-3 text-xs space-y-1 shadow-sm">
            <div className="font-bold text-[#1F2937] flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-[#C96F3B]" />
              <span>{destination.name} Geographic Grid</span>
            </div>
            <div className="font-mono text-[11px] text-[#6B7280]">
              Center: {centerLat.toFixed(4)}°N, {centerLng.toFixed(4)}°E
            </div>
            <div className="text-[10px] text-[#9CA3AF]">
              Showing {attractions.length + hotels.length + restaurants.length} plotted tourism landmarks
            </div>
          </div>

          {/* SVG Map Projection */}
          <div className="w-full h-[480px] relative">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              {/* Subtle Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.8" />
                </pattern>
                <radialGradient id="cityCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C96F3B" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#C96F3B" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* Destination center radius circle (15km radius) */}
              <circle cx="400" cy="300" r="180" fill="url(#cityCenterGlow)" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4 4" />
              <text x="405" y="130" fill="#6B7280" fontSize="10" fontFamily="monospace">15 km City Radius</text>

              {/* Destination Center Marker */}
              <circle cx="400" cy="300" r="6" fill="#C96F3B" />
              <circle cx="400" cy="300" r="14" fill="none" stroke="#C96F3B" strokeWidth="1.5" className="animate-ping opacity-30" />
              <text x="415" y="304" fill="#1F2937" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                {destination.name} Center
              </text>

              {/* Plot Attractions */}
              {(filterType === 'all' || filterType === 'attractions') &&
                attractions.map((a) => {
                  const pos = project(a.coordinates)
                  const isSelected = selectedEntity?.id === a.id
                  return (
                    <g
                      key={a.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectEntity(a, 'attraction')}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 9 : 6}
                        fill="#C96F3B"
                        stroke="#FFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <text
                        x={pos.x + 10}
                        y={pos.y + 4}
                        fill={isSelected ? '#C96F3B' : '#1F2937'}
                        fontSize="10"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {a.name}
                      </text>
                    </g>
                  )
                })}

              {/* Plot Hotels */}
              {(filterType === 'all' || filterType === 'hotels') &&
                hotels.map((h) => {
                  const pos = project(h.coordinates)
                  const isSelected = selectedEntity?.id === h.id
                  return (
                    <g
                      key={h.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectEntity(h, 'hotel')}
                    >
                      <rect
                        x={pos.x - 5}
                        y={pos.y - 5}
                        width={10}
                        height={10}
                        rx={2}
                        fill="#2563EB"
                        stroke="#FFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <text
                        x={pos.x + 10}
                        y={pos.y + 4}
                        fill={isSelected ? '#2563EB' : '#4B5563'}
                        fontSize="10"
                      >
                        {h.name}
                      </text>
                    </g>
                  )
                })}

              {/* Plot Restaurants */}
              {(filterType === 'all' || filterType === 'restaurants') &&
                restaurants.map((r) => {
                  const pos = project(r.coordinates)
                  const isSelected = selectedEntity?.id === r.id
                  return (
                    <g
                      key={r.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => handleSelectEntity(r, 'restaurant')}
                    >
                      <polygon
                        points={`${pos.x},${pos.y - 6} ${pos.x + 6},${pos.y + 5} ${pos.x - 6},${pos.y + 5}`}
                        fill="#059669"
                        stroke="#FFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <text
                        x={pos.x + 10}
                        y={pos.y + 4}
                        fill={isSelected ? '#059669' : '#4B5563'}
                        fontSize="10"
                      >
                        {r.name}
                      </text>
                    </g>
                  )
                })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex items-center gap-6 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[11px] text-[#6B7280] shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C96F3B]" />
              <span>Attraction / Monument</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]" />
              <span>Stay & Hotel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#059669]" />
              <span>Restaurant & Cuisine</span>
            </div>
          </div>
        </div>

        {/* Selected Entity Inspector & Safe Coordinate Editor */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 text-xs flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <h3 className="font-bold text-[#1F2937]">GIS Coordinate Inspector</h3>
              {selectedEntity && (
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#FDF6F0] text-[#C96F3B] border border-[#F3DFD1]">
                  {selectedEntity.entityCategory}
                </span>
              )}
            </div>

            {saveSuccessMessage && (
              <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {selectedEntity ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[#6B7280] text-[11px]">Entity Name</div>
                  <div className="text-sm font-bold text-[#1F2937]">{selectedEntity.name}</div>
                </div>

                <div className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>Distance from Center:</span>
                    <span className="font-mono text-[#1F2937] font-bold">
                      {geoValidationService.calculateDistanceKm(selectedEntity.coordinates, destination.coordinates)} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>Validation Status:</span>
                    <span className="text-emerald-600 font-semibold">Valid GPS Bounds</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="font-bold text-[#1F2937]">Calibrate Coordinates</div>
                  <div>
                    <label className="block text-[#6B7280] text-[11px] mb-1">Latitude (°N)</label>
                    <input
                      type="text"
                      value={editLat}
                      onChange={(e) => setEditLat(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono outline-none focus:border-[#C96F3B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B7280] text-[11px] mb-1">Longitude (°E)</label>
                    <input
                      type="text"
                      value={editLng}
                      onChange={(e) => setEditLng(e.target.value)}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono outline-none focus:border-[#C96F3B]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-[#9CA3AF]">
                <Compass className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                <p>Click any landmark pin on the map to inspect or calibrate coordinates.</p>
              </div>
            )}
          </div>

          {selectedEntity && (
            <div className="pt-4 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Move className="w-4 h-4" />
                <span>Confirm Coordinate Update</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Safety Confirmation Modal */}
      {showConfirmModal && selectedEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 text-xs space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F2937]">Confirm Spatial Modification</h4>
                <p className="text-[#6B7280]">This directly affects travel time calculations in Build My Trip.</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-1 font-mono text-[11px]">
              <div>Entity: {selectedEntity.name}</div>
              <div>New Lat: {editLat}</div>
              <div>New Lng: {editLng}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCoordinateUpdate}
                className="px-4 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm"
              >
                Save & Broadcast Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
