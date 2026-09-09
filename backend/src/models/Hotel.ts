import mongoose, { Schema, Document } from 'mongoose'

export interface IHotel extends Document {
  id: string
  name: string
  destinationId?: mongoose.Types.ObjectId | string
  destinationSlug: string
  destinationName: string
  coordinates: { lat: number; lng: number }
  address: string
  description: string
  heroImage: string
  images: string[]
  baseEstimatedPrice: number
  pricePerNight?: number
  livePrice?: number
  isLivePricing: boolean
  rating: number
  reviewsCount: number
  tier: 'budget' | 'comfort' | 'luxury'
  type: string
  amenities: string[]
  roomTypes: string[]
  contactPhone?: string
  website?: string
  featured: boolean
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
  verificationStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  lastVerified?: Date
  verifiedBy?: string
  createdAt: Date
  updatedAt: Date
}

const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true, trim: true, index: true },
    destinationId: { type: Schema.Types.Mixed, ref: 'Destination', index: true },
    destinationSlug: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    address: { type: String, default: '' },
    description: { type: String, default: '' },
    heroImage: { type: String, required: true },
    images: [{ type: String }],
    baseEstimatedPrice: { type: Number, default: 3500 },
    pricePerNight: { type: Number, default: 3500 },
    livePrice: { type: Number },
    isLivePricing: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 120 },
    tier: { type: String, enum: ['budget', 'comfort', 'luxury'], default: 'comfort', index: true },
    type: { type: String, default: 'Heritage Haveli Hotel' },
    amenities: [{ type: String }],
    roomTypes: [{ type: String }],
    contactPhone: { type: String },
    website: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'review', 'approved', 'published', 'archived'], default: 'published' },
    verificationStatus: { type: String, enum: ['draft', 'pending_review', 'verified', 'needs_update', 'archived'], default: 'verified' },
    lastVerified: { type: Date, default: Date.now },
    verifiedBy: { type: String, default: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id?.toString()
        if (!ret.pricePerNight) ret.pricePerNight = ret.baseEstimatedPrice
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema)
