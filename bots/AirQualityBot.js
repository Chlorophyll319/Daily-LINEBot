import { BaseBot } from "./BaseBot.js";
import { getAirQualityReport } from "../services/AirQualityService.js";
import { getRealtimeAqi } from "../data/miniBotPhrases/airQuality/AirQualityAdapter.js";
import mongoDB from "../database/mongoDB.js";

// 空氣品質查詢指令
const AIR_QUALITY_COMMANDS = ["空氣品質", "空氣", "AQI", "aqi", "PM2.5", "pm2.5"];

// 預設城市
const DEFAULT_CITY = "臺北市";

/**
 * 空氣品質機器人 - 處理 AQI 相關查詢
 */
export class AirQualityBot extends BaseBot {
  constructor() {
    super("AirQualityBot");
    console.log("AirQualityBot initialized.");
  }

  /**
   * 判斷是否能處理該消息
   */
  canHandle(message) {
    return AIR_QUALITY_COMMANDS.includes(message);
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`AirQualityBot processing: ${message} for user: ${userId}`);

    try {
      return await this.handleAirQualityQuery(userId);
    } catch (error) {
      console.error("AirQualityBot error:", error.message);
      return "抱歉，目前無法取得空氣品質資料 (´･ω･`) 請稍後再試！";
    }
  }

  /**
   * 處理空氣品質查詢
   */
  async handleAirQualityQuery(userId) {
    const userCity = await this.getUserDefaultCity(userId);
    const aqiData = await getRealtimeAqi();

    if (!aqiData) {
      throw new Error("無法取得 AQI 資料");
    }

    return getAirQualityReport(aqiData, userCity);
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
    return `🌬️ 空氣品質機器人功能：
• 空氣品質 / AQI / PM2.5 - 查詢所在城市的即時空氣品質`;
  }
}
