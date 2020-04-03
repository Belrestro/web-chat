const Router = require('../../lib/http/router');
const {
  userHandlers,
  chatHandlers,
  contactHandlers,
} = require('./handlers');

const {
  userAuth,
  userInfo,
} = require('./middleware');

const apiRouter = new Router('/api');

apiRouter
  .use(userAuth)
  .use(userInfo);

apiRouter
  .use(userHandlers)
  .use(contactHandlers)
  .use(chatHandlers);

module.exports = apiRouter.routes();
