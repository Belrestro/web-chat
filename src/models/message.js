class MessageModel {
  constructor({ id, senderId, text, chatId, attachment, timestamp }) {
    Object.assign(this, { id, senderId, text, chatId, attachment, timestamp });
  }

  static from(obj) {
    // todo: validation required
    return new MessageModel(obj);
  }

  serialize() {
    const { id, senderId, text, chatId, attachment, timestamp } = this;

    return { id, senderId, text, chatId, attachment, timestamp };
  }
}

module.exports = MessageModel;
