const GuildModel = require('../schema/guild')
const Boom = require('@hapi/boom')

module.exports = async (request, h)=>{
    try{
        const guilds = await GuildModel.find({} , {
            name :1 ,
            logo :1 ,
            members : {$size : "$members"}
        }).lean();

        return {
            statusCode : 200,
            message : 'Guilds fetched successfully',
            data :guilds
        }
    }
    catch(err){
        console.log(err)
        return Boom.badImplementation('Failed to fetch guilds')
    }
}