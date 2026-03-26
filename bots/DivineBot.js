import { BaseBot } from "./BaseBot.js";
import { getDivineReading } from "../services/DivineService.js";

const DIVINE_KEYWORDS = Object.freeze([
  "擲杯",
  "問杯",
  "卜杯",
  "擲個杯",
  "問問看",
  "問神",
  "擲筊",
]);

/**
 * 擲杯機器人 — 向神明請示，回傳聖杯、笑杯或陰杯結果
 */
export class DivineBot extends BaseBot {
  constructor() {
    super("DivineBot");
  }

  canHandle(message) {
    return DIVINE_KEYWORDS.some((kw) => message.includes(kw));
  }

  async handle(message, userId) {
    try {
      return getDivineReading();
    } catch (error) {
      console.error("DivineBot 處理錯誤:", error);
      return "🤖 擲杯系統暫時故障中，請稍後再試～";
    }
  }

  getHelpInfo() {
    return `⛩️ 擲杯（問神）使用方式：

輸入以下任一詞即可擲杯：
「擲杯」「問杯」「卜杯」「擲筊」「問神」

🎴 可能的結果：
✅ 聖杯 — 神明同意（50%）
😄 笑杯 — 神明笑而不答（25%）
❌ 陰杯 — 神明不同意（25%）

🤖 小提醒：心誠則靈！`;
  }
}
