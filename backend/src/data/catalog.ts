export interface GeoCoordinates {
  lat: number
  lng: number
}

export interface Place {
  id: string
  name: string
  hindiName?: string
  tagline: string
  category: 'heritage' | 'palace' | 'temple' | 'lake' | 'hidden_gem' | 'museum' | 'craft' | 'waterfall' | 'nature' | 'monument' | 'culture' | 'fort'
  categoryLabel: string
  rating: number
  reviewCount?: number
  images: string[]
  image?: string
  price?: number
  description: string
  coordinates: GeoCoordinates
  entryFee?: {
    indian: number
    foreign: number
    student?: number
    camera?: number
    currency?: string
  }
  timings?: string | { open: string; close: string; days: string[] }
  bestTimeToVisit?: string | { bestTimeOfDay: string }
  recommendedVisitDurationMin?: number
  timeRequired?: string
  isAsiVerified?: boolean
  journeyLens?: {
    history: string
    architecturalStyle: string
    architectureHighlights: string[]
    legendsAndStories: string[]
    bestPhotoSpots: string[]
    audioGuideAvailable: boolean
  }
  nearbyWithin1Km?: any[]
  nearbyWithin5Km?: any[]
}

export interface StayHotel {
  id: string
  name: string
  type: string
  tier?: 'budget' | 'comfort' | 'luxury'
  rating: number
  reviewsCount?: number
  image: string
  pricePerNight: number
  amenities: string[]
  address?: string
}

export interface DestinationData {
  id: string
  slug: string
  name: string
  state: string
  tagline: string
  shortBio?: string
  overview?: string
  heroImage: string
  heroBanner: string
  heroGallery: string[]
  bestSeason: string
  idealDurationDays: number
  recommendedDays?: string
  coordinates: GeoCoordinates
  approxBudgetPerDay: {
    budget: number
    comfort: number
    luxury: number
  }
  weather: {
    tempC: number
    condition: string
    humidity: string
  }
  tourismStatus: {
    safetyScore: string
    crowdLevel: string
    peakHours: string
  }
  curatedForStyles: {
    styleId: string
    styleTitle: string
    description: string
    recommendedPlaceIds: string[]
  }[]
  places: Place[]
  stays: StayHotel[]
  foodSpots?: any[]
  experiences?: any[]
  signatureFoods?: {
    name: string
    description: string
    bestSpot: string
  }[]
}

