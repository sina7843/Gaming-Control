const CalculateDiscountUseCase = require("../../modules/discount/application/calculateDiscount.usecase");

describe("CalculateDiscountUseCase", () => {
  test("applies code-based discount only", async () => {
    const mockDiscountRepo = {
      findActive: jest.fn().mockResolvedValue([
        {
          _id: "1",
          code: "SAVE10",
          type: "percent",
          value: 10,
          isExclusive: false,
          isStackable: true,
        },
        {
          _id: "2",
          applicableTags: ["VIP"],
          type: "percent",
          value: 20,
          isExclusive: false,
          isStackable: true,
        },
      ]),
    };

    const useCase = new CalculateDiscountUseCase({
      discountRepository: mockDiscountRepo,
    });

    const result = await useCase.execute({
      subtotal: 1000,
      customer: { tags: ["VIP"] },
      resourceTypeId: "r1",
      discountCode: "SAVE10",
    });

    expect(result.finalAmount).toBe(900);
    expect(result.appliedDiscounts.length).toBe(1);
  });

  test("applies tag-based discounts if no code", async () => {
    const mockDiscountRepo = {
      findActive: jest.fn().mockResolvedValue([
        {
          _id: "1",
          applicableTags: ["VIP"],
          type: "percent",
          value: 10,
          isExclusive: false,
          isStackable: true,
          priority: 1,
        },
        {
          _id: "2",
          applicableTags: ["VIP"],
          type: "fixed",
          value: 100,
          isExclusive: false,
          isStackable: true,
          priority: 2,
        },
      ]),
    };

    const useCase = new CalculateDiscountUseCase({
      discountRepository: mockDiscountRepo,
    });

    const result = await useCase.execute({
      subtotal: 1000,
      customer: { tags: ["VIP"] },
      resourceTypeId: "r1",
    });

    expect(result.appliedDiscounts.length).toBe(2);
    expect(result.finalAmount).toBeLessThan(1000);
  });

  test("throws error if invalid code", async () => {
    const mockDiscountRepo = {
      findActive: jest.fn().mockResolvedValue([]),
    };

    const useCase = new CalculateDiscountUseCase({
      discountRepository: mockDiscountRepo,
    });

    await expect(
      useCase.execute({
        subtotal: 1000,
        discountCode: "INVALID",
      }),
    ).rejects.toThrow("Invalid or expired discount code");
  });
});
