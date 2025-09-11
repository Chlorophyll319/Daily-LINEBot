import axios from "axios";
import getApiList from "../data/info/apiList.js";

console.log(
  "🗓️ 簡潔版放假日 API 模組載入中... 終於可以知道什麼時候放假了！ ＼(≧∇≦)／"
);

const apiList = getApiList();

const HOLIDAY_APIS = {
  OFFICE_CALENDAR: 0, // 政府行政機關辦公日曆表
  DISASTER_CLOSURE: 1, // 天然災害停止上班、停止上課情形
};

/**
 * 通用放假日 API 呼叫函數
 * 採用 weatherSimple.js 的簡潔風格，擺脫 buildApi 束縛
 *
 * @param {string} apiName API 名稱，例如："放假日"
 * @param {number} index API 索引
 * @returns {Promise<Object|null>} API 資料或 null
 */
async function callHolidayApi(apiName, index) {
  console.log(
    `🚀 準備呼叫 ${apiName} API (索引: ${index})... 看看能不能多休幾天！`
  );

  try {
    const apiGroup = apiList[apiName];
    if (!apiGroup || !apiGroup[index]) {
      console.error(
        `💔 找不到 ${apiName}[${index}] 這支 API... 可能是我記錯了？`
      );
      return null;
    }

    const { url, apiName: apiDisplayName } = apiGroup[index];
    console.log(`📡 正在呼叫 ${apiDisplayName}...`);

    const response = await axios.get(url);

    console.log(
      `✨ ${apiDisplayName} API 呼叫成功！收到 ${JSON.stringify(response.data).length} 字元的資料`
    );
    return response.data;
  } catch (error) {
    console.error(`🐛 API 呼叫失敗，政府機關可能在放假：${error.message}`);
    return null;
  }
}

/**
 * 取得政府行政機關辦公日曆表 - 上班族最關心的資訊
 * 讓你提前規劃連假行程！
 */
export async function getOfficeCalendar() {
  console.log("📅 正在取得政府行政機關辦公日曆表... 讓我看看何時能放假！");
  return await callHolidayApi("放假日", HOLIDAY_APIS.OFFICE_CALENDAR);
}

/**
 * 取得天然災害停班停課情形 - 颱風天最實用
 * 颱風假到底放不放？
 */
export async function getDisasterClosure() {
  console.log("🌪️ 正在取得天然災害停班停課情形... 颱風假救星來了！");
  return await callHolidayApi("放假日", HOLIDAY_APIS.DISASTER_CLOSURE);
}

/**
 * 檢查今天是否放假 (取得辦公日曆的別名)
 */
export async function checkTodayHoliday() {
  console.log("🤔 檢查今天是否放假... 希望是好消息！");
  return await getOfficeCalendar();
}

console.log("✅ 簡潔版放假日 API 模組載入完成！從 buildApi 進化成放假專家 🎉");

export { callHolidayApi };
