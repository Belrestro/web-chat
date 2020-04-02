const GenericTable = require('./generic');

const COLUMNS = ['id', 'userId', 'contactIds'];

class ContactsTable extends GenericTable {
  static get _tableName() {
    return 'contacts';
  }
  
  static get _columns() {
    return COLUMNS;
  }

  static selectByUserId(userId) {
    const [contacts] = this.selectWhere({ userId });

    return contacts;
  }
}

module.exports = ContactsTable;