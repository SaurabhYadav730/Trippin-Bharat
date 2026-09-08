import React from 'react'
import {
  LayoutDashboard,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Landmark,
  Hotel,
  Utensils,
  Sliders,
  Plus,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  GitMerge,
  Sparkles,
} from 'lucide-react'
import { adminStorage } from '../services/adminStorage'
import { dataQualityService } from '../services/dataQualityService'

interface AdminDashboardPageProps {
  onNavigate: (section: string) => void
  onOpenQuickAdd: () => void
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onOpenQuickAdd,
}) => {
  const db = adminStorage.getDb()
  const dataQualityScan = dataQualityService.scanPlatformDataQuality()

  const pendingVerifications = db.verifications.filter((v) => v.currentStatus === 'pending_review')
  const pendingDuplicates = db.duplicatePairs.filter((p) => p.status === 'pending')

  const verifiedAttractionsCount = db.attractions.filter((a) => a.verificationStatus === 'verified').length
  const totalAttractions = db.attractions.length
  const verifiedPercentage = totalAttractions > 0 ? Math.round((verifiedAttractionsCount / totalAttractions) * 100) : 100

  return (
    <div className="space-y-6 text-xs animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="p-6 bg-white border border-[#E5E7EB] rounded-3xl relative overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] font-bold">
                OPERATIONAL DASHBOARD &bull; YĀTRA ADMIN
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">
              Good Morning, Operations Lead
            </h1>
            <p className="text-[#6B7280] max-w-xl text-xs leading-relaxed">
              Platform status is operating at <strong className="text-emerald-700 font-semibold">{dataQualityScan.overallHealthPercent}% data integrity</strong>. 
              {dataQualityScan.summaryCounts.critical > 0
                ? ` ${dataQualityScan.summaryCounts.critical} critical data issues require your immediate review.`
                : ' All essential tourism coordinates and itineraries are verified.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('trip-lab')}
              className="px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#1F2937] font-semibold flex items-center gap-2 border border-[#E5E7EB] transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#C96F3B]" />
              <span>Trip Engine Lab</span>
            </button>
            <button
              onClick={onOpenQuickAdd}
              className="px-4 py-2 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Entity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Destinations */}
        <div
          onClick={() => onNavigate('destinations')}
          className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="font-semibold">Destinations</span>
            <MapPin className="w-4 h-4 text-[#C96F3B]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#1F2937]">{db.destinations.length}</div>
          <div className="text-[11px] text-[#6B7280] mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-semibold">100%</span> verified coverage
          </div>
        </div>

        {/* Attractions */}
        <div
          onClick={() => onNavigate('attractions')}
          className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="font-semibold">Attractions</span>
            <Landmark className="w-4 h-4 text-[#C96F3B]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#1F2937]">{db.attractions.length}</div>
          <div className="text-[11px] text-[#6B7280] mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-semibold">{verifiedPercentage}%</span> ASI verified
          </div>
        </div>

        {/* Hotels */}
        <div
          onClick={() => onNavigate('hotels')}
          className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="font-semibold">Hotels & Stays</span>
            <Hotel className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#1F2937]">{db.hotels.length}</div>
          <div className="text-[11px] text-[#6B7280] mt-1">
            Heritage Haveli & Luxury
          </div>
        </div>

        {/* Restaurants */}
        <div
          onClick={() => onNavigate('restaurants')}
          className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="font-semibold">Dining & Cuisine</span>
            <Utensils className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#1F2937]">{db.restaurants.length}</div>
          <div className="text-[11px] text-[#6B7280] mt-1">
            Regional specialties & Thalis
          </div>
        </div>
      </div>

      {/* Operational Attention Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Needs Attention Queue */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 font-bold text-[#1F2937]">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Needs Operational Attention</span>
            </div>
            <span className="text-[11px] text-[#6B7280] font-mono">
              {pendingVerifications.length + pendingDuplicates.length + dataQualityScan.summaryCounts.critical} queues active
            </span>
          </div>

          <div className="space-y-3">
            {/* Verification Queue Alert */}
            {pendingVerifications.length > 0 && (
              <div
                onClick={() => onNavigate('verification')}
                className="p-3.5 rounded-xl bg-gray-50 border border-[#E5E7EB] hover:border-gray-300 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1F2937]">
                      {pendingVerifications.length} Field Verification Requests Pending
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Updated monument tickets and special hours awaiting reviewer approval.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </div>
            )}

            {/* Duplicate Candidates Alert */}
            {pendingDuplicates.length > 0 && (
              <div
                onClick={() => onNavigate('attractions')}
                className="p-3.5 rounded-xl bg-gray-50 border border-[#E5E7EB] hover:border-gray-300 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    <GitMerge className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1F2937]">
                      {pendingDuplicates.length} Possible Duplicate Pairs Detected
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      High string & geographic similarity. Resolve via side-by-side merge tool.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </div>
            )}

            {/* Critical Data Quality Issues */}
            {dataQualityScan.summaryCounts.critical > 0 && (
              <div
                onClick={() => onNavigate('data-quality')}
                className="p-3.5 rounded-xl bg-gray-50 border border-[#E5E7EB] hover:border-gray-300 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-50 text-red-700 border border-red-200">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1F2937]">
                      {dataQualityScan.summaryCounts.critical} Critical Records Missing Data
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      Missing opening hours or GPS coordinates will impair itinerary generation.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Trip Engine Health Strip */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 font-bold text-[#1F2937]">
              <Sliders className="w-4 h-4 text-[#C96F3B]" />
              <span>Trip Engine Health</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              ONLINE
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-1">
              <div className="text-[#6B7280] text-[11px]">Today's Live Plan Generations</div>
              <div className="text-xl font-bold font-mono text-[#1F2937]">184</div>
            </div>

            <div className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-1">
              <div className="text-[#6B7280] text-[11px]">Average Plan Health Score</div>
              <div className="text-xl font-bold font-mono text-emerald-700">92 / 100</div>
            </div>

            <div className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-1">
              <div className="text-[#6B7280] text-[11px]">Budget-Fit Feasibility Rate</div>
              <div className="text-xl font-bold font-mono text-[#1F2937]">88.4%</div>
            </div>

            <button
              onClick={() => onNavigate('trip-lab')}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Launch Algorithm Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C96F3B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
