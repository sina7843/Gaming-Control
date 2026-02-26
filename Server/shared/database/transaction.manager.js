class TransactionManager {
  async runInTransaction(callback) {
    // بدون transaction اجرا کن
    return await callback(null);
  }
}

module.exports = TransactionManager;
