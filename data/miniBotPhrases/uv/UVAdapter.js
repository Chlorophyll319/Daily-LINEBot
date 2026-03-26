import axios from "axios";
import apiList from "../../info/apiList.js";

/**
 * 呼叫紫外線相關 API
 * index 0 = O-A0005-001：紫外線指數-每日紫外線指數最大值
 */
async function callUvApi(index) {
  const { url } = apiList()["紫外線"][index];
  const response = await axios.get(url);
  return response.data?.records?.weatherElement?.location || null;
}

/**
 * 取得每日紫外線指數最大值（各測站）
 * 回傳：[{ StationID: "467420", UVIndex: 9 }, ...]（共 30 站）
 */
export const getDailyUvIndex = () => callUvApi(0);
