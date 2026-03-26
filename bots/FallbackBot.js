import { BaseBot } from "./BaseBot.js";
import { fallbackTalkMap } from "../data/miniBotPhrases/fallback/fallbackTalkMap.js";

/**
 * FallbackBot - 所有 Bot 都沒命中時的最終回應
 * 永遠 canHandle，應放在 bots 陣列最末位
 */
export class FallbackBot extends BaseBot {
  constructor() {
    super("FallbackBot");
  }

  canHandle(_message) {
    return true;
  }

  async handle(_message, _userId) {
    const index = Math.floor(Math.random() * fallbackTalkMap.length);
    return fallbackTalkMap[index];
  }

  getHelpInfo() {
    return null;
  }
}
