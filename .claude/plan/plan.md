# LINE Bot 聊天機器人專案規劃

## 📋 專案現況總覽

### 基本資訊

- **專案名稱**: onlinever-Daily-LINEBot
- **主要功能**: 天氣查詢、空氣品質、地震資訊、紫外線指數、放假日查詢、淺草籤詩、智能對話
- **技術架構**: Node.js + Express + LINE Messaging API + MongoDB
- **最後更新**: 2026-03-26（Quick Reply 升級）

### 當前 Git 狀態

- **分支**: main
- **最新提交**: 📝 更新 README：補充城市查詢功能與模組架構說明 (b22cfc0)
- **未提交變更**: eslint.config.js, 規劃.md

## 🏗️ 架構設計 ✅ 已完成

### 分層架構

```
onlinever-Daily-LINEBot/
├── index.js                               # 主程式入口
├── routes/
│   └── messageRouter.js                   # 消息分發處理器
├── bots/
│   ├── BaseBot.js                         # Bot 抽象基類
│   ├── WeatherBot.js                      # 天氣機器人 ✅
│   └── FortuneBot.js                      # 淺草籤詩機器人 ✅
├── services/
│   ├── WeatherService.js                  # 天氣資料處理服務 ✅
│   ├── WeatherError.js                    # 錯誤處理工具
│   └── FortuneService.js                  # 籤詩服務邏輯 ✅
├── data/
│   ├── info/
│   │   └── AsakusaFortuneTelling.js       # 淺草籤詩資料 ✅
│   └── miniBotPhrases/
│       ├── weather/                       # 天氣模組 ✅
│       │   ├── CwaWeatherAdapter.js       # 中央氣象局 API 適配器
│       │   ├── TimeUtils.js               # 時間處理模組
│       │   ├── WeatherEmoji.js            # 天氣圖示模組
│       │   └── weatherTalkMap.js          # 天氣回應模板
│       └── fortune/                       # 籤詩模組 ✅
│           ├── fortuneTalkMap.js          # 籤詩回應模板
│           ├── FortuneFormatter.js        # 籤詩格式化工具
│           └── FortuneEmoji.js            # 籤詩表情符號工具
├── database/
│   ├── MongoDB.js                         # MongoDB 連線模組
│   └── user.js                            # 使用者資料模型
├── constants/                             # 常數定義
└── .claude/                               # Claude Code 設定
    ├── claudeLog/                         # 對話紀錄
    └── plan.md                            # 專案規劃文件（本檔案）
```

### 架構特色

- **🎯 職責分離**: routes → bots → services → adapters
- **🔧 可擴展設計**: 新增機器人只需繼承 BaseBot
- **📊 統一接口**: 標準化的 canHandle() 與 handle() 方法
- **🛡️ 錯誤處理**: 統一的錯誤處理與用戶友善回應
- **💾 狀態管理**: MongoDB 儲存使用者偏好設定

## 🎯 功能實作狀態

### 🌤️ 天氣服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **模組化重構完成** - 清晰的分層架構與模組化設計
- ✅ **單次城市天氣查詢** - 直接輸入城市名稱查詢，不影響預設設定
- ✅ **城市選單 UI 優化** - Flex Message 選單改為每行一個按鈕
- ✅ **查詢與設定分離** - 查詢操作與配置操作完全分離
- ✅ **預設城市管理** - 透過「設定城市」選單選擇才會記錄為預設

**觸發詞**: "天氣"、"weather"、"設定城市"、直接輸入城市名稱
**技術特色**: Flex Message UI、MongoDB 儲存、模組化設計

### 🌬️ 空氣品質服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **AirQualityBot 機器人** - 繼承 BaseBot，完整的查詢流程
- ✅ **AirQualityService 服務** - 多測站平均 AQI、最差站標記、格式化報告
- ✅ **AirQualityAdapter** - 環境部 AQI API 封裝（aqx_p_432 即時資料）
- ✅ **AirQualityEmoji** - AQI 數值對應 emoji 與等級名稱
- ✅ **airQualityTalkMap** - 6 個 AQI 等級各 3 句呆萌話術
- ✅ **Bug 修正** - API 回傳 flat array 格式（非 records 包裹），已相容處理

**觸發詞**: "空氣品質"、"空氣"、"AQI"、"aqi"、"PM2.5"、"pm2.5"
**技術特色**: 按用戶設定城市查詢、多測站聚合平均、共用 WeatherBot 城市設定

