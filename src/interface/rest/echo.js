const Router = require('../../lib/http/router');

const CONTENT_TYPE = 'application/json';

const echoRouter = new Router('/echo');

echoRouter
  .all('/body', async (ctx) => {
    const { body } = ctx.request;
    console.log(body);

    ctx.type = CONTENT_TYPE;
    ctx.body = body;
  })
  .all('/headers', async (ctx) => {
    const { headers } = ctx.request;
    console.log(headers);
    ctx.type = CONTENT_TYPE;
    ctx.body = headers;
  })

module.exports = echoRouter.routes();