'use strict';
const Boom = require('@hapi/boom');
const redis_client = require('../../auth/utils/redis_client');
const crypto = require('crypto')
const UserModel  = require('../schema/users')
const create_token = require("../../auth/utils/create_token");

module.exports = async (request ,h)=>{
    const {token} = request.query;
    console.log('this is my token' , token);
    
    try{
      const redis_key_pattern = `user:*:verification`;
      const redis_keys = await redis_client.keys(redis_key_pattern);

      if (redis_keys.length === 0) {
        return Boom.badRequest("Invalid or expired validation token");
      }

        // const redis_data = await redis_client.get(token);
        let userId;
        for (const key of redis_keys) {
          const data = await redis_client.get(key);
          if (data && JSON.parse(data).token === token) {
            userId = key.split(":")[1]; // Extract userId from the Redis key
            break;
          }
        }
     
        // Find the user by ID and check the token
        const user = await UserModel.findOne({ _id: userId, isVerified: false  , verificationToken:token});
    
        if (!user) {
          return Boom.badRequest("Invalid user or token expired");
        }
    
        // Update user verification status
        user.isVerified = true;
        user.verificationToken = undefined; // Remove the token
        await user.save();
    
        await redis_client.del(`user:${userId}:verification`);
        // Generate JWT
        const authToken = await create_token({
          userId: user._id,
          username: user.username,
          email: user.email,
        });
    
        // Store session in Redis
        const session = {
          valid: true,
          userId: user._id,
        };
        await redis_client.set(user._id.toString(), JSON.stringify(session), "EX", 3600);
    
        return h.response({
          message: "Email verified successfully. You are now logged in.",
          token: authToken,
        }).code(200);
    
    }
    catch(error){
        console.log(error);
        return Boom.badRequest(error.message)
        
    }
}