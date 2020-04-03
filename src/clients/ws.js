const URL = require('url');
const { Server } = require('ws');
const AuthController = require('../controls/auth');

const clients = new Map();
const createWebSocketServer = (httpServer) => {
  const server = new Server({ noServer: true });

  httpServer.on('upgrade', async (request, socket, head) => {
    let userId;
    let expires;
    try {
      const { query } = URL.parse(request.url, true);
      ({ userId, expires } = AuthController.verifyToken(query.token));
      
    } catch (err) {
      return socket.end();
    }
    
    if (!userId || !expires) {
      socket.end('HTTP/1.1 403 Forbidden \r\n\r\n Invalid token');
    }
  
    if (expires < Date.now()) {
      socket.end('HTTP/1.1 403 Forbidden \r\n\r\n Token expired');
    }

    socket.on('end', () => {
      clients.delete(userId);
    });

    const webSocket = await new Promise((res) => 
      server.handleUpgrade(request, socket, head, res));
    clients.set(userId, webSocket);
  })

  return server;
}

module.exports = {
  createWebSocketServer,
  clients,
};
