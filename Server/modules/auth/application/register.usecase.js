const bcrypt = require("bcrypt");

class RegisterUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ username, password, role }) {
    const existing = await this.userRepository.findByUsername(username);

    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      username,
      password: hashed,
      role,
    });
  }
}

module.exports = RegisterUseCase;
