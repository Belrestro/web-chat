const { ChatRepository, UserRepository } = require('../../../../controls/repository');
const { ValidityError } = require('../../../../lib/errors');
const { ChatModel } = require('../../../../models');

const CONTENT_TYPE = 'application/json';

const createChat = async (ctx) => {
  const { body } = ctx.request;
  const { user } = ctx.state;

  let chat;
  try {
    const chatModel = ChatModel.from({ ...body, ownerId: user.id });

    chat = await ChatRepository.create(user.id, chatModel);
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
  const { id } = ctx.state;
  const { body } = ctx.request;
  const { participantIds } = ChatModel.from(body);
  const chat = await ChatRepository.getById(id);
  const distinct = new Set([...participantIds, ...chat.participantIds]);
  
  chat.participantIds = [...distinct];
  await ChatRepository.update(id, chat);

  ctx.status = 201;
}

const listUsersToInvite = async (ctx) => {
  const { id } = ctx.state;
  const chat = await ChatRepository.getById(id);
  const users = await UserRepository.findWhereIdsNotIn(chat.participantIds);

  ctx.type = CONTENT_TYPE;
  ctx.body = user.map(user => user.serialize());
}

module.exports = {
  createChat,
  listChats,
  inviteToChat,
  listUsersToInvite,
};
