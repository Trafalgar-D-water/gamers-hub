"use strict";

const jwt = require("jsonwebtoken");
const secret = require("./config");

function createToken(user) {
  //sing to jwt
  return jwt.sign(user, secret, {
    algorithm: "HS256",
    expiresIn: "7D",
  });
}

module.exports = createToken;
