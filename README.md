# 🤖 Daily LINE Bot

> 一隻假裝全知全能、實際上只會查天氣的呆萌機器人。
>
> *A deceptively all-knowing LINE Bot that actually just queries weather APIs — and a few other things.*

---

## 功能清單 / Features

| Bot | 觸發詞 | 說明 |
|-----|--------|------|
| 🌤️ **WeatherBot** | `天氣`、`weather`、城市名稱 | 七天天氣預報，Flex Message 城市選單，個人化預設城市 |
| 🌬️ **AirQualityBot** | `空氣`、`AQI`、`PM2.5` | 即時 AQI 查詢，多測站聚合平均，六等級評語 |
| 🌍 **EarthquakeBot** | `地震`、`earthquake` | 最新顯著有感地震，震度排序，受影響縣市前五名 |
| 📅 **HolidayBot** | `放假`、`今天要上班嗎`、`下次放假` | 政府辦公日曆解析，五種情境話術（補班日/連假前夕等） |
| ☀️ **UVBot** | `紫外線`、`UV`、`需要防曬嗎` | 當日最大 UV 指數，按用戶城市查詢，防曬等級建議 |
| 🎋 **FortuneBot** | `抽籤`、`求籤`、`占卜`、`第X號籤` | 淺草 100 支籤詩，問題分類智能匹配，抽籤歷史記錄 |
| ⛩️ **DivineBot** | `擲杯`、`問杯`、`擲筊`、`問神` | 虛擬擲杯，聖杯 / 笑杯 / 陰杯三種結果 |
| 🔔 **KnockKnockBot** | `knock knock！` | 叫醒機器人，隨機呆萌回應 |
| 🤷 **FallbackBot** | 其他不認識的訊息 | 「窩不知道」漸進式回應，越問越氣 |

輸入 `幫助` 或 `help` 可呼叫主選單 Flex Message，點選各子選單展開 Quick Reply 操作。

---

## 技術架構 / Architecture

### 設計理念

這個專案最核心的設計決策是 **Bot 繼承框架**：每個功能模組繼承同一個 `BaseBot` 抽象類，對外暴露相同的三個介面 `canHandle()`、`handle()`、`getHelpInfo()`。`messageRouter` 只需遍歷 Bot 陣列，找到第一個 `canHandle()` 回傳 `true` 的 Bot 委派處理，不需要任何 `if-else` 條件分支。

新增功能 = 繼承 `BaseBot` + 加入 `bots[]` 陣列，路由層完全不需要改動。

### 分層架構

```
LINE Webhook
     │
     ▼
routes/messageRouter.js        ← 事件接收、Bot 路由分發、選單處理
     │
     ▼
bots/[XxxBot].js               ← 繼承 BaseBot，判斷觸發、協調業務邏輯
     │
     ▼
services/[XxxService].js       ← 資料聚合、格式化、多則訊息組裝
     │
     ▼
data/miniBotPhrases/[domain]/  ← Adapter（API 封裝）、Emoji、TalkMap（話術模板）
     │
     ▼
database/mongoDB.js            ← 使用者城市偏好、抽籤歷史（MongoDB Atlas）
```

### Bot 繼承模式

```
BaseBot (抽象基類)
  ├── canHandle(message): boolean   ← 關鍵字比對，決定是否接手
  ├── handle(message, userId): any  ← 主要業務邏輯
  └── getHelpInfo(): string         ← 提供給幫助選單的說明文字

  ├── WeatherBot      ← Flex Message 城市選單、查詢與設定分離
  ├── AirQualityBot   ← 環境部 AQI API，多測站平均
  ├── EarthquakeBot   ← CWA E-A0015-001，震度排序去重
  ├── HolidayBot      ← 政府 CSV BOM 處理、五情境判斷
  ├── UVBot           ← CWA O-A0005-001，stationCountyMap 30 站對應
  ├── FortuneBot      ← 淺草 100 籤，MongoDB 歷史記錄
  ├── DivineBot       ← 擲杯三態機率計算
  ├── KnockKnockBot   ← 隨機話術回應
  └── FallbackBot     ← 漸進式「窩不知道」
```

### messageRouter 分發流程

```javascript
// 簡化示意
export async function handleMessage(event) {
  const { text } = event.message;

  // 1. 特殊指令優先：幫助選單
  if (text === "幫助") return event.reply(buildMainMenuMessage());

  // 2. 子選單觸發詞
  if (SUBMENU_HANDLERS[text]) return event.reply(SUBMENU_HANDLERS[text]());

  // 3. 遍歷 Bot 陣列，委派給第一個 canHandle() 的 Bot
  const bot = bots.find(b => b.canHandle(text));
  if (bot) event.reply(await bot.handle(text, userId));
}
```

---

## 技術選型 / Tech Stack

| 技術 | 版本 | 選用理由 |
|------|------|----------|
| **Node.js + Express 5** | ESM | 非同步 I/O 適合 API 密集的 Bot 服務；Express 5 原生支援 async error handling |
| **linebot SDK** | ^1.6.1 | 輕量封裝，讓 Webhook 驗簽、reply token 管理不需要手刻 |
| **MongoDB + Mongoose** | ^8 | 使用者偏好（城市設定）與抽籤歷史屬於文件型資料，Schema 彈性高；Atlas 免費層夠用 |
| **axios** | ^1.9 | 呼叫中央氣象署、環境部等政府 Open API，攔截器統一處理逾時與錯誤 |
| **node:test**（內建）| - | 單元測試不安裝額外套件，降低依賴複雜度 |

