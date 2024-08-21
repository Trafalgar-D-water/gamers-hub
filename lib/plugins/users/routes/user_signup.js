"use strict";

module.exports = {
  method: "POST",
  path: "/api/user/signup",
  options: {
    tags: ["api"],
    description: "signup and Login  an User",
    auth: false,
    validate: require("../validation/user_signup"),
  },
  handler: require("../handler/user_signup"),
};
