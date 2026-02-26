const Session = require("./session.model");
const { ACTIVE } = require("../../../shared/constants/sessionStatus");

class SessionRepository {
  async create(data, options = {}) {
    return Session.create([data], options).then((r) => r[0]);
  }

  async findById(id, options = {}) {
    return Session.findById(id, null, options);
  }

  async findAll(filter = {}) {
    return Session.find(filter).sort({ startedAt: -1 });
  }

  async findActive() {
    return Session.find({ status: ACTIVE });
  }

  async findByDateRange(from, to) {
    return Session.find({
      startedAt: {
        $gte: from,
        $lte: to,
      },
      status: { $ne: ACTIVE },
    });
  }

  async save(sessionDoc, options = {}) {
    return sessionDoc.save(options);
  }
}

module.exports = SessionRepository;
