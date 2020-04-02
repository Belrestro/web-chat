const {
  FileRepository,
  ChatRepository,
} = require('../../../../controls/repository');

const { ExistenceError } = require('../../../../lib/errors');

const saveAttachment = async (ctx) => {
  const { file } = ctx.request;
  const attachment = await FileRepository.create(file);
  const message = {
    messageText,
    attachmentId: attachment.id
  };

  await ChatRepository.createMessage(message);

  ctx.status = 201;
  ctx.body = attachment.id;
};

const retrieveAttachmentMeta = async (ctx) => {
  const { attachmentId } = ctx.params;

  const meta = await FileRepository.getMetaById(attachmentId);

  if (!meta) ctx.throw(404, 'File not found');

  ctx.type = 'application/json';
  ctx.body = meta;
};

const retrieveAttachment = async (ctx) => {
  const { attachmentId } = ctx.params;

  let writeStream;
  let meta;
  try {
    meta = await FileRepository.getMetaById(attachmentId);
    writeStream = await FileRepository.download(meta);
  } catch (err) {
    if (err instanceof ExistenceError) {
      ctx.throw(404, 'Resource does not exists');
    }
    ctx.throw(500, 'Error while obtaining resource');
  }
  const { filename, size } = meta;

  ctx.type = 'application/octet-stream';
  ctx.addHeader('content-disposition', `attachment; filename=${filename}`)
  ctx.body = writeStream;
};


module.exports = {
  saveAttachment,
  retrieveAttachment,
  retrieveAttachmentMeta,
};
