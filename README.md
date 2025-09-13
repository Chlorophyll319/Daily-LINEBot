# 🤖 多功能 LINE 聊天機器人

基於現代化架構設計的多功能 LINE 聊天機器人，提供天氣、空氣品質、地震資訊、紫外線指數、假期查詢與淺草籤詩等服務。

## ✨ 功能特色

- 🌤️ **智能天氣預報**：個人化城市設定，七天天氣預報
- 🌬️ **空氣品質監測**：AQI、PM2.5 即時數據（開發中）
- 🌍 **地震資訊查詢**：即時地震警報與災害資訊（開發中）
- ☀️ **紫外線指數**：防曬建議與健康提醒（開發中）
- 📅 **假期查詢**：上班日與連假資訊（開發中）
- 🎋 **淺草籤詩**：傳統籤詩與運勢解析（開發中）
- 🧠 **智能對話**：基於 Google Cloud Natural Language（規劃中）

## 🏗️ 現代化架構

### 分層架構設計
```
onlinever-Daily-LINEBot/
├── index.js                    # 主程式入口（52行）
├── routes/                     # 路由層
│   └── messageRouter.js        # 消息分發處理器
├── bots/                       # 業務邏輯層
│   ├── BaseBot.js              # Bot 抽象基類
│   └── WeatherBot.js           # 天氣機器人 ✅
├── services/                   # 資料處理層
│   ├── WeatherService.js       # 天氣資料處理
│   └── WeatherError.js         # 錯誤處理工具
├── adapters/                   # 外部 API 適配層
│   └── CwaWeatherAdapter.js    # 中央氣象局 API
├── database/                   # 資料庫層
│   ├── mongoDB.js              # MongoDB 連線模組
│   └── user.js                 # 使用者資料模型
├── data/                       # 靜態資料
├── constants/                  # 常數定義
└── .claude/                    # 開發文檔
    ├── plan.md                 # 專案規劃文檔
    └── claudeLog/              # 開發對話紀錄
```

### 架構特色
- **🎯 職責分離**：routes → bots → services → adapters
- **🔧 可擴展設計**：新增機器人只需繼承 BaseBot
- **📊 統一接口**：標準化的 canHandle() 與 handle() 方法
- **🛡️ 錯誤處理**：統一的錯誤處理與用戶友善回應
- **💾 狀態管理**：MongoDB 儲存使用者偏好設定

## 🚀 快速開始

### 環境需求
- Node.js 18+
- MongoDB Atlas 帳號
- LINE Developer Console 設定

### 安裝步驟

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd onlinever-Daily-LINEBot
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

3. **環境變數設定**
   建立 `.env` 檔案：
   ```env
   # LINE Bot 設定
   CHANNEL_ID=你的LINE頻道ID
   CHANNEL_SECRET=你的LINE頻道密鑰
   CHANNEL_ACCESS_TOKEN=你的LINE存取權杖

   # 資料庫設定
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dailyBot
   ```

4. **啟動服務**
   ```bash
   npm start
   ```

## 📱 使用指南

### 天氣服務 ✅ 已完成
- `一週天氣` / `天氣` / `weather` - 查看天氣預報
- `設定城市 [城市名稱]` - 設定個人化預設城市
- `幫助` / `help` - 顯示完整指令說明

### 使用範例
```
👤 使用者: 一週天氣
🤖 機器人: 📅 新北市 7天天氣預報
           🌡️ 今天 20°C-26°C 多雲
           ☔ 明天 18°C-24°C 有雨
           ...

👤 使用者: 設定城市 台北市
🤖 機器人: ✨ 設定完成！您的預設城市已設為 台北市
           下次查詢天氣時會直接使用這個城市的資料喔！

👤 使用者: 幫助
🤖 機器人: 🤖 機器人指令說明：

           🌤️ 天氣機器人功能：
           • 一週天氣 - 查看七天天氣預報
           • 設定城市 [城市名稱] - 設定預設城市
           例如：設定城市 台北市

           📋 輸入「幫助」或「help」查看此說明
           ✨ 享受服務吧！
```

