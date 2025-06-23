import "dotenv/config";
console.log("[index.js] 程式開始執行");
import linebot from "linebot";
import { Aweek } from "./Module/miniBot-weather.js";
import * as weatherTool from "./Library/weatherTool.js";
import * as weatherApi from "./Api/weatherApi.js";
// console.log(weatherTool);
// import sheetDB from "./friends/sheetDB.js";
// console.log(sheetDB);

// 匯入環境檔
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// 監聽文字訊息事件
// 💬 監聽訊息事件
/*
bot.on("message", async (event) => {
  const userMessage = event.message.text;
  const userID = event.source.userId;
  const msg = userMessage;

  if (msg === "一週天氣") {
    try {
      const say = await Aweek(userMessage, userID);
      return event.reply(say);
    } catch (err) {
      console.error("黛莉好暈好暈，要檢查啦👉 ", err);
    }
  }

  // 其他
});
*/

bot.on("message", async (event) => {
  try {
    const userID = event.source.userId;
    const msg = event.message.text;
    console.log("[使用者ID]", userID, "[收到訊息]", msg);
    if (msg === "一週天氣") {
      const say = await Aweek(userID);
      console.log("[Aweek 回應]", say);
      event.reply(say);
    }
    // 可加入更多指令分支
  } catch (err) {
    console.error("[bot.on message] 發生錯誤：", err);
  }
});

// 黛栗啟動
bot.listen("/", 3000, () => {
  console.log("(呆栗起床中)呆栗聽到你在呼喚呆栗喔，呆栗已經起來ㄌ٩(ˊ〇ˋ*)و");
});
