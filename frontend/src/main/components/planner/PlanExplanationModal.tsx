import { motion } from 'framer-motion'
import {
  Sparkles,
  X,
  Compass,
  Clock,
  MapPin,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import type { PlanExplanationItem, PlanHealthMetrics } from '../../services/planner/TripPlanningTypes'

interface PlanExplanationModalProps {
  logs: PlanExplanationItem[]
  health: PlanHealthMetrics
  destinationName: string
  onClose: () => void
}

export default function PlanExplanationModal({
  logs,
  health,
  destinationName,
  onClose,
}: PlanExplanationModalProps) {
  const getIcon = (type: PlanExplanationItem['type']) => {
    switch (type) {
      case 'timing':
        return <Clock size={16} className="text-amber-500" />
      case 'proximity':
        return <MapPin size={16} className="text-blue-500" />
      case 'meal':
        return <UtensilsCrossed size={16} className="text-emerald-500" />
      case 'closure':
        return <AlertCircle size={16} className="text-rose-500" />
      case 'budget':
      default:
        return <Sparkles size={16} className="text-purple-500" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto z-10 space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider mb-2">
              <Compass size={14} className="text-blue-600" />
              <span>Algorithmic Explainability</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-display">
              Why Was Your {destinationName} Trip Arranged This Way?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Transparent, non-black-box breakdown of every routing, timing, and priority decision.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Plan Health Score Summary */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-widest text-amber-400">
              Plan Health Score
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black border border-emerald-500/30">
              <CheckCircle2 size={13} />
              <span>{health.label}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{health.score}</span>
            <span className="text-slate-400 font-bold text-sm">/ 100 Feasibility Score</span>
          </div>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {health.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
            {health.factors.map((f, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      f.rating === 'positive'
                        ? 'bg-emerald-400'
                        : f.rating === 'warning'
                        ? 'bg-amber-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <span>{f.name}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 leading-snug">{f.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Breakdown Logs */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Algorithmic Decisions & Constraints
          </h4>

          <div className="space-y-2.5">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                    {getIcon(log.type)}
                  </div>
                  <div className="text-xs font-black text-slate-900">
                    {log.title}
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed pl-9">
                  {log.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SIH Note */}
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5 font-medium">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>
            <strong>User Chooses, System Optimizes:</strong> Every stop and timing was generated using verified geo-coordinates, entry timings, and hard user constraints.
          </span>
        </div>
      </motion.div>
    </div>
  )
}
