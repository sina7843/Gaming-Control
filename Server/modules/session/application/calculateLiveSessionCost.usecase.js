const {
  calculateSegmentCost,
  calculateSubtotal,
} = require("../domain/session.logic");

class CalculateLiveSessionCostUseCase {
  constructor({ sessionRepository }) {
    this.sessionRepository = sessionRepository;
  }

  async execute({ sessionId }) {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session || session.status !== "active") {
      throw new Error("Active session not found");
    }

    const now = new Date();

    // کپی امن از segments
    const segments = session.segments.map((seg) => ({
      ...(seg.toObject ? seg.toObject() : seg),
    }));

    // آخرین segment را موقتاً ببند
    const lastIndex = segments.length - 1;
    const lastSegment = segments[lastIndex];

    if (!lastSegment) {
      return { subtotal: 0 };
    }

    const tempSegment = {
      ...lastSegment,
      endedAt: now,
    };

    tempSegment.cost = calculateSegmentCost(tempSegment);

    segments[lastIndex] = tempSegment;

    // برای segmentهای قبلی اگر cost ندارند (ایمنی)
    segments.forEach((seg) => {
      if (seg.endedAt && !seg.cost) {
        seg.cost = calculateSegmentCost(seg);
      }
    });

    const subtotal = calculateSubtotal(segments);

    return {
      subtotal,
      segments,
    };
  }
}

module.exports = CalculateLiveSessionCostUseCase;
