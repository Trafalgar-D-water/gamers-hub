'use strict'
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert'); 
const Vision = require('@hapi/vision');

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
        credentials: true,
      }
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
        plugin : HapiSwagger,
        options :{
          info  :{
            title :`GamerHub Hapi-20 API DOCUMANTATION`,
          },
          pathPrefixSixe : 2, 
          basePath :'/api',
          securityDefinations :{
            Bearer :{
              type :'apiKey',
              name : 'Authorization',
              in :'header',
              'x-keyPrefix': 'Bearer'
            }
          },
          security :[{Bearer :[]}],
          schemes :['https' , 'http']
        }
      },
    ]
  }
};
