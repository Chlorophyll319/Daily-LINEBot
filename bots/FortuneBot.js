import { BaseBot } from "./BaseBot.js";
import { getFortuneReading } from "../services/FortuneService.js";

// 常數定義，避免重複創建
const FORTUNE_KEYWORDS = Object.freeze([
  "抽籤",
  "求籤",
  "籤詩",
  "運勢",
  "淺草",
  "占卜",
  "問事",
  "問運",
  "祈福",
  "卜卦",
  "問籤",
]);

const QUESTION_CATEGORIES = Object.freeze({
  愛情: ["愛情", "戀愛", "感情", "交往", "結婚", "姻緣"],
  事業: ["工作", "事業", "職業", "升遷", "生意", "創業"],
  學業: ["學業", "考試", "升學", "求學", "功課"],
  健康: ["健康", "疾病", "身體", "醫療", "康復"],
  財運: ["財運", "金錢", "財富", "投資", "理財", "賺錢"],
  旅行: ["旅行", "出遊", "旅遊", "出國", "行程"],
  搬家: ["搬家", "遷移", "搬遷", "換屋"],
  蓋房: ["蓋房", "建房", "新居", "購屋", "買房"],
});

const FORTUNE_NUMBER_PATTERN = /(\d+)\s*號?籤?/;

/**
 * 淺草籤詩機器人 - 提供抽籤和解籤服務
 */
export class FortuneBot extends BaseBot {
  constructor() {
    super("FortuneBot");
  }

  /**
   * 判斷是否能處理該消息
   * @param {string} message 用戶消息
   * @returns {boolean} 是否能處理
   */
  canHandle(message) {
    return FORTUNE_KEYWORDS.some((keyword) => message.includes(keyword));
  }

  /**
   * 解析籤號
   * @param {string} message 用戶消息
   * @returns {number|null} 籤號
   */
  parseNumber(message) {
    const match = message.match(FORTUNE_NUMBER_PATTERN);
    if (match) {
      const number = parseInt(match[1]);
      return number >= 1 && number <= 100 ? number : null;
    }
    return null;
  }

  /**
   * 解析問題類別
   * @param {string} message 用戶消息
   * @returns {string|null} 問題類別
   */
  parseCategory(message) {
    for (const [category, keywords] of Object.entries(QUESTION_CATEGORIES)) {
      if (keywords.some((keyword) => message.includes(keyword))) {
        return category;
      }
    }
    return null;
  }

  /**
   * 處理籤詩請求
   * @param {string} message 用戶消息
   * @param {string} userId 用戶 ID
   * @returns {Promise<string>} 籤詩回應
   */
  async handle(message, userId) {
    try {
      const number = this.parseNumber(message);
      const category = this.parseCategory(message);

      return await getFortuneReading(number, userId, category);
    } catch (error) {
      console.error("FortuneBot處理錯誤:", error);
      return "🤖 小機器人暫時故障中～請稍後再試試看喔！";
    }
  }

  /**
   * 獲取幫助信息
   * @returns {string} 幫助信息
   */
  getHelpInfo() {
    return `🎋 淺草籤詩機器人使用說明：

📝 抽籤方式：
• 「抽籤」「求籤」「運勢」- 隨機抽籤
• 「愛情運勢」- 針對感情問題抽籤
• 「事業運勢」- 針對工作問題抽籤
• 「第25號籤」- 查看特定籤號

🎯 支援問題類型：
💕 愛情、感情、姻緣
💼 工作、事業、升遷
📚 學業、考試、求學
💊 健康、疾病、身體
💰 財運、投資、理財
✈️ 旅行、出遊、行程
🏠 搬家、購屋、建房

🤖 小提醒：虔誠的心最重要喔！`;
  }
}
