import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  buildMainMenuMessage,
  buildWeatherSubMenu,
  buildFortuneSubMenu,
  buildHolidaySubMenu,
  SUBMENU_TRIGGERS,
} from "../services/HelpService.js";

describe("HelpService", () => {
  describe("buildMainMenuMessage()", () => {
    test("回傳物件而非字串", () => {
      const result = buildMainMenuMessage();
      assert.strictEqual(typeof result, "object");
    });

    test("type 為 flex", () => {
      const result = buildMainMenuMessage();
      assert.strictEqual(result.type, "flex");
    });

    test("包含 altText", () => {
      const result = buildMainMenuMessage();
      assert.ok(
        typeof result.altText === "string" && result.altText.length > 0,
        "應有 altText"
      );
    });

    test("contents 為 bubble", () => {
      const result = buildMainMenuMessage();
      assert.strictEqual(result.contents.type, "bubble");
    });

    test("body 包含 6 個按鈕", () => {
      const result = buildMainMenuMessage();
      const buttons = result.contents.body.contents;
      assert.strictEqual(buttons.length, 6, "應有 6 個功能按鈕");
    });

    test("有細項的分類（天氣/算命/放假）按鈕送出子選單觸發詞", () => {
      const result = buildMainMenuMessage();
      const buttons = result.contents.body.contents;
      const subMenuTexts = buttons
        .filter((b) => SUBMENU_TRIGGERS.includes(b.action?.text))
        .map((b) => b.action.text);
      assert.deepStrictEqual(
        subMenuTexts.sort(),
        ["天氣選單", "算命選單", "放假選單"].sort()
      );
    });

    test("單一功能按鈕送出正確指令", () => {
      const result = buildMainMenuMessage();
      const buttons = result.contents.body.contents;
      const directTexts = buttons
        .filter((b) => !SUBMENU_TRIGGERS.includes(b.action?.text))
        .map((b) => b.action.text);
      assert.deepStrictEqual(
        directTexts.sort(),
        ["空氣品質", "地震", "紫外線"].sort()
      );
    });
  });

  describe("buildWeatherSubMenu()", () => {
    test("type 為 text", () => {
      const result = buildWeatherSubMenu();
      assert.strictEqual(result.type, "text");
    });

    test("包含 quickReply", () => {
      const result = buildWeatherSubMenu();
      assert.ok(result.quickReply, "應有 quickReply");
      assert.ok(Array.isArray(result.quickReply.items));
    });

    test("包含「一週天氣」與「設定城市」", () => {
      const result = buildWeatherSubMenu();
      const texts = result.quickReply.items.map((i) => i.action.text);
      assert.ok(texts.includes("一週天氣"), "缺少一週天氣");
      assert.ok(texts.includes("設定城市"), "缺少設定城市");
    });
  });

  describe("buildFortuneSubMenu()", () => {
    test("type 為 text", () => {
      const result = buildFortuneSubMenu();
      assert.strictEqual(result.type, "text");
    });

    test("包含 8 個選項", () => {
      const result = buildFortuneSubMenu();
      assert.strictEqual(result.quickReply.items.length, 8);
    });

    test("包含所有算命細項", () => {
      const result = buildFortuneSubMenu();
      const texts = result.quickReply.items.map((i) => i.action.text);
      const expected = [
        "抽籤（隨機）",
        "擲杯",
        "愛情運勢",
        "事業運勢",
        "學業運勢",
        "健康運勢",
        "財運",
        "旅行運勢",
      ];
      for (const t of expected) {
        assert.ok(texts.includes(t), `缺少「${t}」`);
      }
    });

    test("每個 label 不超過 20 字元", () => {
      const result = buildFortuneSubMenu();
      for (const item of result.quickReply.items) {
        assert.ok(
          item.action.label.length <= 20,
          `Label "${item.action.label}" 超過 20 字元上限`
        );
      }
    });
  });

  describe("buildHolidaySubMenu()", () => {
    test("type 為 text", () => {
      const result = buildHolidaySubMenu();
      assert.strictEqual(result.type, "text");
    });

    test("包含「今天要上班嗎」與「下次放假」", () => {
      const result = buildHolidaySubMenu();
      const texts = result.quickReply.items.map((i) => i.action.text);
      assert.ok(texts.includes("今天要上班嗎"), "缺少今天要上班嗎");
      assert.ok(texts.includes("下次放假"), "缺少下次放假");
    });
  });

  describe("SUBMENU_TRIGGERS", () => {
    test("包含三個子選單觸發詞", () => {
      assert.deepStrictEqual(
        SUBMENU_TRIGGERS.sort(),
        ["天氣選單", "算命選單", "放假選單"].sort()
      );
    });
  });

  describe("Quick Reply item 格式", () => {
    const subMenus = [buildWeatherSubMenu, buildFortuneSubMenu, buildHolidaySubMenu];

    for (const builder of subMenus) {
      test(`${builder.name} 的每個 item 符合 LINE Quick Reply action 格式`, () => {
        const result = builder();
        for (const item of result.quickReply.items) {
          assert.strictEqual(item.type, "action");
          assert.strictEqual(item.action.type, "message");
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
    }
  });
});
