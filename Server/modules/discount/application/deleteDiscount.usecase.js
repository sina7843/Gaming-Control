class DeleteDiscountUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute({ id }) {
    const discount = await this.discountRepository.softDelete(id);

    if (!discount) {
      throw new Error("Discount not found");
    }

    return discount;
  }
}

module.exports = DeleteDiscountUseCase;
