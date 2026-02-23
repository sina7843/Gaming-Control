class CreateCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute({ name, phone, email, tags = [] }) {
    return this.customerRepository.create({
      name,
      phone,
      email,
      tags,
    });
  }
}

module.exports = CreateCustomerUseCase;
