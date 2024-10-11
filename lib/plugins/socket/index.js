const SocketService = require('./socketManger');

const socketPlugin = {
  name: 'socket',
  version: '1.0.0',
  register: async (server, options) => {
    const socketService = new SocketService(server.listener);

    // Make socketService available throughout the application
    server.decorate('server', 'socketService', socketService);

    console.log('Socket.io plugin registered');
  }
};

module.exports = socketPlugin;