const StartSessionUseCase = require("../../modules/session/application/startSession.usecase");

describe("StartSessionUseCase", () => {
  test("throws if resource not found", async () => {
    const mockSessionRepo = {
      create: jest.fn(),
    };

    const mockResourceRepo = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const mockPricing = {
      execute: jest.fn(),
    };

    const mockTransactionManager = {
      runInTransaction: jest.fn(async (cb) => {
        return cb(null);
      }),
    };

    const useCase = new StartSessionUseCase({
      sessionRepository: mockSessionRepo,
      resourceRepository: mockResourceRepo,
      resolvePricingRuleUseCase: mockPricing,
      transactionManager: mockTransactionManager,
    });

    await expect(useCase.execute({ resourceId: "1" })).rejects.toThrow(
      "Resource not found",
    );
  });
});
