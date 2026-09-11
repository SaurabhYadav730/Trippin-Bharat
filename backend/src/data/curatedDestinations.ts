// Auto-synchronized authentic destination catalog for backend
import type { DestinationData } from './catalog.js'

export const curatedDestinations: Record<string, DestinationData> = {
  "agra": {
    "id": "agra",
    "slug": "agra",
    "name": "Agra",
    "state": "Uttar Pradesh",
    "tagline": "World Wonder · Mughal Imperial Capital · Taj Mahal & Heritage Riverfront",
    "shortBio": "The glittering seat of the Mughal Empire in the 16th and 17th centuries. Renowned across the planet for the peerless white marble mausoleum of the Taj Mahal, the colossal red sandstone ramparts of Agra Fort, the jewel-box pietra dura of Itmad-ud-Daulah, Akbar’s monumental tomb at Sikandra, and the deserted utopian imperial city of Fatehpur Sikri.",
    "heroBanner": "/images/places/taj-mahal.jpg",
    "heroGallery": [
      "/images/places/taj-mahal.jpg",
      "/images/places/agra-fort.jpg",
      "/images/places/itmad-ud-daulah.jpg",
      "/images/places/fatehpur-sikri.jpg",
      "/images/places/sikandra-akbar-tomb.jpg",
      "/images/places/mehtab-bagh.jpg"
    ],
    "bestSeason": "October – March",
    "recommendedDays": "2–3 Days",
    "approxBudgetPerDay": {
      "budget": 1800,
      "comfort": 4500,
      "luxury": 16000
    },
    "weather": {
      "tempC": 27,
      "condition": "Pleasant & Crisp",
      "humidity": "40%"
    },
    "tourismStatus": {
      "safetyScore": "4.7 / 5.0 (High Tourist Security)",
      "crowdLevel": "High",
      "peakHours": "9:30 AM – 3:30 PM (Taj Mahal Main Gateway)"
    },
    "curatedForStyles": [
      {
        "styleId": "mughal-marvels",
        "styleTitle": "Taj Mahal & Mughal Marvels",
        "description": "The monumental ivory-white mausoleum, Yamuna riverfront, and imperial Mughal citadel.",
        "recommendedPlaceIds": [
          "taj-mahal",
          "agra-fort",
          "itmad-ud-daulah",
          "mehtab-bagh",
          "sikandra-akbar-tomb",
          "fatehpur-sikri"
        ]
      },
      {
        "styleId": "heritage-architecture",
        "styleTitle": "Architecture & Stone Craft",
        "description": "Intricate marble jali fretwork, Pietra Dura gem inlay, and syncretic red sandstone pavilions.",
        "recommendedPlaceIds": [
          "itmad-ud-daulah",
          "taj-mahal",
          "agra-fort",
          "fatehpur-sikri",
          "chini-ka-rauza"
        ]
      },
      {
        "styleId": "spiritual-culture",
        "styleTitle": "Spiritual Shrines & Old Bazaars",
        "description": "Ancient Shiva sanctums, 17th-century Mughal mosques, and the bustling Panchi Petha lanes.",
        "recommendedPlaceIds": [
          "mankameshwar-temple",
          "jama-masjid-agra",
          "kinari-bazaar",
          "sikandra-akbar-tomb"
        ]
      }
    ],
    "places": [
      {
        "id": "taj-mahal",
        "name": "The Taj Mahal",
        "hindiName": "ताज महल",
        "tagline": "UNESCO World Heritage Wonder of the World in Pure White Makrana Marble",
        "category": "heritage",
        "categoryLabel": "UNESCO World Wonder",
        "rating": 5,
        "reviewCount": 48500,
        "images": [
          "/images/places/taj-mahal.jpg",
          "/images/places/mehtab-bagh.jpg"
        ],
        "description": "Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. Regarded universally as the greatest architectural achievement in the whole range of Indo-Islamic architecture.",
        "coordinates": {
          "lat": 27.1751,
          "lng": 78.0421
        },
        "entryFee": {
          "indian": 50,
          "foreign": 1100
        },
        "timings": "Sunrise to Sunset (Closed on Fridays)",
        "bestTimeToVisit": "6:00 AM at Sunrise (Avoid crowds and witness soft pink illumination)",
        "timeRequired": "2.5 – 3 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed over 22 years (1631–1653) employing 20,000 stone artisans, calligraphers, and gem carvers.",
          "architecturalStyle": "High Mughal Symmetry Architecture",
          "architectureHighlights": [
            "Four 40-meter minarets engineered to tilt slightly outwards to safeguard the central dome in case of earthquakes",
            "Pietra Dura (Parchin Kari) inlay of 28 types of precious and semi-precious gemstones into white Makrana marble",
            "Perfect bilateral symmetry reflecting across the Charbagh water gardens"
          ],
          "legendsAndStories": [
            "The color of the marble subtly transforms from blush rose at dawn to gleaming pearl white at noon and translucent gold under full moonlight."
          ],
          "bestPhotoSpots": [
            "Central Charbagh reflecting pool showing complete dual reflection",
            "Side arches of the red sandstone mosque framing the marble dome"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "mehtab-bagh",
            "name": "Mehtab Bagh Moonlight Garden",
            "category": "attraction",
            "distanceKm": 1.2,
            "travelTimeMin": 15
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "agra-fort",
            "name": "Agra Fort Citadel",
            "category": "attraction",
            "distanceKm": 2.5,
            "travelTimeMin": 10
          },
          {
            "id": "itmad-ud-daulah",
            "name": "Tomb of Itmad-ud-Daulah",
            "category": "attraction",
            "distanceKm": 4.2,
            "travelTimeMin": 15
          }
        ]
      },
      {
        "id": "agra-fort",
        "name": "Agra Fort (Lal Qila)",
        "hindiName": "आगरा का लाल किला",
        "tagline": "Colossal 94-Acre Red Sandstone Citadel of the Great Mughals",
        "category": "palace",
        "categoryLabel": "UNESCO Imperial Citadel",
        "rating": 4.8,
        "reviewCount": 24200,
        "images": [
          "/images/places/agra-fort.jpg"
        ],
        "description": "The primary residence of the emperors of the Mughal Dynasty until 1638. Built by Akbar the Great with red sandstone walls rising 70 feet above the Yamuna moat.",
        "coordinates": {
          "lat": 27.1795,
          "lng": 78.0211
        },
        "entryFee": {
          "indian": 50,
          "foreign": 650
        },
        "timings": "Sunrise to Sunset (Open daily)",
        "bestTimeToVisit": "2:30 PM – 5:30 PM for golden afternoon light on sandstone",
        "timeRequired": "2 – 2.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Rebuilt by Akbar on the ruins of Badalgarh starting in 1565; Shah Jahan later added the white marble palaces.",
          "architecturalStyle": "Imperial Mughal Fort Architecture",
          "architectureHighlights": [
            "Musamman Burj octagonal marble tower where Shah Jahan spent his final years gazing at the Taj Mahal",
            "Diwan-i-Khas private audience hall with carved marble pillars",
            "Sheesh Mahal Turkish bath inlaid with thousands of mirrored glass pieces"
          ],
          "legendsAndStories": [
            "Shah Jahan was imprisoned here in 1658 by his ambitious son Aurangzeb, spending his remaining eight years looking out across the river at Mumtaz’s tomb."
          ],
          "bestPhotoSpots": [
            "Archway view from Musamman Burj looking directly towards the Taj Mahal",
            "Amar Singh Gate red sandstone rampart curve"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "jama-masjid-agra",
            "name": "Jama Masjid Agra",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 5
          },
          {
            "id": "mankameshwar-temple",
            "name": "Mankameshwar Temple",
            "category": "attraction",
            "distanceKm": 0.8,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "taj-mahal",
            "name": "The Taj Mahal",
            "category": "attraction",
            "distanceKm": 2.5,
            "travelTimeMin": 10
          },
          {
            "id": "itmad-ud-daulah",
            "name": "Tomb of Itmad-ud-Daulah",
            "category": "attraction",
            "distanceKm": 3.1,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "itmad-ud-daulah",
        "name": "Tomb of I’timād-ud-Daulah (Baby Taj)",
        "hindiName": "इत्माद-उद-दौला का मक़बरा",
        "tagline": "Pietra Dura Masterpiece · The Jewel Box Precursor to the Taj Mahal",
        "category": "heritage",
        "categoryLabel": "Mughal Marble Masterpiece",
        "rating": 4.8,
        "reviewCount": 16800,
        "images": [
          "/images/places/itmad-ud-daulah.jpg"
        ],
        "description": "Built between 1622 and 1628 by Empress Nur Jahan for her father Mirza Ghiyas Beg. It is the first Mughal structure built entirely from white Rajasthan marble with pietra dura gemstone inlay, earning it the affectionate title \"The Baby Taj\" or \"Jewel Box\".",
        "coordinates": {
          "lat": 27.1929,
          "lng": 78.0313
        },
        "entryFee": {
          "indian": 30,
          "foreign": 310
        },
        "timings": "6:00 AM – 6:00 PM (Daily)",
        "bestTimeToVisit": "10:00 AM – 1:00 PM (Crisp daylight reveals the semi-precious jasper, onyx, and carnelian inlays)",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Commissioned by Nur Jahan, the powerful twentieth and favourite empress of Jahangir, in memory of her statesman father.",
          "architecturalStyle": "Mughal Riverfront Garden Pavilion Architecture",
          "architectureHighlights": [
            "Intricate lattice marble jalis with geometric star patterns",
            "Finely detailed vases, wine vessels, and cypress trees depicted in polychrome stone mosaic",
            "Tranquil Persian Charbagh setting on the eastern bank of the Yamuna River"
          ],
          "legendsAndStories": [
            "Architects consider this tomb the crucial transitional bridge between the red sandstone style of Akbar and the pure white marble sublime era of Shah Jahan."
          ],
          "bestPhotoSpots": [
            "Eastern river gate looking towards the symmetric marble pavilion",
            "Extreme close-up of the delicate floral inlay work on the inner marble sarcophagi"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "chini-ka-rauza",
            "name": "Chini Ka Rauza",
            "category": "attraction",
            "distanceKm": 1,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "taj-mahal",
            "name": "The Taj Mahal",
            "category": "attraction",
            "distanceKm": 4.2,
            "travelTimeMin": 15
          },
          {
            "id": "agra-fort",
            "name": "Agra Fort",
            "category": "attraction",
            "distanceKm": 3.1,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "sikandra-akbar-tomb",
        "name": "Akbar’s Tomb at Sikandra",
        "hindiName": "अकबर का मक़बरा, सिकंदरा",
        "tagline": "Monumental 5-Tier Red Sandstone Mausoleum in a 119-Acre Deer Sanctuary",
        "category": "heritage",
        "categoryLabel": "Imperial Mausoleum & Nature",
        "rating": 4.7,
        "reviewCount": 14200,
        "images": [
          "/images/places/sikandra-akbar-tomb.jpg",
          "/images/places/mariam-tomb.jpg"
        ],
        "description": "The final resting place of Akbar the Great, commenced by himself and completed by Jahangir in 1613. Built in rich red sandstone inlaid with white marble, surrounded by four massive minarets and vast gardens inhabited by wild spotted deer and peacocks.",
        "coordinates": {
          "lat": 27.2205,
          "lng": 77.9504
        },
        "entryFee": {
          "indian": 35,
          "foreign": 310
        },
        "timings": "6:00 AM – 6:30 PM (Daily)",
        "bestTimeToVisit": "8:00 AM – 11:00 AM (Quiet morning walk among roaming blackbuck deer and peacocks)",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Akbar personally chose this site at Sikandra on the Delhi-Agra highway and oversaw its design to reflect his universalist Din-i Ilahi philosophy.",
          "architecturalStyle": "Tiered Pyramidical Syncretic Indo-Islamic Architecture",
          "architectureHighlights": [
            "South Gate: Four towering white marble minarets standing 35 meters tall resembling the Taj Mahal minarets",
            "Open-air top marble courtyard housing the cenotaph inscribed with 99 names of Allah",
            "Vast Charbagh lawns home to freely roaming antelopes and peacocks"
          ],
          "legendsAndStories": [
            "Unlike traditional Mughal tombs, the central chamber lacks a conventional dome and is instead capped with an open marble terrace honoring the open sky."
          ],
          "bestPhotoSpots": [
            "Grand Buland-style South Gateway framed against blue skies",
            "Spotted deer grazing in front of the sandstone pavilion arches"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "mariam-tomb",
            "name": "Tomb of Mariam-uz-Zamani",
            "category": "attraction",
            "distanceKm": 1,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": []
      },
      {
        "id": "fatehpur-sikri",
        "name": "Fatehpur Sikri Imperial Complex",
        "hindiName": "फतेहपुर सीकरी",
        "tagline": "Akbar’s Utopian Red Sandstone Capital & Buland Darwaza",
        "category": "heritage",
        "categoryLabel": "UNESCO Ancient Capital",
        "rating": 4.8,
        "reviewCount": 19500,
        "images": [
          "/images/places/fatehpur-sikri.jpg"
        ],
        "description": "Founded in 1571 by Emperor Akbar as the imperial capital of the Mughal Empire. Preserves the 54-meter Buland Darwaza (Door of Victory), the white marble tomb of Sufi saint Salim Chishti, and the five-storey Panch Mahal.",
        "coordinates": {
          "lat": 27.0945,
          "lng": 77.6679
        },
        "entryFee": {
          "indian": 50,
          "foreign": 610
        },
        "timings": "Sunrise to Sunset (Daily)",
        "bestTimeToVisit": "9:00 AM – 1:00 PM (Allow sufficient time for the 37 km drive from central Agra)",
        "timeRequired": "3 – 3.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Built in honour of Shaikh Salim Chishti who predicted the birth of Akbar’s son Jahangir, but abandoned in 1585 due to acute water scarcity.",
          "architecturalStyle": "Mughal-Rajput Syncretic Sandstone Architecture",
          "architectureHighlights": [
            "Buland Darwaza: 54-meter high gateway commemorating Akbar’s conquest of Gujarat",
            "Panch Mahal: Five-storey pillared open pavilion built like a Buddhist vihara",
            "Tomb of Sheikh Salim Chishti: Delicately pierced marble jali latticework screens"
          ],
          "legendsAndStories": [
            "Pilgrims tie a red sacred thread to the marble jali screens of the Sufi saint’s dargah when making a prayer wish, returning to untie it once fulfilled."
          ],
          "bestPhotoSpots": [
            "Standing at the bottom of the 42 steep steps looking up at the monumental Buland Darwaza",
            "Intricate shadow patterns cast through the marble jali screens"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "mehtab-bagh",
        "name": "Mehtab Bagh (Moonlight Garden)",
        "hindiName": "मेहताब बाग़",
        "tagline": "Mughal Charbagh Directly Opposite the Taj Across Yamuna River",
        "category": "nature",
        "categoryLabel": "Mughal Heritage Garden",
        "rating": 4.7,
        "reviewCount": 15400,
        "images": [
          "/images/places/mehtab-bagh.jpg"
        ],
        "description": "A 25-acre crescent-shaped Charbagh garden complex situated directly across the Yamuna River from the Taj Mahal, providing the most photogenic unobstructed sunset vistas without the main monument crowds.",
        "coordinates": {
          "lat": 27.1802,
          "lng": 78.0422
        },
        "entryFee": {
          "indian": 25,
          "foreign": 300
        },
        "timings": "6:00 AM – 6:30 PM (Daily)",
        "bestTimeToVisit": "4:45 PM – 6:15 PM for golden hour and twilight river reflections",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "The last in a series of 11 Mughal gardens built along the Yamuna riverfront, restored by the Archaeological Survey of India.",
          "architecturalStyle": "Classic Four-Square Mughal Charbagh",
          "architectureHighlights": [
            "Direct alignment with the Taj Mahal tomb across the Yamuna River",
            "Octagonal pool and red sandstone foundation platforms",
            "Fragrant hibiscus and citrus groves"
          ],
          "legendsAndStories": [
            "Excavations here proved that the myth of a matching Black Marble Taj Mahal was historically untrue; the foundation was an octagonal viewing pool."
          ],
          "bestPhotoSpots": [
            "River edge vantage point capturing the Taj Mahal reflected on the Yamuna at golden hour"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "taj-mahal",
            "name": "The Taj Mahal",
            "category": "attraction",
            "distanceKm": 1.2,
            "travelTimeMin": 15
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "agra-fort",
            "name": "Agra Fort",
            "category": "attraction",
            "distanceKm": 4,
            "travelTimeMin": 15
          },
          {
            "id": "itmad-ud-daulah",
            "name": "Tomb of Itmad-ud-Daulah",
            "category": "attraction",
            "distanceKm": 3.5,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "chini-ka-rauza",
        "name": "Chini Ka Rauza",
        "hindiName": "चीनी का रौज़ा",
        "tagline": "1635 AD Persian Glazed Polychrome Tile Funerary Jewel on the Yamuna",
        "category": "heritage",
        "categoryLabel": "Persian Glazed Tile Heritage",
        "rating": 4.5,
        "reviewCount": 6800,
        "images": [
          "/images/places/chini-ka-rauza.jpg"
        ],
        "description": "The mausoleum of Allama Afzal Khan Mullah, the Prime Minister of Shah Jahan and a renowned Persian poet. Constructed in 1635, it is India’s finest surviving monument decorated with exotic turquoise, green, and orange glazed porcelain tiles (Chini).",
        "coordinates": {
          "lat": 27.2008,
          "lng": 78.0354
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "6:00 AM – 6:00 PM (Daily)",
        "bestTimeToVisit": "9:00 AM – 11:30 AM (Morning sunlight highlights the surviving turquoise ceramic tiles)",
        "timeRequired": "45 mins – 1 Hour",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Afzal Khan built this tomb during his lifetime; tiles were crafted using imported Persian kaolin glaze techniques.",
          "architecturalStyle": "Indo-Persian Tilework Vaulted Tomb",
          "architectureHighlights": [
            "Luminous turquoise, saffron, and lapis blue floral tile motifs on exterior facades",
            "Octagonal chamber with Persian Quranic calligraphy in stucco relief",
            "Peaceful river bank terrace away from conventional tourist crowds"
          ],
          "legendsAndStories": [
            "Named \"Chini\" (porcelain) because of the distinctive shiny, glass-like ceramic tiles that cover its exterior walls."
          ],
          "bestPhotoSpots": [
            "Surviving turquoise flower tile mosaics on the river-facing archway"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "itmad-ud-daulah",
            "name": "Tomb of Itmad-ud-Daulah",
            "category": "attraction",
            "distanceKm": 1,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "taj-mahal",
            "name": "The Taj Mahal",
            "category": "attraction",
            "distanceKm": 4.8,
            "travelTimeMin": 18
          }
        ]
      },
      {
        "id": "jama-masjid-agra",
        "name": "Jama Masjid Agra (Jami Masjid)",
        "hindiName": "जामा मस्जिद, आगरा",
        "tagline": "1648 AD Red Sandstone Cathedral Mosque Built by Princess Jahanara Begum",
        "category": "temple",
        "categoryLabel": "Historic Mughal Friday Mosque",
        "rating": 4.6,
        "reviewCount": 9200,
        "images": [
          "/images/places/jama-masjid-agra.jpg"
        ],
        "description": "One of the largest mosques in India, built in 1648 by Mughal Emperor Shah Jahan’s eldest daughter, Princess Jahanara Begum. Situated directly opposite the Delhi Gate of Agra Fort, it features three striking inverted onion domes with zigzag marble banding.",
        "coordinates": {
          "lat": 27.1843,
          "lng": 78.0163
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "6:00 AM – 8:00 PM (Open daily, restricted prayer hours on Friday)",
        "bestTimeToVisit": "8:30 AM – 10:30 AM or 4:00 PM – 5:30 PM",
        "timeRequired": "1 Hour",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Jahanara Begum financed the mosque with her personal allowance, creating an architectural centerpiece for the bustling markets of Agra.",
          "architecturalStyle": "High Mughal Sandstone & Marble Inlay",
          "architectureHighlights": [
            "Three bulbous red sandstone domes patterned with zigzag herringbone bands of white marble",
            "Spacious courtyard accommodating 10,000 worshippers overlooking the old city markets",
            "Five arched entrances decorated with carved lotus petals"
          ],
          "legendsAndStories": [
            "An ancient octagonal courtyard once linked this grand mosque directly to the Delhi Gate of Agra Fort until the British railway line was constructed in the 19th century."
          ],
          "bestPhotoSpots": [
            "Elevated central courtyard looking toward the patterned domes against the sky"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "agra-fort",
            "name": "Agra Fort",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 5
          },
          {
            "id": "mankameshwar-temple",
            "name": "Mankameshwar Temple",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 4
          },
          {
            "id": "kinari-bazaar",
            "name": "Kinari Bazaar",
            "category": "experience",
            "distanceKm": 0.3,
            "travelTimeMin": 3
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "taj-mahal",
            "name": "The Taj Mahal",
            "category": "attraction",
            "distanceKm": 3.2,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "mankameshwar-temple",
        "name": "Mankameshwar Temple",
        "hindiName": "मनकामेश्वर मंदिर, आगरा",
        "tagline": "Ancient Sacred Shiva Shrine Guarding Old Agra’s Rawatpara Spice Market",
        "category": "temple",
        "categoryLabel": "Sacred Living Hindu Shrine",
        "rating": 4.7,
        "reviewCount": 11200,
        "images": [
          "/images/places/mankameshwar-temple.jpg"
        ],
        "description": "One of the four ancient Shiva temples situated at the four corners of Agra city. Enclosing a revered silver-encased Shiva Lingam, this vibrant living temple is situated in the historic heart of Rawatpara and is famous for deeply atmospheric evening aartis.",
        "coordinates": {
          "lat": 27.1856,
          "lng": 78.0142
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "5:00 AM – 12:00 PM, 3:00 PM – 10:30 PM (Daily)",
        "bestTimeToVisit": "6:30 PM for the vibrant evening Ganga-style conch shell and drum aarti",
        "timeRequired": "45 mins – 1 Hour",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Legend recounts that Lord Shiva founded this lingam himself during the Dvapara Yuga while en route to Mathura to see infant Krishna.",
          "architecturalStyle": "Traditional North Indian Nagara Temple Architecture",
          "architectureHighlights": [
            "Silver-clad sanctum sanctorum housing the Svayambhu Shiva Lingam",
            "Vibrant multi-tiered gopuram surrounded by flower and incense stalls",
            "Living cultural atmosphere untouched by modern commercial tourism"
          ],
          "legendsAndStories": [
            "Devotees believe that sincere wishes (\"Kamna\") offered with pure devotion at this ancient altar are inevitably granted."
          ],
          "bestPhotoSpots": [
            "Temple entrance alleyway with fragrant marigold flower garlands and brass lamps"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "jama-masjid-agra",
            "name": "Jama Masjid Agra",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 4
          },
          {
            "id": "kinari-bazaar",
            "name": "Kinari Bazaar",
            "category": "experience",
            "distanceKm": 0.2,
            "travelTimeMin": 3
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "agra-fort",
            "name": "Agra Fort",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 7
          }
        ]
      },
      {
        "id": "kinari-bazaar",
        "name": "Kinari Bazaar & Artisan Petha Trail",
        "hindiName": "किनारी बाज़ार एवं पेठा लेन",
        "tagline": "Centuries-Old Artisan Alleyways · Zardozi Embroidery & Panchi Petha",
        "category": "craft",
        "categoryLabel": "Living Heritage Bazaar",
        "rating": 4.6,
        "reviewCount": 13500,
        "images": [
          "/images/places/jama-masjid-agra.jpg",
          "/images/places/agra-fort.jpg"
        ],
        "description": "The historic labyrinth of bazaars behind the Jama Masjid dating to Mughal times. Famed for authentic gold and silver thread Zardozi embroidery, handmade leather footwear, brass handicrafts, and legendary fresh sweet Agra Petha shops.",
        "coordinates": {
          "lat": 27.186,
          "lng": 78.017
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "11:00 AM – 9:00 PM (Closed on Sundays)",
        "bestTimeToVisit": "4:00 PM – 7:30 PM (Best for strolling, artisan workshops, and street snack tastings)",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Flourished under Mughal royal patronage when royal court tailors, jewelers, and sweet makers established shops here.",
          "architecturalStyle": "Traditional Mughal-era Bazaars with Narrow Havelis",
          "architectureHighlights": [
            "Overhanging wooden balconies and jharokha facades above bustling merchant shops",
            "Specialized lanes for marble miniatures, bridal jewelry, spices, and copperware"
          ],
          "legendsAndStories": [
            "Petha was invented in Mughal imperial kitchens during the construction of the Taj Mahal to provide instant hydration and energy to the 20,000 stonemasons."
          ],
          "bestPhotoSpots": [
            "Narrow alley perspectives framed with hanging brass lamps and vibrant textiles"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "jama-masjid-agra",
            "name": "Jama Masjid Agra",
            "category": "attraction",
            "distanceKm": 0.3,
            "travelTimeMin": 3
          },
          {
            "id": "mankameshwar-temple",
            "name": "Mankameshwar Temple",
            "category": "attraction",
            "distanceKm": 0.2,
            "travelTimeMin": 3
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "agra-fort",
            "name": "Agra Fort",
            "category": "attraction",
            "distanceKm": 1,
            "travelTimeMin": 8
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "hotel-sheela-agra",
        "name": "Hotel Sheela (Eco Taj Heritage Stay)",
        "type": "budget_homestay",
        "tier": "budget",
        "rating": 4.5,
        "pricePerNight": 1400,
        "image": "/images/places/taj-mahal.jpg",
        "amenities": [
          "100m to Taj East Gate (Walk in 2 mins)",
          "Quiet Garden Courtyard",
          "Clean Private Baths",
          "Free High-Speed Wi-Fi"
        ],
        "address": "Near Taj Mahal Eastern Gate, Tajganj, Agra",
        "distanceToItineraryHighlights": [
          {
            "placeId": "taj-mahal",
            "placeName": "The Taj Mahal",
            "distanceKm": 0.2,
            "drivingTimeMin": 2
          },
          {
            "placeId": "agra-fort",
            "placeName": "Agra Fort",
            "distanceKm": 2.8,
            "drivingTimeMin": 8
          }
        ]
      },
      {
        "id": "crystal-sarovar-agra",
        "name": "Crystal Sarovar Premiere",
        "type": "boutique_haveli",
        "tier": "comfort",
        "rating": 4.7,
        "pricePerNight": 4200,
        "image": "/images/places/mehtab-bagh.jpg",
        "amenities": [
          "Rooftop Taj-View Swimming Pool",
          "Multi-Cuisine Restaurant",
          "Fitness Center",
          "Travel Concierge"
        ],
        "address": "Fatehabad Road, Tajganj, Agra",
        "distanceToItineraryHighlights": [
          {
            "placeId": "taj-mahal",
            "placeName": "The Taj Mahal",
            "distanceKm": 2.2,
            "drivingTimeMin": 6
          },
          {
            "placeId": "agra-fort",
            "placeName": "Agra Fort",
            "distanceKm": 3.5,
            "drivingTimeMin": 10
          }
        ]
      },
      {
        "id": "itc-mughal-agra",
        "name": "ITC Mughal, A Luxury Collection Resort",
        "type": "luxury_palace",
        "tier": "luxury",
        "rating": 4.8,
        "pricePerNight": 16000,
        "image": "/images/places/taj-mahal.jpg",
        "amenities": [
          "35 Acres of Mughal Gardens",
          "Kaya Kalp Royal Spa",
          "Peshawri Dining",
          "Taj View Observatory"
        ],
        "address": "Taj Ganj, Agra, Uttar Pradesh",
        "distanceToItineraryHighlights": [
          {
            "placeId": "taj-mahal",
            "placeName": "The Taj Mahal",
            "distanceKm": 2.8,
            "drivingTimeMin": 8
          },
          {
            "placeId": "agra-fort",
            "placeName": "Agra Fort",
            "distanceKm": 3.5,
            "drivingTimeMin": 10
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "panchi-petha-agra",
        "name": "Panchi Petha (Original Sadar Outlet)",
        "cuisineType": "Authentic Agra Confectionery & Chaat",
        "type": "street_food_legend",
        "rating": 4.9,
        "priceForTwo": 250,
        "image": "/images/places/agra-fort.jpg",
        "mustTryDishes": [
          "Kesar Angoori Petha",
          "Paan Petha",
          "Bedmi Puri & Hing Aloo Sabzi",
          "Dal Moth Namkeen"
        ],
        "specialty": "The undisputed 70-year-old culinary symbol of Agra sweets and savory snacks",
        "timings": "8:00 AM – 10:30 PM",
        "address": "Near Sadar Bazaar, Agra Cantonment",
        "coordinates": {
          "lat": 27.163,
          "lng": 78.009
        },
        "isVeg": true
      },
      {
        "id": "rambabu-paratha-bhandar",
        "name": "Rambabu Paratha Bhandar",
        "cuisineType": "Traditional Mughlai & Mathura Parathas",
        "type": "traditional_thali",
        "rating": 4.7,
        "priceForTwo": 450,
        "image": "/images/places/itmad-ud-daulah.jpg",
        "mustTryDishes": [
          "Crisp Dal Paratha",
          "Paneer Kaju Paratha",
          "Methi Matar Malai",
          "Sweet Gulab Jamun"
        ],
        "specialty": "Pure ghee deep-fried crisp stuffed parathas served with pumpkin sabzi and mint chutney",
        "timings": "9:00 AM – 10:30 PM",
        "address": "Belanganj & Taj Road, Agra",
        "coordinates": {
          "lat": 27.191,
          "lng": 78.024
        },
        "isVeg": true
      },
      {
        "id": "peshawri-itc",
        "name": "Peshawri at ITC Mughal",
        "cuisineType": "North-West Frontier & Mughal",
        "type": "heritage_restaurant",
        "rating": 4.9,
        "priceForTwo": 3600,
        "image": "/images/places/agra-fort.jpg",
        "mustTryDishes": [
          "Slow-cooked Dal Bukhara (simmered 18 hours)",
          "Murgh Malai Kebab",
          "Sikandari Raan",
          "Peshawri Naan"
        ],
        "specialty": "Authentic tandoori clay oven delicacies with brassware dining",
        "timings": "12:30 PM – 3:00 PM, 7:00 PM – 11:30 PM",
        "address": "ITC Mughal, Fatehabad Road, Agra",
        "coordinates": {
          "lat": 27.161,
          "lng": 78.038
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "taj-sunrise-lens-trail",
        "title": "Dawn Taj Mahal & Yamuna Heritage Lens Walk",
        "category": "photography",
        "categoryLabel": "Monument Photography",
        "duration": "3 Hours",
        "price": 950,
        "image": "/images/places/taj-mahal.jpg",
        "description": "First entrance into the monument gardens at 6 AM to capture mist rising off the marble dome without crowds.",
        "highlights": [
          "Early ticket access escort",
          "Secret architectural photo angles",
          "Pietra dura artisan studio visit"
        ],
        "timing": "5:45 AM – 8:45 AM",
        "location": "East Gate of Taj Mahal",
        "rating": 4.9
      },
      {
        "id": "mughal-artisan-trail",
        "title": "Parchin Kari (Pietra Dura) Masterclass & Bazaar Walk",
        "category": "craft",
        "categoryLabel": "Artisan Heritage Walk",
        "duration": "2.5 Hours",
        "price": 650,
        "image": "/images/places/itmad-ud-daulah.jpg",
        "description": "Hands-on session with seventh-generation marble inlay artisans carving carnelian and lapis into Makrana marble.",
        "highlights": [
          "Traditional bow-lathe stone cutting demonstration",
          "Old Kinari Bazaar sweet tasting",
          "Make-your-own marble coaster souvenir"
        ],
        "timing": "3:30 PM – 6:00 PM",
        "location": "Taj Ganj Marble Artisan Quarter",
        "rating": 4.8
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Day 01: Imperial Wonders — Dawn Taj Mahal & Red Fort Citadel",
        "dateLabel": "Day 01",
        "totalDistanceKm": 7.8,
        "totalTravelTimeMin": 40,
        "totalDaySpend": 420,
        "stops": [
          {
            "id": "a-d1-1",
            "placeId": "taj-mahal",
            "placeName": "The Taj Mahal at Sunrise",
            "category": "heritage",
            "timeSlot": "6:00 AM – 9:00 AM",
            "durationMin": 180,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 50,
            "iconType": "Landmark",
            "notes": "Enter through East Gate at dawn for soft lighting and peaceful gardens.",
            "coordinates": {
              "lat": 27.1751,
              "lng": 78.0421
            }
          },
          {
            "id": "a-d1-2",
            "placeId": "agra-fort",
            "placeName": "Agra Fort & Musamman Burj",
            "category": "palace",
            "timeSlot": "11:00 AM – 1:30 PM",
            "durationMin": 150,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 2.5,
            "estimatedCost": 50,
            "iconType": "Landmark",
            "notes": "Explore Akbar’s palaces and the royal prison tower.",
            "coordinates": {
              "lat": 27.1795,
              "lng": 78.0211
            }
          },
          {
            "id": "a-d1-3",
            "placeId": "mehtab-bagh",
            "placeName": "Sunset across Yamuna at Mehtab Bagh",
            "category": "nature",
            "timeSlot": "4:45 PM – 6:15 PM",
            "durationMin": 90,
            "travelFromPrevMin": 20,
            "distanceFromPrevKm": 4,
            "estimatedCost": 25,
            "iconType": "Sun",
            "notes": "Sunset golden hour reflections of the Taj across the river.",
            "coordinates": {
              "lat": 27.1802,
              "lng": 78.0422
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Day 02: Jewels of the Yamuna — Baby Taj, Sikandra & Old Bazaars",
        "dateLabel": "Day 02",
        "totalDistanceKm": 18.2,
        "totalTravelTimeMin": 55,
        "totalDaySpend": 360,
        "stops": [
          {
            "id": "a-d2-1",
            "placeId": "itmad-ud-daulah",
            "placeName": "Tomb of I’timād-ud-Daulah (Baby Taj)",
            "category": "heritage",
            "timeSlot": "9:00 AM – 10:30 AM",
            "durationMin": 90,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 3.5,
            "estimatedCost": 30,
            "iconType": "Sparkles",
            "notes": "Admire the finest white marble pietra dura inlay and peaceful gardens.",
            "coordinates": {
              "lat": 27.1929,
              "lng": 78.0313
            }
          },
          {
            "id": "a-d2-2",
            "placeId": "chini-ka-rauza",
            "placeName": "Chini Ka Rauza Glazed Tile Tomb",
            "category": "heritage",
            "timeSlot": "11:00 AM – 11:45 AM",
            "durationMin": 45,
            "travelFromPrevMin": 6,
            "distanceFromPrevKm": 1,
            "estimatedCost": 0,
            "iconType": "Landmark",
            "notes": "Surviving 1635 Persian turquoise glazed porcelain tiles on Yamuna riverfront.",
            "coordinates": {
              "lat": 27.2008,
              "lng": 78.0354
            }
          },
          {
            "id": "a-d2-3",
            "placeId": "sikandra-akbar-tomb",
            "placeName": "Akbar’s Tomb at Sikandra",
            "category": "heritage",
            "timeSlot": "2:30 PM – 4:30 PM",
            "durationMin": 120,
            "travelFromPrevMin": 22,
            "distanceFromPrevKm": 11.5,
            "estimatedCost": 35,
            "iconType": "Landmark",
            "notes": "Monumental 5-tier sandstone mausoleum with spotted deer and marble minarets.",
            "coordinates": {
              "lat": 27.2205,
              "lng": 77.9504
            }
          },
          {
            "id": "a-d2-4",
            "placeId": "kinari-bazaar",
            "placeName": "Kinari Bazaar & Panchi Petha Evening Walk",
            "category": "craft",
            "timeSlot": "5:30 PM – 7:30 PM",
            "durationMin": 120,
            "travelFromPrevMin": 18,
            "distanceFromPrevKm": 8.5,
            "estimatedCost": 200,
            "iconType": "ShoppingBag",
            "notes": "Old city artisan street stroll, Zardozi embroidery, and warm Bedmi Puri.",
            "coordinates": {
              "lat": 27.186,
              "lng": 78.017
            }
          }
        ]
      },
      {
        "dayNumber": 3,
        "themeTitle": "Day 03: Imperial Citadel of Akbar — Excursion to Fatehpur Sikri",
        "dateLabel": "Day 03",
        "totalDistanceKm": 76,
        "totalTravelTimeMin": 90,
        "totalDaySpend": 550,
        "stops": [
          {
            "id": "a-d3-1",
            "placeId": "fatehpur-sikri",
            "placeName": "Fatehpur Sikri Imperial Complex & Buland Darwaza",
            "category": "heritage",
            "timeSlot": "9:30 AM – 1:30 PM",
            "durationMin": 240,
            "travelFromPrevMin": 50,
            "distanceFromPrevKm": 37,
            "estimatedCost": 50,
            "iconType": "Landmark",
            "notes": "54-meter Buland Darwaza, Salim Chishti marble tomb, and Panch Mahal.",
            "coordinates": {
              "lat": 27.0945,
              "lng": 77.6679
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/taj-mahal.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 27.1751,
      "lng": 78.0421
    }
  },
  "jaipur": {
    "id": "jaipur",
    "slug": "jaipur",
    "name": "Jaipur",
    "state": "Rajasthan",
    "tagline": "The Pink City · Rajput Fortresses · UNESCO World Heritage",
    "shortBio": "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city built according to Vedic Vastu Shastra. Famed for its terracotta-pink facades, astronomical observatories, imposing hilltop fortresses, and living block-printing crafts.",
    "heroBanner": "/images/places/amber-fort.jpg",
    "heroGallery": [
      "/images/places/amber-fort.jpg",
      "/images/places/hawa-mahal.jpg",
      "/images/places/jal-mahal.jpg",
      "/images/places/city-palace-jaipur.jpg"
    ],
    "bestSeason": "October – March",
    "recommendedDays": "3–4 Days",
    "approxBudgetPerDay": {
      "budget": 2000,
      "comfort": 4800,
      "luxury": 18000
    },
    "weather": {
      "tempC": 28,
      "condition": "Sunny & Pleasant",
      "humidity": "38%"
    },
    "tourismStatus": {
      "safetyScore": "4.8 / 5.0 (High Tourist Safety)",
      "crowdLevel": "Moderate",
      "peakHours": "10:00 AM – 4:00 PM (Amber Fort & City Palace)"
    },
    "curatedForStyles": [
      {
        "styleId": "forts",
        "styleTitle": "Royal Forts & Palaces",
        "description": "Majestic hill fortresses, royal ceremonial courtyards, and mirror-work palaces across the Aravalli ridges.",
        "recommendedPlaceIds": [
          "amber-fort",
          "hawa-mahal",
          "city-palace-jaipur",
          "jal-mahal",
          "jantar-mantar-jaipur",
          "nahargarh-fort"
        ]
      },
      {
        "styleId": "crafts",
        "styleTitle": "Johari Bazaars & Block Print",
        "description": "Century-old gemstone lapidary streets, Bagru block print ateliers, and blue pottery artisan workshops.",
        "recommendedPlaceIds": [
          "city-palace-jaipur",
          "hawa-mahal",
          "jantar-mantar-jaipur"
        ]
      }
    ],
    "places": [
      {
        "id": "amber-fort",
        "name": "Amber Fort & Palace",
        "hindiName": "आमेर किला, जयपुर",
        "tagline": "UNESCO 1592 AD hilltop stronghold with the world-famous Sheesh Mahal",
        "category": "palace",
        "categoryLabel": "UNESCO Hill Fortress",
        "rating": 4.9,
        "reviewCount": 46200,
        "images": [
          "/images/places/amber-fort.jpg",
          "/images/places/nahargarh-fort.jpg"
        ],
        "description": "Perched majestically above Maota Lake, Amer Fort was built by Raja Man Singh I in 1592. Crafted from red sandstone and yellow marble, it showcases four successive courtyard tiers, intricate Mughal garden geometries, and the breathtaking Hall of Mirrors (Sheesh Mahal).",
        "coordinates": {
          "lat": 26.9855,
          "lng": 75.8513
        },
        "entryFee": {
          "indian": 100,
          "foreign": 500,
          "student": 20
        },
        "timings": "8:00 AM – 5:30 PM, Light Show: 7:00 PM – 9:00 PM",
        "bestTimeToVisit": "8:30 AM (Before crowds arrive) or sunset for the sound & light show",
        "timeRequired": "3 – 4 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed over centuries by Kachwaha Rajput kings. It remained the seat of power until Sawai Jai Singh II founded Jaipur in the plains below in 1727.",
          "architecturalStyle": "High Rajput-Mughal Fusion Fortress Architecture",
          "architectureHighlights": [
            "Sheesh Mahal: Inlaid with thousands of concave convex mirrors imported from Belgium that illuminate with a single candle",
            "Ganesh Pol: Splendid three-level ceremonial gate painted with vegetable-dye frescoes",
            "Sukh Niwas: Piped water channels engineered to cool breezes during blazing desert summers"
          ],
          "legendsAndStories": [
            "Secret Subterranean Escape Tunnel: A 2-kilometer underground passage connects Amber Fort directly to Jaigarh Fort above for royal military defense."
          ],
          "bestPhotoSpots": [
            "Maota Lake reflection from Kesar Kyari garden",
            "Sheesh Mahal arched entry alcove"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "jaigarh-fort",
            "name": "Jaigarh Fort (World's Largest Cannon)",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 12
          },
          {
            "id": "panna-meena",
            "name": "Panna Meena Ka Kund Stepwell",
            "category": "experience",
            "distanceKm": 0.7,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jal-mahal",
            "name": "Jal Mahal (Water Palace)",
            "category": "attraction",
            "distanceKm": 4.1,
            "travelTimeMin": 12
          },
          {
            "id": "nahargarh-fort",
            "name": "Nahargarh Fort Ridge",
            "category": "attraction",
            "distanceKm": 4.8,
            "travelTimeMin": 18
          }
        ]
      },
      {
        "id": "hawa-mahal",
        "name": "Hawa Mahal (Palace of Winds)",
        "hindiName": "हवा महल, जयपुर",
        "tagline": "Iconic 1799 AD five-story pink honeycomb facade with 953 jharokhas",
        "category": "palace",
        "categoryLabel": "Royal Architectural Icon",
        "rating": 4.8,
        "reviewCount": 52100,
        "images": [
          "/images/places/hawa-mahal.jpg",
          "/images/places/city-palace-jaipur.jpg"
        ],
        "description": "Built by Maharaja Sawai Pratap Singh in 1799, this five-story pink sandstone pyramid was inspired by the crown of Lord Krishna. Its 953 intricately carved casements allowed purdah-observing royal ladies to observe vibrant street festivals without being seen.",
        "coordinates": {
          "lat": 26.9239,
          "lng": 75.8267
        },
        "entryFee": {
          "indian": 50,
          "foreign": 200,
          "student": 15
        },
        "timings": "9:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "Early morning (Golden sunrise hits the pink facade directly)",
        "timeRequired": "1 – 1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Designed by architect Lal Chand Ustad. The natural Venturi aerodynamic effect creates a constant cool breeze throughout the inner rooms even in 45°C summers.",
          "architecturalStyle": "Rajput-Mughal Filigree Architecture",
          "architectureHighlights": [
            "953 Jharokha stone windows with miniature lattice screens",
            "Ramp system instead of staircases for carrying royal palanquins to top levels",
            "Vibrant colored glass panels that cast rainbow patterns across marble chambers"
          ],
          "legendsAndStories": [
            "The entire structure is only one room thick at its upper levels, standing without foundations purely through geometric balance."
          ],
          "bestPhotoSpots": [
            "Rooftop cafes across the street framing the full facade",
            "Stained glass arched balcony at top floor"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "city-palace-jaipur",
            "name": "City Palace, Jaipur",
            "category": "attraction",
            "distanceKm": 0.5,
            "travelTimeMin": 6
          },
          {
            "id": "jantar-mantar-jaipur",
            "name": "Jantar Mantar UNESCO Observatory",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 7
          },
          {
            "id": "johari-bazar",
            "name": "Johari Gemstone Bazaar",
            "category": "experience",
            "distanceKm": 0.3,
            "travelTimeMin": 4
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jal-mahal",
            "name": "Jal Mahal",
            "category": "attraction",
            "distanceKm": 4.5,
            "travelTimeMin": 15
          },
          {
            "id": "albert-hall",
            "name": "Albert Hall Museum",
            "category": "attraction",
            "distanceKm": 2.2,
            "travelTimeMin": 10
          }
        ]
      },
      {
        "id": "city-palace-jaipur",
        "name": "City Palace, Jaipur",
        "hindiName": "सिटी पैलेस, जयपुर",
        "tagline": "Living royal residence of the Jaipur Maharajas and Chandra Mahal",
        "category": "palace",
        "categoryLabel": "Living Royal Palace",
        "rating": 4.8,
        "reviewCount": 39400,
        "images": [
          "/images/places/city-palace-jaipur.jpg",
          "/images/places/hawa-mahal.jpg"
        ],
        "description": "A sprawling palatial complex in the heart of the Old City founded in 1727. Houses the ceremonial Diwan-e-Khas (with the world’s largest sterling silver vessels), the famous Peacock Gate (Pritam Niwas Chowk), and royal textile galleries.",
        "coordinates": {
          "lat": 26.9258,
          "lng": 75.8236
        },
        "entryFee": {
          "indian": 300,
          "foreign": 700,
          "student": 150
        },
        "timings": "9:30 AM – 5:00 PM (Night Tour: 7:00 PM – 10:00 PM)",
        "bestTimeToVisit": "10:00 AM or late afternoon before gates close",
        "timeRequired": "2 – 3 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed by Sawai Jai Singh II and continuously expanded by his royal descendants, who still occupy private quarters in Chandra Mahal.",
          "architecturalStyle": "Mughal, Rajput, and European Eclectic Classical Architecture",
          "architectureHighlights": [
            "Pritam Niwas Chowk: Four iconic ceremonial gates dedicated to four seasons (Peacock, Lotus, Rose, and Green Wave)",
            "Two Gangajali silver urns recorded in Guinness Book weighing 340 kg each, used to carry sacred Ganga water to England in 1902",
            "Mubarak Mahal: Victorian and Islamic stone-latticed reception palace"
          ],
          "legendsAndStories": [
            "When Maharaja Madho Singh II sailed to London for King Edward VII’s coronation, he took only Ganga water in his giant silver urns because religious rites forbade drinking English water."
          ],
          "bestPhotoSpots": [
            "Peacock Gate mosaic doorway",
            "Courtyard of Diwan-e-Khas"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "jantar-mantar-jaipur",
            "name": "Jantar Mantar",
            "category": "attraction",
            "distanceKm": 0.1,
            "travelTimeMin": 2
          },
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 0.5,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "amber-fort",
            "name": "Amber Fort",
            "category": "attraction",
            "distanceKm": 8.5,
            "travelTimeMin": 22
          },
          {
            "id": "jal-mahal",
            "name": "Jal Mahal",
            "category": "attraction",
            "distanceKm": 4.8,
            "travelTimeMin": 14
          }
        ]
      },
      {
        "id": "jal-mahal",
        "name": "Jal Mahal (Water Palace)",
        "hindiName": "जल महल, जयपुर",
        "tagline": "18th-century yellow sandstone palace floating in Man Sagar Lake",
        "category": "palace",
        "categoryLabel": "Lakeside Royal Wonder",
        "rating": 4.7,
        "reviewCount": 31800,
        "images": [
          "/images/places/jal-mahal.jpg",
          "/images/places/amber-fort.jpg"
        ],
        "description": "Built in 1750 by Maharaja Madho Singh I as a summer pleasure retreat and duck hunting lodge. Though four of its five levels are submerged underwater, its waterproof lime mortar construction has preserved the palace for nearly 300 years.",
        "coordinates": {
          "lat": 26.9534,
          "lng": 75.8462
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Viewable 24 Hours from lakeside promenade (Interior entry restricted)",
        "bestTimeToVisit": "Sunset & Dusk (Illuminated floating silhouette against Aravalli hills)",
        "timeRequired": "45 Minutes",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed within an artificial reservoir created by damming the Darbhawati river to alleviate regional droughts.",
          "architecturalStyle": "Rajput Garden Palace with Bengal Chhatris",
          "architectureHighlights": [
            "Engineered submerged foundation with specialized hydraulic lime mortar",
            "Four octagonal domed chhatris crowning each corner of the upper terrace",
            "Surrounding sanctuary hosting hundreds of migratory wetland birds in winter"
          ],
          "legendsAndStories": [
            "The palace was designed to never be an overnight royal residence, but rather a day pavilion where royal duck hunting parties and flute concerts took place."
          ],
          "bestPhotoSpots": [
            "Lakeside promenade path framing the water reflection at sunset"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "kanak-vrindavan",
            "name": "Kanak Vrindavan Royal Valley Gardens",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "amber-fort",
            "name": "Amber Fort",
            "category": "attraction",
            "distanceKm": 4,
            "travelTimeMin": 12
          },
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 4.5,
            "travelTimeMin": 15
          }
        ]
      },
      {
        "id": "jantar-mantar-jaipur",
        "name": "Jantar Mantar Observatory",
        "hindiName": "जंतर मंतर, जयपुर",
        "tagline": "UNESCO World Heritage 1734 AD stone astronomical measurement marvel",
        "category": "heritage",
        "categoryLabel": "UNESCO Astronomical Heritage",
        "rating": 4.7,
        "reviewCount": 28900,
        "images": [
          "/images/places/jantar-mantar-jaipur.jpg",
          "/images/places/city-palace-jaipur.jpg"
        ],
        "description": "A collection of 19 monumental stone architectural astronomical instruments built by Sawai Jai Singh II between 1728 and 1734. Features Vrihat Samrat Yantra, the world’s largest stone sundial measuring time to an accuracy of 2 seconds.",
        "coordinates": {
          "lat": 26.9248,
          "lng": 75.8246
        },
        "entryFee": {
          "indian": 50,
          "foreign": 200,
          "student": 15
        },
        "timings": "9:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "12:00 PM Solar Noon (Watch the massive shadow cross the meridian dial)",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed by king-astronomer Sawai Jai Singh II after comparing Ptolemaic, Islamic, and European astronomical tables to create unyielding stone observation tools.",
          "architecturalStyle": "Astronomical Geometric Architecture",
          "architectureHighlights": [
            "Vrihat Samrat Yantra: 27-meter tall gnomon casting shadows calibrated to 2-second increments",
            "Jai Prakash Yantra: Hemispherical bowl sundials used for tracking celestial planetary orbits",
            "Rama Yantra: Cylindrical structures measuring local celestial altitudes and azimuths"
          ],
          "legendsAndStories": [
            "Jai Singh chose stone and marble over brass instruments because metal warped with Jaipur’s seasonal temperature swings from 4°C to 46°C."
          ],
          "bestPhotoSpots": [
            "Staircase of Samrat Yantra angled towards Polaris"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "city-palace-jaipur",
            "name": "City Palace, Jaipur",
            "category": "attraction",
            "distanceKm": 0.1,
            "travelTimeMin": 2
          },
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 7
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jal-mahal",
            "name": "Jal Mahal",
            "category": "attraction",
            "distanceKm": 4.6,
            "travelTimeMin": 14
          }
        ]
      },
      {
        "id": "nahargarh-fort",
        "name": "Nahargarh Fort",
        "hindiName": "नाहरगढ़ किला, जयपुर",
        "tagline": "Dramatic Aravalli cliff bastion with jaw-dropping views over the entire Pink City",
        "category": "palace",
        "categoryLabel": "Hilltop Bastion & Sunset View",
        "rating": 4.8,
        "reviewCount": 34100,
        "images": [
          "/images/places/nahargarh-fort.jpg",
          "/images/places/amber-fort.jpg"
        ],
        "description": "Standing guard over Jaipur on the steep edge of the Aravalli hills, Nahargarh (Tiger Fort) was built in 1734. Renowned for Madhavendra Bhawan, a two-story palace with identical suites for nine royal queens, and its sunset point overlooking city lights.",
        "coordinates": {
          "lat": 26.9372,
          "lng": 75.8156
        },
        "entryFee": {
          "indian": 50,
          "foreign": 200,
          "student": 20
        },
        "timings": "10:00 AM – 6:30 PM (Daily)",
        "bestTimeToVisit": "5:00 PM (Watch the sunset turn the Pink City golden from the ramparts)",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Originally named Sudarshangarh, it was renamed Nahargarh after the spirit of Prince Nahar Singh Bhomia, who supposedly haunted the site until a shrine was built.",
          "architecturalStyle": "Indo-European Rajput Fortress Architecture",
          "architectureHighlights": [
            "Madhavendra Bhawan: Nine identical suites designed with interconnected corridors for the nine wives of Sawai Madho Singh",
            "Deep stepped water baori reservoirs carved directly into solid granite mountain bedrock"
          ],
          "legendsAndStories": [
            "The fort was never attacked during its entire existence and served as a peaceful hunting sanctuary and retreat for royal ladies during treaties."
          ],
          "bestPhotoSpots": [
            "Western ramparts at dusk looking down at the illuminated grid layout of Jaipur"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "padao-cafe",
            "name": "Padao Open-Air Sunset Cafe",
            "category": "food",
            "distanceKm": 0.2,
            "travelTimeMin": 3
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jaigarh-fort",
            "name": "Jaigarh Fort",
            "category": "attraction",
            "distanceKm": 4.2,
            "travelTimeMin": 15
          },
          {
            "id": "amber-fort",
            "name": "Amber Fort",
            "category": "attraction",
            "distanceKm": 5.8,
            "travelTimeMin": 20
          }
        ]
      },
      {
        "id": "panna-meena-kund",
        "name": "Panna Meena Ka Kund (Stepwell)",
        "hindiName": "पन्ना मीना का कुंड",
        "tagline": "16th-century geometric stepwell with interlocking criss-cross stairways",
        "category": "lake",
        "categoryLabel": "Historic 16th-Century Stepwell",
        "rating": 4.8,
        "reviewCount": 14200,
        "images": [
          "/images/places/panna-meena-kund.jpg",
          "/images/places/amber-fort.jpg"
        ],
        "description": "A mesmerizing 16th-century architectural marvel tucked beneath Amber Fort. Built with symmetrical criss-cross zigzagging steps and octagonal recessed pavilions, it served as both a cool subterranean social gathering place and a rainwater reservoir for ancient desert travelers.",
        "coordinates": {
          "lat": 26.985,
          "lng": 75.8564
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0,
          "student": 0
        },
        "timings": "6:00 AM – 6:00 PM (Daily)",
        "bestTimeToVisit": "7:00 AM – 9:00 AM (Golden morning light illuminates the geometric shadow play)",
        "timeRequired": "45 Mins – 1 Hour",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed during the reign of Maharaja Man Singh I as a communal rainwater catchment stepwell, ingeniously engineered to stay cool during scorching Rajasthani summers.",
          "architecturalStyle": "Classical Rajput Geometric Stepwell (Baori)",
          "architectureHighlights": [
            "Symmetrical 8-tiered criss-cross staircase pattern descending into emerald water",
            "Octagonal corner chhatri pavilions used historically by travelers to rest in the shade",
            "Recessed water chambers carved to provide natural cooling micro-climates"
          ],
          "legendsAndStories": [
            "Local folklore claims that no person can walk down and climb back up using the exact same sequence of geometric steps."
          ],
          "bestPhotoSpots": [
            "Upper pavilion arch framing the diamond stair reflections",
            "Central symmetric perspective from the northern rim"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "amber-fort",
            "name": "Amber Fort & Palace",
            "category": "attraction",
            "distanceKm": 0.7,
            "travelTimeMin": 8
          },
          {
            "id": "jaigarh-fort",
            "name": "Jaigarh Fort",
            "category": "attraction",
            "distanceKm": 1.2,
            "travelTimeMin": 12
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jal-mahal",
            "name": "Jal Mahal (Water Palace)",
            "category": "attraction",
            "distanceKm": 4.5,
            "travelTimeMin": 14
          }
        ]
      },
      {
        "id": "albert-hall",
        "name": "Albert Hall State Central Museum",
        "hindiName": "अल्बर्ट हॉल संग्रहालय",
        "tagline": "1887 Indo-Saracenic royal palace museum housing priceless arts & crafts",
        "category": "heritage",
        "categoryLabel": "State Central Museum & Gardens",
        "rating": 4.7,
        "reviewCount": 28400,
        "images": [
          "/images/places/albert-hall.jpg",
          "/images/places/hawa-mahal.jpg"
        ],
        "description": "The oldest museum in Rajasthan, situated in the verdant Ram Niwas Garden. Designed by Sir Samuel Swinton Jacob in 1887, this magnificent Indo-Saracenic palace museum houses an extraordinary collection of royal miniature paintings, carved ivory, metalwork, Persian carpets, and ancient weaponry.",
        "coordinates": {
          "lat": 26.9117,
          "lng": 75.8194
        },
        "entryFee": {
          "indian": 40,
          "foreign": 300,
          "student": 20
        },
        "timings": "9:00 AM – 5:00 PM, Night view: 7:00 PM – 10:00 PM (Daily)",
        "bestTimeToVisit": "4:00 PM – 7:30 PM (Explore exhibits by day, then witness the spectacular golden nighttime illumination)",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Founded in 1876 during the visit of the Prince of Wales, Albert Edward. It was envisioned by Maharaja Sawai Ram Singh II as an educational center to inspire local craftspeople and artisans with historic artworks.",
          "architecturalStyle": "Neo-Indo-Saracenic Royal Museum Architecture",
          "architectureHighlights": [
            "Intricate sandstone stone chhatris, carved bracket arches, and domed towers",
            "Richly painted fresco murals depicting Persian, Chinese, and Mughal art motifs along corridors",
            "Central high-ceiling gallery featuring centuries-old royal metalcrafts and carved wood shields"
          ],
          "legendsAndStories": [
            "Built specifically to showcase the highest tier of Indian craftsmanship to the world, becoming the blueprint for industrial and craft education in the princely state."
          ],
          "bestPhotoSpots": [
            "Flock of pigeons in Ram Niwas courtyard with Albert Hall facade in background",
            "Night view from garden boulevard glowing in vibrant amber illumination"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "ram-niwas-garden",
            "name": "Ram Niwas Royal Garden",
            "category": "attraction",
            "distanceKm": 0.1,
            "travelTimeMin": 2
          },
          {
            "id": "bapu-bazaar",
            "name": "Bapu Bazaar Craft Market",
            "category": "experience",
            "distanceKm": 0.8,
            "travelTimeMin": 10
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 1.8,
            "travelTimeMin": 7
          },
          {
            "id": "city-palace-jaipur",
            "name": "City Palace Jaipur",
            "category": "attraction",
            "distanceKm": 2.2,
            "travelTimeMin": 8
          }
        ]
      },
      {
        "id": "jaipur-craft-bazaar",
        "name": "Johari & Bapu Bazaar (Artisan Craft Quarter)",
        "hindiName": "जौहरी एवं बापू बाज़ार (हस्तशिल्प बाज़ार)",
        "tagline": "Centuries-old living bazaar for Kundan gems, block-print textiles & lac bangles",
        "category": "craft",
        "categoryLabel": "UNESCO Cultural Artisan Bazaar",
        "rating": 4.8,
        "reviewCount": 39500,
        "images": [
          "/images/places/jaipur-craft-bazaar.jpg",
          "/images/places/city-palace-jaipur.jpg"
        ],
        "description": "The pulsing cultural heart of Jaipur's UNESCO Walled City. Walk through historic colonnaded pink bazaars where generations of master craftspeople practice Kundan-Meenakari gemstone setting, authentic Bagru and Sanganeri wooden block printing, handcrafted camel leather Mojaris, and traditional lac bangles over live open flames.",
        "coordinates": {
          "lat": 26.9208,
          "lng": 75.8242
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0,
          "student": 0
        },
        "timings": "10:30 AM – 8:30 PM (Daily, except Sunday evening)",
        "bestTimeToVisit": "4:00 PM – 8:00 PM (Vibrant bustling evening atmosphere, fresh street delicacies, and live artisan demonstrations)",
        "timeRequired": "2 – 3 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Planned by Maharaja Sawai Jai Singh II in 1727 with dedicated arterial streets for distinct craft guilds: Johari Bazaar for jewellers, Tripolia for iron & brass artisans, and Kishanpole for tie-and-dye bandhani weavers.",
          "architecturalStyle": "Historic Colonnaded Walled City Streetscape",
          "architectureHighlights": [
            "Uniform terracotta-pink colonnades and arched verandas flanking the main avenues",
            "Heritage havelis with hand-painted fresco murals hidden above active merchant shops",
            "Traditional Ghee Walon ka Rasta and Maniharon ka Rasta lacquer craft alleyways"
          ],
          "legendsAndStories": [
            "The pink wash was ordered by Maharaja Sawai Ram Singh in 1876 to welcome Queen Victoria and the Prince of Wales, symbolizing heartfelt hospitality (Atithi Devo Bhava)."
          ],
          "bestPhotoSpots": [
            "Vibrant rolls of Bandhani and Leheriya dupattas hanging across pink shopfronts",
            "Artisan shaping hot lac bangles over coal burners in Maniharon ka Rasta"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 5
          },
          {
            "id": "city-palace-jaipur",
            "name": "City Palace Jaipur",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 7
          },
          {
            "id": "jantar-mantar-jaipur",
            "name": "Jantar Mantar",
            "category": "attraction",
            "distanceKm": 0.7,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "albert-hall",
            "name": "Albert Hall Museum",
            "category": "attraction",
            "distanceKm": 1.6,
            "travelTimeMin": 6
          }
        ]
      },
      {
        "id": "blue-pottery-crafts",
        "name": "Jaipur Blue Pottery Artisan Guild & Studio",
        "hindiName": "जयपुर ब्लू पॉटरी शिल्प कला केंद्र",
        "tagline": "World-renowned GI-tagged craft made from quartz powder and cobalt glazes",
        "category": "craft",
        "categoryLabel": "GI Heritage Craft Studio",
        "rating": 4.9,
        "reviewCount": 9200,
        "images": [
          "/images/places/blue-pottery-crafts.jpg",
          "/images/places/albert-hall.jpg"
        ],
        "description": "A rare traditional craft unique to Jaipur. Unlike conventional pottery, Jaipur Blue Pottery uses zero clay—it is handcrafted from a unique paste of Egyptian paste, ground quartz stone, glass, Multani mitti, and natural gum. Master potters hand-paint intricate Persian floral motifs and turquoise-blue glazes before single low-fire kiln baking.",
        "coordinates": {
          "lat": 26.8925,
          "lng": 75.765
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0,
          "student": 0
        },
        "timings": "10:00 AM – 7:00 PM (Monday – Saturday)",
        "bestTimeToVisit": "11:00 AM – 3:00 PM (Watch live craftspeople shaping dough molds and freehand brush painting vases)",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Brought to Jaipur in the early 19th century by Maharaja Sawai Ram Singh II after seeing kite-flying artisans defeat opponents using glass-coated threads. Revived in the 1960s by master artisan Kripal Singh Shekhawat.",
          "architecturalStyle": "Traditional Artisan Workshop & Pottery Kiln",
          "architectureHighlights": [
            "Open-air sundrying courtyards lined with porcelain-smooth unfired turquoise vessels",
            "Traditional brick kilns with wood-fired draft vents",
            "Master brushwork stations using natural squirrel-hair brushes and mineral cobalt oxides"
          ],
          "legendsAndStories": [
            "Because no clay is used, the pottery never develops cracks from moisture, making it waterproof and hygienic for centuries."
          ],
          "bestPhotoSpots": [
            "Drying shelves displaying vivid turquoise, cobalt, and canary yellow ceramic plates",
            "Master artisan painting fine Persian arabesque strokes on a spinning wheel"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "sanganer-crafts",
            "name": "Sanganer Block Print Workshops",
            "category": "experience",
            "distanceKm": 4.5,
            "travelTimeMin": 15
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "albert-hall",
            "name": "Albert Hall Museum",
            "category": "attraction",
            "distanceKm": 6.2,
            "travelTimeMin": 18
          }
        ]
      },
      {
        "id": "galtaji-temple",
        "name": "Galta Ji (Sacred Springs Kunds & Temple)",
        "hindiName": "गलता जी मंदिर एवं पवित्र जल कुंड",
        "tagline": "Perennial natural mountain spring kunds & 18th-century cliffside pavilions",
        "category": "temple",
        "categoryLabel": "Sacred Spring Kunds & Ancient Temple",
        "rating": 4.7,
        "reviewCount": 22100,
        "images": [
          "/images/places/galtaji-temple.jpg",
          "/images/places/nahargarh-fort.jpg"
        ],
        "description": "An ancient Hindu pilgrimage sanctuary nestled inside a dramatic gorge in the Aravalli hills, 10 km east of Jaipur. Perennial natural freshwater springs emerge from the sheer cliff face and cascade through seven stepped holy stone kunds (bathing pools). Famous for its pink sandstone pavilions, painted frescoes, and friendly rhesus monkey troops.",
        "coordinates": {
          "lat": 26.9164,
          "lng": 75.8617
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0,
          "student": 0
        },
        "timings": "5:00 AM – 9:00 PM (Daily)",
        "bestTimeToVisit": "Sunrise or late afternoon (Peaceful atmosphere, dramatic sunbeams through the mountain gorge)",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Associated with Sage Galav who meditated here in antiquity. The grand pavilion complex was built in the early 18th century by Diwan Rao Kriparam, court attendant of Sawai Jai Singh II.",
          "architecturalStyle": "Havel-Style Mountain Gorge Temple Complex",
          "architectureHighlights": [
            "Seven sacred bathing tanks including the Upper Kund and Zanana Kund fed by eternal natural springs",
            "Carved pink sandstone chhatris, fluted columns, and arched pavilions jutting from granite rock",
            "Faded 18th-century ceiling frescoes illustrating scenes from the Ramayana and Krishna Leela"
          ],
          "legendsAndStories": [
            "The sacred spring waters flow uninterrupted regardless of whether Rajasthan experiences drought, regarded by pilgrims as a divine perennial blessing."
          ],
          "bestPhotoSpots": [
            "Upper water reservoir looking through pink scalloped arches down into the gorge",
            "Sun temple ridge viewpoint overlooking the eastern plains of Jaipur"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "sun-temple-galta",
            "name": "Surya Mandir (Sun Temple Viewpoint)",
            "category": "attraction",
            "distanceKm": 0.5,
            "travelTimeMin": 12
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "sisodia-rani-garden",
            "name": "Sisodia Rani Palace Gardens",
            "category": "attraction",
            "distanceKm": 3.2,
            "travelTimeMin": 10
          },
          {
            "id": "hawa-mahal",
            "name": "Hawa Mahal",
            "category": "attraction",
            "distanceKm": 6.8,
            "travelTimeMin": 22
          }
        ]
      },
      {
        "id": "jaigarh-fort",
        "name": "Jaigarh Fort (Victory Fort & Royal Cisterns)",
        "hindiName": "जयगढ़ किला, जयपुर",
        "tagline": "Rugged military fort with the world's largest cannon & massive water reservoirs",
        "category": "palace",
        "categoryLabel": "Hilltop Fortress & Cannon Foundry",
        "rating": 4.8,
        "reviewCount": 29800,
        "images": [
          "/images/places/jaigarh-fort.jpg",
          "/images/places/amber-fort.jpg"
        ],
        "description": "Constructed in 1726 by Sawai Jai Singh II atop the Cheel ka Teela (Hill of Eagles) to safeguard Amber Palace. Houses the legendary Jaivana Cannon—the world's largest cannon on wheels—and an ingenious network of underground water harvesting cisterns capable of storing 6 million gallons of rainwater.",
        "coordinates": {
          "lat": 26.9852,
          "lng": 75.8456
        },
        "entryFee": {
          "indian": 70,
          "foreign": 200,
          "student": 35
        },
        "timings": "9:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "10:00 AM – 1:00 PM (Clear panoramic views of Amber Fort, Maota Lake, and Aravalli hills)",
        "timeRequired": "2 – 2.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Never conquered in battle, Jaigarh was the premier royal cannon foundry of the Mughal and Rajput eras, utilizing the region's abundant iron ore reserves and advanced casting metallurgy.",
          "architecturalStyle": "Pure Military Rajput Defensive Fortress",
          "architectureHighlights": [
            "Subterranean water channels collecting rainwater from 4 kilometers of mountain catchment slopes",
            "Jaivana Cannon with a 20-foot barrel cast on-site in a special subterranean foundry mold in 1720",
            "Dungar Darwaza and fortified battlements offering 360-degree tactical lookouts"
          ],
          "legendsAndStories": [
            "Legend holds that the subterranean water chambers concealed the fabled Kachwaha royal treasury, guarded faithfully for over three centuries."
          ],
          "bestPhotoSpots": [
            "Ramparts directly looking down upon the complete footprint of Amber Fort and Maota Lake",
            "Standing next to the gigantic 50-tonne wheels of the Jaivana cannon"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "amber-fort",
            "name": "Amber Fort & Palace",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 12
          },
          {
            "id": "panna-meena-kund",
            "name": "Panna Meena Ka Kund Stepwell",
            "category": "experience",
            "distanceKm": 1.2,
            "travelTimeMin": 14
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "jal-mahal",
            "name": "Jal Mahal (Water Palace)",
            "category": "attraction",
            "distanceKm": 4.8,
            "travelTimeMin": 15
          },
          {
            "id": "nahargarh-fort",
            "name": "Nahargarh Fort",
            "category": "attraction",
            "distanceKm": 5.5,
            "travelTimeMin": 20
          }
        ]
      },
      {
        "id": "chand-baori",
        "name": "Chand Baori Stepwell (Abhaneri)",
        "hindiName": "चांद बावड़ी, आभानेरी",
        "tagline": "World-famous 8th-century geometric stepwell with 3,500 symmetrical steps",
        "category": "lake",
        "categoryLabel": "Ancient 8th-Century Geometric Stepwell",
        "rating": 4.9,
        "reviewCount": 31200,
        "images": [
          "/images/places/chand-baori.jpg",
          "/images/places/panna-meena-kund.jpg"
        ],
        "description": "One of the deepest, oldest, and most visually breathtaking stepwells in the world. Built in the 8th to 9th century by King Chanda of the Nikumbha dynasty, it features 3,500 steep, narrow stone steps perfectly staggered across 13 subterranean stories descending 30 meters down to an emerald aquifer pool.",
        "coordinates": {
          "lat": 27.0073,
          "lng": 76.6064
        },
        "entryFee": {
          "indian": 25,
          "foreign": 300,
          "student": 10
        },
        "timings": "7:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "Morning hours (Crisp shadows define each of the 3,500 geometric triangles)",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed in arid eastern Rajasthan to harvest rainwater and provide year-round water security to the ancient settlement of Abhaneri (originally Abha Nagri, \"City of Brightness\").",
          "architecturalStyle": "Classical Nikumbha-Gurjara Pratihara Stepwell Engineering",
          "architectureHighlights": [
            "Incredible mathematical precision: 3,500 dual-diagonal steps forming inverted triangle pyramids",
            "Northern pavilion multi-storeyed arcade adorned with carved statues of Mahishasuramardini and Ganesha",
            "Temperature at the bottom is consistently 5 to 6 degrees Celsius cooler than the ground surface"
          ],
          "legendsAndStories": [
            "Ancient folklore whispered that spirits and djinn constructed the colossal 13-storey stepwell in a single night because no mortal could assemble such mathematical perfection."
          ],
          "bestPhotoSpots": [
            "Upper corner balcony capturing the dizzying geometric cascade of 13 subterranean levels",
            "Northern pavilion carved stone pillars framing the deep stepwell symmetry"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "harshat-mata-temple",
            "name": "Harshat Mata 8th-Century Temple",
            "category": "attraction",
            "distanceKm": 0.2,
            "travelTimeMin": 3
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "abhaneri-village",
            "name": "Abhaneri Rural Pottery Village",
            "category": "experience",
            "distanceKm": 1.5,
            "travelTimeMin": 8
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "rambagh-palace",
        "name": "Rambagh Palace Jaipur",
        "type": "heritage_palace",
        "typeLabel": "Former Residence of the Maharaja of Jaipur",
        "rating": 4.9,
        "reviewsCount": 3800,
        "image": "/images/places/amber-fort.jpg",
        "pricePerNight": 28000,
        "coordinates": {
          "lat": 26.8978,
          "lng": 75.8089
        },
        "amenities": [
          "47-Acre Mughal Gardens",
          "Peacock Courtyard Dining",
          "Jiva Grande Spa",
          "Vintage Car Chauffeur"
        ],
        "address": "Bhawani Singh Road, Rambagh, Jaipur, Rajasthan",
        "distanceToItineraryHighlights": [
          {
            "placeId": "city-palace-jaipur",
            "placeName": "City Palace",
            "distanceKm": 4.2,
            "drivingTimeMin": 12
          },
          {
            "placeId": "hawa-mahal",
            "placeName": "Hawa Mahal",
            "distanceKm": 4.5,
            "drivingTimeMin": 14
          },
          {
            "placeId": "amber-fort",
            "placeName": "Amber Fort",
            "distanceKm": 12.8,
            "drivingTimeMin": 28
          }
        ]
      },
      {
        "id": "samode-haveli",
        "name": "Samode Haveli Boutique Hotel",
        "type": "boutique_haveli",
        "typeLabel": "225-Year-Old Aristocratic Townhouse",
        "rating": 4.8,
        "reviewsCount": 1900,
        "image": "/images/places/city-palace-jaipur.jpg",
        "pricePerNight": 9500,
        "coordinates": {
          "lat": 26.9321,
          "lng": 75.829
        },
        "amenities": [
          "Frescoed Courtyard Pool",
          "Traditional Rajasthani Dining",
          "Historic Jharokha Suites",
          "Old City Walk Access"
        ],
        "address": "Near Jorawar Singh Gate, Gangapole, Jaipur",
        "distanceToItineraryHighlights": [
          {
            "placeId": "city-palace-jaipur",
            "placeName": "City Palace",
            "distanceKm": 1.2,
            "drivingTimeMin": 5
          },
          {
            "placeId": "hawa-mahal",
            "placeName": "Hawa Mahal",
            "distanceKm": 1.4,
            "drivingTimeMin": 6
          },
          {
            "placeId": "amber-fort",
            "placeName": "Amber Fort",
            "distanceKm": 7.2,
            "drivingTimeMin": 18
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "lmb-johari",
        "name": "LMB (Laxmi Mishtan Bhandar)",
        "cuisineType": "Traditional Rajasthani & Sweets",
        "type": "traditional_thali",
        "rating": 4.6,
        "priceForTwo": 900,
        "image": "/images/places/hawa-mahal.jpg",
        "mustTryDishes": [
          "Royal Rajasthani Thali",
          "Paneer Ghewar",
          "Pyaaz Kachori",
          "Doodh Jalebi"
        ],
        "specialty": "Royal Rajasthani Thali, Ghewar & Pyaaz Kachori",
        "timings": "7:30 AM – 11:00 PM",
        "address": "Johari Bazar, Old City, Jaipur",
        "coordinates": {
          "lat": 26.9215,
          "lng": 75.8248
        },
        "isVeg": true
      },
      {
        "id": "1135-ad-amber",
        "name": "1135 AD Royal Dining",
        "cuisineType": "Royal Mughlai & Rajputana",
        "type": "heritage_restaurant",
        "rating": 4.8,
        "priceForTwo": 3200,
        "image": "/images/places/amber-fort.jpg",
        "mustTryDishes": [
          "Laal Maas",
          "Junglee Maas",
          "Shahi Murgh Dum Biryani",
          "Kesar Phirni"
        ],
        "specialty": "Silver cutlery candlelight dining with live sitar music inside Amber Fort",
        "timings": "12:00 PM – 10:30 PM",
        "address": "Level 2, Jaleb Chowk, Amber Fort, Jaipur",
        "coordinates": {
          "lat": 26.9855,
          "lng": 75.8513
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "bagru-block-print",
        "title": "Hand-Block Printing Masterclass",
        "category": "craft",
        "categoryLabel": "Artisan Workshop",
        "duration": "3 Hours",
        "price": 1200,
        "image": "/images/places/city-palace-jaipur.jpg",
        "description": "Carve and stamp natural indigo mud-resist Dabu prints with 5th-generation master artisans.",
        "highlights": [
          "Wooden block carving practice",
          "Natural indigo dye extraction",
          "Take home your customized cotton stole"
        ],
        "timing": "10:00 AM – 1:00 PM",
        "location": "Bagru Artisan Village (transport included)",
        "rating": 4.9
      },
      {
        "id": "nahargarh-cycling",
        "title": "Aravalli Sunrise Cycling to Nahargarh",
        "category": "adventure",
        "categoryLabel": "Active Heritage",
        "duration": "3.5 Hours",
        "price": 1500,
        "image": "/images/places/nahargarh-fort.jpg",
        "description": "Morning pedal up winding hill roads before city traffic stirs, ending with sunrise tea over the ramparts.",
        "highlights": [
          "Dawn ride through forested Aravalli wildlife pass",
          "Rooftop morning tea overlooking Pink City",
          "Geared bicycle & guide"
        ],
        "timing": "5:45 AM – 9:00 AM",
        "location": "Start at Jal Mahal promenade",
        "rating": 4.8
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Royal Foundations: City Palace, Hawa Mahal & Jantar Mantar",
        "dateLabel": "Day 01",
        "totalDistanceKm": 2.8,
        "totalTravelTimeMin": 25,
        "totalDaySpend": 650,
        "stops": [
          {
            "id": "j-d1-1",
            "placeId": "hawa-mahal",
            "placeName": "Hawa Mahal (Palace of Winds)",
            "category": "heritage",
            "timeSlot": "8:30 AM – 10:00 AM",
            "durationMin": 90,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 50,
            "iconType": "Landmark",
            "notes": "Best morning lighting for facade photos before crowds arrive.",
            "coordinates": {
              "lat": 26.9239,
              "lng": 75.8267
            }
          },
          {
            "id": "j-d1-2",
            "placeId": "city-palace-jaipur",
            "placeName": "City Palace Complex & Chandra Mahal",
            "category": "heritage",
            "timeSlot": "10:30 AM – 1:00 PM",
            "durationMin": 150,
            "travelFromPrevMin": 10,
            "distanceFromPrevKm": 0.6,
            "estimatedCost": 300,
            "iconType": "Landmark",
            "notes": "Visit Pritam Niwas Chowk peacock gate.",
            "coordinates": {
              "lat": 26.9258,
              "lng": 75.8236
            }
          },
          {
            "id": "j-d1-3",
            "placeId": "jantar-mantar-jaipur",
            "placeName": "Jantar Mantar Solar Observatory",
            "category": "heritage",
            "timeSlot": "1:30 PM – 3:00 PM",
            "durationMin": 90,
            "travelFromPrevMin": 5,
            "distanceFromPrevKm": 0.2,
            "estimatedCost": 50,
            "iconType": "Compass",
            "notes": "Walk alongside world’s largest stone sundial.",
            "coordinates": {
              "lat": 26.9248,
              "lng": 75.8246
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Fortress Heights: Amber Fort, Jal Mahal & Nahargarh Sunset",
        "dateLabel": "Day 02",
        "totalDistanceKm": 15,
        "totalTravelTimeMin": 47,
        "totalDaySpend": 850,
        "stops": [
          {
            "id": "j-d2-1",
            "placeId": "jal-mahal",
            "placeName": "Jal Mahal Water Palace Stop",
            "category": "lake",
            "timeSlot": "8:30 AM – 9:30 AM",
            "durationMin": 60,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 4.5,
            "estimatedCost": 0,
            "iconType": "Waves",
            "notes": "Morning reflections on Man Sagar Lake.",
            "coordinates": {
              "lat": 26.9534,
              "lng": 75.8462
            }
          },
          {
            "id": "j-d2-2",
            "placeId": "amber-fort",
            "placeName": "Amber Fort & Sheesh Mahal",
            "category": "palace",
            "timeSlot": "10:00 AM – 2:00 PM",
            "durationMin": 240,
            "travelFromPrevMin": 12,
            "distanceFromPrevKm": 4,
            "estimatedCost": 100,
            "iconType": "Landmark",
            "notes": "Explore mirror palace and courtyards.",
            "coordinates": {
              "lat": 26.9855,
              "lng": 75.8513
            }
          },
          {
            "id": "j-d2-3",
            "placeId": "nahargarh-fort",
            "placeName": "Nahargarh Fort Sunset View",
            "category": "palace",
            "timeSlot": "4:30 PM – 7:00 PM",
            "durationMin": 150,
            "travelFromPrevMin": 20,
            "distanceFromPrevKm": 6.5,
            "estimatedCost": 50,
            "iconType": "Sun",
            "notes": "Panoramic twilight view across Jaipur city.",
            "coordinates": {
              "lat": 26.9372,
              "lng": 75.8156
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/amber-fort.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 26.9855,
      "lng": 75.8513
    }
  },
  "varanasi": {
    "id": "varanasi",
    "slug": "varanasi",
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "tagline": "The Eternal City · Sacred Ghats · Kashi Vishwanath & Sarnath",
    "shortBio": "Continuously inhabited for over 3,000 years along the crescent curve of the sacred River Ganga, Kashi is the spiritual heart of India. Famed for its hypnotic evening Ganga Aarti, ancient Vedic chanting, labyrinthine silk weaver galleys, and the monumental Dhamek Stupa at Sarnath.",
    "heroBanner": "/images/places/dashashwamedh-ghat.jpg",
    "heroGallery": [
      "/images/places/dashashwamedh-ghat.jpg",
      "/images/places/kashi-vishwanath.jpg",
      "/images/places/sarnath.jpg",
      "/images/places/assi-ghat.jpg"
    ],
    "bestSeason": "October – March",
    "recommendedDays": "3–4 Days",
    "approxBudgetPerDay": {
      "budget": 1500,
      "comfort": 4000,
      "luxury": 15000
    },
    "weather": {
      "tempC": 25,
      "condition": "Crisp & Serene",
      "humidity": "45%"
    },
    "tourismStatus": {
      "safetyScore": "4.8 / 5.0 (High Tourist Safety & Police Assistance)",
      "crowdLevel": "High",
      "peakHours": "5:30 AM – 7:30 AM (Sunrise Boat Rides) & 6:30 PM – 8:00 PM (Ganga Aarti)"
    },
    "curatedForStyles": [
      {
        "styleId": "ghats",
        "styleTitle": "Sacred Ghats & Ganga Aarti",
        "description": "Atmospheric riverfront rituals, evening brass lamp ceremonies, and early morning Subah-e-Banaras meditation.",
        "recommendedPlaceIds": [
          "dashashwamedh-ghat",
          "assi-ghat",
          "manikarnika-ghat",
          "kashi-vishwanath"
        ]
      },
      {
        "styleId": "temples",
        "styleTitle": "Ancient Temples & Sarnath",
        "description": "The newly restored Kashi Vishwanath Dham corridor, historic Buddhist stupas at Sarnath, and deer parks.",
        "recommendedPlaceIds": [
          "kashi-vishwanath",
          "sarnath",
          "dashashwamedh-ghat"
        ]
      }
    ],
    "places": [
      {
        "id": "kashi-vishwanath",
        "name": "Shri Kashi Vishwanath Temple",
        "hindiName": "श्री काशी विश्वनाथ मंदिर",
        "tagline": "One of the twelve sacred Jyotirlingas crowned in 800 kg of pure gold",
        "category": "temple",
        "categoryLabel": "Sacred Jyotirlinga Shrine",
        "rating": 4.9,
        "reviewCount": 68400,
        "images": [
          "/images/places/kashi-vishwanath.jpg",
          "/images/places/dashashwamedh-ghat.jpg"
        ],
        "description": "Standing on the western bank of the sacred River Ganga, Kashi Vishwanath is the holiest Shiva temple in Hinduism. Built in its present form in 1780 by Maharani Ahilyabai Holkar of Indore, its golden spires were donated by Maharaja Ranjit Singh of Punjab in 1835.",
        "coordinates": {
          "lat": 25.3109,
          "lng": 83.0107
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "3:00 AM – 11:00 PM (Mangala Aarti: 3:00 AM, Shringar Aarti: 9:00 PM)",
        "bestTimeToVisit": "Early morning (6:00 AM) or via the illuminated Kashi Vishwanath Corridor directly from the Ghats",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Mentioned in the Skanda Purana. Despite historic destructions and rebuilds over centuries, the sacred Jyotirlinga remained ceaselessly worshipped through secret pujas.",
          "architecturalStyle": "Classical Nagara Temple Architecture with 800kg Gold Spire",
          "architectureHighlights": [
            "51-foot tall golden dome and spire gilded with 800 kg of gold by Lion of Punjab Maharaja Ranjit Singh",
            "Newly inaugurated 50,000 sq meter Ganga Corridor linking the sanctum directly to Manikarnika and Lalita Ghats",
            "Jnana Vapi (Well of Wisdom) where the original Shivalinga was hidden during Mughal sieges"
          ],
          "legendsAndStories": [
            "It is believed that Shiva whispers the Taraka mantra into the ears of those who pass away in Kashi, granting instant Moksha (liberation from the cycle of rebirth)."
          ],
          "bestPhotoSpots": [
            "Kashi Corridor entrance gates overlooking the Ganga river stairs"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "dashashwamedh-ghat",
            "name": "Dashashwamedh Ghat",
            "category": "experience",
            "distanceKm": 0.4,
            "travelTimeMin": 6
          },
          {
            "id": "manikarnika-ghat",
            "name": "Manikarnika Ghat",
            "category": "attraction",
            "distanceKm": 0.3,
            "travelTimeMin": 5
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "assi-ghat",
            "name": "Assi Ghat",
            "category": "attraction",
            "distanceKm": 2.5,
            "travelTimeMin": 15
          },
          {
            "id": "sarnath",
            "name": "Sarnath Buddhist Complex",
            "category": "attraction",
            "distanceKm": 9.8,
            "travelTimeMin": 28
          }
        ]
      },
      {
        "id": "dashashwamedh-ghat",
        "name": "Dashashwamedh Ghat & Evening Aarti",
        "hindiName": "दशाश्वमेध घाट, वाराणसी",
        "tagline": "Varanasi’s most spectacular ghat hosting the grand daily evening Ganga Aarti",
        "category": "heritage",
        "categoryLabel": "Sacred Riverfront & Aarti",
        "rating": 4.9,
        "reviewCount": 58900,
        "images": [
          "/images/places/dashashwamedh-ghat.jpg",
          "/images/places/assi-ghat.jpg"
        ],
        "description": "The main and oldest ghat on the Ganges in Varanasi. According to legend, Lord Brahma created it to welcome Lord Shiva and sacrificed ten horses (dasa-ashwamedha) here. Every dusk, young priests dressed in saffron perform the world-famous synchronized brass lamp Aarti.",
        "coordinates": {
          "lat": 25.3068,
          "lng": 83.0105
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours (Evening Maha Aarti: 6:45 PM in Summer / 6:00 PM in Winter)",
        "bestTimeToVisit": "5:30 PM (Secure a viewing spot on a wooden boat or ghat steps before crowds build)",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Peshwa Balaji Baji Rao reconstructed this monumental stone amphitheater in 1748. Today, the Ganga Seva Nidhi leads the devotional evening ceremony every single day without interruption.",
          "architecturalStyle": "Monumental Stepped Stone Ghat with Multi-Tier Pavilions",
          "architectureHighlights": [
            "Seven elevated wooden platforms with brass conches, incense censers, and peacock-feather fans",
            "Heavy tiered brass lamps weighing over 5 kg each lifted and rotated in rhythm with Vedic bells"
          ],
          "legendsAndStories": [
            "Devotees float thousands of clay diyas (oil lamps) with marigold flowers into the current, creating a glittering constellation on the water surface."
          ],
          "bestPhotoSpots": [
            "From a wooden rowing boat anchored directly in front of the 7 priests during the lamp ceremony"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "kashi-vishwanath",
            "name": "Shri Kashi Vishwanath Temple",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 6
          },
          {
            "id": "manikarnika-ghat",
            "name": "Manikarnika Ghat",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "assi-ghat",
            "name": "Assi Ghat",
            "category": "attraction",
            "distanceKm": 2.1,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "sarnath",
        "name": "Sarnath & Dhamek Stupa",
        "hindiName": "सारनाथ एवं धमेक स्तूप",
        "tagline": "Cradle of Buddhism where Gautama Buddha delivered his first sermon",
        "category": "heritage",
        "categoryLabel": "UNESCO World Heritage Nominee",
        "rating": 4.8,
        "reviewCount": 31400,
        "images": [
          "/images/places/sarnath.jpg",
          "/images/places/kashi-vishwanath.jpg"
        ],
        "description": "Located 10 km northeast of Varanasi, Sarnath is where Buddha preached his first sermon (Dharmachakra Pravartana) after attaining enlightenment. The colossal 43.6-meter high cylindrical Dhamek Stupa was erected by Emperor Ashoka in 249 BCE and rebuilt in 500 CE.",
        "coordinates": {
          "lat": 25.3811,
          "lng": 83.0247
        },
        "entryFee": {
          "indian": 25,
          "foreign": 300,
          "student": 10
        },
        "timings": "Sunrise to Sunset (Museum closed on Fridays)",
        "bestTimeToVisit": "9:00 AM (Serene morning stroll in the tranquil monastic deer park gardens)",
        "timeRequired": "2.5 – 3 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Here the Sangha (Buddhist monastic order) was founded with the first five disciples. Emperor Ashoka visited in 3rd century BCE and erected the Lion Capital of Ashoka, which is now India’s National Emblem.",
          "architecturalStyle": "Gupta-Era Cylindrical Stone Stupa with High Relief Carvings",
          "architectureHighlights": [
            "Dhamek Stupa: Massive cylindrical brick and stone structure 43.6 meters high and 28 meters in diameter",
            "Intricate floral and geometric stone carvings on the lower frieze dating back to the 5th-century Gupta empire",
            "Sarnath Archaeological Museum housing the original polished sandstone Lion Capital of Ashoka (3rd century BCE)"
          ],
          "legendsAndStories": [
            "Chinese traveler Xuanzang visited Sarnath in 640 CE and recorded 1,500 Buddhist monks residing in multi-storied monasteries around the grand stupa."
          ],
          "bestPhotoSpots": [
            "Circumambulation path of Dhamek Stupa with Tibetan and Thai prayer flags in backdrop"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "sarnath-museum",
            "name": "Sarnath Archaeological Museum",
            "category": "attraction",
            "distanceKm": 0.2,
            "travelTimeMin": 3
          },
          {
            "id": "mulagandha-vihara",
            "name": "Mulagandha Kuti Vihara",
            "category": "experience",
            "distanceKm": 0.4,
            "travelTimeMin": 5
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "kashi-vishwanath",
            "name": "Kashi Vishwanath Temple",
            "category": "attraction",
            "distanceKm": 9.8,
            "travelTimeMin": 28
          }
        ]
      },
      {
        "id": "assi-ghat",
        "name": "Assi Ghat & Subah-e-Banaras",
        "hindiName": "अस्सी घाट, वाराणसी",
        "tagline": "Vibrant southern confluence hosting morning yoga, classical ragas & boat cruises",
        "category": "heritage",
        "categoryLabel": "Cultural Ghat & Morning Ragas",
        "rating": 4.8,
        "reviewCount": 36200,
        "images": [
          "/images/places/assi-ghat.jpg",
          "/images/places/dashashwamedh-ghat.jpg"
        ],
        "description": "Marking the southernmost boundary of the historic city where the holy Assi River meets the Ganga, this spacious ghat is the intellectual and cultural hub of Banaras. Hosts the daily dawn cultural ceremony Subah-e-Banaras with Vedic chanting, morning yoga, and classical Indian ragas.",
        "coordinates": {
          "lat": 25.2891,
          "lng": 83.0069
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours (Subah-e-Banaras Ceremony begins at 5:00 AM daily)",
        "bestTimeToVisit": "5:00 AM (Sunrise meditation, morning classical flute/sitar music, and hot Lemon Chai)",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Revered since the Puranas as the site where Goddess Durga dropped her sword (Asi) after slaying demons Shumbha and Nishumbha.",
          "architecturalStyle": "Broad Stepped River Amphitheater",
          "architectureHighlights": [
            "Under the sacred peepal tree where saint-poet Tulsidas wrote the epic Ramcharitmanas",
            "Open stone stage where maestros of the Benares Gharana perform live sunrise classical concerts"
          ],
          "legendsAndStories": [
            "Saint Tulsidas spent his final days right here at Assi Ghat and established the nearby Sankat Mochan Hanuman Temple."
          ],
          "bestPhotoSpots": [
            "Wooden sunrise boat departing into morning river mist",
            "Morning yoga silhouettes against golden river rays"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "pappu-tea-stall",
            "name": "Pappu Chai Stall (Legendary Debating Spot)",
            "category": "food",
            "distanceKm": 0.3,
            "travelTimeMin": 4
          },
          {
            "id": "sankat-mochan",
            "name": "Sankat Mochan Temple",
            "category": "attraction",
            "distanceKm": 1.1,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "dashashwamedh-ghat",
            "name": "Dashashwamedh Ghat",
            "category": "attraction",
            "distanceKm": 2.1,
            "travelTimeMin": 12
          },
          {
            "id": "bhu-campus",
            "name": "Banaras Hindu University (BHU)",
            "category": "experience",
            "distanceKm": 2.4,
            "travelTimeMin": 10
          }
        ]
      },
      {
        "id": "manikarnika-ghat",
        "name": "Manikarnika Ghat (The Sacred Mahashamshan)",
        "hindiName": "मणिकर्णिका घाट, वाराणसी",
        "tagline": "The eternal cremation ghat where the sacred fire has burned unbroken for millennia",
        "category": "heritage",
        "categoryLabel": "Sacred Cremation Ghat",
        "rating": 4.7,
        "reviewCount": 21900,
        "images": [
          "/images/places/manikarnika-ghat.jpg",
          "/images/places/kashi-vishwanath.jpg"
        ],
        "description": "The primary cremation ghat of Varanasi. In Hindu philosophy, dying or being cremated at Manikarnika frees the soul from Samsara (the eternal cycle of birth and rebirth). Its sacred funeral pyres have burned without interruption for thousands of years.",
        "coordinates": {
          "lat": 25.3106,
          "lng": 83.0142
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours (Photography strictly forbidden on the cremation platforms out of respect)",
        "bestTimeToVisit": "Viewed respectfully from a passing boat on the river at dusk",
        "timeRequired": "45 Minutes",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Legend recounts that Lord Shiva and Goddess Parvati bathed in the sacred pond here. Parvati lost her earring (Manikarnika) in the well, and Shiva declared that whoever died here would receive salvation.",
          "architecturalStyle": "Multi-Tiered Stepped Ghat with Slanted Shiva Temple",
          "architectureHighlights": [
            "Ratneshwar Mahadev Temple: The leaning temple of Kashi that tilts dramatically over 9 degrees into the Ganga waters",
            "Manikarnika Kund: Sacred holy pond believed to predate the arrival of the River Ganga on Earth"
          ],
          "legendsAndStories": [
            "The sacred flame used to light every single funeral pyre is said to have been lit by Lord Shiva himself and has never once gone out."
          ],
          "bestPhotoSpots": [
            "Ratneshwar Mahadev leaning temple from boat waters (no photography of funeral platforms)"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "kashi-vishwanath",
            "name": "Kashi Vishwanath Corridor",
            "category": "attraction",
            "distanceKm": 0.3,
            "travelTimeMin": 5
          },
          {
            "id": "dashashwamedh-ghat",
            "name": "Dashashwamedh Ghat",
            "category": "attraction",
            "distanceKm": 0.6,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "assi-ghat",
            "name": "Assi Ghat",
            "category": "attraction",
            "distanceKm": 2.7,
            "travelTimeMin": 16
          }
        ]
      },
      {
        "id": "ramnagar-fort",
        "name": "Ramnagar Fort & Royal Museum",
        "hindiName": "रामनगर किला, वाराणसी",
        "tagline": "18th-Century Chunar Sandstone Fortified Palace on the Eastern Ganga Bank",
        "category": "palace",
        "categoryLabel": "Royal River Fortress & Museum",
        "rating": 4.6,
        "reviewCount": 16400,
        "images": [
          "/images/places/ramnagar-fort.jpg"
        ],
        "description": "Built in 1750 by Kashi Naresh Maharaja Balwant Singh. Constructed in creamy Chunar sandstone directly opposite Tulsi Ghat, it houses the ancestral royal museum featuring vintage cars, jewel-encrusted palanquins, ivory carvings, and an astronomical clock showing planetary positions.",
        "coordinates": {
          "lat": 25.2678,
          "lng": 83.0272
        },
        "entryFee": {
          "indian": 50,
          "foreign": 250
        },
        "timings": "10:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "2:30 PM – 5:00 PM for late afternoon river views and museum galleries",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Remains the official residential fortress of the titular Maharaja of Benares, known as the Kashi Naresh.",
          "architecturalStyle": "Mughal-Rajput Syncretic Chunar Sandstone Fort Architecture",
          "architectureHighlights": [
            "Carved sandstone balconies and jharokhas perched high above the eastern Ganga waters",
            "Saraswati Bhawan: Royal armoury containing ornate swords, daggers, and historic matchlock guns",
            "Dharmaganj astronomical clock created in 1852 showing the sun, moon, and constellation paths"
          ],
          "legendsAndStories": [
            "Famous for hosting the 31-day Ramlila festival under the patronage of the Maharaja, performed across the town of Ramnagar without artificial stage sets."
          ],
          "bestPhotoSpots": [
            "From a wooden rowboat looking across the river as the sandstone ramparts glow in the afternoon sun"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": [
          {
            "id": "assi-ghat",
            "name": "Assi Ghat",
            "category": "attraction",
            "distanceKm": 4.2,
            "travelTimeMin": 18
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "brijrama-palace",
        "name": "BrijRama Palace Heritage Hotel",
        "type": "heritage_palace",
        "typeLabel": "18th-Century Fortress Palace on Darbhanga Ghat",
        "rating": 4.9,
        "reviewsCount": 2900,
        "image": "/images/places/dashashwamedh-ghat.jpg",
        "pricePerNight": 24000,
        "coordinates": {
          "lat": 25.305,
          "lng": 83.01
        },
        "amenities": [
          "Direct Ghat Access via Private Boat",
          "Riverside Darbhanga Terrace",
          "Live Sitar & Sarod Performances",
          "Pure Vegetarian Royal Thali"
        ],
        "address": "Darbhanga Ghat, Dashashwamedh, Varanasi",
        "distanceToItineraryHighlights": [
          {
            "placeId": "dashashwamedh-ghat",
            "placeName": "Dashashwamedh Ghat",
            "distanceKm": 0.2,
            "drivingTimeMin": 3
          },
          {
            "placeId": "kashi-vishwanath",
            "placeName": "Kashi Vishwanath",
            "distanceKm": 0.5,
            "drivingTimeMin": 6
          },
          {
            "placeId": "assi-ghat",
            "placeName": "Assi Ghat",
            "distanceKm": 1.8,
            "drivingTimeMin": 10
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "kashi-chaat",
        "name": "Kashi Chaat Bhandar",
        "cuisineType": "Benarasi Street Food Legends",
        "type": "street_food_legend",
        "rating": 4.8,
        "priceForTwo": 250,
        "image": "/images/places/dashashwamedh-ghat.jpg",
        "mustTryDishes": [
          "Ghee-soaked Tamatar Chaat",
          "Crispy Palak Patta Chaat",
          "Dahi Puri",
          "Gulab Jamun"
        ],
        "specialty": "Tamatar Chaat, Palak Patta Chaat & Dahi Puri",
        "timings": "4:00 PM – 11:00 PM",
        "address": "Godowlia Chowk, Varanasi",
        "coordinates": {
          "lat": 25.3082,
          "lng": 83.0078
        },
        "isVeg": true
      },
      {
        "id": "blue-lassi",
        "name": "Blue Lassi Shop",
        "cuisineType": "Artisanal Benarasi Lassi",
        "type": "local_specialty",
        "rating": 4.7,
        "priceForTwo": 200,
        "image": "/images/places/manikarnika-ghat.jpg",
        "mustTryDishes": [
          "Pomegranate & Pistachio Lassi",
          "Banana Chocolate Lassi",
          "Blueberry Cream Lassi",
          "Rabdi Malai Lassi"
        ],
        "specialty": "Hand-churned creamy thick lassi served in earthen kulhads with fresh fruits",
        "timings": "8:00 AM – 10:30 PM",
        "address": "Bangali Tola, Near Manikarnika Ghat, Varanasi",
        "coordinates": {
          "lat": 25.3114,
          "lng": 83.0125
        },
        "isVeg": true
      }
    ],
    "experiences": [
      {
        "id": "subah-e-banaras-boat",
        "title": "Dawn Heritage Rowing Boat along 84 Ghats",
        "category": "adventure",
        "categoryLabel": "River Experience",
        "duration": "2 Hours",
        "price": 800,
        "image": "/images/places/assi-ghat.jpg",
        "description": "Glide past morning bathers, sadhus, and temple bells from Assi Ghat to Panchganga Ghat at sunrise.",
        "highlights": [
          "Wooden row boat experience",
          "Morning flute & chants from riverside",
          "Passing Manikarnika from river"
        ],
        "timing": "5:30 AM – 7:30 AM",
        "location": "Assi Ghat Steps",
        "rating": 4.9
      },
      {
        "id": "banarasi-silk-walk",
        "title": "Banarasi Brocade & Handloom Alley Trail",
        "category": "craft",
        "categoryLabel": "Artisan Trail",
        "duration": "2.5 Hours",
        "price": 950,
        "image": "/images/places/kashi-vishwanath.jpg",
        "description": "Meet 4th-generation Muslim master weavers creating gold and silver Zari brocade sarees on wooden pit looms.",
        "highlights": [
          "Pit loom weaving demo",
          "Zari metallic thread spinning",
          "Authentic GI-tagged silk buying tips"
        ],
        "timing": "11:00 AM – 1:30 PM",
        "location": "Madanpura & Chowk Handloom Mohalla",
        "rating": 4.8
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Sacred Heart: Dawn Boat Ride, Kashi Vishwanath & Evening Aarti",
        "dateLabel": "Day 01",
        "totalDistanceKm": 3.5,
        "totalTravelTimeMin": 35,
        "totalDaySpend": 500,
        "stops": [
          {
            "id": "v-d1-1",
            "placeId": "assi-ghat",
            "placeName": "Assi Ghat Sunrise & Subah-e-Banaras",
            "category": "heritage",
            "timeSlot": "5:15 AM – 7:30 AM",
            "durationMin": 135,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 0,
            "iconType": "Sun",
            "notes": "Watch the sunrise over the Ganges with live morning ragas.",
            "coordinates": {
              "lat": 25.2891,
              "lng": 83.0069
            }
          },
          {
            "id": "v-d1-2",
            "placeId": "kashi-vishwanath",
            "placeName": "Shri Kashi Vishwanath Golden Temple",
            "category": "temple",
            "timeSlot": "9:00 AM – 11:30 AM",
            "durationMin": 150,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 2.4,
            "estimatedCost": 0,
            "iconType": "Landmark",
            "notes": "Walk the grand new Ganga corridor.",
            "coordinates": {
              "lat": 25.3109,
              "lng": 83.0107
            }
          },
          {
            "id": "v-d1-3",
            "placeId": "dashashwamedh-ghat",
            "placeName": "Dashashwamedh Ghat Maha Aarti",
            "category": "heritage",
            "timeSlot": "5:45 PM – 7:45 PM",
            "durationMin": 120,
            "travelFromPrevMin": 10,
            "distanceFromPrevKm": 0.5,
            "estimatedCost": 100,
            "iconType": "Sparkles",
            "notes": "Book a river boat for the best view of the evening brass lamp aarti.",
            "coordinates": {
              "lat": 25.3068,
              "lng": 83.0105
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Enlightenment Trail: Sarnath Stupa & Banarasi Silk Weavers",
        "dateLabel": "Day 02",
        "totalDistanceKm": 18,
        "totalTravelTimeMin": 60,
        "totalDaySpend": 650,
        "stops": [
          {
            "id": "v-d2-1",
            "placeId": "sarnath",
            "placeName": "Sarnath & Dhamek Stupa Monastic Park",
            "category": "heritage",
            "timeSlot": "9:00 AM – 12:30 PM",
            "durationMin": 210,
            "travelFromPrevMin": 25,
            "distanceFromPrevKm": 9.8,
            "estimatedCost": 25,
            "iconType": "Landmark",
            "notes": "Visit the Ashoka Lion Capital museum and ancient deer park.",
            "coordinates": {
              "lat": 25.3811,
              "lng": 83.0247
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/dashashwamedh-ghat.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 25.3109,
      "lng": 83.0107
    }
  },
  "goa": {
    "id": "goa",
    "slug": "goa",
    "name": "Goa",
    "state": "Goa",
    "tagline": "Golden Coast · Portuguese Heritage · Latin Quarters & Cascades",
    "shortBio": "Where 450 years of Portuguese architecture blend with emerald palm groves and the Arabian Sea. Famed for UNESCO basilicas in Old Goa, the 17th-century ramparts of Fort Aguada, white sand coves in South Goa, and the misty 4-tier cascade of Dudhsagar Falls.",
    "heroBanner": "/images/places/aguada-fort.jpg",
    "heroGallery": [
      "/images/places/bom-jesus-basilica.jpg",
      "/images/places/aguada-fort.jpg",
      "/images/places/palolem-beach.jpg",
      "/images/places/dudhsagar-falls.jpg"
    ],
    "bestSeason": "November – April",
    "recommendedDays": "4–5 Days",
    "approxBudgetPerDay": {
      "budget": 2200,
      "comfort": 5500,
      "luxury": 18000
    },
    "weather": {
      "tempC": 30,
      "condition": "Sunny & Coastal Breeze",
      "humidity": "65%"
    },
    "tourismStatus": {
      "safetyScore": "4.8 / 5.0 (High Tourist Safety)",
      "crowdLevel": "Moderate",
      "peakHours": "11:00 AM – 4:00 PM (Aguada & Calangute coast)"
    },
    "curatedForStyles": [
      {
        "styleId": "beaches-water-sports",
        "styleTitle": "Sun-Kissed Beaches & Water Sports",
        "description": "Crescent sandy beaches, ocean kayak trails, and sunset viewpoints.",
        "recommendedPlaceIds": [
          "palolem-beach",
          "aguada-fort",
          "bom-jesus-basilica"
        ]
      },
      {
        "styleId": "portuguese-quarters",
        "styleTitle": "Portuguese Quarters & Churches",
        "description": "Baroque UNESCO basilicas, colorful colonial Latin streets, and fort ramparts.",
        "recommendedPlaceIds": [
          "bom-jesus-basilica",
          "aguada-fort",
          "dudhsagar-falls"
        ]
      }
    ],
    "places": [
      {
        "id": "bom-jesus-basilica",
        "name": "Basilica of Bom Jesus",
        "hindiName": "बेसिलिका ऑफ बॉम जीसस",
        "tagline": "UNESCO Baroque Masterpiece Housing the Sacred Relics of St. Francis Xavier",
        "category": "temple",
        "categoryLabel": "UNESCO World Heritage Church",
        "rating": 4.8,
        "reviewCount": 24000,
        "images": [
          "/images/places/bom-jesus-basilica.jpg"
        ],
        "description": "Consecrated in 1605, this unplastered red laterite church is one of the oldest in the Christian world. Holds the sacred mortal remains of Saint Francis Xavier in a silver casket inside an Italian marble mausoleum.",
        "coordinates": {
          "lat": 15.5009,
          "lng": 73.9116
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "9:00 AM – 6:30 PM (Sundays 10:30 AM – 6:30 PM)",
        "bestTimeToVisit": "9:00 AM – 11:00 AM",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Construction began in 1594 and finished in 1605, representing the finest example of Jesuit Baroque architecture in India.",
          "architecturalStyle": "Mannerist and Baroque Laterite Architecture",
          "architectureHighlights": [
            "Exposed blackish-red laterite facade devoid of white plaster",
            "Intricately carved gilded high altar dedicated to infant Jesus",
            "Three-tiered Florentine marble mausoleum gifted by the Grand Duke of Tuscany"
          ],
          "legendsAndStories": [
            "The body of St. Francis Xavier, who died in 1552, is believed to remain miraculously non-decomposed after nearly five centuries."
          ],
          "bestPhotoSpots": [
            "Front lawn perspective framing the triangular Baroque pediment against blue sky",
            "Gilded wooden high altar inside the central nave"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "aguada-fort",
        "name": "Fort Aguada & Lighthouse",
        "hindiName": "अगुआड़ा किला",
        "tagline": "1612 AD Portuguese Sea Fort & Freshwater Cistern at Sinquerim",
        "category": "palace",
        "categoryLabel": "17th-Century Coastal Fort",
        "rating": 4.7,
        "reviewCount": 31000,
        "images": [
          "/images/places/aguada-fort.jpg"
        ],
        "description": "A magnificent Portuguese fort standing at the mouth of the Mandovi River. Named after the Portuguese word for water (Água) because of its massive underground freshwater cistern that could store 2.37 million gallons to resupply passing ships.",
        "coordinates": {
          "lat": 15.4925,
          "lng": 73.7735
        },
        "entryFee": {
          "indian": 25,
          "foreign": 300
        },
        "timings": "9:30 AM – 6:00 PM",
        "bestTimeToVisit": "4:30 PM – 6:00 PM for sunset over the Arabian Sea",
        "timeRequired": "2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Erected by the Portuguese in 1612 to protect against the Marathas and the Dutch fleets attempting to enter Goa harbor.",
          "architecturalStyle": "Portuguese Coastal Military Bastion",
          "architectureHighlights": [
            "Four-storey circular lighthouse constructed in 1864, one of the oldest in Asia",
            "Enormous arched freshwater vaulted reservoir subterranean complex",
            "Ramparts offering uninterrupted panoramic views across the Sinquerim coastline"
          ],
          "legendsAndStories": [
            "During Portuguese rule, 79 cannons were mounted along the ramparts, making it virtually impregnable from the sea."
          ],
          "bestPhotoSpots": [
            "Standing beside the circular lighthouse with the Arabian Sea in the backdrop",
            "Lower fort ramparts as waves crash against the laterite sea-wall"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "palolem-beach",
        "name": "Palolem Beach Crescent Bay",
        "hindiName": "पालोलेम बीच",
        "tagline": "Pristine South Goa Crescent of Golden Sand & Coconut Palms",
        "category": "nature",
        "categoryLabel": "Coastal Sanctuary",
        "rating": 4.8,
        "reviewCount": 19000,
        "images": [
          "/images/places/palolem-beach.jpg"
        ],
        "description": "A mile-long crescent-shaped white sand bay in Canacona, South Goa. Famous for its gently shelving calm turquoise waters, sea kayaking to Butterfly Island, and laid-back wooden beachfront shacks.",
        "coordinates": {
          "lat": 15.0101,
          "lng": 74.0232
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours",
        "bestTimeToVisit": "Early morning for dolphin-watching or 5:00 PM for sunset",
        "timeRequired": "Half Day to Full Day",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "A traditional fishing village that developed into Goa’s most celebrated peaceful beach haven.",
          "architecturalStyle": "Natural Coastal Bay & Eco-Bamboo Shacks",
          "architectureHighlights": [
            "Sheltered bay protected by natural headlands providing calm safe swimming conditions",
            "Overhanging canopy of indigenous swaying coconut trees",
            "Monkey Island (Canacona Island) accessible on foot at low tide"
          ],
          "legendsAndStories": [
            "Local fishermen take visitors out to sea at dawn to spot pods of Indo-Pacific humpback dolphins playing in the calm waters."
          ],
          "bestPhotoSpots": [
            "North headland rocky outcrop framing the full crescent bay",
            "Sunset silhouette of coconut trees against violet ocean skies"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "dudhsagar-falls",
        "name": "Dudhsagar Waterfalls",
        "hindiName": "दूधसागर जलप्रपात",
        "tagline": "Sea of Milk: 310-Meter 4-Tier Cascade in Bhagwan Mahaveer Sanctuary",
        "category": "nature",
        "categoryLabel": "Monumental Cascade",
        "rating": 4.8,
        "reviewCount": 28000,
        "images": [
          "/images/places/dudhsagar-falls.jpg"
        ],
        "description": "One of India’s tallest waterfalls (1,017 feet / 310 meters), plunging through the Western Ghats rainforest on the Mandovi River. Famous for the railway bridge spanning right in front of the rushing white torrent.",
        "coordinates": {
          "lat": 15.3144,
          "lng": 74.3143
        },
        "entryFee": {
          "indian": 100,
          "foreign": 100
        },
        "timings": "7:00 AM – 5:00 PM (Jeep Safari entry)",
        "bestTimeToVisit": "8:00 AM – 1:00 PM",
        "timeRequired": "4 – 5 Hours (including 4x4 jungle jeep ride)",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Located in the dense Western Ghats biodiversity hotspot, accessed by authorized forest department 4x4 jeeps crossing multiple river streams.",
          "architecturalStyle": "Tiered Mountain Cataract & 19th-century Rail Viaduct",
          "architectureHighlights": [
            "Four separate plunging tiers cascading into deep natural pools",
            "Iconic stone railway arch bridge where passenger trains cross amidst water spray",
            "Lush evergreen canopy inhabited by monkeys and hornbills"
          ],
          "legendsAndStories": [
            "Legend tells of a virtuous princess who poured a jug of sweetened milk into the valley to create a white curtain of foam and hide herself from an onlooker."
          ],
          "bestPhotoSpots": [
            "From the base pool looking straight up as a passenger train crosses the viaduct bridge"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "chapora-fort",
        "name": "Chapora Fort",
        "hindiName": "चपोरा किला",
        "tagline": "1717 AD Red Laterite Hilltop Bastion Overlooking Vagator Beach",
        "category": "palace",
        "categoryLabel": "Panoramic Coastal Bastion",
        "rating": 4.7,
        "reviewCount": 32000,
        "images": [
          "/images/places/chapora-fort.jpg"
        ],
        "description": "Perched on a prominent laterite ridge above the mouth of the Chapora River, this 1717 fortress was built by the Portuguese after recapturing the site from the Maratha rulers. Immensely popular for its 360-degree sunset panoramas across Vagator and Morjim beaches.",
        "coordinates": {
          "lat": 15.6058,
          "lng": 73.7369
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "6:00 AM – 7:00 PM (Daily)",
        "bestTimeToVisit": "5:00 PM – 6:45 PM for spectacular Arabian Sea sunsets",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Originally built by Adil Shah of Bijapur in the 16th century, rebuilt in 1717 by the Portuguese Viceroy of Goa.",
          "architecturalStyle": "Coastal Laterite Military Fortress Architecture",
          "architectureHighlights": [
            "Undulating red laterite ramparts following the natural ridge contours",
            "Broad commanding embrasures designed for heavy bronze cannon artillery",
            "Expansive unobstructed vista over the Chapora river estuary meeting the ocean"
          ],
          "legendsAndStories": [
            "Known affectionately across India as the \"Dil Chahta Hai Fort\" after the landmark 2001 Hindi film scene filmed atop its stone ramparts."
          ],
          "bestPhotoSpots": [
            "Sitting on the western stone rampart wall looking out towards Vagator cove at golden hour"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": [
          {
            "id": "aguada-fort",
            "name": "Fort Aguada",
            "category": "attraction",
            "distanceKm": 14.5,
            "travelTimeMin": 35
          }
        ]
      },
      {
        "id": "se-cathedral",
        "name": "Sé Cathedral de Santa Catarina",
        "hindiName": "से कैथेड्रल, पुराना गोवा",
        "tagline": "1619 AD Portuguese-Manueline Cathedral · Largest Church in Asia",
        "category": "temple",
        "categoryLabel": "UNESCO Imperial Cathedral",
        "rating": 4.7,
        "reviewCount": 18500,
        "images": [
          "/images/places/se-cathedral.jpg",
          "/images/places/bom-jesus-basilica.jpg"
        ],
        "description": "Commissioned in 1562 to commemorate Afonso de Albuquerque’s victory over the Muslim army in 1510. Renowned for its imposing Tuscan exterior, Corinthian interior, and the celebrated \"Golden Bell\", one of the largest and richest in tone in the world.",
        "coordinates": {
          "lat": 15.5038,
          "lng": 73.9125
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "7:30 AM – 6:00 PM (Daily)",
        "bestTimeToVisit": "9:30 AM – 11:30 AM (Peaceful morning atmosphere and dramatic interior light beams)",
        "timeRequired": "1 – 1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Took 57 years to construct from 1562 to 1619, consecrated in 1640 as the primary seat of the Patriarch of the East Indies.",
          "architecturalStyle": "Portuguese-Manueline & Tuscan Renaissance Architecture",
          "architectureHighlights": [
            "Massive 250-foot long nave with 14 vaulted side chapels",
            "Towering Golden Bell whose chimes resonate across Old Goa",
            "Richly carved gilded main altarpiece depicting the martyrdom of St. Catherine of Alexandria"
          ],
          "legendsAndStories": [
            "One of its original twin bell towers was struck by lightning and collapsed in 1776, leaving the iconic asymmetrical single-tower silhouette seen today."
          ],
          "bestPhotoSpots": [
            "Wide-angle perspective from Rua Direita capturing the majestic white Tuscan facade"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "bom-jesus-basilica",
            "name": "Basilica of Bom Jesus",
            "category": "attraction",
            "distanceKm": 0.3,
            "travelTimeMin": 4
          }
        ],
        "nearbyWithin5Km": []
      }
    ],
    "stays": [
      {
        "id": "taj-fort-aguada",
        "name": "Taj Fort Aguada Resort & Spa",
        "type": "luxury_palace",
        "tier": "luxury",
        "rating": 4.9,
        "pricePerNight": 24000,
        "image": "/images/places/aguada-fort.jpg",
        "amenities": [
          "Private Beach Access",
          "Portuguese Villa Architecture",
          "Jiva Spa",
          "Sea-Facing Infinity Pool"
        ],
        "address": "Sinquerim, Candolim, Goa",
        "distanceToItineraryHighlights": [
          {
            "placeId": "aguada-fort",
            "placeName": "Fort Aguada",
            "distanceKm": 1,
            "drivingTimeMin": 4
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "vinayak-family-restaurant",
        "name": "Vinayak Family Restaurant",
        "cuisineType": "Authentic Goan Seafood & Thali",
        "type": "traditional_thali",
        "rating": 4.7,
        "priceForTwo": 700,
        "image": "/images/places/palolem-beach.jpg",
        "mustTryDishes": [
          "Kingfish Fish Thali with Sol Kadhi",
          "Prawn Rawa Fry",
          "Crab Xacuti",
          "Bebinca with Vanilla Ice Cream"
        ],
        "specialty": "Legendary local tavern serving fresh catch Goan fish thalis overlooking green paddy fields",
        "timings": "12:30 PM – 3:30 PM, 7:00 PM – 10:30 PM",
        "address": "Main Road, Assagao, Goa",
        "coordinates": {
          "lat": 15.589,
          "lng": 73.782
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "fontainhas-heritage-walk",
        "title": "Fontainhas Latin Quarter Walking Tour",
        "category": "heritage_walk",
        "categoryLabel": "Colonial Architecture",
        "duration": "2 Hours",
        "price": 750,
        "image": "/images/places/bom-jesus-basilica.jpg",
        "description": "Wander through Asia’s only Latin Quarter with pastel-colored Portuguese villas, oyster-shell windows, and azulejos ceramic tile art.",
        "highlights": [
          "18th-century Portuguese mansions",
          "Traditional bakery visit for fresh Poee bread",
          "Azulejos hand-painted tile workshop"
        ],
        "timing": "4:00 PM – 6:00 PM",
        "location": "Panaji Latin Quarter, Fontainhas",
        "rating": 4.9
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Heritage & Ramparts: Old Goa UNESCO Churches & Fort Aguada Sunset",
        "dateLabel": "Day 01",
        "totalDistanceKm": 28,
        "totalTravelTimeMin": 55,
        "totalDaySpend": 800,
        "stops": [
          {
            "id": "g-d1-1",
            "placeId": "bom-jesus-basilica",
            "placeName": "Basilica of Bom Jesus & Old Goa",
            "category": "temple",
            "timeSlot": "9:30 AM – 12:00 PM",
            "durationMin": 150,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 0,
            "iconType": "Landmark",
            "notes": "Baroque architecture and sacred silver casket of St. Francis Xavier.",
            "coordinates": {
              "lat": 15.5009,
              "lng": 73.9116
            }
          },
          {
            "id": "g-d1-2",
            "placeId": "aguada-fort",
            "placeName": "Fort Aguada Ramparts & Lighthouse Sunset",
            "category": "palace",
            "timeSlot": "4:00 PM – 6:30 PM",
            "durationMin": 150,
            "travelFromPrevMin": 35,
            "distanceFromPrevKm": 22,
            "estimatedCost": 25,
            "iconType": "Sun",
            "notes": "Historic lighthouse and panoramic Arabian Sea sunset.",
            "coordinates": {
              "lat": 15.4925,
              "lng": 73.7735
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/aguada-fort.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 15.5009,
      "lng": 73.9116
    }
  },
  "hampi": {
    "id": "hampi",
    "slug": "hampi",
    "name": "Hampi",
    "state": "Karnataka",
    "tagline": "UNESCO World Heritage · Vijayanagara Empire · Boulders & Sacred Ruins",
    "shortBio": "The grand 14th-century capital of the Vijayanagara Empire sprawled along the rocky banks of the Tungabhadra River. Famed for its iconic stone chariot, monolithic statues, musical pillars, and sunset vistas over surreal granite boulder landscapes.",
    "heroBanner": "/images/places/vittala-stone-chariot.jpg",
    "heroGallery": [
      "/images/places/vittala-stone-chariot.jpg",
      "/images/places/virupaksha-temple.jpg",
      "/images/places/lotus-mahal.jpg",
      "/images/places/matanga-hill.jpg"
    ],
    "bestSeason": "October – February",
    "recommendedDays": "3–4 Days",
    "approxBudgetPerDay": {
      "budget": 1800,
      "comfort": 4500,
      "luxury": 14000
    },
    "weather": {
      "tempC": 29,
      "condition": "Sunny & Dry",
      "humidity": "35%"
    },
    "tourismStatus": {
      "safetyScore": "4.9 / 5.0 (High Tourist Safety)",
      "crowdLevel": "Moderate",
      "peakHours": "10:00 AM – 3:30 PM (Vittala Temple Complex)"
    },
    "curatedForStyles": [
      {
        "styleId": "unesco-ruins",
        "styleTitle": "UNESCO Monoliths & Stone Chariot",
        "description": "The monumental stone chariot, musical pillared halls, and ancient royal court architecture.",
        "recommendedPlaceIds": [
          "vittala-temple",
          "virupaksha-temple",
          "lotus-mahal",
          "matanga-hill"
        ]
      },
      {
        "styleId": "boulder-trails",
        "styleTitle": "Matanga Hill Sunrise & Boulders",
        "description": "Panoramic sunrise trek overlooking miles of ancient temple towers amidst surreal boulder hills.",
        "recommendedPlaceIds": [
          "matanga-hill",
          "virupaksha-temple",
          "vittala-temple"
        ]
      }
    ],
    "places": [
      {
        "id": "vittala-temple",
        "name": "Vijaya Vittala Temple & Stone Chariot",
        "hindiName": "विजय विट्ठल मंदिर एवं प्रस्तर रथ",
        "tagline": "World-Renowned Monolithic Stone Chariot & Musical Pillars",
        "category": "heritage",
        "categoryLabel": "UNESCO World Heritage",
        "rating": 4.9,
        "reviewCount": 16500,
        "images": [
          "/images/places/vittala-stone-chariot.jpg"
        ],
        "description": "The crowning jewel of Vijayanagara architecture. Houses the world-famous monolithic stone chariot dedicated to Garuda and the Ranga Mandapa with 56 musical pillars that emit musical tones when tapped.",
        "coordinates": {
          "lat": 15.3438,
          "lng": 76.4756
        },
        "entryFee": {
          "indian": 40,
          "foreign": 600
        },
        "timings": "8:30 AM – 5:30 PM (All days)",
        "bestTimeToVisit": "8:30 AM – 11:00 AM (Cooler morning light)",
        "timeRequired": "2 – 3 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Built in the 15th century during the reign of King Devaraya II and substantially expanded by Krishnadevaraya.",
          "architecturalStyle": "High Dravidian Vijayanagara Style",
          "architectureHighlights": [
            "Stone chariot with rotating wheels carved from single granite blocks",
            "Saptaswara musical pillars resonant at specific swaras",
            "Intricate carved ceiling friezes depicting Ramayana and Mahabharata"
          ],
          "legendsAndStories": [
            "Legend states the stone chariot was inspired by the Sun Temple at Konark and was originally painted with natural minerals."
          ],
          "bestPhotoSpots": [
            "Direct straight shot of the Stone Chariot with the Maha Mandapa in background",
            "Fluted musical pillared corridor in morning side-lighting"
          ],
          "audioGuideAvailable": true,
          "audioGuidePreviewText": "Welcome to Vittala Temple, the architectural pinnacle of the Vijayanagara Empire..."
        },
        "nearbyWithin1Km": [
          {
            "id": "virupaksha-temple",
            "name": "Virupaksha Temple",
            "category": "attraction",
            "distanceKm": 2.2,
            "travelTimeMin": 10
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "lotus-mahal",
            "name": "Lotus Mahal & Elephant Stables",
            "category": "attraction",
            "distanceKm": 3.5,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "virupaksha-temple",
        "name": "Shri Virupaksha Temple",
        "hindiName": "श्री विरूपाक्ष मंदिर",
        "tagline": "Oldest Living Temple of Hampi dedicated to Lord Shiva",
        "category": "temple",
        "categoryLabel": "Living Sacred Shrine",
        "rating": 4.8,
        "reviewCount": 18200,
        "images": [
          "/images/places/virupaksha-temple.jpg"
        ],
        "description": "Continuously worshipped since the 7th century AD, Virupaksha Temple stands at the end of the sacred Hampi Bazaar beneath a towering 50-meter eastern gopuram.",
        "coordinates": {
          "lat": 15.3353,
          "lng": 76.4599
        },
        "entryFee": {
          "indian": 25,
          "foreign": 25
        },
        "timings": "6:00 AM – 1:00 PM, 5:00 PM – 9:00 PM",
        "bestTimeToVisit": "6:30 AM for early morning aarti and temple elephant blessing",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Founded before the Vijayanagara empire in the 7th century, expanded into a grand complex by Krishnadevaraya in 1509 AD.",
          "architecturalStyle": "Vijayanagara Dravidian Temple Architecture",
          "architectureHighlights": [
            "50-meter 9-tiered Eastern Gopuram gateway",
            "Pin-hole camera phenomenon reflecting inverted gopuram shadow on the sanctum wall",
            "Lakshmi the temple elephant greeting morning pilgrims"
          ],
          "legendsAndStories": [
            "Dedicated to Lord Virupaksha, a consort of the local goddess Pampa Devi after whom the Tungabhadra river was historically named."
          ],
          "bestPhotoSpots": [
            "From Hemakuta Hill looking down across the towering eastern gopuram",
            "Main pillared courtyard during morning sunlight"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "matanga-hill",
            "name": "Matanga Hill Sunrise Peak",
            "category": "attraction",
            "distanceKm": 0.8,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "vittala-temple",
            "name": "Vijaya Vittala Temple",
            "category": "attraction",
            "distanceKm": 2.2,
            "travelTimeMin": 10
          }
        ]
      },
      {
        "id": "lotus-mahal",
        "name": "Lotus Mahal & Elephant Stables",
        "hindiName": "कमल महल एवं गजशाला",
        "tagline": "Indo-Islamic Royal Zenana Enclosure Masterpiece",
        "category": "palace",
        "categoryLabel": "Royal Enclosure",
        "rating": 4.8,
        "reviewCount": 9400,
        "images": [
          "/images/places/lotus-mahal.jpg"
        ],
        "description": "A two-storey palace resembling an unfolding lotus bud, featuring ingenious natural air-cooling terracotta pipelines, situated beside the grand eleven-domed Elephant Stables.",
        "coordinates": {
          "lat": 15.3204,
          "lng": 76.4719
        },
        "entryFee": {
          "indian": 40,
          "foreign": 600
        },
        "timings": "8:30 AM – 5:30 PM",
        "bestTimeToVisit": "2:30 PM – 5:00 PM",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": true,
        "journeyLens": {
          "history": "Constructed for royal women (Zenana) in the 16th century, one of the few secular structures that survived the 1565 sacking intact.",
          "architecturalStyle": "Indo-Islamic Vijayanagara Hybrid Architecture",
          "architectureHighlights": [
            "Curved multi-foliate arches reminiscent of Islamic petal architecture",
            "Central pyramidical stepped spire derived from temple shikharas",
            "Nearby eleven domed chambers built to house royal ceremonial elephants"
          ],
          "legendsAndStories": [
            "The hollow palace pillars once held continuous cold river water pumped from the underground channels to act as royal air conditioning."
          ],
          "bestPhotoSpots": [
            "Front lawn lawn perspective framing the lotus arches",
            "Side panorama showing the 11 domes of the Elephant Stables"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "vittala-temple",
            "name": "Vijaya Vittala Temple",
            "category": "attraction",
            "distanceKm": 2.5,
            "travelTimeMin": 10
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "virupaksha-temple",
            "name": "Virupaksha Temple",
            "category": "attraction",
            "distanceKm": 3.2,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "matanga-hill",
        "name": "Matanga Hill Sunrise Peak",
        "hindiName": "मातंग पर्वत",
        "tagline": "Highest Panoramic Vantage Point Over Hampi Boulders & Ruins",
        "category": "nature",
        "categoryLabel": "Scenic Vantage & Trek",
        "rating": 4.9,
        "reviewCount": 11200,
        "images": [
          "/images/places/matanga-hill.jpg"
        ],
        "description": "The mythological hermitage of Sage Matanga mentioned in the Ramayana, offering an awe-inspiring 360-degree panorama of Hampi boulder valleys and the Tungabhadra River.",
        "coordinates": {
          "lat": 15.3328,
          "lng": 76.4678
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "5:30 AM – 6:30 PM (Daylight hours)",
        "bestTimeToVisit": "5:45 AM for sunrise over the ruins",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "According to Kishkindha Kanda of the Ramayana, this was the refuge where Sugriva sheltered from Vali.",
          "architecturalStyle": "Natural Granite Ridge with Veerabhadra Temple Crown",
          "architectureHighlights": [
            "Rock-cut steps winding up prehistoric granite boulders",
            "Rooftop temple observation terrace",
            "Full sightlines to Achyutaraya temple, Virupaksha, and Tungabhadra"
          ],
          "legendsAndStories": [
            "Sage Matanga placed a curse on monkey king Vali that if he ever stepped onto this hill, his head would shatter."
          ],
          "bestPhotoSpots": [
            "Sunrise looking down towards Achyutaraya temple in the morning mist",
            "Golden hour silhouette across the boulder-strewn landscape"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "virupaksha-temple",
            "name": "Virupaksha Temple",
            "category": "attraction",
            "distanceKm": 0.8,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "vittala-temple",
            "name": "Vijaya Vittala Temple",
            "category": "attraction",
            "distanceKm": 2,
            "travelTimeMin": 8
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "evolve-back-kamalapura",
        "name": "Evolve Back, Kamalapura Palace",
        "type": "luxury_palace",
        "tier": "luxury",
        "rating": 4.9,
        "pricePerNight": 28000,
        "image": "/images/places/lotus-mahal.jpg",
        "amenities": [
          "Vijayanagara Palace Architecture",
          "Private Plunge Pools",
          "Ayurvedic Spa",
          "Royal Dining"
        ],
        "address": "Kamalapura, Near Hampi Ruins, Karnataka",
        "distanceToItineraryHighlights": [
          {
            "placeId": "lotus-mahal",
            "placeName": "Lotus Mahal",
            "distanceKm": 4,
            "drivingTimeMin": 10
          },
          {
            "placeId": "vittala-temple",
            "placeName": "Vittala Temple",
            "distanceKm": 5.5,
            "drivingTimeMin": 14
          }
        ]
      },
      {
        "id": "kstdc-mayura-bhuvaneshwari",
        "name": "KSTDC Hotel Mayura Bhuvaneshwari",
        "type": "boutique_heritage",
        "tier": "comfort",
        "rating": 4.3,
        "pricePerNight": 3500,
        "image": "/images/places/virupaksha-temple.jpg",
        "amenities": [
          "Government Tourism Certified",
          "Garden Courtyards",
          "South Indian Dining",
          "Free Parking"
        ],
        "address": "Kamalapur, Hampi, Karnataka",
        "distanceToItineraryHighlights": [
          {
            "placeId": "lotus-mahal",
            "placeName": "Lotus Mahal",
            "distanceKm": 1.5,
            "drivingTimeMin": 5
          },
          {
            "placeId": "vittala-temple",
            "placeName": "Vittala Temple",
            "distanceKm": 3.5,
            "drivingTimeMin": 9
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "mango-tree-hampi",
        "name": "Mango Tree Restaurant Hampi",
        "cuisineType": "South Indian & Banana Leaf Thali",
        "type": "traditional_thali",
        "rating": 4.6,
        "priceForTwo": 500,
        "image": "/images/places/virupaksha-temple.jpg",
        "mustTryDishes": [
          "Unlimited South Indian Banana Leaf Thali",
          "Avocado Toast",
          "Filter Coffee",
          "Nutella Banoffee Pie"
        ],
        "specialty": "Riverside garden seating with authentic Karnataka vegetarian thalis",
        "timings": "7:30 AM – 10:00 PM",
        "address": "Near Virupaksha Temple Bazaar, Hampi",
        "coordinates": {
          "lat": 15.336,
          "lng": 76.461
        },
        "isVeg": true
      }
    ],
    "experiences": [
      {
        "id": "tungabhadra-coracle-ride",
        "title": "Tungabhadra River Coracle Safari",
        "category": "adventure",
        "categoryLabel": "River Experience",
        "duration": "1.5 Hours",
        "price": 600,
        "image": "/images/places/matanga-hill.jpg",
        "description": "Spin through prehistoric river rapids in a traditional woven round basket boat past rock-cut cave shrines.",
        "highlights": [
          "Traditional bamboo-cane coracle float",
          "Ancient riverside Shiva lingas",
          "Sunset reflections on boulders"
        ],
        "timing": "4:30 PM – 6:00 PM",
        "location": "Chakratirtha Ghat, Tungabhadra River",
        "rating": 4.8
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Imperial Heart: Vittala Chariot & Virupaksha Shrine",
        "dateLabel": "Day 01",
        "totalDistanceKm": 6,
        "totalTravelTimeMin": 35,
        "totalDaySpend": 600,
        "stops": [
          {
            "id": "h-d1-1",
            "placeId": "virupaksha-temple",
            "placeName": "Shri Virupaksha Temple Morning Blessing",
            "category": "temple",
            "timeSlot": "7:00 AM – 9:00 AM",
            "durationMin": 120,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 25,
            "iconType": "Sparkles",
            "notes": "Early morning tranquility and elephant blessing ceremony.",
            "coordinates": {
              "lat": 15.3353,
              "lng": 76.4599
            }
          },
          {
            "id": "h-d1-2",
            "placeId": "vittala-temple",
            "placeName": "Vijaya Vittala Temple & Stone Chariot",
            "category": "heritage",
            "timeSlot": "10:00 AM – 1:00 PM",
            "durationMin": 180,
            "travelFromPrevMin": 12,
            "distanceFromPrevKm": 2.2,
            "estimatedCost": 40,
            "iconType": "Landmark",
            "notes": "Witness the iconic stone chariot and musical pillars before midday sun.",
            "coordinates": {
              "lat": 15.3438,
              "lng": 76.4756
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Royal Women & Sunrise Heights: Lotus Mahal & Matanga",
        "dateLabel": "Day 02",
        "totalDistanceKm": 8,
        "totalTravelTimeMin": 40,
        "totalDaySpend": 750,
        "stops": [
          {
            "id": "h-d2-1",
            "placeId": "matanga-hill",
            "placeName": "Matanga Hill Sunrise Trek",
            "category": "nature",
            "timeSlot": "5:45 AM – 8:00 AM",
            "durationMin": 135,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 0,
            "iconType": "Sun",
            "notes": "360-degree panoramic sunrise across boulder landscapes.",
            "coordinates": {
              "lat": 15.3328,
              "lng": 76.4678
            }
          },
          {
            "id": "h-d2-2",
            "placeId": "lotus-mahal",
            "placeName": "Lotus Mahal & Elephant Stables",
            "category": "palace",
            "timeSlot": "3:00 PM – 5:30 PM",
            "durationMin": 150,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 3.5,
            "estimatedCost": 40,
            "iconType": "Landmark",
            "notes": "Indo-Islamic pavilions and royal elephant quarters.",
            "coordinates": {
              "lat": 15.3204,
              "lng": 76.4719
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/vittala-stone-chariot.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 15.3438,
      "lng": 76.4756
    }
  },
  "ladakh": {
    "id": "ladakh",
    "slug": "ladakh",
    "name": "Leh & Nubra",
    "state": "Ladakh",
    "tagline": "Land of High Passes · Himalayan Monasteries · Pangong & Nubra Dunes",
    "shortBio": "A breathtaking high-altitude desert framed by the Karakoram and Himalayan ranges. Home to turquoise endorheic lakes like Pangong Tso at 14,000 feet, cliffside gompas echoing with Tibetan horn prayers, the highest motorable road at Khardung La, and Bactrian double-hump camels across the white sands of Nubra.",
    "heroBanner": "/images/places/pangong-tso.jpg",
    "heroGallery": [
      "/images/places/pangong-tso.jpg",
      "/images/places/thiksey-monastery.jpg",
      "/images/places/khardung-la.jpg",
      "/images/places/nubra-valley.jpg"
    ],
    "bestSeason": "May – September",
    "recommendedDays": "5–7 Days",
    "approxBudgetPerDay": {
      "budget": 2500,
      "comfort": 6500,
      "luxury": 25000
    },
    "weather": {
      "tempC": 17,
      "condition": "Crisp & Sunny Himalayan Blue",
      "humidity": "20%"
    },
    "tourismStatus": {
      "safetyScore": "4.9 / 5.0 (High Himalayan Assistance & Army Support)",
      "crowdLevel": "Low",
      "peakHours": "11:00 AM – 2:30 PM (Passes & Lake viewpoints)"
    },
    "curatedForStyles": [
      {
        "styleId": "high-passes-monasteries",
        "styleTitle": "High Mountain Passes & Nubra Dunes",
        "description": "Cross 17,500-foot passes to glacial blue lakes and desert dunes.",
        "recommendedPlaceIds": [
          "pangong-tso",
          "thiksey-monastery",
          "khardung-la",
          "nubra-valley"
        ]
      },
      {
        "styleId": "ancient-gompas",
        "styleTitle": "Ancient Monasteries & Gompas",
        "description": "Cliffside Tibetan monasteries, morning prayer chants, and Buddhist art.",
        "recommendedPlaceIds": [
          "thiksey-monastery",
          "pangong-tso"
        ]
      }
    ],
    "places": [
      {
        "id": "pangong-tso",
        "name": "Pangong Tso Glacial Lake",
        "hindiName": "पैंगोंग त्सो झील",
        "tagline": "World’s Highest Saltwater Lake Changing Shades from Turquoise to Cobalt",
        "category": "nature",
        "categoryLabel": "High-Altitude Glacial Lake",
        "rating": 5,
        "reviewCount": 34000,
        "images": [
          "/images/places/pangong-tso.jpg"
        ],
        "description": "Situated at 4,350 meters (14,270 ft) altitude, spanning 134 kilometers from Ladakh into Tibet. The crystal-clear endorheic lake is famous for dramatically shifting colors from light emerald to deep royal blue under high-altitude sunlight.",
        "coordinates": {
          "lat": 33.7595,
          "lng": 78.6674
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours (Inner Line Permit Required)",
        "bestTimeToVisit": "Early morning sunrise or golden twilight",
        "timeRequired": "Overnight Camp or Full Day Trip",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Formed by tectonic damming of the river basin millions of years ago, maintaining saline water that freezes completely in harsh winter.",
          "architecturalStyle": "Natural Tectonic High Alpine Endorheic Basin",
          "architectureHighlights": [
            "Crystal-clear reflective water mirroring snow-capped barren peaks",
            "Absence of aquatic micro-flora creating surreal ultra-violet blue hues",
            "Migratory sanctuary for Brahminy ducks and bar-headed geese in summer"
          ],
          "legendsAndStories": [
            "Local Changpa nomads recount that sacred water spirits dwell in the deepest trenches of the lake where water depth exceeds 100 meters."
          ],
          "bestPhotoSpots": [
            "Lukung shore point looking across the endless blue horizon toward the snow peaks",
            "Spangmik village camps at dusk under the star-studded Milky Way"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "thiksey-monastery",
        "name": "Thiksey Monastery (Mini Potala)",
        "hindiName": "थिकसे मठ",
        "tagline": "12-Storey Gelug Gompa Crowned by the 49-Foot Maitreya Buddha",
        "category": "temple",
        "categoryLabel": "Tibetan Buddhist Gompa",
        "rating": 4.9,
        "reviewCount": 19000,
        "images": [
          "/images/places/thiksey-monastery.jpg"
        ],
        "description": "Affiliated with the Gelug (Yellow Hat) order of Tibetan Buddhism, Thiksey is perched dramatically on a hill resembling the Potala Palace of Lhasa. Contains the monumental two-storey golden statue of Maitreya (Future) Buddha blessed by the Dalai Lama.",
        "coordinates": {
          "lat": 34.0583,
          "lng": 77.6667
        },
        "entryFee": {
          "indian": 50,
          "foreign": 50
        },
        "timings": "6:00 AM – 7:00 PM (Morning prayers at 6:30 AM)",
        "bestTimeToVisit": "6:30 AM for atmospheric morning prayer chanting and conch blowing",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Founded in the 15th century by Sherab Zangpo’s disciple Paldan Zangpo following a prophecy of the crow.",
          "architecturalStyle": "Tibetan Dzong Hilltop Monastery Architecture",
          "architectureHighlights": [
            "12 tiers of whitewashed monastic cells rising hierarchically to red temple sanctums",
            "15-meter (49-foot) tall Maitreya Buddha statue occupying two entire stories",
            "Precious ancient thangkas, Tibetan scriptures, and wall murals of Buddhist cosmology"
          ],
          "legendsAndStories": [
            "When two lamas offered ritual tormas on a rock, a crow flew away with them and deposited them on Thiksey hill, signaling the divine site for the gompa."
          ],
          "bestPhotoSpots": [
            "From the Indus valley highway looking up at the full stacked whitewashed facade",
            "Eye-level portrait facing the magnificent face of the Maitreya Buddha"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "khardung-la",
        "name": "Khardung La Mountain Pass",
        "hindiName": "खारदुंग ला दर्रा",
        "tagline": "Legendary 17,582-Foot Gateway to Shyok & Nubra Valleys",
        "category": "nature",
        "categoryLabel": "High Mountain Pass",
        "rating": 4.8,
        "reviewCount": 31000,
        "images": [
          "/images/places/khardung-la.jpg"
        ],
        "description": "One of the highest motorable mountain passes on Earth, perched at an altitude of 5,359 meters (17,582 ft). Serves as the strategic military and civilian lifeline from Leh across the Ladakh Range into the Nubra and Siachen glacier regions.",
        "coordinates": {
          "lat": 34.2787,
          "lng": 77.6047
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Daylight travel hours (Subject to army convoy timings & weather)",
        "bestTimeToVisit": "9:00 AM – 11:30 AM",
        "timeRequired": "1 Hour stopover (Limit time to prevent acute mountain sickness)",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Opened to vehicular traffic in 1988 by the Border Roads Organisation (BRO), maintaining the pass year-round through Project HIMANK.",
          "architecturalStyle": "Himalayan High Altitude Pass with Prayer Flags",
          "architectureHighlights": [
            "Iconic yellow BRO milestone board announcing the altitude",
            "Thousands of fluttering multi-coloured Buddhist lungta prayer flags",
            "Glacial moraines and perpetual snowfields on either side of the road"
          ],
          "legendsAndStories": [
            "Historically, hundreds of horses and Bactrian camels passed through here annually on the ancient Central Asian silk caravan route to Yarkand."
          ],
          "bestPhotoSpots": [
            "Posing beside the official Border Roads Organisation summit board",
            "Snow valley panoramic vista descending into the Nubra valley below"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "nubra-valley",
        "name": "Hunder Sand Dunes & Nubra Valley",
        "hindiName": "नुब्रा घाटी एवं हुंडर के रेत के टीले",
        "tagline": "High-Altitude Cold Desert with Bactrian Double-Hump Camels",
        "category": "nature",
        "categoryLabel": "Himalayan Cold Desert",
        "rating": 4.9,
        "reviewCount": 22000,
        "images": [
          "/images/places/nubra-valley.jpg"
        ],
        "description": "An otherworldly high-altitude desert valley where the Shyok and Nubra rivers converge beneath jagged snow peaks. Famed for its white sand dunes at Hunder and the furry double-hump Bactrian camels, remnants of the historic Silk Route trade.",
        "coordinates": {
          "lat": 34.5822,
          "lng": 77.4683
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open daily; Camel rides 9:00 AM – 6:30 PM",
        "bestTimeToVisit": "4:30 PM – 6:30 PM for sunset shadows across the dunes",
        "timeRequired": "Half Day to Full Day",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "The northernmost territory of India, forming an essential trading outpost where silk, jade, and spices were exchanged between India and Central Asia.",
          "architecturalStyle": "Aeolian Cold Desert Sand Dunes & River Oasis",
          "architectureHighlights": [
            "Rippled white sand dunes framed directly against stark 6,000-meter snow peaks",
            "Sea-buckthorn berry green orchards along the glacial Shyok River",
            "Diskit Monastery with the gigantic 32-meter open-air Buddha statue"
          ],
          "legendsAndStories": [
            "Bactrian camels in Nubra are direct descendants of caravan pack animals left behind by traders when the borders closed in 1949."
          ],
          "bestPhotoSpots": [
            "Riding a double-hump Bactrian camel as the late afternoon sun casts long shadows over dunes",
            "The towering gold and copper Jampa Buddha at Diskit Monastery overlooking the valley"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      }
    ],
    "stays": [
      {
        "id": "the-grand-dragon-leh",
        "name": "The Grand Dragon Ladakh",
        "type": "luxury_palace",
        "tier": "luxury",
        "rating": 4.9,
        "pricePerNight": 18000,
        "image": "/images/places/pangong-tso.jpg",
        "amenities": [
          "Oxygen Fitted Suites",
          "Solar Heated Architecture",
          "Ladakhi & Tibetan Dining",
          "Mountain View Terraces"
        ],
        "address": "Old Road, Sheynam, Leh, Ladakh",
        "distanceToItineraryHighlights": [
          {
            "placeId": "thiksey-monastery",
            "placeName": "Thiksey Monastery",
            "distanceKm": 18,
            "drivingTimeMin": 30
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "tibetan-kitchen-leh",
        "name": "The Tibetan Kitchen Leh",
        "cuisineType": "Authentic Ladakhi, Tibetan & Bhutanese",
        "type": "traditional_thali",
        "rating": 4.8,
        "priceForTwo": 900,
        "image": "/images/places/thiksey-monastery.jpg",
        "mustTryDishes": [
          "Handmade Steamed Tingmo with Shapta",
          "Steaming Hot Mutton Momos",
          "Rich Gyathuk Noodle Soup",
          "Butter Salt Tea"
        ],
        "specialty": "Cozy traditional dining room serving hearty high-altitude Himalayan cuisine",
        "timings": "12:00 PM – 10:30 PM",
        "address": "Fort Road, Near Hotel Yak Tail, Leh",
        "coordinates": {
          "lat": 34.164,
          "lng": 77.584
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "bactrian-camel-safari",
        "title": "Hunder White Sand Dune Camel Safari",
        "category": "adventure",
        "categoryLabel": "Silk Route Experience",
        "duration": "1 Hour",
        "price": 600,
        "image": "/images/places/nubra-valley.jpg",
        "description": "Ride rare double-hump Bactrian camels across the wind-sculpted white sands of Nubra beneath glacial peaks.",
        "highlights": [
          "Ride authentic Silk Route Bactrian camels",
          "Sunset across the cold desert dunes",
          "Traditional Ladakhi folk tea stop"
        ],
        "timing": "4:30 PM – 6:00 PM",
        "location": "Hunder Sand Dunes, Nubra",
        "rating": 4.9
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Monastic Marvel: Thiksey Mini Potala & Indus Valley",
        "dateLabel": "Day 01",
        "totalDistanceKm": 42,
        "totalTravelTimeMin": 65,
        "totalDaySpend": 700,
        "stops": [
          {
            "id": "l-d1-1",
            "placeId": "thiksey-monastery",
            "placeName": "Thiksey Monastery Morning Chants",
            "category": "temple",
            "timeSlot": "6:30 AM – 9:30 AM",
            "durationMin": 180,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 50,
            "iconType": "Sparkles",
            "notes": "Witness monk morning prayers and 49-foot Maitreya Buddha.",
            "coordinates": {
              "lat": 34.0583,
              "lng": 77.6667
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/pangong-tso.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 33.7595,
      "lng": 78.6674
    }
  },
  "munnar": {
    "id": "munnar",
    "slug": "munnar",
    "name": "Munnar & Alleppey",
    "state": "Kerala",
    "tagline": "God’s Own Country · Rolling Tea Estates · Emerald Backwaters & Houseboats",
    "shortBio": "Where mist-covered high-altitude tea plantations meet the serene, palm-fringed backwater lagoons of Vembanad. Experience overnight luxury stays in traditional wooden Kettuvallam houseboats and trek through Eravikulam sanctuary home to the endangered Nilgiri Tahr.",
    "heroBanner": "/images/places/munnar-tea-hills.jpg",
    "heroGallery": [
      "/images/places/munnar-tea-hills.jpg",
      "/images/places/alleppey-houseboat.jpg",
      "/images/places/eravikulam-national-park.jpg"
    ],
    "bestSeason": "September – March",
    "recommendedDays": "4–5 Days",
    "approxBudgetPerDay": {
      "budget": 2500,
      "comfort": 6000,
      "luxury": 22000
    },
    "weather": {
      "tempC": 21,
      "condition": "Crisp & Misty",
      "humidity": "62%"
    },
    "tourismStatus": {
      "safetyScore": "4.9 / 5.0 (High Tourist Safety)",
      "crowdLevel": "Low",
      "peakHours": "10:00 AM – 2:00 PM (Eravikulam Safari)"
    },
    "curatedForStyles": [
      {
        "styleId": "backwaters-tea",
        "styleTitle": "Backwater Houseboat Cruises & Tea Hills",
        "description": "Private wooden houseboat cruises through tropical canals and morning tea garden walks.",
        "recommendedPlaceIds": [
          "alleppey-backwaters",
          "munnar-tea-gardens",
          "eravikulam-park"
        ]
      }
    ],
    "places": [
      {
        "id": "munnar-tea-gardens",
        "name": "Munnar Rolling Tea Estates",
        "hindiName": "मुन्नार चाय बागान",
        "tagline": "Endless Carpets of Emerald Green Plantations in the Western Ghats",
        "category": "nature",
        "categoryLabel": "High-Altitude Plantation",
        "rating": 4.9,
        "reviewCount": 26000,
        "images": [
          "/images/places/munnar-tea-hills.jpg"
        ],
        "description": "Perched at 1,600 meters elevation at the confluence of three mountain rivers (Mudhirapuzha, Nallathanni, and Kundaly). Features miles of manicured British-era tea bushes, orthodox tea factory tours, and panoramic mountain view points.",
        "coordinates": {
          "lat": 10.0889,
          "lng": 77.0595
        },
        "entryFee": {
          "indian": 50,
          "foreign": 100
        },
        "timings": "7:00 AM – 6:00 PM",
        "bestTimeToVisit": "7:30 AM – 10:00 AM when morning mist rolls off the peaks",
        "timeRequired": "3 – 4 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Tea cultivation was introduced in the 1870s by A.H. Sharp; expanded into one of the world’s most scenic tea regions.",
          "architecturalStyle": "Contour-planted Tea Slopes & Colonial Bungalows",
          "architectureHighlights": [
            "Steep contour terracing designed to prevent soil erosion while capturing mountain rain",
            "Historic KDHP Tea Museum and demonstration factory",
            "Cardamom, clove, and cinnamon spice forest buffers"
          ],
          "legendsAndStories": [
            "The rare Neelakurinji flower blooms on these hills once every 12 years, turning the entire landscape a vibrant violet-blue."
          ],
          "bestPhotoSpots": [
            "Lockhart Gap viewpoint looking down at misty plantation ravines",
            "Between rows of neatly trimmed tea bushes in morning backlight"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "alleppey-backwaters",
        "name": "Alleppey Backwaters & Kettuvallam",
        "hindiName": "अल्लेप्पी बैकवाटर",
        "tagline": "Venice of the East: Serene Labyrinth of Palm-Fringed Canals",
        "category": "nature",
        "categoryLabel": "Signature Backwater Waterway",
        "rating": 4.9,
        "reviewCount": 38000,
        "images": [
          "/images/places/alleppey-houseboat.jpg"
        ],
        "description": "A magical network of interconnected brackish lagoons, rivers, and canals fringed with swaying coconut palms. Travelers glide along Vembanad Lake in eco-friendly handcrafted wooden houseboats made of Anjili wood tied with coir ropes without a single iron nail.",
        "coordinates": {
          "lat": 9.4981,
          "lng": 76.3388
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Day cruises 11:30 AM – 5:30 PM; Overnight cruises arrive at 12:00 PM",
        "bestTimeToVisit": "November to February for gentle tropical breezes",
        "timeRequired": "Overnight Cruise or 4-Hour Day Cruise",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Kettuvallams were historically grain barges carrying rice from Kuttanad to ports; revived in the 1990s as luxury floating sanctuaries.",
          "architecturalStyle": "Vernacular Coir & Bamboo Hull Boat Architecture",
          "architectureHighlights": [
            "Handcrafted hull bound with coconut fiber coir rope coated in black resin from boiled cashew shells",
            "Arched bamboo and reed thatch roof providing natural thermal insulation",
            "Open forward sundeck framing unobstructed 360-degree canal horizons"
          ],
          "legendsAndStories": [
            "Kuttanad is known as the Rice Bowl of Kerala, where farming is uniquely practiced 4 to 10 feet below sea level."
          ],
          "bestPhotoSpots": [
            "From the bow of the boat as the sun sets over Vembanad Lake",
            "Passing traditional village wooden canoes amidst water lilies"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "eravikulam-park",
        "name": "Eravikulam National Park (Rajamalai)",
        "hindiName": "इरावीकुलम राष्ट्रीय उद्यान",
        "tagline": "Sanctuary of the Endangered Nilgiri Tahr beneath Anamudi Peak",
        "category": "nature",
        "categoryLabel": "High-Altitude National Park",
        "rating": 4.8,
        "reviewCount": 17500,
        "images": [
          "/images/places/eravikulam-national-park.jpg"
        ],
        "description": "Kerala’s first national park, sprawling across 97 square kilometers in the High Ranges. Home to the world’s largest surviving population of the rare Nilgiri Tahr mountain goat and crowned by Anamudi (2,695m), the highest peak in South India.",
        "coordinates": {
          "lat": 10.1983,
          "lng": 77.0672
        },
        "entryFee": {
          "indian": 200,
          "foreign": 500
        },
        "timings": "7:30 AM – 4:00 PM",
        "bestTimeToVisit": "8:00 AM – 11:00 AM",
        "timeRequired": "3 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Declared a wildlife sanctuary in 1975 to protect the endangered Nilgiri Tahr from extinction, upgraded to national park status in 1978.",
          "architecturalStyle": "Montane Shola-Grassland High Plateau",
          "architectureHighlights": [
            "Unique undulating shola grassland ecosystem found only in the Western Ghats",
            "Gentle safari buses ascending steep winding mountain passes",
            "Granite cliffs where Nilgiri Tahr climb sheer vertical rock faces"
          ],
          "legendsAndStories": [
            "The Nilgiri Tahr here are remarkably docile around humans due to decades of strict conservation protection."
          ],
          "bestPhotoSpots": [
            "Close-up portraits of Nilgiri Tahr resting alongside the high mountain trail",
            "Valley panoramic view with mist cascading across Anamudi peak"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      },
      {
        "id": "mattupetty-dam",
        "name": "Mattupetty Dam & Lake",
        "hindiName": "माट्टुपेट्टी बांध एवं झील",
        "tagline": "1,700m Altitude Concrete Gravity Dam, Speedboating & Wild Elephants",
        "category": "nature",
        "categoryLabel": "High-Altitude Lake & Dam",
        "rating": 4.7,
        "reviewCount": 21500,
        "images": [
          "/images/places/mattupetty-dam.jpg"
        ],
        "description": "Located 13 km from Munnar at an elevation of 1,700 meters. Constructed under the Pallivasal Hydro-electric project in 1953, the calm waters of Mattupetty Dam are surrounded by undulating tea plantations and shola forests, where wild elephant herds frequently come down to drink.",
        "coordinates": {
          "lat": 10.1062,
          "lng": 77.1245
        },
        "entryFee": {
          "indian": 40,
          "foreign": 40
        },
        "timings": "9:30 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "10:00 AM – 2:00 PM for speedboating and peaceful lake reflections",
        "timeRequired": "1.5 – 2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Built in the early 1950s for hydroelectric power generation and water conservation across the Idukki district.",
          "architecturalStyle": "Solid Concrete Gravity Dam Engineering",
          "architectureHighlights": [
            "High concrete retaining wall framing panoramic mountain lake reflections",
            "Speedboat and paddleboat rides with mountain mist rolling over the water",
            "Close proximity to the Indo-Swiss dairy farm breeding high-yield cattle"
          ],
          "legendsAndStories": [
            "The reservoir is a natural corridor for wild Asiatic elephants who frequently emerge from the dense forests at dusk."
          ],
          "bestPhotoSpots": [
            "Looking across the still blue reservoir water with rolling tea hills in the background"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": []
      }
    ],
    "stays": [
      {
        "id": "spice-tree-munnar",
        "name": "SpiceTree Munnar Luxury Retreat",
        "type": "resort_lakeside",
        "tier": "luxury",
        "rating": 4.9,
        "pricePerNight": 19000,
        "image": "/images/places/munnar-tea-hills.jpg",
        "amenities": [
          "Mountain Valley View Pool",
          "Ayurvedic Wellness Spa",
          "Tea Tasting Salon",
          "Organic Dining"
        ],
        "address": "Muttukad-Periakanal Road, Munnar, Kerala",
        "distanceToItineraryHighlights": [
          {
            "placeId": "munnar-tea-gardens",
            "placeName": "Tea Estates",
            "distanceKm": 8,
            "drivingTimeMin": 20
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "saravana-bhavan-munnar",
        "name": "Rapsy Restaurant Munnar",
        "cuisineType": "Traditional Kerala & Malabar",
        "type": "traditional_thali",
        "rating": 4.6,
        "priceForTwo": 450,
        "image": "/images/places/munnar-tea-hills.jpg",
        "mustTryDishes": [
          "Kerala Parotta with Beef Fry or Vegetable Stew",
          "Spanish Omelette",
          "Appam with Stew",
          "Cardamom Spiced Tea"
        ],
        "specialty": "Historic hill-station tavern famous for flaky Malabar parottas and freshly brewed mountain tea",
        "timings": "7:00 AM – 10:00 PM",
        "address": "Main Bazaar, Munnar Town, Kerala",
        "coordinates": {
          "lat": 10.088,
          "lng": 77.061
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "tea-factory-tasting",
        "title": "Tea Plucking & Master Factory Tasting Trail",
        "category": "craft",
        "categoryLabel": "Plantation Masterclass",
        "duration": "2.5 Hours",
        "price": 850,
        "image": "/images/places/munnar-tea-hills.jpg",
        "description": "Learn the two-leaves-and-a-bud plucking technique alongside skilled harvesters, followed by tea-sommelier grading session.",
        "highlights": [
          "Hands-on tea plucking in private gardens",
          "Factory leaf withering & CTC roll demonstration",
          "Tasting 6 single-estate reserve teas"
        ],
        "timing": "9:30 AM – 12:00 PM",
        "location": "KDHP Estate, Munnar",
        "rating": 4.9
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Emerald Peaks: Eravikulam Tahr Trek & Mist Tea Estates",
        "dateLabel": "Day 01",
        "totalDistanceKm": 25,
        "totalTravelTimeMin": 55,
        "totalDaySpend": 650,
        "stops": [
          {
            "id": "m-d1-1",
            "placeId": "eravikulam-park",
            "placeName": "Eravikulam National Park Safari",
            "category": "nature",
            "timeSlot": "8:00 AM – 11:30 AM",
            "durationMin": 210,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 200,
            "iconType": "Mountain",
            "notes": "Ascend by park bus to spot wild Nilgiri Tahr mountain goats.",
            "coordinates": {
              "lat": 10.1983,
              "lng": 77.0672
            }
          },
          {
            "id": "m-d1-2",
            "placeId": "munnar-tea-gardens",
            "placeName": "Munnar Tea Estates & Tea Museum Walk",
            "category": "nature",
            "timeSlot": "2:30 PM – 5:30 PM",
            "durationMin": 180,
            "travelFromPrevMin": 25,
            "distanceFromPrevKm": 12,
            "estimatedCost": 50,
            "iconType": "Trees",
            "notes": "Walk between tea bushes and witness sunset over the valley.",
            "coordinates": {
              "lat": 10.0889,
              "lng": 77.0595
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/munnar-tea-hills.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 10.0889,
      "lng": 77.0595
    }
  },
  "rishikesh": {
    "id": "rishikesh",
    "slug": "rishikesh",
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "tagline": "Yoga Capital of the World · Sacred Ganga · Rapids & Suspension Bridges",
    "shortBio": "Nestled in the Himalayan foothills where the holy River Ganga emerges from deep mountain gorges into the plains. Globally celebrated as the spiritual yoga capital, home to divine evening aartis at Triveni Ghat, suspension bridges, Beatles Ashram, and thrilling white-water rapids.",
    "heroBanner": "/images/places/triveni-ghat.jpg",
    "heroGallery": [
      "/images/places/triveni-ghat.jpg",
      "/images/places/parmarth-niketan.jpg",
      "/images/places/ram-jhula.jpg",
      "/images/places/laxman-jhula.jpg"
    ],
    "bestSeason": "September – June",
    "recommendedDays": "3–4 Days",
    "approxBudgetPerDay": {
      "budget": 1400,
      "comfort": 3800,
      "luxury": 15000
    },
    "weather": {
      "tempC": 24,
      "condition": "Crisp Mountain Breeze & Clear Rivers",
      "humidity": "42%"
    },
    "tourismStatus": {
      "safetyScore": "4.8 / 5.0 (High Tourist Safety & Pilgrim Support)",
      "crowdLevel": "Moderate",
      "peakHours": "5:30 PM – 7:30 PM (Evening Ganga Aarti)"
    },
    "curatedForStyles": [
      {
        "styleId": "holy-ghats-aarti",
        "styleTitle": "Holy Ghats & Spiritual Ashrams",
        "description": "Sunset Ganga Aarti chanting, sacred dips, riverside meditation, and legendary ashrams.",
        "recommendedPlaceIds": [
          "triveni-ghat",
          "parmarth-niketan",
          "ram-jhula",
          "beatles-ashram"
        ]
      },
      {
        "styleId": "rapids-adventure",
        "styleTitle": "Rapids & Mountain Waterfalls",
        "description": "Grade III and IV white-water rapids, suspension bridges, and emerald jungle cascades.",
        "recommendedPlaceIds": [
          "neer-garh-waterfall",
          "laxman-jhula",
          "ram-jhula",
          "triveni-ghat"
        ]
      }
    ],
    "places": [
      {
        "id": "triveni-ghat",
        "name": "Triveni Ghat Maha Aarti",
        "hindiName": "त्रिवेणी घाट महाआरती",
        "tagline": "Sacred Confluence of Ganga, Yamuna & Saraswati with Hypnotic Lamp Aarti",
        "category": "temple",
        "categoryLabel": "Sacred Riverside Ghat",
        "rating": 4.9,
        "reviewCount": 31000,
        "images": [
          "/images/places/triveni-ghat.jpg"
        ],
        "description": "The largest and most sacred ghat in Rishikesh, situated at the mystical confluence of the Ganga, Yamuna, and subterranean Saraswati. Every evening at dusk, priests perform the grand Maha Aarti with multi-tiered brass oil lamps, conch blowing, and thousands of floating leaf diyas.",
        "coordinates": {
          "lat": 30.1039,
          "lng": 78.2942
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours; Evening Aarti 6:00 PM – 7:30 PM",
        "bestTimeToVisit": "5:30 PM to secure prime steps facing the evening aarti priests",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Believed to be the sacred site where Lord Krishna was cremated after his earthly departure, mentioned extensively in the Puranas.",
          "architecturalStyle": "Stepped Himalayan Stone Ghat & Aarti Pavilion",
          "architectureHighlights": [
            "Broad granite ghat steps descending directly into the clear, swift current of Mother Ganga",
            "Colossal statue of Lord Shiva sitting in meditation above the river waters",
            "Grand brass tiered lamps lifted rhythmically during Vedic bhajan chanting"
          ],
          "legendsAndStories": [
            "Taking a holy dip at Triveni Ghat is believed to wash away the sins of a lifetime and bring spiritual liberation (Moksha)."
          ],
          "bestPhotoSpots": [
            "Ghat steps looking at the brass flame circles reflected on the rushing river water",
            "Thousands of marigold and flame leaf diyas floating downstream in twilight"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": [
          {
            "id": "ram-jhula",
            "name": "Ram Jhula Suspension Bridge",
            "category": "attraction",
            "distanceKm": 2.8,
            "travelTimeMin": 12
          },
          {
            "id": "parmarth-niketan",
            "name": "Parmarth Niketan",
            "category": "attraction",
            "distanceKm": 3.2,
            "travelTimeMin": 14
          }
        ]
      },
      {
        "id": "parmarth-niketan",
        "name": "Parmarth Niketan Ashram & Ghat",
        "hindiName": "परमार्थ निकेतन आश्रम",
        "tagline": "World-Renowned Yoga Sanctuary & Evening Riverfront Ganga Aarti",
        "category": "temple",
        "categoryLabel": "Spiritual Ashram & Yoga Center",
        "rating": 4.9,
        "reviewCount": 29000,
        "images": [
          "/images/places/parmarth-niketan.jpg",
          "/images/places/ram-jhula.jpg"
        ],
        "description": "The largest ashram in Rishikesh with over 1,000 residential rooms, tranquil gardens, and holy riverfront steps. Renowned globally for its serene sunset Ganga Aarti led by ashram rishikumars, uplifting devotional music, and the iconic white statue of Lord Shiva seated on the Ganges.",
        "coordinates": {
          "lat": 30.1198,
          "lng": 78.3129
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "6:00 AM – 9:00 PM (Aarti begins at sunset around 5:45 PM)",
        "bestTimeToVisit": "5:00 PM – 7:15 PM for ashram garden stroll followed by the Ganga Aarti",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Founded in 1942 by Pujya Swami Shukdevanandji Maharaj, hosts the annual International Yoga Festival every March.",
          "architecturalStyle": "Traditional Himalayan Ashram Courtyard Architecture",
          "architectureHighlights": [
            "Monolithic white marble statue of Lord Shiva sitting in meditation above the Ganges waves",
            "Expansive riverfront ghat facing the setting sun over the forested mountain ridge",
            "Spiritual gardens filled with life-sized statues of Hindu deities and meditation alcoves"
          ],
          "legendsAndStories": [
            "The sacred havan fire at Parmarth Niketan has burned continuously for decades, fed by herbal samagri and prayers for world peace."
          ],
          "bestPhotoSpots": [
            "Lord Shiva statue surrounded by the river at golden hour",
            "Rishikumars in saffron robes blowing conch shells against the river backdrop"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "ram-jhula",
            "name": "Ram Jhula",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 5
          },
          {
            "id": "beatles-ashram",
            "name": "The Beatles Ashram",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 10
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "triveni-ghat",
            "name": "Triveni Ghat",
            "category": "attraction",
            "distanceKm": 3.2,
            "travelTimeMin": 14
          }
        ]
      },
      {
        "id": "ram-jhula",
        "name": "Ram Jhula & Swarg Ashram",
        "hindiName": "राम झूला एवं स्वर्गाश्रम",
        "tagline": "750-Foot Iron Bridge Connecting World-Famous Yoga Ashrams",
        "category": "temple",
        "categoryLabel": "Spiritual River Bridge & Ashrams",
        "rating": 4.8,
        "reviewCount": 26500,
        "images": [
          "/images/places/ram-jhula.jpg"
        ],
        "description": "A 750-foot iron suspension bridge spanning the Ganges at Muni Ki Reti, connecting Sivananda Ashram on the west bank with Swarg Ashram, Parmarth Niketan, and the spiritual heartland of Rishikesh.",
        "coordinates": {
          "lat": 30.1226,
          "lng": 78.3142
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Open 24 Hours",
        "bestTimeToVisit": "Sunrise when sadhus and yogis walk across the bridge with morning mist",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Constructed in 1986 with assistance from the Shivananda Ashram, significantly wider and longer than Laxman Jhula.",
          "architecturalStyle": "Modern Heavy-Duty Iron Suspension Bridge",
          "architectureHighlights": [
            "Vibrant pedestrian crossing with temple bells, sadhus, and panoramic mountain views",
            "Direct access to Parmarth Niketan’s monumental Ganga Aarti ghat",
            "Lined with traditional Ayurvedic pharmacies, yoga gear bookshops, and sweet stalls"
          ],
          "legendsAndStories": [
            "The Swarg Ashram area behind the bridge is considered one of the holiest places on earth for silent Vedic meditation."
          ],
          "bestPhotoSpots": [
            "Midway on the bridge looking north up the Ganges gorge toward the high Himalayas"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "parmarth-niketan",
            "name": "Parmarth Niketan",
            "category": "attraction",
            "distanceKm": 0.4,
            "travelTimeMin": 5
          },
          {
            "id": "beatles-ashram",
            "name": "The Beatles Ashram",
            "category": "attraction",
            "distanceKm": 1.2,
            "travelTimeMin": 12
          },
          {
            "id": "laxman-jhula",
            "name": "Laxman Jhula",
            "category": "attraction",
            "distanceKm": 1.8,
            "travelTimeMin": 8
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "triveni-ghat",
            "name": "Triveni Ghat",
            "category": "attraction",
            "distanceKm": 2.8,
            "travelTimeMin": 12
          }
        ]
      },
      {
        "id": "laxman-jhula",
        "name": "Laxman Jhula Historic Suspension Bridge",
        "hindiName": "लक्ष्मण झूला",
        "tagline": "Iconic 450-Foot Iron Suspension Bridge over the Emerald Ganges",
        "category": "heritage",
        "categoryLabel": "Historic Suspension Bridge",
        "rating": 4.8,
        "reviewCount": 32500,
        "images": [
          "/images/places/laxman-jhula.jpg"
        ],
        "description": "A historic 450-foot-long iron suspension bridge erected in 1929, linking the districts of Tehri Garhwal and Pauri Garhwal across the roaring emerald waters of the Ganges. Surrounded by vibrant rooftop cafes, yoga ateliers, and the 13-tier Trimbakeshwar Temple.",
        "coordinates": {
          "lat": 30.1298,
          "lng": 78.3267
        },
        "entryFee": {
          "indian": 0,
          "foreign": 0
        },
        "timings": "Viewable from riverfront promenades and nearby glass skywalk",
        "bestTimeToVisit": "Early morning or golden hour sunset",
        "timeRequired": "1 Hour",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Built to replace an earlier jute rope bridge where Lord Rama’s younger brother Lakshmana is believed to have crossed the Ganges.",
          "architecturalStyle": "Colonial Himalayan Wire Rope Suspension Engineering",
          "architectureHighlights": [
            "Iron suspension cables anchored directly into solid bedrock on either river bank",
            "Framed by the 13-storey multi-tiered Trimbakeshwar (Tera Manzil) Temple",
            "Panoramic views of white water rafts navigating the bridge eddies below"
          ],
          "legendsAndStories": [
            "According to Hindu legend, Lakshmana crossed the Ganges on two simple jute ropes right at this precipice."
          ],
          "bestPhotoSpots": [
            "From the east riverbank cafe terraces framing the bridge with the 13-storey temple"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "ram-jhula",
            "name": "Ram Jhula Suspension Bridge",
            "category": "attraction",
            "distanceKm": 1.8,
            "travelTimeMin": 8
          },
          {
            "id": "neer-garh-waterfall",
            "name": "Neer Garh Waterfall",
            "category": "attraction",
            "distanceKm": 4,
            "travelTimeMin": 15
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "triveni-ghat",
            "name": "Triveni Ghat",
            "category": "attraction",
            "distanceKm": 4.5,
            "travelTimeMin": 15
          }
        ]
      },
      {
        "id": "beatles-ashram",
        "name": "The Beatles Ashram (Chaurasi Kutia)",
        "hindiName": "द बीटल्स आश्रम (चौरासी कुटिया)",
        "tagline": "84 Meditation Domes in Rajaji Forest Where The Beatles Composed The White Album",
        "category": "heritage",
        "categoryLabel": "Legendary Music & Heritage Site",
        "rating": 4.7,
        "reviewCount": 18400,
        "images": [
          "/images/places/ram-jhula.jpg",
          "/images/places/triveni-ghat.jpg"
        ],
        "description": "Formerly the international Academy of Meditation established by Maharishi Mahesh Yogi in the 1960s. In February 1968, English rock group The Beatles stayed here for transcendental meditation, writing nearly 48 songs including most of \"The White Album\". Now an eco-heritage site featuring 84 stone meditation huts and psychedelic graffiti murals.",
        "coordinates": {
          "lat": 30.1142,
          "lng": 78.3115
        },
        "entryFee": {
          "indian": 150,
          "foreign": 600
        },
        "timings": "9:00 AM – 4:30 PM (Daily)",
        "bestTimeToVisit": "10:00 AM – 1:30 PM (Peaceful nature walk through the forested domes and graffiti hall)",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "The Beatles arrived here in 1968 accompanied by Mia Farrow, Donovan, and Mike Love, putting Rishikesh on the international cultural map.",
          "architecturalStyle": "Organic Himalayan River-Pebble Igloo Domes",
          "architectureHighlights": [
            "84 pebble-clad meditation caves (Chaurasi Kutia) designed for deep sensory isolation",
            "Beatles Cathedral Hall covered in stunning portraits and album lyrics painted by global artists",
            "Perched high above the Ganges cliffs amidst the sal trees of Rajaji Tiger Reserve"
          ],
          "legendsAndStories": [
            "John Lennon and Paul McCartney sat on the roof of their bungalows looking at the river and wrote iconic tracks like \"Blackbird\", \"Dear Prudence\", and \"Mother Nature's Son\"."
          ],
          "bestPhotoSpots": [
            "Inside the Beatles Cathedral hall against the giant black-and-white mural of John Lennon and George Harrison",
            "Stone spiral staircases leading up to the meditation igloos"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "parmarth-niketan",
            "name": "Parmarth Niketan",
            "category": "attraction",
            "distanceKm": 0.9,
            "travelTimeMin": 10
          },
          {
            "id": "ram-jhula",
            "name": "Ram Jhula",
            "category": "attraction",
            "distanceKm": 1.2,
            "travelTimeMin": 12
          }
        ],
        "nearbyWithin5Km": []
      },
      {
        "id": "neer-garh-waterfall",
        "name": "Neer Garh Waterfall (Neer Gaddu)",
        "hindiName": "नीर गढ़ जलप्रपात",
        "tagline": "Multi-Tiered Emerald Limestone Waterfall Hidden in the Himalayan Forest",
        "category": "nature",
        "categoryLabel": "Natural Mountain Cascade",
        "rating": 4.6,
        "reviewCount": 16500,
        "images": [
          "/images/places/laxman-jhula.jpg"
        ],
        "description": "A pristine sequence of three turquoise freshwater cascades tumbling down limestone ravines into natural plunge pools 5 km north of Laxman Jhula. Famous for cool natural spring baths, rustic wooden footbridges, and gentle hiking trails bordered by wild butterflies.",
        "coordinates": {
          "lat": 30.1465,
          "lng": 78.3412
        },
        "entryFee": {
          "indian": 30,
          "foreign": 50
        },
        "timings": "8:00 AM – 5:30 PM (Daily)",
        "bestTimeToVisit": "9:00 AM – 12:00 PM for clear water swimming before afternoon warmth",
        "timeRequired": "2 – 2.5 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Natural mountain stream flowing down from the Garhwal Himalayas into the Ganges river valley.",
          "architecturalStyle": "Natural Tiered Limestone Cataract & Forest Trail",
          "architectureHighlights": [
            "Three distinct falling stages with shallow clear pools safe for swimming",
            "Natural canopy of oak, pine, and mountain rhododendron trees",
            "Rustic chai shacks along the forest path serving fresh Maggi and ginger lemon tea"
          ],
          "legendsAndStories": [
            "Locals believe the mineral-rich waters have natural rejuvenation properties due to Himalayan medicinal herbs growing along the mountain spring."
          ],
          "bestPhotoSpots": [
            "Second tier waterfall pool where turquoise water cascades over mossy rocks"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [],
        "nearbyWithin5Km": [
          {
            "id": "laxman-jhula",
            "name": "Laxman Jhula",
            "category": "attraction",
            "distanceKm": 4.2,
            "travelTimeMin": 15
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "gostops-rishikesh",
        "name": "goSTOPS Rishikesh (Backpacker Haven)",
        "type": "budget_homestay",
        "tier": "budget",
        "rating": 4.6,
        "pricePerNight": 950,
        "image": "/images/places/ram-jhula.jpg",
        "amenities": [
          "Dorm & Private Rooms",
          "Rooftop River View Common Area",
          "Free High-Speed Wi-Fi",
          "Cafe & Board Games"
        ],
        "address": "Near Laxman Jhula, Tapovan, Rishikesh",
        "distanceToItineraryHighlights": [
          {
            "placeId": "laxman-jhula",
            "placeName": "Laxman Jhula",
            "distanceKm": 0.6,
            "drivingTimeMin": 3
          },
          {
            "placeId": "ram-jhula",
            "placeName": "Ram Jhula",
            "distanceKm": 2,
            "drivingTimeMin": 8
          }
        ]
      },
      {
        "id": "aloha-on-the-ganges",
        "name": "Aloha on the Ganges Resort",
        "type": "boutique_haveli",
        "tier": "comfort",
        "rating": 4.8,
        "pricePerNight": 5800,
        "image": "/images/places/laxman-jhula.jpg",
        "amenities": [
          "Cliff-Edge River Infinity Pool",
          "Ganga View Spa",
          "Ayurvedic Wellness Center",
          "Multi-Cuisine Dining"
        ],
        "address": "National Highway 58, Tapovan, Rishikesh",
        "distanceToItineraryHighlights": [
          {
            "placeId": "laxman-jhula",
            "placeName": "Laxman Jhula",
            "distanceKm": 1.2,
            "drivingTimeMin": 5
          },
          {
            "placeId": "ram-jhula",
            "placeName": "Ram Jhula",
            "distanceKm": 2.5,
            "drivingTimeMin": 10
          }
        ]
      },
      {
        "id": "ananda-in-the-himalayas",
        "name": "Ananda in the Himalayas",
        "type": "luxury_palace",
        "tier": "luxury",
        "rating": 5,
        "pricePerNight": 38000,
        "image": "/images/places/triveni-ghat.jpg",
        "amenities": [
          "100-Acre Maharaja Palace Estate",
          "World-Class Ayurvedic Spa",
          "Ganga View Yoga Pavilions",
          "Organic Gourmet Dining"
        ],
        "address": "The Palace Estate, Narendra Nagar, Tehri Garhwal, Uttarakhand",
        "distanceToItineraryHighlights": [
          {
            "placeId": "ram-jhula",
            "placeName": "Ram Jhula",
            "distanceKm": 14,
            "drivingTimeMin": 30
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "chotiwala-rishikesh",
        "name": "Chotiwala Restaurant Swarg Ashram",
        "cuisineType": "Traditional Garhwali, North Indian & Thali",
        "type": "traditional_thali",
        "rating": 4.7,
        "priceForTwo": 500,
        "image": "/images/places/ram-jhula.jpg",
        "mustTryDishes": [
          "Chotiwala Special Pure Ghee Thali",
          "Garhwali Koda Roti with Gahat Dal",
          "Fresh Hot Jalebi with Rabdi",
          "Thandai Lassi"
        ],
        "specialty": "Historic 1958 vegetarian institution where the painted mascot sits elevated outside greeting diners",
        "timings": "7:30 AM – 10:30 PM",
        "address": "Swargashram, Near Ram Jhula, Rishikesh",
        "coordinates": {
          "lat": 30.123,
          "lng": 78.315
        },
        "isVeg": true
      },
      {
        "id": "the-beatles-cafe-60s",
        "name": "The 60’s Beatles Cafe Tapovan",
        "cuisineType": "Healthy Vegan, Italian & Mountain Bakery",
        "type": "cafe",
        "rating": 4.8,
        "priceForTwo": 750,
        "image": "/images/places/laxman-jhula.jpg",
        "mustTryDishes": [
          "Vegan Pesto Gnocchi",
          "Raw Avocado Cacao Shake",
          "Woodfired Thin Crust Pizza",
          "Himalayan Herbal Teas"
        ],
        "specialty": "Vintage vinyl records, retro Beatles album memorabilia, and panoramic Ganges gorge views",
        "timings": "10:00 AM – 10:00 PM",
        "address": "Paonta Road, Tapovan, Rishikesh",
        "coordinates": {
          "lat": 30.133,
          "lng": 78.324
        },
        "isVeg": true
      },
      {
        "id": "german-bakery-laxman-jhula",
        "name": "Sitting by the Ganges German Bakery",
        "cuisineType": "Continental Breakfast, Pastries & Tibetan",
        "type": "cafe",
        "rating": 4.6,
        "priceForTwo": 450,
        "image": "/images/places/triveni-ghat.jpg",
        "mustTryDishes": [
          "Warm Cinnamon Apple Strudel",
          "Shakshuka with Fresh Focaccia",
          "Tibetan Veg Momos",
          "Ginger Lemon Honey Tea"
        ],
        "specialty": "Riverside open balcony where you can watch white-water rafts float by over morning coffee",
        "timings": "7:30 AM – 10:00 PM",
        "address": "Near Laxman Jhula Bridge, Tapovan, Rishikesh",
        "coordinates": {
          "lat": 30.13,
          "lng": 78.327
        },
        "isVeg": true
      }
    ],
    "experiences": [
      {
        "id": "shivpuri-white-water-rafting",
        "title": "Shivpuri Grade IV White Water River Rafting",
        "category": "adventure",
        "categoryLabel": "Ganges River Adventure",
        "duration": "3.5 Hours",
        "price": 1200,
        "image": "/images/places/laxman-jhula.jpg",
        "description": "Navigate 16 kilometers of heart-pumping white water rapids including Roller Coaster, Golf Course, and Club House on the holy Ganges.",
        "highlights": [
          "16-km river expedition",
          "Cliff jumping from 25-foot boulder into calm pool",
          "Certified river guides & imported self-bailing rafts"
        ],
        "timing": "9:00 AM – 1:00 PM or 1:30 PM – 5:30 PM",
        "location": "Shivpuri River Beach Camp",
        "rating": 4.9
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Day 01: Sacred Bridges & Evening Triveni Maha Aarti",
        "dateLabel": "Day 01",
        "totalDistanceKm": 7.2,
        "totalTravelTimeMin": 35,
        "totalDaySpend": 350,
        "stops": [
          {
            "id": "r-d1-1",
            "placeId": "ram-jhula",
            "placeName": "Ram Jhula & Swarg Ashram Morning Walk",
            "category": "temple",
            "timeSlot": "8:30 AM – 10:30 AM",
            "durationMin": 120,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 0,
            "iconType": "Compass",
            "notes": "Walk across the suspension bridge and explore ashram garden trails.",
            "coordinates": {
              "lat": 30.1226,
              "lng": 78.3142
            }
          },
          {
            "id": "r-d1-2",
            "placeId": "triveni-ghat",
            "placeName": "Triveni Ghat Evening Maha Aarti",
            "category": "temple",
            "timeSlot": "5:30 PM – 7:30 PM",
            "durationMin": 120,
            "travelFromPrevMin": 15,
            "distanceFromPrevKm": 2.8,
            "estimatedCost": 0,
            "iconType": "Sparkles",
            "notes": "Witness the multi-tiered brass lamp aarti with Vedic chanting.",
            "coordinates": {
              "lat": 30.1039,
              "lng": 78.2942
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Day 02: Beatles Heritage & Sunset at Parmarth Niketan",
        "dateLabel": "Day 02",
        "totalDistanceKm": 5.4,
        "totalTravelTimeMin": 25,
        "totalDaySpend": 450,
        "stops": [
          {
            "id": "r-d2-1",
            "placeId": "beatles-ashram",
            "placeName": "The Beatles Ashram (Chaurasi Kutia)",
            "category": "heritage",
            "timeSlot": "9:30 AM – 11:30 AM",
            "durationMin": 120,
            "travelFromPrevMin": 10,
            "distanceFromPrevKm": 1.2,
            "estimatedCost": 150,
            "iconType": "Sparkles",
            "notes": "84 stone meditation domes and graffiti cathedral in Rajaji Forest.",
            "coordinates": {
              "lat": 30.1142,
              "lng": 78.3115
            }
          },
          {
            "id": "r-d2-2",
            "placeId": "parmarth-niketan",
            "placeName": "Parmarth Niketan Ashram & Sunset Aarti",
            "category": "temple",
            "timeSlot": "4:45 PM – 7:00 PM",
            "durationMin": 135,
            "travelFromPrevMin": 8,
            "distanceFromPrevKm": 0.9,
            "estimatedCost": 0,
            "iconType": "Sparkles",
            "notes": "Himalayan sunset aarti and Lord Shiva statue on the water.",
            "coordinates": {
              "lat": 30.1198,
              "lng": 78.3129
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/triveni-ghat.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 30.1039,
      "lng": 78.2942
    }
  },
  "shillong": {
    "id": "shillong",
    "slug": "shillong",
    "name": "Shillong",
    "state": "Meghalaya",
    "tagline": "Scotland of the East · Living Root Bridges · Cloud Treks & Waterfalls",
    "shortBio": "Nestled in the lush East Khasi Hills of Meghalaya, Shillong is famed for its rolling pine-clad peaks, bio-engineered living root bridges grown across raging rivers, thunderous waterfalls, crystal-clear mountain streams, and vibrant indie rock music culture.",
    "heroBanner": "/images/places/living-root-bridge.jpg",
    "heroGallery": [
      "/images/places/living-root-bridge.jpg",
      "/images/places/nohkalikai-falls.jpg",
      "/images/places/umiam-lake.jpg",
      "/images/places/elephant-falls.jpg"
    ],
    "bestSeason": "September – May",
    "recommendedDays": "4–5 Days",
    "approxBudgetPerDay": {
      "budget": 1800,
      "comfort": 4200,
      "luxury": 14000
    },
    "weather": {
      "tempC": 19,
      "condition": "Misty & Refreshing",
      "humidity": "68%"
    },
    "tourismStatus": {
      "safetyScore": "4.9 / 5.0 (Exceptional Tourist Safety & Warm Hospitality)",
      "crowdLevel": "Low",
      "peakHours": "11:00 AM – 3:30 PM (Waterfall trails)"
    },
    "curatedForStyles": [
      {
        "styleId": "bridges",
        "styleTitle": "Living Root Bridges & Waterfalls",
        "description": "Centuries-old bio-engineered Ficus elastica bridges, thunderous Nohkalikai cascade, and rainforest river pools.",
        "recommendedPlaceIds": [
          "living-root-bridge",
          "nohkalikai-falls",
          "elephant-falls",
          "umiam-lake",
          "mawlynnong"
        ]
      },
      {
        "styleId": "lakes",
        "styleTitle": "Pine Hills & Crystal Waters",
        "description": "Serene boating on Umiam Barapani Lake, pine forest trails, and panoramic East Khasi plateau viewpoints.",
        "recommendedPlaceIds": [
          "umiam-lake",
          "elephant-falls",
          "living-root-bridge"
        ]
      }
    ],
    "places": [
      {
        "id": "living-root-bridge",
        "name": "Double Decker Living Root Bridge",
        "hindiName": "डबल डेकर लिविंग रूट ब्रिज, नोंग्रियाट",
        "tagline": "UNESCO-nominated bio-engineering marvel grown from living rubber fig tree roots",
        "category": "nature",
        "categoryLabel": "UNESCO Botanical Wonder",
        "rating": 4.9,
        "reviewCount": 28400,
        "images": [
          "/images/places/living-root-bridge.jpg",
          "/images/places/nohkalikai-falls.jpg"
        ],
        "description": "Located in Nongriat village near Cherrapunji, this extraordinary two-tier bridge was hand-guided across the Umshiang river by indigenous Khasi villagers using the living aerial roots of Ficus elastica trees. Unlike timber or steel, this living bridge grows stronger over time and has endured for over 250 years.",
        "coordinates": {
          "lat": 25.2464,
          "lng": 91.6705
        },
        "entryFee": {
          "indian": 50,
          "foreign": 100
        },
        "timings": "6:00 AM – 5:00 PM (Requires a descent of ~3,500 stone steps into the tropical valley)",
        "bestTimeToVisit": "Early morning (Start descending from Tyrna village by 7:00 AM to beat the afternoon heat)",
        "timeRequired": "5 – 7 Hours (Full Trek)",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Created by the indigenous Khasi and Jaintia tribes who realized wooden bridges rotted quickly in Cherrapunji’s relentless monsoon rains. By training aerial roots through hollowed betel nut trunks, they created self-strengthening suspension structures.",
          "architecturalStyle": "Indigenous Khasi Bio-Engineering (Living Architecture)",
          "architectureHighlights": [
            "Two stacked living bridges crossing the turquoise river canyon at different heights",
            "Root network capable of carrying 50+ people simultaneously without nails, steel, or concrete",
            "Crystal turquoise river pool beneath the bridge filled with natural spa fish"
          ],
          "legendsAndStories": [
            "Khasi elders explain that the second upper tier was grown when extreme historic monsoon floods reached the height of the original lower bridge."
          ],
          "bestPhotoSpots": [
            "Stepped rock platform beside the lower bridge looking up through both tiers",
            "Natural blue lagoon beneath the roots"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "rainbow-falls",
            "name": "Rainbow Falls",
            "category": "experience",
            "distanceKm": 1.8,
            "travelTimeMin": 45
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "nohkalikai-falls",
            "name": "Nohkalikai Falls",
            "category": "attraction",
            "distanceKm": 12,
            "travelTimeMin": 40
          }
        ]
      },
      {
        "id": "nohkalikai-falls",
        "name": "Nohkalikai Falls",
        "hindiName": "नोहकलिकाई जलप्रपात, चेरापूंजी",
        "tagline": "India’s tallest plunge waterfall cascading 1,115 feet into an emerald-green pool",
        "category": "waterfall",
        "categoryLabel": "Tallest Plunge Waterfall",
        "rating": 4.8,
        "reviewCount": 39800,
        "images": [
          "/images/places/nohkalikai-falls.jpg",
          "/images/places/living-root-bridge.jpg"
        ],
        "description": "Dropping an astounding 1,115 feet (340 meters) from a dramatic rainforest plateau near Cherrapunji, Nohkalikai is the fourth-highest waterfall in the world. Fed entirely by the torrential rains of the Meghalaya highlands, it carves into a vivid emerald-turquoise plunge pool.",
        "coordinates": {
          "lat": 25.2755,
          "lng": 91.6845
        },
        "entryFee": {
          "indian": 50,
          "foreign": 100,
          "camera": 30
        },
        "timings": "8:00 AM – 5:30 PM (Daily)",
        "bestTimeToVisit": "10:00 AM – 1:00 PM (Clear sunlight reveals the vibrant turquoise pool before afternoon fog rolls in)",
        "timeRequired": "1.5 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "In the Khasi language, \"Noh Ka Likai\" translates to \"Jump of Ka Likai\", commemorating the tragic folk legend of a grief-stricken Khasi mother.",
          "architecturalStyle": "High-Altitude Limestone Plunge Gorge",
          "architectureHighlights": [
            "Unbroken 340-meter vertical water sheer drop",
            "Vivid emerald plunge pool colored by concentrated minerals and algae in mountain bedrock",
            "Panoramic edge viewpoints overlooking the southern plains of Bangladesh in the distance"
          ],
          "legendsAndStories": [
            "Ka Likai jumped from the cliff after discovering that her jealous second husband had harmed her infant daughter. Today, her spirit is believed to guard the sacred falls."
          ],
          "bestPhotoSpots": [
            "Upper cliff viewing pavilion framing the entire vertical plunge",
            "Lower stepped path during rainbow mist hours"
          ],
          "audioGuideAvailable": true
        },
        "nearbyWithin1Km": [
          {
            "id": "sohra-market",
            "name": "Sohra Tribal Spice Market",
            "category": "experience",
            "distanceKm": 2.5,
            "travelTimeMin": 10
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "living-root-bridge",
            "name": "Living Root Bridge",
            "category": "attraction",
            "distanceKm": 8.5,
            "travelTimeMin": 30
          }
        ]
      },
      {
        "id": "umiam-lake",
        "name": "Umiam Lake (Barapani)",
        "hindiName": "उमियम झील, शिलांग",
        "tagline": "Expansive azure lake 15 km north of Shillong encircled by whispering pine forests",
        "category": "lake",
        "categoryLabel": "Lakeside & Water Sports",
        "rating": 4.7,
        "reviewCount": 32100,
        "images": [
          "/images/places/umiam-lake.jpg",
          "/images/places/elephant-falls.jpg"
        ],
        "description": "Created in the early 1960s by damming the Umiam River, this tranquil 220-square-kilometer reservoir resembles the lakes of Scotland and Switzerland. It offers speedboat rides, kayaking, luxury island camping, and serene pine forest walking trails.",
        "coordinates": {
          "lat": 25.6667,
          "lng": 91.9
        },
        "entryFee": {
          "indian": 30,
          "foreign": 50
        },
        "timings": "Open 24 Hours (Water Sports: 9:00 AM – 5:00 PM)",
        "bestTimeToVisit": "4:00 PM (Late afternoon golden hour as sun dips behind pine hills)",
        "timeRequired": "2 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Constructed for hydroelectric power, Umiam quickly became Meghalaya’s premier ecological leisure destination and migratory bird wintering haven.",
          "architecturalStyle": "Natural Mountain Catchment Basin with Pine Forest Peninsulas",
          "architectureHighlights": [
            "Water sports complex offering speedboats, water scooters, and pedal cruises",
            "Lumpongdeng island camp accessible only by wooden rowboat"
          ],
          "legendsAndStories": [
            "Khasi legend tells of two sisters who descended from heaven; one was lost on the journey, and the grief-stricken tears of the surviving sister formed this massive lake."
          ],
          "bestPhotoSpots": [
            "Panoramic viewpoint from the Guwahati-Shillong highway ridge",
            "Wooden boat jetty at sunset"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "ri-kynjai-resort",
            "name": "Ri Kynjai Khasi Heritage Resort",
            "category": "stay",
            "distanceKm": 1.2,
            "travelTimeMin": 5
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "shillong-peak",
            "name": "Shillong Peak Viewpoint",
            "category": "attraction",
            "distanceKm": 18,
            "travelTimeMin": 40
          }
        ]
      },
      {
        "id": "elephant-falls",
        "name": "Elephant Falls",
        "hindiName": "एलीफेंट फॉल्स, शिलांग",
        "tagline": "Famous three-tiered cascade nestled in fern-covered mountain ravines",
        "category": "waterfall",
        "categoryLabel": "Three-Tier Mountain Cascade",
        "rating": 4.6,
        "reviewCount": 27500,
        "images": [
          "/images/places/elephant-falls.jpg",
          "/images/places/umiam-lake.jpg"
        ],
        "description": "Located 12 km from Shillong city center, Elephant Falls is a magnificent three-step mountain waterfall. The British named it after a massive elephant-shaped rock near the falls that was later destroyed by the great 1897 Assam earthquake.",
        "coordinates": {
          "lat": 25.5367,
          "lng": 91.8258
        },
        "entryFee": {
          "indian": 30,
          "foreign": 50
        },
        "timings": "9:00 AM – 5:00 PM (Daily)",
        "bestTimeToVisit": "10:30 AM (Sunlight filters through dense ferns and pine canopies)",
        "timeRequired": "1 Hour",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "The Khasi people historically called it \"Ka Kshaid Lai Pateng Khohsiew\", which means \"The Three-Step Waterfall\".",
          "architecturalStyle": "Stepped Natural Stone Ravine",
          "architectureHighlights": [
            "Well-maintained railed stone steps allowing travelers to view each of the three distinct tiers up close",
            "Third tier: Broad, foaming curtain crashing into clear shallow mountain pools"
          ],
          "legendsAndStories": [
            "Local Khasi lore venerated the roaring spray as the laughter of mountain spirits residing in the upper Khasi ridges."
          ],
          "bestPhotoSpots": [
            "Base platform facing the third tier waterfall spray"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "mattilang-park",
            "name": "Mattilang Amusement Park",
            "category": "experience",
            "distanceKm": 0.8,
            "travelTimeMin": 5
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "shillong-peak",
            "name": "Shillong Peak",
            "category": "attraction",
            "distanceKm": 5.2,
            "travelTimeMin": 15
          }
        ]
      },
      {
        "id": "mawlynnong",
        "name": "Mawlynnong Village",
        "hindiName": "मावल्यान्नॉन्ग (एशिया का सबसे स्वच्छ गाँव)",
        "tagline": "Acclaimed as \"God’s Own Garden\" and Asia’s Cleanest Village",
        "category": "heritage",
        "categoryLabel": "Asia's Cleanest Eco-Village",
        "rating": 4.8,
        "reviewCount": 24100,
        "images": [
          "/images/places/mawlynnong.jpg",
          "/images/places/living-root-bridge.jpg"
        ],
        "description": "Awarded the title of \"Cleanest Village in Asia\" by Discover India in 2003, Mawlynnong is a 100% literate, matriarchal Khasi community where every street is spotless. Houses feature conical bamboo dustbins, vibrant flowering orchids, and traditional tree-top sky walks.",
        "coordinates": {
          "lat": 25.2017,
          "lng": 91.8761
        },
        "entryFee": {
          "indian": 50,
          "foreign": 100
        },
        "timings": "8:00 AM – 6:00 PM (Daily)",
        "bestTimeToVisit": "11:00 AM (Leisurely stroll through paved village flower alleys)",
        "timeRequired": "2 – 3 Hours",
        "isAsiVerified": false,
        "journeyLens": {
          "history": "Community-driven cleanliness has been a voluntary village tradition for over a century, handed down from generation to generation.",
          "architecturalStyle": "Indigenous Vernacular Thatched & Stone Architecture",
          "architectureHighlights": [
            "Sky View 85-foot high bamboo tower overlooking the plains of Sylhet, Bangladesh",
            "Single-decker living root bridge in neighboring Riwai village just 10 minutes away",
            "Balanced Rock: A massive ancient boulder balancing precariously on a tiny stone base"
          ],
          "legendsAndStories": [
            "Children are taught from age three to sweep fallen leaves into bamboo cones, maintaining a completely plastic-free village ecosystem."
          ],
          "bestPhotoSpots": [
            "Village cobblestone pathway lined with hibiscus and orchids",
            "Bamboo Sky View tree canopy bridge"
          ],
          "audioGuideAvailable": false
        },
        "nearbyWithin1Km": [
          {
            "id": "riwai-root-bridge",
            "name": "Riwai Living Root Bridge",
            "category": "attraction",
            "distanceKm": 1.5,
            "travelTimeMin": 6
          }
        ],
        "nearbyWithin5Km": [
          {
            "id": "dawki-river",
            "name": "Dawki Umngot Transparent River",
            "category": "experience",
            "distanceKm": 19,
            "travelTimeMin": 45
          }
        ]
      }
    ],
    "stays": [
      {
        "id": "shillong-budget-central",
        "name": "Shillong Central Guest House",
        "type": "budget_homestay",
        "tier": "budget",
        "typeLabel": "Affordable Stay Near Police Bazaar",
        "rating": 4.3,
        "reviewsCount": 640,
        "image": "/images/places/elephant-falls.jpg",
        "pricePerNight": 1800,
        "coordinates": {
          "lat": 25.575,
          "lng": 91.894
        },
        "amenities": [
          "Breakfast Available",
          "Clean Private Rooms",
          "Local Transfers",
          "Free Wi-Fi"
        ],
        "address": "Laitumkhrah, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 16.5,
            "drivingTimeMin": 35
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 11.2,
            "drivingTimeMin": 28
          }
        ]
      },
      {
        "id": "shillong-laitumkhrah-lodge",
        "name": "Laitumkhrah Hillside Lodge",
        "type": "budget_homestay",
        "tier": "budget",
        "typeLabel": "Value Rooms Near Shillong Cafes",
        "rating": 4.4,
        "reviewsCount": 510,
        "image": "/images/places/living-root-bridge.jpg",
        "pricePerNight": 2200,
        "coordinates": {
          "lat": 25.566,
          "lng": 91.889
        },
        "amenities": [
          "Family Rooms",
          "Local Breakfast",
          "Taxi Desk",
          "Wi-Fi"
        ],
        "address": "Laitumkhrah Main Road, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 17.2,
            "drivingTimeMin": 37
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 10.7,
            "drivingTimeMin": 27
          }
        ]
      },
      {
        "id": "police-bazaar-backpackers",
        "name": "Police Bazaar Backpackers Stay",
        "type": "budget_homestay",
        "tier": "budget",
        "typeLabel": "Social Budget Stay in Central Shillong",
        "rating": 4.2,
        "reviewsCount": 380,
        "image": "/images/places/elephant-falls.jpg",
        "pricePerNight": 2600,
        "coordinates": {
          "lat": 25.578,
          "lng": 91.894
        },
        "amenities": [
          "Shared Kitchen",
          "Dorms & Private Rooms",
          "Luggage Storage",
          "Fast Wi-Fi"
        ],
        "address": "Police Bazaar, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 16.8,
            "drivingTimeMin": 36
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 12,
            "drivingTimeMin": 30
          }
        ]
      },
      {
        "id": "pinewood-shillong",
        "name": "Pinewood Shillong Retreat",
        "type": "boutique_heritage",
        "tier": "comfort",
        "typeLabel": "Comfort Heritage Stay in the Pine Hills",
        "rating": 4.6,
        "reviewsCount": 920,
        "image": "/images/places/living-root-bridge.jpg",
        "pricePerNight": 5200,
        "coordinates": {
          "lat": 25.568,
          "lng": 91.887
        },
        "amenities": [
          "Mountain View Rooms",
          "Regional Breakfast",
          "Garden Terrace",
          "Parking"
        ],
        "address": "Oakland Road, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 17.8,
            "drivingTimeMin": 38
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 10.1,
            "drivingTimeMin": 25
          }
        ]
      },
      {
        "id": "shillong-heritage-manor",
        "name": "Shillong Heritage Manor",
        "type": "boutique_heritage",
        "tier": "comfort",
        "typeLabel": "Boutique Comfort Stay Near Ward’s Lake",
        "rating": 4.7,
        "reviewsCount": 760,
        "image": "/images/places/living-root-bridge.jpg",
        "pricePerNight": 6800,
        "coordinates": {
          "lat": 25.574,
          "lng": 91.89
        },
        "amenities": [
          "Colonial Rooms",
          "Garden Dining",
          "Heated Rooms",
          "Guided Walks"
        ],
        "address": "Mawblei, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 18.4,
            "drivingTimeMin": 40
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 9.4,
            "drivingTimeMin": 24
          }
        ]
      },
      {
        "id": "cloud-view-shillong",
        "name": "Cloud View Mountain Hotel",
        "type": "resort_lakeside",
        "tier": "comfort",
        "typeLabel": "Scenic Mid-Range Stay on the Shillong Hills",
        "rating": 4.6,
        "reviewsCount": 610,
        "image": "/images/places/umiam-lake.jpg",
        "pricePerNight": 7800,
        "coordinates": {
          "lat": 25.596,
          "lng": 91.91
        },
        "amenities": [
          "Valley View Balcony",
          "Breakfast Buffet",
          "Bonfire Evenings",
          "Parking"
        ],
        "address": "Mawpat, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 19.1,
            "drivingTimeMin": 42
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 8.5,
            "drivingTimeMin": 22
          }
        ]
      },
      {
        "id": "ri-kynjai",
        "name": "Ri Kynjai - Serenity by the Lake",
        "type": "lakeview_resort",
        "tier": "luxury",
        "typeLabel": "Luxury Khasi Thatch Cottages on Umiam Lake",
        "rating": 4.9,
        "reviewsCount": 1600,
        "image": "/images/places/umiam-lake.jpg",
        "pricePerNight": 16500,
        "coordinates": {
          "lat": 25.669,
          "lng": 91.905
        },
        "amenities": [
          "Panoramic Umiam Lake View",
          "Traditional Khasi Herbal Spa",
          "Sao Pho Wood-Fired Fine Dining",
          "Pine Forest Eco-Treks"
        ],
        "address": "UCC Road, Umiam Lake, Ri Bhoi District, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 0.5,
            "drivingTimeMin": 3
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 24,
            "drivingTimeMin": 50
          }
        ]
      },
      {
        "id": "lakewood-shillong-resort",
        "name": "Lakewood Shillong Resort",
        "type": "resort_lakeside",
        "tier": "luxury",
        "typeLabel": "Luxury Lake-View Resort Near Umiam",
        "rating": 4.8,
        "reviewsCount": 1100,
        "image": "/images/places/umiam-lake.jpg",
        "pricePerNight": 19800,
        "coordinates": {
          "lat": 25.652,
          "lng": 91.903
        },
        "amenities": [
          "Lake View Suites",
          "Forest Spa",
          "Private Kayaks",
          "Khasi Fine Dining"
        ],
        "address": "Umiam Lake Road, Ri Bhoi District, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 1.2,
            "drivingTimeMin": 5
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 22.8,
            "drivingTimeMin": 48
          }
        ]
      },
      {
        "id": "heritage-hills-shillong",
        "name": "Heritage Hills Shillong",
        "type": "boutique_heritage",
        "tier": "luxury",
        "typeLabel": "Luxury Heritage Residence with Valley Views",
        "rating": 4.8,
        "reviewsCount": 890,
        "image": "/images/places/living-root-bridge.jpg",
        "pricePerNight": 22500,
        "coordinates": {
          "lat": 25.607,
          "lng": 91.895
        },
        "amenities": [
          "Private Courtyard",
          "Wellness Spa",
          "Curated Local Dining",
          "Chauffeur Service"
        ],
        "address": "Nongthymmai, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 20.1,
            "drivingTimeMin": 43
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 7.1,
            "drivingTimeMin": 19
          }
        ]
      },
      {
        "id": "shillong-cloud-nine",
        "name": "Cloud Nine Khasi Estate",
        "type": "luxury_palace",
        "tier": "ultra_luxury",
        "typeLabel": "Ultra-Luxury Private Estate in the Hills",
        "rating": 4.9,
        "reviewsCount": 780,
        "image": "/images/places/umiam-lake.jpg",
        "pricePerNight": 28500,
        "coordinates": {
          "lat": 25.61,
          "lng": 91.91
        },
        "amenities": [
          "Private Valley Villa",
          "Butler Service",
          "Chef-curated Khasi Dining",
          "Wellness Pavilion"
        ],
        "address": "Upper Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 20.4,
            "drivingTimeMin": 43
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 7.8,
            "drivingTimeMin": 20
          }
        ]
      },
      {
        "id": "pine-crown-private-estate",
        "name": "Pine Crown Private Estate",
        "type": "luxury_palace",
        "tier": "ultra_luxury",
        "typeLabel": "Ultra-Luxury Private Mountain Retreat",
        "rating": 5,
        "reviewsCount": 420,
        "image": "/images/places/umiam-lake.jpg",
        "pricePerNight": 36000,
        "coordinates": {
          "lat": 25.625,
          "lng": 91.925
        },
        "amenities": [
          "Private Villa",
          "Dedicated Butler",
          "Helipad Transfers",
          "Chef’s Table"
        ],
        "address": "Laitkor Peak, Shillong, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 22.8,
            "drivingTimeMin": 48
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 5.4,
            "drivingTimeMin": 16
          }
        ]
      },
      {
        "id": "cloud-forest-shillong",
        "name": "Cloud Forest Reserve Villas",
        "type": "resort_lakeside",
        "tier": "ultra_luxury",
        "typeLabel": "Exclusive Eco-Luxury Forest Villas",
        "rating": 4.9,
        "reviewsCount": 350,
        "image": "/images/places/living-root-bridge.jpg",
        "pricePerNight": 42000,
        "coordinates": {
          "lat": 25.61,
          "lng": 91.94
        },
        "amenities": [
          "Forest Villa",
          "Private Naturalist",
          "Infinity Pool",
          "Signature Khasi Dining"
        ],
        "address": "Upper Shillong Forest Reserve, Meghalaya",
        "distanceToItineraryHighlights": [
          {
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Watersports",
            "distanceKm": 24.5,
            "drivingTimeMin": 52
          },
          {
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls",
            "distanceKm": 4.8,
            "drivingTimeMin": 14
          }
        ]
      }
    ],
    "foodSpots": [
      {
        "id": "dylans-cafe",
        "name": "Dylan's Cafe Shillong",
        "cuisineType": "Khasi Local & Contemporary Cafe",
        "type": "cafe",
        "rating": 4.7,
        "priceForTwo": 750,
        "image": "/images/places/elephant-falls.jpg",
        "mustTryDishes": [
          "Khasi Smoked Pork Ribs",
          "Waffles with Meghalaya Honey",
          "Tungrymbai Platter",
          "Artisanal Drip Coffee"
        ],
        "specialty": "Khasi roasted pork platters, handcrafted burgers & artisan drip coffee",
        "timings": "11:00 AM – 9:30 PM",
        "address": "Risa Colony, Near Don Bosco, Shillong",
        "coordinates": {
          "lat": 25.5682,
          "lng": 91.8931
        },
        "isVeg": false
      },
      {
        "id": "jiva-sizzlers-shillong",
        "name": "Jiva Sizzlers & Khasi Kitchen",
        "cuisineType": "Affordable Khasi & North Indian",
        "type": "local_specialty",
        "rating": 4.5,
        "priceForTwo": 550,
        "image": "/images/places/living-root-bridge.jpg",
        "mustTryDishes": [
          "Jadoh Rice",
          "Pukhlein",
          "Smoked Pork with Bamboo Shoot",
          "Tungrymbai"
        ],
        "specialty": "Generous local plates and homestyle Khasi flavors at an easy everyday price.",
        "timings": "11:00 AM – 10:00 PM",
        "address": "Laitumkhrah Main Road, Shillong",
        "coordinates": {
          "lat": 25.5662,
          "lng": 91.8895
        },
        "isVeg": false
      },
      {
        "id": "cafe-shillong-rooftop",
        "name": "Cloud 9 Rooftop Kitchen",
        "cuisineType": "Mid-Range Global & Meghalaya Dining",
        "type": "cafe",
        "rating": 4.6,
        "priceForTwo": 1200,
        "image": "/images/places/umiam-lake.jpg",
        "mustTryDishes": [
          "Khasi Pork Ribs",
          "Smoked Trout",
          "Meghalaya Honey Pancakes",
          "Local Berry Cheesecake"
        ],
        "specialty": "A relaxed rooftop with valley views, regional ingredients, and contemporary plates.",
        "timings": "12:00 PM – 10:30 PM",
        "address": "Police Bazaar, Shillong",
        "coordinates": {
          "lat": 25.5784,
          "lng": 91.8942
        },
        "isVeg": false
      },
      {
        "id": "pine-grove-fine-dining",
        "name": "Pine Grove Fine Dining",
        "cuisineType": "Premium Khasi Tasting Menu",
        "type": "heritage_restaurant",
        "rating": 4.8,
        "priceForTwo": 2800,
        "image": "/images/places/umiam-lake.jpg",
        "mustTryDishes": [
          "Chef’s Khasi Tasting Menu",
          "Smoked River Fish",
          "Forest Mushroom Broth",
          "Meghalaya Honey Souffle"
        ],
        "specialty": "An elevated dining experience pairing Khasi ingredients with modern culinary technique.",
        "timings": "6:30 PM – 11:00 PM",
        "address": "Upper Shillong, Meghalaya",
        "coordinates": {
          "lat": 25.6074,
          "lng": 91.8955
        },
        "isVeg": false
      }
    ],
    "experiences": [
      {
        "id": "dawki-crystal-boating",
        "title": "Dawki Crystal-Clear River Boating",
        "category": "adventure",
        "categoryLabel": "River Adventure",
        "duration": "4 Hours",
        "price": 1200,
        "image": "/images/places/umiam-lake.jpg",
        "description": "Float in wooden boats across the Umngot River where water is so transparent the boats appear to fly in mid-air.",
        "highlights": [
          "Glass-like turquoise water",
          "Indo-Bangladesh border suspension bridge view",
          "Fresh fish river lunch"
        ],
        "timing": "8:00 AM – 1:00 PM",
        "location": "Shnongpdeng & Dawki Riverfront",
        "rating": 4.9
      }
    ],
    "defaultItinerary": [
      {
        "dayNumber": 1,
        "themeTitle": "Cloud Kingdom: Umiam Lake & Elephant Falls",
        "dateLabel": "Day 01",
        "totalDistanceKm": 25,
        "totalTravelTimeMin": 60,
        "totalDaySpend": 500,
        "stops": [
          {
            "id": "s-d1-1",
            "placeId": "umiam-lake",
            "placeName": "Umiam Lake Pine Promenade",
            "category": "lake",
            "timeSlot": "9:30 AM – 12:30 PM",
            "durationMin": 180,
            "travelFromPrevMin": 0,
            "distanceFromPrevKm": 0,
            "estimatedCost": 50,
            "iconType": "Waves",
            "notes": "Speedboat cruise and pine forest walk.",
            "coordinates": {
              "lat": 25.6667,
              "lng": 91.9
            }
          },
          {
            "id": "s-d1-2",
            "placeId": "elephant-falls",
            "placeName": "Elephant Falls 3-Tier Trail",
            "category": "waterfall",
            "timeSlot": "2:30 PM – 4:30 PM",
            "durationMin": 120,
            "travelFromPrevMin": 45,
            "distanceFromPrevKm": 22,
            "estimatedCost": 30,
            "iconType": "Mountain",
            "notes": "Descend to the third tier spray pool.",
            "coordinates": {
              "lat": 25.5367,
              "lng": 91.8258
            }
          }
        ]
      },
      {
        "dayNumber": 2,
        "themeTitle": "Living Wonder: Nongriat Double Decker Root Bridge Trek",
        "dateLabel": "Day 02",
        "totalDistanceKm": 59,
        "totalTravelTimeMin": 95,
        "totalDaySpend": 900,
        "stops": [
          {
            "id": "s-d2-1",
            "placeId": "living-root-bridge",
            "placeName": "Double Decker Living Root Bridge",
            "category": "nature",
            "timeSlot": "7:00 AM – 2:00 PM",
            "durationMin": 420,
            "travelFromPrevMin": 60,
            "distanceFromPrevKm": 45,
            "estimatedCost": 50,
            "iconType": "Trees",
            "notes": "3,500 stone step descent through rainforest canyon.",
            "coordinates": {
              "lat": 25.2464,
              "lng": 91.6705
            }
          },
          {
            "id": "s-d2-2",
            "placeId": "nohkalikai-falls",
            "placeName": "Nohkalikai Falls Observation Deck",
            "category": "waterfall",
            "timeSlot": "3:30 PM – 5:30 PM",
            "durationMin": 120,
            "travelFromPrevMin": 35,
            "distanceFromPrevKm": 14,
            "estimatedCost": 50,
            "iconType": "Waves",
            "notes": "Witness the 1,115 ft plunge before evening mist rolls over the ridge.",
            "coordinates": {
              "lat": 25.2755,
              "lng": 91.6845
            }
          }
        ]
      }
    ],
    "heroImage": "/images/places/living-root-bridge.jpg",
    "idealDurationDays": 3,
    "coordinates": {
      "lat": 25.2464,
      "lng": 91.6705
    }
  }
} as any;
