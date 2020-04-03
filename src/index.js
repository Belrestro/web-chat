const { createServer } = require('./clients/http');
const { createWebSocketServer } = require('./clients/ws');
const rdbms = require('./clients/db');

const { requestHandler } = require('./interface/rest/setup');
const { setupDBInterface } = require('./interface/rdbms/setup');

// Connect to db 
setupDBInterface(rdbms.createClient());

// Initiate http server
const server = createServer(process.env.port || 80, requestHandler());
createWebSocketServer(server.httpServer);

server.start();

process.on('exit', () => {
  server.stop();
  rdbms.close();
  process.exit(0);
})