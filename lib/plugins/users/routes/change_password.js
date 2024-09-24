'use strict';

module.exports = {
    method : 'POST',
    path :'/api/user/change-password',
    options :{
        tags :['api'],
        description : 'changing of the password',
        auth :'jwt',
        // plugins: {
        //     'hapi-authorization': {
        //         roles: ['user'] // Add roles that are allowed to access this route
        //     }
        // },
        validate : require('../validation/change_password'),
    },
    handler : require('../handler/change_password'),
}