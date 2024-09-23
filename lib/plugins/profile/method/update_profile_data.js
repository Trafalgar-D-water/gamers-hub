
const ProfileModel = require('../schema/profile')

module.exports = {
    name : 'update_profile_data',
    method : async (guildId , serverName , userId) =>{
        try{
            const profileUpdate = await ProfileModel.findOneAndUpdate({userId : userId} ,{
                $push :{
                    guild :{
                        guildId : guildId.toString(),
                        name : serverName,
                        owner : userId,
                    }
                }
            }, {new : true})

            await profileUpdate.save();
            return profileUpdate

            
        }
        catch(error){
            console.log('something went wrong' , error);
            throw new Error('something went wrong i am coming from prfile method')
        }
    }
}