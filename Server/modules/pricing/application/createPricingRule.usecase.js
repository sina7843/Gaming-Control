class CreatePricingRuleUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute(data) {
    return this.pricingRepository.create(data);
  }
}

module.exports = CreatePricingRuleUseCase;
