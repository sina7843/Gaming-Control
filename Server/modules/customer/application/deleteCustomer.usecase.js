class DeleteCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute({ id }) {
    const customer = await this.customerRepository.softDelete(id);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  }
}

module.exports = DeleteCustomerUseCase;
