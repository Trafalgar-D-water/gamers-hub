"use strict";
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const users = require("../lib/plugins/users/index");

module.exports = {
  server: {
    port: process.env.PORT || 3004,
    routes: {
      validate: {
        failAction: (request, h, e) => {
          console.error(e.message);
          throw e;
        },
      },
      cors: {
        origin: ["*"],
        headers: ["Authorization", "Content-Type", "Accept"],
        credentials: true,
      },
    },
    debug: {
      log: ["error"],
      request: ["error"],
    },
  },
  register: {
    plugins: [
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: `GamerHub Hapi-20 API DOCUMANTATION`,
          },
          pathPrefixSize: 2,
          basePath: "/api",
          securityDefinitions: {
            Bearer: {
              type: "apiKey",
              name: "Authorization",
              in: "header",
              "x-keyPrefix": "Bearer",
            },
          },
          security: [{ Bearer: [] }],
          schemes: ["http"],
        },
      },
      { plugin: users },
    ],
  },
};
