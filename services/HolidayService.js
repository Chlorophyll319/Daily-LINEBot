import {
  getHolidayCategoryEmoji,
  getWorkStatusEmoji,
} from "../data/miniBotPhrases/holiday/HolidayEmoji.js";
import { holidayTalkMap } from "../data/miniBotPhrases/holiday/holidayTalkMap.js";

/**
 * 取得今天上班狀態報告 - 主要入口點
 * @param {Array} records - parseCsvRecords 解析後的陣列
 * @returns {string} 格式化後的回應文字
 */
export function getTodayWorkReport(records) {
  const today = getTodayStr();
  const idx = records.findIndex((r) => r.date === today);

  if (idx === -1) {
    throw new Error("找不到今天的日曆資料");
  }

  const record = records[idx];
  const situation = detectTodaySituation(record, records, idx);
  return buildTodayReport(record, situation);
}

/**
 * 取得下次放假報告 - 主要入口點
 * @param {Array} records - parseCsvRecords 解析後的陣列
 * @returns {string} 格式化後的回應文字
 */
export function getNextHolidayReport(records) {
  const today = getTodayStr();
  const idx = records.findIndex((r) => r.date === today);
  const startIdx = idx === -1 ? 0 : idx + 1;

  const nextIdx = records.findIndex((r, i) => i >= startIdx && r.isholiday === "是");
  if (nextIdx === -1) {
    throw new Error("找不到近期假日資料");
  }

  const consecutive = countConsecutiveHolidays(records, nextIdx);
  const daysAway = idx === -1 ? nextIdx : nextIdx - idx;

  return buildNextHolidayReport(records, nextIdx, consecutive, daysAway);
}

/**
 * 解析 CSV 文字為物件陣列
 * 支援兩種格式：
 *   舊格式（NTPC）：date, year, name, isholiday, holidaycategory, description
 *   新格式（DGPA）：西元日期, 星期, 是否放假, 備註
 *     是否放假：0=上班, 1=補班（調整上班）, 2=放假
 * 統一輸出內部格式：{ date, isholiday("是"/"否"), holidaycategory, name }
 * @param {string} csvText - CSV 原始文字（含 BOM）
 * @returns {Array<Object>}
 */
export function parseCsvRecords(csvText) {
  const text = csvText.replace(/^\uFEFF/, ""); // 移除 BOM
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());

  // 以「是否放假」欄位存在與否判斷 DGPA 新格式，避免靠欄序或 BOM 殘留誤判
  const isDgpaFormat = headers.includes("是否放假");

  if (isDgpaFormat) {
    // 新格式（DGPA）：西元日期, 星期, 是否放假(0/1/2), 備註
    // 用欄位名稱定位，防止欄序變動導致抓錯欄位
    const dateIdx = headers.indexOf("西元日期");
    const flagIdx = headers.indexOf("是否放假");
    const nameIdx = headers.indexOf("備註");

    return lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      const get = (i) => (i >= 0 ? (values[i] || "").trim() : "");
      const flag = get(flagIdx); // "0" 上班 / "1" 補班 / "2" 放假
      return {
        date: get(dateIdx),
        isholiday: flag === "2" ? "是" : "否",
        holidaycategory: flag === "1" ? "調整上班" : "",
        name: get(nameIdx),
      };
    });
  }

  // 舊格式（NTPC）：直接用欄位名稱對應
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const get = (i) => (values[i] || "").trim();
    const record = {};
    headers.forEach((h, i) => {
      record[h] = get(i);
    });
    return record;
  });
}

/**
 * 取得今天日期字串（格式：YYYYMMDD）
 */
export function getTodayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

// ─── 內部工具函數 ──────────────────────────────────────────

/**
 * 解析單行 CSV（支援引號包覆的欄位）
 */
function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/**
 * 計算從指定 index 開始連續放假天數
 */
function countConsecutiveHolidays(records, startIdx) {
  let count = 0;
  for (let i = startIdx; i < records.length; i++) {
    if (records[i].isholiday === "是") count++;
    else break;
  }
  return count;
}

