module.exports = {
    method : 'POST',
    path : '/api/Guild/{GuildId}/catagory/{catId}/channel',
    options : {
        tags : ['api'],
        description : 'create channel for a prticular server and catagory',
        auth : 'jwt',
    },
    handler  : require('../handler/create_channel'),
}