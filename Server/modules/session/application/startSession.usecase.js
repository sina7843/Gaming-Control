const { ACTIVE } = require("../../../shared/constants/sessionStatus");

const {
  AVAILABLE,
  IN_USE,
} = require("../../../shared/constants/resourceStatus");

class StartSessionUseCase {
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

  async execute({ resourceId, customerId, seatCount = 1 }) {
    return this.transactionManager.runInTransaction(async (mongoSession) => {
      const resource = await this.resourceRepository.findById(resourceId, {
        session: mongoSession,
      });

      if (!resource) {
        throw new Error("Resource not found");
      }

      if (resource.status !== AVAILABLE) {
        throw new Error("Resource is not available");
      }

      if (resource.capacity && seatCount > resource.capacity) {
        throw new Error("Seat count exceeds resource capacity");
      }

      const rule = await this.resolvePricingRuleUseCase.execute({
        resourceId: resource._id,
        resourceType: resource.resourceType,
        seatCount,
        date: new Date(),
      });

      const now = new Date();

      const session = await this.sessionRepository.create(
        {
          resourceId: resource._id,
          customerId,
          startedAt: now,
          status: ACTIVE,
          isActive: true,
          segments: [
            {
              startedAt: now,
              seatCount,
              appliedRuleId: rule._id,
              pricingModel: rule.pricingModel,
              rate: rule.price,

              // 🔥 V2 fields
              minimumMinutes: rule.minimumMinutes || 0,
              roundingMinutes: rule.roundingMinutes || 1,
              tiers: rule.tiers || [],

              cost: 0,
            },
          ],
        },
        { session: mongoSession },
      );

      await this.resourceRepository.updateStatus(
        resource._id,
        IN_USE,
        mongoSession,
      );

      return session;
    });
  }
}

module.exports = StartSessionUseCase;
