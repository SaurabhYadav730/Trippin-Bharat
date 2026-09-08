import React, { useState } from 'react'
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Layers,
  Trash2,
  X,
  ExternalLink,
} from 'lucide-react'
import { mediaService } from '../services/mediaService'
import type { MediaItem } from '../types/admin'

export const MediaLibraryPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [licenseFilter, setLicenseFilter] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('')
  const [refresh, setRefresh] = useState(0)

  // New media form state
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('/images/places/city-palace.jpg')
  const [newAlt, setNewAlt] = useState('')
  const [newLicense, setNewLicense] = useState<'ASI Verified' | 'Editorial License' | 'Public Domain'>('ASI Verified')
  const [newAttribution, setNewAttribution] = useState('Yātra Verified Heritage Documentation')

  const mediaList = mediaService.getAllMedia(search, licenseFilter)

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newUrl.trim()) return

    mediaService.addMedia({
      title: newTitle,
      url: newUrl,
      altText: newAlt || newTitle,
      caption: newTitle,
      source: 'Internal Field Audit',
      license: newLicense,
      attribution: newAttribution,
      uploadedBy: 'Saurabh Admin',
      fileSize: '1.2 MB',
      dimensions: '2400 x 1600 px',
      format: 'JPEG',
    })

    setIsAdding(false)
    setNewTitle('')
    setRefresh((p) => p + 1)
  }

  const handleDeleteMedia = (id: string) => {
    setDeleteErrorMessage('')
    const result = mediaService.deleteMedia(id, false, 'Admin', 'Admin')
    if (!result.success) {
      setDeleteErrorMessage(result.message)
    } else {
      setSelectedMedia(null)
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Media Library & Licensing Vault</h2>
            <p className="text-[#6B7280] mt-0.5">
              Verified authentic landmark photography, copyright licensing, and active dependency tracking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C96F3B] outline-none w-48"
            />
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Register Asset</span>
          </button>
        </div>
      </div>

      {deleteErrorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{deleteErrorMessage}</span>
          </div>
          <button onClick={() => setDeleteErrorMessage('')} className="text-red-500 hover:text-red-800">
            ✕
          </button>
        </div>
      )}

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mediaList.map((m) => {
          const usages = mediaService.detectMediaUsages(m.url)
          return (
            <div
              key={m.id}
              onClick={() => {
                setSelectedMedia({ ...m, usedBy: usages })
                setDeleteErrorMessage('')
              }}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-gray-300 shadow-sm cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={m.url}
                    alt={m.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/95 text-emerald-700 border border-emerald-200 shadow-sm backdrop-blur">
                      {m.license}
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="font-bold text-[#1F2937] truncate">{m.title}</h4>
                  <div className="text-[11px] text-[#6B7280] truncate">{m.attribution}</div>
                </div>
              </div>

              <div className="p-3 pt-0 border-t border-[#E5E7EB] mt-2 flex items-center justify-between text-[10px] text-[#6B7280] font-mono">
                <span>{m.fileSize}</span>
                <span className="flex items-center gap-1 text-[#C96F3B] font-sans font-semibold">
                  <Layers className="w-3 h-3" />
                  <span>{usages.length} uses</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Media Inspector Drawer */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-[#1F2937] text-sm">{selectedMedia.title}</h3>
              <button onClick={() => setSelectedMedia(null)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-52 bg-gray-100 rounded-xl overflow-hidden border border-[#E5E7EB]">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.altText}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#374151]">
              <div>
                <strong>Alt Text: </strong>
                {selectedMedia.altText}
              </div>
              <div>
                <strong>Attribution: </strong>
                {selectedMedia.attribution}
              </div>
              <div>
                <strong>License: </strong>
                <span className="text-emerald-700 font-semibold">{selectedMedia.license}</span>
              </div>
            </div>

            {/* Active Usages Protection */}
            <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-1.5">
              <div className="font-bold text-[#1F2937] flex items-center gap-1.5 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-[#C96F3B]" />
                <span>Actively Used By ({selectedMedia.usedBy.length} Records):</span>
              </div>
              {selectedMedia.usedBy.length > 0 ? (
                <div className="space-y-1 text-[#6B7280]">
                  {selectedMedia.usedBy.map((u, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span>&bull; {u.entityName}</span>
                      <span className="text-[10px] uppercase font-mono text-[#9CA3AF]">
                        {u.entityType}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[#9CA3AF]">Orphan asset. Not currently referenced.</div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => handleDeleteMedia(selectedMedia.id)}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#374151] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] bg-[#F9FAFB] -mx-6 -mt-6 p-4">
              <h3 className="font-bold text-[#1F2937] text-sm">Register Tourism Media</h3>
              <button onClick={() => setIsAdding(false)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Asset Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaipur City Palace Main Courtyard"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Asset URL or Local Path *</label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">License Type</label>
                <select
                  value={newLicense}
                  onChange={(e: any) => setNewLicense(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                >
                  <option value="ASI Verified">ASI Verified Archaeological</option>
                  <option value="Editorial License">Editorial Travel License</option>
                  <option value="Public Domain">Public Domain / CC0</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4B5563] font-medium mb-1">Attribution / Photographer</label>
                <input
                  type="text"
                  value={newAttribution}
                  onChange={(e) => setNewAttribution(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] focus:border-[#C96F3B] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937] border border-transparent hover:border-[#E5E7EB] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-colors"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
