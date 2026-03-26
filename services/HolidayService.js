// import { getHolidayEmoji } from "../data/miniBotPhrases/holiday/HolidayEmoji.js";
// import { holidayTalkMap } from "../data/miniBotPhrases/holiday/holidayTalkMap.js";

/**
 * 取得今天上班狀態報告
 * @param {Array} records - 辦公日曆 CSV 解析後的陣列
 * @returns {string} 格式化後的回應文字
 */
export function getTodayWorkReport(records) {
  // TODO: implement
}

/**
 * 取得下次放假報告
 * @param {Array} records - 辦公日曆 CSV 解析後的陣列
 * @returns {string} 格式化後的回應文字
 */
export function getNextHolidayReport(records) {
  // TODO: implement
}

/**
 * 解析 CSV 文字為陣列
 * 欄位：date, year, name, isholiday, holidaycategory, description
 * @param {string} csvText - CSV 原始文字
 * @returns {Array<Object>}
 */
export function parseCsvRecords(csvText) {
  // TODO: implement
}

/**
 * 取得今天日期字串（格式：YYYYMMDD）
 */
export function getTodayStr() {
  // TODO: implement
}
