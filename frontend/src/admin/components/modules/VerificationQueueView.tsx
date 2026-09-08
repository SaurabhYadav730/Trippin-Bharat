import React, { useState } from 'react'
import { CheckCircle2, XCircle, ShieldCheck, Clock, FileText, AlertCircle } from 'lucide-react'
import { adminService } from '../../services/adminService'
import type { VerificationRequest } from '../../types/admin'

export const VerificationQueueView: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>(
    adminService.getVerificationRequests()
  )
  const [selectedReq, setSelectedReq] = useState<VerificationRequest | null>(null)
  const [reviewerNotes, setReviewerNotes] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleAction = (action: 'approve' | 'reject') => {
    if (!selectedReq) return
    const success = adminService.resolveVerification(
      selectedReq.id,
      action,
      reviewerNotes || (action === 'approve' ? 'Approved by Admin' : 'Changes requested by Admin'),
      'Admin',
      'Admin'
    )
    if (success) {
      setRequests(adminService.getVerificationRequests())
      setSelectedReq(null)
      setReviewerNotes('')
      setSuccessMessage(
        action === 'approve'
          ? `Verified & published "${selectedReq.entityName}".`
          : `Rejected update for "${selectedReq.entityName}".`
      )
      setTimeout(() => setSuccessMessage(''), 4000)
    }
  }

  return (
    <div className="space-y-4 text-xs">
      {/* Top Banner */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1F2937]">Tourism Data Verification Queue</h2>
            <p className="text-[#6B7280] mt-0.5">
              Reviewer validation workflow for field pricing, opening schedules, and official ASI updates.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full font-mono text-amber-700 bg-amber-50 border border-amber-200 font-bold">
          {requests.filter((r) => r.currentStatus === 'pending_review').length} Pending Review
        </span>
      </div>

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[#6B7280] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Entity & Destination</th>
              <th className="px-4 py-3">Change Summary</th>
              <th className="px-4 py-3">Submitted By</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-bold text-[#1F2937]">{req.entityName}</div>
                  <div className="text-[11px] text-[#6B7280]">
                    <span className="uppercase font-semibold text-[#4B5563]">{req.entityType}</span> &bull; {req.destinationName}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[#374151] max-w-md">{req.changesSummary}</td>
                <td className="px-4 py-3.5 text-[#6B7280]">
                  <div>{req.submittedBy}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{new Date(req.submittedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      req.currentStatus === 'verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : req.currentStatus === 'pending_review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {req.currentStatus.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  {req.currentStatus === 'pending_review' ? (
                    <button
                      onClick={() => setSelectedReq(req)}
                      className="px-3 py-1.5 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold shadow-sm transition-colors"
                    >
                      Inspect & Review
                    </button>
                  ) : (
                    <span className="text-[#9CA3AF] text-[11px]">
                      {req.verifiedBy} ({new Date(req.verifiedAt || '').toLocaleDateString()})
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review & Decision Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                  Verification Audit
                </span>
                <h3 className="text-sm font-bold text-[#1F2937] mt-1">{selectedReq.entityName}</h3>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="text-[#6B7280] hover:text-[#1F2937]"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-2">
              <div className="text-[#1F2937] font-semibold">Change Description:</div>
              <p className="text-[#4B5563]">{selectedReq.changesSummary}</p>
              {selectedReq.sourceProof && (
                <div className="pt-2 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
                  <strong>Verification Proof: </strong>
                  {selectedReq.sourceProof}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Reviewer Feedback Notes</label>
              <textarea
                rows={3}
                placeholder="Add audit justification note..."
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl p-3 text-[#1F2937] focus:ring-1 focus:ring-[#C96F3B] focus:border-[#C96F3B] outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAction('reject')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-semibold transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Changes</span>
              </button>
              <button
                type="button"
                onClick={() => handleAction('approve')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Publish Live</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
