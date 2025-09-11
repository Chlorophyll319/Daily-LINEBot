import axios from "axios";
import getApiList from "../data/info/apiList.js";

console.log(
  "🌍 簡潔版地震 API 模組載入中... 希望大地安穩，程式碼也穩定！ (ﾟДﾟ；)"
);

const apiList = getApiList();

const EARTHQUAKE_APIS = {
  SIGNIFICANT_QUAKE: 0, // 顯著有感地震報告
  REGIONAL_INTENSITY: 1, // 縣市行政區觀測震度資料
  LOCAL_QUAKE: 2, // 小區域有感地震報告
};

/**
 * 通用地震 API 呼叫函數
 * 採用 weatherSimple.js 的簡潔風格，告別 buildApi 時代
 *
 * @param {string} apiName API 名稱，例如："地震"
 * @param {number} index API 索引
 * @returns {Promise<Object|null>} API 資料或 null
 */
async function callEarthquakeApi(apiName, index) {
  console.log(
    `🚀 準備呼叫 ${apiName} API (索引: ${index})... 希望不要有壞消息！`
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
    console.error(
      `🐛 API 呼叫失敗，氣象局的地震儀可能在休息：${error.message}`
    );
    return null;
  }
}

/**
 * 取得顯著有感地震報告 - 重大地震消息
 * 讓你掌握最新的重要地震資訊
 */
export async function getSignificantEarthquake() {
  console.log("⚠️ 正在取得顯著有感地震報告... 願平安無事！");
  return await callEarthquakeApi("地震", EARTHQUAKE_APIS.SIGNIFICANT_QUAKE);
}

/**
 * 取得縣市行政區觀測震度資料 - 各地區震度分佈
 * 查看你家附近的震度有多強
 */
export async function getRegionalIntensity() {
  console.log("🗺️ 正在取得縣市行政區觀測震度資料... 看看各地搖得多厲害！");
  return await callEarthquakeApi("地震", EARTHQUAKE_APIS.REGIONAL_INTENSITY);
}

/**
 * 取得小區域有感地震報告 - 局部地震資訊
 * 連小地震都不放過！
 */
export async function getLocalEarthquake() {
  console.log("📍 正在取得小區域有感地震報告... 細心呵護每一次搖晃！");
  return await callEarthquakeApi("地震", EARTHQUAKE_APIS.LOCAL_QUAKE);
}

/**
 * 取得最新地震資訊 (顯著有感地震的別名)
 */
export async function getLatestEarthquake() {
  console.log("🔄 正在取得最新地震資訊... 保持警覺！");
  return await getSignificantEarthquake();
}

console.log(
  "✅ 簡潔版地震 API 模組載入完成！從 buildApi 進化成地震監測專家 🌏"
);

export { callEarthquakeApi };
