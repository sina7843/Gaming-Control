class GetDiscountsUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute(filter) {
    return this.discountRepository.findAll(filter);
  }
}

module.exports = GetDiscountsUseCase;
