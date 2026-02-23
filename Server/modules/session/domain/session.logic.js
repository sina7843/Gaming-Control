const {
  diffInMinutes,
  diffInHours,
} = require("../../../shared/utils/time.utils");

const {
  PER_HOUR,
  PER_MINUTE,
  PER_SEAT_HOUR,
  FLAT,
} = require("../../../shared/constants/pricingModels");

function calculateSegmentCost(segment) {
  if (!segment.endedAt) return 0;

  const durationMinutes = diffInMinutes(segment.startedAt, segment.endedAt);

  const durationHours = diffInHours(segment.startedAt, segment.endedAt);

  switch (segment.pricingModel) {
    case PER_HOUR:
      return Math.round(durationHours * segment.rate);

    case PER_MINUTE:
      return Math.round(durationMinutes * segment.rate);

    case PER_SEAT_HOUR:
      return Math.round(durationHours * segment.rate * segment.seatCount);

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
