const express = require("express");
const authenticate = require("../../shared/middleware/auth.middleware");
const authorize = require("../../shared/middleware/role.middleware");

const validate = require("../../shared/middleware/validate.middleware");

const controller = require("./pricing.controller");

const router = express.Router();

// ساخت rule فقط توسط admin
router.post(
  "/",
  authenticate,
  authorize("admin"),
  controller.createPricingRule,
);

// لیست rule ها
router.get("/", authenticate, controller.getPricingRules);

module.exports = router;
