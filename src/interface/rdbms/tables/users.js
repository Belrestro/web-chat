const GenericTable = require('./generic');

const COLUMNS = ['id', 'login', 'password'];

class UsersTable extends GenericTable {
  static get _tableName() {
    return 'users';
  }
  
  static get _columns() {
    return COLUMNS;
  }

  static selectByLogin(login) {
    const [user] = this.selectWhere({ login });

    return user;
  }

  static selectWhereUserIdsNotIn(userIds) {
    if (userIds.length === 0) return this.selectAll();
    const stmt = this.cursor.prepare(`SELECT ${this._columns} FROM ${this._tableName}
      WHERE id NOT IN (${userIds}) order by login asc;`);

    return stmt.all();
  }

  static selectWhereUserIdsIn(userIds) {
    if (userIds.length === 0) return [];
    const stmt = this.cursor.prepare(`SELECT ${this._columns} FROM ${this._tableName}
      WHERE id IN (${userIds}) order by login asc;`);

    return stmt.all();
  }
}

module.exports = UsersTable;