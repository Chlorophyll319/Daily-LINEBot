// 天氣圖示模組 - 單純的映射邏輯，不混雜其他業務

/**
 * 根據天氣現象返回對應的 emoji
 * 使用簡單的字符串包含檢查，按優先級排序
 */
export function getWeatherEmoji(weatherDesc) {
  if (!weatherDesc) return "🌤️";

  // 雨相關 - 優先級最高
  if (weatherDesc.includes("雷陣雨")) return "⛈️";
  if (weatherDesc.includes("陣雨")) return "🌦️";
  if (weatherDesc.includes("雨")) return "🌧️";

  // 晴相關
  if (weatherDesc.includes("晴")) {
    return weatherDesc.includes("多雲") || weatherDesc.includes("雲")
      ? "⛅"
      : "☀️";
  }

  // 其他天氣現象
  if (weatherDesc.includes("多雲")) return "⛅";
  if (weatherDesc.includes("陰")) return "☁️";
  if (weatherDesc.includes("霧")) return "🌫️";
  if (weatherDesc.includes("雪")) return "❄️";

  return "🌤️";
}
