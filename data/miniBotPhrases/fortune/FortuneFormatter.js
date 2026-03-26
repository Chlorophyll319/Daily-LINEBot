import {
  getTypeOpening,
  getCategoryAdvice,
  getRandomBlessing,
} from "./fortuneTalkMap.js";

/**
 * 籤詩回應格式化工具
 */

// 類別到結果鍵的映射表，消除複雜的查找邏輯
const CATEGORY_RESULT_MAP = Object.freeze({
  愛情: ["交往", "結婚", "嫁娶"],
  事業: ["工作", "事業"],
  學業: ["學業", "考試"],
  健康: ["疾病"],
  財運: ["財運"],
  旅行: ["旅行"],
  搬家: ["搬家"],
  蓋房: ["蓋新居"],
});

/**
 * 根據問題類別獲取特定結果
 * @param {Object} fortune 籤詩物件
 * @param {string} category 問題類別
 * @returns {string|null} 特定問題的結果
 */
function getSpecificResult(fortune, category) {
  const resultKeys = CATEGORY_RESULT_MAP[category];
  if (!resultKeys) return null;

  // 返回第一個存在的結果
  return resultKeys.find((key) => fortune.result[key]) || null;
}

/**
 * 格式化完整的籤詩回應
 * @param {Object} fortune 籤詩物件
 * @param {string|null} questionCategory 問題類別
 * @returns {string[]} 三則訊息：[開場話術, 籤詩+解釋, 運勢+收尾]
 */
export function formatFortuneResponse(fortune, questionCategory = null) {
  // 第1則：開場話術
  const msg1 = getTypeOpening(fortune.type);

  // 第2則：籤號 + 詩句 + 解釋 + 特定類別結果
  const specificResult = questionCategory
    ? getSpecificResult(fortune, questionCategory)
    : null;
  const msg2Parts = [
    formatBasicInfo(fortune),
    "",
    "📜 籤詩：",
    `「${fortune.poem}」`,
    "",
    "💭 解釋：",
    fortune.explain,
  ];
  if (specificResult) {
    msg2Parts.push("", `🎯 ${questionCategory}運勢：`, specificResult);
  }
  const msg2 = msg2Parts.join("\n");

  // 第3則：各方面運勢 + 小機器人的話 + 類別建議 + 結尾祝福
  const msg3Parts = [
    "🔮 各方面運勢：",
    formatResults(fortune.result),
  ];
  if (fortune.note) {
    msg3Parts.push("", "🤖 小機器人的話：", fortune.note);
  }
  if (questionCategory) {
    const advice = getCategoryAdvice(questionCategory);
    if (advice) msg3Parts.push("", advice);
  }
  msg3Parts.push("", getRandomBlessing());
  const msg3 = msg3Parts.join("\n");

  return [msg1, msg2, msg3];
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

// 統一的表情符號映射
const TYPE_EMOJI_MAP = Object.freeze({
  大吉: "🌟",
  吉: "✨",
  小吉: "🌸",
  末吉: "🌿",
  凶: "🌙",
});

const RESULT_EMOJI_MAP = Object.freeze({
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
});

/**
 * 獲取籤詩類型對應的表情符號
 * @param {string} type 籤詩類型
 * @returns {string} 表情符號
 */
function getTypeEmoji(type) {
  return TYPE_EMOJI_MAP[type] || "✨";
}

/**
 * 格式化運勢結果
 * @param {Object} results 運勢結果物件
 * @returns {string} 格式化的結果
 */
function formatResults(results) {
  return Object.entries(results)
    .map(([key, value]) => {
      const emoji = RESULT_EMOJI_MAP[key] || "🔸";
      return `${emoji} ${key}：${value}`;
    })
    .join("\n");
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
