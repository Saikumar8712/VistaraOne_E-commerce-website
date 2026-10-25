import mongoose from 'mongoose'

const ATLAS_URI = process.env.MONGODB_URI || process.env.MONGO_URI
const LOCAL_URI = process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1:27017/vistaraone'

export async function connectDB() {
  // If MONGO_URI is set, attempt connection with a reasonable timeout
  if (ATLAS_URI) {
    try {
      console.log('[Database] Connecting to primary MongoDB...')
      await mongoose.connect(ATLAS_URI, {
        serverSelectionTimeoutMS: 4000,
      })
      console.log('[Database] Connected to primary MongoDB successfully.')
      return
    } catch (atlasErr) {
      console.warn(`[Database] Primary connection failed: ${atlasErr.message}`)
      console.warn('[Database] Falling back to local MongoDB...')
    }
  }

  // Fallback to local MongoDB
  try {
    await mongoose.connect(LOCAL_URI, {
      serverSelectionTimeoutMS: 3000,
    })
    console.log(`[Database] Connected to local MongoDB at: ${LOCAL_URI}`)
  } catch (localErr) {
    console.error(`[Database] Local MongoDB connection also failed: ${localErr.message}`)
    console.error('[Database] Tip: Ensure local MongoDB service is running (mongod) or whitelist your IP in Atlas.')
    throw localErr
  }
}
