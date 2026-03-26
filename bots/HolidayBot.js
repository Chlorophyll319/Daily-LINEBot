import { BaseBot } from "./BaseBot.js";
// import { getOfficialCalendar } from "../data/miniBotPhrases/holiday/HolidayAdapter.js";
// import { getHolidayReport } from "../services/HolidayService.js";

// 放假日查詢指令
const HOLIDAY_COMMANDS = ["今天要上班嗎", "下次放假", "放假", "連假", "holiday"];

/**
 * 放假日機器人 - 處理辦公日曆查詢
 */
export class HolidayBot extends BaseBot {
  constructor() {
    super("HolidayBot");
    console.log("HolidayBot initialized.");
  }

  /**
   * 判斷是否能處理該消息
   */
  canHandle(message) {
    return HOLIDAY_COMMANDS.includes(message);
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    console.log(`HolidayBot processing: ${message} for user: ${userId}`);

    try {
      return await this.handleHolidayQuery(message);
    } catch (error) {
      console.error("HolidayBot error:", error.message);
      return "抱歉，目前無法取得假日資料 (´･ω･`) 請稍後再試！";
    }
  }

  /**
   * 處理放假日查詢
   * TODO: 根據 message 區分「今天要上班嗎」vs「下次放假」
   */
  async handleHolidayQuery(message) {
    // TODO: implement
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    return `放假日機器人功能：
• 今天要上班嗎 - 查詢今天是否為工作日
• 下次放假 / 放假 / 連假 - 查詢最近的假期`;
  }
}
