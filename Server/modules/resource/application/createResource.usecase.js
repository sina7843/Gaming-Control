class CreateResourceUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ name, resourceTypeId, capacity }) {
    return this.resourceRepository.create({
      name,
      resourceTypeId,
      capacity,
    });
  }
}

module.exports = CreateResourceUseCase;
