"use strict";
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const users = require("../lib/plugins/users/index");
const auth = require("../lib/plugins/auth/index");
const team = require("../lib/plugins/team/index");
const profile = require('../lib/plugins/profile/index')
// const socket = require('../lib/plugins/socket/index')
// const friends = require('../lib/plugins/friends/index');
const Guild = require('../lib/plugins/Guild/index')
const hapiAuthorization = require("hapi-authorization");
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
        origin:['*'],  
        headers: ["Authorization", "Content-Type", "Accept" ,'If-None-Match'] , 
        additionalHeaders: ['x-requested-with'] ,
        credentials: true,
      },
    },
    // debug: {
    //   log: ["error"],
    //   request: ["error"], // this thing acusing the error of log not found 
    // },
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
      {
        plugin : hapiAuthorization,
        options : {
          roles :['superAdmin' , 'admin' , 'mod' , 'user']
        }
      },

      { plugin: auth },
      { plugin: users },
      { plugin: team },
      {plugin : profile},
      {plugin : Guild},
      
      // {plugin: socket},
      // {plugin : friends} 
    ],
  },
  // ext: {
  //   onPreHandler: (request, h) => {
  //     const userRole = request.auth.credentials.role; // Ensure this is set in your JWT validation

  //     // Define protected routes
  //     const protectedRoutes = ['/admin', '/moderator']; // Adjust protected routes as needed

  //     if (protectedRoutes.includes(request.path) && userRole !== 'superAdmin') {
  //       return h.response({ message: 'Access denied' }).code(403);
  //     }

  //     return h.continue;
  //   }
  // }
};



