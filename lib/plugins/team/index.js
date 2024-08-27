"use strict";

exports.plugin = {
  name: "team",
  version: "1.0.0",
  register:  (server, options) => {
    // routes
    server.route(require("./routes/create_team"));
  },
};
