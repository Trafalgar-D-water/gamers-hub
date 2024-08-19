"use strict";

const redis_options = {};
redis_options.host = process.env.REDIS_HOST || "127.0.0.1";
redis_options.port = process.env.REDIS_PORT || "6379";

const redis_client = require("redis").createClient({ socket: redis_options });
(async () => {
  try {
    await redis_client.connect();
  } catch (err) {
    console.log(err, "redis error");
  }
})();
