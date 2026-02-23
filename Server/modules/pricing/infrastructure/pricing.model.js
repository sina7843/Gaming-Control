const mongoose = require("mongoose");
const {
  PER_HOUR,
  PER_MINUTE,
  PER_SEAT_HOUR,
  FLAT,
} = require("../../../shared/constants/pricingModels");

const pricingRuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    resourceTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResourceType",
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },

    seatMin: { type: Number },
    seatMax: { type: Number },

    dayOfWeek: { type: [Number], default: [] },

    startTime: { type: String },
    endTime: { type: String },

    pricingModel: {
      type: String,
      enum: [PER_HOUR, PER_MINUTE, PER_SEAT_HOUR, FLAT],
      required: true,
    },

    price: { type: Number, required: true },

    priority: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

pricingRuleSchema.index({ resourceId: 1 });
pricingRuleSchema.index({ resourceTypeId: 1 });
pricingRuleSchema.index({ priority: -1 });
pricingRuleSchema.index({ isActive: 1 });
pricingRuleSchema.index({ isActive: 1, resourceId: 1, priority: -1 });
pricingRuleSchema.index({ isActive: 1, resourceTypeId: 1, priority: -1 });

const PricingRule = mongoose.model("PricingRule", pricingRuleSchema);

module.exports = PricingRule;
