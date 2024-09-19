module.exports = {
    method : 'POST',
    path : '/api/create-guild',
    options : {
        tags : ['api'],
        description : 'create a guild',
        auth :'jwt',
    } , 
    handler : require('../handler/create_guild')
}