import { WeatherBot } from "../bots/WeatherBot.js";
import { FortuneBot } from "../bots/FortuneBot.js";
import { AirQualityBot } from "../bots/AirQualityBot.js";
import { EarthquakeBot } from "../bots/EarthquakeBot.js";
import { HolidayBot } from "../bots/HolidayBot.js";
import { UVBot } from "../bots/UVBot.js";
import { KnockKnockBot } from "../bots/KnockKnockBot.js";
import { DivineBot } from "../bots/DivineBot.js";
import { FallbackBot } from "../bots/FallbackBot.js";
import {
  buildMainMenuMessage,
  buildWeatherSubMenu,
  buildFortuneSubMenu,
  buildHolidaySubMenu,
} from "../services/HelpService.js";
import { checkRateLimit } from "../services/RateLimiter.js";

// 初始化所有 bots
const bots = [
  new WeatherBot(),
  new FortuneBot(),
  new AirQualityBot(),
  new EarthquakeBot(),
  new HolidayBot(),
  new UVBot(),
  new KnockKnockBot(),
  new DivineBot(),
  new FallbackBot(),
];

// 子選單觸發詞對應處理器
const SUBMENU_HANDLERS = {
  天氣選單: buildWeatherSubMenu,
  算命選單: buildFortuneSubMenu,
  放假選單: buildHolidaySubMenu,
};

/**
 * 消息路由處理器 - 使用 bot 架構分發消息
 *
 * @param {Object} event LINE Bot 事件對象
 */
export async function handleMessage(event) {
  try {
    const userMessage = event.message.text;
    const userId = event.source.userId;

    console.log(`Message from ${userId}: ${userMessage}`);

    // Rate limiting：每 userId 每分鐘最多 10 則
    if (!checkRateLimit(userId)) {
      event.reply("窩被你搞累了，休息一下 😮‍💨");
      return;
    }

    // 特殊指令：幫助 → 主選單 Flex Message
    if (userMessage === "幫助" || userMessage === "help") {
      event.reply(buildMainMenuMessage());
      return;
    }

    // 子選單觸發詞 → Quick Reply 細項
    if (SUBMENU_HANDLERS[userMessage]) {
      event.reply(SUBMENU_HANDLERS[userMessage]());
      return;
    }

    // 尋找能處理該消息的 bot
    const bot = bots.find((bot) => bot.canHandle(userMessage));

    if (bot) {
      console.log(`Routing to ${bot.name}`);
      const response = await bot.handle(userMessage, userId);
      event.reply(response);
    }

    console.log("Message processing completed.");
  } catch (error) {
    console.error("Message handling error:", error.message);
    event.reply("抱歉，系統出現了一點小問題 (´･ω･`) 請稍後再試！");
  }
}
