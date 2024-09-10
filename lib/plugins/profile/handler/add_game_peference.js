const { Boom } = require("@hapi/boom"); 
const profileModel = require('../schema/profile')

module.exports = async (request , h) =>{
    try{
        const {payload , auth :{credentials}} = request;

        const userId = credentials.id;
        console.log(userId);

        console.log('this is my payload' , payload);


        const profileId = await profileModel.findOne({userId : userId});
        // for updating the gamepreference object
        // ---------------------------------------------------------------------------------------------------
        // gamePreferences.forEach(pref => {
        //     const existingPrefIndex = profile.gamePreferences.findIndex(
        //         (p) => p.gameName === pref.gameName
        //     );

        //     if (existingPrefIndex !== -1) {
        //         // Update existing preference
        //         profile.gamePreferences[existingPrefIndex] = {
        //             ...profile.gamePreferences[existingPrefIndex],
        //             ...pref
        //         };
        //     } else {
        //         // Add new preference
        //         profile.gamePreferences.push(pref);
        //     }
        // }); 
        //----------------------------------------------------------------------------------------------------
        console.log(profileId);

        if(profileId.userId != userId){
            return h.response('this guys i dont know what happens').code(500);
        }

        profileId.gamePreferences.push(payload);
        
        console.log(profileId);

        const addedgame = await profileId.save();
        

        
        return h.response({
            message : 'added game',
            data : {addedgame}
        }).code(200)
    }
    catch(error){
        console.log(error);
        return Boom.badRequest('noting is going write')
    }
}