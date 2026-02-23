const Session = require("./session.model");

class SessionRepository {
  async create(data, options = {}) {
    return Session.create([data], options).then((r) => r[0]);
  }

  async findById(id, options = {}) {
    return Session.findOne(
      {
        _id: id,
        isActive: true,
      },
      null,
      options,
    );
  }

  async save(sessionDoc, options = {}) {
    return sessionDoc.save(options);
  }
}

module.exports = SessionRepository;
