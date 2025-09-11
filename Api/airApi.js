import axios from "axios";
import getApiList from "../data/info/apiList.js";

console.log(
  "🌬️ 簡潔版空氣品質 API 模組載入中... 清新空氣，程式碼也要清新！ ＼(^o^)／"
);

const apiList = getApiList();

const AIR_QUALITY_APIS = {
  CURRENT_AQI: 0, // 空氣品質指標(AQI)
  FORECAST: 1, // 空氣品質預報資料
  DAILY_AQI: 2, // 日空氣品質指標(AQI)
  DAILY_MAX: 3, // 空氣品質監測日最大值
  HISTORICAL: 4, // 空氣品質指標(AQI)(歷史資料)
  MONTHLY: 5, // 空氣品質監測月值
};

/**
 * 通用空氣品質 API 呼叫函數
 * 取代原本的 buildApi 模式，採用 weatherSimple.js 的簡潔風格
 *
 * @param {string} apiName API 名稱，例如："空氣品質"
 * @param {number} index API 索引
 * @returns {Promise<Object|null>} API 資料或 null
 */
async function callAirQualityApi(apiName, index) {
  console.log(
    `🚀 準備呼叫 ${apiName} API (索引: ${index})... 希望空氣品質不要太糟糕`
  );

  try {
    const apiGroup = apiList[apiName];
    if (!apiGroup || !apiGroup[index]) {
      console.error(
        `💔 找不到 ${apiName}[${index}] 這支 API... 可能是我記錯了？`
      );
      return null;
    }

    const { url, apiName: apiDisplayName } = apiGroup[index];
    console.log(`📡 正在呼叫 ${apiDisplayName}...`);

    const response = await axios.get(url);

    console.log(
      `✨ ${apiDisplayName} API 呼叫成功！收到 ${JSON.stringify(response.data).length} 字元的資料`
    );
    return response.data;
  } catch (error) {
    console.error(`🐛 API 呼叫失敗，環保署可能在休息：${error.message}`);
    return null;
  }
}

/**
 * 取得當前空氣品質指標 - 最常用的功能
 */
export async function getCurrentAQI() {
  console.log("🌬️ 正在取得當前空氣品質指標... 看看今天能不能開窗！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.CURRENT_AQI);
}

/**
 * 取得空氣品質預報
 */
export async function getAirQualityForecast() {
  console.log("🔮 正在取得空氣品質預報... 預知未來的空氣！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.FORECAST);
}

/**
 * 取得日空氣品質指標
 */
export async function getDailyAQI() {
  console.log("📅 正在取得日空氣品質指標... 每日空氣健檢！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.DAILY_AQI);
}

/**
 * 取得空氣品質日最大值
 */
export async function getDailyMaxAQI() {
  console.log("📊 正在取得空氣品質日最大值... 找出最糟糕的時候！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.DAILY_MAX);
}

/**
 * 取得歷史空氣品質指標
 */
export async function getHistoricalAQI() {
  console.log("📜 正在取得歷史空氣品質指標... 回顧過去的空氣歲月！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.HISTORICAL);
}

/**
 * 取得月空氣品質監測值
 */
export async function getMonthlyAQI() {
  console.log("🗓️ 正在取得月空氣品質監測值... 月月都要關心空氣！");
  return await callAirQualityApi("空氣品質", AIR_QUALITY_APIS.MONTHLY);
}

console.log(
  "✅ 簡潔版空氣品質 API 模組載入完成！從 buildApi 模式進化到直接函數呼叫 🎉"
);

export { callAirQualityApi };
