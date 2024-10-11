const ProfileModel = require('../schema/profile')
module.exports = {
    name : 'get_proflieId_by_userId',
    method : async (UserId)=>{
        try{
            
            const profile= await ProfileModel.find({userId : UserId.toString()});
            if(!profile){
                console.log('profile not forunf');
                throw new Error('profile not found')
            }

            return profile;
        }
        catch(error){
            console.log('someting went wrong' , error);
            throw new Error('Error in geting profile if')

        }
    }
}