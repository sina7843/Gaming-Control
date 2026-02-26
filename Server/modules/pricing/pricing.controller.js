const asyncHandler = require("../../shared/middleware/asyncHandler");
const {
  createPricingRuleUseCase,
  getPricingRulesUseCase,
  updatePricingRuleUseCase,
  deletePricingRuleUseCase,
} = require("../../container");

exports.create = asyncHandler(async (req, res) => {
  const rule = await createPricingRuleUseCase.execute(req.body);
  res.status(201).json(rule);
});

exports.getAll = asyncHandler(async (req, res) => {
  const rules = await getPricingRulesUseCase.execute(req.query);
  res.json(rules);
});

exports.getById = asyncHandler(async (req, res) => {
  const rule = await getPricingRulesUseCase.execute({
    _id: req.params.id,
  });

  res.json(rule);
});

exports.update = asyncHandler(async (req, res) => {
  const rule = await updatePricingRuleUseCase.execute({
    id: req.params.id,
    data: req.body,
  });

  res.json(rule);
});

exports.remove = asyncHandler(async (req, res) => {
  const rule = await deletePricingRuleUseCase.execute({
    id: req.params.id,
  });

  res.json({
    message: "Pricing rule deactivated",
    rule,
  });
});
