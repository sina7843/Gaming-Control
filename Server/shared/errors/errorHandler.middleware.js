const AppError = require("./AppError");

const errorHandler = (err, req, res, next) => {
  // اگر خطا از نوع AppError نباشد
  if (!err.isOperational) {
    console.error("UNEXPECTED ERROR:", err);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
