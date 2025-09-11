import "dotenv/config";
import mongoose from "mongoose";
import User from "./user.js";

console.log("🍃 MongoDB 連接模組載入中... 希望資料庫今天心情不錯 (´∀｀)");

class MongoDB {
  constructor() {
    this.isConnected = false;
  }

  async connectDB() {
    if (this.isConnected) {
      console.log("🔄 資料庫已連線，跳過重複連線");
      return;
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL);
      this.isConnected = true;
      console.log(
        "✨ MongoDB 連接成功！資料庫準備就緒，可以開始儲存好朋友的資料了 ٩(◕‿◕)۶"
      );
    } catch (error) {
      console.error("💔 MongoDB 連接失敗，資料庫罷工了：", error.message);
      throw error;
    }
  }

  async getUserData(userId) {
    try {
      const user = await User.findOne({ userId });

      if (user) {
        console.log(`🎯 找到熟悉的朋友！${userId} 的預設城市是 ${user.city}`);
      } else {
        console.log(`🆕 新朋友！${userId} 還沒設定預設城市呢~`);
      }

      return user;
    } catch (error) {
      console.error("🐛 取得使用者資料時發生錯誤：", error.message);
      return null;
    }
  }

  async saveUserData(userId, city) {
    try {
      const result = await User.findOneAndUpdate(
        { userId },
        { userId, city },
        { upsert: true, new: true, runValidators: true }
      );

      console.log(`📝 ${userId} 的預設城市已設定為 ${city}`);
      return result;
    } catch (error) {
      console.error("💥 儲存使用者資料時發生錯誤：", error.message);
      throw error;
    }
  }

  async closeDB() {
    try {
      if (!this.isConnected) return;

      await mongoose.connection.close();
      this.isConnected = false;
      console.log("👋 MongoDB 連接已關閉，資料庫說再見～");
    } catch (error) {
      console.error("💥 關閉資料庫連接時發生錯誤：", error.message);
    }
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
