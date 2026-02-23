class CreateDiscountUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute(data) {
    return this.discountRepository.create(data);
  }
}

module.exports = CreateDiscountUseCase;
