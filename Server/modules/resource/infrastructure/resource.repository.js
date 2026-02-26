const Resource = require("./resource.model");

class ResourceRepository {
  async create(data) {
    return Resource.create(data);
  }

  async findAll(filter = {}) {
    return Resource.find(filter);
  }

  async findById(id, options = {}) {
    return Resource.findById(id, null, options);
  }

  async update(id, data) {
    return Resource.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async updateStatus(id, status, mongoSession) {
    return Resource.findByIdAndUpdate(
      id,
      { status },
      { new: true, session: mongoSession },
    );
  }

  async softDelete(id) {
    return Resource.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}

module.exports = ResourceRepository;
