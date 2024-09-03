"use strict";
require('dotenv').config();
const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const User = require("../schema/users");
const create_token = require("../../auth/utils/create_token");
const redis_client = require("../../auth/utils/redis_client");
const sendVerificationEmail = require('../../../utils/emailService')



module.exports = async (request, h) => {
  const { server } = request;
  const { username, password, email, dob } = request.payload;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Boom.conflict("Email already exist");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Generate the varification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hash,
      dob,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();
    // send varification email

    // const varificationUrl =  = `${process.env.}`
    const redis_key = `user:${newUser._id.toString()}:verification`;
    await redis_client.set(
      redis_key,
      JSON.stringify({ verified: false, token: verificationToken }),
      "EX",
      3600
    ); // Token expires in 1 hour
    
    console.log('this is my front end url ' , process.env.FRONTEND_URL);
    
    const baseURL = process.env.BASE_URL || 'http://localhost:3004/'; // Default to local development

// ... rest of your backend code, using baseURL to construct URLs

    const verificationUrl = `${baseURL}api/user/verify-email?token=${verificationToken}`; 
    // send varification email 
    // const varificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    // const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationUrl);

    // const session = {
    //   valid: true,
    //   id: uuidv4(),
    //   userId: newUser._id,
    // };

    // const redis_session = {
    //   valid: true,
    //   id: session.id,
    //   user: newUser,
    // };

    // const token = await create_token(session);
    // const redis_client_data = await redis_client.set(
    //   session.id,
    //   JSON.stringify(redis_session)
    // );
    // // console.log(redis_client_data);

    // console.log(token);
    return h
      .response({
        message:
          "Account created Scussfully. Please check your email to verify your account.",
        // token,
      })
      .code(201);
  } catch (e) {
    return Boom.badRequest(e);
  }
};
