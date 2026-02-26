class UpdatePricingRuleUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute({ id, data }) {
    const rule = await this.pricingRepository.update(id, data);

    if (!rule) {
      throw new Error("Pricing rule not found");
    }

    return rule;
  }
}

module.exports = UpdatePricingRuleUseCase;
