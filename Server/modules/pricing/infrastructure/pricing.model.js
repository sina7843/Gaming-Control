const mongoose = require("mongoose");
const {
  PER_HOUR,
  PER_MINUTE,
  PER_SEAT_HOUR,
  FLAT,
} = require("../../../shared/constants/pricingModels");

const ResourceType = require("../../resource/domain/resourceType.enum");

const pricingRuleSchema = new mongoose.Schema(
  {
    name: String,

    resourceType: String,
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },

    pricingModel: {
      type: String,
      enum: ["PER_HOUR", "PER_MINUTE", "PER_SEAT_HOUR", "FLAT"],
      required: true,
    },

    price: Number,

    // 🔹 زمان
    minimumMinutes: {
      type: Number,
      default: 0,
    },

    roundingMinutes: {
      type: Number,
      default: 1,
    },

    // 🔹 بازه زمانی
    startTime: String, // "18:00"
    endTime: String, // "23:59"

    dayOfWeek: {
      type: [Number], // 0-6
      default: [],
    },

    // 🔹 پلکانی
    tiers: [
      {
        upToMinutes: Number,
        price: Number,
      },
    ],

    priority: Number,
    isActive: Boolean,
  },
  { timestamps: true },
);

pricingRuleSchema.index({ resourceId: 1 });
pricingRuleSchema.index({ resourceType: 1 });
pricingRuleSchema.index({ priority: -1 });
pricingRuleSchema.index({ isActive: 1 });
pricingRuleSchema.index({ isActive: 1, resourceId: 1, priority: -1 });
pricingRuleSchema.index({ isActive: 1, resourceType: 1, priority: -1 });

const PricingRule = mongoose.model("PricingRule", pricingRuleSchema);

module.exports = PricingRule;
