import { getEarthquakeEmoji } from "../data/miniBotPhrases/earthquake/EarthquakeEmoji.js";
import { earthquakeTalkMap } from "../data/miniBotPhrases/earthquake/earthquakeTalkMap.js";

/**
 * 取得地震報告（主入口）
 * @param {Object} rawData - 顯著有感地震 API 原始資料
 * @returns {string} 格式化的地震報告文字
 */
export function getEarthquakeReport(rawData) {
  throw new Error("Not implemented");
}

/**
 * 解析 API 回傳的地震資料
 */
function parseEarthquakeData(rawData) {
  throw new Error("Not implemented");
}

/**
 * 格式化地震報告文字
 */
function buildEarthquakeReport(quakeData) {
  throw new Error("Not implemented");
}
