'use strict';
module.exports = {
    method: "POST",
  path: "/api/user/login",
  options: {
    tags: ["api"],
    description: "user login",
    auth: false,
    validate: require('../validation/login'),
  },
  handler: require('../handler/login'),
};
