/**
 * 幫助服務 - 主選單 Flex Message 與子選單 Quick Reply
 */

/** 子選單觸發詞 */
export const SUBMENU_TRIGGERS = ["天氣選單", "算命選單", "放假選單"];

/**
 * 建立主選單 Flex Message（目錄卡片）
 * @returns {Object} LINE Flex Message 物件
 */
export function buildMainMenuMessage() {
  return {
    type: "flex",
    altText: "🤖 幫助選單 - 請選擇功能分類",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "🤖 幫助選單",
            weight: "bold",
            size: "xl",
            color: "#ffffff",
            align: "center",
          },
          {
            type: "text",
            text: "請選擇功能分類",
            size: "sm",
            color: "#ddeeff",
            align: "center",
            margin: "xs",
          },
        ],
        backgroundColor: "#27ACB2",
        paddingAll: "20px",
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        paddingAll: "16px",
        contents: [
          makeMenuButton("🌤️ 天氣", "天氣選單", "primary"),
          makeMenuButton("🎋 算命", "算命選單", "primary"),
          makeMenuButton("📅 放假", "放假選單", "primary"),
          makeMenuButton("🌬️ 空氣品質", "空氣品質", "secondary"),
          makeMenuButton("🌍 地震", "地震", "secondary"),
          makeMenuButton("☀️ 紫外線", "紫外線", "secondary"),
        ],
      },
    },
  };
}

function makeMenuButton(label, text, style) {
  return {
    type: "button",
    style,
    action: {
      type: "message",
      label,
      text,
    },
    margin: "xs",
  };
}

/**
 * 建立天氣子選單 Quick Reply
 * @returns {Object} LINE 訊息物件（附 Quick Reply）
 */
export function buildWeatherSubMenu() {
  return {
    type: "text",
    text: "🌤️ 天氣功能，請選擇：",
    quickReply: {
      items: [
        makeQuickReplyItem("一週天氣", "一週天氣"),
        makeQuickReplyItem("設定城市", "設定城市"),
      ],
    },
  };
}

/**
 * 建立算命子選單 Quick Reply
 * @returns {Object} LINE 訊息物件（附 Quick Reply）
 */
export function buildFortuneSubMenu() {
  return {
    type: "text",
    text: "🎋 算命功能，請選擇：",
    quickReply: {
      items: [
        makeQuickReplyItem("抽籤（隨機）", "抽籤（隨機）"),
        makeQuickReplyItem("擲杯問神", "擲杯"),
        makeQuickReplyItem("愛情運勢", "愛情運勢"),
        makeQuickReplyItem("事業運勢", "事業運勢"),
        makeQuickReplyItem("學業運勢", "學業運勢"),
        makeQuickReplyItem("健康運勢", "健康運勢"),
        makeQuickReplyItem("財運", "財運"),
        makeQuickReplyItem("旅行運勢", "旅行運勢"),
      ],
    },
  };
}

/**
 * 建立放假子選單 Quick Reply
 * @returns {Object} LINE 訊息物件（附 Quick Reply）
 */
export function buildHolidaySubMenu() {
  return {
    type: "text",
    text: "📅 放假功能，請選擇：",
    quickReply: {
      items: [
        makeQuickReplyItem("今天要上班嗎", "今天要上班嗎"),
        makeQuickReplyItem("下次放假", "下次放假"),
      ],
    },
  };
}

function makeQuickReplyItem(label, text) {
  return {
    type: "action",
    action: {
      type: "message",
      label,
      text,
    },
  };
}
