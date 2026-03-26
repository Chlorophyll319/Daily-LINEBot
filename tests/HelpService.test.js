import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  buildHelpMessage,
  HELP_QUICK_REPLY_ITEMS,
} from "../services/HelpService.js";

describe("HelpService", () => {
  describe("buildHelpMessage(text)", () => {
    test("回傳物件而非字串", () => {
      const result = buildHelpMessage("測試訊息");
      assert.strictEqual(typeof result, "object");
    });

    test("訊息 type 為 text", () => {
      const result = buildHelpMessage("測試訊息");
      assert.strictEqual(result.type, "text");
    });

    test("訊息 text 與傳入內容相同", () => {
      const text = "🤖 測試幫助訊息";
      const result = buildHelpMessage(text);
      assert.strictEqual(result.text, text);
    });

    test("包含 quickReply 欄位", () => {
      const result = buildHelpMessage("測試");
      assert.ok(result.quickReply, "應有 quickReply 欄位");
      assert.ok(
        Array.isArray(result.quickReply.items),
        "quickReply.items 應為陣列"
      );
    });

    test("quickReply items 數量與 HELP_QUICK_REPLY_ITEMS 一致", () => {
      const result = buildHelpMessage("測試");
      assert.strictEqual(
        result.quickReply.items.length,
        HELP_QUICK_REPLY_ITEMS.length
      );
    });

    test("每個 item 符合 LINE Quick Reply action 格式", () => {
      const result = buildHelpMessage("測試");
      for (const item of result.quickReply.items) {
        assert.strictEqual(item.type, "action", "item.type 應為 action");
        assert.strictEqual(
          item.action.type,
          "message",
          "action.type 應為 message"
        );
        assert.ok(
          typeof item.action.label === "string" && item.action.label.length > 0,
          "label 應為非空字串"
        );
        assert.ok(
          typeof item.action.text === "string" && item.action.text.length > 0,
          "text 應為非空字串"
        );
      }
    });

    test("每個 label 不超過 LINE 限制的 20 字元", () => {
      const result = buildHelpMessage("測試");
      for (const item of result.quickReply.items) {
        assert.ok(
          item.action.label.length <= 20,
          `Label "${item.action.label}" 超過 20 字元上限`
        );
      }
    });
  });

  describe("HELP_QUICK_REPLY_ITEMS 涵蓋所有 Bot 觸發詞", () => {
    const texts = HELP_QUICK_REPLY_ITEMS.map((i) => i.text);

    test('包含 WeatherBot 觸發詞「天氣」', () => {
      assert.ok(texts.includes("天氣"), '缺少觸發詞「天氣」');
    });

    test('包含 AirQualityBot 觸發詞「空氣品質」', () => {
      assert.ok(texts.includes("空氣品質"), '缺少觸發詞「空氣品質」');
    });

    test('包含 EarthquakeBot 觸發詞「地震」', () => {
      assert.ok(texts.includes("地震"), '缺少觸發詞「地震」');
    });

    test('包含 UVBot 觸發詞「紫外線」', () => {
      assert.ok(texts.includes("紫外線"), '缺少觸發詞「紫外線」');
    });

    test('包含 HolidayBot 觸發詞「放假」', () => {
      assert.ok(texts.includes("放假"), '缺少觸發詞「放假」');
    });

    test('包含 FortuneBot 觸發詞「運勢」', () => {
      assert.ok(texts.includes("運勢"), '缺少觸發詞「運勢」');
    });
  });
});
