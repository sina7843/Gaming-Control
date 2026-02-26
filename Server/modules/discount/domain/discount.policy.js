function isWithinTimeWindow(discount, now) {
  if (discount.startAt && discount.startAt > now) return false;
  if (discount.expiresAt && discount.expiresAt < now) return false;
  return true;
}

function isUsageAvailable(discount) {
  if (!discount.usageLimit) return true;
  return discount.usedCount < discount.usageLimit;
}

function isResourceTypeValid(discount, resourceType) {
  if (!discount.applicableResourceTypes?.length) return true;
  return discount.applicableResourceTypes.includes(resourceType);
}

function isTagValid(discount, customer) {
  if (discount.mode !== "TAG") return true;
  if (!discount.applicableTags?.length) return true;
  return customer?.tags?.some((tag) => discount.applicableTags.includes(tag));
}

function isCodeValid(discount, discountCode) {
  if (discount.mode !== "CODE") return true;
  if (!discountCode) return false;
  return discount.code === discountCode.toUpperCase();
}

function isMinSubtotalValid(discount, subtotal) {
  return subtotal >= (discount.minSubtotal || 0);
}

function filterValidDiscounts(discounts, context) {
  const { now, subtotal, customer, resourceType, discountCode } = context;

  return discounts.filter((d) => {
    if (!d.isActive) return false;
    if (!isWithinTimeWindow(d, now)) return false;
    if (!isUsageAvailable(d)) return false;
    if (!isResourceTypeValid(d, resourceType)) return false;
    if (!isMinSubtotalValid(d, subtotal)) return false;

    if (!isTagValid(d, customer)) return false;
    if (!isCodeValid(d, discountCode)) return false;

    return true;
  });
}

function resolveDiscountStack(discounts) {
  if (!discounts.length) return [];

  const sorted = [...discounts].sort((a, b) => b.priority - a.priority);

  const exclusive = sorted.find((d) => d.isStackable === false);

  if (exclusive) {
    return [exclusive];
  }

  return sorted;
}

function applyDiscounts(subtotal, discounts) {
  let currentAmount = subtotal;
  let totalDiscountAmount = 0;

  for (const d of discounts) {
    let discountAmount = 0;

    if (d.type === "PERCENT") {
      discountAmount = (currentAmount * d.value) / 100;
    } else if (d.type === "FIXED") {
      discountAmount = d.value;
    }

    if (d.maxDiscountAmount) {
      discountAmount = Math.min(discountAmount, d.maxDiscountAmount);
    }

    discountAmount = Math.min(discountAmount, currentAmount);

    currentAmount -= discountAmount;
    totalDiscountAmount += discountAmount;
  }

  return {
    totalDiscountAmount,
    finalAmount: currentAmount,
  };
}

module.exports = {
  filterValidDiscounts,
  resolveDiscountStack,
  applyDiscounts,
};
