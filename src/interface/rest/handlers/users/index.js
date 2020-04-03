const Router = require('../../../../lib/http/router');
const authHandlers = require('./auth');

const router = new Router('/users');

router
  .post('/register', authHandlers.register)
  .post('/login', authHandlers.login)
  .get('/profile', authHandlers.profile);

module.exports = router.routes();