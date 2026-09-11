import mongoose, { Schema, Document } from 'mongoose'

export interface IMediaItem extends Document {
  id: string
  title: string
  url: string
  altText: string
  caption: string
  source: string
  license: 'Public Domain' | 'Creative Commons' | 'Direct Ownership' | 'Editorial License' | 'ASI Verified'
  attribution: string
  uploadedBy: string
  fileSize?: string
  dimensions?: string
  format?: string
  usedBy?: {
    entityType: string
    entityId: string
    entityName: string
  }[]
  createdAt: Date
  updatedAt: Date
}

const MediaItemSchema = new Schema<IMediaItem>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    source: { type: String, default: "Trippin' Bharat Verified Asset" },
    license: {
      type: String,
      enum: ['Public Domain', 'Creative Commons', 'Direct Ownership', 'Editorial License', 'ASI Verified'],
      default: 'ASI Verified',
    },
    attribution: { type: String, default: 'Official Tourism Archives' },
    uploadedBy: { type: String, default: 'Admin' },
    fileSize: { type: String, default: '1.2 MB' },
    dimensions: { type: String, default: '1920x1080' },
    format: { type: String, default: 'JPEG' },
    usedBy: [
      {
        entityType: { type: String },
        entityId: { type: String },
        entityName: { type: String },
      },
    ],
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

export const MediaItem = mongoose.model<IMediaItem>('MediaItem', MediaItemSchema)
