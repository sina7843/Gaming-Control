const asyncHandler = require("../../shared/middleware/asyncHandler");

const {
  createCustomerUseCase,
  updateCustomerTagsUseCase,
  getCustomerUseCase,
} = require("../../container");

exports.getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await getAllCustomersUseCase.execute();

  res.json(customers);
});

exports.createCustomer = asyncHandler(async (req, res) => {
  const { name, phone, email, tags } = req.body;

  const customer = await createCustomerUseCase.execute({
    name,
    phone,
    email,
    tags,
  });

  res.status(201).json(customer);
});

exports.getCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await getCustomerUseCase.execute({
    customerId: id,
  });

  res.json(customer);
});

exports.updateCustomerTags = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { tags } = req.body;

  await updateCustomerTagsUseCase.execute({
    customerId: id,
    tags,
  });

  res.json({
    message: "Customer tags updated successfully",
  });
});