## 🛠️ 開發指南

### 新增機器人

1. **建立 Bot 類別**
   ```javascript
   // bots/NewBot.js
   import { BaseBot } from "./BaseBot.js";

   export class NewBot extends BaseBot {
     constructor() {
       super("NewBot");
     }

     canHandle(message) {
       // 判斷是否能處理該訊息
       return message.includes("關鍵字");
     }

     async handle(message, userId) {
       // 處理訊息邏輯
       return "回應內容";
     }

     getHelpInfo() {
       return "🤖 NewBot 功能說明";
     }
   }
   ```

2. **註冊到路由器**
   ```javascript
   // routes/messageRouter.js
   import { NewBot } from "../bots/NewBot.js";

   const bots = [
     new WeatherBot(),
     new NewBot(), // 新增這行
   ];
   ```

### API 適配器模式
```javascript
// adapters/ExampleAdapter.js
export class ExampleAdapter {
  async fetchData(params) {
    // API 呼叫邏輯
    const response = await fetch(apiUrl);
    return this.transformData(response);
  }

  transformData(rawData) {
    // 資料轉換邏輯
    return processedData;
  }
}
```

## 📊 開發狀態

### 已完成功能 ✅
- **架構設計**：現代化分層架構完成
- **WeatherBot**：完整天氣查詢與城市設定功能
- **MongoDB 整合**：使用者資料持久化儲存
- **錯誤處理**：統一錯誤處理機制
- **開發文檔**：完整的 plan.md 與對話紀錄

### 開發中功能 🚧
- **AirQualityBot**：空氣品質查詢機器人
- **EarthquakeBot**：地震資訊查詢機器人
- **HolidayBot**：假期查詢機器人
- **UVBot**：紫外線指數機器人
- **FortuneBot**：淺草籤詩機器人

### 規劃中功能 📋
- **LINE Rich Menu**：選單介面整合
- **Google Cloud NLP**：智能對話系統
- **推播通知**：重要資訊主動推送

## 🎯 技術特色

### 程式碼品質
- **🏗️ 模組化設計**：清晰的分層架構與職責分離
- **📏 精簡高效**：主程式從 112 行優化至 52 行
- **🔧 可擴展性**：標準化 Bot 介面，新增功能簡單快速
- **🛡️ 錯誤處理**：統一的錯誤處理與用戶友善回應
- **💾 資料持久化**：MongoDB 雲端資料庫整合

### 開發體驗
- **📝 完整文檔**：詳細的開發規劃與對話紀錄
- **🧪 易於測試**：模組化設計便於單元測試
- **🚀 快速開發**：BaseBot 模式加速新功能開發
- **🔍 問題追蹤**：完整的錯誤日誌與狀態監控

## 🤝 貢獻指南

1. **Fork 專案**
2. **建立功能分支** (`git checkout -b feature/amazing-feature`)
3. **遵循架構模式**：繼承 BaseBot，建立對應的 service 與 adapter
4. **提交變更** (`git commit -m 'Add amazing feature'`)
5. **推送分支** (`git push origin feature/amazing-feature`)
6. **建立 Pull Request**

### 程式碼規範
- 使用 ES6 模組語法
- 遵循 BaseBot 抽象介面
- 統一錯誤處理模式
- 保持程式碼簡潔易讀

## 📄 授權資訊

ISC License

## 🏆 專案成就

- **🧹 零技術債務**：完全移除舊架構，100% 新架構
- **📊 架構清晰**：職責分明，擴展容易
- **🎯 用戶體驗**：個人化設定，友善錯誤提示
- **📈 可維護性**：模組化設計，便於長期維護

---

**🎉 現代化 LINE Bot 架構，為多功能聊天機器人而生！** ✨

*最後更新：2025-09-13*
