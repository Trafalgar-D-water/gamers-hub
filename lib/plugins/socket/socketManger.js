    module.exports = (io) =>{
        io.on('connection' , (socket)=>{
            console.log('A user is connected', socket.id);

            socket.on('sendFriendRequest' , (data)=>{
                const {requesterId , recipientId} = data ;
                io.to(recipientId).emit('friendRequestRecived' , {
                    requesterId,
                    message :'you have a new friend request',
                })
            })

            socket.on('disconnect' , ()=>{
                console.log('user disconnected' , socket.id)
            })
        })  
    }