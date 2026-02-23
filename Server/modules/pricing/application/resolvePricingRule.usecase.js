class ResolvePricingRuleUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute({ resourceId, resourceTypeId, seatCount, date = new Date() }) {
    const rules = await this.pricingRepository.findActiveByTarget({
      resourceId,
      resourceTypeId,
    });

    const {
      filterValidRules,
      selectRuleByPriority,
    } = require("../domain/pricing.policy");

    const valid = filterValidRules(rules, { seatCount, date });

    const selected = selectRuleByPriority(valid);

    if (!selected) {
      throw new Error("No valid pricing rule found");
    }

    return selected;
  }
}

module.exports = ResolvePricingRuleUseCase;
