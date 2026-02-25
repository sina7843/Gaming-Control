const mongoose = require("mongoose");
const ResourceType = require("../domain/resourceType.enum");
const {
  AVAILABLE,
  IN_USE,
  MAINTENANCE,
} = require("../../../shared/constants/resourceStatus");

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    resourceType: {
      type: String,
      enum: Object.values(ResourceType),
      required: true,
    },

    capacity: {
      type: Number,
      min: 1,
    },

    status: {
      type: String,
      enum: [AVAILABLE, IN_USE, MAINTENANCE],
      default: AVAILABLE,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

//
// ==============================
// Indexes
// ==============================
//
// برای گزارش‌گیری
resourceSchema.index({ createdAt: -1 });
resourceSchema.index({ name: 1, resourceType: 1 }, { unique: true });
resourceSchema.index({ status: 1 });
resourceSchema.index({ resourceType: 1 });

//
// ==============================
// Export
// ==============================
//

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
