const FinishSessionUseCase = require("../../modules/session/application/finishSession.usecase");

describe("FinishSessionUseCase", () => {
  test("should finish session successfully", async () => {
    const mockSession = {
      status: "active",
      resourceId: "r1",
      segments: [
        {
          startedAt: new Date("2024-01-01T10:00:00Z"),
          pricingModel: "per_hour",
          rate: 100,
          seatCount: 1,
          cost: 0,
        },
      ],
    };

    const mockSessionRepo = {
      findById: jest.fn().mockResolvedValue(mockSession),
      save: jest.fn(),
    };

    const mockResourceRepo = {
      updateStatus: jest.fn(),
    };

    const mockDiscountRepo = {
      incrementUsageIfAvailable: jest.fn(),
    };

    const mockDiscountUseCase = {
      execute: jest.fn().mockResolvedValue({
        totalDiscountAmount: 0,
        finalAmount: 100,
        appliedDiscounts: [],
      }),
    };

    const mockTransactionManager = {
      runInTransaction: jest.fn(async (cb) => {
        return cb(null);
      }),
    };

    const useCase = new FinishSessionUseCase({
      sessionRepository: mockSessionRepo,
      resourceRepository: mockResourceRepo,
      discountUseCase: mockDiscountUseCase,
      discountRepository: mockDiscountRepo,
      transactionManager: mockTransactionManager,
    });

    const result = await useCase.execute({
      sessionId: "1",
    });

    expect(result.totalCost).toBe(100);
  });
});
