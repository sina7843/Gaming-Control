function isDayValid(rule, date) {
  if (!rule.dayOfWeek || rule.dayOfWeek.length === 0) return true;
  return rule.dayOfWeek.includes(date.getDay());
}

function isTimeValid(rule, date) {
  if (!rule.startTime || !rule.endTime) return true;

  const [startH, startM] = rule.startTime.split(":").map(Number);
  const [endH, endM] = rule.endTime.split(":").map(Number);

  const minutesNow = date.getHours() * 60 + date.getMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (startMinutes <= endMinutes) {
    return minutesNow >= startMinutes && minutesNow <= endMinutes;
  }

  // بازه عبوری از نیمه‌شب
  return minutesNow >= startMinutes || minutesNow <= endMinutes;
}

function isSeatValid(rule, seatCount) {
  if (rule.seatMin && seatCount < rule.seatMin) return false;
  if (rule.seatMax && seatCount > rule.seatMax) return false;
  return true;
}

function filterValidRules(rules, context) {
  const { seatCount, date } = context;

  return rules.filter((rule) => {
    if (!rule.isActive) return false;
    if (!isSeatValid(rule, seatCount)) return false;
    if (!isDayValid(rule, date)) return false;
    if (!isTimeValid(rule, date)) return false;
    return true;
  });
}

function calculateSpecificityScore(rule) {
  let score = 0;

  if (rule.resourceId) score += 100;

  if (rule.dayOfWeek && rule.dayOfWeek.length > 0) {
    score += 10 - rule.dayOfWeek.length; // کمتر = خاص‌تر
  }

  if (rule.startTime && rule.endTime) {
    score += 10;
  }

  if (rule.seatMin || rule.seatMax) {
    score += 5;
  }

  return score;
}

function selectRuleByPriority(rules) {
  if (!rules.length) return null;

  return [...rules].sort((a, b) => {
    // 1️⃣ priority
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }

    // 2️⃣ specificity
    const specA = calculateSpecificityScore(a);
    const specB = calculateSpecificityScore(b);

    if (specB !== specA) {
      return specB - specA;
    }

    // 3️⃣ newest rule wins
    return new Date(b.createdAt) - new Date(a.createdAt);
  })[0];
}

module.exports = {
  filterValidRules,
  selectRuleByPriority,
};
