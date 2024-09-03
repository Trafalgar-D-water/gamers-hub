'use strict'

exports.plugin = {
    name :'user',
    version : '1.0.0',
    register : (server , options)=>{
        // routes 
        server.route(require('./routes/user_signup'))
        server.route(require('./routes/change_password'))
        server.route(require('./routes/verify_email'))
    }
}