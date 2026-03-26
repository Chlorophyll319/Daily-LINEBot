import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { DivineBot } from "../bots/DivineBot.js";
import {
  cast,
  getDivineReading,
  DIVINE_RESULTS,
} from "../services/DivineService.js";

describe("DivineBot", () => {
  const bot = new DivineBot();

  describe("canHandle()", () => {
    const triggerWords = ["擲杯", "問杯", "卜杯", "擲個杯", "問問看", "問神", "擲筊"];

    triggerWords.forEach((word) => {
      test(`觸發詞「${word}」應回傳 true`, () => {
        assert.strictEqual(bot.canHandle(word), true);
      });
    });

    test("無關訊息應回傳 false", () => {
      assert.strictEqual(bot.canHandle("今天天氣"), false);
      assert.strictEqual(bot.canHandle("抽籤"), false);
      assert.strictEqual(bot.canHandle("你好"), false);
    });

    test("包含觸發詞的複合訊息應回傳 true", () => {
      assert.strictEqual(bot.canHandle("我想擲杯問神明"), true);
      assert.strictEqual(bot.canHandle("幫我問神看看"), true);
    });
  });

  describe("handle()", () => {
    test("回傳陣列（多則訊息）", async () => {
      const result = await bot.handle("擲杯", "user123");
      assert.ok(Array.isArray(result), "應回傳陣列");
    });

    test("回傳 3 則訊息", async () => {
      const result = await bot.handle("擲杯", "user123");
      assert.strictEqual(result.length, 3);
    });

    test("每則訊息都是非空字串", async () => {
      const result = await bot.handle("問神", "user456");
      result.forEach((msg, i) => {
        assert.strictEqual(typeof msg, "string", `第 ${i + 1} 則應為字串`);
        assert.ok(msg.length > 0, `第 ${i + 1} 則不應為空`);
      });
    });
  });
});

describe("DivineService", () => {
  describe("cast()", () => {
    test("回傳值為合法結果之一", () => {
      const validResults = Object.values(DIVINE_RESULTS);
      for (let i = 0; i < 50; i++) {
        const result = cast();
        assert.ok(validResults.includes(result), `「${result}」不在合法結果中`);
      }
    });

    test("多次擲杯，三種結果都能出現（機率統計，樣本 200 次）", () => {
      const counts = { 聖杯: 0, 笑杯: 0, 陰杯: 0 };
      for (let i = 0; i < 200; i++) {
        counts[cast()]++;
      }
      // 各結果至少出現 1 次（概率極低會失敗）
      assert.ok(counts["聖杯"] > 0, "聖杯應該會出現");
      assert.ok(counts["笑杯"] > 0, "笑杯應該會出現");
      assert.ok(counts["陰杯"] > 0, "陰杯應該會出現");
    });

    test("聖杯占比約 50%（±15%，200 次樣本）", () => {
      let shenCount = 0;
      const N = 200;
      for (let i = 0; i < N; i++) {
        if (cast() === DIVINE_RESULTS.SHEN) shenCount++;
      }
      const ratio = shenCount / N;
      assert.ok(ratio >= 0.35 && ratio <= 0.65, `聖杯比例 ${ratio.toFixed(2)} 超出預期範圍`);
    });
  });

  describe("getDivineReading()", () => {
    test("回傳 3 則訊息的陣列", () => {
      const result = getDivineReading();
      assert.ok(Array.isArray(result));
      assert.strictEqual(result.length, 3);
    });

    test("第 2 則訊息包含擲杯結果關鍵字", () => {
      const validKeywords = ["聖杯", "笑杯", "陰杯"];
      for (let i = 0; i < 10; i++) {
        const [, msg2] = getDivineReading();
        const hasKeyword = validKeywords.some((kw) => msg2.includes(kw));
        assert.ok(hasKeyword, `第 2 則訊息應包含擲杯結果：「${msg2}」`);
      }
    });
  });
});
