import axios from "axios";
import apiList from "../../info/apiList.js";

/**
 * 呼叫放假日相關 API
 * index 0 = 政府行政機關辦公日曆表（CSV）
 */
async function callHolidayApi(index) {
  const { url } = apiList()["放假日"][index];
  const response = await axios.get(url, { responseType: "text" });
  return response.data;
}

/**
 * 取得政府行政機關辦公日曆表（CSV 格式）
 * 欄位：date, year, name, isholiday, holidaycategory, description
 */
export const getOfficialCalendar = () => callHolidayApi(0);
