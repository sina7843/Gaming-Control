class DeletePricingRuleUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute({ id }) {
    const rule = await this.pricingRepository.softDelete(id);

    if (!rule) {
      throw new Error("Pricing rule not found");
    }

    return rule;
  }
}

module.exports = DeletePricingRuleUseCase;