### 🌍 地震資訊服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **EarthquakeBot 機器人** - 繼承 BaseBot，查詢最新顯著有感地震
- ✅ **EarthquakeService 服務** - 解析 CWA 地震資料、震度排序去重、格式化報告
- ✅ **EarthquakeAdapter** - 中央氣象署 E-A0015-001 API 封裝
- ✅ **EarthquakeEmoji** - 震度（1–7級）與規模對應 emoji
- ✅ **earthquakeTalkMap** - 6 個震度等級各 3 句呆萌話術
- ✅ **Bug 修正** - ShakingArea 未排序 + 重複縣市，改為按震度降序去重後顯示前 5

**觸發詞**: "地震"、"剛剛有地震嗎"、"是哪裡搖"、"earthquake"
**技術特色**: 無需城市設定、全台最新地震、震度排序顯示受影響縣市

### 📅 放假日查詢服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **HolidayBot 機器人** - 繼承 BaseBot，今日上班查詢 + 下次放假查詢
- ✅ **HolidayService 服務** - parseCsvRecords、getTodayWorkReport、getNextHolidayReport
- ✅ **HolidayAdapter** - 政府行政機關辦公日曆 CSV 封裝（手動 split 解析，不安裝新套件）
- ✅ **HolidayEmoji** - 依假日類別與工作狀態對應 emoji
- ✅ **holidayTalkMap** - 6 情境各 3 句呆萌話術（上班日/放假日/補班日/連假前夕/連假中/下次放假）
- ✅ **34 項單元測試全過** - canHandle、CSV 解析、5 種情境、格式化輸出、錯誤處理均通過
- ✅ **Bug 修正**（2026-03-26）- DGPA CSV BOM 偵測改用 `headers.includes("是否放假")`，修正全日解析為上班日的問題
- ✅ **Bug 修正**（2026-03-26）- `buildNextHolidayReport` 話術改用「下次放假」群組，修正上班日查詢顯示「假日快樂！」的問題

**觸發詞**: "今天要上班嗎"、"下次放假"、"放假"、"連假"、"holiday"
**技術特色**: 無需城市設定、CSV BOM 處理、引號欄位解析、5 種工作情境判斷

### ☀️ 紫外線指數服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **UVBot 機器人** - 繼承 BaseBot，按用戶城市查詢當日 UV 指數
- ✅ **UVService 服務** - 依測站縣市對應表聚合平均、CITY_ALIAS fallback、格式化報告
- ✅ **UVAdapter** - 中央氣象署 O-A0005-001 紫外線每日最大值 API 封裝
- ✅ **UVEmoji** - UV 指數對應等級名稱（低/中等/高/非常高/極端）、emoji、防曬建議
- ✅ **uvTalkMap** - 5 等級各 3 句呆萌話術（統一「窩」自稱風格）
- ✅ **stationCountyMap** - 30 站 StationID → 縣市靜態對應表，排除高山站與孤立離島站

**觸發詞**: "紫外線"、"需要防曬嗎"、"UV"、"uv"
**技術特色**: 多測站平均（同縣市多站）、CITY_ALIAS 借用鄰近縣市、fallback 全台平均

### 🎋 淺草籤詩服務 ✅ 已完成 (100%)

**最新完成項目**：

- ✅ **FortuneBot 機器人** - 完整的籤詩機器人實作
- ✅ **FortuneService 服務** - 籤詩邏輯與 MongoDB 整合
- ✅ **籤詩資料模組** - 完整的100支淺草籤詩與小機器人 note
- ✅ **回應模板系統** - 豐富的籤詩回應與表情符號
- ✅ **用戶歷史記錄** - 抽籤歷史與統計功能

**觸發詞**: "抽籤"、"求籤"、"籤詩"、"運勢"、"淺草"、"占卜"、"第X號籤"
**技術特色**: 問題分類智能匹配、歷史記錄、統計分析、豐富回應模板

### 🧠 LLM 整合 📋 規劃中 (0%)

**用途一：自然語言理解（NLU）**
取代現有關鍵字比對，判斷使用者訊息是否在 Bot 功能範圍內，並決定交給哪個模組處理。

**用途二：回答美化**
將制式的功能回答，根據呆萌個性進行潤飾，讓回應更有趣。

**開發階段**：本地使用 Ollama 架設 LLM（Llama 3.2 或 Gemma 等小模型）

**部署階段**：待評估，候選方案：
- Cloudflare Workers AI（免費額度待驗證）
- GCP / AWS / Azure（考量求職展示用途，但需評估成本）

### 🤖 機器人性格設計 📋 已規劃 (設計完成)

**核心概念**: 假裝全知全能的呆萌機器人

#### 性格特色

- **知識問答模式**: 對知識性問題顧左右而言他
  - 回應話術：「再想想」、「再試試看」、「這個不需要知道啦」、「你現在還不用管這個」
