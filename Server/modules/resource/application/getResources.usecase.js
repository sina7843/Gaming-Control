class GetResourcesUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute(filter) {
    return this.resourceRepository.findAll(filter);
  }
}

module.exports = GetResourcesUseCase;
