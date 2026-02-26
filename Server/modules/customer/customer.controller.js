const asyncHandler = require("../../shared/middleware/asyncHandler");
const {
  createCustomerUseCase,
  getCustomersUseCase,
  updateCustomerUseCase,
  deleteCustomerUseCase,
} = require("../../container");

exports.create = asyncHandler(async (req, res) => {
  const customer = await createCustomerUseCase.execute(req.body);
  res.status(201).json(customer);
});

exports.getAll = asyncHandler(async (req, res) => {
  const customers = await getCustomersUseCase.execute(req.query);
  res.json(customers);
});

exports.getById = asyncHandler(async (req, res) => {
  const customers = await getCustomersUseCase.execute({
    _id: req.params.id,
  });

  res.json(customers);
});

exports.update = asyncHandler(async (req, res) => {
  const customer = await updateCustomerUseCase.execute({
    id: req.params.id,
    data: req.body,
  });

  res.json(customer);
});

exports.remove = asyncHandler(async (req, res) => {
  const customer = await deleteCustomerUseCase.execute({
    id: req.params.id,
  });

  res.json({
    message: "Customer deactivated",
    customer,
  });
});
