import {
  getEarthquakeEmoji,
  getMagnitudeEmoji,
} from "../data/miniBotPhrases/earthquake/EarthquakeEmoji.js";
import { earthquakeTalkMap } from "../data/miniBotPhrases/earthquake/earthquakeTalkMap.js";

/**
 * 取得地震報告 - 主要入口點
 * @param {Object} rawData - 顯著有感地震 API 原始資料
 * @returns {string} 格式化後的回應文字
 */
export function getEarthquakeReport(rawData) {
  const quake = parseEarthquakeData(rawData);
  return buildEarthquakeReport(quake);
}

/**
 * 解析 API 原始資料取得最新一筆地震
 */
function parseEarthquakeData(rawData) {
  const earthquakes = rawData?.records?.Earthquake;
  if (!Array.isArray(earthquakes) || earthquakes.length === 0) {
    throw new Error("Invalid earthquake API data");
  }
  return earthquakes[0];
}

/**
 * 依震度字串取得話術分組
 * 例如 "4級" → "中震"，"5弱" → "強震"
 */
function getIntensityGroup(intensityStr) {
  if (!intensityStr) return "微小";
  const s = String(intensityStr);
  if (s.includes("7")) return "超強";
  if (s.includes("6")) return "劇烈";
  if (s.includes("5")) return "強震";
  if (s.includes("4")) return "中震";
  if (s.includes("3")) return "弱震";
  return "微小";
}

/**
 * 隨機取一句話術
 */
function getRandomTalk(group) {
  const talks = earthquakeTalkMap[group];
  if (!talks || talks.length === 0) return "";
  return talks[Math.floor(Math.random() * talks.length)];
}

/**
 * 從 ShakingArea 取出最大震度字串
 */
function findMaxIntensity(shakingAreas) {
  const order = ["7級", "6強", "6弱", "5強", "5弱", "4級", "3級", "2級", "1級"];
  for (const target of order) {
    if (shakingAreas.some((a) => a.AreaIntensity === target)) {
      return target;
    }
  }
  return shakingAreas[0]?.AreaIntensity || "-";
}

// 震度排序權重（數字越大越嚴重）
const INTENSITY_ORDER = {
  "7級": 9, "6強": 8, "6弱": 7, "5強": 6, "5弱": 5,
  "4級": 4, "3級": 3, "2級": 2, "1級": 1,
};

/**
 * 格式化受影響縣市震度列表（依震度排序，最多顯示 5 個，只顯示單一縣市）
 */
function formatAffectedAreas(shakingAreas) {
  const seen = new Set();
  return shakingAreas
    .filter((area) => !area.CountyName.includes("、"))   // 排除多縣市合併項
    .sort((a, b) => (INTENSITY_ORDER[b.AreaIntensity] || 0) - (INTENSITY_ORDER[a.AreaIntensity] || 0))
    .filter((area) => {                                   // 去除重複縣市（保留震度最高）
      if (seen.has(area.CountyName)) return false;
      seen.add(area.CountyName);
      return true;
    })
    .slice(0, 5)
    .map((area) => {
      const emoji = getEarthquakeEmoji(area.AreaIntensity);
      return `  ${emoji} ${area.CountyName}：${area.AreaIntensity}`;
    })
    .join("\n");
}

/**
 * 建構地震報告文字
 */
function buildEarthquakeReport(quake) {
  const info = quake.EarthquakeInfo;
  const originTime = info.OriginTime || "-";
  const location = info.Epicenter?.Location || "-";
  const magnitude = info.EarthquakeMagnitude?.MagnitudeValue ?? "-";
  const depth = info.FocalDepth ?? "-";
  const shakingAreas = quake.Intensity?.ShakingArea || [];
  const maxIntensity = shakingAreas.length > 0 ? findMaxIntensity(shakingAreas) : "-";
  const magEmoji = getMagnitudeEmoji(magnitude);
  const intensityEmoji = getEarthquakeEmoji(maxIntensity);
  const group = getIntensityGroup(maxIntensity);
  const talkLine = getRandomTalk(group);

  const header = `${intensityEmoji} 最新地震資訊\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  const summary =
    `🕐 發生時間：${originTime}\n` +
    `📍 震央位置：${location}\n` +
    `${magEmoji} 規模：M ${magnitude}\n` +
    `📏 深度：${depth} 公里\n` +
    `${intensityEmoji} 最大震度：${maxIntensity}\n\n`;

  let areaSection = "";
  if (shakingAreas.length > 0) {
    areaSection = `各地震度：\n${formatAffectedAreas(shakingAreas)}\n\n`;
  }

  const footer = `━━━━━━━━━━━━━━━━━━━━\n💡 資料來源：中央氣象署\n\n`;
  const talk = talkLine ? `${talkLine}\n` : "";

  return header + summary + areaSection + footer + talk;
}
