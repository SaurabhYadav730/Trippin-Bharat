import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Calendar, ArrowRight, X } from 'lucide-react'
import type { ConstraintValidationResult } from '../../services/planner/TripPlanningTypes'

interface ConstraintConflictModalProps {
  validation: ConstraintValidationResult
  onIncreaseDays: () => void
  onExtendHours: () => void
  onAdjustPriorities: () => void
  onProceedAnyway: () => void
  onClose: () => void
}

export default function ConstraintConflictModal({
  validation,
  onIncreaseDays,
  onExtendHours,
  onAdjustPriorities,
  onProceedAnyway,
  onClose,
}: ConstraintConflictModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 z-10 space-y-6"
      >
        {/* Warning Icon & Heading */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-600">
                Constraint Capacity Alert
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Selected Places Need More Time
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Diagnostic Card */}
        <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2.5">
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {validation.message}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-rose-200/60 text-center">
            <div className="p-2.5 bg-white rounded-xl border border-rose-100">
              <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                <Clock size={12} />
                <span>Required Time</span>
              </div>
              <div className="text-base font-black text-rose-600 mt-0.5">
                ~{validation.totalSightseeingHoursRequired} Hours
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-rose-100">
              <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                <Calendar size={12} />
                <span>Available Window</span>
              </div>
              <div className="text-base font-black text-slate-800 mt-0.5">
                ~{validation.totalAvailableSightseeingHours} Hours
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Choices */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500">
            How would you like to resolve this?
          </label>

          <div className="space-y-2">
            <button
              onClick={onIncreaseDays}
              className="w-full p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-950 text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <div className="font-black text-blue-800">Add +1 Day to Trip</div>
                <div className="text-[11px] text-blue-600">
                  Spread all sights comfortably without rushing
                </div>
              </div>
              <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExtendHours}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <div className="font-black">Extend Daily Hours (8:00 AM – 9:30 PM)</div>
                <div className="text-[11px] text-slate-500">
                  Allow more hours each day to cover everything
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onAdjustPriorities}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <div className="font-black">Adjust Priorities</div>
                <div className="text-[11px] text-slate-500">
                  Change some places to "Want to Visit" or "Optional"
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onProceedAnyway}
              className="w-full py-3 text-center text-xs font-extrabold text-slate-500 hover:text-slate-900 cursor-pointer pt-2"
            >
              Keep My Choices & Let Optimizer Fit Best Feasible Sequence →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
