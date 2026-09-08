import React, { useState } from 'react'
import { UploadCloud, FileText, Undo2, CheckCircle2, AlertTriangle, Layers } from 'lucide-react'
import { importService } from '../services/importService'
import { ImportWizardModal } from '../components/modules/ImportWizardModal'

export const ImportsPage: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const batches = importService.getBatches()

  const handleRollback = (batchId: string) => {
    if (confirm(`Are you sure you want to rollback import batch "${batchId}"? This will undo all changes made by this batch.`)) {
      importService.rollbackBatch(batchId, 'Admin', 'Admin')
      setRefresh((p) => p + 1)
    }
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Tourism Data Ingestion & Batch Rollback</h2>
            <p className="text-[#6B7280] mt-0.5">
              Strict schema pre-validation, change preview, and 1-click historical batch rollbacks.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowWizard(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-all"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Launch Import Wizard</span>
        </button>
      </div>

      {/* Batches Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <span className="font-bold text-[#1F2937]">Historical Import Batches ({batches.length})</span>
          <span className="text-[11px] text-[#6B7280]">Every import retains rollback snapshots</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Batch Identifier</th>
              <th className="px-4 py-3">File Source</th>
              <th className="px-4 py-3">Target Entity</th>
              <th className="px-4 py-3">Inserted / Updated</th>
              <th className="px-4 py-3">Ingestion Timestamp</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Rollback Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-sans">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-[#C96F3B]">{b.id}</td>
                <td className="px-4 py-3.5 text-[#1F2937] font-medium">{b.fileName}</td>
                <td className="px-4 py-3.5 uppercase font-mono text-[10px] text-[#6B7280]">
                  {b.entityType}
                </td>
                <td className="px-4 py-3.5 text-[#374151]">
                  <span className="text-emerald-700 font-semibold">+{b.insertedCount}</span> new &bull;{' '}
                  <span className="text-blue-700 font-semibold">~{b.updatedCount}</span> updated
                </td>
                <td className="px-4 py-3.5 text-[#6B7280] font-mono text-[11px]">
                  {new Date(b.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      b.status === 'applied'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-[#4B5563]'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  {b.status === 'applied' ? (
                    <button
                      onClick={() => handleRollback(b.id)}
                      className="flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-semibold transition-colors"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Rollback Batch</span>
                    </button>
                  ) : (
                    <span className="text-[#9CA3AF] text-[11px] italic">Reverted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Import Wizard Modal */}
      <ImportWizardModal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onSuccess={() => setRefresh((p) => p + 1)}
      />
    </div>
  )
}
