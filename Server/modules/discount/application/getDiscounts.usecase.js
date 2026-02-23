class GetDiscountsUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute() {
    return this.discountRepository.findActive();
  }
}

module.exports = GetDiscountsUseCase;
