// mvp功能
// 匯入區
import { buildApi } from "../Library/tool.js";
import getApiList from "../Data/info/apiList.js";

const apiList = getApiList();
console.log(apiList);

const Name = "地震";

export const 顯著有感地震 = buildApi(Name, 0);
export const 行政區震度 = buildApi(Name, 1);
export const 區域有感地震 = buildApi(Name, 2);
