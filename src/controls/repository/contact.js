const { ContactsTable, UsersTable } = require('../../interface/rdbms/tables');
const { ContactsModel, UserModel  } = require('../../models');
const { ExistenceError } = require('../../lib/errors');

class ContactRepository {
  static async create(contacts) {
    const contactsId = ContactsTable.insert(contacts.serialize(false));
    const contactsRecord = ContactsTable.selectById(contactsId);

    return ContactsModel.from(contactsRecord);
  }

  static async getByUserId(userId) {
    const contactsRecord = ContactsTable.selectByUserId(userId);
 
    return contactsRecord
      ? ContactsModel.from(contactsRecord)
      : null;
  }

  static async getUsersByContact(contact) {
    const { contactIds } = contact;
    const users = UsersTable.selectWhereUserIdsIn(contactIds);

    return users.map(UserModel.from);
  }

  static async findNewByUserId(userId) {
    const contactsRecord = ContactsTable.selectByUserId(userId);
    if (!contactsRecord) throw new ExistenceError();
    const contacts = ContactsModel.from(contactsRecord);
    const newContacts = UsersTable.selectWhereUserIdsNotIn([ ...contacts.contactIds, userId ]);

    return newContacts.map(UserModel.from);
  }

  static async addContact(userId, contactId) {
    const user = UsersTable.selectById(contactId);
    if (!user) throw ExistenceError();
    const contacts = await this.getByUserId(userId);
    const contactIds = new Set([...contacts.contactIds, contactId]);

    contacts.contactIds = [...contactIds]; 
    return ContactsTable.updateById(contacts.id, contacts.serialize(false))
  }

  static async removeContact(userId, contactId) {
    const contacts = await this.getByUserId(userId);
    contacts.contactIds = contacts.contactIds.filter(id => id != contactId);
    ContactsTable.updateById(contacts.id, contacts.serialize(false));

    return true;
  }

}

module.exports = ContactRepository;
