const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const errorHandler = require("./shared/errors/errorHandler.middleware");

const sessionRoutes = require("./modules/session/session.routes");

const resourceRoutes = require("./modules/resource/resource.routes");

const customerRoutes = require("./modules/customer/customer.routes");

const pricingRoutes = require("./modules/pricing/pricing.routes");

const discountRoutes = require("./modules/discount/discount.routes");

const reportRoutes = require("./modules/report/report.routes");

const authRoutes = require("./modules/auth/auth.routes");

const app = express();

// ==============================
// Security Middlewares
// ==============================

app.use(helmet());
app.use(cors());

// ==============================
// Body Parsing
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==============================
// Health Check
// ==============================

app.get("/health", (req, res) => {
  const dbState =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    status: "ok",
    db: dbState,
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/report", reportRoutes);

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use(errorHandler);

module.exports = app;
