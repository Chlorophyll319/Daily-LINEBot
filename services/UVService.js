import { getUvLevelName, getUvEmoji, getUvAdvice } from "../data/miniBotPhrases/uv/UVEmoji.js";
import { uvTalkMap } from "../data/miniBotPhrases/uv/uvTalkMap.js";
import { STATION_COUNTY_MAP, CITY_ALIAS } from "../data/miniBotPhrases/uv/stationCountyMap.js";

/**
 * 取得指定城市的紫外線指數報告
 * @param {Array} locations - getDailyUvIndex() 回傳的 location 陣列
 *   每筆格式：{ StationID: "467420", UVIndex: "9.5" }
 * @param {string} city - 查詢城市（e.g. "臺北市"）
 * @returns {string} 格式化後的回應文字
 */
export function getUvReport(locations, city) {
  const resolvedCity = CITY_ALIAS[city] ?? city;
  const uvIndex = findCityUvIndex(locations, resolvedCity);

  if (uvIndex === null) {
    throw new Error(`找不到 ${city} 的紫外線資料`);
  }

  const levelName = getUvLevelName(uvIndex);
  return buildUvReport(uvIndex, levelName, city);
}

// ─── 內部工具函數 ──────────────────────────────────────────

/**
 * 從 location 陣列中找出符合縣市的測站，回傳平均 UV 指數
 * 若無對應測站則回傳全台平均（fallback）
 * @param {Array} locations
 * @param {string} city - 已解析的城市名（alias 轉換後）
 * @returns {number|null}
 */
function findCityUvIndex(locations, city) {
  // 找出屬於該縣市的所有測站
  const cityLocations = locations.filter(
    (loc) => STATION_COUNTY_MAP[loc.StationID] === city
  );

  if (cityLocations.length > 0) {
    return calcAvgUv(cityLocations);
  }

  // fallback：全台所有已知縣市測站的平均
  const knownLocations = locations.filter(
    (loc) => STATION_COUNTY_MAP[loc.StationID] !== undefined
  );

  if (knownLocations.length > 0) {
    return calcAvgUv(knownLocations);
  }

  return null;
}

/**
 * 計算一組測站的平均 UV 指數（四捨五入至小數一位）
 */
function calcAvgUv(locationList) {
  const sum = locationList.reduce(
    (acc, loc) => acc + parseFloat(loc.UVIndex),
    0
  );
  return Math.round((sum / locationList.length) * 10) / 10;
}

/**
 * 隨機取一句話術
 */
function getRandomTalk(levelName) {
  const talks = uvTalkMap[levelName];
  if (!talks || talks.length === 0) return "";
  return talks[Math.floor(Math.random() * talks.length)];
}

/**
 * 建構紫外線報告
 * @returns {string[]} 兩則訊息：[話術, 資料]
 */
function buildUvReport(uvIndex, levelName, city) {
  const uvEmoji = getUvEmoji(uvIndex);
  const advice = getUvAdvice(uvIndex);
  const talkLine = getRandomTalk(levelName);

  const msg1 = talkLine || `${uvEmoji} 幫你查好 ${city} 的紫外線了！`;

  const msg2 =
    `${uvEmoji} ${city} 紫外線指數\n\n` +
    `☀️ UV 指數：${uvIndex}（${levelName}）\n` +
    `🧴 建議：${advice}\n\n` +
    `💡 資料來源：中央氣象署`;

  return [msg1, msg2];
}
