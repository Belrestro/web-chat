const TABLE_NAME = `users`;

const schema = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  login: 'VARCHAR(255) NOT NULL UNIQUE ',
  password: 'TEXT',
};

const up = async (client) => {
  await client.exec(`CREATE TABLE ${TABLE_NAME} (
    id ${schema.id},
    login ${schema.login},
    password ${schema.password}
  )`);
  await client.exec(`CREATE UNIQUE INDEX
    idx_${TABLE_NAME}_login 
    ON ${TABLE_NAME} (login);`);
};

const down = async (client) => {
  await client.exec(`DROP TABLE ${TABLE_NAME}`);
  await client.exeexeccute(`DROP INDEX idx_${TABLE_NAME}_login`);
};

module.exports = {
  up,
  down,
};
