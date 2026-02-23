// ==============================
// Repositories
// ==============================

const SessionRepository = require("../modules/session/infrastructure/session.repository");

const ResourceRepository = require("../modules/resource/infrastructure/resource.repository");

const DiscountRepository = require("../modules/discount/infrastructure/discount.repository");

const PricingRepository = require("../modules/pricing/infrastructure/pricing.repository");

const CustomerRepository = require("../modules/customer/infrastructure/customer.repository");

// ==============================
// UseCases - Pricing
// ==============================

const ResolvePricingRuleUseCase = require("../modules/pricing/application/resolvePricingRule.usecase");

// ==============================
// UseCases - Discount
// ==============================

const CreatePricingRuleUseCase = require("../modules/pricing/application/createPricingRule.usecase");
const GetPricingRulesUseCase = require("../modules/pricing/application/getPricingRules.usecase");

const CreateDiscountUseCase = require("../modules/discount/application/createDiscount.usecase");
const GetDiscountsUseCase = require("../modules/discount/application/getDiscounts.usecase");
const CalculateDiscountUseCase = require("../modules/discount/application/calculateDiscount.usecase");

// ==============================
// UseCases - Session
// ==============================

const StartSessionUseCase = require("../modules/session/application/startSession.usecase");

const UpdateSeatUseCase = require("../modules/session/application/updateSeat.usecase");

const FinishSessionUseCase = require("../modules/session/application/finishSession.usecase");

// ==============================
// UseCases - Resource
// ==============================

const CreateResourceUseCase = require("../modules/resource/application/createResource.usecase");

const UpdateResourceStatusUseCase = require("../modules/resource/application/updateResourceStatus.usecase");

const GetResourceUseCase = require("../modules/resource/application/getResource.usecase");

// ==============================
// UseCases - Customer
// ==============================

const CreateCustomerUseCase = require("../modules/customer/application/createCustomer.usecase");

const UpdateCustomerTagsUseCase = require("../modules/customer/application/updateCustomerTags.usecase");

const GetCustomerUseCase = require("../modules/customer/application/getCustomer.usecase");

// ==============================
// Wiring
// ==============================

const sessionRepository = new SessionRepository();
const resourceRepository = new ResourceRepository();
const discountRepository = new DiscountRepository();
const pricingRepository = new PricingRepository();
const customerRepository = new CustomerRepository();
const TransactionManager = require("../shared/database/transaction.manager");

const transactionManager = new TransactionManager();

const createPricingRuleUseCase = new CreatePricingRuleUseCase({
  pricingRepository,
});

const getPricingRulesUseCase = new GetPricingRulesUseCase({
  pricingRepository,
});

const createDiscountUseCase = new CreateDiscountUseCase({ discountRepository });

const getDiscountsUseCase = new GetDiscountsUseCase({ discountRepository });

const resolvePricingRuleUseCase = new ResolvePricingRuleUseCase({
  pricingRepository,
});

const calculateDiscountUseCase = new CalculateDiscountUseCase({
  discountRepository,
});

const startSessionUseCase = new StartSessionUseCase({
  sessionRepository,
  resourceRepository,
  resolvePricingRuleUseCase,
  transactionManager,
});

const updateSeatUseCase = new UpdateSeatUseCase({
  sessionRepository,
  resourceRepository,
  resolvePricingRuleUseCase,
  transactionManager,
});

const finishSessionUseCase = new FinishSessionUseCase({
  sessionRepository,
  resourceRepository,
  discountUseCase: calculateDiscountUseCase,
  discountRepository,
  transactionManager,
});

const createResourceUseCase = new CreateResourceUseCase({
  resourceRepository,
});

const updateResourceStatusUseCase = new UpdateResourceStatusUseCase({
  resourceRepository,
});

const getResourceUseCase = new GetResourceUseCase({
  resourceRepository,
});

const createCustomerUseCase = new CreateCustomerUseCase({
  customerRepository,
});

const updateCustomerTagsUseCase = new UpdateCustomerTagsUseCase({
  customerRepository,
});

const getCustomerUseCase = new GetCustomerUseCase({
  customerRepository,
});

// ==============================
// Export
// ==============================

module.exports = {
  startSessionUseCase,
  updateSeatUseCase,
  finishSessionUseCase,

  createResourceUseCase,
  updateResourceStatusUseCase,
  getResourceUseCase,
  createPricingRuleUseCase,
  getPricingRulesUseCase,
  createDiscountUseCase,
  getDiscountsUseCase,
  createCustomerUseCase,
  updateCustomerTagsUseCase,
  getCustomerUseCase,
};
