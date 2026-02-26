class UpdateDiscountUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute({ id, data }) {
    const discount = await this.discountRepository.update(id, data);

    if (!discount) {
      throw new Error("Discount not found");
    }

    return discount;
  }
}

module.exports = UpdateDiscountUseCase;