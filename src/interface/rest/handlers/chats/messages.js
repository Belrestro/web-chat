const { ChatRepository } = require('../../../../controls/repository');
const { MessageModel } = require('../../../../models');

const CONTENT_TYPE = 'application/json'; 

const listMessages = async (ctx) => {
  console.log('messages');
  const { id } = ctx.params;
  const messages = await ChatRepository.getChatMessages(id);

  ctx.type = CONTENT_TYPE;
  ctx.body = messages.map(m => m.serialize());
};

const createMessage = async (ctx) => {
  const { body } = ctx.request;
  const { user } = ctx.state;
  const { id } = ctx.params;
  const message = MessageModel.from(body);
  const chat = await ChatRepository.getById(id);

  if (!chat) {
    ctx.throw(404);
  }
  if (!chat.participantIds.includes(user.id)) {
    ctx.throw(403);
  }
  
  const createdMessage = await ChatRepository
    .createMessage(user.id, id, message);

  ctx.status = 201;
  ctx.type = CONTENT_TYPE;
  ctx.body = createdMessage.serialize();
};

module.exports = {
  listMessages,
  createMessage,
};
