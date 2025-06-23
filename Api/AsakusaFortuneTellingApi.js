// mvp功能
// 匯入本地 JS 檔
import askGodData from "../data/info/AsakusaFortuneTelling.js";
const data = askGodData();

// 取得淺草100籤資料
export function askGod() {
  try {
    console.log("📦 資料包裝內容：", data);
    console.log(`神明降旨資料集..`);
    return data;
  } catch (err) {
    console.log(`救命啊，有🐛,取得淺草籤失敗QQ，業障內容：${err.message}`);
    return null;
  }
}
