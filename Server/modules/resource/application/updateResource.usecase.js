class UpdateResourceUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ id, data }) {
    const resource = await this.resourceRepository.update(id, data);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  }
}

module.exports = UpdateResourceUseCase;