- **日常聊天專家**: 只對實用資訊查詢認真回應
  - 觸發詞：天氣、假期、地震、空氣品質等
- **漸進式回應**: 重複未知情況會加強語氣
  - 「窩不知道」→「窩真的不知道」→「窩真的真的不知道」
  - 加入建議模板：「窩不知道啦！但你可以先去喝水」

#### 互動設計

- **知識問答喚醒**: 「我想問！」+ 問題
- **娛樂功能**: 淺草籤詩、擲杯、運勢籤
- **LINE 選單**: 一週天氣、三天天氣、假期查詢、求籤、擲杯、設定城市

## 🎯 開發優先級

### 🚀 立即目標 (本週)

1. **完成剩餘 4 個 Bot 重新實作**

   - 參考 WeatherBot 架構模式
   - 每個 Bot 都需要對應的 service 和 data 模組
   - 優先順序：AirQuality → Earthquake → Holiday → UV
   - ✅ Fortune Bot 已完成

2. **整合測試**
   - 測試所有功能正常運作
   - 確認消息路由正確分發

### 📱 中期目標 (2週內)

1. **LINE Rich Menu 整合**

   - 建立 Rich Menu 配置
   - 映射選單項目到對應功能

2. **系統優化**
   - 統一錯誤處理機制
   - 完善使用者體驗

### 🔮 長期目標 (1個月)

1. **LLM 整合**

   - 本地以 Ollama 驗證 NLU 與回答美化效果
   - 評估部署方案（Cloudflare Workers AI 優先）
   - 實作上下文記憶功能

2. **功能擴展**
   - 推播通知功能
   - API 快取機制

## 📊 專案進度指標

### 功能完整度

- **🤖 架構框架**: 100% 完成
- **☀️ 天氣服務**: 100% 完成（含模組化重構）
- **🎋 淺草籤詩**: 100% 完成（含歷史記錄與統計）
- **🌬️ 空氣品質**: 100% 完成
- **🌍 地震資訊**: 100% 完成
- **📅 放假日查詢**: 100% 完成
- **☀️ 紫外線指數**: 100% 完成
- **🤖 機器人性格**: 100% 完成（設計規劃完整）
- **👤 使用者系統**: 100% 完成
- **📱 LINE 介面**: 70% 完成（天氣選單 + 幫助 Quick Reply 按鈕）

### 技術債務狀態

#### 已解決 ✅

- **架構標準化** - 清晰的分層架構與模組化設計
- **天氣系統完整重構** - 模組化、UI 優化、功能分離
- **MongoDB 整合** - 使用者資料管理與城市偏好儲存
- **程式碼品質提升** - 統一風格、錯誤處理、防禦性編程
- **機器人性格設計** - 完整的呆萌性格規劃與互動設計

#### 待處理 ⏳

- **LINE Rich Menu 配置** - 完整的使用者介面整合
- **系統監控機制** - 錯誤追蹤與效能監控

#### 本次更新完成 ✅（2026-03-27 security）

- **LINE Webhook 簽名驗證確認** - linebot 套件內建 HMAC-SHA256 驗證（`verify: true` 預設），`listen()` 中對每個 POST 請求驗證 `x-line-signature`，不符回 400
- **Rate Limiting** - 新增 `services/RateLimiter.js`，每 userId 每分鐘最多 10 則（記憶體 Map，固定窗口），超限回「窩被你搞累了，休息一下 😮‍💨」
- **messageRouter 更新** - `handleMessage` 前段加入 `checkRateLimit(userId)` 檢查
- **10 項單元測試全過** - 簽名驗證 5 項（正確/錯誤/空/竄改/預設值）+ rate limit 5 項（前10則/第11則/獨立userId/窗口重置/計數正確）

#### 歷史更新完成 ✅（2026-03-26 前期）

- **EarthquakeBot 完整實作** - Bot + Service + Adapter + Emoji + TalkMap 全套模組
- **中央氣象署 API 整合** - E-A0015-001 顯著有感地震，公開 API 無需 Key
- **Bug 修正** - ShakingArea 未排序 + 重複縣市，改為按震度降序去重後顯示前 5
- **31 項單元測試全過** - canHandle、地震查詢、格式化輸出、錯誤處理均通過
- **HolidayBot 完整實作** - Bot + Service + Adapter + Emoji + TalkMap 全套模組
- **政府辦公日曆 CSV 解析** - 手動 split 處理 BOM + 引號欄位，無需新套件
- **5 種情境判斷** - 上班日、放假日、補班日、連假前夕、連假中
- **34 項單元測試全過** - canHandle、CSV 解析、5 情境、錯誤處理均通過
- **UVBot 完整實作** - Bot + Service + Adapter + Emoji + TalkMap + stationCountyMap 全套模組
- **CWA O-A0005-001 API 整合** - 每日紫外線最大值，30 站 StationID → 縣市靜態對應表
- **多站聚合策略** - 同縣市多站取平均（如高雄 2 站）、CITY_ALIAS fallback、全台平均 fallback
- **話術風格統一** - 5 等級各 3 句，全部以「窩」自稱呆萌風格

