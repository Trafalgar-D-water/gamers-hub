module.exports = {
    method : 'PATCH',
    path :'/api/guilds/{guildId}/join',
    options : {
        tags : ['api'],
        description : 'Join a guild',
        auth : 'jwt',
    },
    handler : require('../handler/join_guild'),
}