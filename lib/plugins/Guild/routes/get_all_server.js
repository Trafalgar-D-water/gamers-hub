module.exports = {
    method : 'GET',
    path: '/api/guild/get-all-server',
    options : {
        tags : ['api'],
        description : 'get all server for a particular user',
        auth : 'jwt',
    },
    handler: require('../handler/get_all_server')
}