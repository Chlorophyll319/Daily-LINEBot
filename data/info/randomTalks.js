console.log(
  "💬 簡潔版隨機對話 API 模組載入中... 讓聊天機器人更有人味！ (´∀｀)♡"
);

const RANDOM_GREETINGS = [
  "你好呀！今天過得如何？",
  "嗨！有什麼我可以幫你的嗎？",
  "哈囉～很高興見到你！",
  "你好！準備好聊天了嗎？",
  "嘿！今天心情怎麼樣？",
];

const RANDOM_RESPONSES = [
  "這真是個有趣的話題！",
  "我覺得你說得很有道理",
  "原來如此，我學到了新東西！",
  "這讓我想到了別的事情...",
  "你的想法很棒！",
  "繼續說下去，我在聽～",
];

const RANDOM_FAREWELLS = [
  "很高興跟你聊天！下次見～",
  "今天的對話很棒，期待下次！",
  "掰掰！記得要保持開心喔！",
  "再見！有需要隨時找我聊天～",
  "祝你有美好的一天！",
];

const RANDOM_ENCOURAGEMENTS = [
  "你今天表現得很棒！",
  "相信自己，你可以做到的！",
  "每一天都是新的開始～",
  "保持正面思考，好事會發生！",
  "你比想像中更堅強！",
];

const RANDOM_JOKES = [
  "為什麼程式設計師討厭自然？因為有太多 bugs！",
  "電腦為什麼感冒？因為忘記關 Windows！",
  "為什麼 AI 不會說謊？因為它們總是說 true！",
  "程式設計師最喜歡的樹是什麼？Binary tree！",
  "為什麼程式碼總是有 bug？因為程式設計師是人類！",
];

/**
 * 隨機選擇陣列中的一個元素
 * 採用 weatherSimple.js 的簡潔風格
 *
 * @param {Array} array 要選擇的陣列
 * @returns {string|null} 隨機選中的元素或 null
 */
function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    console.error("😅 陣列是空的或不是陣列，無法隨機選擇");
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * 取得隨機問候語 - 開啟對話的好方式
 */
export function getRandomGreeting() {
  console.log("👋 正在準備隨機問候語... 要有禮貌喔！");
  const greeting = getRandomItem(RANDOM_GREETINGS);
  console.log(`✨ 選中問候語：${greeting}`);
  return greeting;
}

/**
 * 取得隨機回應 - 讓對話繼續下去
 */
export function getRandomResponse() {
  console.log("💭 正在思考隨機回應... 保持對話熱度！");
  const response = getRandomItem(RANDOM_RESPONSES);
  console.log(`✨ 選中回應：${response}`);
  return response;
}

/**
 * 取得隨機告別語 - 優雅地結束對話
 */
export function getRandomFarewell() {
  console.log("👋 正在準備隨機告別語... 離別總是讓人不捨");
  const farewell = getRandomItem(RANDOM_FAREWELLS);
  console.log(`✨ 選中告別語：${farewell}`);
  return farewell;
}

/**
 * 取得隨機鼓勵話語 - 給使用者正能量
 */
export function getRandomEncouragement() {
  console.log("💪 正在準備隨機鼓勵話語... 加油加油！");
  const encouragement = getRandomItem(RANDOM_ENCOURAGEMENTS);
  console.log(`✨ 選中鼓勵語：${encouragement}`);
  return encouragement;
}

/**
 * 取得隨機笑話 - 程式設計師專用幽默
 */
export function getRandomJoke() {
  console.log("😄 正在準備隨機笑話... 準備好笑了嗎？");
  const joke = getRandomItem(RANDOM_JOKES);
  console.log(`✨ 選中笑話：${joke}`);
  return joke;
}

/**
 * 根據情境取得合適的隨機對話
 * @param {string} type 對話類型："greeting", "response", "farewell", "encouragement", "joke"
 */
export function getRandomTalk(type = "response") {
  console.log(`🎲 正在根據情境 "${type}" 選擇合適的對話...`);

  switch (type.toLowerCase()) {
    case "greeting":
      return getRandomGreeting();
    case "response":
      return getRandomResponse();
    case "farewell":
      return getRandomFarewell();
    case "encouragement":
      return getRandomEncouragement();
    case "joke":
      return getRandomJoke();
    default:
      console.log(`😅 不認識的對話類型 "${type}"，給你一個一般回應`);
      return getRandomResponse();
  }
}

console.log("✅ 簡潔版隨機對話 API 模組載入完成！讓機器人更有人情味 🤖💕");
