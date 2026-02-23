class RevenueByResourceUseCase {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute({ startDate, endDate }) {
    return this.reportRepository.revenueByResource({
      startDate,
      endDate,
    });
  }
}

module.exports = RevenueByResourceUseCase;
