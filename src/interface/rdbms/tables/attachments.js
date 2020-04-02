const GenericTable = require('./generic');

const COLUMNS = ['id', 'filename', 'mime', 'size'];

class AttachmentsTable extends GenericTable {
  static get _tableName() {
    return 'attachments';
  }
  
  static get _columns() {
    return COLUMNS;
  }
}

module.exports = AttachmentsTable;