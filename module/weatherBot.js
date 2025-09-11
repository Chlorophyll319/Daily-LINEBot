import { getWeatherReport } from "../Library/weatherSimple.js";
import { getWeeklyForecast } from "../api/weatherApi.js";
import {
  handleWeatherError,
  createWeatherError,
} from "../Library/WeatherError.js";
import mongoDB from "../database/mongoDB.js";

console.log("🤖 新版天氣機器人模組啟動中... 這次是 Linus 認證的簡潔版本！ ✨");

/**
 * 一週天氣預報主功能 - 重構後的簡潔版本
 * 整合 MongoDB 使用者資料 + 簡化的天氣處理邏輯
 *
 * @param {string} userMessage 使用者訊息
 * @param {string} userId 使用者 LINE ID
 * @returns {Promise<string>} 天氣預報回應訊息
 */
export async function weeklyWeather(userMessage, userId) {
  console.log(
    `🌟 開始處理 ${userId} 的一週天氣查詢... 讓我們看看要去哪裡找天氣！`
  );

  try {
    // 1. 先查使用者的預設城市
    let userCity = await getUserDefaultCity(userId);

    // 2. 取得天氣資料
    console.log("📡 正在向氣象局討要天氣資料... 希望他們今天心情好");
    const weatherData = await getWeeklyForecast();

    if (!weatherData) {
      throw createWeatherError.apiError("無法取得天氣預報資料");
    }

    // 3. 生成天氣預報 - 使用簡化的處理邏輯
    console.log(`🎯 開始製作 ${userCity} 的專屬天氣預報...`);
    const report = getWeatherReport(weatherData, userCity, 7);

    console.log("🎉 天氣預報製作完成！準備回傳給好朋友～");
    return report;
  } catch (error) {
    console.error("💥 天氣預報處理失敗，出現不明錯誤：", error.message);
    return handleWeatherError(error);
  }
}

/**
 * 設定使用者預設城市
 * @param {string} userId 使用者 ID
 * @param {string} cityName 城市名稱
 */
export async function setUserCity(userId, cityName) {
  console.log(
    `🏙️ ${userId} 想要設定預設城市為 ${cityName}... 好的！幫您記住！`
  );

  try {
    await mongoDB.saveUserData(userId, cityName);
    console.log(`✅ 設定完成！${userId} 的預設城市已設為 ${cityName}`);
    return `✨ 設定完成！您的預設城市已設為 ${cityName}\n下次查詢天氣時會直接使用這個城市的資料喔！`;
  } catch (error) {
    console.error("💔 設定預設城市失敗：", error.message);
    return handleWeatherError(
      createWeatherError.databaseError("設定預設城市", error)
    );
  }
}

/**
 * 取得使用者預設城市
 * 如果沒有設定，預設使用新北市
 */
async function getUserDefaultCity(userId) {
  try {
    const userData = await mongoDB.getUserData(userId);

    if (userData && userData.defaultCity) {
      console.log(`🎯 使用 ${userId} 的預設城市：${userData.defaultCity}`);
      return userData.defaultCity;
    } else {
      console.log(`🆕 ${userId} 是新朋友或還沒設定城市，預設使用新北市`);
      // 自動幫新用戶設定新北市為預設
      await mongoDB.saveUserData(userId, "新北市");
      return "新北市";
    }
  } catch (error) {
    console.error(
      "🐛 取得使用者城市時發生錯誤，使用新北市作為備援：",
      error.message
    );
    // 這裡不拋錯誤，因為我們有備援方案
    return "新北市";
  }
}

/**
 * 處理城市設定指令
 * 例如：「設定城市 台北市」
 */
export function parseCityCommand(message) {
  const cityPattern = /設定城市\s*(.+)/;
  const match = message.match(cityPattern);

  if (match) {
    const cityName = match[1].trim();
    console.log(`🎯 偵測到城市設定指令：${cityName}`);
    return cityName;
  }

  return null;
}

console.log("🚀 新版天氣機器人模組載入完成！準備為好朋友們服務～");
