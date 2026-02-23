const {
  getDayOfWeek,
  isWithinTimeRange,
} = require("../../../shared/utils/time.utils");

function filterValidRules(rules, { seatCount, date }) {
  const day = getDayOfWeek(date);

  return rules.filter((rule) => {
    if (rule.seatMin !== undefined && seatCount < rule.seatMin) return false;

    if (rule.seatMax !== undefined && seatCount > rule.seatMax) return false;

    if (rule.dayOfWeek?.length && !rule.dayOfWeek.includes(day)) return false;

    if (
      rule.startTime &&
      rule.endTime &&
      !isWithinTimeRange(date, rule.startTime, rule.endTime)
    )
      return false;

    return true;
  });
}

function selectRuleByPriority(rules) {
  if (!rules.length) return null;

  const sorted = [...rules].sort((a, b) => {
    if (a.resourceId && !b.resourceId) return -1;
    if (!a.resourceId && b.resourceId) return 1;
    return b.priority - a.priority;
  });

  return sorted[0];
}

module.exports = {
  filterValidRules,
  selectRuleByPriority,
};
