// mvp功能
// 匯入區
import { buildApi } from "../Library/tool.js";
import getApiList from "../data/info/apiList.js";

const apiList = getApiList();
// 測試用
// console.log(apiList);

const Name = "天氣預報";

export const 全台1W平均 = buildApi(Name, 0);
// 測試用
// console.log("全台1W平均");

export const 全台3D天氣預報 = buildApi(Name, 1);
// 測試用
// console.log("全台3D天氣預報");

export const 臺北3D天氣預報 = buildApi(Name, 2);
// 測試用
// console.log("臺北3D天氣預報");

export const 天氣警報 = buildApi(Name, 3);
// 測試用
// console.log("天氣警報");

export const 現在天氣 = buildApi(Name, 4);
// 測試用
// console.log("現在天氣");

export const 今明36H天氣預報 = buildApi(Name, 5);
// 測試用
// console.log("今明36H天氣預報");

export const 雨量觀測 = buildApi(Name, 6);
// 測試用
// console.log("雨量觀測");

export const 熱傷害5D = buildApi(Name, 7);
// 測試用
// console.log("熱傷害5D");

export const 冷傷害5D = buildApi(Name, 8);
// 測試用
// console.log("冷傷害5D");

export const 冷傷害72H = buildApi(Name, 9);
// 測試用
// console.log("冷傷害72H");

export const 溫差提醒5D = buildApi(Name, 10);
// 測試用
// console.log("溫差提醒5D");

export const 溫差提醒72H = buildApi(Name, 11);
// 測試用
// console.log("溫差提醒72H");

export const 自動氣象站 = buildApi(Name, 12);
// 測試用
// console.log("自動氣象站");

export const 大區域7D = buildApi(Name, 13);
// 測試用
// console.log("大區域7D");

export const 台北小幫手 = buildApi(Name, 14);
// 測試用
// console.log("台北小幫手");

export const 花蓮小幫手 = buildApi(Name, 15);
// 測試用
// console.log("花蓮小幫手");

export const 桃園小幫手 = buildApi(Name, 16);
// 測試用
// console.log("桃園小幫手");

export const 新竹小幫手 = buildApi(Name, 17);
// 測試用
// console.log("新竹小幫手");

export const 屏東小幫手 = buildApi(Name, 18);
// 測試用
// console.log("屏東小幫手");

export const 彰化小幫手 = buildApi(Name, 19);
// 測試用
// console.log("彰化小幫手");

export const 雲林小幫手 = buildApi(Name, 20);
// 測試用
// console.log("雲林小幫手");

export const 連江小幫手 = buildApi(Name, 21);
// 測試用
// console.log("連江小幫手");

export const 新北小幫手 = buildApi(Name, 22);
// 測試用
// console.log("新北小幫手");

export const 高雄小幫手 = buildApi(Name, 23);
// 測試用
// console.log("高雄小幫手");

export const 金門小幫手 = buildApi(Name, 24);
// 測試用
// console.log("金門小幫手");

export const 嘉義小幫手 = buildApi(Name, 25);
// 測試用
// console.log("嘉義小幫手");

export const 苗栗小幫手 = buildApi(Name, 26);
// 測試用
// console.log("苗栗小幫手");

export const 台中小幫手 = buildApi(Name, 27);
// 測試用
// console.log("台中小幫手");

export const 新竹縣小幫手 = buildApi(Name, 28);
// 測試用
// console.log("新竹縣小幫手");

export const 臺東小幫手 = buildApi(Name, 29);
// 測試用
// console.log("臺東小幫手");

export const 今明36H = buildApi(Name, 30);
// 測試用
// console.log("今明36H");

export const 一週各縣市 = buildApi(Name, 31);
// 測試用
// console.log("一週各縣市");

export const 全球都市 = buildApi(Name, 32);
// 測試用
// console.log("全球都市");
