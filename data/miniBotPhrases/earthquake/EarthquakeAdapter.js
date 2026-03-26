import axios from "axios";
import getApiList from "../../info/apiList.js";

const apiList = getApiList();

// 常數定義 - 對應 apiList.js 中 地震 陣列索引
const API_INDICES = {
  SIGNIFICANT: 0, // E-A0015-001 — 顯著有感地震報告（不定期更新）
  SMALL: 2,       // E-A0016-001 — 小區域有感地震報告（不定期更新）
};

/**
 * 通用 API 呼叫函數 - 核心實現
 */
async function callEarthquakeApi(index) {
  const apiGroup = apiList["地震"];
  if (!apiGroup || !apiGroup[index]) {
    throw new Error(`API not found: 地震[${index}]`);
  }

  const { url } = apiGroup[index];

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Earthquake API call failed: ${error.message}`);
  }
}

// API 函數映射表
const API_FUNCTIONS = {
  significant: () => callEarthquakeApi(API_INDICES.SIGNIFICANT),
  small: () => callEarthquakeApi(API_INDICES.SMALL),
};

/**
 * 導出的 API 函數 - 統一接口
 */
export const getLatestEarthquake = API_FUNCTIONS.significant;
export const getLatestSmallEarthquake = API_FUNCTIONS.small;

// 導出通用函數供其他地方使用
export { callEarthquakeApi };
