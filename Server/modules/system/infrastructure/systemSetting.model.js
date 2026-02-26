const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    value: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
