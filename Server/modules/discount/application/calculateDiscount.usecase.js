const {
  filterValidDiscounts,
  resolveDiscountStack,
  applyDiscounts,
} = require("../domain/discount.policy");

class CalculateDiscountUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute({
    subtotal,
    customer,
    resourceType,
    discountCode,
    now = new Date(),
  }) {
    if (!subtotal || subtotal <= 0) {
      return {
        appliedDiscounts: [],
        totalDiscountAmount: 0,
        finalAmount: subtotal || 0,
      };
    }

    const allDiscounts = await this.discountRepository.findActive();

    const valid = filterValidDiscounts(allDiscounts, {
      now,
      subtotal,
      customer,
      resourceType,
      discountCode,
    });

    const selected = resolveDiscountStack(valid);

    if (!selected.length) {
      return {
        appliedDiscounts: [],
        totalDiscountAmount: 0,
        finalAmount: subtotal,
      };
    }

    const result = applyDiscounts(subtotal, selected);

    return {
      appliedDiscounts: selected.map((d) => ({
        id: d._id,
        name: d.name,
        type: d.type,
        value: d.value,
      })),
      ...result,
    };
  }
}

module.exports = CalculateDiscountUseCase;
