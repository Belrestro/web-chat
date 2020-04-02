const connect = require('./setup');
const tables = require('./tables');

module.exports = {
  ...tables,
  connect,
}