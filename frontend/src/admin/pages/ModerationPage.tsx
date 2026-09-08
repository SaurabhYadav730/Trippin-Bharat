import React, { useState } from 'react'
import {
  MessageSquareWarning,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
  Eye,
  Star,
  Flag,
  Check,
  X,
} from 'lucide-react'
import { analyticsService, type UserReviewModeration } from '../services/analyticsService'

export const ModerationPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [refresh, setRefresh] = useState(0)

  const reviews = analyticsService.getReviews(statusFilter)

  const handleStatusChange = (
    id: string,
    newStatus: 'published' | 'hidden' | 'flagged',
    notes = ''
  ) => {
    analyticsService.updateReviewStatus(id, newStatus, notes)
    setRefresh((p) => p + 1)
  }

  return (
    <div className="space-y-4 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
            <MessageSquareWarning className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">Review Moderation & Trust Desk</h2>
            <p className="text-[#6B7280] mt-0.5">
              Preserve audit integrity. Hide spam or defamatory claims while maintaining transparent logs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'pending', 'flagged', 'published', 'hidden'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#C96F3B] text-white font-semibold shadow-sm'
                  : 'bg-gray-100 border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Queue List */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden divide-y divide-[#E5E7EB] shadow-sm">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 hover:bg-gray-50/80 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#1F2937]">{rev.userName}</span>
                <span className="text-[#6B7280]">&bull; {rev.userEmail}</span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    rev.status === 'published'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : rev.status === 'flagged'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : rev.status === 'hidden'
                      ? 'bg-gray-100 text-[#4B5563]'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {rev.status}
                </span>
                <span className="text-[#9CA3AF] text-[11px] font-mono">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="text-[#374151] bg-[#F9FAFB] p-3 rounded-xl border border-[#E5E7EB] leading-relaxed">
              "{rev.reviewText}"
            </div>

            {rev.flaggedReason && (
              <div className="text-red-600 text-[11px] font-medium flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5" />
                <span>Flagged Issue: {rev.flaggedReason}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[#6B7280] text-[11px]">
              <span>Target: {rev.entityName}</span>

              <div className="flex items-center gap-2">
                {rev.status !== 'published' && (
                  <button
                    onClick={() => handleStatusChange(rev.id, 'published')}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Publish</span>
                  </button>
                )}

                {rev.status !== 'hidden' && (
                  <button
                    onClick={() => handleStatusChange(rev.id, 'hidden', 'Hidden by Admin Desk')}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#4B5563] border border-[#E5E7EB] transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </button>
                )}

                {rev.status !== 'flagged' && (
                  <button
                    onClick={() => handleStatusChange(rev.id, 'flagged', 'Flagged for review')}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 transition-colors"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Flag</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
