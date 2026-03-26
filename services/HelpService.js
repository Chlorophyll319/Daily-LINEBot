/**
 * 幫助服務 - 產生附帶 Quick Reply 按鈕的幫助訊息
 */

// Quick Reply 按鈕定義 - 每個 text 對應各 Bot 的觸發詞
export const HELP_QUICK_REPLY_ITEMS = [
  { label: "🌤️ 天氣", text: "天氣" },
  { label: "🌬️ 空氣品質", text: "空氣品質" },
  { label: "🌍 地震查詢", text: "地震" },
  { label: "☀️ 紫外線", text: "紫外線" },
  { label: "📅 放假查詢", text: "放假" },
  { label: "🎋 今日運勢", text: "運勢" },
];

/**
 * 建立幫助訊息物件（附帶 Quick Reply 按鈕）
 *
 * @param {string} text - 訊息主文字
 * @returns {Object} LINE Messaging API 訊息物件
 */
export function buildHelpMessage(text) {
  return {
    type: "text",
    text,
    quickReply: {
      items: HELP_QUICK_REPLY_ITEMS.map((item) => ({
        type: "action",
        action: {
          type: "message",
          label: item.label,
          text: item.text,
        },
      })),
    },
  };
}
