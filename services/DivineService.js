import {
  castingPhrases,
  shenBeiPhrases,
  shenBeiExplain,
  xiaoBeiPhrases,
  xiaoBeiExplain,
  yinBeiPhrases,
  yinBeiExplain,
  closingPhrases,
  randomFrom,
} from "../data/miniBotPhrases/divine/divineTalkMap.js";

// 擲杯結果定義
export const DIVINE_RESULTS = Object.freeze({
  SHEN: "聖杯", // 一正一反，50%
  XIAO: "笑杯", // 兩正，25%
  YIN: "陰杯",  // 兩反，25%
});

/**
 * 擲杯 — 依機率隨機決定結果
 * 聖杯 50%、笑杯 25%、陰杯 25%
 * @returns {string} 擲杯結果
 */
export function cast() {
  const rand = Math.random();
  if (rand < 0.5) return DIVINE_RESULTS.SHEN;
  if (rand < 0.75) return DIVINE_RESULTS.XIAO;
  return DIVINE_RESULTS.YIN;
}

/**
 * 取得擲杯結果的話術
 * @param {string} result 擲杯結果
 * @returns {{ title: string, explain: string }}
 */
function getPhrases(result) {
  switch (result) {
    case DIVINE_RESULTS.SHEN:
      return { title: randomFrom(shenBeiPhrases), explain: randomFrom(shenBeiExplain) };
    case DIVINE_RESULTS.XIAO:
      return { title: randomFrom(xiaoBeiPhrases), explain: randomFrom(xiaoBeiExplain) };
    case DIVINE_RESULTS.YIN:
      return { title: randomFrom(yinBeiPhrases), explain: randomFrom(yinBeiExplain) };
    default:
      return { title: "🤖 結果未知...", explain: "請再試一次。" };
  }
}

/**
 * 執行擲杯並回傳格式化後的訊息陣列（chat-ux 多則風格）
 * @returns {string[]} [開場, 結果+解釋, 收尾]
 */
export function getDivineReading() {
  const result = cast();
  const { title, explain } = getPhrases(result);

  const msg1 = randomFrom(castingPhrases);

  const msg2 = `${title}\n\n📖 ${explain}`;

  const msg3 = randomFrom(closingPhrases);

  return [msg1, msg2, msg3];
}
