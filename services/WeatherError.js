/**
 * 天氣錯誤處理工具 - 統一錯誤處理和用戶友善的錯誤回應
 */

export const createWeatherError = {
  /**
   * API 錯誤
   */
  apiError: (message) => ({
    type: "API_ERROR",
    message: message || "天氣資料取得失敗",
    timestamp: new Date().toISOString(),
  }),

  /**
   * 資料庫錯誤
   */
  databaseError: (operation, originalError) => ({
    type: "DATABASE_ERROR",
    message: `${operation}失敗`,
    originalError: originalError?.message,
    timestamp: new Date().toISOString(),
  }),

  /**
   * 資料處理錯誤
   */
  dataProcessingError: (message) => ({
    type: "DATA_PROCESSING_ERROR",
    message: message || "資料處理失敗",
    timestamp: new Date().toISOString(),
  }),
};

/**
 * 處理錯誤並返回用戶友善的回應
 */
export function handleWeatherError(error) {
  console.error("WeatherError:", error);

  // 根據錯誤類型返回對應的用戶友善訊息
  switch (error.type) {
    case "API_ERROR":
      return "抱歉，目前無法取得天氣資料 (´･ω･`) 請稍後再試！";

    case "DATABASE_ERROR":
      return "系統處理中遇到小問題 (´･ω･`) 請稍後再試！";

    case "DATA_PROCESSING_ERROR":
      return "天氣資料處理時出現問題 (´･ω･`) 請稍後再試！";

    default:
      // 處理一般錯誤
      return "抱歉，系統出現了一點小問題 (´･ω･`) 請稍後再試！";
  }
}
