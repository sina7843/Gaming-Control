// ==============================
// Repositories
// ==============================

const SessionRepository = require("../modules/session/infrastructure/session.repository");
const GetResourcesUseCase = require("../modules/resource/application/getResources.usecase");
const UpdateResourceUseCase = require("../modules/resource/application/updateResource.usecase");
const DeleteResourceUseCase = require("../modules/resource/application/deleteResource.usecase");
const ResourceRepository = require("../modules/resource/infrastructure/resource.repository");
const GetCustomersUseCase = require("../modules/customer/application/getCustomers.usecase");
const UpdateCustomerUseCase = require("../modules/customer/application/updateCustomer.usecase");
const DeleteCustomerUseCase = require("../modules/customer/application/deleteCustomer.usecase");
const DiscountRepository = require("../modules/discount/infrastructure/discount.repository");

const PricingRepository = require("../modules/pricing/infrastructure/pricing.repository");

const CustomerRepository = require("../modules/customer/infrastructure/customer.repository");
const GetSessionsUseCase = require("../modules/session/application/getSessions.usecase");
const GetActiveSessionsUseCase = require("../modules/session/application/getActiveSessions.usecase");
const GetSessionReportUseCase = require("../modules/session/application/getSessionReport.usecase");
const UserRepository = require("../modules/auth/infrastructure/user.repository");
const UpdateDiscountUseCase = require("../modules/discount/application/updateDiscount.usecase");
const DeleteDiscountUseCase = require("../modules/discount/application/deleteDiscount.usecase");
const ResetDiscountUsageUseCase = require("../modules/discount/application/resetDiscountUsage.usecase");
const UpdatePricingRuleUseCase = require("../modules/pricing/application/updatePricingRule.usecase");
const DeletePricingRuleUseCase = require("../modules/pricing/application/deletePricingRule.usecase");
// ==============================
// UseCases - Pricing
// ==============================

const ResolvePricingRuleUseCase = require("../modules/pricing/application/resolvePricingRule.usecase");

// ==============================
// UseCases - Discount
// ==============================
const ListResourcesUseCase = require("../modules/resource/application/listResources.usecase");
const CreatePricingRuleUseCase = require("../modules/pricing/application/createPricingRule.usecase");
const GetPricingRulesUseCase = require("../modules/pricing/application/getPricingRules.usecase");
const RegisterUseCase = require("../modules/auth/application/register.usecase");
const LoginUseCase = require("../modules/auth/application/login.usecase");

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
const getCustomersUseCase = new GetCustomersUseCase({
  customerRepository,
});

const updateCustomerUseCase = new UpdateCustomerUseCase({
  customerRepository,
});

const deleteCustomerUseCase = new DeleteCustomerUseCase({
  customerRepository,
});
const userRepository = new UserRepository();
const updatePricingRuleUseCase = new UpdatePricingRuleUseCase({
  pricingRepository,
});

const deletePricingRuleUseCase = new DeletePricingRuleUseCase({
  pricingRepository,
});
const transactionManager = new TransactionManager();
const listResourcesUseCase = new ListResourcesUseCase({
  resourceRepository,
});
const createPricingRuleUseCase = new CreatePricingRuleUseCase({
  pricingRepository,
});
const registerUseCase = new RegisterUseCase({ userRepository });
const loginUseCase = new LoginUseCase({ userRepository });

const getPricingRulesUseCase = new GetPricingRulesUseCase({
  pricingRepository,
});

const createDiscountUseCase = new CreateDiscountUseCase({ discountRepository });

const getDiscountsUseCase = new GetDiscountsUseCase({ discountRepository });

const resolvePricingRuleUseCase = new ResolvePricingRuleUseCase({
  pricingRepository,
});
const updateDiscountUseCase = new UpdateDiscountUseCase({
  discountRepository,
});

const deleteDiscountUseCase = new DeleteDiscountUseCase({
  discountRepository,
});

const resetDiscountUsageUseCase = new ResetDiscountUsageUseCase({
  discountRepository,
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
const getResourcesUseCase = new GetResourcesUseCase({
  resourceRepository,
});

const updateResourceUseCase = new UpdateResourceUseCase({
  resourceRepository,
});
const getSessionsUseCase = new GetSessionsUseCase({
  sessionRepository,
});

const getActiveSessionsUseCase = new GetActiveSessionsUseCase({
  sessionRepository,
});

const getSessionReportUseCase = new GetSessionReportUseCase({
  sessionRepository,
});
const deleteResourceUseCase = new DeleteResourceUseCase({
  resourceRepository,
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
  customerRepository,
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
  registerUseCase,
  loginUseCase,
  createResourceUseCase,
  updateResourceStatusUseCase,
  getResourceUseCase,
  createPricingRuleUseCase,
  getPricingRulesUseCase,
  createDiscountUseCase,
  getDiscountsUseCase,
  createCustomerUseCase,
  listResourcesUseCase,
  updateCustomerTagsUseCase,
  getCustomerUseCase,
  updatePricingRuleUseCase,
  deletePricingRuleUseCase,
  updateDiscountUseCase,
  deleteDiscountUseCase,
  resetDiscountUsageUseCase,
  getResourcesUseCase,
  updateResourceUseCase,
  deleteResourceUseCase,
  getCustomersUseCase,
  updateCustomerUseCase,
  deleteCustomerUseCase,
  getSessionsUseCase,
  getActiveSessionsUseCase,
  getSessionReportUseCase,
};
