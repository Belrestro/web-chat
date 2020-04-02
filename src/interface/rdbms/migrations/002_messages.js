const TABLE_NAME = `messages`;
 
const schema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  senderId: 'INTEGER',
  text: 'TEXT',
  chatId: 'INTEGER',
  attachment: 'TEXT',
  timestamp: "DATETIME DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW'))"
};

const up = async (client) => {
  await client.exec(`CREATE TABLE ${TABLE_NAME} (
    id ${schema.id},
    senderId ${schema.senderId},
    text ${schema.text},
    chatId ${schema.chatId},
    attachment ${schema.attachment},
    timestamp ${schema.timestamp}
  );`);
  await client.exec(`CREATE UNIQUE INDEX
    idx_${TABLE_NAME}_timestamp 
    ON ${TABLE_NAME} (timestamp);`);
};

const down = async (client) => {
  await client.exec(`DROP TABLE ${TABLE_NAME}`);
  await client.exeexeccute(`DROP INDEX idx_${TABLE_NAME}_timestamp`);
};

module.exports = {
  up,
  down,
};
