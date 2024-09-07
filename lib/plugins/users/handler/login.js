'use strict';
const Boom = require("@hapi/boom");
const UserModel = require("../schema/users");
const bcrypt = require('bcrypt')
const create_token = require("../../auth/utils/create_token");
const redis_client = require("../../auth/utils/redis_client");
const {v4 : uuidv4} = require('uuid')

module.exports = async (request, h) => {
  const { payload } = request;
  try {
    const { email, password } = payload;

    console.log(payload);
    
    // find userBy email
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if(!user){
        return Boom.unauthorized('invalid email and password i am comming here ');
    }

    const isMatch =  bcrypt.compareSync(password , user.password);

    if(!isMatch){
        return Boom.unauthorized('Invalid email or password');
    }
    //Create session and Gen JWT
     const session = {
      valid: true,
      id: uuidv4(),
      userId: user._id,
    };

    const redis_session = {
      valid: true,
      id: session.id,
      user: user,
    };

    const token = await create_token(session);
    const redis_client_data = await redis_client.set(
      session.id,
      JSON.stringify(redis_session)
    );
    // console.log(redis_client_data);

    console.log(token);

    return h.response({
        message : 'Login successful',
        token : token,
    }).code(200)
  } catch (error) {
    console.log(error);
    return Boom.badRequest("something went wrong during login");
  }
};
