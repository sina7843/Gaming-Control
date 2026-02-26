class GetSessionsUseCase {
  constructor({ sessionRepository }) {
    this.sessionRepository = sessionRepository;
  }

  async execute(filter) {
    return this.sessionRepository.findAll(filter);
  }
}

module.exports = GetSessionsUseCase;
