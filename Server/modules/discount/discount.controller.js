const asyncHandler = require("../../shared/middleware/asyncHandler");
const {
  createDiscountUseCase,
  getDiscountsUseCase,
  updateDiscountUseCase,
  deleteDiscountUseCase,
  resetDiscountUsageUseCase,
} = require("../../container");

exports.create = asyncHandler(async (req, res) => {
  const discount = await createDiscountUseCase.execute(req.body);
  res.status(201).json(discount);
});

exports.getAll = asyncHandler(async (req, res) => {
  const discounts = await getDiscountsUseCase.execute(req.query);
  res.json(discounts);
});

exports.update = asyncHandler(async (req, res) => {
  const discount = await updateDiscountUseCase.execute({
    id: req.params.id,
    data: req.body,
  });

  res.json(discount);
});

exports.remove = asyncHandler(async (req, res) => {
  const discount = await deleteDiscountUseCase.execute({
    id: req.params.id,
  });

  res.json({
    message: "Discount deactivated",
    discount,
  });
});

exports.resetUsage = asyncHandler(async (req, res) => {
  const discount = await resetDiscountUsageUseCase.execute({
    id: req.params.id,
  });

  res.json(discount);
});
