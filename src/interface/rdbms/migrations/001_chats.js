const TABLE_NAME = `chats`;

const schema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT NOT NULL',
  ownerId: 'INTEGER',
  participantIds: 'TEXT'
};

const up = async (client) => {
  await client.exec(`CREATE TABLE ${TABLE_NAME} (
    id ${schema.id},
    name ${schema.name},
    ownerId ${schema.ownerId},
    participantIds ${schema.participantIds}
  )`);
};

const down = async (client) => {
  await client.exec(`DROP TABLE ${TABLE_NAME}`);
};

module.exports = {
  up,
  down,
};
