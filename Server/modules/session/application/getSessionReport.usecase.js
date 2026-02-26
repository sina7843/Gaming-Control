class GetSessionReportUseCase {
  constructor({ sessionRepository }) {
    this.sessionRepository = sessionRepository;
  }

  async execute({ from, to }) {
    const sessions = await this.sessionRepository.findByDateRange(
      new Date(from),
      new Date(to),
    );

    const summary = {
      totalSessions: sessions.length,
      totalRevenue: 0,
      totalDiscount: 0,
      totalTax: 0,
      totalNet: 0,
    };

    for (const s of sessions) {
      summary.totalRevenue += s.subtotal || 0;
      summary.totalDiscount += s.discountAmount || 0;
      summary.totalTax += s.taxAmount || 0;
      summary.totalNet += s.totalCost || 0;
    }

    return {
      summary,
      sessions,
    };
  }
}

module.exports = GetSessionReportUseCase;
