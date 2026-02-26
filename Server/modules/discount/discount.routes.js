const express = require("express");
const authenticate = require("../../shared/middleware/auth.middleware");
const authorize = require("../../shared/middleware/role.middleware");
const controller = require("./discount.controller");

const router = express.Router();

router.post("/", authenticate, authorize("admin"), controller.create);

router.get("/", authenticate, controller.getAll);

router.patch("/:id", authenticate, authorize("admin"), controller.update);

router.delete("/:id", authenticate, authorize("admin"), controller.remove);

router.patch(
  "/:id/reset",
  authenticate,
  authorize("admin"),
  controller.resetUsage,
);

module.exports = router;
