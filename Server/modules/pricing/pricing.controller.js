const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  createPricingRuleUseCase,
  getPricingRulesUseCase,
} = require("../../container");

exports.createPricingRule = asyncHandler(async (req, res) => {
  const rule = await createPricingRuleUseCase.execute(req.body);

  res.status(201).json(rule);
});

exports.getPricingRules = asyncHandler(async (req, res) => {
  const rules = await getPricingRulesUseCase.execute();

  res.json(rules);
});
