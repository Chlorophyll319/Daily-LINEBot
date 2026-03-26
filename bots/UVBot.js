import { BaseBot } from "./BaseBot.js";
import { getDailyUvIndex } from "../data/miniBotPhrases/uv/UVAdapter.js";
import { getUvReport } from "../services/UVService.js";
import mongoDB from "../database/mongoDB.js";

// 紫外線查詢指令
const UV_COMMANDS = ["紫外線", "需要防曬嗎", "UV", "uv"];

// 預設城市
const DEFAULT_CITY = "臺北市";

/**
 * 紫外線機器人 - 處理紫外線指數查詢
 */
export class UVBot extends BaseBot {
  constructor() {
    super("UVBot");
    console.log("UVBot initialized.");
  }

  /**
   * 判斷是否能處理該消息
   */
  canHandle(message) {
    return UV_COMMANDS.includes(message);
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`UVBot processing: ${message} for user: ${userId}`);

    try {
      return await this.handleUvQuery(userId);
    } catch (error) {
      console.error("UVBot error:", error.message);
      return "抱歉，目前無法取得紫外線資料 (´･ω･`) 請稍後再試！";
    }
  }

  /**
   * 處理紫外線查詢
   */
  async handleUvQuery(userId) {
    const userCity = await this.getUserDefaultCity(userId);
    const locations = await getDailyUvIndex();

    if (!locations) {
      throw new Error("無法取得紫外線資料");
    }

    return getUvReport(locations, userCity);
  }

  /**
   * 取得使用者預設城市 - 純讀取，無副作用
   */
  async getUserDefaultCity(userId) {
    try {
      const userData = await mongoDB.getUserData(userId);
      return userData?.city || DEFAULT_CITY;
    } catch (error) {
      console.error("Error getting user city, using default:", error.message);
      return DEFAULT_CITY;
    }
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    return `☀️ 紫外線機器人功能：
• 紫外線 / 需要防曬嗎 / UV - 查詢所在城市今日紫外線指數`;
  }
}
