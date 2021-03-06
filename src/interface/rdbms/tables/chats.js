const GenericTable = require('./generic');

const COLUMNS = ['id', 'name', 'ownerId', 'participantIds'];

class ChatsTable extends GenericTable {
  static get _tableName() {
    return 'chats';
  }
  
  static get _columns() {
    return COLUMNS;
  }

  static selectByUserId(userId) {
    const stmt = this.cursor.prepare(`SELECT ${this._columns}
        FROM ${this._tableName} WHERE (
          participantIds LIKE '%,${userId}]' OR
          participantIds LIKE '[${userId},%' OR
          participantIds LIKE '%,${userId},%');`);

    return stmt.all();
  }
}

module.exports = ChatsTable;