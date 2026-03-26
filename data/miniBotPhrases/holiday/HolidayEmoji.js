/**
 * 放假日 emoji - 依假日類型與工作狀態對應
 */

/**
 * 依 holidaycategory 取得 emoji
 * @param {string} category - 假日類別
 * @returns {string} emoji
 */
export function getHolidayCategoryEmoji(category) {
  if (!category) return "📅";
  if (category.includes("紀念日") || category.includes("節日")) return "🎉";
  if (category.includes("補假")) return "🎁";
  if (category.includes("調整放假")) return "🗓️";
  if (category.includes("調整上班")) return "💼";
  if (category.includes("彈性")) return "✨";
  if (category.includes("星期六") || category.includes("星期日")) return "🌅";
  return "📅";
}

/**
 * 依 isholiday 取得工作/放假 emoji
 * @param {string} isholiday - "是" 或 "否"
 * @returns {string} emoji
 */
export function getWorkStatusEmoji(isholiday) {
  return isholiday === "是" ? "🏖️" : "💼";
}
