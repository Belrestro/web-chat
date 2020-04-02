const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(process.cwd(), 'sqlite3.db');

const createClient = () => {
  const client = new Database(dbPath);

  return client;
};

module.exports = {
  createClient,
};
