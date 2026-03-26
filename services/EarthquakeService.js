import {
  getEarthquakeEmoji,
  getMagnitudeEmoji,
} from "../data/miniBotPhrases/earthquake/EarthquakeEmoji.js";
import {
  earthquakeTalkMap,
  timeTalkMap,
} from "../data/miniBotPhrases/earthquake/earthquakeTalkMap.js";

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
 * 計算地震發生時間距現在的相對時間
 * @param {string} originTimeStr - 格式 "YYYY-MM-DD HH:MM:SS"
 * @returns {{ text: string, diffHours: number }}
 */
function calcRelativeTime(originTimeStr) {
  const originMs = new Date(originTimeStr.replace(" ", "T")).getTime();
  const nowMs = Date.now();
  const diffMs = nowMs - originMs;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = diffMs / 3600000;

  let text;
  if (diffMins < 1) {
    text = "剛剛";
  } else if (diffMins < 60) {
    text = `${diffMins} 分鐘前`;
  } else if (diffHours < 24) {
    const h = Math.floor(diffHours);
    text = `${h} 小時前`;
  } else {
    const d = Math.floor(diffHours / 24);
    text = `${d} 天前`;
  }

  return { text, diffHours };
}

/**
 * 依時間差取得話術分組
 * @param {number} diffHours
 * @returns {"緊急" | "普通" | "前陣子"}
 */
function getTimeGroup(diffHours) {
  if (diffHours < 1) return "緊急";
  if (diffHours < 24) return "普通";
  return "前陣子";
}

/**
 * 隨機取一句話術
 */
function getRandomTalk(map, group) {
  const talks = map[group];
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
 * @returns {string[]} 三則訊息：[時間話術, 地震資料, 震度話術]
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
  const intensityGroup = getIntensityGroup(maxIntensity);

  // 相對時間
  const { text: relativeTime, diffHours } = originTime !== "-"
    ? calcRelativeTime(originTime)
    : { text: "", diffHours: 999 };
  const timeGroup = getTimeGroup(diffHours);

  const intensityTalk = getRandomTalk(earthquakeTalkMap, intensityGroup);
  const timeTalk = getRandomTalk(timeTalkMap, timeGroup);

  // 第1則：時間話術
  const msg1 = timeTalk || `${intensityEmoji} 偵測到地震資訊！`;

  // 第2則：地震資料
  const timeDisplay = relativeTime ? `${originTime}（${relativeTime}）` : originTime;
  let msg2 =
    `${intensityEmoji} 最新地震資訊\n\n` +
    `🕐 發生時間：${timeDisplay}\n` +
    `📍 震央位置：${location}\n` +
    `${magEmoji} 規模：M ${magnitude}\n` +
    `📏 深度：${depth} 公里\n` +
    `${intensityEmoji} 最大震度：${maxIntensity}`;
  if (shakingAreas.length > 0) {
    msg2 += `\n\n各地震度：\n${formatAffectedAreas(shakingAreas)}`;
  }
  msg2 += `\n\n💡 資料來源：中央氣象署`;

  // 第3則：震度話術
  const msg3 = intensityTalk || "";

  return msg3 ? [msg1, msg2, msg3] : [msg1, msg2];
}
