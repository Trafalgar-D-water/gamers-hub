module.exports = {
    method : 'GET',
    path : '/api/guilds/{guildId}',
    options : {
        tags : ['api'],
        description : 'get guild details',
        auth : 'jwt'
    },
    handler : require('../handler/get_guild_details')
}
