const { createServer } = require('../../clients/http');
const apiRouter = require('./rest');
const echoRouter = require('./echo');
const {
  requestLogger,
  errorHandler,
  jsonBodyParser,
  useState,
} = require('./rest/middleware') 

const httpServer = createServer(3202);

httpServer
  .use(errorHandler)
  .use(useState)
  .use(requestLogger)
  .use(jsonBodyParser)
  .use(echoRouter)
  .use(apiRouter);

httpServer.start();
