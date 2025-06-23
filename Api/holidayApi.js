// mvp功能
// 匯入區
import { buildApi } from "../Library/tool.js";
import getApiList from "../data/info/apiList.js";

const apiList = getApiList();
console.log(apiList);

const Name = "放假日";

export const 辦公日曆表 = buildApi(Name, 0);
export const 天災停班停課 = buildApi(Name, 1);
