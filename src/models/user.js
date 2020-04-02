class UserModel {
  constructor({ id, login, password }) {
    Object.assign(this, { id, login, password });
  }

  static from(obj) {
    return new UserModel(obj);
  }

  serialize(omitSensitive = true) {
    const { id, login, password } = this;
    const data = { id, login };

    if (!omitSensitive) {
      Object.assign(data, { password });
    }

    return data;
  }
}

module.exports = UserModel;
