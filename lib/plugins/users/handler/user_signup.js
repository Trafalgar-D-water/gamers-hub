"use strict";

const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const { v4: uuidv4 } = require("uuid");

const User = require("../schema/users");
const create_token = require("../../auth/utils/create_token");
const redis_client = require("../../auth/utils/redis_client");

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

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hash,
      dob,
    });

    await newUser.save();

    const session = {
      valid: true,
      id: uuidv4(),
      userId: newUser._id,
    };

    const redis_session = {
      valid: true,
      id: session.id,
      user: newUser,
    };

    const token = await create_token(session);
    await redis_client.set(session.id, JSON.stringify(redis_session));
    console.log(token);
    return h
      .response({
        message: "Account created Scussfully and Logged in",
        token,
      })
      .code(201);
  } catch (e) {
    return Boom.badRequest(e);
  }
};
