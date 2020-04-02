const GenericTable = require('.');

const TABLE_NAME = 'migrations';

const COLUMNS = ['id', 'name', 'created_at'];

class MigrationsTable extends GenericTable {
  static get _tableName() {
    return TABLE_NAME
  }

  static get _columns() {
    return COLUMNS;
  }

  static async selectByName (name) {
    const [migration] = await this.selectWhere({ name })

    return migration;
  }

  static async deleteByName (name) {
    return this.deleteWhere({ name });
  }
}

module.exports = MigrationsTable