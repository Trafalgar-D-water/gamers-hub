const CatagoryScehma = require('../../schema/catagory');
const GuildSchema = require('../../schema/guild')


module.exports = async (request , h) =>{
    const {server , payload , params , auth : {credentials}} = request;
    try{
        const {GuildId} = params;
        const lastCatagory = await CatagoryScehma.findOne({GuildId : GuildId} ).sort({position : -1});
 

        const newPosition = lastCatagory ? lastCatagory.position +1 : 1;

        const catagory = new CatagoryScehma({
            name : payload.name,
            GuildId : GuildId.toString(),
            position : newPosition
        })

        const added_catagory = await catagory.save();
          
        // update the guild schema 
        const newGuildUpdate = await GuildSchema.findOneAndUpdate(
            {_id : GuildId} , 
            {$push : {categoriesIds : added_catagory._id.toString()}},
            {new : true}
        )

        // save to user
        
        return {
            statusCode : 201,
            message : 'catagory is added for the server',
            data : added_catagory
        }
    }
    catch(error){
        console.log(error , 'something is wrong while creating catagory for server');
        return h.response('somthing went wrong ').code(500)
    }
}