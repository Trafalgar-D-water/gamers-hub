const GuildModel = require('../schema/guild')


module.exports = async (request  , h) =>{
    const {server , payload , auth : {credentials} } = request;
    console.log('this is my gulid payload' , payload);
    try{
        const GuildData = new GuildModel({
            name : payload.name,
            // logo : payload.logo
            owner : {
                userId : credentials.id,
                userName : credentials.username,
            }
        });

       const createdGuild =  await GuildData.save();
       
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