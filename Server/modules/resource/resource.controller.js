const asyncHandler = require("../../shared/middleware/asyncHandler");
const {
  createResourceUseCase,
  getResourcesUseCase,
  updateResourceUseCase,
  deleteResourceUseCase,
} = require("../../container");

exports.create = asyncHandler(async (req, res) => {
  const resource = await createResourceUseCase.execute(req.body);
  res.status(201).json(resource);
});

exports.getAll = asyncHandler(async (req, res) => {
  const resources = await getResourcesUseCase.execute(req.query);
  res.json(resources);
});

exports.getById = asyncHandler(async (req, res) => {
  const resource = await getResourcesUseCase.execute({
    _id: req.params.id,
  });

  res.json(resource);
});

exports.update = asyncHandler(async (req, res) => {
  const resource = await updateResourceUseCase.execute({
    id: req.params.id,
    data: req.body,
  });

  res.json(resource);
});

exports.remove = asyncHandler(async (req, res) => {
  const resource = await deleteResourceUseCase.execute({
    id: req.params.id,
  });

  res.json({
    message: "Resource deactivated",
    resource,
  });
});
