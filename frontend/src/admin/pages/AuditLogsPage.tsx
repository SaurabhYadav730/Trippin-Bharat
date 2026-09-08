import React, { useState } from 'react'
import {
  History,
  Search,
  Check,
  Eye,
  ArrowRight,
  ShieldAlert,
  Calendar,
  User,
  Filter,
  X,
} from 'lucide-react'
import { auditService } from '../services/auditService'
import { DiffViewer } from '../components/common/DiffViewer'
import type { AuditLogEntry } from '../types/admin'

export const AuditLogsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [entityFilter, setEntityFilter] = useState('all')
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null)

  const logs = auditService.getLogs({
    search,
    entityType: entityFilter,
  })

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-[#C96F3B]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Audit Trail & Entity Revision History</h2>
            <p className="text-[#6B7280] mt-0.5">
              Cryptographically timestamped operational log with JSON differential states and rollback safety.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl px-3 py-1.5 focus:border-[#C96F3B] outline-none"
          >
            <option value="all">All Entity Types</option>
            <option value="destination">Destinations</option>
            <option value="attraction">Attractions</option>
            <option value="restaurant">Restaurants</option>
            <option value="hotel">Hotels</option>
            <option value="media">Media</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#C96F3B] outline-none w-48"
            />
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Operator</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity & Destination</th>
              <th className="px-4 py-3">Summary of Modification</th>
              <th className="px-4 py-3 text-right">Differential</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-sans">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 font-mono text-[#6B7280] text-[11px]">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-bold text-[#1F2937]">{log.adminUser}</div>
                  <div className="text-[10px] text-[#C96F3B] font-mono">{log.role}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      log.action === 'CREATE'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : log.action === 'VERIFY'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : log.action === 'MERGE'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : log.action === 'DELETE' || log.action === 'ROLLBACK'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-gray-100 text-[#4B5563]'
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-bold text-[#1F2937]">{log.entityName}</div>
                  <div className="text-[10px] uppercase font-mono text-[#9CA3AF]">{log.entityType}</div>
                </td>
                <td className="px-4 py-3.5 text-[#4B5563] max-w-md leading-snug">
                  {log.summary}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#374151] border border-[#E5E7EB] font-medium text-[11px] transition-colors"
                  >
                    View Diff
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diff Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-3xl w-full p-6 text-xs shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <span className="font-mono text-[10px] text-[#9CA3AF] uppercase">
                  Audit ID: {selectedLog.id}
                </span>
                <h3 className="font-bold text-[#1F2937] text-sm mt-0.5">
                  {selectedLog.action} on {selectedLog.entityName}
                </h3>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-[#9CA3AF] hover:text-[#1F2937]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <DiffViewer
              title="Recorded Audit State Diff"
              previousState={selectedLog.previousState}
              newState={selectedLog.newState}
              fieldChanges={selectedLog.fieldChanges}
            />

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-[#6B7280]">
              <span>
                Executed by <strong>{selectedLog.adminUser}</strong> ({selectedLog.role}) at {new Date(selectedLog.timestamp).toISOString()}
              </span>
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#374151] font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
