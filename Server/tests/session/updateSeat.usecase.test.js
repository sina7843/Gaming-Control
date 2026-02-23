const UpdateSeatUseCase = require("../../modules/session/application/updateSeat.usecase");

describe("UpdateSeatUseCase", () => {
  test("throws if session not active", async () => {
    const mockSessionRepo = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const mockResourceRepo = {
      findById: jest.fn(),
    };
    const mockTransactionManager = {
      runInTransaction: jest.fn(async (callback) => {
        return callback(null); // null یعنی fake mongoSession
      }),
    };

    const mockPricing = {
      execute: jest.fn(),
    };

    const useCase = new UpdateSeatUseCase({
      sessionRepository: mockSessionRepo,
      resourceRepository: mockResourceRepo,
      resolvePricingRuleUseCase: mockPricing,
      transactionManager: mockTransactionManager,
    });

    await expect(
      useCase.execute({ sessionId: "1", newSeatCount: 2 }),
    ).rejects.toThrow("Active session not found");
  });
});
