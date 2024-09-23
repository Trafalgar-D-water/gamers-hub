const {Server} = require('socket.io')

class SocketService {
     _io;

    constructor(httpServer){
        this._io = new Server( httpServer ,{
            cors :{
                allowedHeaders : ["*"],
                origin : "*",
            }
        })

         this.initListeners();
    }


    initListeners(){
        this._io.on('connection' , (socket)=>{
            console.log(`New Socket Connected: ${socket.id}`)

            // socket.on("event:message", async ({ message }) => {
            //     console.log("New message received from client:", message);
            //     // Here you would handle the message and potentially interact with Redis or Kafka
            //     // await pub.publish("MESSAGES", JSON.stringify({ message }));
            //     // This is just a placeholder
            //   });
        })
    }

    get_io(){
        return  this._io;
    }
}

export default SocketService;