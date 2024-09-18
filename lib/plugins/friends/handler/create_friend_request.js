const { Boom } = require("@hapi/boom");
const FriendModel = require('../schema/friend')

module.exports = async(request , h)=>{
    const {payload , auth  :{credentials} , server} = request;
    const loggedInUserId = credentials.id;
    try{

        console.log(payload)
        console.log('This is my recipitentId',payload.recipitent);
        
        //// Check if friend request already exists
        const existingRequest  = await FriendModel.findOne({
            requester : loggedInUserId,
            recipitent :payload.recipitent,
            // status : 'pendiing'
        })
        if(existingRequest){
            return h.response('Friend request already  send ').code(409);
        }

        if(loggedInUserId === payload.recipitent){
            return h.response('can not send request to yourself').code(400);
        }

        const newFriendRequest = new FriendModel({
            requester : loggedInUserId,
            recipitent : payload.recipitent
        })
        await newFriendRequest.save();

       

        // send the event here socket event code will be going down

        await server.methods.updateFriendRequst(loggedInUserId , payload.recipitent)

        return h.response('friend request send succesfully').code(201)
    }
    catch(error){
        console.log(error);
        return Boom.badImplementation('Something went wrong') ;
    }

}