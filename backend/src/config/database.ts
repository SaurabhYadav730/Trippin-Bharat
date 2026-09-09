import mongoose from 'mongoose'
import { config } from './environment.js'

let isConnected = false

export async function connectDatabase(): Promise<boolean> {
  if (isConnected) return true

  try {
    mongoose.set('strictQuery', true)
    
    // Connect to MongoDB
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    })

    isConnected = conn.connection.readyState === 1
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`)

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err)
      isConnected = false
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB Disconnected')
      isConnected = false
    })

    return true
  } catch (error: any) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}`)
    console.warn(`👉 The server will start in memory/hybrid mode. Ensure MongoDB is running on ${config.mongoUri} for persistent database operations.`)
    isConnected = false
    return false
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1
}
