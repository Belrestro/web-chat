const { encrypt, decrypt, createHash } = require('../lib/encrypt');
const { ValidityError } = require('../lib/errors');

class AuthController {
  static generateToken(token) {

    return encrypt(JSON.stringify(token));
  }

  static verifyToken(hash) {
    let token;
    try {
      const json = decrypt(hash);
      token = JSON.parse(json);
    } catch (err) {
      throw new ValidityError();
    }

    return token;
  }

  static generatePasswordHash(password) {
    return createHash(password);
  }

  static verifyPassword(password, sourcePassword) {
    const hash = AuthController.generatePasswordHash(password);

    return hash === sourcePassword;
  }
}

module.exports = AuthController;