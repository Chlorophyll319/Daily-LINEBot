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
    throw new Error("Not implemented");
  }

  /**
   * 處理消息
   */
  async handle(message, userId) {
    throw new Error("Not implemented");
  }

  /**
   * 處理地震查詢
   */
  async handleEarthquakeQuery() {
    throw new Error("Not implemented");
  }

  /**
   * 獲取幫助信息
   */
  getHelpInfo() {
    throw new Error("Not implemented");
  }
}
