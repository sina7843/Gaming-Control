const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  createResourceUseCase,
  updateResourceStatusUseCase,
  getResourceUseCase,
} = require("../../container");

// ==============================
// Create Resource (Admin Only)
// ==============================

exports.createResource = asyncHandler(async (req, res) => {
  const { name, resourceTypeId, capacity } = req.body;

  const resource = await createResourceUseCase.execute({
    name,
    resourceTypeId,
    capacity,
  });

  res.status(201).json(resource);
});

// ==============================
// Get Single Resource
// ==============================

exports.getResource = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const resource = await getResourceUseCase.execute({
    resourceId: id,
  });

  res.json(resource);
});

// ==============================
// Update Resource Status (Admin)
// ==============================

exports.updateResourceStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await updateResourceStatusUseCase.execute({
    resourceId: id,
    status,
  });

  res.json({
    message: "Resource status updated successfully",
  });
});
