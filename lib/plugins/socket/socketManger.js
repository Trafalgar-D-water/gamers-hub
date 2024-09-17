const JWT_SECRET = require('../auth/utils/config');
const jwt = require('jsonwebtoken')

module.exports = (io) =>{
    io.use((socket, next) => {
        const token = socket.handshake.auth.token; // Retrieve the token from socket auth
    
        if (!token) {
          return next(new Error('Authentication error'));
        }
    
        jwt.verify(token, JWT_SECRET, (err, decoded) => { // Replace 'your_jwt_secret' with your actual secret
          if (err) {
            return next(new Error('Authentication error'));
          }
    
          // You can use the decoded token to get user information
          socket.userId = decoded.id; // Set the user ID from the decoded token
          next();
        });
      });
      io.on('connection', (socket) => {
        console.log('A user is connected', socket.id);
    
        // Join room for the authenticated user
        if (socket.userId) {
          socket.join(socket.userId);
    
          // Handle friend request event
          socket.on('sendFriendRequest', (data) => {
            const { recipientId } = data;
            io.to(recipientId).emit('friendRequestReceived', {
              requesterId: socket.userId, // Use the userId from the socket
              message: 'You have a new friend request',
            });
          });
        }
    
        socket.on('disconnect', () => {
          console.log('User disconnected', socket.id);
        });
      });
}