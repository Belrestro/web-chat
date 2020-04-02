class ContactModel {
  constructor({ id, userId, contactIds }) {
    if (!Array.isArray(contactIds)) {
      contactIds = contactIds ? JSON.parse(contactIds) : [];
    }
    Object.assign(this, { id, userId, contactIds });
  }

  static from(obj) {
    // todo: validation required
    return new ContactModel(obj);
  }

  serialize(json = true) {
    const { id, userId } = this;
    let { contactIds } = this;

    if (!json && Array.isArray(contactIds)) {
      contactIds = JSON.stringify(contactIds);
    }

    return { id, userId, contactIds };
  }
}

module.exports = ContactModel;
