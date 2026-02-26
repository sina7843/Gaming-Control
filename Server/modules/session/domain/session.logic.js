const { diffInMinutes } = require("../../../shared/utils/time.utils");

const {
  PER_HOUR,
  PER_MINUTE,
  PER_SEAT_HOUR,
  FLAT,
} = require("../../../shared/constants/pricingModels");

function applyMinimumAndRounding(durationMinutes, segment) {
  let effectiveMinutes = durationMinutes;

  // minimum
  if (segment.minimumMinutes) {
    effectiveMinutes = Math.max(effectiveMinutes, segment.minimumMinutes);
  }

  // rounding
  if (segment.roundingMinutes && segment.roundingMinutes > 1) {
    effectiveMinutes =
      Math.ceil(effectiveMinutes / segment.roundingMinutes) *
      segment.roundingMinutes;
  }

  return effectiveMinutes;
}

function calculateTieredCost(durationMinutes, segment) {
  if (!segment.tiers || !segment.tiers.length) return null;

  const sorted = [...segment.tiers].sort(
    (a, b) => a.upToMinutes - b.upToMinutes,
  );

  let remainingMinutes = durationMinutes;
  let previousLimit = 0;
  let totalCost = 0;

  for (const tier of sorted) {
    const tierLimit = tier.upToMinutes;

    const minutesInThisTier = Math.min(
      remainingMinutes,
      tierLimit - previousLimit,
    );

    if (minutesInThisTier > 0) {
      if (segment.pricingModel === "PER_HOUR") {
        totalCost += (minutesInThisTier / 60) * tier.price;
      }

      if (segment.pricingModel === "PER_MINUTE") {
        totalCost += minutesInThisTier * tier.price;
      }

      if (segment.pricingModel === "PER_SEAT_HOUR") {
        totalCost += (minutesInThisTier / 60) * tier.price * segment.seatCount;
      }

      remainingMinutes -= minutesInThisTier;
    }

    previousLimit = tierLimit;

    if (remainingMinutes <= 0) break;
  }

  return totalCost;
}

function calculateSegmentCost(segment) {
  if (!segment.endedAt) return 0;

  const rawMinutes = diffInMinutes(segment.startedAt, segment.endedAt);

  const durationMinutes = applyMinimumAndRounding(rawMinutes, segment);

  // 🔹 اگر tier تعریف شده باشد، اولویت با tier است
  const tierCost = calculateTieredCost(durationMinutes, segment);
  if (tierCost !== null) {
    return Math.round(tierCost);
  }

  switch (segment.pricingModel) {
    case PER_HOUR:
      return Math.round((durationMinutes / 60) * segment.rate);

    case PER_MINUTE:
      return Math.round(durationMinutes * segment.rate);

    case PER_SEAT_HOUR:
      return Math.round(
        (durationMinutes / 60) * segment.rate * segment.seatCount,
      );

    case FLAT:
      return segment.rate;

    default:
      throw new Error("Unsupported pricing model");
  }
}

function calculateSubtotal(segments) {
  return segments.reduce((sum, seg) => sum + seg.cost, 0);
}

module.exports = {
  calculateSegmentCost,
  calculateSubtotal,
};
