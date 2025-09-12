import "dotenv/config";
import mongoose from "mongoose";
import User from "./user.js";

let isConnected = false;

const DEFAULT_OPTIONS = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
};

export async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(
    process.env.MONGODB_URI || process.env.DB_URL,
    DEFAULT_OPTIONS
  );
  isConnected = true;
}

export async function getUserData(userId) {
  const user = await User.findOne({ userId }).maxTimeMS(15000);
  return user;
}

export async function saveUserData(userId, city) {
  const result = await User.findOneAndUpdate(
    { userId },
    { city },
    { upsert: true, new: true, runValidators: true }
  ).maxTimeMS(20000);
  return result;
}

export async function closeDB() {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
}

// Legacy singleton export for backward compatibility
class MongoDB {
  connectDB = connectDB;
  getUserData = getUserData;
  saveUserData = saveUserData;
  closeDB = closeDB;
}

const mongoDB = new MongoDB();
export default mongoDB;
