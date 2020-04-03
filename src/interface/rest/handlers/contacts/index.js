const Router = require('../../../../lib/http/router');
const contactsHandlers = require('./handlers');

const router = new Router('/contacts');

router
  .get('/', contactsHandlers.getUserContacts)
  .get('/all', contactsHandlers.findAll)
  .post('/:contactId', contactsHandlers.addNewContact)
  .delete('/:contactId', contactsHandlers.removeUserContact);

module.exports = router.routes();