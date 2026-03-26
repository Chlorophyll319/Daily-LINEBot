import axios from "axios";
import apiList from "../../info/apiList.js";

/**
 * 呼叫紫外線相關 API
 * index 0 = 紫外線指數-每日紫外線指數最大值（O-A0005-001）
 */
async function callUvApi(index) {
  const { url } = apiList()["紫外線"][index];
  const response = await axios.get(url);
  return response.data;
}

/**
 * 取得每日紫外線指數最大值
 * 欄位：elementName、Date、StationID、UVIndex
 */
export const getDailyUvIndex = () => callUvApi(0);
