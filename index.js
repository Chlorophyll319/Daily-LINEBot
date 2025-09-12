import "dotenv/config";
console.log("🌟 黛栗天氣機器人啟動中... 新版本來了！設計真棒 ٩(◕‿◕)۶");

import linebot from "linebot";
import {
  weeklyWeather,
  setUserCity,
  parseCityCommand,
} from "./module/weatherBot.js";
import mongoDB from "./database/mongoDB.js";

console.log("📦 所有模組載入完成！準備開始為好朋友們服務～");

// 主要啟動函數
(async () => {
  try {
    // 初始化 MongoDB 連線
    await mongoDB.connectDB();
    console.log("✅ MongoDB 連線已建立！");
  } catch (error) {
    console.error("💥 MongoDB 連線失敗：", error.message);
    process.exit(1);
  }

  // 建立 LINE Bot 實例
  const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  console.log("🤖 LINE Bot 設定完成！準備監聽訊息...");

  // 監聽訊息事件 - 重構後的簡潔版本
  bot.on("message", async (event) => {
    try {
      // 修正變數命名問題 - 統一變數命名
      const userMessage = event.message.text;
      const userId = event.source.userId; // 統一使用 userId

      console.log(`📬 收到來自 ${userId} 的訊息：「${userMessage}」`);

      // 處理不同類型的指令
      if (userMessage === "一週天氣") {
        console.log("🌤️ 處理一週天氣查詢...");
        const weatherReport = await weeklyWeather(userMessage, userId);
        console.log("📤 準備回傳天氣預報...");
        event.reply(weatherReport);
      } else if (userMessage.startsWith("設定城市")) {
        console.log("🏙️ 處理城市設定指令...");
        const cityName = parseCityCommand(userMessage);

        if (cityName) {
          const result = await setUserCity(userId, cityName);
          event.reply(result);
        } else {
          event.reply(
            "設定格式錯誤 (´･ω･`) 請使用：設定城市 城市名稱\n例如：設定城市 台北市"
          );
        }
      } else if (userMessage === "幫助" || userMessage === "help") {
        const helpMessage = `🤖 黛栗天氣機器人指令說明：
        
🌤️ 一週天氣 - 查看您所在城市的七天天氣預報
🏙️ 設定城市 城市名稱 - 設定您的預設城市
📋 幫助 - 顯示這個說明

例如：
• 一週天氣
• 設定城市 台北市
• 設定城市 高雄市

✨ 享受天氣預報服務吧！`;

        event.reply(helpMessage);
      } else {
        // 未知指令
        console.log("❓ 收到未知指令，提供幫助提示");
        event.reply(
          "不太懂您的意思 (´･ω･`) \n試試看輸入「幫助」查看可用指令，或直接輸入「一週天氣」查看天氣預報！"
        );
      }

      console.log("✅ 訊息處理完成！");
    } catch (error) {
      console.error("💥 處理訊息時發生錯誤，這不應該發生：", error.message);
      event.reply("抱歉，系統出現了一點小問題 (´･ω･`) 請稍後再試！");
    }
  });

  // 優雅關閉處理
  process.on("SIGTERM", async () => {
    console.log("👋 收到關閉信號，準備優雅關閉...");
    await mongoDB.closeDB();
    console.log("🌙 黛栗準備休息了，晚安～");
    process.exit(0);
  });

  // 啟動 Bot - 動態端口避免衝突
  const PORT = process.env.PORT || 8080;
  bot.listen("/", PORT, () => {
    console.log("🎉 黛栗天氣機器人已啟動！");
    console.log("🌟 新版本特色：");
    console.log("   ✨ MongoDB 整合完成");
    console.log("   🚀 程式碼大幅簡化");
    console.log("   🎯 支援個人化城市設定");
    console.log("   😄 保留有趣的 console.log");
    console.log(`📍 服務位址：localhost:${PORT}`);
    console.log("🤖 準備為好朋友們提供天氣服務！ ٩(◕‿◕)۶");
  });
})();
