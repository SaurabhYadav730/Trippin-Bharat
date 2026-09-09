import mongoose, { Schema, Document } from 'mongoose'

export interface IVerificationRequest extends Document {
  id: string
  entityType: 'attraction' | 'destination' | 'hotel' | 'restaurant' | 'experience'
  entityId: string
  entityName: string
  destinationName: string
  submittedBy: string
  submittedAt: Date
  currentStatus: 'draft' | 'pending_review' | 'verified' | 'needs_update' | 'archived'
  changesSummary: string
  reviewerNotes?: string
  sourceProof?: string
  verifiedBy?: string
  verifiedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const VerificationRequestSchema = new Schema<IVerificationRequest>(
  {
    entityType: {
      type: String,
      enum: ['attraction', 'destination', 'hotel', 'restaurant', 'experience'],
      required: true,
      index: true,
    },
    entityId: { type: String, required: true, index: true },
    entityName: { type: String, required: true },
    destinationName: { type: String, required: true },
    submittedBy: { type: String, default: 'Admin' },
    submittedAt: { type: Date, default: Date.now },
    currentStatus: {
      type: String,
      enum: ['draft', 'pending_review', 'verified', 'needs_update', 'archived'],
      default: 'pending_review',
      index: true,
    },
    changesSummary: { type: String, default: '' },
    reviewerNotes: { type: String },
    sourceProof: { type: String },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
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

export const VerificationRequest = mongoose.model<IVerificationRequest>('VerificationRequest', VerificationRequestSchema)
