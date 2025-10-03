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
- 😊 **呆萌性格**：假裝全知全能但顧左右而言他的可愛機器人

## 🚀 部署資訊

本專案使用 [Render](https://render.com) 進行部署。

### Render 部署設定

- **服務類型**：Web Service
- **專案網址**：[https://daily-linebot.onrender.com](https://daily-linebot.onrender.com)
- **控制面板**：[Render Dashboard](https://dashboard.render.com/web/srv-d1cekqgdl3ps73fim1qg)

### 部署步驟

1. **連接 GitHub 儲存庫**

   - 在 Render Dashboard 建立新的 Web Service
   - 連接此專案的 GitHub repository

2. **設定環境變數**
   在 Render 的 Environment 頁面設定以下變數：

   ```
   CHANNEL_ID=你的LINE頻道ID
   CHANNEL_SECRET=你的LINE頻道密鑰
   CHANNEL_ACCESS_TOKEN=你的LINE存取權杖
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dailyBot
   ```

3. **建置與部署設定**

   - **Build Command**：`npm install`
   - **Start Command**：`npm start`
   - **Node Version**：18+ (在 `package.json` 中指定)

4. **自動部署**
   - 每次推送到 main 分支時，Render 會自動重新部署
   - 可在 Dashboard 查看部署日誌與狀態

### LINE Webhook 設定

部署完成後，需要在 LINE Developers Console 設定 Webhook URL：

```
https://daily-linebot.onrender.com/callback
```

## 🏗️ 現代化架構

### 分層架構設計

```
onlinever-Daily-LINEBot/
├── index.js                               # 主程式入口
├── routes/                                # 路由層
│   └── messageRouter.js                   # 消息分發處理器
├── bots/                                  # 業務邏輯層
│   ├── BaseBot.js                         # Bot 抽象基類
│   └── WeatherBot.js                      # 天氣機器人 ✅
├── services/                              # 資料處理層
│   ├── WeatherService.js                  # 天氣資料處理服務 ✅
│   └── WeatherError.js                    # 錯誤處理工具
├── data/                                  # 靜態資料
│   ├── info/                              # 基礎資訊檔案
│   └── miniBotPhrases/weather/            # 天氣模組 ✅
│       ├── CwaWeatherAdapter.js           # 中央氣象局 API 適配器
│       ├── TimeUtils.js                   # 時間處理模組
│       ├── WeatherEmoji.js                # 天氣圖示模組
│       └── weatherTalkMap.js              # 天氣回應模板
├── database/                              # 資料庫層
│   ├── MongoDB.js                         # MongoDB 連線模組
│   └── user.js                            # 使用者資料模型
├── constants/                             # 常數定義
└── .claude/                               # Claude Code 設定
    ├── claudeLog/                         # 對話紀錄
    └── plan.md                            # 專案規劃文件
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

### 🤖 機器人性格特色

這是一個**假裝全知全能的呆萌機器人**，具有以下特色：

#### 🎭 性格設定

- **全知全能（知識類）**：當你問知識性問題時，會用顧左右而言他的話術回應
  - 「再想想」、「再試試看」、「這個不需要知道啦」、「你現在還不用管這個」
- **日常聊天專家**：只有問日常問題時才會認真回應
  - 天氣、假期、地震等實用資訊查詢
- **呆萌本質**：是個假裝自己全知全能的可愛機器人

#### 🗣️ 對話模式

- **知識問答喚醒格式**：「我想問！」+ 問題
- **日常查詢**：直接輸入關鍵字（如：天氣、放假、地震）
- **重複未知情況**：會逐漸加強語氣或加入模板回應
  - 例如：「窩不知道」→「窩真的不知道」→「窩真的真的不知道」
  - 或加入建議：「窩不知道啦！但你可以先去喝水」

#### 🎋 娛樂功能

- **淺草籤詩**：提供傳統籤詩解析
- **擲杯**：虛擬擲杯功能
- **運勢籤**：運勢抽籤服務

### 天氣服務 ✅ 已完成

- `一週天氣` / `天氣` / `weather` - 查看天氣預報
- `設定城市` - 開啟城市選單，設定個人化預設城市
- 直接輸入城市名稱 - 單次查詢指定城市天氣（不影響預設設定）
- `幫助` / `help` - 顯示完整指令說明

#### 天氣功能特色

- 🌤️ **Flex Message 城市選單** - 22個城市選擇，美觀易用
- 🏙️ **查詢與設定分離** - 臨時查詢不影響個人設定
- 📱 **智慧格式化** - 天氣圖示自動配對，時段描述靈活
- 💾 **個人化體驗** - MongoDB 儲存使用者城市偏好

### 使用範例

#### 🤖 機器人性格互動範例

```
👤 使用者: 我想問！什麼是量子力學？
🤖 機器人: 再想想～這個不需要知道啦！

👤 使用者: 我想問！地球為什麼是圓的？
🤖 機器人: 你現在還不用管這個～再試試看別的問題吧！

👤 使用者: 隨便問個問題
🤖 機器人: 窩不知道

👤 使用者: 又問了個奇怪問題
🤖 機器人: 窩真的不知道啦！但你可以先去喝水

👤 使用者: 今天天氣怎麼樣？
🤖 機器人: 📅 新北市 7天天氣預報
           🌡️ 今天 20°C-26°C 多雲...

👤 使用者: 抽籤
🤖 機器人: 🎋 淺草籤詩
           [顯示籤詩內容與解析]
```

#### ☀️ 天氣功能使用範例

```
👤 使用者: 一週天氣
🤖 機器人: 📅 新北市 7天天氣預報
           🌡️ 今天 20°C-26°C 多雲
           ☔ 明天 18°C-24°C 有雨
           ...

👤 使用者: 設定城市
🤖 機器人: [顯示 Flex Message 城市選單，包含 22 個城市選項]

👤 使用者: [點選台北市]
🤖 機器人: ✨ 設定完成！您的預設城市已設為 台北市
           下次查詢天氣時會直接使用這個城市的資料喔！

👤 使用者: 高雄市
🤖 機器人: 📅 高雄市 7天天氣預報
           🌡️ 今天 24°C-30°C 晴朗
           ☔ 明天 22°C-28°C 午後雷陣雨
           ...

👤 使用者: 幫助
🤖 機器人: 🤖 機器人指令說明：

           🌤️ 天氣機器人功能：
           • 一週天氣 - 查看七天天氣預報
           • 設定城市 [城市名稱] - 設定預設城市
           例如：設定城市 台北市

           📋 輸入「幫助」或「help」查看此說明
           ✨ 享受服務吧！
```

#### 📱 LINE 選單功能

機器人支援 Rich Menu 選單，點擊不同區塊會自動發送對應訊息：

- **一週天氣預報** - 查看七天天氣預報
- **三天內天氣預報** - 查看短期天氣預報
- **最近假期** - 查詢即將到來的假期
- **求問淺草籤** - 抽取淺草籤詩
- **擲杯** - 虛擬擲杯功能
- **設定天氣預報的預設地點** - 設定個人化城市偏好

````

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
````

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

- **🏗️ 架構設計**：標準化分層架構完成
- **🌤️ WeatherBot**：完整天氣查詢、城市選單、模組化重構完成
- **💾 MongoDB 整合**：使用者資料持久化儲存
- **🛡️ 錯誤處理**：統一錯誤處理機制
- **📋 開發文檔**：完整的 plan.md 與對話紀錄
- **🎯 模組化設計**：TimeUtils、WeatherEmoji、CwaWeatherAdapter 模組

### 待實作功能 ⚠️

- **AirQualityBot**：空氣品質查詢機器人（需重新實作）
- **EarthquakeBot**：地震資訊查詢機器人（需重新實作）
- **HolidayBot**：假期查詢機器人（需重新實作）
- **UVBot**：紫外線指數機器人（需重新實作）
- **FortuneBot**：淺草籤詩機器人（需重新實作）

### 規劃中功能 📋

- **LINE Rich Menu**：選單介面整合
- **Google Cloud NLP**：智能對話系統
- **推播通知**：重要資訊主動推送

## 🎯 技術特色

### 程式碼品質

- **🏗️ 模組化設計**：清晰的分層架構與職責分離
- **📏 精簡高效**：標準化 Bot 框架，支援快速開發
- **🔧 可擴展性**：BaseBot 抽象類，新增機器人只需繼承
- **🛡️ 錯誤處理**：統一的錯誤處理與用戶友善回應
- **💾 資料持久化**：MongoDB 雲端資料庫整合
- **🎯 功能分離**：查詢與設定操作完全分離，邏輯清晰

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

### 監控與維護

- **服務狀態**：在 [Render Dashboard](https://dashboard.render.com/web/srv-d1cekqgdl3ps73fim1qg) 查看服務運行狀態
- **日誌查看**：透過 Dashboard 的 Logs 頁面查看即時日誌
- **效能監控**：Render 提供基本的效能指標監控

### 注意事項

⚠️ **Free Plan 限制**：

- 閒置 15 分鐘後服務會自動休眠
- 首次請求可能需要 30 秒以上的冷啟動時間
- 建議升級至付費方案以獲得更穩定的服務

📚 **詳細文檔**：[Render Web Services Documentation](https://render.com/docs/web-services)

## 📄 授權資訊

ISC License

## 🏆 專案成就

- **🧹 架構重構完成**：標準化分層架構，100% 模組化設計
- **📊 程式碼品質提升**：消除重複代碼，統一錯誤處理
- **🎯 用戶體驗優化**：Flex Message 選單，功能操作分離
- **📈 可維護性**：BaseBot 框架，支援快速功能擴展
- **🌤️ 天氣系統完成**：完整重構，模組化設計，個人化體驗

---

**🎉 現代化 LINE Bot 架構，為多功能聊天機器人而生！** ✨

_最後更新：2025-09-14_
