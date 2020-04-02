const bridge = require('../../../bridge');
const { ValidityError } = require('../../../../lib/errors');

const DRIVER_NAME = 'rdbms:client';

class GenericTableInterface {
  static get cursor() {
    return bridge.get(DRIVER_NAME);
  }

  static get _tableName() {
    throw new Error('Must override _tableName property');
  }
  static get _columns() {
    throw new Error('Must override columns property');
  }

  static selectAll () {
    const rows = this.cursor.prepare(`SELECT ${this._columns} from ${this._tableName};`).all();
    return rows;
  }

  static selectById (id) {
    const [record] = this.cursor
      .prepare(`SELECT ${this._columns} from ${this._tableName} WHERE id = ${id};`).all();
    return record;
  }

  static selectWhere (attributes = {}) {
    const tableFields = this._columns;
    const properties = Object.keys(attributes)
      .filter(prop => this._columns.includes(prop));
    
    if (properties.length === 0) return this.selectAll();
    const query = `SELECT ${tableFields} FROM ${this._tableName} WHERE
      ${properties.map(key => `${key} = ?`).join(' AND ')}`;

    const values = properties.map(prop => attributes[prop]);
    
    const stmt = this.cursor.prepare(query);
    const rows = stmt.all(values);
    
    return rows;
  }

  static insert(record) {
    const columnNames = this._columns
      .filter((col) => {
        return col !== 'id' && record[col];
      });
    const values = columnNames
      .map((col) => record[col]);
    if (values.length === 0) throw new ValidityError();
    const stmt = this.cursor.prepare(`INSERT INTO ${this._tableName} (${columnNames}) VALUES (${columnNames.map(_ => '?')});`);
    
    const id = stmt.run(values).lastInsertRowid;

    return id;
  }

  static updateById (id, data) {
    const updatedColumns = this._columns
      .filter(col => col !== 'id' && data[col]);
    const values = updatedColumns
      .map((col) => data[col]);
    const stmt = this.cursor.prepare(`UPDATE ${this._tableName}
      SET ${updatedColumns.map(col => `${col} = ?`)}
      WHERE id = ${id};`);
    
    return !!stmt.run(values).changes;
  }

  static deleteById (id) {
    const stmt = this.cursor.prepare(`DELETE FROM ${this._tableName} WHERE id = ?;`);

    return !!stmt.run(id).changes;
  }

  static deleteWhere (attributes) {
    const records = this.selectWhere(attributes)

    if (records.length === 0) return []
    const query = `DELETE FROM ${this._tableName}
      WHERE id in (${records.map(() => '?')})`
    const ids = records.map(({ id }) => id.toString())
    const stmt = this.cursor.prepare(query);
    stmt.run(ids);
    return ids
  }
}

module.exports = GenericTableInterface