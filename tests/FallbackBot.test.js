import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { FallbackBot } from "../bots/FallbackBot.js";
import { fallbackTalkMap } from "../data/miniBotPhrases/fallback/fallbackTalkMap.js";

describe("FallbackBot", () => {
  const bot = new FallbackBot();

  describe("canHandle()", () => {
    test("任何訊息都應回傳 true", () => {
      assert.strictEqual(bot.canHandle("你好"), true);
      assert.strictEqual(bot.canHandle("???"), true);
      assert.strictEqual(bot.canHandle("asjdfklasdjf"), true);
      assert.strictEqual(bot.canHandle(""), true);
    });
  });

  describe("handle()", () => {
    test("回傳字串", async () => {
      const result = await bot.handle("不知道什麼鬼", "user123");
      assert.strictEqual(typeof result, "string");
    });

    test("回傳值在 fallbackTalkMap 中", async () => {
      const result = await bot.handle("測試", "user123");
      assert.ok(fallbackTalkMap.includes(result), `「${result}」不在 fallbackTalkMap 中`);
    });

    test("多次呼叫皆回傳非空字串", async () => {
      for (let i = 0; i < 10; i++) {
        const result = await bot.handle("隨便輸入", "user123");
        assert.strictEqual(typeof result, "string");
        assert.ok(result.length > 0, "不應回傳空字串");
      }
    });
  });
});

describe("fallbackTalkMap", () => {
  test("話術數量在 6~8 句之間", () => {
    assert.ok(fallbackTalkMap.length >= 6 && fallbackTalkMap.length <= 8,
      `話術數量 ${fallbackTalkMap.length} 不在 6~8 範圍`);
  });

  test("每句話術都是非空字串", () => {
    fallbackTalkMap.forEach((phrase, i) => {
      assert.strictEqual(typeof phrase, "string", `第 ${i + 1} 句應為字串`);
      assert.ok(phrase.length > 0, `第 ${i + 1} 句不應為空`);
    });
  });
});
