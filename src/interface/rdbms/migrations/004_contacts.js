const TABLE_NAME = `contacts`;

const schema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  userId: 'INTEGER UNIQUE',
  contactIds: 'TEXT',
};

const up = async (client) => {
  await client.exec(`CREATE TABLE ${TABLE_NAME} (
    id ${schema.id},
    userId ${schema.userId},
    contactIds ${schema.contactIds}
  )`);
};

const down = async (client) => {
  await client.exec(`DROP TABLE ${TABLE_NAME}`)
};

module.exports = {
  up,
  down,
};
