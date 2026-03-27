import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import linebot from "linebot";
import { checkRateLimit, _resetStore, _store } from "../services/RateLimiter.js";

// ─── LINE Webhook 簽名驗證 ─────────────────────────────────────────────────────

describe("LINE Webhook 簽名驗證（linebot 內建）", () => {
  const SECRET = "test-channel-secret";
  const bot = linebot({
    channelId: "test-id",
    channelSecret: SECRET,
    channelAccessToken: "test-token",
  });

  function makeSignature(body) {
    return crypto.createHmac("sha256", SECRET).update(body, "utf8").digest("base64");
  }

  test("正確簽名應通過驗證", () => {
    const body = '{"events":[]}';
    assert.strictEqual(bot.verify(body, makeSignature(body)), true);
  });

  test("錯誤簽名應被拒絕", () => {
    const body = '{"events":[]}';
    assert.strictEqual(bot.verify(body, "wrong-signature=="), false);
  });

  test("空簽名應被拒絕", () => {
    assert.strictEqual(bot.verify('{"events":[]}', ""), false);
  });

  test("body 被竄改後簽名應失效", () => {
    const originalBody = '{"events":[]}';
    const sig = makeSignature(originalBody);
    const tamperedBody = '{"events":[],"extra":"injected"}';
    assert.strictEqual(bot.verify(tamperedBody, sig), false);
  });

  test("linebot 預設 verify 為 true", () => {
    const b = linebot({ channelId: "", channelSecret: "", channelAccessToken: "" });
    assert.strictEqual(b.options.verify, true);
  });
});

// ─── Rate Limiting ─────────────────────────────────────────────────────────────

describe("RateLimiter", () => {
  beforeEach(() => {
    _resetStore();
  });

  test("前 10 則應全部通過", () => {
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(checkRateLimit("user1"), true, `第 ${i + 1} 則應通過`);
    }
  });

  test("第 11 則應被拒絕", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("user1");
    assert.strictEqual(checkRateLimit("user1"), false);
  });

  test("不同 userId 計數獨立", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("userA");
    assert.strictEqual(checkRateLimit("userA"), false, "userA 應超限");
    assert.strictEqual(checkRateLimit("userB"), true, "userB 應獨立計算");
  });

  test("窗口過期後計數重置", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("user2");
    assert.strictEqual(checkRateLimit("user2"), false, "超限前確認");

    // 模擬 61 秒前開始的窗口
    _store.get("user2").windowStart = Date.now() - 61_000;

    assert.strictEqual(checkRateLimit("user2"), true, "窗口過期後應重置");
  });

  test("同一窗口內累計計數正確", () => {
    checkRateLimit("user3"); // 1
    checkRateLimit("user3"); // 2
    assert.strictEqual(_store.get("user3").count, 2);
  });
});
