// گرد کردن به نزدیک‌ترین عدد صحیح
function round(value) {
  return Math.round(value);
}

// محاسبه درصد
function calculatePercent(value, percent) {
  return (value * percent) / 100;
}

// اعمال تخفیف percent
function applyPercentDiscount(amount, percent) {
  const discount = calculatePercent(amount, percent);
  return round(amount - discount);
}

// اعمال تخفیف ثابت
function applyFixedDiscount(amount, fixedAmount) {
  const result = amount - fixedAmount;
  return result < 0 ? 0 : round(result);
}

module.exports = {
  round,
  calculatePercent,
  applyPercentDiscount,
  applyFixedDiscount,
};
