const express = require("express");
const validate = require("../../shared/middleware/validate.middleware");
const {
  startSessionSchema,
  updateSeatSchema,
  finishSessionSchema,
} = require("../../shared/validators/session.validator");

const controller = require("./session.controller");

const router = express.Router();

const authenticate = require("../../shared/middleware/auth.middleware");
const authorize = require("../../shared/middleware/role.middleware");
router.get("/", authenticate, controller.getAll);

router.get("/active", authenticate, controller.getActive);

router.get("/report", authenticate, authorize("admin"), controller.report);

router.get("/:id", authenticate, controller.getById);
router.post(
  "/",
  authenticate,
  validate(startSessionSchema),
  controller.startSession,
);
router.patch(
  "/:id/seat",
  authenticate,
  validate(updateSeatSchema),
  controller.updateSeat,
);
router.post(
  "/:id/finish",
  authenticate,
  validate(finishSessionSchema),
  controller.finishSession,
);

module.exports = router;
