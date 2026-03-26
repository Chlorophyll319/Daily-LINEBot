/**
 * 依震度等級取得 emoji
 * 台灣震度：1級、2級、3級、4級、5弱、5強、6弱、6強、7級
 * @param {string} intensityStr - 震度字串，例如 "4級"、"5弱"
 * @returns {string} emoji
 */
export function getEarthquakeEmoji(intensityStr) {
  if (!intensityStr) return "🌍";
  const s = String(intensityStr);
  if (s.includes("7")) return "🔴";
  if (s.includes("6強")) return "🔴";
  if (s.includes("6弱")) return "🟠";
  if (s.includes("5強")) return "🟠";
  if (s.includes("5弱")) return "🟡";
  if (s.includes("4")) return "🟡";
  if (s.includes("3")) return "🟢";
  if (s.includes("2")) return "🔵";
  if (s.includes("1")) return "🔵";
  return "🌍";
}

/**
 * 依芮氏規模取得 emoji
 * @param {number} magnitude - 芮氏規模數值
 * @returns {string} emoji
 */
export function getMagnitudeEmoji(magnitude) {
  const m = parseFloat(magnitude);
  if (isNaN(m)) return "📊";
  if (m >= 7.0) return "🔴";
  if (m >= 6.0) return "🟠";
  if (m >= 5.0) return "🟡";
  if (m >= 4.0) return "🟢";
  return "🔵";
}