### 外部 API 來源

| 服務 | API | 說明 |
|------|-----|------|
| 中央氣象署 (CWA) | F-C0032-001 等 | 七天天氣預報、22 縣市 |
| 中央氣象署 (CWA) | E-A0015-001 | 顯著有感地震資訊 |
| 中央氣象署 (CWA) | O-A0005-001 | 每日紫外線最大值，30 測站 |
| 環境部 | aqx_p_432 | 即時 AQI 測站資料 |
| 政府資料開放平台 | 行政機關辦公日曆 CSV | 放假 / 補班 / 連假資訊 |

---

## 本地開發 / Local Development

### 前置需求

- Node.js 18+
- MongoDB Atlas 帳號（或本地 MongoDB）
- LINE Developer Console 已建立 Messaging API channel
- [ngrok](https://ngrok.com/) 或類似工具將本地端口暴露為 HTTPS（LINE Webhook 要求）

### 安裝與啟動

```bash
# 1. Clone 專案
git clone https://github.com/Chlorophyll319/linebot_dallyChatbot.git
cd linebot_dallyChatbot

# 2. 安裝依賴
npm install

# 3. 建立環境變數
cp .env.sample .env
# 編輯 .env，填入下方說明的變數

# 4. 開發模式（nodemon 自動重啟）
npm run dev

# 5. 執行測試
npm test
```

### 環境變數

```env
# LINE Bot
CHANNEL_ID=你的 LINE Channel ID
CHANNEL_SECRET=你的 LINE Channel Secret
CHANNEL_ACCESS_TOKEN=你的 LINE Access Token

# 資料庫
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dailyBot

# 伺服器（可選，預設 8080）
PORT=8080
```

### Webhook 設定

啟動後，將以下 URL 填入 LINE Developer Console 的 Webhook URL：

```
https://<your-ngrok-domain>/callback
```

---

## 專案結構 / Project Structure

```
.
├── index.js                          # 入口：初始化 DB、LINE Bot、Express（Port 8080）
├── routes/
│   └── messageRouter.js              # 訊息分發：接收事件 → 選擇 Bot → 委派處理
├── bots/
│   ├── BaseBot.js                    # 抽象基類
│   ├── WeatherBot.js
│   ├── AirQualityBot.js
│   ├── EarthquakeBot.js
│   ├── HolidayBot.js
│   ├── UVBot.js
│   ├── FortuneBot.js
│   ├── DivineBot.js
│   ├── KnockKnockBot.js
│   └── FallbackBot.js
├── services/
│   ├── WeatherService.js             # 格式化 CWA 天氣資料
│   ├── AirQualityService.js          # 多測站 AQI 聚合
│   ├── EarthquakeService.js          # 地震資料解析與排序
│   ├── HolidayService.js             # CSV 解析、五情境判斷
│   ├── UVService.js                  # 縣市測站聚合平均
│   └── HelpService.js                # 選單 Flex Message 組裝
├── data/miniBotPhrases/
│   ├── weather/                      # CwaWeatherAdapter、TalkMap、Emoji
│   ├── airQuality/                   # AirQualityAdapter、TalkMap、Emoji
│   ├── earthquake/                   # EarthquakeAdapter、TalkMap、Emoji
│   ├── holiday/                      # HolidayAdapter（CSV）、TalkMap、Emoji
│   ├── uv/                           # UVAdapter、TalkMap、Emoji、stationCountyMap
│   ├── fortune/                      # 籤詩資料、FortuneFormatter
│   └── knockKnock/                   # knockKnockTalkMap
├── database/
│   ├── mongoDB.js                    # 連線管理、getUserData、saveUserData
│   └── user.js                       # Mongoose Schema: { userId, city }
├── tests/                            # node:test 單元測試
└── render.yaml                       # Render.com 部署設定
```

---

## 部署 / Deployment

本專案部署於 [Render.com](https://render.com) Web Service。

```
Webhook URL: https://daily-linebot.onrender.com/callback
Start Command: node index.js
```

> **Note:** Free Plan 閒置 15 分鐘後休眠，首次請求冷啟動約 30 秒。

---

## 未來規劃 / Roadmap

| 功能 | 狀態 | 說明 |
|------|------|------|
| **LINE Rich Menu** | 規劃中 | 圖形化選單介面，一鍵觸發各 Bot |
| **推播通知** | 規劃中 | 主動推送天氣警報、地震速報 |
| **LLM NLU 整合** | 規劃中 | 以本地 Ollama（Llama 3.2）取代關鍵字比對，實現更自然的意圖識別；回答美化讓呆萌個性更鮮明 |
| **LLM 部署方案** | 評估中 | 候選：Cloudflare Workers AI 免費額度、GCP / AWS Serverless |
| **API 快取機制** | 規劃中 | 減少重複 API 呼叫，降低被限流風險 |

---

## 授權 / License

ISC
