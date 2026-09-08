import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturedDestinations from '../components/FeaturedDestinations'
import DestinationMarquee from '../components/DestinationMarquee'
import TripPlannerTeaser from '../components/TripPlannerTeaser'
import HeritageSection from '../components/HeritageSection'
import TestimonialsSection from '../components/TestimonialsSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Yātra | India\'s Intelligent Travel & Tourism Ecosystem'
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDestinations />
        <DestinationMarquee />
        <TripPlannerTeaser />
        <HeritageSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
