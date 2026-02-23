const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  revenueReportUseCase,
  revenueByResourceUseCase,
} = require("../../container");

exports.revenueReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const result = await revenueReportUseCase.execute({
    startDate,
    endDate,
  });

  res.json(result);
});

exports.revenueByResource = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const result = await revenueByResourceUseCase.execute({
    startDate,
    endDate,
  });

  res.json(result);
});

exports.kpiOverview = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const result = await kpiOverviewUseCase.execute({
    startDate,
    endDate,
  });

  res.json(result);
});
