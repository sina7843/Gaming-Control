const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    tags: {
      type: [String],
      default: [],
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

// جستجوی متنی اختیاری
customerSchema.index({ tags: 1 });
customerSchema.index({ createdAt: -1 });
customerSchema.index({ name: "text" });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
