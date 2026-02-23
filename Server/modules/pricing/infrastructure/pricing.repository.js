const PricingRule = require("./pricing.model");

class PricingRepository {
  async findActiveByTarget({ resourceId, resourceTypeId }) {
    return PricingRule.find({
      isActive: true,
      $or: [{ resourceId }, { resourceTypeId }],
    });
  }
}

module.exports = PricingRepository;