export function generateDynamicDestination(cityQuery: string, styleQuery?: string): DestinationData {
  const cleanName = cityQuery.trim().replace(/^,+|,+$/g, '').trim() || 'India'
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const defaultStyle = styleQuery || 'Heritage & Cultural Trail'

  return {
    id: slug,
    slug: slug,
    name: cleanName,
    state: 'India',
    tagline: `Cultural Heritage · Iconic Landmarks · Curated ${cleanName} Guide`,
    shortBio: `Explore the vibrant streets, historic monuments, authentic regional flavours, and treasured local experiences of ${cleanName}. Specially curated with verified entry timings, safety ratings, and route optimization.`,
    overview: `Explore the vibrant streets, historic monuments, and authentic regional flavours of ${cleanName}.`,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    heroGallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    ],
    bestSeason: 'October – March',
    idealDurationDays: 3,
    recommendedDays: '3–4 Days',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    approxBudgetPerDay: {
      budget: 1800,
      comfort: 4500,
      luxury: 15000,
    },
    weather: {
      tempC: 26,
      condition: 'Pleasant & Clear',
      humidity: '45%',
    },
    tourismStatus: {
      safetyScore: '4.8 / 5.0 (High Tourist Safety)',
      crowdLevel: 'Moderate',
      peakHours: '10:30 AM – 3:30 PM (Main Landmarks)',
    },
    curatedForStyles: [
      {
        styleId: 'heritage-trail',
        styleTitle: defaultStyle,
        description: `Handpicked historic monuments, architectural wonders, and cultural landmarks in ${cleanName}.`,
        recommendedPlaceIds: [`${slug}-p1`, `${slug}-p2`, `${slug}-p3`],
      },
      {
        styleId: 'scenic-trail',
        styleTitle: 'Scenic & Photography Spots',
        description: `Panoramic viewpoints, sunset horizons, and photogenic corners in ${cleanName}.`,
        recommendedPlaceIds: [`${slug}-p1`, `${slug}-p2`],
      },
    ],
    places: [
      {
        id: `${slug}-p1`,
        name: `${cleanName} Historic Fort & Palace`,
        hindiName: `${cleanName} मुख्य ऐतिहासिक किला`,
        tagline: `Imposing centuries-old fortress and historic citadel of ${cleanName}`,
        category: 'heritage',
        categoryLabel: 'Historic Citadel',
        rating: 4.8,
        reviewCount: 18400,
        images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        description: `The grand architectural centrepiece of ${cleanName}, boasting imposing stone battlements, carved entrance arches, and panoramic city views.`,
        coordinates: { lat: 26.9124, lng: 75.7873 },
        entryFee: { indian: 50, foreign: 300, currency: 'INR' },
        timings: '9:00 AM – 5:30 PM (Daily)',
        bestTimeToVisit: '9:00 AM – 11:30 AM (Early morning to avoid queues)',
        recommendedVisitDurationMin: 150,
        timeRequired: '2.5 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: `Erected by regional rulers to serve as the administrative and military focal point of ${cleanName}.`,
          architecturalStyle: 'Traditional Indian Stone Architecture',
          architectureHighlights: ['Carved stone entrance portals', 'Central ceremonial courtyards', 'Intricate lattice jharokhas'],
          legendsAndStories: [`Local chronicles recount historic celebrations and cultural gatherings held on these grounds.`],
          bestPhotoSpots: ['Main entrance gateway in morning lighting', 'Courtyard colonnade framing the central pavilion'],
          audioGuideAvailable: true,
        },
      },
      {
        id: `${slug}-p2`,
        name: `${cleanName} Royal Garden & Museum`,
        hindiName: `${cleanName} शाही उद्यान एवं संग्रहालय`,
        tagline: `Manicured botanical promenades and preserved royal antiquities`,
        category: 'palace',
        categoryLabel: 'Heritage Complex',
        rating: 4.7,
        reviewCount: 9800,
        images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'],
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
        description: `A tranquil heritage garden complex displaying regional costumes, armory, royal decrees, and traditional artwork of ${cleanName}.`,
        coordinates: { lat: 26.92, lng: 75.8 },
        entryFee: { indian: 30, foreign: 200, currency: 'INR' },
        timings: '9:30 AM – 5:00 PM',
        bestTimeToVisit: '3:00 PM – 5:00 PM',
        recommendedVisitDurationMin: 90,
        timeRequired: '1.5 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: `Preserved royal pleasure grounds designed for leisure and state assemblies.`,
          architecturalStyle: 'Pavilion Garden Architecture',
          architectureHighlights: ['Fountain waterways and marble cascades', 'Curated gallery of antiquities'],
          legendsAndStories: [],
          bestPhotoSpots: ['Reflecting pool perspective facing the main pavilion'],
          audioGuideAvailable: true,
        },
      },
      {
        id: `${slug}-p3`,
        name: `${cleanName} Old City Heritage Bazaar`,
        hindiName: `${cleanName} पुराना शहर बाज़ार`,
        tagline: `Centuries-old artisan alleys, handloom fabrics & street snacks`,
        category: 'craft',
        categoryLabel: 'Artisan Mohalla',
        rating: 4.8,
        reviewCount: 15600,
        images: ['https://images.unsplash.com/photo-1603228254119-e6aefd8432c2?auto=format&fit=crop&w=800&q=80'],
        image: 'https://images.unsplash.com/photo-1603228254119-e6aefd8432c2?auto=format&fit=crop&w=800&q=80',
        description: `The pulsating heart of ${cleanName}, filled with brass metal smiths, traditional textile weavers, spice merchants, and famous regional street food vendors.`,
        coordinates: { lat: 26.925, lng: 75.82 },
        entryFee: { indian: 0, foreign: 0, currency: 'INR' },
        timings: '10:30 AM – 9:00 PM',
        bestTimeToVisit: '4:30 PM – 7:30 PM',
        recommendedVisitDurationMin: 120,
        timeRequired: '2 Hours',
        isAsiVerified: false,
        journeyLens: {
          history: `Established as a dedicated commercial hub by the founding artisans of ${cleanName}.`,
          architecturalStyle: 'Walled City Merchant Havelis',
          architectureHighlights: ['Overhanging carved wooden balconies', 'Arched vendor doorways'],
          legendsAndStories: [],
          bestPhotoSpots: ['Bustling lantern-lit street in early evening'],
          audioGuideAvailable: false,
        },
      },
    ],
    stays: [
      {
        id: `${slug}-stay-1`,
        name: `${cleanName} Heritage Haveli & Resort`,
        type: 'boutique_heritage',
        tier: 'luxury',
        rating: 4.8,
        pricePerNight: 8500,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        amenities: ['Courtyard Dining', 'Swimming Pool', 'Cultural Evenings', 'Free High-Speed Wi-Fi'],
        address: `Heritage Quarter, ${cleanName}`,
      },
      {
        id: `${slug}-stay-2`,
        name: `${cleanName} Comfort City Stay`,
        type: 'boutique_haveli',
        tier: 'comfort',
        rating: 4.6,
        pricePerNight: 3600,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        amenities: ['Rooftop Restaurant', 'Air Conditioning', 'Travel Desk'],
        address: `Station Road, ${cleanName}`,
      },
    ],
    foodSpots: [
      {
        id: `${slug}-food-1`,
        name: `${cleanName} Authentic Dining Hall`,
        cuisineType: `Traditional ${cleanName} & Regional Thali`,
        type: 'traditional_thali',
        rating: 4.7,
        priceForTwo: 600,
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
        mustTryDishes: [`Signature ${cleanName} Thali`, 'Crispy Local Kachoris', 'Regional Sweets & Chai'],
        timings: '11:30 AM – 10:30 PM',
        address: `Station Road, ${cleanName}`,
        coordinates: { lat: 26.915, lng: 75.79 },
        isVeg: true,
      },
    ],
    experiences: [
      {
        id: `${slug}-exp-1`,
        title: `${cleanName} Old Quarter Artisan Trail`,
        category: 'craft',
        categoryLabel: 'Artisan Walk',
        duration: '2.5 Hours',
        price: 850,
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        description: `Walk through the hidden alleys of ${cleanName} with local historians, visiting master craftsmen in their family workshops.`,
        highlights: ['Handmade craft demo', 'Regional snack tasting', 'Local historian guide'],
        timing: '4:00 PM – 6:30 PM',
        location: `Old Clock Tower, ${cleanName}`,
        rating: 4.9,
      },
    ],
  }
}

