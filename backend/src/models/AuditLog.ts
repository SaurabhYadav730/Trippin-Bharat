import mongoose, { Schema, Document } from 'mongoose'

export interface IAuditLog extends Document {
  id: string
  timestamp: Date
  adminUser: string
  role: string
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'VERIFY' | 'REJECT' | 'MERGE' | 'ROLLBACK' | 'IMPORT'
  entityType: string
  entityId: string
  entityName: string
  summary: string
  fieldChanges?: {
    fieldName: string
    from: any
    to: any
  }[]
  previousState?: any
  newState?: any
  ipAddress?: string
  createdAt: Date
  updatedAt: Date
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    timestamp: { type: Date, default: Date.now, index: true },
    adminUser: { type: String, required: true },
    role: { type: String, default: 'Admin' },
    action: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'VERIFY', 'REJECT', 'MERGE', 'ROLLBACK', 'IMPORT'],
      required: true,
      index: true,
    },
    entityType: { type: String, required: true, index: true },
    entityId: { type: String, required: true, index: true },
    entityName: { type: String, required: true },
    summary: { type: String, required: true },
    fieldChanges: [
      {
        fieldName: { type: String },
        from: { type: Schema.Types.Mixed },
        to: { type: Schema.Types.Mixed },
      },
    ],
    previousState: { type: Schema.Types.Mixed },
    newState: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
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

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema)
