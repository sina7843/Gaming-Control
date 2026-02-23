const User = require("./user.model");

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findByUsername(username) {
    return User.findOne({ username });
  }

  async findById(id) {
    return User.findById(id);
  }
}

module.exports = UserRepository;
