import { BaseBot } from "./BaseBot.js";
import { knockKnockTalkMap } from "../data/miniBotPhrases/knockKnock/knockKnockTalkMap.js";

/**
 * KnockKnock 機器人 - 被叫醒或打擾時的隨機回應
 */
export class KnockKnockBot extends BaseBot {
  constructor() {
    super("KnockKnockBot");
  }

  canHandle(message) {
    return message === "knock knock！";
  }

  async handle(message, userId) {
    const index = Math.floor(Math.random() * knockKnockTalkMap.length);
    return knockKnockTalkMap[index];
  }

  getHelpInfo() {
    return `🔔 輸入「knock knock！」叫醒窩`;
  }
}
