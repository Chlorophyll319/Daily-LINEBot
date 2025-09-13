import "dotenv/config";
console.log("LINE Bot starting...");

import linebot from "linebot";
import { handleMessage } from "./routes/messageRouter.js";
import mongoDB from "./database/mongoDB.js";

console.log("Modules loaded.");

// 主要啟動函數
(async () => {
  try {
    // 初始化 MongoDB 連線
    await mongoDB.connectDB();
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }

  // 建立 LINE Bot 實例
  const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  console.log("LINE Bot configured.");

  // 監聽訊息事件 - 委託給路由處理器
  bot.on("message", handleMessage);

  // 優雅關閉處理
  process.on("SIGTERM", async () => {
    console.log("Received shutdown signal, gracefully shutting down...");
    await mongoDB.closeDB();
    console.log("Database connections closed.");
    process.exit(0);
  });

  // 啟動 Bot
  const PORT = process.env.PORT || 8080;
  bot.listen("/", PORT, () => {
    console.log("LINE Bot started successfully!");
    console.log("Features:");
    console.log("  - MongoDB integration");
    console.log("  - Clean architecture");
    console.log("  - Modular bot design");
    console.log(`Server running on port: ${PORT}`);
  });
})();
