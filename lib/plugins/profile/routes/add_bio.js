module.exports = {
    method : 'POST',
    path : '/api/profile/add-bio',
    options :{
        tags :['api'],
        description : 'add bio to profile',
        auth : 'jwt',
        // validate : require('../validation/add_bio')
    },

    handler: require('../handler/add_bio'), 

}