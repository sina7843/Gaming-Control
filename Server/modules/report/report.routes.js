const express = require("express");
const controller = require("./report.controller");
const authenticate = require("../../shared/middleware/auth.middleware");
const authorize = require("../../shared/middleware/role.middleware");
const router = express.Router();

router.get(
  "/revenue",
  authenticate,
  authorize("admin"),
  controller.revenueReport,
);
router.get(
  "/revenue-by-resource",
  authenticate,
  authorize("admin"),
  controller.revenueByResource,
);

module.exports = router;
