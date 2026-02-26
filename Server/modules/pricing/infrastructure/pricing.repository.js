const PricingRule = require("./pricing.model");

class PricingRepository {
  async create(data) {
    return PricingRule.create(data);
  }

  async findActiveByTarget({ resourceId, resourceType }) {
    return PricingRule.find({
      isActive: true,
      $or: [{ resourceId }, { resourceType }],
    });
  }

  async findAll(filter = {}) {
    return PricingRule.find(filter).sort({ priority: -1 });
  }

  async findById(id) {
    return PricingRule.findById(id);
  }

  async update(id, data) {
    return PricingRule.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async softDelete(id) {
    return PricingRule.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
  }
}

module.exports = PricingRepository;
