const Session = require("../../session/infrastructure/session.model");

class ReportRepository {
  async revenueByDateRange({ startDate, endDate }) {
    return Session.aggregate([
      {
        $match: {
          status: "finished",
          startedAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalCost" },
          totalSessions: { $sum: 1 },
        },
      },
    ]);
  }

  async revenueByResource({ startDate, endDate }) {
    return Session.aggregate([
      {
        $match: {
          status: "finished",
          startedAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$resourceId",
          revenue: { $sum: "$totalCost" },
          sessions: { $sum: 1 },
        },
      },
      {
        $sort: { revenue: -1 },
      },
    ]);
  }
  async kpiOverview({ startDate, endDate }) {
  return Session.aggregate([
    {
      $match: {
        status: 'finished',
        startedAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $project: {
        totalCost: 1,
        durationMinutes: {
          $divide: [
            { $subtract: ['$endedAt', '$startedAt'] },
            1000 * 60,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalCost' },
        totalSessions: { $sum: 1 },
        avgDuration: { $avg: '$durationMinutes' },
      },
    },
  ]);
}
async peakUsageHours({ startDate, endDate }) {
  return Session.aggregate([
    {
      $match: {
        status: 'finished',
        startedAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $project: {
        hour: { $hour: '$startedAt' },
      },
    },
    {
      $group: {
        _id: '$hour',
        sessions: { $sum: 1 },
      },
    },
    {
      $sort: { sessions: -1 },
    },
  ]);
}

}

module.exports = ReportRepository;
