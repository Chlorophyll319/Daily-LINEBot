import { MongoClient } from "mongodb";
import "dotenv/config";

console.log("🍃 MongoDB 連接模組載入中... 希望資料庫今天心情不錯 (´∀｀)");

const client = new MongoClient(process.env.MONGODB_URI);
let db = null;

/**
 * 連接到 MongoDB 資料庫
 * 只連接一次，之後重複使用同一個連接
 */
async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("dailyBot");
      console.log(
        "✨ MongoDB 連接成功！資料庫準備就緒，可以開始儲存好朋友的資料了 ٩(◕‿◕)۶"
      );
    } catch (error) {
      console.error("💔 MongoDB 連接失敗，資料庫罷工了：", error.message);
      throw error;
    }
  }
  return db;
}

/**
 * 取得使用者資料
 * @param {string} userId LINE 使用者 ID
 * @returns {Promise<Object|null>} 使用者資料或 null
 */
async function getUserData(userId) {
  try {
    const database = await connectDB();
    const users = database.collection("users");
    const user = await users.findOne({ userId });

    if (user) {
      console.log(
        `🎯 找到熟悉的朋友！${userId} 的預設城市是 ${user.defaultCity}`
      );
    } else {
      console.log(`🆕 新朋友！${userId} 還沒設定預設城市呢~`);
    }

    return user;
  } catch (error) {
    console.error("🐛 取得使用者資料時發生錯誤：", error.message);
    return null;
  }
}

/**
 * 儲存或更新使用者資料
 * @param {string} userId LINE 使用者 ID
 * @param {string} defaultCity 預設城市
 */
async function saveUserData(userId, defaultCity) {
  try {
    const database = await connectDB();
    const users = database.collection("users");

    const result = await users.updateOne(
      { userId },
      {
        $set: {
          userId,
          defaultCity,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`🎊 歡迎新朋友！幫 ${userId} 設定預設城市為 ${defaultCity}`);
    } else {
      console.log(`📝 更新成功！${userId} 的預設城市改為 ${defaultCity}`);
    }

    return result;
  } catch (error) {
    console.error("💥 儲存使用者資料時發生錯誤：", error.message);
    throw error;
  }
}

/**
 * 關閉資料庫連接
 */
async function closeDB() {
  if (client) {
    await client.close();
    console.log("👋 MongoDB 連接已關閉，資料庫說再見～");
  }
}

export default {
  getUserData,
  saveUserData,
  closeDB,
};
