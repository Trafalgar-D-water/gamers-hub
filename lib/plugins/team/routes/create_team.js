'use strict'
module.exports = {
    method : 'POST',
    path : '/api/team/create',
    options :{
        tags :["api"],
        description : "create a Team",
        auth : 'jwt',
        validate : require('../validation/create_team'),
    },
    handler :require('../handler/create_team'),
}


