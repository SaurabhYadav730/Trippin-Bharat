import mongoose, { Schema, Document } from 'mongoose'

export interface IAttraction extends Document {
  id: string
  name: string
  hindiName?: string
  slug: string
  category: 'heritage' | 'palace' | 'temple' | 'fort' | 'monument' | 'museum' | 'lake' | 'nature' | 'hidden_gem' | 'craft' | 'waterfall'
  categoryLabel: string
  destinationId?: mongoose.Types.ObjectId | string
  destinationSlug: string
  destinationName: string
  description: string
  shortDescription: string
  tagline?: string
  coordinates: {
    lat: number
    lng: number
  }
  address: string
  heroImage: string
  images: string[]
  entryFee: {
    indian: number
    foreign: number
    student?: number
    camera?: number
    priceType: 'free' | 'fixed' | 'tiered'
  }
  openingHours: {
    monday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    tuesday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    wednesday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    thursday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    friday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    saturday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
    sunday: { isOpen: boolean; windows: { open: string; close: string }[]; specialNote?: string }
  }
  timings?: string
  closedDays: string[]
  bestTime: {
    bestTimeOfDay: 'Early Morning' | 'Morning' | 'Afternoon' | 'Sunset' | 'Evening' | 'Night'
    bestTimeDescription: string
    bestSeason: string
  }
  recommendedVisitDurationMin: number
  timeRequired?: string
  rating: number
  reviewCount: number
  importanceScore: number
  culturalScore: number
  historicalScore: number
  popularityScore: number
  uniquenessScore: number
  priorityCategory: 'featured' | 'must_see' | 'recommended' | 'optional'
  familyFriendly: boolean
  accessibility: boolean
  photography: boolean
  isAsiVerified: boolean
  journeyLens?: {
    history: string
    architecturalStyle: string
    architectureHighlights: string[]
    legendsAndStories: string[]
    bestPhotoSpots: string[]
    audioGuideAvailable: boolean
  }
  nearbyWithin1Km?: string[]
  nearbyWithin5Km?: string[]
  tags: string[]
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
  verificationStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  source?: string
  lastVerified?: Date
  verifiedBy?: string
  usedInTripsCount: number
  usedInCollectionsCount: number
  createdAt: Date
  updatedAt: Date
}

const AttractionSchema = new Schema<IAttraction>(
  {
    name: { type: String, required: true, trim: true, index: true },
    hindiName: { type: String },
    slug: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ['heritage', 'palace', 'temple', 'fort', 'monument', 'museum', 'lake', 'nature', 'hidden_gem', 'craft', 'waterfall'],
      default: 'heritage',
      index: true,
    },
    categoryLabel: { type: String, default: 'Heritage Monument' },
    destinationId: { type: Schema.Types.Mixed, ref: 'Destination', index: true },
    destinationSlug: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    tagline: { type: String },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    address: { type: String, default: '' },
    heroImage: { type: String, required: true },
    images: [{ type: String }],
    entryFee: {
      indian: { type: Number, default: 0 },
      foreign: { type: Number, default: 0 },
      student: { type: Number, default: 0 },
      camera: { type: Number, default: 0 },
      priceType: { type: String, enum: ['free', 'fixed', 'tiered'], default: 'fixed' },
    },
    openingHours: {
      type: Schema.Types.Mixed,
      default: () => ({
        monday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        tuesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        wednesday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        thursday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        friday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        saturday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
        sunday: { isOpen: true, windows: [{ open: '09:00', close: '18:00' }] },
      }),
    },
    timings: { type: String, default: '9:00 AM – 6:00 PM' },
    closedDays: [{ type: String }],
    bestTime: {
      bestTimeOfDay: { type: String, default: 'Morning' },
      bestTimeDescription: { type: String, default: 'Early morning to avoid heat and crowd.' },
      bestSeason: { type: String, default: 'October – March' },
    },
    recommendedVisitDurationMin: { type: Number, default: 120 },
    timeRequired: { type: String, default: '2 Hours' },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 500 },
    importanceScore: { type: Number, default: 9 },
    culturalScore: { type: Number, default: 9 },
    historicalScore: { type: Number, default: 9 },
    popularityScore: { type: Number, default: 9 },
    uniquenessScore: { type: Number, default: 9 },
    priorityCategory: { type: String, enum: ['featured', 'must_see', 'recommended', 'optional'], default: 'must_see' },
    familyFriendly: { type: Boolean, default: true },
    accessibility: { type: Boolean, default: true },
    photography: { type: Boolean, default: true },
    isAsiVerified: { type: Boolean, default: true },
    journeyLens: {
      type: Schema.Types.Mixed,
      default: () => ({
        history: '',
        architecturalStyle: 'Indian Royal Heritage',
        architectureHighlights: [],
        legendsAndStories: [],
        bestPhotoSpots: [],
        audioGuideAvailable: true,
      }),
    },
    nearbyWithin1Km: [{ type: String }],
    nearbyWithin5Km: [{ type: String }],
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'published', 'archived'],
      default: 'published',
      index: true,
    },
    verificationStatus: {
      type: String,
      enum: ['draft', 'pending_review', 'verified', 'needs_update', 'archived'],
      default: 'verified',
    },
    source: { type: String, default: 'ASI Archaeological Survey of India' },
    lastVerified: { type: Date, default: Date.now },
    verifiedBy: { type: String, default: 'Admin' },
    usedInTripsCount: { type: Number, default: 0 },
    usedInCollectionsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id?.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export const Attraction = mongoose.model<IAttraction>('Attraction', AttractionSchema)
