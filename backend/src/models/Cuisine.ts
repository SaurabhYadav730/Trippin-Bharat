import mongoose, { Schema, Document } from 'mongoose'

export interface ICuisine extends Document {
  id: string
  name: string
  region: string
  description: string
  image: string
  destinationIds: string[]
  dishCount: number
  signatureDishes: string[]
  createdAt: Date
  updatedAt: Date
}

const CuisineSchema = new Schema<ICuisine>(
  {
    name: { type: String, required: true, trim: true, index: true },
    region: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    destinationIds: [{ type: String }],
    dishCount: { type: Number, default: 0 },
    signatureDishes: [{ type: String }],
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

export const Cuisine = mongoose.model<ICuisine>('Cuisine', CuisineSchema)
