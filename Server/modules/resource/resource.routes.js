const express = require("express");

const authenticate = require("../../shared/middleware/auth.middleware");

const authorize = require("../../shared/middleware/role.middleware");

const validate = require("../../shared/middleware/validate.middleware");

const {
  createResourceSchema,
} = require("../../shared/validators/resource.validator");

const controller = require("./resource.controller");

const router = express.Router();

// ==============================
// Create Resource (Admin)
// ==============================

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createResourceSchema),
  controller.createResource,
);

// ==============================
// Get Resource (Admin + Staff)
// ==============================

router.get("/:id", authenticate, controller.getResource);

// ==============================
// Update Status (Admin)
// ==============================

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  controller.updateResourceStatus,
);

module.exports = router;
