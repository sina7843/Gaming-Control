const ResolvePricingRuleUseCase = require("../../modules/pricing/application/resolvePricingRule.usecase");

describe("ResolvePricingRuleUseCase", () => {
  test("returns correct rule based on priority", async () => {
    const mockPricingRepo = {
      findActiveByTarget: jest.fn().mockResolvedValue([
        {
          _id: "1",
          resourceId: null,
          resourceType: "type1",
          seatMin: 1,
          seatMax: 5,
          pricingModel: "per_hour",
          price: 100,
          priority: 1,
        },
        {
          _id: "2",
          resourceId: null,
          resourceType: "type1",
          seatMin: 1,
          seatMax: 5,
          pricingModel: "per_hour",
          price: 200,
          priority: 10,
        },
      ]),
    };

    const useCase = new ResolvePricingRuleUseCase({
      pricingRepository: mockPricingRepo,
    });

    const result = await useCase.execute({
      resourceId: "r1",
      resourceType: "type1",
      seatCount: 2,
      date: new Date(),
    });

    expect(result.price).toBe(200);
  });

  test("throws if no valid rule found", async () => {
    const mockPricingRepo = {
      findActiveByTarget: jest.fn().mockResolvedValue([]),
    };

    const useCase = new ResolvePricingRuleUseCase({
      pricingRepository: mockPricingRepo,
    });

    await expect(
      useCase.execute({
        resourceId: "r1",
        resourceType: "type1",
        seatCount: 2,
        date: new Date(),
      }),
    ).rejects.toThrow("No valid pricing rule found");
  });
});
