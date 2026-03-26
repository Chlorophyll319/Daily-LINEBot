# HolidayBot 完成紀錄

**日期**: 2026-03-26
**分支**: feature/holiday-bot → main（--no-ff merge）

---

## 實作內容

### 檔案清單

| 檔案 | 說明 |
|------|------|
| `data/miniBotPhrases/holiday/HolidayAdapter.js` | axios 取回政府辦公日曆 CSV |
| `services/HolidayService.js` | CSV 解析、今日上班判斷、下次放假查詢 |
| `data/miniBotPhrases/holiday/HolidayEmoji.js` | 依假日類別與工作狀態對應 emoji |
| `data/miniBotPhrases/holiday/holidayTalkMap.js` | 5 情境各 3 句呆萌話術 |
| `bots/HolidayBot.js` | 繼承 BaseBot，處理放假日查詢 |
| `routes/messageRouter.js` | 加入 HolidayBot 註冊 |

### API 資料來源

- **政府行政機關辦公日曆表（CSV）**
  - URL: `https://data.ntpc.gov.tw/api/datasets/308dcd75.../csv/file`
  - 欄位: date(YYYYMMDD)、year、name、isholiday（是/否）、holidaycategory、description

### 觸發詞

`今天要上班嗎` / `下次放假` / `放假` / `連假` / `holiday`

---

## 核心邏輯

### parseCsvRecords
- 移除 BOM（`\uFEFF`）
- 逐行 split，支援引號包覆欄位（含逗號）
- 不安裝 csv-parse 等套件

### getTodayWorkReport — 5 種情境

| 情境 | 條件 |
|------|------|
| 上班日 | isholiday=否，普通工作日 |
| 補班日 | isholiday=否，holidaycategory 含「調整上班」 |
| 連假前夕 | isholiday=否，明天起連假 >= 3 天 |
| 放假日 | isholiday=是，連假 < 3 天 |
| 連假中 | isholiday=是，所在連假 >= 3 天 |

### getNextHolidayReport
- 從今天後第一個 isholiday=是 開始計算
- 單天假日：顯示日期 + 名稱
- 連假（>= 2 天）：顯示起訖日期、共 N 天、假日名稱集合

---

## 測試結果

**34 / 34 全部通過**

| 測試項目 | 數量 |
|---------|------|
| canHandle（有效 + 無效） | 11 |
| parseCsvRecords（一般/BOM/引號） | 8 |
| getTodayWorkReport（5 情境） | 5 |
| getNextHolidayReport（單天/連假） | 5 |
| Error handling | 3 |
| 空資料處理 | 2 |

---

## Git Commits

```
bce74cd feat(holiday): 實作 HolidayBot 並註冊至 messageRouter
3359375 feat(holiday): 實作 HolidayEmoji 和 holidayTalkMap
4e48b82 feat(holiday): 實作 HolidayService - CSV 解析、今日上班判斷、下次放假查詢
1acb01f feat(holiday): 建立 HolidayBot 骨架檔案
c4f5739 feat(holiday): 合併 HolidayBot 功能至 main（merge commit）
```

---

## 下一步

- UVBot 實作（feature/uv-bot）
  - API: `O-A0005-001`（紫外線指數-每日紫外線指數最大值）
  - 欄位: elementName、Date、StationID、UVIndex
  - 觸發詞: 「紫外線」、「需要防曬嗎」
