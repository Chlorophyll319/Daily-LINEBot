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

      const isNewUser = !(await User.findOne({
        userId,
        createdAt: { $lt: result.createdAt },
      }));

      if (isNewUser) {
        console.log(`🎊 歡迎新朋友！幫 ${userId} 設定預設城市為 ${city}`);
      } else {
        console.log(`📝 更新成功！${userId} 的預設城市改為 ${city}`);
      }

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

  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      console.log(`✨ 用戶已創建：${userData.userId}`);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("用戶ID已存在");
      }
      throw error;
    }
  }

  async findAllUsers() {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      console.log(`📋 查詢到 ${users.length} 個用戶`);
      return users;
    } catch (error) {
      console.error("💥 查詢所有用戶失敗：", error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findOneAndDelete({ userId });

      if (!user) {
        throw new Error("找不到用戶");
      }

      console.log(`🗑️ 用戶已刪除：${userId}`);
      return user;
    } catch (error) {
      console.error("💥 刪除用戶失敗：", error.message);
      throw error;
    }
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
