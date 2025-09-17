import {
  getTypeOpening,
  getCategoryAdvice,
  getRandomBlessing,
} from "./fortuneTalkMap.js";

/**
 * 籤詩回應格式化工具
 */

/**
 * 根據問題類別獲取特定結果
 * @param {Object} fortune 籤詩物件
 * @param {string} category 問題類別
 * @returns {string} 特定問題的結果
 */
function getSpecificResult(fortune, category) {
  const categoryMap = {
    愛情: ["交往", "結婚"],
    事業: ["工作", "事業"],
    學業: ["學業", "考試"],
    健康: ["疾病"],
    財運: ["財運", "投資"],
    旅行: ["旅行"],
    搬家: ["搬家"],
    蓋房: ["蓋新居"],
  };

  const resultKeys = categoryMap[category];
  if (!resultKeys) return null;

  // 找到第一個存在的結果
  for (const key of resultKeys) {
    if (fortune.result[key]) {
      return fortune.result[key];
    }
  }

  return null;
}

/**
 * 格式化完整的籤詩回應
 * @param {Object} fortune 籤詩物件
 * @param {string|null} questionCategory 問題類別
 * @returns {string} 格式化後的回應
 */
export function formatFortuneResponse(fortune, questionCategory = null) {
  const parts = [];

  // 開場白
  parts.push(getTypeOpening(fortune.type));
  parts.push("");

  // 籤詩基本資訊
  parts.push(formatBasicInfo(fortune));
  parts.push("");

  // 籤詩詩句
  parts.push("📜 籤詩：");
  parts.push(`「${fortune.poem}」`);
  parts.push("");

  // 籤詩解釋
  parts.push("💭 解釋：");
  parts.push(fortune.explain);
  parts.push("");

  // 特定問題結果（如果有指定類別）
  if (questionCategory) {
    const specificResult = getSpecificResult(fortune, questionCategory);
    if (specificResult) {
      parts.push(`🎯 ${questionCategory}運勢：`);
      parts.push(specificResult);
      parts.push("");
    }
  }

  // 主要運勢結果
  parts.push("🔮 各方面運勢：");
  parts.push(formatResults(fortune.result));
  parts.push("");

  // 小機器人的貼心提醒
  if (fortune.note) {
    parts.push("🤖 小機器人的話：");
    parts.push(fortune.note);
    parts.push("");
  }

  // 問題類別建議
  if (questionCategory) {
    const advice = getCategoryAdvice(questionCategory);
    if (advice) {
      parts.push(advice);
      parts.push("");
    }
  }

  // 結尾祝福
  parts.push(getRandomBlessing());

  return parts.join("\n");
}

/**
 * 格式化籤詩基本資訊
 * @param {Object} fortune 籤詩物件
 * @returns {string} 格式化的基本資訊
 */
function formatBasicInfo(fortune) {
  const typeEmoji = getTypeEmoji(fortune.type);
  return `🎋 第 ${fortune.id} 號籤 | ${typeEmoji} ${fortune.type}`;
}

/**
 * 獲取籤詩類型對應的表情符號
 * @param {string} type 籤詩類型
 * @returns {string} 表情符號
 */
function getTypeEmoji(type) {
  const emojiMap = {
    大吉: "🌟",
    吉: "✨",
    小吉: "🌸",
    末吉: "🌿",
    凶: "🌙",
  };
  return emojiMap[type] || "✨";
}

/**
 * 格式化運勢結果
 * @param {Object} results 運勢結果物件
 * @returns {string} 格式化的結果
 */
function formatResults(results) {
  const resultParts = [];
  const resultEmojis = {
    願望: "💫",
    疾病: "💊",
    遺失物: "🔍",
    盼望的人: "👥",
    蓋新居: "🏠",
    搬家: "📦",
    旅行: "✈️",
    結婚: "💒",
    交往: "💕",
    嫁娶: "💒",
    學業: "📚",
    事業: "💼",
    工作: "💼",
    財運: "💰",
  };

  for (const [key, value] of Object.entries(results)) {
    const emoji = resultEmojis[key] || "🔸";
    resultParts.push(`${emoji} ${key}：${value}`);
  }

  return resultParts.join("\n");
}

/**
 * 格式化簡化版籤詩回應（用於快速查詢）
 * @param {Object} fortune 籤詩物件
 * @returns {string} 簡化的回應
 */
export function formatSimpleResponse(fortune) {
  const typeEmoji = getTypeEmoji(fortune.type);

  return `🎋 第 ${fortune.id} 號籤 | ${typeEmoji} ${fortune.type}

📜 「${fortune.poem}」

${fortune.note || ""}

${getRandomBlessing()}`;
}

/**
 * 格式化籤詩歷史記錄
 * @param {Array} history 歷史記錄陣列
 * @returns {string} 格式化的歷史記錄
 */
export function formatHistory(history) {
  if (history.length === 0) {
    return "🤖 小機器人查詢：您還沒有抽籤記錄喔！";
  }

  const parts = ["📊 您的抽籤歷史：", ""];

  history.forEach((record, index) => {
    const date = new Date(record.timestamp).toLocaleDateString("zh-TW");
    const typeEmoji = getTypeEmoji(record.fortuneType);
    const categoryText = record.questionCategory
      ? `(${record.questionCategory})`
      : "";

    parts.push(
      `${index + 1}. ${date} - 第${record.fortuneNumber}號 ${typeEmoji}${record.fortuneType} ${categoryText}`
    );
  });

  return parts.join("\n");
}

/**
 * 格式化籤詩統計資料
 * @param {Object} stats 統計資料
 * @returns {string} 格式化的統計資料
 */
export function formatStats(stats) {
  if (stats.total === 0) {
    return "🤖 小機器人統計：您還沒有抽籤記錄喔！";
  }

  const parts = [
    "📈 您的籤詩統計：",
    "",
    `🎯 總抽籤次數：${stats.total} 次`,
    "",
    "📊 籤詩類型分布：",
  ];

  const types = ["大吉", "吉", "小吉", "末吉", "凶"];
  types.forEach((type) => {
    if (stats[type] > 0) {
      const percentage = ((stats[type] / stats.total) * 100).toFixed(1);
      const emoji = getTypeEmoji(type);
      parts.push(`${emoji} ${type}：${stats[type]} 次 (${percentage}%)`);
    }
  });

  return parts.join("\n");
}
