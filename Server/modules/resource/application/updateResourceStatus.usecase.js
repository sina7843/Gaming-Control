class UpdateResourceStatusUseCase {
  constructor({ resourceRepository }) {
    this.resourceRepository = resourceRepository;
  }

  async execute({ resourceId, status }) {
    return this.resourceRepository.updateStatus(resourceId, status);
  }
}

module.exports = UpdateResourceStatusUseCase;
