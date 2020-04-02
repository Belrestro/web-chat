const Router = require('../../../../lib/http/router');
const authHandlers = require('./auth');
const contactsHandlers = require('./contacts');

const router = new Router('/users');

router
  .post('/register', authHandlers.register)
  .post('/login', authHandlers.login)
  .get('/profile', authHandlers.profile);

router
  .get('/contacts', contactsHandlers.getUserContacts)
  .post('/contacts/search', contactsHandlers.findNewContact)
  .post('/contacts/:contactId', contactsHandlers.addNewContact)
  .delete('/contacts/:contactId', contactsHandlers.removeUserContact);

module.exports = router.routes();