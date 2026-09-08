import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Sliders,
  Sparkles,
  Lock,
  PlusCircle,
  Move,
  Trash2,
} from 'lucide-react'
import { analyticsService } from '../services/analyticsService'

export const AnalyticsPage: React.FC = () => {
  const metrics = analyticsService.getPlatformMetrics()
  const recommendations = analyticsService.getRecommendationAnalytics()

  return (
    <div className="space-y-6 text-xs animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-600">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">
              Platform & Build My Trip Intelligence
            </h2>
            <p className="text-[#6B7280] mt-0.5">
              Behavioral analytics tracking traveler itinerary choices, recommendation acceptance, and budget feasibility.
            </p>
          </div>
        </div>

        <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold text-xs">
          Active Travelers Today: {metrics.activeUsersDaily.toLocaleString()}
        </span>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Monthly Trips Generated</div>
          <div className="text-2xl font-bold font-mono text-[#1F2937] mt-1">
            {metrics.tripsCreatedMonthly.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">+{metrics.tripsCreatedToday} today</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Average Planned Duration</div>
          <div className="text-2xl font-bold font-mono text-[#1F2937] mt-1">
            {metrics.avgTripDurationDays} Days
          </div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">3–4 days mode</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Average Trip Budget</div>
          <div className="text-2xl font-bold font-mono text-[#1F2937] mt-1">
            ₹{metrics.avgTripBudgetInr.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">Comfort tier majority</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Algorithm Budget-Fit Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            {metrics.budgetFitRatePercent}%
          </div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">Feasible within budget</div>
        </div>
      </div>

      {/* Two Column Layout: Recommendation Acceptance & User Action Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recommendation Acceptance Matrix */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 font-bold text-[#1F2937]">
              <Sparkles className="w-4 h-4 text-[#C96F3B]" />
              <span>Recommendation Engine Acceptance Rates</span>
            </div>
            <span className="text-[11px] text-[#6B7280]">Shown vs Added</span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1F2937]">{rec.placeName}</span>
                    <span className="text-[#6B7280] ml-2">&bull; {rec.category}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {rec.acceptanceRate}% Acceptance
                  </span>
                </div>

                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C96F3B] rounded-full"
                    style={{ width: `${rec.acceptanceRate}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#6B7280] font-mono">
                  <span>Impressions: {rec.impressionsCount}</span>
                  <span>Added to trip: {rec.acceptedCount} times</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Itinerary Action Distribution (Add, Lock, Reorder, Remove) */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 font-bold text-[#1F2937]">
              <Sliders className="w-4 h-4 text-[#C96F3B]" />
              <span>Traveler Itinerary Interactions</span>
            </div>
            <span className="text-[11px] text-[#6B7280] font-mono">Build My Trip telemetry</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1F2937]">Added to Custom Route</div>
                  <div className="text-[11px] text-[#6B7280]">User affirmatively added places</div>
                </div>
              </div>
              <div className="text-base font-bold font-mono text-emerald-700">68%</div>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1F2937]">Locked as Must-Visit</div>
                  <div className="text-[11px] text-[#6B7280]">Traveler forced place into plan</div>
                </div>
              </div>
              <div className="text-base font-bold font-mono text-purple-700">24%</div>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                  <Move className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1F2937]">Manually Reordered</div>
                  <div className="text-[11px] text-[#6B7280]">Dragged stop to different slot</div>
                </div>
              </div>
              <div className="text-base font-bold font-mono text-blue-700">18%</div>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1F2937]">Removed from Plan</div>
                  <div className="text-[11px] text-[#6B7280]">Excluded suggested destination stop</div>
                </div>
              </div>
              <div className="text-base font-bold font-mono text-red-700">8%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
