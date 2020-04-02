const http = require('http');

const createServer = (port, requestHandler) => {
  const httpServer = http.createServer(requestHandler);

  return {
    httpServer,
    start: () => httpServer.listen(port),
    stop: () => httpServer.close(),
  }
}

module.exports = {
  createServer
};
