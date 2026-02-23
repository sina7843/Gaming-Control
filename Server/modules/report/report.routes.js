const express = require("express");
const controller = require("./report.controller");

const router = express.Router();

router.get("/revenue", controller.revenueReport);
router.get("/revenue-by-resource", controller.revenueByResource);

module.exports = router;
