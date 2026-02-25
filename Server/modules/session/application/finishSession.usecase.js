const {
  calculateSegmentCost,
  calculateSubtotal,
} = require("../domain/session.logic");

const { ACTIVE, FINISHED } = require("../../../shared/constants/sessionStatus");

const { AVAILABLE } = require("../../../shared/constants/resourceStatus");

class FinishSessionUseCase {
  constructor({
    sessionRepository,
    resourceRepository,
    discountUseCase,
    discountRepository,
    transactionManager,
  }) {
    this.sessionRepository = sessionRepository;
    this.resourceRepository = resourceRepository;
    this.discountUseCase = discountUseCase;
    this.discountRepository = discountRepository;
    this.transactionManager = transactionManager;
  }

  async execute({ sessionId, discountCode }) {
    return this.transactionManager.runInTransaction(async (mongoSession) => {
      const session = await this.sessionRepository.findById(sessionId, {
        session: mongoSession,
      });

      if (!session || session.status !== ACTIVE) {
        throw new Error("Active session not found");
      }

      const now = new Date();

      const lastSegment = session.segments[session.segments.length - 1];

      lastSegment.endedAt = now;
      lastSegment.cost = calculateSegmentCost(lastSegment);

      const subtotal = calculateSubtotal(session.segments);

      const discountResult = await this.discountUseCase.execute({
        subtotal,
        customer: session.customerId,
        resourceType: session.resourceId,
        discountCode,
        now,
      });

      session.subtotal = subtotal;
      session.discountAmount = discountResult.totalDiscountAmount;
      session.totalCost = discountResult.finalAmount;
      session.status = FINISHED;
      session.endedAt = now;

      await this.sessionRepository.save(session, { session: mongoSession });

      for (const d of discountResult.appliedDiscounts) {
        await this.discountRepository.incrementUsageIfAvailable(
          d.id,
          mongoSession,
        );
      }

      await this.resourceRepository.updateStatus(
        session.resourceId,
        AVAILABLE,
        mongoSession,
      );

      return session;
    });
  }
}

module.exports = FinishSessionUseCase;
