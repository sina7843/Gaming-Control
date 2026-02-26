class GetCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute({}) {
    const customer = await this.customerRepository.find();

    return customer;
  }
}

module.exports = GetCustomerUseCase;
