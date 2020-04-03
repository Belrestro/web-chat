const Router = require('../../../../lib/http/router');

const router = new Router('/chats');
const chatManagementHandlers = require('./chat-management');
const massageHandlers = require('./messages');
const attachmentHandlers = require('./attachments');

// Chat management
router
  .get('/', chatManagementHandlers.listChats)
  .post('/', chatManagementHandlers.createChat)
  .post('/:id/invite', chatManagementHandlers.inviteToChat)

// Chat massages
router
  .get('/:id/messages', massageHandlers.listMessages)
  .post('/:id/messages', massageHandlers.createMessage)

// File attachments
router
  .post('/:id/attachment', attachmentHandlers.saveAttachment)
  .get('/:id/attachment/:attachmentId', attachmentHandlers.retrieveAttachment)
  .get('/:id/attachment/:attachmentId/meta', attachmentHandlers.retrieveAttachmentMeta);

module.exports = router.routes();