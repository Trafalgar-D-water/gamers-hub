"use Strict";

const HapiAuthJwt2 = require("@hapi/jwt");
const redis_client = require("./utils/redis_client");
const jwt_private_key = require("./utils/config");
const UserModel = require("../users/schema/users.js");

const validate = async (artifacts  , request , h) =>{
  try{
    const redis_resoponse = await redis_client.get(artifacts.decoded.payload.id);
    // console.log("Decoded JWT Payload:", artifacts.decoded.payload); 
    // console.log('i am coming form auth folder',redis_resoponse);

    const userId = artifacts.decoded.payload.id;
    // console.log('i am user id ' , userId);
    
    if (!userId) {
      // console.error("User ID is missing in JWT payload.");
      return { isValid: false };
    }
    if(!redis_resoponse){
      return {isValid : false};
    }
    const session = JSON.parse(redis_resoponse);
    // console.log(session)

    if(session && session.valid){
      // console.log('i am getting inside');
      const usermodel = await UserModel.findOne({_id :session.user._id});
      // console.log('i am getting my usermodel',usermodel);
      const credentials = {
        id  : usermodel._id.toString(),
        username : usermodel.username,
        email : usermodel.email,
        role : usermodel.roles
      }
      return {
        isValid : true , 
        credentials
      }
    }else{
      return {isValid : false};
    }
  }
  catch(error){
    // console.log('i am getting to the catch block' , error);
    return { isValid: false }
    
  }
} 

exports.plugin = {
  name: "auth",
  version: "1.0.0",
  register: async (server, options) => {
    await server.register(HapiAuthJwt2);

    server.auth.strategy("jwt", "jwt", {
      keys: jwt_private_key,
      verify: false,
      validate,
    });
    server.auth.default("jwt");
  },
};
