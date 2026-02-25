const crypto = require("crypto");

/**
 * تولید ID کوتاه (برای کد سشن، رسید، ...)
 * مثال: DC-8F3K2P
 */
function generateShortId(prefix = "DC", length = 6) {
  const bytes = crypto.randomBytes(Math.ceil(length));
  const id = bytes.toString("base64url").replace(/[-_]/g, "").toUpperCase();
  return `${prefix}-${id.slice(0, length)}`;
}

/**
 * UUID استاندارد
 */
function generateUUID() {
  if (crypto.randomUUID) return crypto.randomUUID();
  // fallback
  return crypto.randomBytes(16).toString("hex");
}

module.exports = {
  generateShortId,
  generateUUID,
};
