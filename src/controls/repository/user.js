const { UsersTable } = require('../../interface/rdbms/tables');
const { UserModel } = require('../../models');
const { ExistenceError } = require('../../lib/errors');

class UserRepository {
  static async create(user) {
    const existingUser = await UsersTable.selectByLogin(user.login);
    if (existingUser) throw new ExistenceError();
    const userId = UsersTable.insert(user.serialize(false));

    const createdUser = UsersTable.selectById(userId);

    return UserModel.from(createdUser);
  }

  static async getById(id) {
    const userRecord = UsersTable.selectById(id);

    return UserModel.from(userRecord);
  }

  static async findByLogin(login) {
    const userRecord = UsersTable.selectByLogin(login);

    return userRecord ? UserModel.from(userRecord) : null;
  }

  static async findWhereIdsNotIn(userIds) {
    const users = UsersTable.selectWhereUserIdsNotIn(userIds);

    return users.map(UserModel.from);
  }
}

module.exports = UserRepository;
