import { motion } from 'framer-motion'
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react'

const reviews = [
  {
    name: 'Aditi Deshmukh',
    role: 'Heritage & Architectural Researcher',
    location: 'Mumbai, Maharashtra',
    destinationVisited: 'Hampi & Badami Circuit',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format',
    rating: 5,
    text: "Trippin' Bharat is on a whole different level compared to standard booking apps. The architectural timeline and hidden stepwell insights in Hampi allowed us to discover monuments that even local cab drivers had never heard of.",
  },
  {
    name: 'Vikramaditya Rathore',
    role: 'Family Traveler (Trip of 5)',
    location: 'Bengaluru, Karnataka',
    destinationVisited: 'Jaipur & Udaipur (5 Days)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&auto=format',
    rating: 5,
    text: 'The dynamic budget planner saved us at least ₹15,000 on our Rajasthan trip. The suggested heritage stay was just 8 minutes from Amber Fort, which meant zero morning traffic and pure magic at golden hour.',
  },
  {
    name: 'Rohan & Emily',
    role: 'International Cultural Explorers',
    location: 'London / New Delhi',
    destinationVisited: 'Varanasi Ghats & Sarnath',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&auto=format',
    rating: 5,
    text: "Navigating the labyrinthine alleys of Varanasi can be daunting, but Trippin' Bharat’s street food hygiene badges and morning boat route guides gave us total confidence. Truly genuine Indian tourism intelligence.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-2">
            <ShieldCheck size={13} />
            Verified Traveler Experiences
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Trusted by Over 1.2 Million Travelers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Real stories and verified journeys from travelers discovering the authentic heritage, stays, and flavors of India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="card-white p-6 flex flex-col justify-between"
            >
              <div>
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-slate-200" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {rev.name}
                    </h4>
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{rev.role}</div>
                  <div className="text-[10px] font-bold text-brand-red truncate mt-0.5">
                    Visited: {rev.destinationVisited}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
