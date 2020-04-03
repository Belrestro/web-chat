const { ChatRepository, UserRepository } = require('../../../../controls/repository');
const { ValidityError } = require('../../../../lib/errors');
const { ChatModel } = require('../../../../models');
const { sendNotificationToMany, NOTIFICATION_TYPES } = require('../../../ws');

const CONTENT_TYPE = 'application/json';

const createChat = async (ctx) => {
  const { body } = ctx.request;
  const { user } = ctx.state;

  let chat;
  try {
    const chatModel = ChatModel.from({ ...body, ownerId: user.id });

    chat = await ChatRepository.create(user.id, chatModel);

    sendNotificationToMany(chat.participantIds, NOTIFICATION_TYPES.CHAT_CREATED, chat);
  } catch(err) {
    if (err instanceof ValidityError) {
      ctx.throw(400, err.message);
    }
    ctx.throw(500);
  }
  ctx.status = 201;
  ctx.type = CONTENT_TYPE;
  ctx.body = chat.serialize();
};

const listChats = async (ctx) => {
  const { user } = ctx.state;
  const list = await ChatRepository.findByUserId(user.id);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = list.map(chat => chat.serialize());
};

const inviteToChat = async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const chat = await ChatRepository.getById(id);
  const distinct = new Set([ body.userId, ...chat.participantIds]);
  
  chat.participantIds = [...distinct];
  await ChatRepository.update(id, chat);

  ctx.status = 201;
}

const removeChat = async (ctx) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  await ChatRepository.deleteById(user.id, id);

  ctx.status = 204;
};

const showChat = async (ctx) => {
  const { id } = ctx.params;

  const chat = await ChatRepository.getById(id);

  ctx.type = CONTENT_TYPE;
  ctx.body = chat.serialize();
  ctx.status = 200;
};


module.exports = {
  createChat,
  listChats,
  inviteToChat,
  removeChat,
  showChat,
};
