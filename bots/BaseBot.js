/**
 * 抽象 Bot 基類 - 定義所有迷你機器人的標準接口
 *
 */
export class BaseBot {
  constructor(name) {
    this.name = name;
  }

  /**
   * 判斷這個 bot 是否能處理該消息
   *
   * @param {string} message 用戶消息
   * @returns {boolean} 是否能處理
   */
  // eslint-disable-next-line no-unused-vars
  canHandle(message) {
    throw new Error(`${this.name} must implement canHandle() method`);
  }

  /**
   * 處理消息並返回回應
   *
   * @param {string} message 用戶消息
   * @param {string} userId 用戶 ID
   * @returns {Promise<string>} 回應消息
   */
  // eslint-disable-next-line no-unused-vars
  async handle(message, userId) {
    throw new Error(`${this.name} must implement handle() method`);
  }

  /**
   * 獲取 bot 的幫助信息
   *
   * @returns {string} 幫助信息
   */
  getHelpInfo() {
    return `${this.name} - No help information available`;
  }
}
