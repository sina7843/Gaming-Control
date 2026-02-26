class GetActiveSessionsUseCase {
  constructor({ sessionRepository }) {
    this.sessionRepository = sessionRepository;
  }

  async execute() {
    return this.sessionRepository.findActive();
  }
}

module.exports = GetActiveSessionsUseCase;
