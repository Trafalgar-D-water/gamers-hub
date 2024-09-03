"use strict";

module.exports = {
  method: "GET",
  path: "/api/user/verify-email",
  options: {
    tags: ["api"],
    description: "verify the email",
    auth: false,
  },
  handler: require("../handler/verify_email"),
};
