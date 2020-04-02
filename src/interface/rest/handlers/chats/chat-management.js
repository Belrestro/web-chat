const { ChatRepository } = require('../../../../controls/repository');
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

module.exports = {
  createChat,
  listChats,
};
