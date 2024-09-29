const userModel = require('../schema/users');

module.exports = {
    name : 'updateGuildInUser',
    method : async (GuildId , userId) =>{
        try{
            // const findUserAndUpdateGUild  = await userModel.findOneAndUpdate({_id : userId} , {$set :})
        }
        catch(error){
            console.log('error is' , error);
            throw new Error(error.message)
        }
    }
}