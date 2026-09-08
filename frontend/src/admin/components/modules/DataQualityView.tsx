import React, { useState } from 'react'
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Image,
} from 'lucide-react'
import { dataQualityService } from '../../services/dataQualityService'
import type { DataQualityIssue } from '../../types/admin'

interface DataQualityViewProps {
  onNavigateToEntity?: (entityType: string, entityId: string) => void
}

export const DataQualityView: React.FC<DataQualityViewProps> = ({ onNavigateToEntity }) => {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const scan = dataQualityService.scanPlatformDataQuality()

  let filteredIssues = scan.issues
  if (severityFilter !== 'all') {
    filteredIssues = filteredIssues.filter((i) => i.severity === severityFilter)
  }
  if (typeFilter !== 'all') {
    filteredIssues = filteredIssues.filter((i) => i.issueType === typeFilter)
  }

  return (
    <div className="space-y-5 text-xs">
      {/* Top Health Metric Banner */}
      <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#C96F3B] font-bold uppercase tracking-wider text-[10px]">
            <ShieldAlert className="w-4 h-4" />
            <span>Platform Data Quality Intelligence</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1F2937]">
            {scan.overallHealthPercent}% Health Integrity Score
          </h2>
          <p className="text-[#6B7280] max-w-xl">
            Continuous automated heuristic audit across coordinates, weekly opening schedules, best-time metadata, and photo licensing.
          </p>
        </div>

        {/* Severity Metrics */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setSeverityFilter('critical')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              severityFilter === 'critical'
                ? 'bg-red-50 border-red-300 ring-1 ring-red-400'
                : 'bg-white border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <div className="text-lg font-bold font-mono text-red-600">
              {scan.summaryCounts.critical}
            </div>
            <div className="text-[11px] text-[#6B7280] font-medium">Critical Action Items</div>
          </div>

          <div
            onClick={() => setSeverityFilter('warning')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              severityFilter === 'warning'
                ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400'
                : 'bg-white border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <div className="text-lg font-bold font-mono text-amber-600">
              {scan.summaryCounts.warning}
            </div>
            <div className="text-[11px] text-[#6B7280] font-medium">Warnings</div>
          </div>

          <div
            onClick={() => setSeverityFilter('info')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              severityFilter === 'info'
                ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-400'
                : 'bg-white border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <div className="text-lg font-bold font-mono text-blue-600">
              {scan.summaryCounts.info}
            </div>
            <div className="text-[11px] text-[#6B7280] font-medium">Info Notes</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSeverityFilter('all')
              setTypeFilter('all')
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              severityFilter === 'all' && typeFilter === 'all'
                ? 'bg-[#C96F3B] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            All Issues ({scan.issues.length})
          </button>
          <button
            onClick={() => setTypeFilter('missing_coordinates')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              typeFilter === 'missing_coordinates'
                ? 'bg-[#C96F3B] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Coordinates
          </button>
          <button
            onClick={() => setTypeFilter('missing_best_time')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              typeFilter === 'missing_best_time'
                ? 'bg-[#C96F3B] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Best Time
          </button>
          <button
            onClick={() => setTypeFilter('missing_opening_hours')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              typeFilter === 'missing_opening_hours'
                ? 'bg-[#C96F3B] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Opening Hours
          </button>
          <button
            onClick={() => setTypeFilter('duplicate_candidate')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              typeFilter === 'duplicate_candidate'
                ? 'bg-[#C96F3B] text-white shadow-sm'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            Duplicates
          </button>
        </div>

        <span className="text-[#6B7280]">
          Showing {filteredIssues.length} items
        </span>
      </div>

      {/* Issues Queue Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden divide-y divide-[#E5E7EB] shadow-sm">
        {filteredIssues.length === 0 ? (
          <div className="p-12 text-center text-[#9CA3AF]">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
            <p className="font-semibold text-[#1F2937]">All records meet production quality standards!</p>
            <p className="text-xs text-[#9CA3AF] mt-1">No issues detected in current filter view.</p>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isCritical = issue.severity === 'critical'
            const isWarning = issue.severity === 'warning'
            return (
              <div
                key={issue.id}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      isCritical
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : isWarning
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1F2937]">{issue.entityName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-100 text-[#4B5563]">
                        {issue.entityType}
                      </span>
                      <span className="text-[#9CA3AF]">&bull; {issue.destinationName}</span>
                    </div>
                    <p className="text-[#374151] font-medium">{issue.message}</p>
                    <p className="text-[#6B7280] text-[11px]">{issue.recommendation}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToEntity?.(issue.entityType, issue.entityId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-semibold transition-colors shrink-0"
                >
                  <span>Resolve</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C96F3B]" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
