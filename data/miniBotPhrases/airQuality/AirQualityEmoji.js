// 空氣品質圖示模組 - 單純的映射邏輯，不混雜其他業務

// AQI 等級對應 emoji 映射表
const AQI_LEVEL_EMOJI_MAP = {
  良好: "🌿",
  普通: "🌤️",
  對敏感族群不健康: "😷",
  對所有族群不健康: "🏭",
  非常不健康: "☣️",
  危害: "💀",
};

/**
 * 根據 AQI 數值回傳對應表情符號
 * @param {number} aqiValue - AQI 數值
 * @returns {string} 表情符號
 */
export function getAqiEmoji(aqiValue) {
  if (aqiValue === null || aqiValue === undefined) return "🌿";
  const level = getAqiLevelName(aqiValue);
  return AQI_LEVEL_EMOJI_MAP[level] ?? "🌿";
}

/**
 * 根據 AQI 等級名稱回傳對應表情符號
 * @param {string} levelName - AQI 等級名稱
 * @returns {string} 表情符號
 */
export function getAqiEmojiByLevel(levelName) {
  return AQI_LEVEL_EMOJI_MAP[levelName] ?? "🌿";
}

/**
 * 根據 AQI 數值回傳等級名稱
 * @param {number} aqiValue - AQI 數值
 * @returns {string} 等級名稱
 */
export function getAqiLevelName(aqiValue) {
  if (aqiValue <= 50) return "良好";
  if (aqiValue <= 100) return "普通";
  if (aqiValue <= 150) return "對敏感族群不健康";
  if (aqiValue <= 200) return "對所有族群不健康";
  if (aqiValue <= 300) return "非常不健康";
  return "危害";
}
