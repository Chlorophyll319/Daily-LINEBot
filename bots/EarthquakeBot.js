import { BaseBot } from "./BaseBot.js";
import { getEarthquakeReport } from "../services/EarthquakeService.js";
import { getLatestEarthquake } from "../data/miniBotPhrases/earthquake/EarthquakeAdapter.js";

// 地震查詢指令
const EARTHQUAKE_COMMANDS = ["地震", "剛剛有地震嗎", "是哪裡搖", "earthquake"];

/**
 * 地震機器人 - 處理地震相關查詢
 */
export class EarthquakeBot extends BaseBot {
  constructor() {
    super("EarthquakeBot");
    console.log("EarthquakeBot initialized.");
  }

  /**
   * 判斷是否能處理該消息
   */
  canHandle(message) {
    return EARTHQUAKE_COMMANDS.includes(message);
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`EarthquakeBot processing: ${message} for user: ${userId}`);

    try {
      return await this.handleEarthquakeQuery();
    } catch (error) {
      console.error("EarthquakeBot error:", error.message);
      return "抱歉，目前無法取得地震資料 (´･ω･`) 請稍後再試！";
    }
  }

  /**
   * 處理地震查詢 - 取得最新顯著有感地震
   */
  async handleEarthquakeQuery() {
    const rawData = await getLatestEarthquake();

    if (!rawData) {
      throw new Error("無法取得地震資料");
    }

    return getEarthquakeReport(rawData);
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    return `地震機器人功能：
• 地震 / 剛剛有地震嗎 / 是哪裡搖 - 查詢最新顯著有感地震`;
  }
}
