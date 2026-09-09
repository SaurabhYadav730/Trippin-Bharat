import mongoose, { Schema, Document } from 'mongoose'

export interface IExperience extends Document {
  id: string
  title: string
  category: 'cultural' | 'adventure' | 'photography' | 'shopping' | 'workshops' | 'local_activities' | 'festivals'
  categoryLabel: string
  location: string
  destinationId?: mongoose.Types.ObjectId | string
  destinationSlug: string
  destinationName: string
  duration: string
  durationMin: number
  price: number
  bestTime: string
  season: string
  coordinates: { lat: number; lng: number }
  highlights: string[]
  description: string
  heroImage: string
  images: string[]
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
  verificationStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  lastVerified?: Date
  verifiedBy?: string
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true, trim: true, index: true },
    category: {
      type: String,
      enum: ['cultural', 'adventure', 'photography', 'shopping', 'workshops', 'local_activities', 'festivals'],
      default: 'cultural',
      index: true,
    },
    categoryLabel: { type: String, default: 'Cultural Experience' },
    location: { type: String, required: true },
    destinationId: { type: Schema.Types.Mixed, ref: 'Destination', index: true },
    destinationSlug: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    duration: { type: String, default: '2 Hours' },
    durationMin: { type: Number, default: 120 },
    price: { type: Number, default: 1200 },
    bestTime: { type: String, default: 'Evening' },
    season: { type: String, default: 'All Year' },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    highlights: [{ type: String }],
    description: { type: String, default: '' },
    heroImage: { type: String, required: true },
    images: [{ type: String }],
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
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema)
