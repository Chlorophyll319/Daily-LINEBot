// mvp功能
// 匯入區
import { buildApi } from "../Library/tool.js";
import getApiList from "../Data/info/apiList.js";

const apiList = getApiList();
console.log(apiList);

const Name = "紫外線";

export const 紫外線指數 = buildApi(Name, 0);
