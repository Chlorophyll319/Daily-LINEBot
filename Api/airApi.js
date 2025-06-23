// mvp功能
// 匯入區
import { buildApi } from "../Library/tool.js";
import getApiList from "../data/info/apiList.js";

const apiList = getApiList();
// console.log(apiList);

const Name = "空氣品質";

export const 空氣品質 = buildApi(Name, 0);
export const 空氣品質預報 = buildApi(Name, 1);
export const 日空氣品質 = buildApi(Name, 2);
export const 空氣品質日最大值 = buildApi(Name, 3);
export const 空氣品質指標 = buildApi(Name, 4);
export const 空氣品質月值 = buildApi(Name, 5);
