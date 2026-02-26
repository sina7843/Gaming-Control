class GetCustomersUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(query) {
    if (query.search) {
      return this.customerRepository.search(query.search);
    }

    return this.customerRepository.findAll(query);
  }
}

module.exports = GetCustomersUseCase;
