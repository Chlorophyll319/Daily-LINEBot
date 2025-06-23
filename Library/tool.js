import axios from "axios";
import getApiList from "../Data/info/apiList.js";
const apiList = getApiList();

/**
 * buildApi()
 * Api資料夾內專用，串api的好幫手~
 * - 要在apiList.js檔內依照格式匯入api的資訊才能使用
 *
 * @param {string} apiGroup - 是字串：API 分類名稱，例如："天氣預報"
 * @param {number} i - 是數字：第幾個 API（該支 API 的索引）
 * @returns {Function} 一個可以呼喚 API 的 async 函式
 */
export function buildApi(apiGroup, i) {
  // 找不到就偷偷說一聲
  const group = apiList[apiGroup];
  if (!group || !group[i]) {
    console.error(`找不到 apiList['${apiGroup}'][${i}]😱人生好難！！！！`);
    return async () => null;
  }

  const { url, apiName, apiFunc, fileFormat } = group[i];
  // console.log(`💪準備抓這支👉 ${apiName}`);
  // console.log(`實際上這支預計的func名字👉 ${apiFunc}`);
  // console.log(`實際上這支檔案格式👉 ${fileFormat}`);

  return async function () {
    try {
      const theApiUrl = await axios.get(url);
      // console.log("👉 取得的資料內容是", theApiUrl.data);
      return theApiUrl.data;
    } catch (err) {
      console.log("救命啊，有🐛", `取得 ${apiName} 失敗：${err.message}`);
      return null;
    }
  };
}
