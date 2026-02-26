class UpdateCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute({ id, data }) {
    const customer = await this.customerRepository.update(id, data);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  }
}

module.exports = UpdateCustomerUseCase;
