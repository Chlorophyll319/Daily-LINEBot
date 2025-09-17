/**
 * 淺草籤詩表情符號工具
 */

// 籤詩類型表情符號
export const fortuneTypeEmojis = {
  大吉: ["🌟", "✨", "🎉", "🎊", "💫", "⭐"],
  吉: ["😊", "🍀", "☀️", "🌈", "🌸", "💚"],
  小吉: ["🌿", "🌱", "🕊️", "🌤️", "💙", "🍃"],
  末吉: ["😌", "🌾", "⏰", "🤗", "🌙", "💛"],
  凶: ["🌙", "☁️", "💙", "🛡️", "🤖", "⚡"],
};

// 問題類別表情符號
export const categoryEmojis = {
  愛情: ["💕", "💖", "💝", "💌", "🌹", "💑"],
  事業: ["💼", "📈", "🎯", "🔧", "💪", "🏆"],
  學業: ["📚", "🎓", "✏️", "🧠", "📖", "🖊️"],
  健康: ["💊", "🏃‍♂️", "😴", "🧘‍♀️", "💚", "🌱"],
  財運: ["💰", "🏦", "💎", "📊", "💸", "🪙"],
  旅行: ["✈️", "🗺️", "🎒", "🌍", "🚗", "🏖️"],
  搬家: ["📦", "🏠", "🚚", "🔑", "🏡", "📋"],
  蓋房: ["🏗️", "🏠", "🔨", "🧱", "🏡", "🔧"],
};

// 時間相關表情符號
export const timeEmojis = {
  早晨: ["🌅", "☀️", "🐓", "🌞"],
  中午: ["☀️", "🌞", "🔥", "💫"],
  傍晚: ["🌆", "🌇", "🌤️", "✨"],
  夜晚: ["🌙", "⭐", "🌟", "💫"],
  春天: ["🌸", "🌱", "🌿", "🦋"],
  夏天: ["☀️", "🌻", "🏖️", "🍉"],
  秋天: ["🍂", "🎃", "🌾", "🍁"],
  冬天: ["❄️", "⛄", "🎿", "🔥"],
};

// 情緒表情符號
export const emotionEmojis = {
  開心: ["😊", "😄", "🥰", "😍", "🤗", "💕"],
  安慰: ["🤗", "💙", "🕊️", "🌸", "🤲", "💚"],
  鼓勵: ["💪", "🌟", "🔥", "⚡", "🎯", "🚀"],
  平靜: ["😌", "🧘‍♀️", "🕊️", "🌿", "☮️", "💙"],
  希望: ["🌈", "⭐", "🌟", "💫", "🌅", "🦋"],
};

// 特殊場合表情符號
export const specialEmojis = {
  祈福: ["🙏", "⛩️", "🏮", "🎋", "🔔", "✨"],
  慶祝: ["🎉", "🎊", "🥳", "🎈", "🎁", "🍾"],
  警告: ["⚠️", "🚨", "⛔", "🛑", "💔", "🔴"],
  神聖: ["⛩️", "🙏", "✨", "💫", "🌟", "🕯️"],
};

/**
 * 隨機獲取特定類型的表情符號
 * @param {string} type 表情符號類型
 * @param {Object} emojiSet 表情符號集合
 * @returns {string} 隨機表情符號
 */
function getRandomEmoji(type, emojiSet) {
  const emojis = emojiSet[type];
  if (!emojis || emojis.length === 0) return "";
  return emojis[Math.floor(Math.random() * emojis.length)];
}

/**
 * 獲取籤詩類型表情符號
 * @param {string} fortuneType 籤詩類型
 * @returns {string} 表情符號
 */
export function getFortuneTypeEmoji(fortuneType) {
  return getRandomEmoji(fortuneType, fortuneTypeEmojis);
}

/**
 * 獲取問題類別表情符號
 * @param {string} category 問題類別
 * @returns {string} 表情符號
 */
export function getCategoryEmoji(category) {
  return getRandomEmoji(category, categoryEmojis);
}

/**
 * 獲取時間相關表情符號
 * @param {string} timeType 時間類型
 * @returns {string} 表情符號
 */
export function getTimeEmoji(timeType) {
  return getRandomEmoji(timeType, timeEmojis);
}

/**
 * 獲取情緒表情符號
 * @param {string} emotion 情緒類型
 * @returns {string} 表情符號
 */
export function getEmotionEmoji(emotion) {
  return getRandomEmoji(emotion, emotionEmojis);
}

/**
 * 獲取特殊場合表情符號
 * @param {string} occasion 特殊場合
 * @returns {string} 表情符號
 */
export function getSpecialEmoji(occasion) {
  return getRandomEmoji(occasion, specialEmojis);
}

/**
 * 根據當前時間獲取適合的表情符號
 * @returns {string} 表情符號
 */
export function getCurrentTimeEmoji() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return getTimeEmoji("早晨");
  } else if (hour >= 12 && hour < 17) {
    return getTimeEmoji("中午");
  } else if (hour >= 17 && hour < 20) {
    return getTimeEmoji("傍晚");
  } else {
    return getTimeEmoji("夜晚");
  }
}

/**
 * 根據季節獲取表情符號
 * @returns {string} 表情符號
 */
export function getSeasonEmoji() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return getTimeEmoji("春天");
  } else if (month >= 6 && month <= 8) {
    return getTimeEmoji("夏天");
  } else if (month >= 9 && month <= 11) {
    return getTimeEmoji("秋天");
  } else {
    return getTimeEmoji("冬天");
  }
}

/**
 * 獲取組合表情符號字串
 * @param {Array} types 表情符號類型陣列
 * @returns {string} 組合表情符號
 */
export function getCombinedEmojis(types) {
  const emojis = [];

  types.forEach((type) => {
    if (fortuneTypeEmojis[type]) {
      emojis.push(getFortuneTypeEmoji(type));
    } else if (categoryEmojis[type]) {
      emojis.push(getCategoryEmoji(type));
    } else if (emotionEmojis[type]) {
      emojis.push(getEmotionEmoji(type));
    } else if (specialEmojis[type]) {
      emojis.push(getSpecialEmoji(type));
    }
  });

  return emojis.join(" ");
}
