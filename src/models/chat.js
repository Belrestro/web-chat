class ChatModel {
  constructor({ id, name, ownerId, participantIds }) {
    if (!Array.isArray(participantIds)) {
      participantIds = participantIds ? JSON.parse(participantIds) : [];
    }

    Object.assign(this, { id, name, ownerId, participantIds });
  }

  static from(obj) {
    // todo: validation required
    return new ChatModel(obj);
  }

  serialize(json = true) {
    const { id, name, ownerId } = this;
    let { participantIds } = this;

    if (!json && Array.isArray(participantIds)) {
      participantIds = JSON.stringify(participantIds);
    }

    return { id, name, ownerId, participantIds };
  }
}

module.exports = ChatModel;
