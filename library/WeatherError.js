console.log(
  "🛠️ 優雅的錯誤處理系統載入中... 統一天下的錯誤處理！ (｡◕‿◕｡)"
);

/**
 * 天氣機器人專用錯誤類別
 * 統一錯誤處理 - 一個地方處理所有錯誤！
 */
export class WeatherError extends Error {
  constructor(message, code = "WEATHER_ERROR", originalError = null) {
    super(message);
    this.name = "WeatherError";
    this.code = code;
    this.originalError = originalError;
    this.timestamp = new Date();

    console.log(`🚨 WeatherError 發生: [${code}] ${message}`);
    if (originalError) {
      console.error("🐛 原始錯誤:", originalError.message);
    }
  }
}

/**
 * 錯誤代碼常數 - 優雅的常數定義！
 */
export const ERROR_CODES = {
  API_ERROR: "API_ERROR", // API 呼叫失敗
  CITY_NOT_FOUND: "CITY_NOT_FOUND", // 找不到城市
  DATA_FORMAT_ERROR: "DATA_FORMAT_ERROR", // 資料格式錯誤
  DATABASE_ERROR: "DATABASE_ERROR", // 資料庫錯誤
  PARSE_ERROR: "PARSE_ERROR", // 解析錯誤
};

/**
 * 統一錯誤處理器 - 一個地方處理所有錯誤！
 * @param {Error} error 錯誤物件
 * @returns {string} 給使用者看的友善訊息
 */
export function handleWeatherError(error) {
  console.error("💥 捕捉到錯誤，開始統一處理:", error.message);

  if (error instanceof WeatherError) {
    switch (error.code) {
      case ERROR_CODES.API_ERROR:
        return "🌐 天氣資料服務暫時無法使用，請稍後再試！";

      case ERROR_CODES.CITY_NOT_FOUND:
        return "🏙️ 找不到您指定的城市，請檢查城市名稱是否正確";

      case ERROR_CODES.DATA_FORMAT_ERROR:
        return "📊 天氣資料格式異常，已通知技術人員處理";

      case ERROR_CODES.DATABASE_ERROR:
        return "💾 使用者資料服務暫時異常，將使用預設設定";

      case ERROR_CODES.PARSE_ERROR:
        return "🔧 資料解析發生問題，請稍後再試";

      default:
        return "😅 系統出現未預期的狀況，請稍後再試";
    }
  }

  // 處理一般錯誤
  console.error("⚠️ 一般錯誤:", error.stack);
  return "抱歉，系統出現了一點問題，請稍後再試 (´･ω･`)";
}

/**
 * 快速建立錯誤的工廠函數
 */
export const createWeatherError = {
  apiError: (message, originalError) =>
    new WeatherError(message, ERROR_CODES.API_ERROR, originalError),

  cityNotFound: (cityName) =>
    new WeatherError(`找不到城市: ${cityName}`, ERROR_CODES.CITY_NOT_FOUND),

  dataFormatError: (details) =>
    new WeatherError(`資料格式錯誤: ${details}`, ERROR_CODES.DATA_FORMAT_ERROR),

  databaseError: (operation, originalError) =>
    new WeatherError(
      `資料庫操作失敗: ${operation}`,
      ERROR_CODES.DATABASE_ERROR,
      originalError
    ),

  parseError: (data, originalError) =>
    new WeatherError(
      `解析失敗: ${data}`,
      ERROR_CODES.PARSE_ERROR,
      originalError
    ),
};

console.log("✅ 統一錯誤處理系統載入完成！這才是專業的錯誤處理 💪");
