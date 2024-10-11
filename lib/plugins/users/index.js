'use strict'

exports.plugin = {
    name :'user',
    version : '1.0.0',
    register : (server , options)=>{
        // routes 
        server.route(require('./routes/user_signup'))
        server.route(require('./routes/login'))
        server.route(require('./routes/change_password'))
        server.route(require('./routes/verify_email'))
        server.route(require('./routes/update_username'))
        server.route(require('./routes/get_all_user'))

        //server methods
        server.method(require('./mehods/update_friendRequest'))
        server.method(require('./mehods/get_user_by_id'))
    }
}