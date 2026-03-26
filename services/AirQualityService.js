import {
  getAqiEmoji,
  getAqiLevelName,
} from "../data/miniBotPhrases/airQuality/AirQualityEmoji.js";
import { airQualityTalkMap } from "../data/miniBotPhrases/airQuality/airQualityTalkMap.js";

/**
 * 取得 AQI 空氣品質報告 - 主要入口點
 * @param {Object} rawData - API 原始資料
 * @param {string} cityName - 縣市名稱
 * @returns {string} 格式化後的回應文字
 */
export function getAirQualityReport(rawData, cityName) {
  const records = parseRecords(rawData);
  const stations = filterStationsByCity(records, cityName);

  if (stations.length === 0) {
    throw new Error(`No AQI data found for city: ${cityName}`);
  }

  return buildAirQualityReport(stations, cityName);
}

/**
 * 解析 API 原始資料取得測站陣列
 */
function parseRecords(rawData) {
  // 環境部 API 直接回傳陣列（非 records 包裹格式）
  const records = Array.isArray(rawData) ? rawData : rawData?.records;
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("Invalid AQI API data");
  }
  return records;
}

/**
 * 依縣市名稱篩選測站資料
 */
function filterStationsByCity(records, cityName) {
  return records.filter((r) => r.county === cityName);
}

/**
 * 計算測站的平均 AQI（過濾無效值）
 */
function calcAverageAqi(stations) {
  const validValues = stations
    .map((s) => parseInt(s.aqi, 10))
    .filter((v) => !isNaN(v) && v >= 0);

  if (validValues.length === 0) return null;
  return Math.round(validValues.reduce((a, b) => a + b, 0) / validValues.length);
}

/**
 * 找出 AQI 最高的測站（代表最差空氣）
 */
function findWorstStation(stations) {
  return stations.reduce((worst, current) => {
    const currentAqi = parseInt(current.aqi, 10);
    const worstAqi = parseInt(worst.aqi, 10);
    if (isNaN(currentAqi)) return worst;
    if (isNaN(worstAqi) || currentAqi > worstAqi) return current;
    return worst;
  });
}

/**
 * 隨機取一句話術
 */
function getRandomTalk(levelName) {
  const talks = airQualityTalkMap[levelName];
  if (!talks || talks.length === 0) return "";
  return talks[Math.floor(Math.random() * talks.length)];
}

/**
 * 格式化單一測站資訊
 */
function formatStationItem(station) {
  const aqi = parseInt(station.aqi, 10);
  const emoji = isNaN(aqi) ? "❓" : getAqiEmoji(aqi);
  const pm25 = station["pm2.5"] || "-";
  return `  ${emoji} ${station.sitename}：AQI ${station.aqi}　PM2.5 ${pm25}`;
}

/**
 * 建構空氣品質報告
 * @returns {string[]} 兩則訊息：[話術, 資料]
 */
function buildAirQualityReport(stations, cityName) {
  const avgAqi = calcAverageAqi(stations);
  const levelName = avgAqi !== null ? getAqiLevelName(avgAqi) : "普通";
  const emoji = avgAqi !== null ? getAqiEmoji(avgAqi) : "🌤️";
  const worstStation = findWorstStation(stations);
  const talkLine = getRandomTalk(levelName);
  const updateTime = worstStation.publishtime?.slice(0, 16) || "-";

  const msg1 = talkLine || `${emoji} 幫你查好 ${cityName} 的空氣品質了！`;

  const stationList = stations.map(formatStationItem).join("\n");
  const msg2 =
    `${emoji} ${cityName} 空氣品質\n\n` +
    `📊 平均 AQI：${avgAqi ?? "-"}　等級：${levelName}\n\n` +
    stationList + "\n\n" +
    `🕐 更新時間：${updateTime}\n` +
    `💡 資料來源：環境部`;

  return [msg1, msg2];
}
