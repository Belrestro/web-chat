class AttachmentModel {
  constructor({ id, filename, mime, size }) {
    Object.assign(this, { id, filename, mime, size });
  }

  static from(obj) {
    // todo: validation required
    return new AttachmentModel(obj);
  }

  serialize() {
    const { id, filename, mime, size } = this;

    return { id, filename, mime, size };
  }
}


module.exports = AttachmentModel;