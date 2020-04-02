const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const { AttachmentsTable } = require('../../interface/rdbms/tables');
const { AttachmentModel } = require('../../models');
const { ExistenceError } = require('../../lib/errors');

const mediaDirectory = path.resolve(process.cwd(), 'media');

const writeFileAsync = promisify(fs.writeFile);
const existsAsync = promisify(fs.exists);

const createMediaDir = async () => {
  if (!fs.existsSync(mediaDirectory)) {
    fs.mkdirSync(mediaDirectory);
  }
};

// on application start
createMediaDir();

const filePrefix = () => `${Date.now()}__`;

class FileRepository {
  static async create(stream) {
    const filename = `${(filePrefix())}__${name}`;
    const filePath = `${mediaDirectory}/${filename}`
    await writeFileAsync(filePath, stream);

    return filename;
  }

  static async download(meta) {
    const { filename } = meta;
    const filePath = path.resolve(mediaDirectory, filename);
    if (!await existsAsync(filePath)) {
      throw new ExistenceError();
    }
    return fs.createWriteStream(filePath);
  }

  static async getMetaById(id) {
    const meta = AttachmentsTable.selectById(id);
    if (!meta) throw new ExistenceError();

    return AttachmentModel.from(meta);
  }
}

module.exports = FileRepository;
