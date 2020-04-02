const TABLE_NAME = `attachments`;

const schema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  filename: 'TEXT UNIQUE',
  mime: 'TEXT',
  size: 'BIGINT',
};

const up = async (client) => {
  await client.exec(`CREATE TABLE ${TABLE_NAME} (
    id ${schema.id},
    filename ${schema.filename},
    mime ${schema.mime},
    size ${schema.size}
  )`);
};

const down = async (client) => {
  await client.exec(`DROP TABLE ${TABLE_NAME}`)
};

module.exports = {
  up,
  down,
};
