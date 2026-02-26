const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    mode: {
      type: String,
      enum: ["AUTO", "TAG", "CODE"],
      required: true,
    },

    code: {
      type: String,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["PERCENT", "FIXED"],
      required: true,
    },

    value: { type: Number, required: true },

    applicableResourceTypes: {
      type: [String],
      default: [],
    },

    applicableTags: {
      type: [String],
      default: [],
    },

    minSubtotal: {
      type: Number,
      default: 0,
    },

    maxDiscountAmount: Number,

    usageLimit: Number,
    usedCount: {
      type: Number,
      default: 0,
    },

    startAt: Date,
    expiresAt: Date,

    priority: {
      type: Number,
      default: 0,
    },

    isStackable: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

discountSchema.index({ code: 1 });
discountSchema.index({ priority: -1 });
discountSchema.index({ isActive: 1 });

module.exports = mongoose.model("Discount", discountSchema);
