const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../../config/env");

class LoginUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return { token };
  }
}

module.exports = LoginUseCase;
