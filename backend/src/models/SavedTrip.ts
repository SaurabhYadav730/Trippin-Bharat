import mongoose, { Schema, Document } from 'mongoose'

export interface ISavedTrip extends Document {
  id: string
  userId?: mongoose.Types.ObjectId | string
  destinationSlug: string
  destinationName: string
  durationDays: number
  travelStyle: string
  pace: 'relaxed' | 'balanced' | 'packed'
  totalBudget: number
  startDate?: string
  stopsCount: number
  selectedPlaces: string[]
  days: {
    dayNumber: number
    title: string
    dayBudgetEst?: number
    stops: {
      placeId: string
      placeName: string
      timeSlot?: string
      durationMin?: number
      travelFromPrevMin?: number
      distanceFromPrevKm?: number
      coordinates?: { lat: number; lng: number }
      category?: string
      notes?: string
    }[]
  }[]
  shareToken?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

const SavedTripSchema = new Schema<ISavedTrip>(
  {
    userId: { type: Schema.Types.Mixed, ref: 'User', index: true },
    destinationSlug: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    durationDays: { type: Number, default: 3 },
    travelStyle: { type: String, default: 'Heritage & Art' },
    pace: { type: String, enum: ['relaxed', 'balanced', 'packed'], default: 'balanced' },
    totalBudget: { type: Number, default: 0 },
    startDate: { type: String },
    stopsCount: { type: Number, default: 0 },
    selectedPlaces: [{ type: String }],
    days: [
      {
        dayNumber: { type: Number, required: true },
        title: { type: String, required: true },
        dayBudgetEst: { type: Number, default: 0 },
        stops: [
          {
            placeId: { type: String, required: true },
            placeName: { type: String, required: true },
            timeSlot: { type: String },
            durationMin: { type: Number },
            travelFromPrevMin: { type: Number },
            distanceFromPrevKm: { type: Number },
            coordinates: {
              lat: { type: Number },
              lng: { type: Number },
            },
            category: { type: String },
            notes: { type: String },
          },
        ],
      },
    ],
    shareToken: { type: String, index: true },
    isPublic: { type: Boolean, default: false },
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

export const SavedTrip = mongoose.model<ISavedTrip>('SavedTrip', SavedTripSchema)
