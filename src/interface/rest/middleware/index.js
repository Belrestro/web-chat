const commonMiddleware = require('./common');
const jsonBodyParser = require('./json-body-parser');
const userAuth = require('./user-auth');
const userInfo = require('./user-info');
const options = require('./options');

module.exports = {
  ...commonMiddleware,
  jsonBodyParser,
  userAuth,
  userInfo,
  options,
};
