class GetResourceUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ resourceId }) {
    const resource = await this.resourceRepository.findById(resourceId);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  }
}

module.exports = GetResourceUseCase;
