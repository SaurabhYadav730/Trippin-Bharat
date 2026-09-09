import mongoose, { Schema, Document } from 'mongoose'

export interface IRestaurant extends Document {
  id: string
  name: string
  destinationId?: mongoose.Types.ObjectId | string
  destinationSlug: string
  destinationName: string
  coordinates: { lat: number; lng: number }
  address: string
  cuisine: string
  cuisineId?: mongoose.Types.ObjectId | string
  priceRange: 'budget' | 'moderate' | 'fine_dining'
  priceForTwo: number
  rating: number
  openingHours: string
  closedDays: string[]
  isVeg: boolean
  isVegan: boolean
  isJainFriendly: boolean
  localSpecialties: string[]
  mustTryDishes: string[]
  description: string
  heroImage: string
  images: string[]
  featured: boolean
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived'
  verificationStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  lastVerified?: Date
  verifiedBy?: string
  createdAt: Date
  updatedAt: Date
}

const RestaurantSchema = new Schema<IRestaurant>(
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
    cuisine: { type: String, required: true },
    cuisineId: { type: Schema.Types.Mixed, ref: 'Cuisine' },
    priceRange: { type: String, enum: ['budget', 'moderate', 'fine_dining'], default: 'moderate' },
    priceForTwo: { type: Number, default: 800 },
    rating: { type: Number, default: 4.6 },
    openingHours: { type: String, default: '11:00 AM – 11:00 PM' },
    closedDays: [{ type: String }],
    isVeg: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },
    isJainFriendly: { type: Boolean, default: false },
    localSpecialties: [{ type: String }],
    mustTryDishes: [{ type: String }],
    description: { type: String, default: '' },
    heroImage: { type: String, required: true },
    images: [{ type: String }],
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
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema)
