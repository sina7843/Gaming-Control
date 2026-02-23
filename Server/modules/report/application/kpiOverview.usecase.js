class KpiOverviewUseCase {
  constructor({ reportRepository, resourceRepository }) {
    this.reportRepository = reportRepository;
    this.resourceRepository = resourceRepository;
  }

  async execute({ startDate, endDate }) {
    const kpi = await this.reportRepository.kpiOverview({
      startDate,
      endDate,
    });

    const usage = await this.reportRepository.totalUsageMinutes({
      startDate,
      endDate,
    });

    const resourceCount = await this.resourceRepository.findAll({
      isActive: true,
      status: { $ne: "maintenance" },
    });

    const totalMinutes = Math.max(
      0,
      (new Date(endDate) - new Date(startDate)) / (1000 * 60),
    );

    const capacity = resourceCount.length * totalMinutes;

    const occupancy = usage[0]?.totalUsage
      ? (usage[0].totalUsage / capacity) * 100
      : 0;

    return {
      totalRevenue: kpi[0]?.totalRevenue || 0,
      totalSessions: kpi[0]?.totalSessions || 0,
      avgSessionMinutes: Math.round(kpi[0]?.avgDuration || 0),
      occupancyRate: Math.round(occupancy),
    };
  }
}

module.exports = KpiOverviewUseCase;
