const Discount = require("./discount.model");

class DiscountRepository {
  async findActive(options = {}) {
    return Discount.find({ isActive: true }, null, options);
  }

  async incrementUsageIfAvailable(discountId, mongoSession) {
    const result = await Discount.updateOne(
      {
        _id: discountId,
        $or: [
          { maxUsage: { $exists: false } },
          { maxUsage: null },
          { $expr: { $lt: ["$usedCount", "$maxUsage"] } },
        ],
      },
      { $inc: { usedCount: 1 } },
      { session: mongoSession },
    );

    if (result.modifiedCount === 0) {
      throw new Error("Discount usage limit reached");
    }
  }
}

module.exports = DiscountRepository;
