const apiRouter = require('./api');
const uiRouter = require('./ui');
const {
  requestLogger,
  errorHandler,
  jsonBodyParser,
  useState,
  options,
} = require('./middleware');
const Pipeline = require('../../lib/http/pipeline');

const requestHandler = () => {
  const httpPipeline = new Pipeline();
  httpPipeline
    .use(errorHandler)
    .use(options)
    .use(useState)
    .use(requestLogger)
    .use(jsonBodyParser)
    .use(apiRouter)
    .use(uiRouter);
  
  return httpPipeline.callback();
}

module.exports = {
  requestHandler,
};
