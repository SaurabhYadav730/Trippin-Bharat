import mongoose, { Schema, Document } from 'mongoose'

export interface IDestination extends Document {
  id: string
  name: string
  slug: string
  state: string
  region: string
  country: string
  locality?: string
  tagline: string
  description: string
  shortBio?: string
  heroImage: string
  heroBanner?: string
  gallery: string[]
  coordinates: {
    lat: number
    lng: number
  }
  bestSeason: string
  idealDurationDays: number
  bestDuration?: string
  approxBudgetPerDay: {
    budget: number
    comfort: number
    luxury: number
  }
  weather?: {
    tempC: number
    condition: string
    humidity: string
  }
  tourismStatus?: {
    safetyScore: string
    crowdLevel: string
    peakHours: string
  }
  tags: string[]
  travelStyles: string[]
  curatedForStyles?: {
    styleId: string
    styleTitle: string
    description: string
    recommendedPlaceIds: string[]
  }[]
  featured: boolean
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
  verificationStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  tripEngineReadiness: number
  dataHealth: number
  lastVerified?: Date
  verifiedBy?: string
  attractionsCount?: number
  hotelsCount?: number
  restaurantsCount?: number
  experiencesCount?: number
  createdAt: Date
  updatedAt: Date
}

const DestinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    state: { type: String, required: true, trim: true },
    region: { type: String, default: 'India' },
    country: { type: String, default: 'India' },
    locality: { type: String },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    shortBio: { type: String },
    heroImage: { type: String, required: true },
    heroBanner: { type: String },
    gallery: [{ type: String }],
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    bestSeason: { type: String, required: true },
    idealDurationDays: { type: Number, default: 3 },
    bestDuration: { type: String },
    approxBudgetPerDay: {
      budget: { type: Number, default: 1500 },
      comfort: { type: Number, default: 4000 },
      luxury: { type: Number, default: 12000 },
    },
    weather: {
      tempC: { type: Number, default: 25 },
      condition: { type: String, default: 'Pleasant' },
      humidity: { type: String, default: '45%' },
    },
    tourismStatus: {
      safetyScore: { type: String, default: '4.8 / 5.0' },
      crowdLevel: { type: String, default: 'Moderate' },
      peakHours: { type: String, default: '4:00 PM – 7:00 PM' },
    },
    tags: [{ type: String }],
    travelStyles: [{ type: String }],
    curatedForStyles: [
      {
        styleId: { type: String },
        styleTitle: { type: String },
        description: { type: String },
        recommendedPlaceIds: [{ type: String }],
      },
    ],
    featured: { type: Boolean, default: false, index: true },
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
    tripEngineReadiness: { type: Number, default: 90 },
    dataHealth: { type: Number, default: 90 },
    lastVerified: { type: Date, default: Date.now },
    verifiedBy: { type: String, default: 'Admin' },
    attractionsCount: { type: Number, default: 0 },
    hotelsCount: { type: Number, default: 0 },
    restaurantsCount: { type: Number, default: 0 },
    experiencesCount: { type: Number, default: 0 },
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

export const Destination = mongoose.model<IDestination>('Destination', DestinationSchema)
