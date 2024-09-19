module.exports = {
    method : 'POST',
    path: '/api/{GuildId}/create_catagory',
    options : {
        tags : ['api'],
        description : 'create cataogry for a particular server',
        auth : 'jwt',
    },
    handler : require('../handler/create_catagory')
}