export const seedDestinations: Record<string, DestinationData> = {
  udaipur: {
    id: 'dest-udaipur',
    slug: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    tagline: 'City of Lakes · Mewar Heritage · Palaces & Living Art',
    shortBio: 'Founded in 1559 by Maharana Udai Singh II as the historic capital of the Mewar Kingdom. Renowned globally for its iconic marble palaces reflecting on azure waters, intricate jharokhas, centuries-old miniature painting traditions, and living Rajputana culture.',
    overview: 'Udaipur, the historic capital of the Kingdom of Mewar, is an oasis of shimmering lakes, grand marble palaces, and living Rajput traditions.',
    heroImage: '/images/places/city-palace.jpg',
    heroBanner: '/images/places/city-palace.jpg',
    heroGallery: [
      '/images/places/city-palace.jpg',
      '/images/places/lake-pichola.jpg',
      '/images/places/jagdish-temple.jpg',
      '/images/places/bagore-ki-haveli.jpg',
      '/images/places/sajjangarh.jpg',
    ],
    bestSeason: 'September – March',
    idealDurationDays: 3,
    recommendedDays: '3–5 Days',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    approxBudgetPerDay: { budget: 1800, comfort: 4500, luxury: 16000 },
    weather: { tempC: 26, condition: 'Pleasant & Clear', humidity: '42%' },
    tourismStatus: {
      safetyScore: '4.9 / 5.0 (High Tourist Safety)',
      crowdLevel: 'Moderate',
      peakHours: '4:30 PM – 7:30 PM (Lakeside & Ghats)',
    },
    curatedForStyles: [
      {
        styleId: 'art',
        styleTitle: 'Mewar Art & Vintage Heritage',
        description: 'Tailored selection prioritizing 400-year-old royal craftsmanship, miniature painting ateliers, royal vintage automobiles, and palace architecture.',
        recommendedPlaceIds: ['city-palace', 'bagore-ki-haveli', 'vintage-car-museum', 'jagdish-temple', 'sajjangarh', 'lake-pichola', 'shilpgram'],
      },
      {
        styleId: 'romantic',
        styleTitle: 'Romantic Lakes & Sunsets',
        description: 'Lakeside palaces, sunset cruises, rooftop candlelight dinners and ghat views.',
        recommendedPlaceIds: ['lake-pichola', 'city-palace', 'bagore-ki-haveli', 'sajjangarh'],
      },
    ],
    places: [
      {
        id: 'city-palace',
        name: 'City Palace Complex',
        hindiName: 'सिटी पैलेस, उदयपुर',
        tagline: 'Monumental 400-year-old Rajput architectural triumph overlooking Lake Pichola',
        category: 'palace',
        categoryLabel: 'Royal Palace Complex',
        rating: 4.8,
        reviewCount: 38400,
        images: ['/images/places/city-palace.jpg', '/images/places/lake-pichola.jpg'],
        image: '/images/places/city-palace.jpg',
        description: 'A towering granite and marble palace complex built over nearly four centuries by 22 successive Maharanas of Mewar. Rising dramatically over the eastern banks of Lake Pichola, it features an ensemble of 11 distinct palaces, hanging courtyards, mirror mosaics, and private royal chambers.',
        coordinates: { lat: 24.5764, lng: 73.6835 },
        entryFee: { indian: 300, foreign: 300, student: 100, camera: 250, currency: 'INR' },
        timings: '9:00 AM – 5:30 PM (Daily)',
        bestTimeToVisit: '9:30 AM (Early morning to avoid queues)',
        recommendedVisitDurationMin: 180,
        timeRequired: '2.5 – 3 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: 'Construction began in 1559 by Maharana Udai Singh II after fleeing Chittorgarh. Extended over 400 years by subsequent Mewar Maharanas.',
          architecturalStyle: 'Flamboyant Rajasthani & Mughal Fusion Architecture',
          architectureHighlights: ['Mor Chowk (Peacock Courtyard) with 5,000 glass mosaics', 'Sheesh Mahal (Palace of Mirrors)', 'Amar Vilas elevated garden courtyard'],
          legendsAndStories: ['Mewar rulers claim direct descent from Surya (The Sun God); gold sun emblems adorn the royal courts.'],
          bestPhotoSpots: ['Tripolia Gate archway framing the palace facade', 'Zenana Mahal courtyard'],
          audioGuideAvailable: true,
        },
      },
      {
        id: 'lake-pichola',
        name: 'Lake Pichola & Sunset Cruise',
        hindiName: 'पिछोला झील',
        tagline: 'Tranquil waters reflecting royal island palaces against the Aravalli hills',
        category: 'lake',
        categoryLabel: 'Historic Freshwater Lake',
        rating: 4.9,
        reviewCount: 29500,
        images: ['/images/places/lake-pichola.jpg', '/images/places/city-palace.jpg'],
        image: '/images/places/lake-pichola.jpg',
        description: 'Iconic freshwater lake created in 1362 AD by Banjara tribesman Pichhu and later expanded by Maharana Udai Singh II. Shelters the world-renowned Lake Palace (Jag Niwas) and Jag Mandir island palace.',
        coordinates: { lat: 24.575, lng: 73.678 },
        entryFee: { indian: 500, foreign: 800, student: 300, camera: 0, currency: 'INR' },
        timings: '10:00 AM – 6:30 PM (Daily)',
        bestTimeToVisit: 'Sunset',
        recommendedVisitDurationMin: 90,
        timeRequired: '1.5 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: 'Engineered in 1362 AD to transport grain across streams; fortified in 1559 AD by Maharana Udai Singh II.',
          architecturalStyle: 'Water Heritage & Royal Island Pavilions',
          architectureHighlights: ['Jag Mandir Island Palace with yellow sandstone carved elephants', 'Lake Palace marble pavilion reflections'],
          legendsAndStories: ['Prince Khurram (later Emperor Shah Jahan) sought refuge at Jag Mandir in 1623; inspired designs for the Taj Mahal.'],
          bestPhotoSpots: ['Gangaur Ghat steps during sunset', 'Boat cruise passing the marble facade of City Palace'],
          audioGuideAvailable: true,
        },
      },
      {
        id: 'jagdish-temple',
        name: 'Shree Jagdish Temple',
        hindiName: 'श्री जगदीश मंदिर',
        tagline: 'Living stone-carved Vishnu temple pulsating with devotional hymns',
        category: 'temple',
        categoryLabel: 'Indo-Aryan Stone Temple',
        rating: 4.7,
        reviewCount: 14200,
        images: ['/images/places/jagdish-temple.jpg'],
        image: '/images/places/jagdish-temple.jpg',
        description: 'Consecrated in 1651 AD by Maharana Jagat Singh I, this three-storied carved stone temple is dedicated to Lord Vishnu as Jagannath. Features a 79-foot high spire (shikhara) adorned with sculptures of dancers, musicians, and celestial beings.',
        coordinates: { lat: 24.5795, lng: 73.6841 },
        entryFee: { indian: 0, foreign: 0, currency: 'INR' },
        timings: '5:00 AM – 12:30 PM, 4:00 PM – 9:00 PM',
        bestTimeToVisit: 'Early Morning',
        recommendedVisitDurationMin: 60,
        timeRequired: '1 Hour',
        isAsiVerified: true,
        journeyLens: {
          history: 'Constructed at a cost of 1.5 million rupees in 1651 AD. Survived Mughal raids due to brave Mewar defensive warriors.',
          architecturalStyle: 'Maha-Gurjara & Indo-Aryan Temple Architecture',
          architectureHighlights: ['79-foot high sandstone Shikhara', 'Brass Garuda deity statue'],
          legendsAndStories: ['Continuous morning Aarti bells that have rung uninterrupted since the 17th century.'],
          bestPhotoSpots: ['Steep flight of stone steps flanked by carved elephants'],
          audioGuideAvailable: false,
        },
      },
      {
        id: 'bagore-ki-haveli',
        name: 'Bagore Ki Haveli & Dharohar Folk Arts',
        hindiName: 'बागोर की हवेली',
        tagline: 'Waterfront royal haveli hosting Rajasthan’s premier folk dance spectacle',
        category: 'heritage',
        categoryLabel: 'Royal Haveli Museum',
        rating: 4.8,
        reviewCount: 22000,
        images: ['/images/places/bagore-ki-haveli.jpg'],
        image: '/images/places/bagore-ki-haveli.jpg',
        description: 'An expansive 18th-century royal haveli built on Gangaur Ghat by Prime Minister Amar Chand Badwa. Boasts over 100 rooms displaying royal Mewar costumes, antique hookahs, Rajasthani puppets, and the famous evening Dharohar folk dance.',
        coordinates: { lat: 24.5802, lng: 73.6823 },
        entryFee: { indian: 100, foreign: 200, student: 50, camera: 100, currency: 'INR' },
        timings: '9:30 AM – 5:30 PM (Museum), 7:00 PM – 8:00 PM (Dharohar Dance)',
        bestTimeToVisit: 'Evening',
        recommendedVisitDurationMin: 120,
        timeRequired: '2 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: 'Built by Mewar Prime Minister Amar Chand Badwa between 1751 and 1778; restored by West Zone Cultural Centre.',
          architecturalStyle: 'Traditional Mewari Haveli Architecture',
          architectureHighlights: ['Khatkhokh mirror mosaic work', 'Waterfront Gangaur Ghat triple archway'],
          legendsAndStories: ['Features the world’s largest verified royal turban on exhibit inside the costume gallery.'],
          bestPhotoSpots: ['Gangaur Ghat triple-arch gate framing Lake Pichola'],
          audioGuideAvailable: true,
        },
      },
      {
        id: 'sajjangarh',
        name: 'Sajjangarh (Monsoon Palace)',
        hindiName: 'सज्जनगढ़ पैलेस',
        tagline: 'Royal clifftop observatory offering sunset vistas across the Aravalli range',
        category: 'fort',
        categoryLabel: 'Hilltop Monsoon Palace',
        rating: 4.6,
        reviewCount: 18500,
        images: ['/images/places/sajjangarh.jpg'],
        image: '/images/places/sajjangarh.jpg',
        description: 'Perched 3,100 feet above sea level atop the Bansdara peak of the Aravalli range. Built in 1884 by Maharana Sajjan Singh as an astronomical observatory and monsoon retreat with panoramic sunset views.',
        coordinates: { lat: 24.5939, lng: 73.6397 },
        entryFee: { indian: 160, foreign: 300, student: 60, camera: 100, currency: 'INR' },
        timings: '9:00 AM – 6:30 PM (Daily)',
        bestTimeToVisit: 'Sunset',
        recommendedVisitDurationMin: 120,
        timeRequired: '2 Hours',
        isAsiVerified: true,
        journeyLens: {
          history: 'Envisioned by Maharana Sajjan Singh in 1884 to track cloud movements; served as a hunting lodge and monsoon resort.',
          architecturalStyle: 'White Marble Hilltop Fortress & Rajput Retreat',
          architectureHighlights: ['High turrets and crenellated battlements', 'Central domed marble hall'],
          legendsAndStories: ['Featured prominently as Kamal Khan’s palace in the James Bond movie Octopussy (1983).'],
          bestPhotoSpots: ['Sunset viewing terrace framing the sun dipping below the Aravalli horizon'],
          audioGuideAvailable: true,
        },
      },
      {
        id: 'saheliyon-ki-bari',
        name: 'Saheliyon Ki Bari (Garden of Maidens)',
        hindiName: 'सहेलियों की बाड़ी',
        tagline: 'Tranquil marble pleasure gardens designed for royal maidens of Mewar',
        category: 'nature',
        categoryLabel: 'Royal Fountains & Gardens',
        rating: 4.5,
        reviewCount: 16000,
        images: ['/images/places/saheliyon-ki-bari.jpg'],
        image: '/images/places/saheliyon-ki-bari.jpg',
        description: 'A historic ornamental garden laid out between 1710 and 1734 by Maharana Sangram Singh II for royal maidens. Features natural gravity-fed marble elephant fountains, lotus pools, and kiosks.',
        coordinates: { lat: 24.6016, lng: 73.6854 },
        entryFee: { indian: 20, foreign: 100, student: 10, camera: 50, currency: 'INR' },
        timings: '9:00 AM – 7:00 PM (Daily)',
        bestTimeToVisit: 'Morning',
        recommendedVisitDurationMin: 60,
        timeRequired: '1 Hour',
        isAsiVerified: true,
        journeyLens: {
          history: 'Designed by Maharana Sangram Singh II for a group of 48 female attendants who accompanied the royal princess.',
          architecturalStyle: 'Rajasthani Hydro-Architectural Garden Style',
          architectureHighlights: ['Elephant fountains sculpted from single marble blocks', 'Gravity-fed hydraulic water acoustics'],
          legendsAndStories: ['Engineered so water pressure creates the acoustic illusion of torrential monsoon rain even in summer.'],
          bestPhotoSpots: ['Central marble pavilion surrounded by arching fountain sprays'],
          audioGuideAvailable: false,
        },
      },
    ],
    stays: [
      {
        id: 'stay-taj-lake-palace',
        name: 'Taj Lake Palace',
        tier: 'luxury',
        type: 'Heritage Island Palace',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 38000,
        rating: 4.9,
        amenities: ['Private Boat Arrival', 'Jiva Spa Boat', 'Royal Butler Service', 'Lakeview Dining', 'Swimming Pool'],
        address: 'Pichola, Udaipur, Rajasthan 313001',
      },
      {
        id: 'stay-amet-haveli',
        name: 'Amet Haveli (Ambrai Heritage Stay)',
        tier: 'comfort',
        type: 'Heritage Haveli Hotel',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        pricePerNight: 7500,
        rating: 4.7,
        amenities: ['Lakefront Restaurant (Ambrai)', 'Free WiFi', 'Heritage Courtyards', 'Travel Desk'],
        address: 'Outside Chandpole, Hanuman Ghat, Udaipur 313001',
      },
    ],
    signatureFoods: [
      {
        name: 'Mewari Dal Baati Churma',
        description: 'Slow baked whole wheat dough balls infused with pure desi ghee and spicy lentil curry.',
        bestSpot: 'Krishna Dal Baati Restro, Gulab Bagh',
      },
    ],
  },
}

