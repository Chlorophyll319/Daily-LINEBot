import { cityIndex } from "../data/info/weatherApiCityIndex.js";

console.log("☀️ 簡潔版天氣工具載入中... Linus 會為這個感到驕傲的 (｡◕‿◕｡)");

// Linus 認證的天氣元素索引常數 - 消除硬編碼！
const WEATHER_ELEMENTS = {
  WEATHER: 0, // Wx 天氣現象
  MAX_TEMP: 1, // MaxT 最高溫度
  MIN_TEMP: 2, // MinT 最低溫度
};

/**
 * 獲取天氣預報 - Linus 認可的簡潔版本
 * 直接從原始資料產生可讀的天氣預報，沒有多餘的轉換
 *
 * @param {Object} rawWeatherData API 原始資料
 * @param {string} cityName 城市名稱
 * @param {number} days 要取得幾天的預報 (預設7天)
 * @returns {string} 格式化的天氣預報文字
 */
export function getWeatherReport(
  rawWeatherData,
  cityName = "新北市",
  days = 7
) {
  console.log(
    `🎯 正在為 ${cityName} 準備 ${days} 天天氣預報... 讓我施展魔法 ✨`
  );

  try {
    // 1. 取得城市資料 - 一步搞定，不需要分層函數
    const cityData = getCityWeatherData(rawWeatherData, cityName);
    if (!cityData) {
      console.log(`😅 糟糕！找不到 ${cityName} 的資料，改用新北市當預設`);
      return getWeatherReport(rawWeatherData, "新北市", days);
    }

    // 2. 直接處理天氣資料 - 簡單粗暴有效
    const report = formatWeatherReport(cityData, days);

    console.log(
      `🎉 天氣預報製作完成！共 ${report.split("\n").length - 1} 行精彩內容`
    );
    return report;
  } catch (error) {
    console.error("💥 天氣預報製作失敗，可能是氣象局在開玩笑：", error.message);
    return "抱歉，天氣資料暫時無法取得，請稍後再試 (´･ω･`)";
  }
}

/**
 * 取得特定城市的天氣資料
 * 取代原本的 userInfo + parseTwAweek 複雜流程
 */
function getCityWeatherData(rawData, cityName) {
  const cityIdx = cityIndex[cityName];
  if (cityIdx === undefined) return null;

  const locationData = rawData.cwaopendata.dataset.location[cityIdx];

  return {
    cityName: locationData.locationName,
    weather: locationData.weatherElement[WEATHER_ELEMENTS.WEATHER],
    maxTemp: locationData.weatherElement[WEATHER_ELEMENTS.MAX_TEMP],
    minTemp: locationData.weatherElement[WEATHER_ELEMENTS.MIN_TEMP],
  };
}

/**
 * 格式化天氣預報為可讀文字
 * 取代原本的 splitByDate + reformTwAweekByDay + reformTwAweekByTime 複雜流程
 */
function formatWeatherReport(cityData, days) {
  const { cityName, weather, maxTemp, minTemp } = cityData;

  console.log(`🔧 開始格式化 ${cityName} 的天氣資料... 這次不用40行程式碼了！`);

  let report = `📅 ${cityName} ${days}天天氣預報\n\n`;

  // 直接處理前 N 天的資料，不需要複雜的日期分組
  const timeSlots = Math.min(days * 2, weather.time.length); // 每天最多2個時段

  for (let i = 0; i < timeSlots; i++) {
    const timeData = weather.time[i];
    const maxTempData = maxTemp.time[i];
    const minTempData = minTemp.time[i];

    if (!timeData || !maxTempData || !minTempData) continue;

    const date = formatDate(timeData.startTime);
    const weatherDesc = timeData.parameter?.parameterName || "未知天氣";
    const maxT = maxTempData.parameter?.parameterName || "?";
    const minT = minTempData.parameter?.parameterName || "?";

    const timeSlot = getTimeSlot(timeData.startTime, timeData.endTime);

    report += `${date} ${timeSlot}\n`;
    report += `🌤️ ${weatherDesc}\n`;
    report += `🌡️ 溫度：${minT}°C ~ ${maxT}°C\n\n`;
  }

  report += "✨ 天氣預報製作完成！願你每天都有好天氣～ (◕‿◕)♡";

  console.log("🏆 格式化完成！這次的程式碼 Linus 一定滿意");
  return report;
}

/**
 * 格式化日期顯示
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

/**
 * 判斷時段
 */
function getTimeSlot(startTime, endTime) {
  const startDate = startTime.slice(0, 10);
  const endDate = endTime.slice(0, 10);

  if (startDate === endDate) {
    return "⏰ 白天";
  } else {
    return "🌙 夜晚";
  }
}

console.log("✅ 簡潔版天氣工具載入完成！程式碼從200行縮減到不到100行 💪");
