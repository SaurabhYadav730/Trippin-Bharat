import mongoose, { Schema, Document } from 'mongoose'

export interface IDish extends Document {
  id: string
  name: string
  cuisineId: string
  cuisineName: string
  destinationId: string
  destinationName: string
  isVeg: boolean
  priceEstimate: number
  description: string
  image: string
  recommendedRestaurantIds: string[]
  flavorProfile: string
  createdAt: Date
  updatedAt: Date
}

const DishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true, trim: true, index: true },
    cuisineId: { type: String, required: true, index: true },
    cuisineName: { type: String, required: true },
    destinationId: { type: String, required: true, index: true },
    destinationName: { type: String, required: true },
    isVeg: { type: Boolean, default: true },
    priceEstimate: { type: Number, default: 250 },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    recommendedRestaurantIds: [{ type: String }],
    flavorProfile: { type: String, default: 'Rich, Spiced & Traditional' },
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

export const Dish = mongoose.model<IDish>('Dish', DishSchema)
