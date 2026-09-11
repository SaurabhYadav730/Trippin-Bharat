import { motion } from 'framer-motion'
import { Printer, X, Download, MapPin, Calendar, Clock, Wallet } from 'lucide-react'
import type { PlannedTrip } from '../../services/planner/TripPlanningTypes'

interface TripExportModalProps {
  trip: PlannedTrip
  onClose: () => void
}

export default function TripExportModal({ trip, onClose }: TripExportModalProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto z-10 space-y-6 print:p-0 print:border-none print:shadow-none print:max-w-none"
      >
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 print:hidden">
          <div>
            <h3 className="text-xl font-black text-slate-900 font-display">
              Export & Print Itinerary
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Ready for offline travel, printing, or PDF saving
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-black bg-[#E5293E] hover:bg-[#D01D32] text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 print:space-y-4">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2 print:bg-white print:text-black print:p-0 print:border-b print:pb-3">
            <div className="text-xs font-black uppercase tracking-widest text-amber-400 print:text-slate-600">
              TRIPPIN' BHARAT · DISCOVER INDIA VERIFIED ITINERARY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display">
              {trip.destinationName} — {trip.daysCount} Days Travel Guide
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 print:text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{trip.daysCount} Days</span>
              </span>
              <span className="flex items-center gap-1">
                <Wallet size={13} />
                <span>Est. Spend: ₹{trip.budgetBreakdown.totalEstimated.toLocaleString()}</span>
              </span>
              {trip.selectedHotel && (
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  <span>Base: {trip.selectedHotel.name}</span>
                </span>
              )}
            </div>
          </div>

          {/* Day by Day Sections */}
          <div className="space-y-6">
            {trip.days.map((day) => (
              <div
                key={day.dayNumber}
                className="p-5 rounded-2xl border border-slate-200 space-y-4 print:border-slate-300 print:p-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-base font-black text-slate-900">
                    {day.themeTitle}
                  </h4>
                  <div className="text-xs font-bold text-slate-500">
                    {day.totalDistanceKm} km · ~{day.totalTravelTimeMin}m transit
                  </div>
                </div>

                <div className="space-y-2.5">
                  {day.stops.map((stop, sIdx) => (
                    <div
                      key={stop.id}
                      className="flex items-start justify-between text-xs py-1.5 border-b border-slate-50 last:border-none"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[11px] print:bg-transparent print:text-black">
                            {stop.timeSlot}
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {stop.placeName}
                          </span>
                        </div>
                        {stop.notes && (
                          <div className="text-slate-500 text-[11px] pl-2">
                            {stop.notes}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-800">
                          {stop.estimatedCost === 0 ? 'Free Entry' : `₹${stop.estimatedCost}`}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {stop.durationMin}m visit
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Budget Breakdown Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 print:bg-transparent">
            <div className="font-black uppercase tracking-wider text-slate-700">
              Estimated Spending Breakdown
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center pt-1">
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Accommodation</div>
                <div className="font-black text-slate-800 mt-0.5">₹{trip.budgetBreakdown.stay.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Food & Dining</div>
                <div className="font-black text-slate-800 mt-0.5">₹{trip.budgetBreakdown.food.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Local Transport</div>
                <div className="font-black text-slate-800 mt-0.5">₹{trip.budgetBreakdown.transport.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Entry Tickets</div>
                <div className="font-black text-slate-800 mt-0.5">₹{trip.budgetBreakdown.tickets.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Projected</div>
                <div className="font-black text-emerald-600 mt-0.5">₹{trip.budgetBreakdown.totalEstimated.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
