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
    ]
  }
};
