import { BaseBot } from "./BaseBot.js";
import { getWeatherReport } from "../services/WeatherService.js";
import { getWeeklyForecast } from "../adapters/CwaWeatherAdapter.js";
import {
  handleWeatherError,
  createWeatherError,
} from "../services/WeatherError.js";
import mongoDB from "../database/mongoDB.js";

/**
 * 天氣機器人 - 處理天氣相關查詢和城市設定
 */
export class WeatherBot extends BaseBot {
  constructor() {
    super("WeatherBot");
    console.log("WeatherBot initialized.");
  }

  /**
   * 判斷是否能處理該消息
   */
  canHandle(message) {
    const weatherCommands = ["一週天氣", "天氣", "weather"];

    const cityCommands = message.startsWith("設定城市");

    return weatherCommands.includes(message) || cityCommands;
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`WeatherBot processing: ${message} for user: ${userId}`);

    try {
      // 城市設定指令
      if (message.startsWith("設定城市")) {
        return await this.handleCitySetting(message, userId);
      }

      // 天氣查詢指令
      if (
        message === "一週天氣" ||
        message === "天氣" ||
        message === "weather"
      ) {
        return await this.handleWeatherQuery(userId);
      }

      return "抱歉，我不知道該如何處理這個天氣相關的請求。";
    } catch (error) {
      console.error("WeatherBot error:", error.message);
      return handleWeatherError(error);
    }
  }

  /**
   * 處理天氣查詢
   */
  async handleWeatherQuery(userId) {
    console.log(`Processing weather query for user: ${userId}`);

    // 1. 取得用戶城市
    const userCity = await this.getUserDefaultCity(userId);

    // 2. 取得天氣資料
    console.log("Fetching weather data...");
    const weatherData = await getWeeklyForecast();

    if (!weatherData) {
      throw createWeatherError.apiError("無法取得天氣預報資料");
    }

    // 3. 生成天氣預報
    console.log(`Generating weather report for ${userCity}...`);
    const report = getWeatherReport(weatherData, userCity, 7);

    console.log("Weather report generated successfully.");
    return report;
  }

  /**
   * 處理城市設定
   */
  async handleCitySetting(message, userId) {
    const cityName = this.parseCityCommand(message);

    if (!cityName) {
      return "設定格式錯誤 (´･ω･`) 請使用：設定城市 城市名稱\\n例如：設定城市 台北市";
    }

    console.log(`Setting city for user ${userId}: ${cityName}`);

    try {
      await mongoDB.saveUserData(userId, cityName);
      console.log(`City set successfully: ${cityName} for user: ${userId}`);
      return `✨ 設定完成！您的預設城市已設為 ${cityName}\\n下次查詢天氣時會直接使用這個城市的資料喔！`;
    } catch (error) {
      console.error("Failed to set city:", error.message);
      return handleWeatherError(
        createWeatherError.databaseError("設定預設城市", error)
      );
    }
  }

  /**
   * 取得使用者預設城市
   */
  async getUserDefaultCity(userId) {
    try {
      const userData = await mongoDB.getUserData(userId);

      if (userData && userData.city) {
        console.log(`Using user's default city: ${userData.city}`);
        return userData.city;
      } else {
        console.log(`New user, setting default city: 新北市`);
        // 自動幫新用戶設定新北市為預設
        await mongoDB.saveUserData(userId, "新北市");
        return "新北市";
      }
    } catch (error) {
      console.error("Error getting user city, using fallback:", error.message);
      return "新北市";
    }
  }

  /**
   * 解析城市設定指令
   */
  parseCityCommand(message) {
    const cityPattern = /設定城市\\s*(.+)/;
    const match = message.match(cityPattern);

    if (match) {
      const cityName = match[1].trim();
      console.log(`Detected city setting command: ${cityName}`);
      return cityName;
    }

    return null;
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    return `🌤️ 天氣機器人功能：
• 一週天氣 - 查看七天天氣預報
• 設定城市 [城市名稱] - 設定預設城市
例如：設定城市 台北市`;
  }
}
