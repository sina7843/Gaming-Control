const mongoose = require("mongoose");
const {
  ACTIVE,
  FINISHED,
  CANCELLED,
} = require("../../../shared/constants/sessionStatus");

//
// ==============================
// Segment Schema (Embedded)
// ==============================
//

const segmentSchema = new mongoose.Schema(
  {
    startedAt: {
      type: Date,
      required: true,
    },

    endedAt: {
      type: Date,
    },

    seatCount: {
      type: Number,
      required: true,
      min: 1,
    },

    appliedRuleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PricingRule",
      required: true,
    },

    pricingModel: {
      type: String,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
      min: 0,
    },

    cost: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

//
// ==============================
// Session Schema
// ==============================
//

const sessionSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    startedAt: {
      type: Date,
      required: true,
    },

    endedAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: [ACTIVE, FINISHED, CANCELLED],
      default: ACTIVE,
    },

    segments: {
      type: [segmentSchema],
      default: [],
    },

    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    appliedDiscountCode: {
      type: String,
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

//
// ==============================
// Indexes (خیلی مهم)
// ==============================
//

// جلوگیری از داشتن بیش از یک session active برای یک resource
sessionSchema.index(
  { resourceId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: ACTIVE },
  },
);

// گزارش‌گیری سریع
sessionSchema.index({ customerId: 1 });
sessionSchema.index({ startedAt: -1 });
sessionSchema.index({ status: 1 });
// KPI queries
sessionSchema.index({ status: 1, startedAt: 1 });
// KPI by resource
sessionSchema.index({ status: 1, startedAt: 1, resourceId: 1 });
// Customer history
sessionSchema.index({ customerId: 1, startedAt: 1 });

//
// ==============================
// Export
// ==============================
//

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
