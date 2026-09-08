import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Wallet, 
  Sun, 
  Sunset, 
  Moon, 
  Utensils, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Share2,
  Bookmark,
  Car,
  Compass
} from 'lucide-react'

const destinationPlans: Record<string, {
  name: string
  tagline: string
  coverImage: string
  days: {
    dayNumber: number
    theme: string
    activities: {
      timeSlot: string
      period: 'Morning' | 'Afternoon' | 'Evening'
      title: string
      desc: string
      duration: string
      distance: string
      type: 'Monument' | 'Food' | 'Experience' | 'Shopping'
      ticket: string
      image: string
    }[]
    recommendedStay: string
    dailyBudget: string
  }[]
  budgetBreakdown: {
    stay: number
    food: number
    transport: number
    tickets: number
  }
}> = {
  jaipur: {
    name: 'Jaipur, Rajasthan',
    tagline: '3 Days in the Pink City of Maharajas',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80&auto=format',
    days: [
      {
        dayNumber: 1,
        theme: 'Imperial Forts & Royal Palaces',
        activities: [
          {
            timeSlot: '08:30 AM',
            period: 'Morning',
            title: 'Amber Fort & Sheesh Mahal',
            desc: 'Explore the 16th-century Rajput citadel overlooking Maota Lake with grand courtyards and mirror mosaics.',
            duration: '2.5 hrs',
            distance: '11 km from city center',
            type: 'Monument',
            ticket: '₹100 (Indian) / ₹500 (Foreign)',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:00 PM',
            period: 'Afternoon',
            title: 'Authentic Rajasthani Thali at LMB',
            desc: 'Savor traditional Dal Baati Churma, Gatte ki Sabzi and Ker Sangri in the historic Johri Bazaar.',
            duration: '1.5 hrs',
            distance: '8 km from Amber Fort',
            type: 'Food',
            ticket: '₹450 / person',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80&auto=format',
          },
          {
            timeSlot: '04:30 PM',
            period: 'Evening',
            title: 'Hawa Mahal & Sunset Viewpoint',
            desc: 'Photograph the 953 honeycomb jharokhas at golden hour from the heritage rooftop cafe across the street.',
            duration: '1.5 hrs',
            distance: 'Walking distance (300m)',
            type: 'Experience',
            ticket: '₹50 (Indian) / ₹200 (Foreign)',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Alsisar Haveli / Diggi Palace (Heritage)',
        dailyBudget: '₹3,200',
      },
      {
        dayNumber: 2,
        theme: 'Astronomy, Museums & Artisan Bazaars',
        activities: [
          {
            timeSlot: '09:00 AM',
            period: 'Morning',
            title: 'Jantar Mantar UNESCO Observatory',
            desc: 'Marvel at the world\'s largest stone sundial and 19 monumental astronomical instruments built by Sawai Jai Singh II.',
            duration: '1.5 hrs',
            distance: 'Near City Palace',
            type: 'Monument',
            ticket: '₹50 (Indian) / ₹200 (Foreign)',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&q=80&auto=format',
          },
          {
            timeSlot: '12:00 PM',
            period: 'Afternoon',
            title: 'City Palace Complex & Peacock Courtyard',
            desc: 'Tour the royal residence, armory museum, and the iconic Pritam Niwas Chowk with peacock-painted gates.',
            duration: '2.5 hrs',
            distance: 'Adjacent to Jantar Mantar',
            type: 'Monument',
            ticket: '₹300 (Museum + Courtyards)',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:30 PM',
            period: 'Evening',
            title: 'Nahargarh Fort Sunset & City Skyline',
            desc: 'Watch the entire Pink City glow in twilight from the Aravalli ridge followed by tea at Padao Cafe.',
            duration: '2 hrs',
            distance: '14 km scenic drive',
            type: 'Experience',
            ticket: '₹50 entry + vehicle fee',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Alsisar Haveli (Centrally located)',
        dailyBudget: '₹2,800',
      },
      {
        dayNumber: 3,
        theme: 'Stepwells, Crafts & Lake Palaces',
        activities: [
          {
            timeSlot: '09:00 AM',
            period: 'Morning',
            title: 'Panna Meena ka Kund Stepwell',
            desc: 'Admire the 16th-century symmetrical geometric stepwell and ancient temple complex in Amer village.',
            duration: '1 hr',
            distance: 'Near Amer',
            type: 'Monument',
            ticket: 'Free entry',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&q=80&auto=format',
          },
          {
            timeSlot: '11:30 AM',
            period: 'Afternoon',
            title: 'Blue Pottery & Block Print Workshop',
            desc: 'Meet 5th-generation master artisans and try your hand at traditional wooden block printing on fine cotton.',
            duration: '2 hrs',
            distance: '16 km South',
            type: 'Experience',
            ticket: 'Free entry / workshops from ₹300',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:00 PM',
            period: 'Evening',
            title: 'Jal Mahal Promenade & Street Snacks',
            desc: 'Evening walk along Man Sagar Lake with views of the floating water palace and famous Pyaz Kachoris.',
            duration: '1.5 hrs',
            distance: 'Amer Road',
            type: 'Food',
            ticket: 'Street food approx ₹150',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Alsisar Haveli',
        dailyBudget: '₹2,400',
      },
    ],
    budgetBreakdown: {
      stay: 4500,
      food: 2100,
      transport: 1200,
      tickets: 850,
    }
  },
  varanasi: {
    name: 'Varanasi, Uttar Pradesh',
    tagline: '3 Days of Sacred Ghats & Spiritual Awakening',
    coverImage: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80&auto=format',
    days: [
      {
        dayNumber: 1,
        theme: 'Ghat Sunrise & Ganga Aarti',
        activities: [
          {
            timeSlot: '05:30 AM',
            period: 'Morning',
            title: 'Subah-e-Banaras Dawn Boat Ride',
            desc: 'Glide past 84 historical ghats at sunrise as morning hymns and temple bells echo across the holy river.',
            duration: '2 hrs',
            distance: 'Assi Ghat',
            type: 'Experience',
            ticket: '₹300 - ₹500 / boat',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
          {
            timeSlot: '11:00 AM',
            period: 'Afternoon',
            title: 'Kashi Vishwanath Corridor & Old Alleys',
            desc: 'Walk through the golden spire temple complex and explore the ancient maze-like lanes for Banarasi Paan and Malaiyyo.',
            duration: '2.5 hrs',
            distance: '1 km from Dashashwamedh',
            type: 'Monument',
            ticket: 'Free entry (VIP ₹300)',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
          {
            timeSlot: '06:00 PM',
            period: 'Evening',
            title: 'Maha Ganga Aarti at Dashashwamedh Ghat',
            desc: 'Witness the iconic evening ritual with brass lamps, conch shells, and mesmerizing rhythmic chanting.',
            duration: '1.5 hrs',
            distance: 'Dashashwamedh Ghat',
            type: 'Experience',
            ticket: 'Free public viewing',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'BrijRama Palace / Suryauday Haveli',
        dailyBudget: '₹2,600',
      },
      {
        dayNumber: 2,
        theme: 'Buddhist Heritage & Silk Weaving',
        activities: [
          {
            timeSlot: '09:00 AM',
            period: 'Morning',
            title: 'Sarnath Dhamek Stupa & Archeological Museum',
            desc: 'Visit the sacred deer park where Buddha gave his first sermon and see the original Ashoka Lion Capital.',
            duration: '3 hrs',
            distance: '10 km North',
            type: 'Monument',
            ticket: '₹25 (Indian) / ₹300 (Foreign)',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
          {
            timeSlot: '02:00 PM',
            period: 'Afternoon',
            title: 'Banarasi Silk Weavers Colony Tour',
            desc: 'Meet traditional artisan families weaving pure zari gold brocade Banarasi sarees on handlooms.',
            duration: '2 hrs',
            distance: 'Madanpura',
            type: 'Shopping',
            ticket: 'Free visit',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:30 PM',
            period: 'Evening',
            title: 'Sunset at Assi Ghat & Rooftop Chai',
            desc: 'Relax at Assi Ghat with spiced lemon tea, wood-fired pizzeria treats, and classical sitar performances.',
            duration: '2 hrs',
            distance: 'Assi Ghat',
            type: 'Food',
            ticket: 'Approx ₹200',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'BrijRama Palace',
        dailyBudget: '₹2,200',
      },
      {
        dayNumber: 3,
        theme: 'Forts Across the Ganges & Street Food',
        activities: [
          {
            timeSlot: '09:30 AM',
            period: 'Morning',
            title: 'Ramnagar Fort & Vintage Car Museum',
            desc: '18th-century sandstone fortress across the river with astronomical clocks and royal armory collections.',
            duration: '2 hrs',
            distance: '14 km Southeast',
            type: 'Monument',
            ticket: '₹50 (Indian) / ₹250 (Foreign)',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:00 PM',
            period: 'Afternoon',
            title: 'Famous Kachori Gali Culinary Trail',
            desc: 'Taste crispy Hing Kachoris with spicy aloo jhol, Banarasi Lassi at Blue Lassi shop, and fresh Rabri.',
            duration: '1.5 hrs',
            distance: 'Old Vishwanath Gali',
            type: 'Food',
            ticket: 'Approx ₹180',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:00 PM',
            period: 'Evening',
            title: 'Manikarnika & Harishchandra Ghat Evening Walk',
            desc: 'Understand the philosophical and spiritual perspective on the eternal cycle of life and liberation (Moksha).',
            duration: '1.5 hrs',
            distance: 'Riverside path',
            type: 'Experience',
            ticket: 'Free entry',
            image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'BrijRama Palace',
        dailyBudget: '₹2,000',
      },
    ],
    budgetBreakdown: {
      stay: 3800,
      food: 1600,
      transport: 900,
      tickets: 550,
    }
  },
  udaipur: {
    name: 'Udaipur, Rajasthan',
    tagline: '3 Days in the Romantic City of Lakes',
    coverImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&q=80&auto=format',
    days: [
      {
        dayNumber: 1,
        theme: 'Royal Mewar Heritage & Sunset Cruise',
        activities: [
          {
            timeSlot: '09:00 AM',
            period: 'Morning',
            title: 'City Palace Complex & Crystal Gallery',
            desc: 'Explore the grandest palace in Rajasthan overlooking Lake Pichola with mirror galleries and courtyards.',
            duration: '3 hrs',
            distance: 'City center',
            type: 'Monument',
            ticket: '₹330 (Adult)',
            image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:30 PM',
            period: 'Afternoon',
            title: 'Lakeside Dining at Ambrai Ghat',
            desc: 'Enjoy authentic Laal Maas, Ker Sangri, and freshly baked rotis with panoramic palace views across the water.',
            duration: '1.5 hrs',
            distance: 'Across Pichola Bridge',
            type: 'Food',
            ticket: '₹750 / person',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:00 PM',
            period: 'Evening',
            title: 'Lake Pichola Sunset Boat Cruise to Jag Mandir',
            desc: 'Take a serene solar-powered boat ride past Taj Lake Palace to the 17th-century island palace Jag Mandir.',
            duration: '2 hrs',
            distance: 'City Palace Jetty',
            type: 'Experience',
            ticket: '₹450 / person',
            image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Fateh Garh / Jagat Niwas Palace (Heritage)',
        dailyBudget: '₹3,800',
      },
      {
        dayNumber: 2,
        theme: 'Folk Art, Fountains & Mountain Fortress',
        activities: [
          {
            timeSlot: '09:30 AM',
            period: 'Morning',
            title: 'Saheliyon-ki-Bari & Vintage Car Museum',
            desc: 'Stroll through royal lotus pools, marble elephant fountains, and the Maharana collection of vintage Rolls Royces.',
            duration: '2 hrs',
            distance: '4 km North',
            type: 'Monument',
            ticket: '₹50 (Indian) / ₹100 (Foreign)',
            image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=300&q=80&auto=format',
          },
          {
            timeSlot: '02:00 PM',
            period: 'Afternoon',
            title: 'Bagore Ki Haveli Museum & Hathi Pol Bazaar',
            desc: 'Tour the 138-room 18th-century waterfront mansion and shop for miniature paintings and leather diaries.',
            duration: '2.5 hrs',
            distance: 'Gangaur Ghat',
            type: 'Shopping',
            ticket: '₹60 museum entry',
            image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:30 PM',
            period: 'Evening',
            title: 'Monsoon Palace (Sajjangarh) Sunset View',
            desc: 'Drive up the Bansdara peak for a 360-degree sunset vista of the lakes and surrounding Aravalli mountain ranges.',
            duration: '2 hrs',
            distance: '9 km West',
            type: 'Experience',
            ticket: '₹110 entry + sanctuary fee',
            image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Fateh Garh',
        dailyBudget: '₹3,200',
      },
      {
        dayNumber: 3,
        theme: 'Fateh Sagar & Heritage Villages',
        activities: [
          {
            timeSlot: '09:00 AM',
            period: 'Morning',
            title: 'Fateh Sagar Lake & Nehru Garden Island',
            desc: 'Enjoy morning paddle boating or speed boating with surrounding green hills and scenic walking promenade.',
            duration: '2 hrs',
            distance: '3 km North',
            type: 'Experience',
            ticket: 'Boating ₹150 - ₹300',
            image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:00 PM',
            period: 'Afternoon',
            title: 'Shilpgram Rural Arts and Crafts Complex',
            desc: 'Living ethnographic museum displaying indigenous tribal huts, pottery workshops, and folk dance performances.',
            duration: '2.5 hrs',
            distance: '3 km West of Fateh Sagar',
            type: 'Experience',
            ticket: '₹50 entry',
            image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=300&q=80&auto=format',
          },
          {
            timeSlot: '07:00 PM',
            period: 'Evening',
            title: 'Dharohar Folk Dance Performance at Bagore Haveli',
            desc: 'Electrifying 1-hour Rajasthani cultural show featuring Chari, Ghoomar, and record-holding brass pot balancing dancers.',
            duration: '1.5 hrs',
            distance: 'Gangaur Ghat',
            type: 'Experience',
            ticket: '₹100 (Indian) / ₹200 (Foreign)',
            image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Fateh Garh',
        dailyBudget: '₹3,000',
      },
    ],
    budgetBreakdown: {
      stay: 5200,
      food: 2400,
      transport: 1400,
      tickets: 950,
    }
  },
  kerala: {
    name: 'Alleppey & Munnar, Kerala',
    tagline: '3 Days in God\'s Own Backwaters & Mist Hills',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&auto=format',
    days: [
      {
        dayNumber: 1,
        theme: 'Alleppey Backwaters & Houseboat Journey',
        activities: [
          {
            timeSlot: '11:30 AM',
            period: 'Morning',
            title: 'Vembanad Lake Houseboat Cruise Check-in',
            desc: 'Board a traditional kettuvallam wooden houseboat with private chef cruising through palm-fringed canals.',
            duration: '5 hrs',
            distance: 'Finishing Point, Alleppey',
            type: 'Experience',
            ticket: 'Included with stay / Day cruise ₹1,200',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:30 PM',
            period: 'Afternoon',
            title: 'Traditional Karimeen Pollichathu Lunch',
            desc: 'Feast on fresh pearl spot fish marinated in Kerala spices and wrapped in banana leaves, served with red rice.',
            duration: '1.5 hrs',
            distance: 'Onboard Houseboat',
            type: 'Food',
            ticket: 'Included / ₹400 meal',
            image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:30 PM',
            period: 'Evening',
            title: 'Marari Beach Sunset & Canoe Canal Ride',
            desc: 'Switch to a traditional narrow wooden canoe to explore quiet village lagoons and watch the Arabian Sea sunset.',
            duration: '2 hrs',
            distance: '14 km from Alleppey',
            type: 'Experience',
            ticket: 'Canoe ride ₹300 / person',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Luxury Kettuvallam / Punnamada Resort',
        dailyBudget: '₹4,500',
      },
      {
        dayNumber: 2,
        theme: 'Munnar Rolling Tea Estates & Waterfalls',
        activities: [
          {
            timeSlot: '08:30 AM',
            period: 'Morning',
            title: 'Scenic Drive to Munnar via Cheeyappara Falls',
            desc: 'Travel through misty mountain roads passing 7 tiers of cascading waterfalls and lush cardamom valleys.',
            duration: '3.5 hrs',
            distance: 'Alleppey to Munnar (140 km)',
            type: 'Experience',
            ticket: 'Free roadside viewpoint',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:00 PM',
            period: 'Afternoon',
            title: 'KDHP Tea Museum & Factory Processing Tour',
            desc: 'Learn the history of tea making from orthodox rolling to black CTC tea with fresh tea tasting sessions.',
            duration: '2 hrs',
            distance: 'Nullatanni Estate',
            type: 'Monument',
            ticket: '₹125 (Adult)',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
          {
            timeSlot: '05:00 PM',
            period: 'Evening',
            title: 'Mattupetty Dam & Echo Point Kayaking',
            desc: 'Enjoy tranquil waters surrounded by tea gardens and cloud-shrouded peaks with wild elephant sighting chances.',
            duration: '2 hrs',
            distance: '13 km from Munnar town',
            type: 'Experience',
            ticket: '₹50 entry + boating',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Windermere Estate / Fragrant Nature Munnar',
        dailyBudget: '₹3,600',
      },
      {
        dayNumber: 3,
        theme: 'Eravikulam Wildlife & Kathakali Night',
        activities: [
          {
            timeSlot: '08:00 AM',
            period: 'Morning',
            title: 'Eravikulam National Park (Nilgiri Tahr)',
            desc: 'Ascend to the high altitude grasslands to spot the endangered Nilgiri Tahr mountain goats and Anamudi peak.',
            duration: '3 hrs',
            distance: '15 km North',
            type: 'Experience',
            ticket: '₹200 (Indian) / ₹500 (Foreign)',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
          {
            timeSlot: '01:30 PM',
            period: 'Afternoon',
            title: 'Spice Garden Walk & Ayurvedic Oil Tasting',
            desc: 'Guided botanical tour discovering wild cardamom, cinnamon bark, black pepper vines, and vanilla pods.',
            duration: '1.5 hrs',
            distance: 'Chithirapuram',
            type: 'Experience',
            ticket: '₹100 guided entry',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
          {
            timeSlot: '06:00 PM',
            period: 'Evening',
            title: 'Punarjani Traditional Kathakali & Kalaripayattu',
            desc: 'Witness dramatic face-painting, elaborate mudras, and ancient martial arts demonstrations by Kerala masters.',
            duration: '2 hrs',
            distance: 'Munnar Bypass',
            type: 'Experience',
            ticket: '₹300 / show',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&q=80&auto=format',
          },
        ],
        recommendedStay: 'Fragrant Nature Munnar',
        dailyBudget: '₹3,200',
      },
    ],
    budgetBreakdown: {
      stay: 6200,
      food: 2800,
      transport: 2100,
      tickets: 750,
    }
  }
}

export default function TripPlannerTeaser() {
  const [selectedDest, setSelectedDest] = useState('jaipur')
  const [activeDay, setActiveDay] = useState(0)
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Comfort' | 'Luxury'>('Comfort')
  const [saved, setSaved] = useState(false)

  const plan = destinationPlans[selectedDest]
  const currentDay = plan.days[activeDay] || plan.days[0]
  
  // Calculate budget modifier
  const multiplier = budgetTier === 'Budget' ? 0.65 : budgetTier === 'Luxury' ? 1.8 : 1.0
  const stayCost = Math.round(plan.budgetBreakdown.stay * multiplier)
  const foodCost = Math.round(plan.budgetBreakdown.food * multiplier)
  const transportCost = Math.round(plan.budgetBreakdown.transport * multiplier)
  const ticketsCost = plan.budgetBreakdown.tickets
  const totalCost = stayCost + foodCost + transportCost + ticketsCost

  return (
    <section id="planner" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="section-tag mb-3">
            <Sparkles size={13} />
            Smart Itinerary Architect
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Generate Your Complete Day-by-Day Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Intelligently sequence heritage monuments, culinary stops, verified stays, and real travel times with dynamic INR budget breakdowns.
          </p>
        </div>

        {/* Planner Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls & Customizer (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="card-white p-6 space-y-6">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Trip Preferences</span>
                <span className="text-xs text-brand-red font-semibold">Live Simulation</span>
              </h3>

              {/* Destination selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Destination
                </label>
                <div className="relative">
                  <select
                    value={selectedDest}
                    onChange={(e) => {
                      setSelectedDest(e.target.value)
                      setActiveDay(0)
                    }}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 cursor-pointer"
                  >
                    <option value="jaipur">Jaipur, Rajasthan (3 Days)</option>
                    <option value="varanasi">Varanasi, Uttar Pradesh (3 Days)</option>
                    <option value="udaipur">Udaipur, Rajasthan (3 Days)</option>
                    <option value="kerala">Alleppey & Munnar, Kerala (3 Days)</option>
                  </select>
                </div>
              </div>

              {/* Budget Tier Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Budget Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Budget', 'Comfort', 'Luxury'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setBudgetTier(tier)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        budgetTier === tier
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Pace */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Travel Pace
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-brand-red flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Balanced (3 stops/day)
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center gap-2">
                    Leisure (2 stops/day)
                  </div>
                </div>
              </div>

              {/* Estimated Total Budget Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>3-Day Total Estimated Budget</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px]">
                    {budgetTier} Tier
                  </span>
                </div>
                
                <div className="text-3xl font-black text-white mb-4">
                  ₹{totalCost.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-slate-300">/ traveler</span>
                </div>

                <div className="space-y-1.5 text-xs border-t border-slate-700 pt-3">
                  <div className="flex justify-between text-slate-300">
                    <span>🏨 Verified Stays (2 Nights):</span>
                    <span className="font-bold text-white">₹{stayCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>🍛 Local Meals & Food:</span>
                    <span className="font-bold text-white">₹{foodCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>🚕 Local Transit & Auto:</span>
                    <span className="font-bold text-white">₹{transportCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>🎟️ Monument & Entry Tickets:</span>
                    <span className="font-bold text-white">₹{ticketsCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSaved(!saved)}
                  className="btn-primary w-full py-3 text-xs justify-center gap-2"
                >
                  <Bookmark size={15} />
                  {saved ? 'Itinerary Saved to My Trips' : 'Save Itinerary & Get Route'}
                </button>
                <button className="btn-outline w-full py-3 text-xs justify-center gap-2">
                  <Share2 size={15} />
                  Share Plan with Travelers
                </button>
              </div>

            </div>

          </div>

          {/* Right Live Itinerary Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Itinerary Header Bar with Visual Cover */}
            <div className="card-white overflow-hidden">
              <div className="relative h-28 sm:h-36 overflow-hidden">
                <img
                  src={plan.coverImage}
                  alt={plan.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80&auto=format'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
                  <div>
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                      Interactive Day-by-Day Simulation
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {plan.name}
                    </h3>
                    <div className="text-xs text-slate-200 mt-0.5">{plan.tagline}</div>
                  </div>

                  {/* Day Switcher Tabs */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-black/40 p-1 rounded-xl backdrop-blur-sm">
                    {plan.days.map((d, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeDay === index
                            ? 'bg-brand-red text-white shadow-sm'
                            : 'text-slate-200 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        Day {d.dayNumber}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  Day {currentDay.dayNumber} Theme: <strong className="text-slate-900">{currentDay.theme}</strong>
                </span>
                <span className="text-xs font-bold text-brand-red bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                  Est. Daily Spend: {currentDay.dailyBudget}
                </span>
              </div>
            </div>

            {/* Day Timeline Activities with Place Images */}
            <div className="space-y-4">
              {currentDay.activities.map((act, idx) => (
                <motion.div
                  key={`${selectedDest}-${activeDay}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="card-white p-4 sm:p-5 hover:border-slate-300 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    
                    {/* Activity Image Thumbnail */}
                    <div className="relative w-full sm:w-28 sm:h-24 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format'
                        }}
                      />
                      <div className="absolute top-2 left-2 sm:hidden">
                        <span className="text-xs font-black text-brand-red px-2 py-0.5 rounded bg-white/90 shadow-xs">
                          {act.timeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="hidden sm:flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-brand-red px-2 py-0.5 rounded bg-rose-50 border border-rose-100">
                              {act.timeSlot}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase">
                              {act.period}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                            {act.title}
                          </h4>
                        </div>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          act.type === 'Monument' ? 'bg-amber-100 text-amber-800' :
                          act.type === 'Food' ? 'bg-orange-100 text-orange-800' :
                          act.type === 'Shopping' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-brand-blue'
                        }`}>
                          {act.type}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {act.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" />
                          Visit Time: <strong>{act.duration}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Car size={13} className="text-slate-400" />
                          {act.distance}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">
                          🎟️ {act.ticket}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommended Stay for the Day */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Recommended Route Stay
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {currentDay.recommendedStay}
                  </div>
                </div>
              </div>

              <button className="btn-outline py-2 px-4 text-xs">
                View Stay Options
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
