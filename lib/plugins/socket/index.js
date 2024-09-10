const {Server} = require('socket.io');
const socketManager = require('./socketManger')

exports.plugin ={
    name : 'socket',
    version : '1.0.0',
    register  : async (server , options)=>{
            const io = new Server(server.listener , {
                cors :{
                    origin : '*',
                    method : ['GET' , 'POST']
                }
            })

            server.app.io = io;
            socketManager(io)
    }
}