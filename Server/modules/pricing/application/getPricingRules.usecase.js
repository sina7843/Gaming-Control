class GetPricingRulesUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute() {
    return this.pricingRepository.findActiveByTarget({});
  }
}

module.exports = GetPricingRulesUseCase;
