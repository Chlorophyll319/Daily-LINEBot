import axios from "axios";
import getApiList from "../data/info/apiList.js";

console.log("☀️ 簡潔版紫外線 API 模組載入中... 防曬係數程式碼版！ (⌐■_■)");

const apiList = getApiList();

const UV_INDEX_API = {
  DAILY_MAX: 0, // 每日紫外線指數最大值
};

/**
 * 通用紫外線 API 呼叫函數
 * 採用 weatherSimple.js 的簡潔風格，告別 buildApi 模式
 *
 * @param {string} apiName API 名稱，例如："紫外線"
 * @param {number} index API 索引
 * @returns {Promise<Object|null>} API 資料或 null
 */
async function callUVApi(apiName, index) {
  console.log(
    `🚀 準備呼叫 ${apiName} API (索引: ${index})... 看看今天要不要戴帽子！`
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
    console.error(`🐛 API 呼叫失敗，氣象局可能在防曬：${error.message}`);
    return null;
  }
}

/**
 * 取得每日紫外線指數最大值 - 防曬必備資訊
 * 讓你知道今天該擦多少防曬乳！
 */
export async function getDailyUVIndex() {
  console.log("☀️ 正在取得每日紫外線指數最大值... 防曬大作戰開始！");
  return await callUVApi("紫外線", UV_INDEX_API.DAILY_MAX);
}

/**
 * 取得當前紫外線指數 (同 getDailyUVIndex，提供別名)
 */
export async function getCurrentUVIndex() {
  console.log("🌞 正在取得當前紫外線指數... 太陽公公有多兇？");
  return await getDailyUVIndex();
}

console.log("✅ 簡潔版紫外線 API 模組載入完成！從 buildApi 進化成防曬專家 🧴");

export { callUVApi };
