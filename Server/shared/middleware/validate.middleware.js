const BadRequestError = require("../errors/BadRequestError");

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(", ");

      return next(new BadRequestError(message));
    }

    // داده‌های sanitize شده را جایگزین کن
    req.body = result.data.body;
    req.params = result.data.params;
    req.query = result.data.query;

    next();
  };
}

module.exports = validate;
