import React, { useState } from 'react'
import { X, GitMerge, Check, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react'
import { duplicateDetectionService } from '../../services/duplicateDetectionService'
import type { DuplicatePair } from '../../types/admin'

interface DuplicateMergeModalProps {
  pair: DuplicatePair | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const DuplicateMergeModal: React.FC<DuplicateMergeModalProps> = ({
  pair,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [primaryRecordId, setPrimaryRecordId] = useState<string>('')
  const [fieldSelections, setFieldSelections] = useState<{
    name: 'A' | 'B'
    description: 'A' | 'B'
    coordinates: 'A' | 'B'
    openingHours: 'A' | 'B'
    entryFee: 'A' | 'B'
    images: 'A' | 'B' | 'both'
  }>({
    name: 'A',
    description: 'A',
    coordinates: 'A',
    openingHours: 'A',
    entryFee: 'A',
    images: 'both',
  })

  // Initialize primary when opened
  React.useEffect(() => {
    if (pair) {
      setPrimaryRecordId(pair.recordA.id)
    }
  }, [pair])

  if (!isOpen || !pair) return null

  const { recordA, recordB } = pair

  const handleMerge = () => {
    const success = duplicateDetectionService.mergeRecords(
      pair.id,
      primaryRecordId,
      fieldSelections,
      'Admin',
      'Admin'
    )
    if (success) {
      onSuccess()
      onClose()
    }
  }

  const handleKeepSeparate = () => {
    duplicateDetectionService.dismissDuplicate(pair.id, 'Admin', 'Admin')
    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1F2937]">
                  Duplicate Entity Resolution & Merge Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {pair.similarityPercentage}% Similarity
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {pair.reason} &bull; Distance: {pair.distanceMeters}m
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs bg-[#F7F8FA]">
          {/* Step 1: Choose Primary Record */}
          <div>
            <label className="block text-[#1F2937] font-bold mb-2">
              Step 1: Choose Primary Master Record (Will retain canonical ID & URL)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card A */}
              <div
                onClick={() => setPrimaryRecordId(recordA.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  primaryRecordId === recordA.id
                    ? 'bg-[#FDF6F0] border-[#C96F3B] ring-1 ring-[#C96F3B]/40'
                    : 'bg-white border-[#E5E7EB] hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-[#4B5563]">
                    Candidate A
                  </span>
                  {primaryRecordId === recordA.id && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#C96F3B]">
                      <Check className="w-3.5 h-3.5" /> Primary Target
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#1F2937]">{recordA.name}</h4>
                <p className="text-[#6B7280] mt-1 line-clamp-2">{recordA.description}</p>
                <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#9CA3AF]">
                  <span>Fee: ₹{recordA.entryFee}</span>
                  <span>Hours: {recordA.openingHours}</span>
                </div>
              </div>

              {/* Card B */}
              <div
                onClick={() => setPrimaryRecordId(recordB.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  primaryRecordId === recordB.id
                    ? 'bg-[#FDF6F0] border-[#C96F3B] ring-1 ring-[#C96F3B]/40'
                    : 'bg-white border-[#E5E7EB] hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-[#4B5563]">
                    Candidate B
                  </span>
                  {primaryRecordId === recordB.id && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#C96F3B]">
                      <Check className="w-3.5 h-3.5" /> Primary Target
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#1F2937]">{recordB.name}</h4>
                <p className="text-[#6B7280] mt-1 line-clamp-2">{recordB.description}</p>
                <div className="mt-3 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#9CA3AF]">
                  <span>Fee: ₹{recordB.entryFee}</span>
                  <span>Hours: {recordB.openingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Selective Field Merge Matrix */}
          <div>
            <label className="block text-[#1F2937] font-bold mb-2">
              Step 2: Field-by-Field Preservation (Choose winning attributes)
            </label>
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden divide-y divide-[#E5E7EB]">
              {/* Row: Name */}
              <div className="p-3.5 flex items-center justify-between gap-4">
                <span className="font-semibold text-[#4B5563] w-32 shrink-0">Entity Name</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, name: 'A' })}
                    className={`p-2 rounded border text-left truncate transition-colors ${
                      fieldSelections.name === 'A'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    A: {recordA.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, name: 'B' })}
                    className={`p-2 rounded border text-left truncate transition-colors ${
                      fieldSelections.name === 'B'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    B: {recordB.name}
                  </button>
                </div>
              </div>

              {/* Row: Description */}
              <div className="p-3.5 flex items-center justify-between gap-4">
                <span className="font-semibold text-[#4B5563] w-32 shrink-0">Description</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, description: 'A' })}
                    className={`p-2 rounded border text-left truncate transition-colors ${
                      fieldSelections.description === 'A'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    A: {recordA.description.slice(0, 50)}...
                  </button>
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, description: 'B' })}
                    className={`p-2 rounded border text-left truncate transition-colors ${
                      fieldSelections.description === 'B'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    B: {recordB.description.slice(0, 50)}...
                  </button>
                </div>
              </div>

              {/* Row: Coordinates */}
              <div className="p-3.5 flex items-center justify-between gap-4">
                <span className="font-semibold text-[#4B5563] w-32 shrink-0">GPS Coordinates</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, coordinates: 'A' })}
                    className={`p-2 rounded border text-left font-mono transition-colors ${
                      fieldSelections.coordinates === 'A'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    A: {recordA.coordinates.lat.toFixed(4)}, {recordA.coordinates.lng.toFixed(4)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, coordinates: 'B' })}
                    className={`p-2 rounded border text-left font-mono transition-colors ${
                      fieldSelections.coordinates === 'B'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] font-medium'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    B: {recordB.coordinates.lat.toFixed(4)}, {recordB.coordinates.lng.toFixed(4)}
                  </button>
                </div>
              </div>

              {/* Row: Images */}
              <div className="p-3.5 flex items-center justify-between gap-4">
                <span className="font-semibold text-[#4B5563] w-32 shrink-0">Photo Gallery</span>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, images: 'A' })}
                    className={`p-2 rounded border text-center font-medium transition-colors ${
                      fieldSelections.images === 'A'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B]'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    Keep Only A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, images: 'B' })}
                    className={`p-2 rounded border text-center font-medium transition-colors ${
                      fieldSelections.images === 'B'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B]'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    Keep Only B
                  </button>
                  <button
                    type="button"
                    onClick={() => setFieldSelections({ ...fieldSelections, images: 'both' })}
                    className={`p-2 rounded border text-center font-medium transition-colors ${
                      fieldSelections.images === 'both'
                        ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B]'
                        : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50'
                    }`}
                  >
                    Combine Both
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] bg-white flex items-center justify-between">
          <button
            type="button"
            onClick={handleKeepSeparate}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#4B5563] font-medium text-xs transition-colors"
          >
            Keep Separate (Dismiss Candidate)
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[#6B7280] hover:text-[#1F2937] font-medium text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleMerge}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold text-xs shadow-sm transition-all"
            >
              <GitMerge className="w-4 h-4" />
              <span>Confirm & Merge Records</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
