const { Boom } = require("@hapi/boom");
const GuildModel = require('../schema/guild')
module.exports = async (request , h)=>{
    const {auth : {credentials} , payload , params , server} = request;
    const userId = credentials.id;
    try{
        const ownedGuild = await GuildModel.find({
            'owner.profileUserId': userId
        })

        const joinedGuild = await GuildModel.find({
            members: userId
        })

        const allGuild = [...ownedGuild , ...joinedGuild].sort((a , b)=>{
            a.name.localeCompare(b.name)
        })
        return h.response({
            statusCode : 200,
            message : 'server fetched succe ssfully',
            ownedServer : ownedGuild,
            joinedServer : joinedGuild,
            allServer : allGuild
        })
    }
    catch(e){
        return Boom.badRequest('An error occurred while fetching the server');
    }
}