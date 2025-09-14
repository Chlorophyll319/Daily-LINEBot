// 時間處理工具模組 - 單一職責，簡潔實用
// 天氣服務不應該關心時間格式化的細節

// 時段描述映射表 - 消除複雜的條件判斷
const TIME_SLOT_MAP = {
  "6-18": { emoji: "☀️", text: "白天" },
  "12-18": { emoji: "🌤️", text: "午後" },
  "0-12": { emoji: "🌅", text: "上午" },
  "0-6": { emoji: "🌃", text: "凌晨" },
  "18-24": { emoji: "🌆", text: "傍晚" },
  "18-6": { emoji: "🌙", text: "夜間" },
  "12-6": { emoji: "🌆", text: "午後至夜間" },
  default: { emoji: "🌤️", text: "時段" },
};

/**
 * 獲取時段描述 - 使用查表法，消除複雜邏輯
 */
export function getTimeSlotInfo(startTime, endTime) {
  const startHour = parseInt(startTime.slice(11, 13));
  const endHour = parseInt(endTime.slice(11, 13));
  const timeKey = `${startHour}-${endHour}`;

  return TIME_SLOT_MAP[timeKey] || TIME_SLOT_MAP.default;
}

/**
 * 格式化日期 - 簡單直接
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  return `${month}/${day} (${weekday})`;
}

/**
 * 檢查是否跨日 - 純函數，無副作用
 */
export function isSpanDays(startTime, endTime) {
  return startTime.slice(0, 10) !== endTime.slice(0, 10);
}
