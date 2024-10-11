const { Server } = require('socket.io');

class SocketService {
    constructor(httpServer) {
        this._io = new Server(httpServer, {
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });

        this.initListeners();
    }

    initListeners() {
        this._io.on('connection', (socket) => {
            console.log(`New Socket Connected (i am comming form server): ${socket.id}`);

            socket.on('joinServer', (guildId) => {
                console.log(`User joining server with guildId: ${guildId}`);
                socket.join(guildId);  // Join the socket room identified by guildId
            });
    
            // Handle user leaving the room
            socket.on('leaveServer', (guildId) => {
                console.log(`User leaving server with guildId: ${guildId}`);
                socket.leave(guildId);  // Leave the socket room
            });
    
            socket.on('disconnect', () => {
                console.log(`Socket Disconnected: ${socket.id}`);
            });
        });

        
    }

    get_io() {
        return this._io;
    }

    // New method to emit events
    emitEvent(eventName, data) {
        this._io.emit(eventName, data);
    }
}

module.exports = SocketService;