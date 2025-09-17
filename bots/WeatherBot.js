import { BaseBot } from "./BaseBot.js";
import { getWeatherReport } from "../services/WeatherService.js";
import { getWeeklyForecast } from "../data/miniBotPhrases/weather/CwaWeatherAdapter.js";
import {
  handleWeatherError,
  createWeatherError,
} from "../services/WeatherError.js";
import mongoDB from "../database/mongoDB.js";

// 支援的城市清單 - 統一定義，消除重複
const SUPPORTED_CITIES = [
  "臺北市",
  "新北市",
  "桃園市",
  "臺中市",
  "臺南市",
  "高雄市",
  "基隆市",
  "新竹縣",
  "新竹市",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "嘉義市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

// 天氣查詢指令
const WEATHER_COMMANDS = ["一週天氣", "天氣", "weather"];

// 預設城市
const DEFAULT_CITY = "臺北市";

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
    return (
      WEATHER_COMMANDS.includes(message) ||
      message.startsWith("設定城市") ||
      SUPPORTED_CITIES.includes(message.trim())
    );
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`WeatherBot processing: ${message} for user: ${userId}`);

    try {
      if (message.startsWith("設定城市")) {
        return await this.handleCitySetting(message, userId);
      }

      if (SUPPORTED_CITIES.includes(message.trim())) {
        return await this.handleCityWeatherQuery(message.trim(), userId);
      }

      if (WEATHER_COMMANDS.includes(message)) {
        return await this.handleWeatherQuery(userId);
      }

      throw createWeatherError.invalidCommand(message);
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

    const userCity = await this.getUserDefaultCity(userId);
    const weatherData = await getWeeklyForecast();

    if (!weatherData) {
      throw createWeatherError.apiError("無法取得天氣預報資料");
    }

    return getWeatherReport(weatherData, userCity, 7);
  }

  /**
   * 處理城市設定
   */
  async handleCitySetting(message, userId) {
    if (message.trim() === "設定城市") {
      return this.createCitySelectionMenu();
    }

    const cityName = this.parseCityCommand(message);
    if (!cityName) {
      throw createWeatherError.invalidCommand("設定城市指令格式錯誤");
    }

    return await this.setCityForUser(userId, cityName);
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
   * 為用戶設定城市 - 統一的城市設定邏輯
   */
  async setCityForUser(userId, cityName) {
    try {
      await mongoDB.saveUserData(userId, cityName);
      return `設定完成！您的預設城市已設為 ${cityName}`;
    } catch (error) {
      throw createWeatherError.databaseError("設定預設城市", error);
    }
  }

  /**
   * 解析城市設定指令
   */
  parseCityCommand(message) {
    const cityPattern = /設定城市\s*(.+)/;
    const match = message.match(cityPattern);

    if (match) {
      const cityName = match[1].trim();
      console.log(`Detected city setting command: ${cityName}`);
      return cityName;
    }

    return null;
  }

  /**
   * 處理指定城市的天氣查詢（不設定為預設城市）
   */
  async handleCityWeatherQuery(cityName, userId) {
    const weatherData = await getWeeklyForecast();

    if (!weatherData) {
      throw createWeatherError.apiError("無法取得天氣預報資料");
    }

    return getWeatherReport(weatherData, cityName, 7);
  }

  /**
   * 創建城市選擇選單 (Flex Message)
   */
  createCitySelectionMenu() {
    const cityButtons = SUPPORTED_CITIES.map((city) => ({
      type: "button",
      style: "secondary",
      height: "md",
      action: {
        type: "message",
        label: city,
        text: `設定城市 ${city}`,
      },
    }));

    return {
      type: "flex",
      altText: "請選擇您的城市",
      contents: {
        type: "bubble",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "🏙️ 請選擇您的城市",
              weight: "bold",
              size: "lg",
              color: "#1DB446",
            },
          ],
          paddingBottom: "md",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: cityButtons,
          spacing: "xs",
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "點選城市即可完成設定",
              size: "sm",
              color: "#666666",
              align: "center",
            },
          ],
          paddingTop: "md",
        },
      },
    };
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    return `🌤️ 天氣機器人功能：
• 一週天氣 - 查看七天天氣預報
• 設定城市 - 選擇預設城市`;
  }
}
