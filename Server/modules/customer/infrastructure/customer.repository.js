const Customer = require("./customer.model");

class CustomerRepository {
  async create(data) {
    return Customer.create(data);
  }

  async findAll(filter = {}) {
    return Customer.find(filter).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Customer.findById(id);
  }

  async findByPhone(phone) {
    return Customer.findOne({ phone });
  }

  async search(keyword) {
    return Customer.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
      ],
    });
  }

  async update(id, data) {
    return Customer.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async softDelete(id) {
    return Customer.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}

module.exports = CustomerRepository;
