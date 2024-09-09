module.exports = {
    method : 'PATCH',
    path: '/api/profile/update-profile',
    options :{
        tags :['api'],
        description :'update username',
        auth :'jwt',
        // validate : '',
    },
    handler :require('../handler/update_username'),
}