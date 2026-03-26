/**
 * 紫外線 emoji - 依 UV 指數等級對應
 * WHO 標準：
 *   0-2  低（Low）
 *   3-5  中等（Moderate）
 *   6-7  高（High）
 *   8-10 非常高（Very High）
 *   11+  極端（Extreme）
 */

/**
 * 依 UV Index 數值取得等級名稱
 * @param {number} uvIndex
 * @returns {string}
 */
export function getUvLevelName(uvIndex) {
  if (uvIndex <= 2) return "低";
  if (uvIndex <= 5) return "中等";
  if (uvIndex <= 7) return "高";
  if (uvIndex <= 10) return "非常高";
  return "極端";
}

/**
 * 依 UV Index 數值取得 emoji
 * @param {number} uvIndex
 * @returns {string}
 */
export function getUvEmoji(uvIndex) {
  if (uvIndex <= 2) return "😎";
  if (uvIndex <= 5) return "🌤️";
  if (uvIndex <= 7) return "☀️";
  if (uvIndex <= 10) return "🔆";
  return "🔥";
}

/**
 * 依 UV Index 數值取得防曬建議
 * @param {number} uvIndex
 * @returns {string}
 */
export function getUvAdvice(uvIndex) {
  if (uvIndex <= 2) return "無需特別防曬措施";
  if (uvIndex <= 5) return "建議塗防曬乳、戴帽子";
  if (uvIndex <= 7) return "建議塗防曬乳、戴帽子與太陽眼鏡";
  if (uvIndex <= 10) return "盡量避免正午戶外活動，防曬不可少";
  return "避免戶外活動，全套防曬必備";
}
