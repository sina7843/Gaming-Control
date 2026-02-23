const express = require("express");

const authenticate = require("../../shared/middleware/auth.middleware");

const authorize = require("../../shared/middleware/role.middleware");

const validate = require("../../shared/middleware/validate.middleware");

const {
  createCustomerSchema,
} = require("../../shared/validators/customer.validator");

const controller = require("./customer.controller");

const router = express.Router();

// ساخت مشتری فقط توسط admin
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createCustomerSchema),
  controller.createCustomer,
);

// مشاهده مشتری (admin و staff)
router.get("/:id", authenticate, controller.getCustomer);

// تغییر tag فقط admin
router.patch(
  "/:id/tags",
  authenticate,
  authorize("admin"),
  controller.updateCustomerTags,
);
router.get("/", authenticate, authorize("admin"), controller.getAllCustomers);

module.exports = router;
