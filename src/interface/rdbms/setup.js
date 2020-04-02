const bridge = require('../bridge')
const { applyMigrations } = require('./utils')

const setupDBInterface = async (client) => {
  bridge.set('rdbms:client', client)

  await applyMigrations(client)
};

module.exports = {
  setupDBInterface,
};
