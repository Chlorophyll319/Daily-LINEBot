import axios from "axios";
import getApiList from "../../info/apiList.js";

const apiList = getApiList();

const API_INDICES = {
  SIGNIFICANT: 0, // 顯著有感地震報告 (E-A0015-001)
  SMALL: 2,       // 小區域有感地震報告 (E-A0016-001)
};

/**
 * 呼叫地震 API
 */
async function callEarthquakeApi(category, index) {
  throw new Error("Not implemented");
}

/**
 * 取得最新顯著有感地震
 */
export const getLatestEarthquake = async () => callEarthquakeApi("地震", API_INDICES.SIGNIFICANT);

/**
 * 取得最新小區域有感地震
 */
export const getLatestSmallEarthquake = async () => callEarthquakeApi("地震", API_INDICES.SMALL);