#### 本次更新完成 ✅（2026-03-26 help-quick-reply）

- **幫助 Quick Reply 升級** - 「幫助」回應改為附帶 6 個 Quick Reply 按鈕（天氣/空氣品質/地震/紫外線/放假/運勢）
- **HelpService 新增** - `services/HelpService.js`：`buildHelpMessage(text)` + `HELP_QUICK_REPLY_ITEMS`
- **messageRouter 更新** - `generateHelpMessage()` 改回傳物件（含 quickReply）
- **13 項單元測試全過** - 訊息格式、label 長度限制、6 個 Bot 觸發詞完整性均通過
- **測試框架建立** - `npm test` 使用 Node.js 內建 `node:test`，無需安裝新套件

#### 上次更新完成 ✅（2026-03-26 chat-ux）

- **chat-ux 改造** - 6 個 Service 全部改為回傳 `string[]`，分多則對話框呈現（話術 → 資料 → 話術）
- **WeatherService** - `[話術, 天氣資料]`
- **AirQualityService** - `[話術, 空氣資料]`
- **EarthquakeService** - `[時間話術, 地震資料, 震度話術]`
- **HolidayService** - `[話術, 日曆資料]`
- **UVService** - `[話術, UV 資料]`
- **FortuneFormatter** - `[開場話術, 籤詩+解釋, 運勢+收尾]`
- **HolidayBot Bug 修正 1** - DGPA CSV `isDgpaFormat` 偵測改用 `headers.includes("是否放假")`，修正 BOM 造成全日解析為「否」的問題
- **HolidayBot Bug 修正 2** - `buildNextHolidayReport` 話術改用新增的「下次放假」群組，修正上班日查詢出現「假日快樂！」的語意錯誤

## 🚀 部署資訊

### 開發環境

- **狀態**: 穩定開發中
- **分支**: main
- **Git 狀態**: 有未提交的變更（eslint.config.js, 規劃.md）

### 生產環境

- **部署平台**: Render (render.yaml 已配置)
- **狀態**: 基礎功能就緒，待完整功能實作完成後部署

## 📝 開發重點

### 當前階段

- **🎯 主要任務**: 完成剩餘四個 Bot 的重新實作（✅ FortuneBot 已完成）
- **🛠️ 技術重點**: 遵循 WeatherBot 的架構模式
- **📋 開發方針**: 模組化設計、統一介面、錯誤處理一致性

### 開發指導原則

1. **模組化設計** - 每個 Bot 都應該有清晰的職責分離
2. **統一介面** - 所有 Bot 都繼承 BaseBot 抽象類
3. **錯誤處理一致性** - 統一的錯誤回應格式
4. **用戶體驗優先** - Flex Message 與友善的互動設計

## 🏆 專案亮點

### 技術成就

- **🧹 架構重構完成**: 標準化分層架構，100% 模組化設計
- **📊 程式碼品質提升**: 消除重複代碼，統一錯誤處理
- **🎯 用戶體驗優化**: Flex Message 選單，功能操作分離
- **📈 可維護性**: BaseBot 框架，支援快速功能擴展
- **🌤️ 天氣系統完成**: 完整重構，模組化設計，個人化體驗
- **🎋 淺草籤詩完成**: 完整的籤詩服務，歷史記錄，豐富回應系統
- **🤖 性格設計完成**: 呆萌機器人性格規劃與互動邏輯設計

### 專案特色

1. **🏗️ 現代化架構**: 模組化 Bot 框架，可擴展設計
2. **📊 多元資訊整合**: 涵蓋天氣、空氣、地震、假期等實用資訊
3. **🤖 智能化設計**: 結合實用功能與娛樂元素
4. **😊 獨特性格設計**: 假裝全知全能的呆萌機器人，顧左右而言他的可愛互動
5. **👤 個人化體驗**: MongoDB 儲存使用者偏好設定
6. **📱 友善介面**: LINE 選單與 Flex Message 美觀呈現

---

_最後更新: 2026-03-27_
_專案狀態: 安全性功能加入（Webhook 簽名驗證確認 + Rate Limiting），10 項測試全過_
_下階段目標: LINE Rich Menu 整合、推播通知、LLM NLU_
_開發重點: 安全層就緒，可進行 Rich Menu 整合_
