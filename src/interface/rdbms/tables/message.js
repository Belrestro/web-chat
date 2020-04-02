const GenericTable = require('./generic');

const COLUMNS = ['id', 'senderId', 'text', 'chatId', 'attachment', 'timestamp'];

class MessageTable extends GenericTable {
  static get _tableName() {
    return 'messages';
  }
  
  static get _columns() {
    return COLUMNS;
  }

  static selectByUserId(userId) {
    const stmt = this.cursor.prepare(`SELECT ${this._columns} FROM ${this._tableName}
      WHERE userId = ? order by timestamp desc;`);

    return stmt.all(userId);
  }

  static selectByChatId(chatId) {
    const stmt = this.cursor.prepare(`SELECT ${this._columns} FROM ${this._tableName}
      WHERE chatId = ? order by timestamp desc;`);

    return stmt.all(chatId);
  }
}

module.exports = MessageTable;