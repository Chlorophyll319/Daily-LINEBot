import askGodData from "../data/info/AsakusaFortuneTelling.js";

console.log(
  "🏮 簡潔版淺草籤詩 API 模組載入中... 神明保佑，程式碼無 Bug！ (人´∀`)"
);

const fortuneData = askGodData();

/**
 * 取得淺草寺100籤詩資料
 * 採用 weatherSimple.js 的簡潔風格，讓神明指引更清晰
 *
 * @returns {Object|null} 籤詩資料或 null
 */
export function getFortuneTelling() {
  console.log("🙏 正在向淺草寺神明請示... 虔誠求籤中");

  try {
    if (!fortuneData || !Array.isArray(fortuneData)) {
      console.error("💔 神明的資料庫似乎有問題... 可能需要更多香火錢");
      return null;
    }

    console.log(`✨ 神明降旨成功！共有 ${fortuneData.length} 支籤詩可供參考`);
    console.log("📦 籤詩資料已準備就緒，請虔誠抽籤");

    return fortuneData;
  } catch (error) {
    console.error(`🐛 取得淺草籤詩失敗，業障深重：${error.message}`);
    return null;
  }
}

/**
 * 隨機抽取一支籤詩 - 最常用的功能
 * 讓神明為你指點迷津！
 */
export function drawRandomFortune() {
  console.log("🎲 正在隨機抽取籤詩... 讓命運之神決定吧！");

  try {
    const allFortunes = getFortuneTelling();
    if (!allFortunes || allFortunes.length === 0) {
      console.error("😔 沒有籤詩可以抽取，神明可能在休息");
      return null;
    }

    const randomIndex = Math.floor(Math.random() * allFortunes.length);
    const selectedFortune = allFortunes[randomIndex];

    console.log(
      `🎯 抽中第 ${randomIndex + 1} 支籤！神明的指引：${selectedFortune?.title || "神秘籤詩"}`
    );
    return selectedFortune;
  } catch (error) {
    console.error(`🐛 抽籤失敗，可能需要更虔誠的心：${error.message}`);
    return null;
  }
}

/**
 * 根據籤號取得特定籤詩
 * @param {number} fortuneNumber 籤號 (1-100)
 */
export function getFortuneByNumber(fortuneNumber) {
  console.log(`🔍 正在尋找第 ${fortuneNumber} 支籤詩... 神明會給出答案`);

  try {
    const allFortunes = getFortuneTelling();
    if (!allFortunes || allFortunes.length === 0) {
      console.error("😔 籤詩資料庫空空如也，神明可能在更新系統");
      return null;
    }

    // 籤號從1開始，陣列索引從0開始
    const fortuneIndex = fortuneNumber - 1;
    if (fortuneIndex < 0 || fortuneIndex >= allFortunes.length) {
      console.error(
        `😅 第 ${fortuneNumber} 支籤不存在，請選擇 1-${allFortunes.length} 之間的籤號`
      );
      return null;
    }

    const selectedFortune = allFortunes[fortuneIndex];
    console.log(
      `📜 找到第 ${fortuneNumber} 支籤：${selectedFortune?.title || "神秘籤詩"}`
    );
    return selectedFortune;
  } catch (error) {
    console.error(`🐛 取得特定籤詩失敗：${error.message}`);
    return null;
  }
}

console.log("✅ 簡潔版淺草籤詩 API 模組載入完成！神明保佑，功德無量 🙏");

// 保持向下相容性的別名
export const askGod = getFortuneTelling;
