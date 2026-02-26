class DeleteResourceUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ id }) {
    const resource = await this.resourceRepository.softDelete(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  }
}

module.exports = DeleteResourceUseCase;
