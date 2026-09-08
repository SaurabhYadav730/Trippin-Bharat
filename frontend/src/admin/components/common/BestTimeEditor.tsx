import React from 'react'
import { Sparkles, Sun, Sunset, Sunrise, Moon, CloudSun } from 'lucide-react'
import type { BestTimeConfig } from '../../types/admin'

interface BestTimeEditorProps {
  config: BestTimeConfig
  onChange: (updated: BestTimeConfig) => void
  readOnly?: boolean
}

const TIME_OF_DAY_OPTIONS: Array<{
  value: BestTimeConfig['bestTimeOfDay']
  label: string
  icon: any
  hint: string
}> = [
  { value: 'Early Morning', label: 'Early Morning (5–8 AM)', icon: Sunrise, hint: 'Ideal for temples, sacred ghats, aarti' },
  { value: 'Morning', label: 'Morning (9–12 PM)', icon: Sun, hint: 'Ideal for palace museums, monuments, garden fountains' },
  { value: 'Afternoon', label: 'Afternoon (12–4 PM)', icon: CloudSun, hint: 'Indoor museums, haveli art galleries' },
  { value: 'Sunset', label: 'Sunset (4:30–6:30 PM)', icon: Sunset, hint: 'Lakeside boat rides, hill forts, panoramic viewpoints' },
  { value: 'Evening', label: 'Evening (7–10 PM)', icon: Moon, hint: 'Night illumination, cultural folk dance, bazaar walks' },
  { value: 'Night', label: 'Night (10 PM+)', icon: Moon, hint: 'Stargazing, midnight desert camps' },
]

export const BestTimeEditor: React.FC<BestTimeEditorProps> = ({ config, onChange, readOnly = false }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-3.5 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 text-[#1F2937] font-semibold">
          <Sparkles className="w-4 h-4 text-[#C96F3B]" />
          <span>Best Time To Visit (Independent Planning Signal)</span>
        </div>
        <span className="text-[11px] text-[#C96F3B] font-mono">
          Decoupled from Itinerary Scheduling
        </span>
      </div>

      <div className="bg-[#FDF6F0] border border-[#F3DFD1] rounded-lg p-2.5 text-[11px] text-[#C96F3B] leading-relaxed">
        <strong>Operating Rule:</strong> "Best Time" represents natural optimal lighting, temperature, or religious rituals. The itinerary engine calculates dynamic itinerary slot times separately to respect travel distance and opening windows.
      </div>

      <div>
        <label className="block text-[#4B5563] font-medium mb-1.5">
          Optimal Time of Day
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TIME_OF_DAY_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const isSelected = config.bestTimeOfDay === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                disabled={readOnly}
                onClick={() => onChange({ ...config, bestTimeOfDay: opt.value })}
                className={`flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#FDF6F0] border-[#C96F3B] text-[#C96F3B] ring-1 ring-[#C96F3B]/30'
                    : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-gray-300 hover:text-[#1F2937]'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#C96F3B]' : 'text-[#9CA3AF]'}`} />
                <div>
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[10px] text-[#6B7280] mt-0.5 leading-tight">{opt.hint}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[#4B5563] font-medium mb-1">
            Best Season Window
          </label>
          <input
            type="text"
            placeholder="e.g. October – March"
            value={config.bestSeason || ''}
            onChange={(e) => onChange({ ...config, bestSeason: e.target.value })}
            disabled={readOnly}
            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B] outline-none"
          />
        </div>

        <div>
          <label className="block text-[#4B5563] font-medium mb-1">
            Traveler Timing Rationale & Field Note
          </label>
          <input
            type="text"
            placeholder="e.g. 9:00 AM sharp to capture clear sunlight through stained glass"
            value={config.bestTimeDescription || ''}
            onChange={(e) => onChange({ ...config, bestTimeDescription: e.target.value })}
            disabled={readOnly}
            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C96F3B] focus:ring-1 focus:ring-[#C96F3B] outline-none"
          />
        </div>
      </div>
    </div>
  )
}
