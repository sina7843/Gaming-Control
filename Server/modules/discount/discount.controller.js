const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  createDiscountUseCase,
  getDiscountsUseCase,
} = require("../../container");

exports.createDiscount = asyncHandler(async (req, res) => {
  const discount = await createDiscountUseCase.execute(req.body);

  res.status(201).json(discount);
});

exports.getDiscounts = asyncHandler(async (req, res) => {
  const discounts = await getDiscountsUseCase.execute();

  res.json(discounts);
});
