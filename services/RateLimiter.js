const WINDOW_MS = 60 * 1000; // 1 分鐘
const MAX_REQUESTS = 10;

// userId -> { count, windowStart }
export const _store = new Map();

/**
 * 檢查 userId 是否超過速率限制
 * @param {string} userId
 * @returns {boolean} true = 允許, false = 超過限制
 */
export function checkRateLimit(userId) {
  const now = Date.now();
  const entry = _store.get(userId);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    _store.set(userId, { count: 1, windowStart: now });
    return true;
  }

  entry.count++;
  return entry.count <= MAX_REQUESTS;
}

export function _resetStore() {
  _store.clear();
}
