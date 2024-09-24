const ChannelSchema = require('../../schema/channel')
const Boom  = require("@hapi/boom");

module.exports = async (request , h) =>{
    const {server  , payload , params , auth : {credentials}} = request;
    const guildId = params.GuildId;
    const catId = params.catId

    console.log('this is my guild id' , guildId);
    console.log('this is my cat ID ' , catId)
    

    try{

        const lastPosition  = await ChannelSchema.findOne({GuildId : guildId}).sort({position : -1}) ;
        const newPosition = lastPosition ? lastPosition.position +1 : 1;
        console.log('this is my new position' , newPosition);
        
        const createChannal = new ChannelSchema({
            name : payload.name,
            type : payload.type,
            categoryId : catId,
            GuildId : guildId,
            position :newPosition,
        })

        if(!createChannal){
            return " no bro"
        }
        console.log('this is my createSchema' , createChannal);
        
        const added_channal = await createChannal.save();

        return {
            statusCode : 201,
            message : 'channel is created',
            data : added_channal
        }
    }
    catch(error){
        console.log('something went wrong in my side ' , error);
        return Boom.badRequest('wrong wrong ')
    }
}