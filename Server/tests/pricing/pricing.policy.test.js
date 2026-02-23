const {
  filterValidRules,
  selectRuleByPriority,
} = require("../../modules/pricing/domain/pricing.policy");

describe("Pricing Policy - Domain", () => {
  test("filters by seat range", () => {
    const rules = [
      { seatMin: 1, seatMax: 3 },
      { seatMin: 4, seatMax: 6 },
    ];

    const result = filterValidRules(rules, {
      seatCount: 2,
      date: new Date(),
    });

    expect(result.length).toBe(1);
  });

  test("filters by dayOfWeek", () => {
    const today = new Date();
    const day = today.getDay();

    const rules = [{ dayOfWeek: [day] }, { dayOfWeek: [(day + 1) % 7] }];

    const result = filterValidRules(rules, {
      seatCount: 1,
      date: today,
    });

    expect(result.length).toBe(1);
  });

  test("selects resource-specific rule first", () => {
    const rules = [
      { resourceId: null, priority: 10 },
      { resourceId: "r1", priority: 1 },
    ];

    const selected = selectRuleByPriority(rules);

    expect(selected.resourceId).toBe("r1");
  });

  test("selects highest priority rule", () => {
    const rules = [
      { resourceId: null, priority: 1 },
      { resourceId: null, priority: 20 },
    ];

    const selected = selectRuleByPriority(rules);

    expect(selected.priority).toBe(20);
  });
});
