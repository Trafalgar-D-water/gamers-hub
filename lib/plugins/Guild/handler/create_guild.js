const GuildModel = require('../schema/guild')
const Boom = require('@hapi/boom')

module.exports = async (request  , h) =>{
    const {server , payload , auth : {credentials} } = request;
    
    try{
        const getProfile = await server.methods.get_proflieId_by_userId(credentials.id);
        
        if(getProfile.userid != credentials.id){
            return Boom.unauthorized('do somthing')
        }
        const GuildData = new GuildModel({
            name : payload.name,
            // logo : payload.logo
            owner : {
                profileUserId: getProfile[0].userId,
                ProfileUserName: getProfile[0].username,
            }
        });
        
       const createdGuild =  await GuildData.save();

       const update_guild_in_profile = await server.methods.update_profile_data(createdGuild._id , payload.name ,getProfile[0].userId)
       
       return{
        statusCode : 201 , 
        message : 'Guild is created',
        data : createdGuild,
        guildId : createdGuild._id
       }

    }
    catch(error){
        console.log(error);
        return h.response('something went wrong while creating the guild').code(500)
    }
}