const {
  applyPercentDiscount,
  applyFixedDiscount,
} = require("../../../shared/utils/money.utils");

function selectDiscountsByPolicy(discounts) {
  if (!discounts.length) return [];

  const sorted = [...discounts].sort((a, b) => b.priority - a.priority);

  const exclusive = sorted.find((d) => d.isExclusive);

  if (exclusive) return [exclusive];

  return sorted.filter((d) => d.isStackable);
}

function applyDiscounts(subtotal, discounts) {
  let currentAmount = subtotal;
  let totalDiscount = 0;

  for (const discount of discounts) {
    const before = currentAmount;

    if (discount.type === "percent") {
      currentAmount = applyPercentDiscount(currentAmount, discount.value);
    } else {
      currentAmount = applyFixedDiscount(currentAmount, discount.value);
    }

    totalDiscount += before - currentAmount;
  }

  return {
    finalAmount: currentAmount,
    totalDiscountAmount: totalDiscount,
  };
}

module.exports = {
  selectDiscountsByPolicy,
  applyDiscounts,
};
