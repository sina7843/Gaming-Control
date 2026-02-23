const Resource = require("./resource.model");

class ResourceRepository {
  async create(data, options = {}) {
    return Resource.create([data], options).then((r) => r[0]);
  }

  async findById(id, options = {}) {
    return Resource.findById(id, null, options);
  }

  async updateStatus(id, status, mongoSession) {
    return Resource.updateOne(
      { _id: id },
      { status },
      { session: mongoSession },
    );
  }

  async findAll(filter = {}) {
    return Resource.find(filter);
  }
}

module.exports = ResourceRepository;
