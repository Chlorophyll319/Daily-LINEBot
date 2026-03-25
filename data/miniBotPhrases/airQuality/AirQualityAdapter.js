import axios from "axios";
import getApiList from "../../info/apiList.js";

const apiList = getApiList();

// 常數定義 - 對應 apiList.js 中 空氣品質 陣列索引
const API_INDICES = {
  REALTIME_AQI: 0,  // aqx_p_432 — 即時AQI（每1時更新）
  FORECAST_AQI: 1,  // aqf_p_01  — 預報資料（每30分更新）
};

/**
 * 通用 API 呼叫函數 - 核心實現
 */
async function callAirQualityApi(index) {
  const apiGroup = apiList["空氣品質"];
  if (!apiGroup || !apiGroup[index]) {
    throw new Error(`API not found: 空氣品質[${index}]`);
  }

  // eslint-disable-next-line no-unused-vars
  const { url, apiName } = apiGroup[index];

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`AirQuality API call failed: ${error.message}`);
  }
}

// API 函數映射表
const API_FUNCTIONS = {
  realtime: () => callAirQualityApi(API_INDICES.REALTIME_AQI),
  forecast: () => callAirQualityApi(API_INDICES.FORECAST_AQI),
};

/**
 * 導出的 API 函數 - 統一接口
 */
export const getRealtimeAqi = API_FUNCTIONS.realtime;
export const getAqiForecast = API_FUNCTIONS.forecast;

// 導出通用函數供其他地方使用
export { callAirQualityApi };
