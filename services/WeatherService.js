import { cityIndex } from "../data/info/weatherApiCityIndex.js";
import {
  getTimeSlotInfo,
  formatDate,
} from "../data/miniBotPhrases/weather/TimeUtils.js";
import { getWeatherEmoji } from "../data/miniBotPhrases/weather/WeatherEmoji.js";

// 天氣元素索引常數 - 魔法數字必須有名字
const WEATHER_ELEMENTS = {
  WEATHER: 0,
  MAX_TEMP: 1,
  MIN_TEMP: 2,
};

// 單一預設城市機制 - 消除雙重預設
const DEFAULT_CITY = "臺北市";
const FALLBACK_CITIES = ["新北市", "臺中市", "高雄市"];

/**
 * 驗證並取得 locations 陣列 - 簡化驗證邏輯
 */
function getLocations(rawData) {
  const locations = rawData?.cwaopendata?.dataset?.location;
  if (!Array.isArray(locations) || locations.length === 0) {
    throw new Error("Invalid weather API data");
  }
  return locations;
}

/**
 * 獲取天氣預報 - 主要入口點
 * @param {Object} rawWeatherData API 原始資料
 * @param {string} cityName 城市名稱
 * @param {number} days 天數預報
 * @returns {string} 格式化的天氣預報文字
 */
export function getWeatherReport(rawWeatherData, cityName, days = 7) {
  const locations = getLocations(rawWeatherData);
  const cityData = findValidCityData(locations, resolveCityName(cityName));
  return buildWeatherReport(cityData, days);
}

/**
 * 解析城市名稱 - 統一預設機制
 */
function resolveCityName(cityName) {
  return cityName || DEFAULT_CITY;
}

/**
 * 驗證城市資料是否有效 - 前移驗證邏輯
 */
function isValidCityData(locationData) {
  const we = locationData?.weatherElement;
  return (
    we &&
    we[WEATHER_ELEMENTS.WEATHER] &&
    we[WEATHER_ELEMENTS.MAX_TEMP] &&
    we[WEATHER_ELEMENTS.MIN_TEMP]
  );
}

/**
 * 找到有效的城市資料 - 消除特殊情況
 */
function findValidCityData(locations, requestedCity) {
  const candidateCities = [requestedCity, ...FALLBACK_CITIES];

  for (const cityName of candidateCities) {
    const cityIdx = cityIndex[cityName];
    if (cityIdx === undefined || !locations[cityIdx]) continue;

    const locationData = locations[cityIdx];
    if (!isValidCityData(locationData)) continue;

    // 資料結構標準化 - 統一格式
    return {
      cityName: locationData.locationName,
      weather: locationData.weatherElement[WEATHER_ELEMENTS.WEATHER],
      maxTemp: locationData.weatherElement[WEATHER_ELEMENTS.MAX_TEMP],
      minTemp: locationData.weatherElement[WEATHER_ELEMENTS.MIN_TEMP],
    };
  }

  throw new Error("No valid city data available");
}

/**
 * 建構天氣報告 - 純字符串組裝，無業務邏輯
 */
function buildWeatherReport(cityData, days) {
  const header = `🌤️ ${cityData.cityName} ${days}天天氣預報\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  const footer = `━━━━━━━━━━━━━━━━━━━━\n🌈 資料來源：中央氣象局\n💡 提醒：出門前請留意天氣變化！`;
  const body = formatWeatherItems(cityData, days);

  return header + body + footer;
}

/**
 * 格式化天氣項目 - 單一職責
 */
function formatWeatherItems(cityData, days) {
  const { weather, maxTemp, minTemp } = cityData;
  const timeSlots = Math.min(days * 2, weather.time?.length || 0);

  let result = "";
  let currentDate = null;

  for (let i = 0; i < timeSlots; i++) {
    const item = buildWeatherItem(
      weather.time[i],
      maxTemp.time[i],
      minTemp.time[i]
    );
    if (!item) continue;

    // 處理日期分隔
    const dateStr = formatDate(weather.time[i].startTime.slice(0, 10));
    if (currentDate !== dateStr) {
      if (currentDate !== null) result += "\n";
      result += `📅 ${dateStr}\n`;
      currentDate = dateStr;
    }

    result += item + "\n";
  }

  return result;
}

/**
 * 建構單個天氣項目 - 最小單元
 */
function buildWeatherItem(timeData, maxTempData, minTempData) {
  if (
    !timeData?.startTime ||
    !timeData?.endTime ||
    !maxTempData?.parameter?.parameterName ||
    !minTempData?.parameter?.parameterName
  ) {
    return null;
  }

  const weatherDesc = timeData.parameter?.parameterName || "未知天氣";
  const maxT = maxTempData.parameter.parameterName;
  const minT = minTempData.parameter.parameterName;
  const timeSlotInfo = getTimeSlotInfo(timeData.startTime, timeData.endTime);
  const weatherEmoji = getWeatherEmoji(weatherDesc);

  return `${timeSlotInfo.emoji} ${timeSlotInfo.text}：${weatherEmoji} ${weatherDesc} 🌡️ ${minT}°C ~ ${maxT}°C`;
}

// Weather service module loaded
