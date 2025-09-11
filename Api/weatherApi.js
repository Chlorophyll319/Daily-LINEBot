import axios from "axios";
import getApiList from "../data/info/apiList.js";

console.log(
  "🌐 簡潔版天氣 API 模組啟動中... 不再需要32個包裝函數了！ヽ(°〇°)ﾉ"
);

const apiList = getApiList();

// Linus 認證的常數定義 - 消除魔法數字！
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
 * 通用 API 呼叫函數 - 取代原本32個重複的函數
 * Linus 最愛的 DRY (Don't Repeat Yourself) 原則
 *
 * @param {string} apiName API 名稱，例如："天氣預報"
 * @param {number} index API 索引
 * @returns {Promise<Object|null>} API 資料或 null
 */
async function callWeatherApi(apiName, index) {
  console.log(
    `🚀 準備呼叫 ${apiName} API (索引: ${index})... 希望氣象局今天不塞車`
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
    console.error(`🐛 API 呼叫失敗，氣象局可能在休息：${error.message}`);
    return null;
  }
}

/**
 * 取得一週天氣預報 - 最常用的功能
 * 直接包裝成容易使用的函數
 */
export async function getWeeklyForecast() {
  console.log("📅 正在取得一週天氣預報... 準備好迎接七天的天氣冒險！");
  return await callWeatherApi("天氣預報", API_INDICES.WEEKLY_FORECAST);
}

/**
 * 取得3天天氣預報
 */
export async function getThreeDayForecast() {
  console.log("📅 正在取得三天天氣預報... 短期規劃最重要！");
  return await callWeatherApi("天氣預報", API_INDICES.THREE_DAY_FORECAST);
}

/**
 * 取得現在天氣觀測報告
 */
export async function getCurrentWeather() {
  console.log("🌤️ 正在取得現在天氣觀測報告... 看看外面現在怎麼樣！");
  return await callWeatherApi("天氣預報", API_INDICES.CURRENT_WEATHER);
}

/**
 * 取得天氣特報/警報
 */
export async function getWeatherAlert() {
  console.log("⚠️ 正在取得天氣特報... 有沒有需要注意的事情？");
  return await callWeatherApi("天氣預報", API_INDICES.WEATHER_ALERT);
}

/**
 * 取得雨量觀測資料
 */
export async function getRainObservation() {
  console.log("🌧️ 正在取得雨量觀測資料... 今天會下雨嗎？");
  return await callWeatherApi("天氣預報", API_INDICES.RAIN_OBSERVATION);
}

/**
 * 取得熱傷害指數預報
 */
export async function getHeatIndex() {
  console.log("🔥 正在取得熱傷害指數預報... 今天會不會熱死人？");
  return await callWeatherApi("天氣預報", API_INDICES.HEAT_INDEX);
}

/**
 * 取得特定城市小幫手資料
 * @param {string} cityName 城市名稱，例如："台北"、"新北"
 */
export async function getCityHelper(cityName) {
  console.log(`🏙️ 正在取得 ${cityName} 小幫手資料... 每個城市都有專屬服務員！`);

  // 城市對應索引映射 - 使用定義好的常數，Linus 會很滿意 ✨
  const cityApiMap = {
    台北: API_INDICES.TAIPEI_HELPER,
    新北: API_INDICES.NEW_TAIPEI_HELPER,
    桃園: API_INDICES.TAOYUAN_HELPER,
    台中: API_INDICES.TAICHUNG_HELPER,
    台南: API_INDICES.TAINAN_HELPER,
    高雄: API_INDICES.KAOHSIUNG_HELPER,
    新竹: API_INDICES.HSINCHU_HELPER,
    彰化: API_INDICES.CHANGHUA_HELPER,
    雲林: API_INDICES.YUNLIN_HELPER,
  };

  const apiIndex = cityApiMap[cityName];
  if (!apiIndex) {
    console.log(`😅 ${cityName} 還沒有專屬小幫手，改用台北小幫手代班`);
    return await callWeatherApi("天氣預報", API_INDICES.TAIPEI_HELPER);
  }

  return await callWeatherApi("天氣預報", apiIndex);
}

/**
 * 根據天氣類型取得相應資料
 * @param {string} weatherType 天氣類型："weekly", "3day", "current", "alert", "rain", "heat"
 */
export async function getWeatherByType(weatherType = "weekly") {
  console.log(`🎯 正在根據類型 "${weatherType}" 取得天氣資料...`);

  switch (weatherType.toLowerCase()) {
    case "weekly":
    case "week":
      return await getWeeklyForecast();
    case "3day":
    case "three":
      return await getThreeDayForecast();
    case "current":
    case "now":
      return await getCurrentWeather();
    case "alert":
    case "warning":
      return await getWeatherAlert();
    case "rain":
      return await getRainObservation();
    case "heat":
      return await getHeatIndex();
    default:
      console.log(`😅 不認識的天氣類型 "${weatherType}"，給你一週預報`);
      return await getWeeklyForecast();
  }
}

console.log(
  "✅ 簡潔版天氣 API 模組載入完成！從32個函數進化成更強大的模組化設計 🎉"
);

// 導出通用函數供其他地方使用
export { callWeatherApi };
