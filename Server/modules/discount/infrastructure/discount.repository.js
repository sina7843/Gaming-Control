const Discount = require("./discount.model");

class DiscountRepository {
  async create(data) {
    return Discount.create(data);
  }

  async findActive() {
    return Discount.find({ isActive: true });
  }

  async findAll(filter = {}) {
    return Discount.find(filter).sort({ priority: -1 });
  }

  async findById(id) {
    return Discount.findById(id);
  }

  async findByCode(code) {
    return Discount.findOne({ code: code.toUpperCase() });
  }

  async update(id, data) {
    return Discount.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async softDelete(id) {
    return Discount.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }

  async resetUsage(id) {
    return Discount.findByIdAndUpdate(id, { usedCount: 0 }, { new: true });
  }

  async incrementUsageIfAvailable(id, mongoSession) {
    return Discount.findOneAndUpdate(
      {
        _id: id,
        $or: [
          { usageLimit: { $exists: false } },
          { usedCount: { $lt: "$usageLimit" } },
        ],
      },
      { $inc: { usedCount: 1 } },
      { session: mongoSession },
    );
  }
}

module.exports = DiscountRepository;
