const {
  selectDiscountsByPolicy,
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

    // فیلتر اعتبار
    const validDiscounts = allDiscounts.filter((d) => {
      // تاریخ انقضا
      if (d.expiresAt && d.expiresAt < now) {
        return false;
      }

      // محدودیت resourceType
      if (
        d.applicableResourceTypes?.length &&
        !d.applicableResourceTypes.some((id) => id.equals(resourceType))
      ) {
        return false;
      }

      // محدودیت tag
      if (
        d.applicableTags?.length &&
        !customer?.tags?.some((tag) => d.applicableTags.includes(tag))
      ) {
        return false;
      }

      return true;
    });

    // ===============================
    // Policy:
    // اگر discountCode داده شده باشد → فقط همان
    // ===============================

    if (discountCode) {
      const codeDiscount = validDiscounts.find(
        (d) => d.code === discountCode.toUpperCase(),
      );

      if (!codeDiscount) {
        throw new Error("Invalid or expired discount code");
      }

      const result = applyDiscounts(subtotal, [codeDiscount]);

      return {
        appliedDiscounts: [
          {
            id: codeDiscount._id,
            name: codeDiscount.name,
            type: codeDiscount.type,
            value: codeDiscount.value,
          },
        ],
        ...result,
      };
    }

    // ===============================
    // Tag-based policy
    // ===============================

    const selected = selectDiscountsByPolicy(validDiscounts);

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
