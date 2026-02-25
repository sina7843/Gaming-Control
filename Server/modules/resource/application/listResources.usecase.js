class ListResourcesUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute() {
    return await this.resourceRepository.findAll();
  }
}

module.exports = ListResourcesUseCase;
