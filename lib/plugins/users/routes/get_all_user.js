module.exports = {
    method : 'GET',
    path : '/api/user',
    options :{
        tags : ['api'],
        description: "list of all users",
        auth : 'jwt',
    },

    handler : require('../handler/get_all_user'),
}