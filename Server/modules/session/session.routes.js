const express = require("express");
const validate = require("../../shared/middleware/validate.middleware");
const {
  startSessionSchema,
  updateSeatSchema,
  finishSessionSchema,
} = require("../../shared/validators/session.validator");

const controller = require("./session.controller");

const router = express.Router();

router.post("/", validate(startSessionSchema), controller.startSession);

router.patch("/:id/seat", validate(updateSeatSchema), controller.updateSeat);

router.post(
  "/:id/finish",
  validate(finishSessionSchema),
  controller.finishSession,
);

module.exports = router;
