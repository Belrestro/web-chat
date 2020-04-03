const http = require('http');

const createServer = (port, requestHandler) => {
  const httpServer = http.createServer(requestHandler);
  httpServer.on('listening', () => {
    console.log(`Http server started on port ${port}`);
  });

  return {
    httpServer,
    start: () => httpServer.listen(port),
    stop: () => httpServer.close(),
  }
}

module.exports = {
  createServer
};
