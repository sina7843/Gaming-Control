const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  startSessionUseCase,
  updateSeatUseCase,
  finishSessionUseCase,
} = require("../../container");

exports.startSession = asyncHandler(async (req, res) => {
  const { resourceId, customerId, seatCount } = req.body;

  const session = await startSessionUseCase.execute({
    resourceId,
    customerId,
    seatCount,
  });

  res.status(201).json(session);
});

exports.updateSeat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newSeatCount } = req.body;

  const session = await updateSeatUseCase.execute({
    sessionId: id,
    newSeatCount,
  });

  res.json(session);
});

exports.finishSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { discountCode } = req.body;

  const session = await finishSessionUseCase.execute({
    sessionId: id,
    discountCode,
  });

  res.json(session);
});
