const GuildModel = require('../schema/guild')
const CatagoryModel = require('../schema/catagory')
const ChannelModel = require('../schema/channel')
const Boom = require('@hapi/boom')

module.exports = async (request  , h) =>{
    const {server , payload , auth : {credentials} } = request;
    
    try{
        const getProfile = await server.methods.get_proflieId_by_userId(credentials.id);
        console.log('this is the get profile', getProfile[0].userId);
        console.log('this is the credentials', credentials.id);
        if(getProfile[0].userId != credentials.id){
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

       const textCategory = new CatagoryModel({
        name : 'Text Channels',
        GuildId : createdGuild._id,
        position : 1
       })

       const voiceCategory = new CatagoryModel({
        name : 'Voice Channels',
        GuildId : createdGuild._id,
        position : 2
       })
       
       const [saveTextCategory , saveVoiceCategory] = await Promise.all([textCategory.save() , voiceCategory.save()])


       // create defult channal 
       const genralTextChannel = new ChannelModel({
            name : 'general',
            type : 'text',
            categoryId : saveTextCategory._id,
            GuildId : createdGuild._id,
            position  :1 
       })

       const genralVoiceChannel = new ChannelModel({
        name :'General',
        type : 'voice',
        categoryId : saveVoiceCategory._id,
        GuildId : createdGuild._id,
        position : 1
       })

       await Promise.all([genralTextChannel.save() , genralVoiceChannel.save()])

       createdGuild.categoriesIds = [saveTextCategory._id , saveVoiceCategory._id]
       await createdGuild.save()
       const update_guild_in_profile = await server.methods.update_profile_data(createdGuild._id , payload.name ,getProfile[0].userId)
       
       return{
        statusCode : 201 , 
        message : 'Guild created successfully with default categories and channels',
        data : createdGuild,
        guildId : createdGuild._id
       }

    }
    catch(error){
        console.log(error);
        return h.response('something went wrong while creating the guild').code(500)
    }
}