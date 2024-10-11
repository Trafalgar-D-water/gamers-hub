module.exports = {
    method : 'GET',
    path : '/api/members/guild/{guildId}',
    options  : {
        tags : ['api'],
        description : 'get all member of guild',
        auth : 'jwt',
    },
    handler :require('../handler/get_members_by_guild'),
}