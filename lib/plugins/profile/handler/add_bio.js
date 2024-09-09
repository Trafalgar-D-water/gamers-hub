const Boom = require("@hapi/boom");
const profileModel = require("../schema/profile");

module.exports = async (request , h) =>{
    try{
        const {payload , auth : {credentials}} = request;
        const {bio} = payload;
        const userId = credentials.id;

        const profile = await profileModel.findOne({userId : userId})
        
        profile.bio = bio;
        const updatedProfile =await profile.save();
        
        return h.response({
            message : 'profile dio is added',
            data : {updatedProfile}
        }).code(200)
        
    }
    catch(error){
        console.log(error);
        return Boom.badRequest('something went wrong')

    }
}