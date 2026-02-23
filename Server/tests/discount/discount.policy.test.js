const {
  selectDiscountsByPolicy,
  applyDiscounts,
} = require("../../modules/discount/domain/discount.policy");

describe("Discount Policy - Domain", () => {
  test("exclusive discount overrides others", () => {
    const discounts = [
      { isExclusive: false, isStackable: true, priority: 1 },
      { isExclusive: true, isStackable: false, priority: 5 },
    ];

    const result = selectDiscountsByPolicy(discounts);

    expect(result.length).toBe(1);
    expect(result[0].isExclusive).toBe(true);
  });

  test("stackable discounts sorted by priority", () => {
    const discounts = [
      { isExclusive: false, isStackable: true, priority: 1 },
      { isExclusive: false, isStackable: true, priority: 10 },
    ];

    const result = selectDiscountsByPolicy(discounts);

    expect(result.length).toBe(2);
    expect(result[0].priority).toBe(10);
  });

  test("apply percent discount correctly", () => {
    const subtotal = 1000;

    const discounts = [{ type: "percent", value: 10 }];

    const result = applyDiscounts(subtotal, discounts);

    expect(result.finalAmount).toBe(900);
    expect(result.totalDiscountAmount).toBe(100);
  });

  test("apply fixed discount correctly", () => {
    const subtotal = 1000;

    const discounts = [{ type: "fixed", value: 200 }];

    const result = applyDiscounts(subtotal, discounts);

    expect(result.finalAmount).toBe(800);
    expect(result.totalDiscountAmount).toBe(200);
  });
});