/**
 * 判斷今天的情境分類
 * 回傳：上班日 / 放假日 / 補班日 / 連假前夕 / 連假中
 */
function detectTodaySituation(record, records, idx) {
  if (record.isholiday === "否") {
    if (record.holidaycategory.includes("調整上班")) return "補班日";

    // 連假前夕：明天開始連假 >= 3 天
    if (idx + 1 < records.length) {
      const nextHolidays = countConsecutiveHolidays(records, idx + 1);
      if (nextHolidays >= 3) return "連假前夕";
    }
    return "上班日";
  }

  // 放假日：判斷是否在連假中（連假 >= 3 天）
  let start = idx;
  while (start > 0 && records[start - 1].isholiday === "是") start--;
  const totalHolidays = countConsecutiveHolidays(records, start);
  return totalHolidays >= 3 ? "連假中" : "放假日";
}

/**
 * 隨機取一句話術
 */
function getRandomTalk(group) {
  const talks = holidayTalkMap[group];
  if (!talks || talks.length === 0) return "";
  return talks[Math.floor(Math.random() * talks.length)];
}

/**
 * YYYYMMDD → YYYY/MM/DD
 */
function formatDate(dateStr) {
  return `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
}

/**
 * 建構今日上班狀況報告
 * @returns {string[]} 兩則訊息：[話術, 資料]
 */
function buildTodayReport(record, situation) {
  const isHoliday = record.isholiday === "是";
  const statusEmoji = getWorkStatusEmoji(record.isholiday);
  const catEmoji = getHolidayCategoryEmoji(record.holidaycategory);
  const talkLine = getRandomTalk(situation);

  const msg1 = talkLine || `${statusEmoji} 幫你查好今天的上班狀況了！`;

  const nameInfo = record.name ? `${catEmoji} 今日：${record.name}\n` : "";
  const msg2 =
    `${statusEmoji} 今天上班狀況\n\n` +
    `📅 日期：${formatDate(record.date)}\n` +
    `${statusEmoji} 狀態：${isHoliday ? "放假" : "上班"}\n` +
    nameInfo +
    `\n💡 資料來源：政府行政機關辦公日曆表`;

  return [msg1, msg2];
}

/**
 * 建構下次放假報告
 * @returns {string[]} 兩則訊息：[話術+倒數, 假期詳細]
 */
function buildNextHolidayReport(records, nextIdx, consecutive, daysAway) {
  const firstRecord = records[nextIdx];
  const lastRecord = records[nextIdx + consecutive - 1];
  const isLongWeekend = consecutive >= 3;
  const talkLine = getRandomTalk(isLongWeekend ? "連假前夕" : "下次放假");

  const msg1 = talkLine
    ? `${talkLine}\n⏰ 再 ${daysAway} 天就放假了！`
    : `⏰ 再 ${daysAway} 天就放假了！`;

  let holidayInfo;
  if (consecutive === 1) {
    holidayInfo = `📅 假期：${formatDate(firstRecord.date)}\n`;
    if (firstRecord.name) holidayInfo += `🎉 名稱：${firstRecord.name}\n`;
  } else {
    const names = [
      ...new Set(
        records
          .slice(nextIdx, nextIdx + consecutive)
          .map((r) => r.name)
          .filter(Boolean)
      ),
    ];
    holidayInfo =
      `📅 假期：${formatDate(firstRecord.date)} ~ ${formatDate(lastRecord.date)}\n` +
      `📆 天數：共 ${consecutive} 天\n`;
    if (names.length > 0) holidayInfo += `🎉 包含：${names.join("、")}\n`;
  }

  const statusEmoji = getWorkStatusEmoji("是");
  const msg2 =
    `${statusEmoji} 下次放假資訊\n\n` +
    holidayInfo +
    `\n💡 資料來源：政府行政機關辦公日曆表`;

  return [msg1, msg2];
}
