module.exports = {
    method : 'PATCH',
    path : '/api/profile/game-preference',
    options :{
        tags :['api'],
        description : 'adding multiple games',
        auth : 'jwt',
        // validate : ''
    },
    handler : require('../handler/add_game_peference'),
}