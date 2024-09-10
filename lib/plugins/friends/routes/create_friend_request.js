    module.exports = {
        method : 'POST',
        path : '/api/friend/request',
        options :{
            tags :['api'],
            description  : 'create friend request',
            auth : 'jwt'
        },
        handler : require('../handler/create_friend_request'),
    }