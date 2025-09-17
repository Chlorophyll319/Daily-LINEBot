import AsakusaFortuneData from "../data/info/AsakusaFortuneTelling.js";
import { getRandomFortunePhrase } from "../data/miniBotPhrases/fortune/fortuneTalkMap.js";
import { formatFortuneResponse } from "../data/miniBotPhrases/fortune/FortuneFormatter.js";
import mongoDB from "../database/mongoDB.js";

/**
 * 淺草籤詩服務
 */

/**
 * 獲取籤詩內容
 * @param {number|null} specificNumber 指定籤號，null 表示隨機抽籤
 * @param {string} userId 用戶 ID
 * @param {string|null} questionCategory 問題類別
 * @returns {Promise<string>} 格式化後的籤詩回應
 */
export async function getFortuneReading(
  specificNumber = null,
  userId,
  questionCategory = null
) {
  try {
    // 獲取籤詩資料
    const fortuneData = AsakusaFortuneData();

    let selectedFortune;

    if (specificNumber) {
      // 查找特定籤號
      selectedFortune = fortuneData.find(
        (fortune) => fortune.id === specificNumber.toString()
      );
      if (!selectedFortune) {
        return "🤖 小機器人提醒：籤號範圍是 1-100 號喔！請重新輸入～";
      }
    } else {
      // 隨機選擇籤詩
      const randomIndex = Math.floor(Math.random() * fortuneData.length);
      selectedFortune = fortuneData[randomIndex];
    }

    // 記錄抽籤歷史
    await recordFortuneHistory(userId, selectedFortune, questionCategory);

    // 格式化回應
    const response = formatFortuneResponse(selectedFortune, questionCategory);

    return response;
  } catch (error) {
    console.error("獲取籤詩失敗:", error);
    return "🤖 籤詩系統暫時故障，請稍後再試～";
  }
}

/**
 * 記錄用戶抽籤歷史
 * @param {string} userId 用戶 ID
 * @param {Object} fortune 籤詩物件
 * @param {string|null} questionCategory 問題類別
 */
async function recordFortuneHistory(userId, fortune, questionCategory) {
  try {
    const db = await mongoDB.getDb();
    const collection = db.collection("fortuneHistory");

    const record = {
      userId,
      fortuneNumber: parseInt(fortune.id),
      fortuneType: fortune.type,
      questionCategory,
      timestamp: new Date(),
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD 格式
    };

    await collection.insertOne(record);
  } catch (error) {
    console.error("記錄抽籤歷史失敗:", error);
    // 不影響主要功能，只記錄錯誤
  }
}

/**
 * 獲取用戶今日抽籤次數
 * @param {string} userId 用戶 ID
 * @returns {Promise<number>} 今日抽籤次數
 */
export async function getTodayFortuneCount(userId) {
  try {
    const db = await mongoDB.getDb();
    const collection = db.collection("fortuneHistory");

    const today = new Date().toISOString().split("T")[0];

    const count = await collection.countDocuments({
      userId,
      date: today,
    });

    return count;
  } catch (error) {
    console.error("獲取今日抽籤次數失敗:", error);
    return 0;
  }
}

/**
 * 獲取用戶抽籤歷史
 * @param {string} userId 用戶 ID
 * @param {number} limit 限制數量
 * @returns {Promise<Array>} 抽籤歷史記錄
 */
export async function getFortuneHistory(userId, limit = 10) {
  try {
    const db = await mongoDB.getDb();
    const collection = db.collection("fortuneHistory");

    const history = await collection
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return history;
  } catch (error) {
    console.error("獲取抽籤歷史失敗:", error);
    return [];
  }
}

/**
 * 獲取籤詩統計資料
 * @param {string} userId 用戶 ID
 * @returns {Promise<Object>} 統計資料
 */
export async function getFortuneStats(userId) {
  try {
    const db = await mongoDB.getDb();
    const collection = db.collection("fortuneHistory");

    const stats = await collection
      .aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: "$fortuneType",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const result = {
      total: 0,
      大吉: 0,
      吉: 0,
      小吉: 0,
      末吉: 0,
      凶: 0,
    };

    stats.forEach((stat) => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    return result;
  } catch (error) {
    console.error("獲取籤詩統計失敗:", error);
    return { total: 0, 大吉: 0, 吉: 0, 小吉: 0, 末吉: 0, 凶: 0 };
  }
}
