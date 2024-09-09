const  Boom  = require("@hapi/boom");
const userModel = require('../schema/users')
module.exports =async  (request , h)=>{
    const { server , payload , auth :{credentials}} = request;
    try{
        const userId = credentials.id;
        const {username} = payload;
        console.log('i am update',username , userId);
        
        
        const profile = await userModel.findOneAndUpdate({ _id :userId} , {username} , {new : true });
        console.log('i am update profile' , profile);
        
        if(!profile){
            return Boom.badRequest('profile not found');
        }

        const UpdateProfileForUser_username = await server.methods.update_usermane_and_profile_username(userId.toString() , username); 
        return h.response('updated Both').code(201)
    }
    catch(error){
        console.log(error);
        return Boom.badRequest('unable to update')
    }
}