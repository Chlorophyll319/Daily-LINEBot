# 專案架構與開發指引

LINE Bot 服務，使用 Express + LINE Bot SDK，部署於 Render.com，資料庫為 MongoDB Atlas。

---

## 開發指令

```bash
npm install       # 安裝依賴
npm run dev       # 開發模式（nodemon 自動重啟）
npm start         # 生產模式
```

目前無測試套件（`npm test` 會直接 exit 1）。

---

## 分層結構

```
index.js                         # 入口：初始化 DB、LINE Bot、Express server（Port 8080）
routes/messageRouter.js          # 訊息分發：接收 LINE 事件 → 選擇 Bot → 委派處理
bots/
  BaseBot.js                     # 抽象基類：canHandle() / handle() / getHelpInfo()
  WeatherBot.js                  # 天氣查詢、城市設定（Flex Message）
  FortuneBot.js                  # 淺草籤詩抽籤
  AirQualityBot.js               # 空氣品質 AQI 查詢（按用戶城市）
  EarthquakeBot.js               # 地震查詢（最新顯著有感地震）
  HolidayBot.js                  # 放假日查詢（今日上班/下次放假）
  UVBot.js                       # 紫外線指數查詢（按用戶城市）
services/
  WeatherService.js              # 格式化中央氣象局原始資料為人可讀文字
  WeatherError.js                # 統一天氣錯誤處理
  AirQualityService.js           # 多測站 AQI 聚合、格式化報告
  EarthquakeService.js           # 地震資料解析、震度排序去重、格式化報告
  HolidayService.js              # CSV 解析、今日上班判斷（5 情境）、下次放假查詢
  UVService.js                   # 縣市測站聚合平均 UV 指數、格式化報告
database/
  mongoDB.js                     # 連線管理、getUserData()、saveUserData()
  user.js                        # Mongoose Schema：{ userId, city }
data/miniBotPhrases/
  weather/CwaWeatherAdapter.js   # 中央氣象局 API 封裝（6種 API、22個縣市）
  fortune/                       # 籤詩資料與解析工具
  airQuality/                    # AQI 模組：Adapter、Emoji、TalkMap
  earthquake/                    # 地震模組：Adapter、Emoji、TalkMap
  holiday/                       # 放假日模組：Adapter（CSV）、Emoji、TalkMap（5 情境）
  uv/                            # 紫外線模組：Adapter、Emoji、TalkMap、stationCountyMap（30 站）
```

---

## 新增 Bot

1. 在 `bots/` 建立繼承 `BaseBot` 的類別，實作 `canHandle()`、`handle()`、`getHelpInfo()`
2. 在 `routes/messageRouter.js` 中 import 並加入 bots 陣列

---

## 環境變數（參考 `.env.sample`）

| 變數 | 說明 |
|------|------|
| `CHANNEL_ID` | LINE Bot Channel ID |
| `CHANNEL_SECRET` | LINE Bot Channel Secret |
| `CHANNEL_ACCESS_TOKEN` | LINE Bot Access Token |
| `MONGODB_URI` | MongoDB Atlas 連線字串 |
| `PORT` | 伺服器埠號（預設 8080） |

---

## 部署

- 平台：Render.com Web Service
- Webhook URL：`https://daily-linebot.onrender.com/callback`
- 啟動指令：`node index.js`
- 注意：Free Plan 閒置 15 分鐘後休眠，首次請求冷啟動約 30 秒

---

## 功能狀態

### 已完成 ✅

| 功能 | 說明 |
|------|------|
| WeatherBot | 7天預報、Flex Message 城市選單（22 城市）、個人化城市設定、查詢與設定分離 |
| FortuneBot | 淺草 100 籤、問題分類智能匹配、用戶歷史記錄（MongoDB）、豐富回應模板 |
| AirQualityBot | 即時 AQI 查詢（環境部 API）、多測站聚合平均、按用戶城市查詢、6 等級話術 |
| EarthquakeBot | 最新顯著有感地震（CWA E-A0015-001）、震度排序去重、受影響縣市前 5、6 震度分組話術 |
| HolidayBot | 今日上班/放假查詢（政府辦公日曆 CSV）、下次放假資訊、5 情境話術（上班日/放假日/補班日/連假前夕/連假中） |
| UVBot | 當日紫外線最大值（CWA O-A0005-001）、按用戶城市查詢、多站平均、5 等級話術 |
| MongoDB 整合 | 使用者城市偏好、抽籤歷史儲存 |
| 小機器人性格 | 天氣代碼全部轉為小機器人風格（42 個描述）、對潮濕天氣表達恐懼 |
| 籤詩 Note | 100 支籤全部補充小機器人 / 正式機器人雙風格 note |

### 規劃中 📋

- LINE Rich Menu 整合
- 推播通知
- Google Cloud Natural Language（未定案）
