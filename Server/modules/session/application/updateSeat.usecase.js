const { calculateSegmentCost } = require("../domain/session.logic");

const { ACTIVE } = require("../../../shared/constants/sessionStatus");

class UpdateSeatUseCase {
  constructor({
    sessionRepository,
    resourceRepository,
    resolvePricingRuleUseCase,
    transactionManager,
  }) {
    this.sessionRepository = sessionRepository;
    this.resourceRepository = resourceRepository;
    this.resolvePricingRuleUseCase = resolvePricingRuleUseCase;
    this.transactionManager = transactionManager;
  }

  async execute({ sessionId, newSeatCount }) {
    return this.transactionManager.runInTransaction(async (mongoSession) => {
      const session = await this.sessionRepository.findById(sessionId, {
        session: mongoSession,
      });

      if (!session || session.status !== ACTIVE) {
        throw new Error("Active session not found");
      }

      const resource = await this.resourceRepository.findById(
        session.resourceId,
        { session: mongoSession },
      );

      if (resource.capacity && newSeatCount > resource.capacity) {
        throw new Error("Seat count exceeds resource capacity");
      }

      const now = new Date();

      const currentSegment = session.segments[session.segments.length - 1];

      currentSegment.endedAt = now;
      currentSegment.cost = calculateSegmentCost(currentSegment);

      const rule = await this.resolvePricingRuleUseCase.execute({
        resourceId: resource._id,
        resourceTypeId: resource.resourceTypeId,
        seatCount: newSeatCount,
        date: now,
      });

      session.segments.push({
        startedAt: now,
        seatCount: newSeatCount,
        appliedRuleId: rule._id,
        pricingModel: rule.pricingModel,
        rate: rule.price,
        cost: 0,
      });

      await this.sessionRepository.save(session, { session: mongoSession });

      return session;
    });
  }
}

module.exports = UpdateSeatUseCase;
