/**
 * 淺草籤詩回應模板
 */

// 抽籤前的祈福話語
export const drawingPhrases = [
  "🙏 小機器人正在為你虔誠祈福中...",
  "✨ 連接淺草神社的神聖網路中...",
  "🎋 正在為你抽取今日的指引籤詩...",
  "💫 小機器人啟動靈感偵測模式...",
  "🌸 請保持虔誠的心，籤詩即將顯現...",
  "🏮 神明正在為你選擇最適合的籤詩...",
  "⛩️ 正在與淺草觀音菩薩建立連線...",
];

// 根據籤詩類型的開場白
export const typeOpenings = {
  大吉: [
    "🎉 哇！小機器人檢測到超級大吉籤呢！",
    "✨ 太棒了！系統顯示這是最高等級的幸運籤！",
    "🌟 恭喜！抽到了傳說中的大吉籤！",
    "🎊 小機器人興奮模式：這是頂級好運籤詩！",
  ],
  吉: [
    "😊 很好呢！小機器人檢測到吉祥的氣息～",
    "🍀 不錯喔！這支籤帶來正面的能量！",
    "☀️ 吉籤報到！前方有好事等著你～",
    "🌈 小機器人分析：這是一支順利的籤詩！",
  ],
  小吉: [
    "🌸 小吉籤！雖然不是大驚喜，但也有小確幸喔～",
    "🌿 這是一支溫和的小吉籤呢！",
    "🕊️ 小機器人偵測到溫馨的好運氣息～",
    "🌱 小小的幸運正在慢慢發芽喔！",
  ],
  末吉: [
    "🤗 末吉籤！雖然運勢平平，但保持樂觀就好～",
    "🌤️ 這是一支需要耐心等待的籤詩呢！",
    "🍃 小機器人提醒：平凡也是一種福氣喔！",
    "⏰ 時機尚未成熟，再等等會更好～",
  ],
  凶: [
    "🤖 小機器人安慰模式：雖然是凶籤，但別太擔心～",
    "💙 檢測到挑戰訊號，但記住困難只是暫時的！",
    "🛡️ 小機器人守護模式：這是提醒你要更謹慎的籤詩！",
    "🌙 雖然現在有些陰霾，但月圓之時就會轉運了！",
  ],
};

// 問題類別相關的補充說明
export const categoryAdvice = {
  愛情: [
    "💕 愛情機器人建議：真誠的心最重要喔！",
    "💝 感情分析：緣分需要用心經營～",
    "🌹 愛情小貼士：多一點體貼，少一點計較！",
    "💌 戀愛秘訣：溝通是感情的最佳潤滑劑！",
  ],
  事業: [
    "💼 事業機器人分析：努力會有回報的！",
    "📈 工作運勢：專業能力是最好的武器！",
    "🎯 職場提醒：團隊合作比單打獨鬥更有效！",
    "🔧 事業秘訣：持續學習才能保持競爭力！",
  ],
  學業: [
    "📚 學習機器人鼓勵：知識就是力量！",
    "🎓 學業運勢：勤能補拙，努力不會白費！",
    "✏️ 讀書小貼士：複習比死背更重要！",
    "🧠 學習秘訣：理解比記憶更有效果！",
  ],
  健康: [
    "💊 健康機器人提醒：身體是革命的本錢！",
    "🏃‍♂️ 健康建議：適度運動，均衡飲食！",
    "😴 養生秘訣：充足睡眠比什麼都重要！",
    "🧘‍♀️ 健康小貼士：心情愉快也是良藥喔！",
  ],
  財運: [
    "💰 財運機器人分析：錢財有來有往才健康！",
    "🏦 理財建議：量入為出，積少成多！",
    "💎 財富秘訣：投資自己永遠不虧本！",
    "📊 金錢觀念：穩健比投機更可靠！",
  ],
};

// 結尾祝福語
export const blessings = [
  "🙏 願這支籤詩為你帶來指引和力量！",
  "✨ 小機器人祝你一切順心如意！",
  "🌟 相信自己，未來會更美好的！",
  "💫 帶著這份祝福，勇敢走向明天吧！",
  "🌈 記住，你比想像中更堅強喔！",
  "🕊️ 願平安與幸福常伴你左右～",
  "🌸 保持初心，好運自然會來敲門！",
];

// 特殊日期的額外祝福
export const specialDateBlessings = {
  週一: "💪 週一加油！新的一週要充滿活力喔！",
  週五: "🎉 週五快樂！即將迎接美好的週末了！",
  月初: "🌱 月初的新開始，為自己設定新目標吧！",
  月底: "🏆 月底了，回顧這個月的收穫和成長！",
};

/**
 * 隨機獲取對應類型的話語
 * @param {Array} phrases 話語陣列
 * @returns {string} 隨機選擇的話語
 */
export function getRandomPhrase(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * 獲取隨機抽籤話語
 * @returns {string} 抽籤話語
 */
export function getRandomDrawingPhrase() {
  return getRandomPhrase(drawingPhrases);
}

/**
 * 獲取籤詩類型對應的開場白
 * @param {string} type 籤詩類型
 * @returns {string} 開場白
 */
export function getTypeOpening(type) {
  return getRandomPhrase(typeOpenings[type] || typeOpenings["吉"]);
}

/**
 * 獲取問題類別建議
 * @param {string} category 問題類別
 * @returns {string} 建議話語
 */
export function getCategoryAdvice(category) {
  if (categoryAdvice[category]) {
    return getRandomPhrase(categoryAdvice[category]);
  }
  return "";
}

/**
 * 獲取隨機祝福語
 * @returns {string} 祝福語
 */
export function getRandomBlessing() {
  return getRandomPhrase(blessings);
}

/**
 * 獲取綜合隨機話語
 * @returns {Object} 包含各種隨機話語的物件
 */
export function getRandomFortunePhrase() {
  return {
    drawing: getRandomDrawingPhrase(),
    blessing: getRandomBlessing(),
  };
}
