'use strict'

exports.plugin ={
    name : 'Guild',
    version : '1.0.0',
    register :(server , options)=>{

        // Guild Routes
        server.route(require('./routes/create_guild'))
     
        //catagory Routes 
        server.route(require('./catagory/routes/create_catagory'))
    }
}