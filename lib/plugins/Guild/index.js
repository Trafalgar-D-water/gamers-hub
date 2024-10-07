'use strict'

exports.plugin ={
    name : 'Guild',
    version : '1.0.0',
    register :(server , options)=>{

        // Guild Routes
        server.route(require('./routes/create_guild'))
        server.route(require('./routes/get_all_server'))
        server.route(require('./routes/list_guilds'))
     
        //catagory Routes 
        server.route(require('./catagory/routes/create_catagory'))


        //channel Routes
        server.route(require('./channel/routes/create_channel'))
    }
}