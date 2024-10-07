const { Boom } = require("@hapi/boom");
const GuildModel = require('../schema/guild')
module.exports = async (request , h)=>{
    const {auth : {credentials} , payload , params , server} = request;
    const userId = credentials.id;
    console.log('userId' , userId)
    try{
        const ownedGuild = await GuildModel.find({
            'owner.profileUserId': userId
        })

        const joinedGuild = await GuildModel.find({
            members: userId
        })
        console.log('ownedGuild' , ownedGuild)
        console.log('joinedGuild' , joinedGuild)

        const allGuild = [...ownedGuild , ...joinedGuild].sort((a , b)=>{
            a.name.localeCompare(b.name)
        })
        console.log('allGuild' , allGuild)
        return h.response({
            statusCode : 200,
            message : 'server fetched succe ssfully',
            ownedServer : ownedGuild,
            joinedServer : joinedGuild,
            allServer : allGuild

        })
    }
    catch(e){
        console.log('this is my error' , e)
        return Boom.badRequest('An error occurred while fetching the server');
    }
}