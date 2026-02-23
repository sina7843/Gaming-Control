const express = require("express");
const authenticate = require("../../shared/middleware/auth.middleware");
const authorize = require("../../shared/middleware/role.middleware");

const controller = require("./discount.controller");

const router = express.Router();

// ساخت discount فقط admin
router.post("/", authenticate, authorize("admin"), controller.createDiscount);

// لیست discount ها
router.get("/", authenticate, controller.getDiscounts);

module.exports = router;
