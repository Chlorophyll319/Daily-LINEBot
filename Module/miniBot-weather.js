import {
  userInfo,
  parseTwAweek,
  splitByDate,
  reformTwAweekByDay,
  // eslint-disable-next-line no-unused-vars
  reformTwAweekByTime,
} from "../Library/weatherTool.js";

// import sheetDB from "../friends/sheetDB.js";
import * as weatherApi from "../Api/weatherApi.js";

// mvp功能
// 匯入整理後api資料

/* 
選單
- 一週（7天）天氣預報
- 三天內天氣預報
*/

/* 
選單：- 一週（7天）天氣預報

一週各縣市（Api） 要做的事情：

預期效果，拿到以下資料

- 資料時間
- 天氣現象
- 最高氣溫
- 最低氣溫

要做的事情：
根據時間與內容寫成「報導式」的 一週天氣預報

整理成以下格式，例如：
第一天 天氣預報內容
第二天 天氣預報內容
第三天 天氣預報內容
第四天 天氣預報內容
第五天 天氣預報內容
第六天 天氣預報內容
第七天 天氣預報內容

從今天算往後七天的天氣預報即可
*/
export async function Aweek(userID) {
  const userCity = "新北市";
  const raw = await weatherApi.一週各縣市();

  // A. 取得預設城市的 API 對應索引
  const stepA_userSet = userInfo(userCity, raw);
  // B. 取得該城市的天氣資訊
  const stepB_userSetCityWeather = parseTwAweek(stepA_userSet);

  // C. 以日期分割整理 Wx/MinT/MaxT
  const stepC_dateInfo = splitByDate(stepB_userSetCityWeather.wxArray);
  // D. 合併（物件）
  const stepD_theBotSay = reformTwAweekByDay(
    stepC_dateInfo,
    stepB_userSetCityWeather.wxArray,
    stepB_userSetCityWeather.minTArray,
    // eslint-disable-next-line prettier/prettier
    stepB_userSetCityWeather.maxTArray
  );

  return stepD_theBotSay;
}

/*
小幫手系列（Api）
※在設定地點功能還沒出來之前，先以新北市為主

預期效果，拿到以下資料

- parameter 的內容
- 提醒

要做的事情：
提醒今天天氣情況

例如拿到以下資料：

晴午後短暫雷陣雨，天氣整體舒適，但仍有降雨機率
今日白天（07日）天氣晴午後短暫雷陣雨，降雨機率30%，氣溫 25 - 32 度，感覺舒適至悶熱。
風浪：西南轉偏南風4級陣風6級以下，浪高約1公尺，屬於小浪。
提醒您，今日天氣偏熱偶有雨，建議穿著透氣服裝並隨身攜帶雨具。

今晚明晨天氣多雲短暫陣雨，降雨機率30%，氣溫 26 - 30 度，感覺舒適至悶熱。
風浪：偏南轉西南風4級陣風6級以下晨轉4至5，雷雨區陣風8級，浪高約1公尺，屬於小浪。
提醒您，今晚明晨氣溫舒適略熱，有短暫降雨機會，建議攜帶雨具並補充水分。

整理成以下格式，例如：

報告！今天早上會出太陽！是晴午後雷陣雨~ 天氣整體來說舒適（但是有降雨機率~~）

「天氣晴午後短暫雷陣雨」……是什麼意思ㄚ（呆滯）不過降雨機率在30%左右，氣溫是25~32度喔（話說32度真的舒適嗎（懷疑

「今日天氣偏熱偶有雨，建議穿著透氣服裝並隨身攜帶雨具」…要帶傘要穿雨衣要帶雨具！
*/
