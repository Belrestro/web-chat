const apiRouter = require('./api');
const echoRouter = require('./echo');
const {
  requestLogger,
  errorHandler,
  jsonBodyParser,
  useState,
} = require('./middleware');
const Pipeline = require('../../lib/http/pipeline');

const requestHandler = () => {
  const httpPipeline = new Pipeline();
  httpPipeline
    // .use(errorHandler)
    .use(useState)
    .use(requestLogger)
    .use(jsonBodyParser)
    .use(echoRouter)
    .use(apiRouter);
  
  return httpPipeline.callback();
}

module.exports = {
  requestHandler,
};
