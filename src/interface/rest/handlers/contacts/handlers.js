const { ContactRepository, UserRepository } = require('../../../../controls/repository');
const { ExistenceError } = require('../../../../lib/errors');

const CONTENT_TYPE = 'application/json';

const getUserContacts = async (ctx) => {
  const { user } = ctx.state;
  const contacts = await ContactRepository.getByUserId(user.id);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = contacts.contactIds;
}

const findNewContact = async (ctx) => {
  const { user } = ctx.state;
  const userList = await ContactRepository.findNewByUserId(user.id);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = userList.map(user => user.serialize());
};

const findAll = async (ctx) => {
  const { user } = ctx.state;
  const userList = await UserRepository.findWhereIdsNotIn([user.id]);

  ctx.status = 200;
  ctx.type = CONTENT_TYPE;
  ctx.body = userList.map(user => user.serialize());
}

const addNewContact = async (ctx) => {
  const { user } = ctx.state;
  const { contactId } = ctx.params;

  try {
    await ContactRepository.addContact(user.id, Number(contactId));
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
  await ContactRepository.removeContact(user.id, Number(contactId));

  ctx.status = 204;
};

module.exports = {
  findAll,
  addNewContact,
  getUserContacts,
  findNewContact,
  removeUserContact,
};
