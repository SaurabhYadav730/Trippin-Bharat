import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yatra_db',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173').split(','),
  jwtSecret: process.env.JWT_SECRET || 'yatra_jwt_secret_key_sih2026_super_secure_production_key_019283',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
}
