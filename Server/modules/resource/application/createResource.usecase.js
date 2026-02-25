class CreateResourceUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ name, resourceType, capacity }) {
    return this.resourceRepository.create({
      name,
      resourceType,
      capacity,
    });
  }
}

module.exports = CreateResourceUseCase;
