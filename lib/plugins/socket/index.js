const SocketService = require('./socketManger');

const plugin = {
  name: 'socket',
  version: '1.0.0',
  register: async (server, options) => {
    const io = new SocketService(server.listener);

    // Make io available throughout the application
    server.decorate('server', 'io', io.get_io());

    // Handle connection event
    io.get_io().on('connection', (socket) => {
      console.log(`New socket connected: ${socket.id}`);

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    console.log('Socket.io plugin registered');
  }
}