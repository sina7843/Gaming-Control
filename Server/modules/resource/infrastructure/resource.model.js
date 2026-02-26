const mongoose = require("mongoose");
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
    },

    resourceType: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: [AVAILABLE, IN_USE, MAINTENANCE],
      default: AVAILABLE,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

resourceSchema.index({ status: 1 });
resourceSchema.index({ resourceType: 1 });

module.exports = mongoose.model("Resource", resourceSchema);
