const {
  calculateSegmentCost,
  calculateSubtotal,
} = require("../../modules/session/domain/session.logic");

describe("Session Domain Logic", () => {
  test("calculate per_hour cost correctly", () => {
    const segment = {
      startedAt: new Date("2024-01-01T10:00:00Z"),
      endedAt: new Date("2024-01-01T12:00:00Z"),
      pricingModel: "per_hour",
      rate: 100,
      seatCount: 1,
    };

    const cost = calculateSegmentCost(segment);

    expect(cost).toBe(200);
  });

  test("calculate per_seat_hour correctly", () => {
    const segment = {
      startedAt: new Date("2024-01-01T10:00:00Z"),
      endedAt: new Date("2024-01-01T11:00:00Z"),
      pricingModel: "per_seat_hour",
      rate: 50,
      seatCount: 4,
    };

    const cost = calculateSegmentCost(segment);

    expect(cost).toBe(200);
  });

  test("calculate subtotal correctly", () => {
    const segments = [{ cost: 100 }, { cost: 200 }];

    const subtotal = calculateSubtotal(segments);

    expect(subtotal).toBe(300);
  });
});
