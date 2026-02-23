class UpdateCustomerTagsUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute({ customerId, tags }) {
    return this.customerRepository.updateTags(customerId, tags);
  }
}

module.exports = UpdateCustomerTagsUseCase;
