class ResetDiscountUsageUseCase {
  constructor({ discountRepository }) {
    this.discountRepository = discountRepository;
  }

  async execute({ id }) {
    const discount = await this.discountRepository.resetUsage(id);

    if (!discount) {
      throw new Error("Discount not found");
    }

    return discount;
  }
}

module.exports = ResetDiscountUsageUseCase;
