import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin, Eye } from 'lucide-react'
import type { Place } from '../../types/destination'

interface PersonalizedCurationProps {
  styleTitle: string
  places: Place[]
  onSelectPlace: (place: Place) => void
}

export default function PersonalizedCuration({
  styleTitle,
  places,
  onSelectPlace,
}: PersonalizedCurationProps) {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-amber-700" />
              <span>Tailored For Your Travel Style</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Handpicked Sights For You
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
              Because you selected <span className="font-extrabold text-[#E5293E] underline decoration-rose-300 underline-offset-4">{styleTitle}</span>, here are the top royal palaces, living artisan quarters, and cultural landmarks to explore:
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl shrink-0 self-start md:self-auto border border-slate-200">
            {places.length} Sights Aligned with Your Journey
          </div>
        </div>

        {/* Curated Places Horizontal / Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {places.map((place, idx) => (
            <div
              key={place.id}
              onClick={() => onSelectPlace(place)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Media Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={place.images[0]}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = '/images/places/city-palace.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                    {place.categoryLabel}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-500 text-white shadow-xs">
                    ★ {place.rating}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
                    Spot 0{idx + 1}
                  </span>
                  <h3 className="text-base font-black truncate">{place.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                  {place.tagline}
                </p>

                {/* Practical Meta */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-amber-600" />
                    <span>{place.timeRequired}</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    {place.entryFee.indian === 0 ? 'Free' : `₹${place.entryFee.indian}`}
                  </span>
                </div>

                {/* View Details Prompt */}
                <div className="w-full pt-2 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#E5293E] transition-colors">
                  <span className="flex items-center gap-1.5 font-extrabold">
                    <Eye size={14} /> View Details & History
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
