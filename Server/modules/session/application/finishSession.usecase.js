const {
  calculateSegmentCost,
  calculateSubtotal,
} = require("../domain/session.logic");

const { ACTIVE, FINISHED } = require("../../../shared/constants/sessionStatus");

const { AVAILABLE } = require("../../../shared/constants/resourceStatus");

const SystemSetting = require("../../system/infrastructure/systemSetting.model");

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

      // ==============================
      // Close Last Segment
      // ==============================

      const lastSegment = session.segments[session.segments.length - 1];

      lastSegment.endedAt = now;
      lastSegment.isActive = false;

      const segmentResult = calculateSegmentCost(lastSegment);

      // اگر تابع جدید object برگرداند
      if (typeof segmentResult === "object") {
        lastSegment.cost = Math.round(segmentResult.cost);
        lastSegment.durationMinutes = segmentResult.durationMinutes;
        lastSegment.effectiveMinutes = segmentResult.effectiveMinutes;
      } else {
        // backward compatibility
        lastSegment.cost = Math.round(segmentResult);
      }

      // ==============================
      // Subtotal
      // ==============================

      const subtotal = calculateSubtotal(session.segments);

      // ==============================
      // Discount
      // ==============================

      const discountResult = await this.discountUseCase.execute({
        subtotal,
        customer: session.customerId,
        resourceType: session.resourceId,
        discountCode,
        now,
      });

      const taxableAmount = discountResult.finalAmount;

      // ==============================
      // Tax
      // ==============================

      const taxSetting = await SystemSetting.findOne({ key: "taxRate" }, null, {
        session: mongoSession,
      });

      const taxRate = taxSetting ? taxSetting.value : 0;

      const taxAmount = Math.round((taxableAmount * taxRate) / 100);

      // ==============================
      // Finalize Session
      // ==============================

      session.subtotal = subtotal;
      session.discountAmount = discountResult.totalDiscountAmount;
      session.taxRate = taxRate;
      session.taxAmount = taxAmount;
      session.totalCost = taxableAmount + taxAmount;

      session.status = FINISHED;
      session.endedAt = now;

      await this.sessionRepository.save(session, {
        session: mongoSession,
      });

      // ==============================
      // Increase Discount Usage
      // ==============================

      for (const d of discountResult.appliedDiscounts) {
        await this.discountRepository.incrementUsageIfAvailable(
          d.id,
          mongoSession,
        );
      }

      // ==============================
      // Free Resource
      // ==============================

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
