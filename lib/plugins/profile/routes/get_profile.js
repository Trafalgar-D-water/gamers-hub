
module.exports ={
    method : "GET",
    path :'/api/profile/@me',
    options :{
        tags : ['api'],
        description : 'get my profile',
        auth : 'jwt',
    },
    handler : require('../handler/get_profile'),
}