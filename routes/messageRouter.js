import { WeatherBot } from "../bots/WeatherBot.js";

// 初始化所有 bots
const bots = [
  new WeatherBot(),
  // TODO: 其他 bots (AirBot, EarthquakeBot, etc.) 將在這裡添加
];

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

    // 特殊指令：幫助
    if (userMessage === "幫助" || userMessage === "help") {
      const helpMessage = generateHelpMessage();
      event.reply(helpMessage);
      return;
    }

    // 尋找能處理該消息的 bot
    const bot = bots.find((bot) => bot.canHandle(userMessage));

    if (bot) {
      console.log(`Routing to ${bot.name}`);
      const response = await bot.handle(userMessage, userId);
      event.reply(response);
    } else {
      // 沒有 bot 能處理
      console.log("No bot can handle this message");
      event.reply(
        "不太懂您的意思 (´･ω･`) \\n試試看輸入「幫助」查看可用指令，或直接輸入「一週天氣」查看天氣預報！"
      );
    }

    console.log("Message processing completed.");
  } catch (error) {
    console.error("Message handling error:", error.message);
    event.reply("抱歉，系統出現了一點小問題 (´･ω･`) 請稍後再試！");
  }
}

/**
 * 生成整合所有 bots 的幫助信息
 */
function generateHelpMessage() {
  let helpMessage = "🤖 機器人指令說明：\\n\\n";

  bots.forEach((bot) => {
    helpMessage += bot.getHelpInfo() + "\\n\\n";
  });

  helpMessage += "📋 輸入「幫助」或「help」查看此說明\\n";
  helpMessage += "✨ 享受服務吧！";

  return helpMessage;
}
