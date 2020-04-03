const Router = require('../../lib/http/router');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const publicDir = path.resolve(process.cwd(), 'public');
const readAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);

const CONTENT_TYPE = 'text/html';

const serveFiles = async (ctx, next) => {
  const filePath = path.resolve(publicDir, ctx.request.path.slice(1));
  if (!(await existsAsync(filePath))) {
    return next();
  }
  ctx.status = 200;
  ctx.type = 'application/octet-stream';
  ctx.body = fs.createReadStream(filePath);
}

const uiRouter = new Router('/');

uiRouter
  .get('/', async (ctx) => {
    const filePath = path.resolve(publicDir, 'index.html');
    const body = await readAsync(filePath);

    ctx.type = CONTENT_TYPE;
    ctx.body = body;
  })
  .use(serveFiles)

module.exports = uiRouter.routes();