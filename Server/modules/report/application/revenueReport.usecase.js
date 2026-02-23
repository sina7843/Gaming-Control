class RevenueReportUseCase {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute({ startDate, endDate }) {
    const result = await this.reportRepository.revenueByDateRange({
      startDate,
      endDate,
    });

    return (
      result[0] || {
        totalRevenue: 0,
        totalSessions: 0,
      }
    );
  }
}

module.exports = RevenueReportUseCase;
