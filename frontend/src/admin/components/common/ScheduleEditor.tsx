import React from 'react'
import { Plus, Trash2, Clock, AlertCircle } from 'lucide-react'
import type { WeeklySchedule, DaySchedule, TimeWindow } from '../../types/admin'

interface ScheduleEditorProps {
  schedule: WeeklySchedule
  onChange: (updated: WeeklySchedule) => void
  readOnly?: boolean
}

const DAYS: Array<keyof WeeklySchedule> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const ScheduleEditor: React.FC<ScheduleEditorProps> = ({ schedule, onChange, readOnly = false }) => {
  const handleToggleDay = (day: keyof WeeklySchedule) => {
    if (readOnly) return
    const current = schedule[day]
    const updatedDay: DaySchedule = {
      ...current,
      isOpen: !current.isOpen,
      windows: !current.isOpen && current.windows.length === 0 ? [{ open: '09:00', close: '18:00' }] : current.windows,
    }
    onChange({ ...schedule, [day]: updatedDay })
  }

  const handleAddWindow = (day: keyof WeeklySchedule) => {
    if (readOnly) return
    const current = schedule[day]
    const updatedWindows = [...current.windows, { open: '14:00', close: '18:00' }]
    onChange({
      ...schedule,
      [day]: { ...current, windows: updatedWindows },
    })
  }

  const handleRemoveWindow = (day: keyof WeeklySchedule, index: number) => {
    if (readOnly) return
    const current = schedule[day]
    const updatedWindows = current.windows.filter((_, i) => i !== index)
    onChange({
      ...schedule,
      [day]: { ...current, windows: updatedWindows },
    })
  }

  const handleTimeChange = (
    day: keyof WeeklySchedule,
    index: number,
    field: 'open' | 'close',
    value: string
  ) => {
    if (readOnly) return
    const current = schedule[day]
    const updatedWindows = current.windows.map((win, i) => (i === index ? { ...win, [field]: value } : win))
    onChange({
      ...schedule,
      [day]: { ...current, windows: updatedWindows },
    })
  }

  const handleSpecialNoteChange = (day: keyof WeeklySchedule, note: string) => {
    if (readOnly) return
    const current = schedule[day]
    onChange({
      ...schedule,
      [day]: { ...current, specialNote: note },
    })
  }

  return (
    <div className="space-y-3 bg-white border border-[#E5E7EB] rounded-xl p-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 text-[#1F2937] font-semibold">
          <Clock className="w-4 h-4 text-[#C96F3B]" />
          <span>Weekly Operating Hours (Multi-Window Timings)</span>
        </div>
        <span className="text-[11px] text-[#9CA3AF]">24-hour format (HH:MM)</span>
      </div>

      <div className="space-y-2.5">
        {DAYS.map((day) => {
          const dayData = schedule[day] || { isOpen: false, windows: [] }
          return (
            <div
              key={day}
              className={`p-3 rounded-lg border transition-all ${
                dayData.isOpen
                  ? 'bg-white border-[#E5E7EB]'
                  : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-[120px]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={dayData.isOpen}
                      onChange={() => handleToggleDay(day)}
                      disabled={readOnly}
                      className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                    />
                    <span className="capitalize font-semibold text-[#1F2937]">{day}</span>
                  </label>
                  {!dayData.isOpen && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-[#6B7280]">
                      CLOSED
                    </span>
                  )}
                </div>

                {dayData.isOpen && (
                  <div className="flex-1 flex flex-wrap items-center gap-2">
                    {dayData.windows.map((win, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 bg-[#F7F8FA] border border-[#E5E7EB] rounded px-2 py-1 text-[#1F2937]"
                      >
                        <input
                          type="time"
                          value={win.open}
                          onChange={(e) => handleTimeChange(day, idx, 'open', e.target.value)}
                          disabled={readOnly}
                          className="bg-transparent border-0 p-0 text-xs focus:ring-0 text-[#1F2937]"
                        />
                        <span className="text-[#9CA3AF]">to</span>
                        <input
                          type="time"
                          value={win.close}
                          onChange={(e) => handleTimeChange(day, idx, 'close', e.target.value)}
                          disabled={readOnly}
                          className="bg-transparent border-0 p-0 text-xs focus:ring-0 text-[#1F2937]"
                        />
                        {!readOnly && dayData.windows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveWindow(day, idx)}
                            className="text-[#9CA3AF] hover:text-red-600 ml-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}

                    {!readOnly && dayData.windows.length < 3 && (
                      <button
                        type="button"
                        onClick={() => handleAddWindow(day)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded border border-dashed border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:border-gray-400 text-[11px]"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Slot</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {dayData.isOpen && (
                <div className="mt-2 pt-2 border-t border-[#E5E7EB] flex items-center gap-2">
                  <span className="text-[11px] text-[#6B7280]">Special Note:</span>
                  <input
                    type="text"
                    placeholder="e.g. Evening folk dance starts at 7:00 PM; Aarti at 5:30 AM"
                    value={dayData.specialNote || ''}
                    onChange={(e) => handleSpecialNoteChange(day, e.target.value)}
                    disabled={readOnly}
                    className="flex-1 bg-transparent border-0 text-[11px] text-[#1F2937] placeholder-[#9CA3AF] focus:ring-0 p-0"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
