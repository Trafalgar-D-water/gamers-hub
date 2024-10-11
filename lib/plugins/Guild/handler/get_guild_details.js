const { Boom } = require("@hapi/boom")
const GuildModel = require('../schema/guild')
module.exports = async (request  , h)=>{
    const {auth : {credentials} , params , server , payload} = request;
    try{
        const { guildId } = params;
        const guild = await GuildModel.findById(guildId)
        if(!guild){
            return Boom.notFound('guild not found')
        }
        return h.response({
            statusCode : 200,
            message : 'guild details fetched successfully',
            guild : guild
        })
    }
    catch(error){
        console.log(error)
        return Boom.badRequest('error in getting guild details')
    }
}