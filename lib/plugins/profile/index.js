'use strict'

exports.plugin ={
    name : 'profiles',
    version : '1.0.0',
    register :(server , options)=>{

        // server routes
        server.route(require('./routes/get_profile')) 
        server.route(require('./routes/add_bio'))
        server.route(require('./routes/add_game_preference'))
        //server methods
        server.method(require('./method/add_username'))
        server.method(require('./method/update_username'))
        server.method(require('./method/get_profileId_by_userId'))
        server.method(require('./method/update_profile_data'))
        server.method(require('./method/get_member_brief'))
    }
}