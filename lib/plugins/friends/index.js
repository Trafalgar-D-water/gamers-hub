'use strict'

exports.plugin = {
    name :'friends',
    version : '1.0.0',
    register : (server , options)=>{
        // routes 
        server.route(require('./routes/create_friend_request'))
    }
}