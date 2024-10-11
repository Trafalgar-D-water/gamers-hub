module.exports = {
    method : 'GET',
    path :'/api/users/me',
    options :{
        tags : ['api'],
        description : 'get me user',
        auth : 'jwt'
    },
    handler : require('../handler/get_me_user')
}