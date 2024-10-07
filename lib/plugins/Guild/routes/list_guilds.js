module.exports = {
    method : 'GET',
    path :'/api/guilds',
    options :{
        tags :['api'],
        description : 'List all guilds',
        // validate : {
        //     query : Joi.object({
        //         page : Joi.number().integer().min(1).default(1),
        //         limit : Joi.number().integer().min(1).max(100).default(10),
        //     }),
        // },
        auth : 'jwt',
    },
    handler : require('../handler/list_guild'),
    
}