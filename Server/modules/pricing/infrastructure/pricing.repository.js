const PricingRule = require("./pricing.model");

class PricingRepository {
  async findActiveByTarget({ resourceId, resourceType }) {
    return PricingRule.find({
      isActive: true,
      $or: [{ resourceId }, { resourceType }],
    });
  }
}

module.exports = PricingRepository;
