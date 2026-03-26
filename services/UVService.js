import { getUvLevelName, getUvEmoji, getUvAdvice } from "../data/miniBotPhrases/uv/UVEmoji.js";
import { uvTalkMap } from "../data/miniBotPhrases/uv/uvTalkMap.js";

/**
 * 取得指定城市的紫外線指數報告
 * @param {Object} rawData - getDailyUvIndex() 回傳的原始 JSON
 * @param {string} city - 查詢城市（e.g. "臺北市"）
 * @returns {string} 格式化後的回應文字
 */
export function getUvReport(rawData, city) {
  const record = findCityRecord(rawData, city);

  if (!record) {
    throw new Error(`找不到 ${city} 的紫外線資料`);
  }

  const uvIndex = parseFloat(record.UVIndex);
  const levelName = getUvLevelName(uvIndex);

  return buildUvReport(record, uvIndex, levelName, city);
}

// ─── 內部工具函數 ──────────────────────────────────────────

/**
 * 從原始資料中找出符合城市的測站紀錄
 * @param {Object} rawData
 * @param {string} city
 * @returns {Object|null}
 */
function findCityRecord(rawData, city) {
  // TODO: 確認 API 回傳格式後補充實作
  // O-A0005-001 回傳結構待確認
  return null;
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
 */
function buildUvReport(record, uvIndex, levelName, city) {
  const uvEmoji = getUvEmoji(uvIndex);
  const advice = getUvAdvice(uvIndex);
  const talkLine = getRandomTalk(levelName);

  const header = `${uvEmoji} 紫外線指數\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  const cityInfo = `📍 城市：${city}\n`;
  const indexInfo = `☀️ UV 指數：${uvIndex}（${levelName}）\n`;
  const adviceInfo = `🧴 建議：${advice}\n`;
  const footer = `\n━━━━━━━━━━━━━━━━━━━━\n💡 資料來源：中央氣象署\n\n`;
  const talk = talkLine ? `${talkLine}\n` : "";

  return header + cityInfo + indexInfo + adviceInfo + footer + talk;
}
