"use strict";
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const users = require("../lib/plugins/users/index");
const auth = require("../lib/plugins/auth/index");
const team = require("../lib/plugins/team/index");
const profile = require('../lib/plugins/profile/index')
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
      // log: ["error"],
      // request: ["error"], // this thing acusing the error of log not found 
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
            version: '1.0.0',
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

      { plugin: auth },
      { plugin: users },
      { plugin: team },
      {plugin : profile},
    ],
  },
};
