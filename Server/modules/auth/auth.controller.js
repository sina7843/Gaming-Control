const asyncHandler = require("../../shared/middleware/asyncHandler");

const { registerUseCase, loginUseCase } = require("../../container");

exports.register = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  const user = await registerUseCase.execute({
    username,
    password,
    role,
  });

  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await loginUseCase.execute({
    username,
    password,
  });

  res.json(result);
});
