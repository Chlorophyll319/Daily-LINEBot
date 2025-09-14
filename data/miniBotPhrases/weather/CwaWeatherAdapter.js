import axios from "axios";
import getApiList from "../../info/apiList.js";

const apiList = getApiList();

// 常數定義 - 消除魔法數字！
const API_INDICES = {
  // 天氣預報相關
  WEEKLY_FORECAST: 31, // 一週各縣市預報
  THREE_DAY_FORECAST: 1, // 全台3天天氣預報
  CURRENT_WEATHER: 4, // 現在天氣觀測報告
  WEATHER_ALERT: 3, // 天氣特報
  RAIN_OBSERVATION: 6, // 雨量觀測資料
  HEAT_INDEX: 7, // 熱傷害指數預報

  // 城市小幫手 API 索引
  TAIPEI_HELPER: 14,
  NEW_TAIPEI_HELPER: 22,
  TAOYUAN_HELPER: 16,
  TAICHUNG_HELPER: 27,
  TAINAN_HELPER: 25,
  KAOHSIUNG_HELPER: 23,
  HSINCHU_HELPER: 17,
  CHANGHUA_HELPER: 19,
  YUNLIN_HELPER: 20,
};

/**
 * 通用 API 呼叫函數 - 核心實現
 */
async function callWeatherApi(apiName, index) {
  const apiGroup = apiList[apiName];
  if (!apiGroup || !apiGroup[index]) {
    throw new Error(`API not found: ${apiName}[${index}]`);
  }

  // eslint-disable-next-line no-unused-vars
  const { url, apiName: apiDisplayName } = apiGroup[index];

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Weather API call failed: ${error.message}`);
  }
}

// API 函數映射表 - 消除重複代碼
const API_FUNCTIONS = {
  weekly: () => callWeatherApi("天氣預報", API_INDICES.WEEKLY_FORECAST),
  threeDay: () => callWeatherApi("天氣預報", API_INDICES.THREE_DAY_FORECAST),
  current: () => callWeatherApi("天氣預報", API_INDICES.CURRENT_WEATHER),
  alert: () => callWeatherApi("天氣預報", API_INDICES.WEATHER_ALERT),
  rain: () => callWeatherApi("天氣預報", API_INDICES.RAIN_OBSERVATION),
  heat: () => callWeatherApi("天氣預報", API_INDICES.HEAT_INDEX),
};

/**
 * 導出的 API 函數 - 統一接口
 */
export const getWeeklyForecast = API_FUNCTIONS.weekly;
export const getThreeDayForecast = API_FUNCTIONS.threeDay;
export const getCurrentWeather = API_FUNCTIONS.current;
export const getWeatherAlert = API_FUNCTIONS.alert;
export const getRainObservation = API_FUNCTIONS.rain;
export const getHeatIndex = API_FUNCTIONS.heat;

// 城市小幫手映射表 - 統一使用繁體中文
const CITY_HELPER_MAP = {
  臺北: API_INDICES.TAIPEI_HELPER,
  新北: API_INDICES.NEW_TAIPEI_HELPER,
  桃園: API_INDICES.TAOYUAN_HELPER,
  臺中: API_INDICES.TAICHUNG_HELPER,
  臺南: API_INDICES.TAINAN_HELPER,
  高雄: API_INDICES.KAOHSIUNG_HELPER,
  新竹: API_INDICES.HSINCHU_HELPER,
  彰化: API_INDICES.CHANGHUA_HELPER,
  雲林: API_INDICES.YUNLIN_HELPER,
};

/**
 * 取得特定城市小幫手資料
 */
export async function getCityHelper(cityName) {
  const normalizedName = cityName.replace("市", ""); // 移除「市」字
  const apiIndex = CITY_HELPER_MAP[normalizedName] || API_INDICES.TAIPEI_HELPER;
  return await callWeatherApi("天氣預報", apiIndex);
}

// 天氣類型映射表 - 消除 switch 語句
const WEATHER_TYPE_MAP = {
  weekly: API_FUNCTIONS.weekly,
  week: API_FUNCTIONS.weekly,
  "3day": API_FUNCTIONS.threeDay,
  three: API_FUNCTIONS.threeDay,
  current: API_FUNCTIONS.current,
  now: API_FUNCTIONS.current,
  alert: API_FUNCTIONS.alert,
  warning: API_FUNCTIONS.alert,
  rain: API_FUNCTIONS.rain,
  heat: API_FUNCTIONS.heat,
};

/**
 * 根據天氣類型取得相應資料
 */
export async function getWeatherByType(weatherType = "weekly") {
  const handler =
    WEATHER_TYPE_MAP[weatherType.toLowerCase()] || API_FUNCTIONS.weekly;
  return await handler();
}

// 導出通用函數供其他地方使用
export { callWeatherApi };