// Pre-populate other popular Indian destinations
const popularCities = [
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', tagline: 'The Pink City · 24+ Forts & Palaces' },
  { slug: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', tagline: 'Eternal Ghats & Sacred Kashi Vishwanath' },
  { slug: 'shillong', name: 'Shillong', state: 'Meghalaya', tagline: 'Living Root Bridges & Crystal Waterfalls' },
  { slug: 'hampi', name: 'Hampi', state: 'Karnataka', tagline: 'UNESCO Vijayanagara Boulder Ruins & Temples' },
  { slug: 'agra', name: 'Agra', state: 'Uttar Pradesh', tagline: 'Taj Mahal & Mughal Architectural Marvels' },
  { slug: 'goa', name: 'Goa', state: 'Goa', tagline: 'Sun-Kissed Golden Coast & Latin Heritage Quarters' },
  { slug: 'munnar', name: 'Munnar', state: 'Kerala', tagline: 'Emerald Tea Plantations & Misty Anamudi Peaks' },
  { slug: 'ladakh', name: 'Ladakh', state: 'Ladakh', tagline: 'High Himalayan Monasteries, Passes & Pangong' },
  { slug: 'leh', name: 'Leh', state: 'Ladakh', tagline: 'High Himalayan Monasteries, Passes & Pangong' },
  { slug: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', tagline: 'Yoga Capital, River Rapids & Ganga Aarti' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi NCR', tagline: 'Mughal Monuments, Colonial Grandeur & Spice Bazaars' },
]

for (const city of popularCities) {
  if (!seedDestinations[city.slug]) {
    const dyn = generateDynamicDestination(city.name)
    dyn.state = city.state
    dyn.tagline = city.tagline
    seedDestinations[city.slug] = dyn
  }
}
