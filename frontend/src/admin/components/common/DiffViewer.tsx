import React from 'react'
import { ArrowRight, History, Check } from 'lucide-react'

interface DiffViewerProps {
  previousState?: any
  newState?: any
  fieldChanges?: {
    fieldName: string
    from: any
    to: any
  }[]
  title?: string
  onRestore?: () => void
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  previousState,
  newState,
  fieldChanges,
  title = 'Change Differential Analysis',
  onRestore,
}) => {
  // If specific field changes are provided, display cleanly
  if (fieldChanges && fieldChanges.length > 0) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 text-xs font-mono">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-[#1F2937] font-sans font-semibold">
            <History className="w-4 h-4 text-[#C96F3B]" />
            <span>{title}</span>
          </div>
          {onRestore && (
            <button
              onClick={onRestore}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-sans text-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Restore this revision</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          {fieldChanges.map((ch, idx) => (
            <div key={idx} className="p-2.5 rounded bg-gray-50 border border-[#E5E7EB] flex items-center justify-between gap-4">
              <span className="text-[#4B5563] font-semibold">{ch.fieldName}</span>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-red-50 border border-red-200 text-red-700 line-through">
                  {typeof ch.from === 'object' ? JSON.stringify(ch.from) : String(ch.from ?? 'None')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                  {typeof ch.to === 'object' ? JSON.stringify(ch.to) : String(ch.to ?? 'None')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Otherwise, side-by-side JSON comparison
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 text-xs">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E5E7EB]">
        <span className="text-[#1F2937] font-semibold">{title}</span>
        {onRestore && (
          <button
            onClick={onRestore}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-medium text-xs transition-colors"
          >
            <span>Rollback to Previous State</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
        <div>
          <div className="text-[#4B5563] font-semibold mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Before / Previous State</span>
          </div>
          <pre className="p-3 rounded bg-gray-50 border border-[#E5E7EB] text-red-700 overflow-x-auto max-h-64">
            {previousState ? JSON.stringify(previousState, null, 2) : '// Initial record creation'}
          </pre>
        </div>

        <div>
          <div className="text-[#4B5563] font-semibold mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>After / Applied State</span>
          </div>
          <pre className="p-3 rounded bg-gray-50 border border-[#E5E7EB] text-emerald-700 overflow-x-auto max-h-64">
            {newState ? JSON.stringify(newState, null, 2) : '// No modified state'}
          </pre>
        </div>
      </div>
    </div>
  )
}
