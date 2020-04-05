const { ChatRepository, UserRepository } = require('../../../../controls/repository');
const { ValidityError } = require('../../../../lib/errors');
const { ChatModel } = require('../../../../models');
const {
  sendNotification,
  sendNotificationToMany,
  NOTIFICATION_TYPES
} = require('../../../ws');

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

const updateChat = async (ctx) => {
  const { body } = ctx.request;

  let chat;
  try {
    chat = ChatModel.from(body);
    const existingChat = await ChatRepository.getById(chat.id);
  
    if (!existingChat) ctx.throw(404);
    
    chat.participantIds = existingChat.participantIds;
    await ChatRepository.update(chat.id, chat);
    sendNotificationToMany(chat.participantIds, NOTIFICATION_TYPES.CHAT_UPDATED, chat);
  } catch(err) {
    if (err instanceof ValidityError) {
      ctx.throw(400, err.message);
    }
    ctx.throw(500);
  }
  ctx.status = 204;
  ctx.type = CONTENT_TYPE;
}

const listChats = async (ctx) => {
  const { user } = ctx.state;
  const list = await ChatRepository.findByUserId(user.id);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = list.map(chat => chat.serialize());
};

const inviteToChat = async (ctx) => {
  const { id } = ctx.params;
  const { userId } = ctx.request.body;
  const chat = await ChatRepository.getById(id);
  const distinct = new Set([ userId, ...chat.participantIds]);
  
  chat.participantIds = [...distinct];
  await ChatRepository.update(id, chat);

  sendNotificationToMany(chat.participantIds, NOTIFICATION_TYPES.CHAT_UPDATED, chat);
  sendNotification(userId, NOTIFICATION_TYPES.CHAT_CREATED, chat);

  ctx.status = 201;
}

const removeChat = async (ctx) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  const chat = await ChatRepository.getById(id);

  if (!chat) ctx.throw(404);

  await ChatRepository.deleteById(user.id, id);
  const existingChat = await ChatRepository.getById(id);
  if (existingChat) {
    sendNotificationToMany(existingChat.participantIds, NOTIFICATION_TYPES.CHAT_UPDATED, existingChat);
  } else {
    sendNotificationToMany(chat.participantIds, NOTIFICATION_TYPES.CHAT_DELETED, chat);
  }
  

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
  updateChat,
  listChats,
  inviteToChat,
  removeChat,
  showChat,
};
