import React, { useState } from 'react'
import {
  Play,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { tripLabService } from '../../services/tripLabService'
import { adminStorage } from '../../services/adminStorage'
import type { TripEngineSimulationResult } from '../../types/admin'

export const TripEngineLabView: React.FC = () => {
  const db = adminStorage.getDb()
  const [destinationSlug, setDestinationSlug] = useState<string>('udaipur')
  const [durationDays, setDurationDays] = useState<number>(3)
  const [budgetInr, setBudgetInr] = useState<number>(10000)
  const [travelStyle, setTravelStyle] = useState<string>('Heritage & Architecture')
  const [transportMode, setTransportMode] = useState<string>('mixed')
  const [mustVisitIds, setMustVisitIds] = useState<string[]>([
    'udaipur-city-palace',
    'udaipur-lake-pichola',
    'udaipur-jagdish-temple',
  ])
  const [simulationResult, setSimulationResult] = useState<TripEngineSimulationResult | null>(null)
  const [expandedStopId, setExpandedStopId] = useState<string | null>(null)
  const [stressTestResults, setStressTestResults] = useState<any[] | null>(null)

  const destinationAttractions = db.attractions.filter(
    (a) => a.destinationName.toLowerCase() === destinationSlug.toLowerCase()
  )

  const handleToggleMustVisit = (id: string) => {
    setMustVisitIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSimulate = () => {
    const res = tripLabService.simulateTrip({
      destinationSlug,
      destinationName: destinationSlug.toUpperCase(),
      durationDays,
      budgetTotalInr: budgetInr,
      travelStyle,
      transportMode,
      mustVisitPlaceIds: mustVisitIds,
    })
    setSimulationResult(res)
    setStressTestResults(null)
  }

  const handleRunStressTest = () => {
    const results = tripLabService.runBudgetStressTest(destinationSlug, durationDays)
    setStressTestResults(results)
  }

  // Auto run once
  React.useEffect(() => {
    handleSimulate()
  }, [])

  return (
    <div className="space-y-5 text-xs">
      {/* Header Banner */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1F2937]">
              Trip Engine Lab & Itinerary Algorithm Simulator
            </h2>
            <p className="text-[#6B7280] mt-0.5">
              Simulate Build My Trip results, verify constraint feasibility, and explain scoring decisions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunStressTest}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-semibold flex items-center gap-1.5 transition-colors border border-[#E5E7EB]"
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
            <span>Budget Stress Test</span>
          </button>
          <button
            onClick={handleSimulate}
            className="px-4 py-1.5 rounded-lg bg-[#C96F3B] hover:bg-[#B55F2D] text-white font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Trip</span>
          </button>
        </div>
      </div>

      {/* Grid: Simulation Parameters & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Configuration Controls */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-[#1F2937] pb-2 border-b border-[#E5E7EB] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C96F3B]" />
            <span>Traveler Scenario Setup</span>
          </h3>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Destination Target</label>
            <select
              value={destinationSlug}
              onChange={(e) => setDestinationSlug(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] outline-none focus:border-[#C96F3B]"
            >
              {db.destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}, {d.state}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={7}
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] outline-none focus:border-[#C96F3B]"
              />
            </div>

            <div>
              <label className="block text-[#4B5563] font-medium mb-1">Total Budget (₹ INR)</label>
              <input
                type="number"
                step={500}
                value={budgetInr}
                onChange={(e) => setBudgetInr(parseInt(e.target.value) || 2000)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono outline-none focus:border-[#C96F3B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Travel Style</label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] outline-none focus:border-[#C96F3B]"
            >
              <option value="Heritage & Architecture">Heritage & Architecture</option>
              <option value="Cultural & Spiritual">Cultural & Spiritual</option>
              <option value="Romantic & Leisure">Romantic & Leisure</option>
              <option value="Culinary Explorer">Culinary Explorer</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1">Transport Mode</label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] outline-none focus:border-[#C96F3B]"
            >
              <option value="auto_rickshaw">Auto Rickshaw & Walking</option>
              <option value="cab">Private AC Cab</option>
              <option value="mixed">Mixed Transit</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4B5563] font-medium mb-1.5">
              Must-Visit Priority Candidates ({mustVisitIds.length})
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 bg-gray-50 border border-[#E5E7EB] rounded-xl p-2">
              {destinationAttractions.map((a) => {
                const isSelected = mustVisitIds.includes(a.id)
                return (
                  <label
                    key={a.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#FDF6F0] border border-[#F3DFD1] text-[#C96F3B] font-medium'
                        : 'hover:bg-gray-100 text-[#4B5563]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleMustVisit(a.id)}
                        className="rounded border-[#E5E7EB] text-[#C96F3B] focus:ring-[#C96F3B]"
                      />
                      <span className="truncate">{a.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#9CA3AF]">
                      Score: {a.importanceScore}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Simulation Output & Explainability */}
        <div className="lg:col-span-2 space-y-4">
          {stressTestResults ? (
            /* Budget Stress Test Results Matrix */
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="font-bold text-[#1F2937]">Budget Tier Feasibility Stress Test</h3>
                  <p className="text-[#6B7280]">
                    Testing algorithm resilience across economic strata for {destinationSlug.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setStressTestResults(null)}
                  className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#1F2937] font-medium text-[11px]"
                >
                  Back to Simulation Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stressTestResults.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      t.feasible
                        ? 'bg-white border-emerald-200'
                        : 'bg-red-50/50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#1F2937]">{t.tier}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.feasible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {t.feasible ? 'FEASIBLE' : 'DEFICIT'}
                      </span>
                    </div>
                    <div className="text-lg font-mono font-bold text-[#1F2937]">
                      ₹{t.budgetInr.toLocaleString()}
                    </div>
                    <div className="text-[#6B7280] mt-1">
                      Estimated Itinerary Cost: ₹{t.totalCost.toLocaleString()}
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#9CA3AF]">
                      Feasibility Health: {t.feasibilityScore}/100
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : simulationResult ? (
            <>
              {/* Top KPI Metrics Strip */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                  <div className="text-[#6B7280] text-[11px]">Plan Health Score</div>
                  <div className="text-lg font-bold text-emerald-600 font-mono mt-0.5">
                    {simulationResult.planFeasibilityScore} / 100
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                  <div className="text-[#6B7280] text-[11px]">Total Estimated Cost</div>
                  <div className="text-lg font-bold text-[#1F2937] font-mono mt-0.5">
                    ₹{simulationResult.totalEstimatedCost.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                  <div className="text-[#6B7280] text-[11px]">Budget Variance</div>
                  <div
                    className={`text-lg font-bold font-mono mt-0.5 ${
                      simulationResult.budgetSurplusDeficit >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {simulationResult.budgetSurplusDeficit >= 0 ? '+' : ''}₹
                    {simulationResult.budgetSurplusDeficit.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                  <div className="text-[#6B7280] text-[11px]">Planned Stops</div>
                  <div className="text-lg font-bold text-[#1F2937] font-mono mt-0.5">
                    {simulationResult.itineraryDays.reduce((acc, d) => acc + d.stops.length, 0)} Places
                  </div>
                </div>
              </div>

              {/* Warnings if any */}
              {simulationResult.warnings.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-amber-800">
                  {simulationResult.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Day-by-Day Itinerary with Explainability Breakdown */}
              <div className="space-y-4">
                {simulationResult.itineraryDays.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                      <div>
                        <span className="font-bold text-[#C96F3B] uppercase tracking-wider text-[11px]">
                          Day {day.dayNumber}
                        </span>
                        <h4 className="text-sm font-bold text-[#1F2937] mt-0.5">{day.themeTitle}</h4>
                      </div>
                      <div className="text-right font-mono text-[#6B7280] text-[11px]">
                        <span>₹{day.totalCost}</span> &bull; <span>{day.totalDistanceKm} km</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {day.stops.map((stop) => {
                        const isExpanded = expandedStopId === stop.id
                        return (
                          <div
                            key={stop.id}
                            className="p-3 bg-gray-50 border border-[#E5E7EB] rounded-xl space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[#4B5563] bg-white border border-[#E5E7EB] px-2 py-0.5 rounded text-[11px]">
                                  {stop.timeSlot}
                                </span>
                                <span className="font-bold text-[#1F2937]">{stop.placeName}</span>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FDF6F0] text-[#C96F3B] border border-[#F3DFD1]">
                                  Score: {stop.scoring.finalScore.toFixed(1)}
                                </span>
                                <button
                                  onClick={() => setExpandedStopId(isExpanded ? null : stop.id)}
                                  className="flex items-center gap-1 text-[11px] text-[#C96F3B] hover:underline font-medium"
                                >
                                  <span>Why was this chosen?</span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* "Why was this chosen?" Scoring Explanation Card */}
                            {isExpanded && (
                              <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg space-y-2 animate-in fade-in duration-150">
                                <div className="font-bold text-[#1F2937] text-[11px]">
                                  Algorithmic Selection Drivers:
                                </div>
                                <div className="space-y-1">
                                  {stop.scoring.positiveFactors.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-emerald-700">
                                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                  {stop.scoring.negativeFactors.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-amber-800">
                                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#9CA3AF]">
                                  <span>Distance from previous: {stop.distanceFromPrevKm} km</span>
                                  <span>Scheduled duration: {stop.durationMin} minutes</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-[#9CA3AF]">
              Run simulation to evaluate itinerary algorithm.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
