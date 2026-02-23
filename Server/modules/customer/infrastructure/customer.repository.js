const Customer = require("./customer.model");

class CustomerRepository {
  async create(data, options = {}) {
    return Customer.create([data], options).then((r) => r[0]);
  }

  async findById(id, options = {}) {
    return Customer.findOne(
      {
        _id: id,
        isActive: true,
      },
      null,
      options,
    );
  }

  async findByPhone(phone) {
    return Customer.findOne({ phone });
  }

  async updateTags(id, tags) {
    return Customer.updateOne({ _id: id }, { tags });
  }

  async findAll(filter = {}) {
    return Customer.find(filter);
  }
}

module.exports = CustomerRepository;
