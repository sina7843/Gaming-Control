class GetPricingRulesUseCase {
  constructor({ pricingRepository }) {
    this.pricingRepository = pricingRepository;
  }

  async execute(filter) {
    return this.pricingRepository.findAll(filter);
  }
}

module.exports = GetPricingRulesUseCase;
