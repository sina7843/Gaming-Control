const mongoose = require("mongoose");
const { PERCENT, FIXED } = require("../../../shared/constants/discountTypes");

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      trim: true,
      uppercase: true,
      unique: true,
      sparse: true, // چون همه تخفیف‌ها code ندارند
    },

    type: {
      type: String,
      enum: [PERCENT, FIXED],
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    applicableTags: {
      type: [String],
      default: [],
    },

    applicableResourceTypes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ResourceType",
      default: [],
    },

    priority: {
      type: Number,
      default: 0,
    },

    isExclusive: {
      type: Boolean,
      default: false,
    },

    isStackable: {
      type: Boolean,
      default: true,
    },

    maxUsage: {
      type: Number,
      min: 0,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

//
// ==============================
// Indexes حرفه‌ای
// ==============================
//

// برای گزارش‌گیری
discountSchema.index({ createdAt: -1 });

discountSchema.index({ isActive: 1, expiresAt: 1 });
discountSchema.index({ priority: -1 });

//
// ==============================
// Export
// ==============================
//

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
