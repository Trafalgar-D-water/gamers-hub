"use strict";

const Boom = require("@hapi/boom");
const UserModel = require("../schema/users");
const bcrypt = require("bcrypt");

module.exports = async (request, h) => {
  const { previousPassword, newPassword } = request.payload;
  const userId = request.auth.credentials.id;

  console.log(previousPassword, newPassword);
  console.log(userId);
  try {
    const user = await UserModel.findOne({ _id: userId });
    console.log(user);
    
    if (!user) {
      return Boom.badRequest("no user Found");
    }
    const isMatch = bcrypt.compareSync(previousPassword ,user.password);
    console.log(isMatch);
    if (!isMatch) {
      return Boom.badRequest("previous password is incorrect");
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    await user.save();
    return h.response({ message: "password change has been done" }).code(200);
  } catch (error) {
    console.log(error);
    return Boom.badRequest("something went wrong");
  }
};
