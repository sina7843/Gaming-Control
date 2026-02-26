const BadRequestError = require("../errors/BadRequestError");

function validate(schema) {
  return (req, res, next) => {
    if (!schema || typeof schema.safeParse !== "function") {
      return next(
        new BadRequestError("Invalid validation schema configuration"),
      );
    }

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const issues = result.error?.issues || result.error?.errors || [];

      const message =
        issues.length > 0
          ? issues.map((e) => e.message).join(", ")
          : "Validation failed";

      return next(new BadRequestError(message));
    }

    // فقط اگر وجود داشت overwrite کن
    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params;
    if (result.data.query) req.query = result.data.query;

    next();
  };
}

module.exports = validate;
