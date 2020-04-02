const { ContactRepository } = require('../../../../controls/repository');
const { ExistenceError } = require('../../../../lib/errors');

const CONTENT_TYPE = 'application/json';

const getUserContacts = async (ctx) => {
  const { user } = ctx.state;
  const contacts = await ContactRepository.getByUserId(user.id);
  const users = await ContactRepository.getUsersByContact(contacts);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = users.map(user => user.serialize());
}

const findNewContact = async (ctx) => {
  const { user } = ctx.state;
  const userList = await ContactRepository.findNewByUserId(user.id);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = userList.map(user => user.serialize());
};

const addNewContact = async (ctx) => {
  const { user } = ctx.state;
  const { contactId } = ctx.params;

  try {
    await ContactRepository.addContact(user.id, contactId);
  } catch (err) {
    if (err instanceof ExistenceError) {
      ctx.throw(400, 'User id incorrect');
    }
    ctx.throw(500);
  }

  ctx.status = 204;
}

const removeUserContact = async (ctx) => {
  const { user } = ctx.state;
  const { contactId } = ctx.params;
  await ContactRepository.removeContact(user.id, contactId);

  ctx.status = 204;
};

module.exports = {
  addNewContact,
  getUserContacts,
  findNewContact,
  removeUserContact,
};
